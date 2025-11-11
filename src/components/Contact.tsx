import { useState, useEffect } from 'react';
import { ContactForm } from './ContactForm';
import { AnimatedSection } from './AnimatedSection';
import { sendContactEmail, initEmailJS } from '../utils/emailService';
import type { ContactFormData, ContactInfo } from '../types';
import { SiGithub, SiLinkedin, SiX } from 'react-icons/si';
import { HiMail } from 'react-icons/hi';

interface ContactProps {
  contactInfo: ContactInfo;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  SiGithub,
  SiLinkedin,
  SiTwitter: SiX, // Twitter is now X
  SiX,
};

export function Contact({ contactInfo }: ContactProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    // Initialize EmailJS on component mount
    initEmailJS();
  }, []);

  const handleSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      await sendContactEmail(data);
      setSubmitStatus('success');
    } catch (error) {
      setSubmitStatus('error');
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage('An unexpected error occurred. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="min-h-screen flex items-center justify-center bg-white section-padding" aria-labelledby="contact-heading">
      <div className="container mx-auto container-padding">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <AnimatedSection animation="fade-in-up" threshold={0.2}>
            <div className="text-center mb-xl">
              <h2 id="contact-heading" className="text-4xl md:text-5xl font-bold text-gray-900 mb-md">
                Get In Touch
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Have a project in mind or want to collaborate? Feel free to reach out through the
                contact form below, or connect with me on social media.
              </p>
            </div>
          </AnimatedSection>

          {/* Contact Form */}
          <AnimatedSection animation="fade-in-up" delay={100} threshold={0.2}>
            <div className="mb-xl">
              <ContactForm
                onSubmit={handleSubmit}
                isSubmitting={isSubmitting}
                submitStatus={submitStatus}
                errorMessage={errorMessage}
              />
            </div>
          </AnimatedSection>

          {/* Alternative Contact Methods */}
          <AnimatedSection animation="fade-in-up" delay={200} threshold={0.2}>
            <div className="border-t border-gray-200 pt-xl">
              <h3 className="text-2xl font-semibold text-gray-900 text-center mb-lg">
                Other Ways to Connect
              </h3>

              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                {/* Email */}
                <a
                  href={`mailto:${contactInfo.email}`}
                  className="flex items-center gap-3 text-gray-700 hover:text-primary-600 transition-all duration-300 group"
                  aria-label={`Send email to ${contactInfo.email}`}
                >
                  <div className="p-3 bg-gray-100 rounded-full group-hover:bg-primary-100 transition-all duration-300" aria-hidden="true">
                    <HiMail className="w-6 h-6" />
                  </div>
                  <span className="font-medium">{contactInfo.email}</span>
                </a>

                {/* Social Links */}
                <div className="flex items-center gap-4">
                  {contactInfo.socialLinks.map((link) => {
                    const Icon = iconMap[link.icon];
                    if (!Icon) return null;

                    return (
                      <a
                        key={link.platform}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-gray-100 rounded-full hover:bg-primary-100 text-gray-700 hover:text-primary-600 transition-all duration-300 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:ring-offset-2"
                        aria-label={`Visit ${link.platform} profile`}
                      >
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </section>
  );
}
