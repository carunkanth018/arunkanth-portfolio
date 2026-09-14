export interface CaseStudy {
  id: string;
  number: string;
  tag: string;
  title: string;
  dataset: string;
  status: string;
  summary: string;
  metrics: {
    label: string;
    value: string;
    subtext: string;
    color: 'primary' | 'secondary' | 'tertiary';
  }[];
  specDetails: {
    architecture: string[];
    techStack: string[];
    outcomes: string[];
    codeSnippet?: string;
  };
}

export interface SkillCategory {
  title: string;
  icon: string;
  accent: 'primary' | 'secondary' | 'tertiary';
  skills: {
    name: string;
    tier: 'TIER 1' | 'TIER 2';
    description: string;
  }[];
}

export interface CareerMilestone {
  period: string;
  level: string;
  badge: string;
  badgeType: 'tertiary' | 'secondary' | 'outline';
  role: string;
  division: string;
  description: string;
  tags: string[];
  thesis?: string;
  publications?: string[];
  certifications?: string[];
}
