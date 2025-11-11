import { useQuery } from '@tanstack/react-query';
import axios, { AxiosError } from 'axios';
import type {
  GitHubProfile,
  Repository,
  GitHubUserResponse,
  GitHubRepoResponse,
} from '../types';

const GITHUB_API_BASE = 'https://api.github.com';

// Custom error class for GitHub API errors
export class GitHubAPIError extends Error {
  statusCode?: number;
  isRateLimit: boolean;

  constructor(message: string, statusCode?: number, isRateLimit: boolean = false) {
    super(message);
    this.name = 'GitHubAPIError';
    this.statusCode = statusCode;
    this.isRateLimit = isRateLimit;
  }
}

// Transform GitHub API user response to internal model
const transformUserResponse = (data: GitHubUserResponse): GitHubProfile => ({
  name: data.name || data.login,
  bio: data.bio || '',
  avatarUrl: data.avatar_url,
  publicRepos: data.public_repos,
  followers: data.followers,
});

// Transform GitHub API repository response to internal model
const transformRepoResponse = (data: GitHubRepoResponse): Repository => ({
  id: data.id,
  name: data.name,
  description: data.description || '',
  language: data.language || 'Unknown',
  stargazersCount: data.stargazers_count,
  forksCount: data.forks_count,
  htmlUrl: data.html_url,
});

// Handle GitHub API errors
const handleGitHubError = (error: unknown): never => {
  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    const statusCode = axiosError.response?.status;

    // Rate limiting error
    if (statusCode === 403) {
      const rateLimitRemaining = axiosError.response?.headers['x-ratelimit-remaining'];
      if (rateLimitRemaining === '0') {
        throw new GitHubAPIError(
          'GitHub API rate limit exceeded. Please try again later.',
          403,
          true
        );
      }
    }

    // Other HTTP errors
    if (statusCode === 404) {
      throw new GitHubAPIError('GitHub user not found.', 404);
    }

    if (statusCode && statusCode >= 500) {
      throw new GitHubAPIError('GitHub service is temporarily unavailable.', statusCode);
    }

    // Network errors
    if (!axiosError.response) {
      throw new GitHubAPIError('Network error. Please check your connection.');
    }
  }

  // Generic error
  throw new GitHubAPIError('Failed to fetch GitHub data. Please try again later.');
};

// Fetch GitHub user profile
const fetchGitHubProfile = async (username: string): Promise<GitHubProfile> => {
  try {
    const { data } = await axios.get<GitHubUserResponse>(
      `${GITHUB_API_BASE}/users/${username}`
    );
    return transformUserResponse(data);
  } catch (error) {
    return handleGitHubError(error);
  }
};

// Fetch GitHub user repositories
const fetchGitHubRepos = async (username: string): Promise<Repository[]> => {
  try {
    const { data } = await axios.get<GitHubRepoResponse[]>(
      `${GITHUB_API_BASE}/users/${username}/repos`,
      {
        params: {
          sort: 'updated',
          per_page: 100,
        },
      }
    );
    return data.map(transformRepoResponse);
  } catch (error) {
    return handleGitHubError(error);
  }
};

interface UseGitHubReturn {
  profile: GitHubProfile | undefined;
  repositories: Repository[];
  isLoading: boolean;
  error: Error | null;
  isProfileLoading: boolean;
  isReposLoading: boolean;
  profileError: Error | null;
  reposError: Error | null;
}

export const useGitHub = (username: string): UseGitHubReturn => {
  // Fetch user profile
  const {
    data: profile,
    isLoading: isProfileLoading,
    error: profileError,
  } = useQuery<GitHubProfile, Error>({
    queryKey: ['github-profile', username],
    queryFn: () => fetchGitHubProfile(username),
    enabled: !!username,
  });

  // Fetch user repositories
  const {
    data: repositories = [],
    isLoading: isReposLoading,
    error: reposError,
  } = useQuery<Repository[], Error>({
    queryKey: ['github-repos', username],
    queryFn: () => fetchGitHubRepos(username),
    enabled: !!username,
  });

  return {
    profile,
    repositories,
    isLoading: isProfileLoading || isReposLoading,
    error: profileError || reposError,
    isProfileLoading,
    isReposLoading,
    profileError,
    reposError,
  };
};
