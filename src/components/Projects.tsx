import { memo } from 'react';
import ProjectCard from './ProjectCard';
import { AnimatedSection } from './AnimatedSection';
import type { Project } from '../types';

interface ProjectsProps {
  projects: Project[];
}

function Projects({ projects }: ProjectsProps) {
  // Filter featured projects
  const featuredProjects = projects.filter((project) => project.featured);

  return (
    <section id="projects" className="section-padding bg-gray-50" aria-labelledby="projects-heading">
      <div className="container mx-auto container-padding">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <AnimatedSection animation="fade-in-up" threshold={0.2}>
            <div className="text-center mb-xl">
              <h2 id="projects-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-md">
                Featured Projects
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A selection of my recent work showcasing various technologies and problem-solving approaches
              </p>
            </div>
          </AnimatedSection>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8" role="list" aria-label="Featured projects">
            {featuredProjects.map((project, index) => (
              <AnimatedSection
                key={project.id}
                animation="fade-in-up"
                delay={Math.min(index * 100, 600)}
                threshold={0.1}
              >
                <ProjectCard project={project} />
              </AnimatedSection>
            ))}
          </div>

          {/* Empty State */}
          {featuredProjects.length === 0 && (
            <div className="text-center py-xl">
              <p className="text-gray-500 text-lg">No featured projects available at the moment.</p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default memo(Projects);
