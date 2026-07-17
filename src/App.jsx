import React, { useState, useEffect } from 'react';

function App() {
  const [activeSection, setActiveSection] = useState('hero');
  const [formStatus, setFormStatus] = useState('idle'); // 'idle' | 'submitting' | 'success' | 'error'
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('submitting');

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: 'YOUR_FREE_WEB3FORMS_ACCESS_KEY', // Swap this with your Web3Forms access key
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: 'New Portfolio Contact Form Submission',
        }),
      });

      const result = await response.json();
      if (result.success) {
        setFormStatus('success');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      console.error(error);
      setFormStatus('error');
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['hero', 'about', 'skills', 'projects', 'contact'];
      let current = 'hero';
      const scrollPosition = window.scrollY + 120; // 120px offset for header height

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            current = sectionId;
          }
        }
      }
      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);

    // Scroll reveal observer (fade in & fade out on enter/leave)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
          } else {
            entry.target.classList.remove('reveal-visible');
          }
        });
      },
      { threshold: 0.05, rootMargin: '-80px 0px -80px 0px' }
    );

    const revealElements = document.querySelectorAll('.reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      window.removeEventListener('scroll', handleScroll);
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return (
    <>
      {/* Decorative Animated Background Orbs */}
      <div className="bg-orb orb-1"></div>
      <div className="bg-orb orb-2"></div>
      <div className="bg-orb orb-3"></div>

      {/* Navigation Header */}
      <header>
        <div className="logo" onClick={() => window.scrollTo(0, 0)}>
          <span>&lt;</span> HENRY <span>/&gt;</span>
        </div>
        <nav>
          <a href="#hero" className={activeSection === 'hero' ? 'active' : ''}>Home</a>
          <a href="#about" className={activeSection === 'about' ? 'active' : ''}>About</a>
          <a href="#skills" className={activeSection === 'skills' ? 'active' : ''}>Skills</a>
          <a href="#projects" className={activeSection === 'projects' ? 'active' : ''}>Projects</a>
          <a href="#contact" className={activeSection === 'contact' ? 'active' : ''}>Contact</a>
        </nav>
        <button onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} className="nav-cta">
          Get In Touch
        </button>
      </header>

      {/* Hero Section */}
      <div className="hero-container" id="hero">
        <div className="hero-left">
          <span className="hero-pretitle reveal delay-100">SOFTWARE ENGINEER</span>
          <h1 className="hero-title reveal delay-200">
            Henry <span>Amaechi</span>
          </h1>
          <p className="hero-subtitle reveal delay-300">
            I'm a software engineer specialising in frontend, backend, and WordPress development. Experienced in designing APIs with Python, query optimization, and writing JavaScript scripting solutions.
          </p>
          <div className="hero-ctas reveal delay-400">
            <button onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })} className="btn-primary">
              View Projects
            </button>
            <button onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })} className="btn-secondary">
              Profile Details
            </button>
          </div>
        </div>
        <div className="hero-right reveal delay-300">
          <div className="hero-image-wrapper">
            <img src="/my_profile_image.jpeg" alt="Henry Amaechi Profile" className="hero-image" />
          </div>
        </div>
      </div>

      {/* About Section */}
      <section className="about-section" id="about">
        <div className="section-head reveal">
          <span className="section-pre">BACKSTORY</span>
          <h2 className="section-title">Professional Background</h2>
        </div>
        <div className="about-grid">
          <div className="about-description reveal delay-100">
            <p>
              I am a Computer Science graduate specializing in developing robust applications, scripting solutions, and managing technical infrastructure.
            </p>
            <p>
              My expertise bridges software engineering, systems administration, and custom WordPress development. I design backends and API architectures, query database schemas, and coordinate IT support structures.
            </p>
            <p>
              I focus on engineering reliability: keeping API connections stable, structuring networks for optimal throughput, and writing maintainable code.
            </p>
          </div>
          <div className="about-details reveal delay-200">
            <div className="exp-block">
              <h3 className="exp-title">IT intern</h3>
              <div className="exp-meta">Workforce Group, Lagos</div>
            </div>
            <div className="exp-block">
              <h3 className="exp-title">Intern</h3>
              <div className="exp-meta">GIZ Don Bosco, Ondo State</div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="skills-section" id="skills">
        <div className="section-head reveal">
          <span className="section-pre">PROFILE INDEX</span>
          <h2 className="section-title">Technical Expertise</h2>
        </div>
        <div className="skills-grid reveal delay-100">
          <div className="skills-category">
            <h3>Core Technologies</h3>
            <div className="tech-icons-grid">
              {/* Python */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python Logo" className="tech-icon-img" />
                <span className="tech-icon-name">Python</span>
              </div>
              
              {/* JavaScript */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript Logo" className="tech-icon-img" />
                <span className="tech-icon-name">JavaScript</span>
              </div>

              {/* PostgreSQL */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL Logo" className="tech-icon-img" />
                <span className="tech-icon-name">PostgreSQL</span>
              </div>

              {/* React */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React Logo" className="tech-icon-img" />
                <span className="tech-icon-name">React</span>
              </div>

              {/* HTML */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5 Logo" className="tech-icon-img" />
                <span className="tech-icon-name">HTML5</span>
              </div>

              {/* CSS */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3 Logo" className="tech-icon-img" />
                <span className="tech-icon-name">CSS3</span>
              </div>

              {/* WordPress */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="WordPress Logo" className="tech-icon-img" />
                <span className="tech-icon-name">WordPress</span>
              </div>

              {/* Git */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git Logo" className="tech-icon-img" />
                <span className="tech-icon-name">Git</span>
              </div>

              {/* Postman */}
              <div className="tech-icon-card">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman Logo" className="tech-icon-img" />
                <span className="tech-icon-name">Postman</span>
              </div>

              {/* Render */}
              <div className="tech-icon-card">
                <img src="/render_logo.png" alt="Render Logo" className="tech-icon-img" />
                <span className="tech-icon-name">Render</span>
              </div>
            </div>
          </div>


        </div>
      </section>

      {/* Projects Section */}
      <section className="projects-section" id="projects">
        <div className="section-head reveal">
          <span className="section-pre">WORK</span>
          <h2 className="section-title">Projects</h2>
        </div>
        <div className="projects-list">
          {/* EduGuide */}
          <div className="project-row reveal">
            <div className="project-left">
              <div>
                <span className="project-label">Academic Guidance System</span>
                <h3 className="project-title">EduGuide</h3>
                <div className="project-desc-block">
                  An academic guidance system that assists Computer Science students with queries regarding courses and department resource access.
                </div>
              </div>
              <div className="project-tech-tags">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">JavaScript</span>
                <span className="tech-tag">PostgreSQL</span>
              </div>
            </div>
            <div className="project-right">
              <div className="project-image-wrapper">
                <img src="/eduguide_project.png" alt="EduGuide System Screenshot" className="project-image" />
              </div>
            </div>
          </div>

          {/* Garment Prediction System */}
          <div className="project-row reveal">
            <div className="project-left">
              <div>
                <span className="project-label">Garment Prediction System</span>
                <h3 className="project-title">Garment Prediction System</h3>
                <div className="project-desc-block">
                  A garment prediction system designed to classify styles and stream visual analytics metrics.
                </div>
              </div>
              <div className="project-tech-tags">
                <span className="tech-tag">Python</span>
                <span className="tech-tag">JavaScript</span>
              </div>
            </div>
            <div className="project-right">
              <div className="project-image-wrapper">
                <img src="/garment_prediction.png" alt="Garment Prediction System Screenshot" className="project-image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="contact-section" id="contact">
        <div className="section-head reveal">
          <span className="section-pre">INQUIRIES</span>
          <h2 className="section-title">Get In Touch</h2>
        </div>
        <div className="contact-grid">
          <div className="contact-info reveal delay-100">
            <div>
              <h3 className="contact-headline">Let's talk about opportunities.</h3>
              <p className="contact-para">
                I am seeking junior software engineering roles in Lagos or remote. Send a message, and I'll respond as soon as possible.
              </p>
            </div>
            <div className="contact-lines">
              <div className="contact-line">
                <div className="contact-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Email Address</div>
                  <div className="contact-val">
                    <a href="mailto:dockamaechi@gmail.com" style={{ color: 'inherit', textDecoration: 'none' }}>
                      dockamaechi@gmail.com
                    </a>
                  </div>
                </div>
              </div>
              <div className="contact-line">
                <div className="contact-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Phone</div>
                  <div className="contact-val">+234 810 844 1890, +234 807 109 5390</div>
                </div>
              </div>
              <div className="contact-line">
                <div className="contact-icon-wrapper">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                    <circle cx="12" cy="10" r="3"></circle>
                  </svg>
                </div>
                <div>
                  <div className="contact-label">Location</div>
                  <div className="contact-val">Lagos, Nigeria</div>
                </div>
              </div>
            </div>

            <div className="contact-socials">
              <h4 className="socials-title">Connect With Me</h4>
              <div className="socials-links-list">
                <a href="https://linkedin.com/in/YOUR_USERNAME" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="LinkedIn">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                    <rect x="2" y="9" width="4" height="12"></rect>
                    <circle cx="4" cy="4" r="2"></circle>
                  </svg>
                </a>
                <a href="https://twitter.com/YOUR_USERNAME" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Twitter">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
                <a href="https://github.com/Henry-Amaechi" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="GitHub">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
                <a href="https://instagram.com/YOUR_USERNAME" target="_blank" rel="noreferrer" className="social-icon-btn" aria-label="Instagram">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="contact-form reveal delay-200">
            {formStatus === 'success' ? (
              <div className="form-success-message">
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for reaching out. Henry will get back to you shortly.</p>
                <button onClick={() => setFormStatus('idle')} className="btn-primary" style={{ marginTop: '16px' }}>
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit}>
                {formStatus === 'error' && (
                  <div className="form-error-message">
                    Something went wrong. Please check your Web3Forms access key or try again.
                  </div>
                )}
                <div className="form-group">
                  <label htmlFor="name">Your Name</label>
                  <input 
                    type="text" 
                    id="name" 
                    required 
                    placeholder="John Doe" 
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input 
                    type="email" 
                    id="email" 
                    required 
                    placeholder="john@example.com" 
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="message">Your Message</label>
                  <textarea 
                    id="message" 
                    rows="5" 
                    required 
                    placeholder="How can I help you?"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>
                <button type="submit" className="submit-btn" disabled={formStatus === 'submitting'}>
                  {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Henry Amaechi. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
