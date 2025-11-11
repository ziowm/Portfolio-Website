import { FaStar, FaCodeBranch } from 'react-icons/fa';
import type { Repository } from '../types';

interface RepositoryCardProps {
  repository: Repository;
}

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  return (
    <article role="listitem">
      <a
        href={repository.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="block p-4 sm:p-6 min-h-[120px] bg-white dark:bg-gray-800 rounded-lg shadow-soft hover:shadow-strong transition-all duration-300 border border-gray-200 dark:border-gray-700 card-hover focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
        aria-label={`View ${repository.name} repository on GitHub`}
      >
        <div className="flex flex-col h-full">
          {/* Repository name */}
          <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-300">
            {repository.name}
          </h3>

          {/* Repository description */}
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base mb-4 flex-grow line-clamp-2">
            {repository.description || 'No description available'}
          </p>

          {/* Repository metadata */}
          <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
            {/* Language */}
            <div className="flex items-center gap-2">
              {repository.language && (
                <span className="flex items-center gap-1">
                  <span className="w-3 h-3 rounded-full bg-primary-500"></span>
                  <span className="text-xs sm:text-sm">
                    {repository.language}
                  </span>
                </span>
              )}
            </div>

            {/* Stats */}
            <div className="flex items-center gap-3 sm:gap-4">
              {/* Stars */}
              <span className="flex items-center gap-1">
                <FaStar className="text-warning-500 w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  {repository.stargazersCount}
                </span>
              </span>

              {/* Forks */}
              <span className="flex items-center gap-1">
                <FaCodeBranch className="text-gray-500 w-3 h-3 sm:w-4 sm:h-4" />
                <span className="text-xs sm:text-sm">
                  {repository.forksCount}
                </span>
              </span>
            </div>
          </div>
        </div>
      </a>
    </article>
  );
};
