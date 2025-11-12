import { useGitHub, GitHubAPIError } from '../hooks/useGitHub';
import { RepositoryCard } from './RepositoryCard';
import { AnimatedSection } from './AnimatedSection';
import { FaGithub, FaExclamationTriangle, FaClock } from 'react-icons/fa';

interface GitHubProps {
  username: string;
}

export const GitHub = ({ username }: GitHubProps) => {
  const { profile, repositories, isLoading, error } = useGitHub(username);

  // Loading state
  if (isLoading) {
    return (
      <section
        id="github"
        className="py-20 bg-gray-50 dark:bg-gray-900"
        aria-label="GitHub repositories"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              GitHub Repositories
            </h2>
          </div>
          <div
            className="flex justify-center items-center py-12"
            role="status"
            aria-live="polite"
          >
            <div
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"
              aria-hidden="true"
            ></div>
            <span className="sr-only">Loading GitHub repositories...</span>
          </div>
        </div>
      </section>
    );
  }

  // Error state with fallback content
  if (error) {
    const isRateLimit = error instanceof GitHubAPIError && error.isRateLimit;
    const errorMessage =
      error instanceof GitHubAPIError
        ? error.message
        : 'Unable to fetch data from GitHub. Please try again later.';

    return (
      <section
        id="github"
        className="py-20 bg-gray-50 dark:bg-gray-900"
        aria-label="GitHub repositories"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              GitHub Repositories
            </h2>
          </div>
          <div className="max-w-2xl mx-auto">
            <div
              className={`${
                isRateLimit
                  ? 'bg-orange-50 dark:bg-orange-900/20 border-orange-200 dark:border-orange-800'
                  : 'bg-yellow-50 dark:bg-yellow-900/20 border-yellow-200 dark:border-yellow-800'
              } border rounded-lg p-6`}
              role="alert"
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                {isRateLimit ? (
                  <FaClock className="text-orange-600 dark:text-orange-500 text-xl flex-shrink-0 mt-1" />
                ) : (
                  <FaExclamationTriangle className="text-yellow-600 dark:text-yellow-500 text-xl flex-shrink-0 mt-1" />
                )}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {isRateLimit
                      ? 'Rate Limit Reached'
                      : 'Unable to load GitHub repositories'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {errorMessage}
                  </p>
                  <div className="flex flex-col sm:flex-row gap-3">
                    <a
                      href={`https://github.com/${username}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-lg hover:bg-gray-800 dark:hover:bg-gray-100 transition-colors"
                    >
                      <FaGithub />
                      View profile on GitHub
                    </a>
                    {isRateLimit && (
                      <button
                        onClick={() => window.location.reload()}
                        className="inline-flex items-center justify-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
                      >
                        Try again later
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Get featured repositories (top 6 by stars)
  const featuredRepos = [...repositories]
    .sort((a, b) => b.stargazersCount - a.stargazersCount)
    .slice(0, 6);

  return (
    <section
      id="github"
      className="py-20 bg-white"
      aria-labelledby="github-heading"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <AnimatedSection animation="fade-in-up" threshold={0.2}>
          <div className="text-center mb-16">
            <h2
              id="github-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-4"
            >
              GitHub Repositories
            </h2>
            {profile && (
              <div className="flex items-center justify-center gap-6 text-gray-600">
                <div className="flex items-center gap-2">
                  <FaGithub className="text-gray-700 text-xl" />
                  <span className="text-lg font-medium">{profile.publicRepos} repositories</span>
                </div>
                <span className="text-gray-400">•</span>
                <span className="text-lg font-medium">{profile.followers} followers</span>
              </div>
            )}
          </div>
        </AnimatedSection>

        {/* Repository grid */}
        {featuredRepos.length > 0 ? (
          <div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
            role="list"
            aria-label="Featured GitHub repositories"
          >
            {featuredRepos.map((repo, index) => (
              <AnimatedSection
                key={repo.id}
                animation="fade-in-up"
                delay={Math.min(index * 100, 600)}
                threshold={0.1}
              >
                <RepositoryCard repository={repo} />
              </AnimatedSection>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No repositories found.
            </p>
          </div>
        )}

        {/* View more link */}
        <AnimatedSection animation="fade-in-up" delay={200} threshold={0.2}>
          <div className="text-center mt-12">
            <a
              href={`https://github.com/${username}?tab=repositories`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-all duration-300 font-medium shadow-lg hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
            >
              <FaGithub className="text-xl" />
              View all repositories on GitHub
            </a>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
};
