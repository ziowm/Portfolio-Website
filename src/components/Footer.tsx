import { memo } from 'react';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import type { SocialLink } from '../types';

interface FooterProps {
  socialLinks: SocialLink[];
  onBackToTop: () => void;
}

const iconMap = {
  SiGithub,
  SiLinkedin,
  SiTwitter: SiX,
  SiX,
};

function Footer({ socialLinks, onBackToTop }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark-900 text-white section-padding">
      <div className="container mx-auto container-padding">
        <div className="max-w-6xl mx-auto">
          {/* Social Links */}
          <div className="flex items-center justify-center gap-4 mb-lg">
            {socialLinks.map(link => {
              const IconComponent = iconMap[link.icon as keyof typeof iconMap];
              return (
                <a
                  key={link.platform}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-dark-800 text-gray-300 hover:text-white hover:bg-primary-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-dark-900"
                  aria-label={`Visit ${link.platform} profile`}
                >
                  {IconComponent && <IconComponent className="w-6 h-6" />}
                </a>
              );
            })}
          </div>

          {/* Copyright */}
          <div className="text-center mb-md">
            <p className="text-gray-400 text-sm sm:text-base">
              &copy; {currentYear} Portfolio. All rights reserved.
            </p>
          </div>

          {/* Back to Top Button */}
          <div className="flex justify-center">
            <button
              onClick={onBackToTop}
              className="group flex items-center gap-2 px-6 py-3 min-h-[44px] bg-dark-800 text-gray-300 rounded-lg font-medium text-sm sm:text-base hover:bg-primary-600 hover:text-white transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2 focus:ring-offset-dark-900"
              aria-label="Back to top"
            >
              <svg
                className="w-5 h-5 transform group-hover:-translate-y-1 transition-transform duration-300"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M5 10l7-7m0 0l7 7m-7-7v18"></path>
              </svg>
              <span>Back to Top</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default memo(Footer);
