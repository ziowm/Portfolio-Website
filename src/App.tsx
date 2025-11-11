import { lazy, Suspense } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import { useScrollSpy } from './hooks/useScrollSpy';
import { scrollToSection } from './utils/smoothScroll';
import { portfolioData } from './data/portfolioData';
import './App.css';

// Lazy load heavy components
const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const GitHub = lazy(() =>
  import('./components/GitHub').then(module => ({ default: module.GitHub }))
);
const Contact = lazy(() =>
  import('./components/Contact').then(module => ({ default: module.Contact }))
);
const Footer = lazy(() => import('./components/Footer'));

const sectionIds = ['hero', 'about', 'skills', 'projects', 'github', 'contact'];

function App() {
  const activeSection = useScrollSpy(sectionIds);

  const handleNavigate = (sectionId: string) => {
    scrollToSection(sectionId);
  };

  return (
    <div className="min-h-screen bg-gray-50 w-full overflow-x-hidden">
      <Header activeSection={activeSection} onNavigate={handleNavigate} />

      <main id="main-content">
        {/* Hero Section */}
        <Hero
          personal={portfolioData.personal}
          socialLinks={portfolioData.contact.socialLinks}
          onNavigate={handleNavigate}
        />

        {/* Lazy loaded sections with loading fallback */}
        <Suspense
          fallback={
            <div className="min-h-screen flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            </div>
          }
        >
          {/* About Section */}
          <About about={portfolioData.about} />

          {/* Skills Section */}
          <Skills skillCategories={portfolioData.skills} />

          {/* Projects Section */}
          <Projects projects={portfolioData.projects} />

          {/* GitHub Section */}
          <GitHub username={portfolioData.personal.githubUsername} />

          {/* Contact Section */}
          <Contact contactInfo={portfolioData.contact} />

          {/* Footer */}
          <Footer
            socialLinks={portfolioData.contact.socialLinks}
            onBackToTop={() => handleNavigate('hero')}
          />
        </Suspense>
      </main>
    </div>
  );
}

export default App;
