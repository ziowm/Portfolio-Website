import { FaStar, FaCodeBranch, FaExternalLinkAlt } from 'react-icons/fa';
import type { Repository } from '../types';

interface RepositoryCardProps {
  repository: Repository;
}

// Language color mapping for visual appeal
const languageColors: Record<string, string> = {
  JavaScript: 'bg-yellow-400',
  TypeScript: 'bg-blue-500',
  Python: 'bg-blue-600',
  Java: 'bg-orange-500',
  Go: 'bg-cyan-500',
  Rust: 'bg-orange-600',
  Ruby: 'bg-red-500',
  PHP: 'bg-indigo-500',
  HTML: 'bg-orange-400',
  CSS: 'bg-blue-400',
  Shell: 'bg-gray-600',
  C: 'bg-gray-500',
  'C++': 'bg-pink-500',
  'C#': 'bg-purple-500',
  Swift: 'bg-orange-500',
  Kotlin: 'bg-purple-600',
  Unknown: 'bg-gray-400',
};

export const RepositoryCard = ({ repository }: RepositoryCardProps) => {
  const languageColor = languageColors[repository.language] || 'bg-gray-400';

  return (
    <article role="listitem" className="h-full">
      <a
        href={repository.htmlUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="group block p-6 h-full bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 border border-gray-200 hover:border-blue-300 hover:-translate-y-2 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2"
        aria-label={`View ${repository.name} repository on GitHub`}
      >
        <div className="flex flex-col h-full">
          {/* Repository name with external link icon */}
          <div className="flex items-start justify-between mb-3">
            <h3 className="text-xl font-bold text-gray-900 group-hover:text-blue-600 transition-colors duration-300 flex-1 pr-2">
              {repository.name}
            </h3>
            <FaExternalLinkAlt className="text-gray-400 group-hover:text-blue-600 transition-colors duration-300 flex-shrink-0 mt-1" />
          </div>

          {/* Repository description */}
          <p className="text-gray-600 text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
            {repository.description || 'No description available'}
          </p>

          {/* Repository metadata */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-200">
            {/* Language */}
            {repository.language && (
              <div className="flex items-center gap-2">
                <span className={`w-3 h-3 rounded-full ${languageColor}`}></span>
                <span className="text-sm font-medium text-gray-700">
                  {repository.language}
                </span>
              </div>
            )}

            {/* Stats */}
            <div className="flex items-center gap-4">
              {/* Stars */}
              <span className="flex items-center gap-1.5 text-gray-600 hover:text-yellow-500 transition-colors">
                <FaStar className="w-4 h-4" />
                <span className="text-sm font-semibold">
                  {repository.stargazersCount}
                </span>
              </span>

              {/* Forks */}
              <span className="flex items-center gap-1.5 text-gray-600 hover:text-blue-500 transition-colors">
                <FaCodeBranch className="w-4 h-4" />
                <span className="text-sm font-semibold">
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
