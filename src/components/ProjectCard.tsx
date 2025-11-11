import { memo, useState } from 'react';
import { SiGithub } from 'react-icons/si';
import { HiExternalLink } from 'react-icons/hi';
import type { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

function ProjectCard({ project }: ProjectCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  return (
    <article className="group bg-white rounded-xl shadow-soft hover:shadow-strong transition-all duration-300 overflow-hidden flex flex-col h-full card-hover" role="listitem">
      {/* Project Thumbnail */}
      <div className="relative w-full h-48 sm:h-56 md:h-64 bg-gray-200 overflow-hidden">
        {!imageError ? (
          <>
            {/* Loading skeleton */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 animate-pulse" />
            )}
            
            <img
              src={project.imageUrl}
              alt={`${project.title} project screenshot`}
              className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              loading="lazy"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageError(true)}
            />
          </>
        ) : (
          /* Fallback for missing images */
          <div className="absolute inset-0 bg-gradient-to-br from-primary-100 to-secondary-100 flex items-center justify-center">
            <div className="text-center p-4">
              <div className="text-4xl mb-2">🚀</div>
              <p className="text-sm text-gray-600 font-medium">{project.title}</p>
            </div>
          </div>
        )}

        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Project Content */}
      <div className="flex-1 flex flex-col p-6">
        {/* Title */}
        <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">
          {project.title}
        </h3>

        {/* Description */}
        <p className="text-gray-600 text-sm md:text-base mb-4 flex-1 line-clamp-3">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1 text-xs md:text-sm font-medium bg-primary-50 text-primary-700 rounded-full border border-primary-200 hover:bg-primary-100 transition-colors duration-200"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 text-sm sm:text-base"
              aria-label={`View live demo of ${project.title}`}
            >
              <HiExternalLink className="w-4 h-4" />
              <span>Live Demo</span>
            </a>
          )}
          
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 min-h-[44px] bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-600 focus:ring-offset-2 text-sm sm:text-base"
            aria-label={`View ${project.title} source code on GitHub`}
          >
            <SiGithub className="w-4 h-4" />
            <span>Code</span>
          </a>
        </div>
      </div>
    </article>
  );
}

export default memo(ProjectCard);
