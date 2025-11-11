import { memo } from 'react';
import {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiGit,
  SiDocker,
  SiPostgresql,
  SiMongodb,
} from 'react-icons/si';
import { VscCode } from 'react-icons/vsc';
import { AnimatedSection } from './AnimatedSection';
import type { SkillCategory } from '../types';

interface SkillsProps {
  skillCategories: SkillCategory[];
}

const iconMap = {
  SiTypescript,
  SiJavascript,
  SiPython,
  SiHtml5,
  SiCss3,
  SiReact,
  SiNodedotjs,
  SiExpress,
  SiTailwindcss,
  SiNextdotjs,
  SiGit,
  SiDocker,
  SiVisualstudiocode: VscCode,
  SiPostgresql,
  SiMongodb,
};

function Skills({ skillCategories }: SkillsProps) {
  return (
    <section
      id="skills"
      className="section-padding bg-white"
      aria-labelledby="skills-heading"
    >
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-xl">
            <h2
              id="skills-heading"
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-md"
            >
              Skills & Technologies
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              A comprehensive overview of the technologies and tools I work with
            </p>
          </div>

          {/* Skills Categories */}
          <div className="space-y-xl">
            {skillCategories.map((category, categoryIndex) => (
              <AnimatedSection
                key={category.name}
                animation="fade-in-up"
                delay={categoryIndex * 100}
                threshold={0.2}
              >
                {/* Category Title */}
                <h3 className="text-2xl font-semibold text-gray-900 mb-lg text-center sm:text-left">
                  {category.name}
                </h3>

                {/* Skills Grid */}
                <div
                  className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6"
                  role="list"
                  aria-label={`${category.name} skills`}
                >
                  {category.skills.map(skill => {
                    const IconComponent =
                      iconMap[skill.icon as keyof typeof iconMap];
                    return (
                      <div
                        key={skill.name}
                        className="group flex flex-col items-center justify-center p-4 sm:p-6 min-h-[120px] bg-gray-50 rounded-xl hover:bg-primary-50 hover:shadow-medium transition-all duration-300 hover:scale-105 cursor-default focus-within:ring-2 focus-within:ring-primary-600"
                        role="listitem"
                        aria-label={`${skill.name} skill`}
                      >
                        {/* Skill Icon */}
                        <div
                          className="mb-3 text-gray-700 group-hover:text-primary-600 transition-colors duration-300"
                          aria-hidden="true"
                        >
                          {IconComponent && (
                            <IconComponent className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14" />
                          )}
                        </div>

                        {/* Skill Name */}
                        <span className="text-sm sm:text-base font-medium text-gray-900 text-center">
                          {skill.name}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(Skills);
