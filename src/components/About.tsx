import { AnimatedSection } from './AnimatedSection';
import type { AboutInfo } from '../types';

interface AboutProps {
  about: AboutInfo;
}

function About({ about }: AboutProps) {
  return (
    <section id="about" className="min-h-screen flex items-center justify-center bg-white section-padding" aria-labelledby="about-heading">
      <div className="container mx-auto container-padding">
        <AnimatedSection animation="fade-in-up" threshold={0.2}>
          <h2 id="about-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-xl text-center">
            About Me
          </h2>
        </AnimatedSection>

        <div className="max-w-3xl mx-auto">
          {/* Biography */}
          <AnimatedSection animation="fade-in-up" delay={100} threshold={0.2}>
            <div className="mb-lg">
              <p className="text-base sm:text-lg text-gray-700 leading-relaxed whitespace-pre-line">
                {about.bio}
              </p>
            </div>
          </AnimatedSection>

          {/* Resume Download Link */}
          <AnimatedSection animation="fade-in-up" delay={200} threshold={0.2}>
            <div className="flex justify-center mt-xl">
              <a
                href={about.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-8 py-3 min-h-[44px] bg-primary-600 text-white text-base font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-md hover:shadow-strong focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                aria-label="Download resume PDF (opens in new tab)"
              >
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                Download Resume
              </a>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}

export default About;
