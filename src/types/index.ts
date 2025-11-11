// Core data models for portfolio website

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  avatarUrl: string;
  githubUsername: string;
}

export interface AboutInfo {
  bio: string;
  resumeUrl: string;
}

export interface SocialLink {
  platform: string;
  url: string;
  icon: string;
}

export interface ContactInfo {
  email: string;
  socialLinks: SocialLink[];
}

export interface Skill {
  name: string;
  icon: string;
  proficiency?: number;
}

export interface SkillCategory {
  name: string;
  skills: Skill[];
}

export interface Project {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  imageUrl: string;
  liveUrl?: string;
  githubUrl: string;
  featured: boolean;
}

export interface Repository {
  id: number;
  name: string;
  description: string;
  language: string;
  stargazersCount: number;
  forksCount: number;
  htmlUrl: string;
}

export interface GitHubProfile {
  name: string;
  bio: string;
  avatarUrl: string;
  publicRepos: number;
  followers: number;
}

export interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

export interface PortfolioData {
  personal: PersonalInfo;
  about: AboutInfo;
  skills: SkillCategory[];
  projects: Project[];
  contact: ContactInfo;
}

// GitHub API response types
export interface GitHubUserResponse {
  login: string;
  name: string;
  avatar_url: string;
  bio: string;
  public_repos: number;
  followers: number;
  following: number;
}

export interface GitHubRepoResponse {
  id: number;
  name: string;
  description: string;
  html_url: string;
  language: string;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
}
