import { memo } from 'react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import type { PersonalInfo, SocialLink } from '../types';

interface HeroProps {
  personal: PersonalInfo;
  socialLinks: SocialLink[];
  onNavigate: (section: string) => void;
}

const iconMap = {
  SiGithub,
  SiLinkedin,
  SiTwitter: SiX, // X (formerly Twitter)
  SiX,
};

function Hero({ personal, socialLinks, onNavigate }: HeroProps) {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 pt-16"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Avatar */}
          <div className="mb-8 animate-fade-in">
            <div className="relative inline-block">
              <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-4 border-white shadow-xl mx-auto">
                <img
                  src={personal.avatarUrl}
                  alt={`${personal.name} - ${personal.title}`}
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width="160"
                  height="160"
                  decoding="async"
                />
              </div>
              <div
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full border-4 border-white"
                aria-hidden="true"
                title="Available for work"
              ></div>
            </div>
          </div>

          {/* Name */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-4 animate-slide-up">
            {personal.name}
          </h1>

          {/* Title */}
          <h2 className="text-xl sm:text-2xl md:text-3xl font-semibold text-blue-600 mb-6 animate-slide-up animation-delay-100">
            {personal.title}
          </h2>

          {/* Tagline */}
          <p className="text-base sm:text-lg md:text-xl text-gray-700 max-w-2xl mx-auto mb-8 leading-relaxed animate-slide-up animation-delay-200">
            {personal.tagline}
          </p>

          {/* Social Links */}
          <nav
            aria-label="Social media links"
            className="flex items-center justify-center gap-4 mb-10 animate-slide-up animation-delay-300"
          >
            {socialLinks.map(link => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-white text-gray-700 hover:text-blue-600 hover:bg-blue-50 shadow-md hover:shadow-lg transition-all duration-300 hover:scale-110"
                  aria-label={`Visit ${link.platform} profile`}
                >
                  {IconComponent && (
                    <IconComponent className="w-6 h-6" aria-hidden="true" />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-slide-up animation-delay-400">
            <button
              onClick={() => onNavigate('projects')}
              className="w-full sm:w-auto px-8 py-3 min-h-[44px] bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-base"
            >
              View My Work
            </button>
            <button
              onClick={() => onNavigate('contact')}
              className="w-full sm:w-auto px-8 py-3 min-h-[44px] bg-white text-blue-600 border-2 border-blue-600 rounded-lg font-medium hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-base"
            >
              Get In Touch
            </button>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <button
          onClick={() => onNavigate('about')}
          className="text-gray-400 hover:text-blue-600 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-600 rounded-full p-3 min-w-[44px] min-h-[44px] flex items-center justify-center"
          aria-label="Scroll to about section"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </button>
      </div>
    </section>
  );
}

export default memo(Hero);
