import React, { useEffect, useRef } from 'react';

export const ShaderBackground: React.FC = () => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    let gl: WebGLRenderingContext | null = null;
    let program: WebGLProgram | null = null;
    let buffer: WebGLBuffer | null = null;
    let vs: WebGLShader | null = null;
    let fs: WebGLShader | null = null;
    let uTime: WebGLUniformLocation | null = null;
    let uRes: WebGLUniformLocation | null = null;
    let uMouse: WebGLUniformLocation | null = null;

    let animationFrameId: number | null = null;
    let isDestroyed = false;
    let isIntersecting = true;
    let isRunning = false;
    let lastTime = 0;
    let accumulatedTime = 0;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let targetMouseX = mouseX;
    let targetMouseY = mouseY;

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      #ifdef GL_FRAGMENT_PRECISION_HIGH
      precision highp float;
      #else
      precision mediump float;
      #endif
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / u_resolution.y;
        
        vec2 mouseSt = (u_mouse - 0.5 * u_resolution.xy) / u_resolution.y;
        float distMouse = length(st - mouseSt);

        vec3 baseBg = vec3(0.039, 0.051, 0.082);
        vec3 darkSurface = vec3(0.06, 0.08, 0.13);
        
        float t = u_time * 0.20;
        vec2 gridUV = st * 6.0;
        gridUV.y += sin(gridUV.x * 0.5 + t) * 0.35;
        gridUV.x += cos(gridUV.y * 0.5 + t * 0.8) * 0.25;
        
        vec2 gridLines = abs(fract(gridUV - 0.5) - 0.5);
        float line = min(gridLines.x, gridLines.y) * 16.0;
        float gridAlpha = clamp(1.0 - line, 0.0, 1.0) * smoothstep(1.5, 0.2, length(st));
        
        // Wave flow
        float wave1 = sin(st.x * 4.0 + t * 1.5) * 0.15;
        float wave2 = cos(st.x * 8.0 - t * 1.2) * 0.08;
        float waveDist = abs(st.y - (wave1 + wave2) - 0.05);
        float waveGlow = exp(-waveDist * 18.0) * 0.65;
        
        float waveDist2 = abs(st.y - (wave1 * 1.5 - wave2 * 0.5) + 0.15);
        float waveGlow2 = exp(-waveDist2 * 25.0) * 0.4;
        
        vec2 nodeCoord = floor(st * 12.0);
        float nodeRand = hash(nodeCoord);
        float nodeIntensity = 0.0;
        if (nodeRand > 0.90) {
          vec2 nodeLocal = fract(st * 12.0) - 0.5;
          float d = length(nodeLocal);
          float pulse = sin(u_time * 2.0 + nodeRand * 6.28) * 0.5 + 0.5;
          nodeIntensity = smoothstep(0.12, 0.02, d) * pulse * 0.6;
        }
        
        vec3 cyan = vec3(0.0, 0.898, 1.0);
        vec3 emerald = vec3(0.063, 0.725, 0.506);
        vec3 violet = vec3(0.388, 0.278, 1.0);
        
        vec3 color = mix(baseBg, darkSurface, uv.y * 0.8);
        color += vec3(0.05, 0.15, 0.25) * gridAlpha * 0.55;
        color += mix(cyan, violet, uv.x) * waveGlow;
        color += mix(emerald, cyan, uv.y) * waveGlow2;
        color += cyan * nodeIntensity;
        
        float mouseGlow = exp(-distMouse * 4.0) * 0.20;
        color += cyan * mouseGlow;

        gl_FragColor = vec4(color, 1.0);
      }
    `;

    function compileShader(ctx: WebGLRenderingContext, type: number, src: string) {
      const shader = ctx.createShader(type);
      if (!shader) return null;
      ctx.shaderSource(shader, src);
      ctx.compileShader(shader);
      if (!ctx.getShaderParameter(shader, ctx.COMPILE_STATUS)) {
        ctx.deleteShader(shader);
        return null;
      }
      return shader;
    }

    function initGL(): boolean {
      if (!canvas) return false;
      gl =
        canvas.getContext('webgl', { powerPreference: 'low-power', antialias: false }) ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);

      if (!gl) return false;

      vs = compileShader(gl, gl.VERTEX_SHADER, vsSource);
      fs = compileShader(gl, gl.FRAGMENT_SHADER, fsSource);
      if (!vs || !fs) return false;

      program = gl.createProgram();
      if (!program) return false;
      gl.attachShader(program, vs);
      gl.attachShader(program, fs);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        return false;
      }

      gl.useProgram(program);

      buffer = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
      gl.bufferData(
        gl.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
        gl.STATIC_DRAW
      );

      const pos = gl.getAttribLocation(program, 'a_position');
      gl.enableVertexAttribArray(pos);
      gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

      uTime = gl.getUniformLocation(program, 'u_time');
      uRes = gl.getUniformLocation(program, 'u_resolution');
      uMouse = gl.getUniformLocation(program, 'u_mouse');

      resize();
      return true;
    }

    const resize = () => {
      if (!canvas || !container || !gl) return;
      const isMobile = window.innerWidth < 768;
      const dpr = isMobile ? 1.0 : Math.min(window.devicePixelRatio || 1, 1.25);
      const width = Math.floor((container.clientWidth || window.innerWidth) * dpr);
      const height = Math.floor((container.clientHeight || window.innerHeight) * dpr);
      if (width > 0 && height > 0 && (canvas.width !== width || canvas.height !== height)) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!canvas || !isIntersecting || document.hidden) return;
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        targetMouseX = nx * canvas.width;
        targetMouseY = ny * canvas.height;
      }
    };

    const render = (time: number) => {
      if (isDestroyed || !isIntersecting || document.hidden || !gl) {
        isRunning = false;
        lastTime = 0;
        return;
      }

      if (lastTime === 0) {
        lastTime = time;
      }
      // Clamp delta time to 0.1s max to prevent huge jumps after sleep or background throttling
      const delta = Math.min((time - lastTime) * 0.001, 0.1);
      lastTime = time;
      accumulatedTime = (accumulatedTime + delta) % 3600.0;

      // Smooth mouse lerp
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;

      if (uTime) gl.uniform1f(uTime, accumulatedTime);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mouseX, mouseY);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animationFrameId = requestAnimationFrame(render);
    };

    const startRendering = () => {
      if (!isRunning && isIntersecting && !isDestroyed && !document.hidden && gl) {
        isRunning = true;
        lastTime = 0;
        animationFrameId = requestAnimationFrame(render);
      }
    };

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      isRunning = false;
      lastTime = 0;
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
        animationFrameId = null;
      }
    };

    const handleContextRestored = () => {
      if (initGL()) {
        startRendering();
      }
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    if (initGL()) {
      startRendering();
    }

    const resizeObserver = new ResizeObserver(() => resize());
    resizeObserver.observe(container);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Pause rendering loop completely when Hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        if (isIntersecting) {
          startRendering();
        } else {
          isRunning = false;
          lastTime = 0;
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
          }
        }
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false;
        lastTime = 0;
        if (animationFrameId) {
          cancelAnimationFrame(animationFrameId);
          animationFrameId = null;
        }
      } else if (isIntersecting) {
        lastTime = 0;
        startRendering();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      isDestroyed = true;
      isIntersecting = false;
      isRunning = false;
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      resizeObserver.disconnect();
      observer.disconnect();

      // Clean up WebGL resources
      if (gl) {
        if (buffer) gl.deleteBuffer(buffer);
        if (program) gl.deleteProgram(program);
        if (vs) gl.deleteShader(vs);
        if (fs) gl.deleteShader(fs);
      }
    };
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full opacity-45 pointer-events-none overflow-hidden">
      <canvas ref={canvasRef} className="w-full h-full block" />
    </div>
  );
};
