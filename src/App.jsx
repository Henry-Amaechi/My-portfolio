import React, { useState, useEffect } from 'react';

// Shimmer skeleton loading placeholder for large image assets
function ImageWithSkeleton({ src, alt, className }) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`image-skeleton-container ${loaded ? 'loaded' : ''}`} style={{ width: '100%', height: '100%', position: 'relative' }}>
      {!loaded && <div className="skeleton-shimmer"></div>}
      <img
        src={src}
        alt={alt}
        className={`${className} ${loaded ? 'visible' : 'hidden'}`}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}

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
      const sections = ['projects-content', 'stack-content', 'resume-content', 'contact-content'];
      let current = '';
      const scrollPosition = window.scrollY + 160;

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
        <div className="logo" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <span>&lt;</span> HENRY <span>/&gt;</span>
        </div>
        <nav>
          <a href="#projects-content" className={activeSection === 'projects-content' ? 'active' : ''}>Projects</a>
          <a href="#stack-content" className={activeSection === 'stack-content' ? 'active' : ''}>Stack</a>
          <a href="#resume-content" className={activeSection === 'resume-content' ? 'active' : ''}>CV</a>
          <a href="#contact-content" className={activeSection === 'contact-content' ? 'active' : ''}>Contact</a>
        </nav>
        <button onClick={() => document.getElementById('contact-content')?.scrollIntoView({ behavior: 'smooth' })} className="nav-cta">
          Get In Touch
        </button>
      </header>

      {/* Intro Section */}
      <div id="intro" className="content-section">
        <div className="intro-content-wrapper">
          <div className="intro-content">
            <ImageWithSkeleton
              src="/my_profile_image.jpeg"
              alt="profile picture of Henry Amaechi"
              className="profile-picture"
            />
            <h1>Henry Amaechi</h1>
            <h2>Fullstack Developer</h2>

            <div className="intro-list-wrapper">
              <p>
                I am a Computer Science graduate specializing in developing robust applications, scripting solutions, and managing technical infrastructure. My expertise bridges frontend, backend, and WordPress development.
              </p>
              <div className="intro-button-wrapper">
                <a href="#contact-content" className="intro-button">
                  Get in touch
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="content-container">
        {/* Projects Section */}
        <div id="projects-content" className="content-section">
          <h2 className="tab-headline">Projects</h2>
          
          {/* EduGuide */}
          <section className="demo-section">
            <div>
              <ImageWithSkeleton
                src="/eduguide_project.png"
                alt="EduGuide screenshot"
                className="screenshot-box-shadow"
              />
            </div>
            <div>
              <h3>EduGuide</h3>
              <article>
                An academic guidance system that assists Computer Science students with queries regarding courses and department resource access. It features an interactive, AI-driven chatbot helper to guide student course registrations and curriculum queries, queries specialized relational tables to retrieve real-time department schedules and resources, and is built with query pool connection monitoring to ensure maximum application uptime.
              </article>
              <div className="icons-wrapper">
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="tech-icon-small" />
                  <div>Python</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="tech-icon-small" />
                  <div>JavaScript</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="tech-icon-small" />
                  <div>PostgreSQL</div>
                </div>
              </div>
              <div className="link-wrapper">
                <a href="https://github.com/Henry-Amaechi/My-portfolio" target="_blank" rel="noopener" aria-label="GitHub Repository">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="project-github-icon">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
          </section>

          {/* Garment Prediction System */}
          <section className="demo-section">
            <div>
              <ImageWithSkeleton
                src="/garment_prediction.png"
                alt="Garment Prediction System screenshot"
                className="screenshot-box-shadow"
              />
            </div>
            <div>
              <h3>Garment Prediction System</h3>
              <article>
                A garment prediction system designed to classify styles and stream visual analytics metrics. It implements computer vision models to classify clothing categories and styles, streams prediction scores and visual telemetry metrics to a frontend dashboard, and utilizes clean REST interfaces to securely handle image payload analysis request flows.
              </article>
              <div className="icons-wrapper">
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="tech-icon-small" />
                  <div>Python</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="tech-icon-small" />
                  <div>JavaScript</div>
                </div>
              </div>
              <div className="link-wrapper">
                <a href="https://github.com/Henry-Amaechi/My-portfolio" target="_blank" rel="noopener" aria-label="GitHub Repository">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="project-github-icon">
                    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
                  </svg>
                </a>
              </div>
            </div>
          </section>
        </div>

        {/* Stack Section */}
        <div id="stack-content" className="content-section">
          <h2 className="tab-headline">Tech Stack</h2>
          
          {/* Frontend */}
          <section className="icons-section-wrapper">
            <section className="icons-section tech-stack-section">
              <h3>Frontend</h3>
              <ul>
                <li><strong>Architecting</strong> modular, interactive user interfaces in React.</li>
                <li>Styling sleek layouts with custom responsive design, fluid gradients, and dynamic animations.</li>
                <li>Ensuring layout accessibility, clean semantic HTML, and SEO best practices.</li>
              </ul>
              <div className="icons-wrapper">
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" alt="React" className="tech-icon-small" />
                  <div>React</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" alt="JavaScript" className="tech-icon-small" />
                  <div>JavaScript</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" alt="HTML5" className="tech-icon-small" />
                  <div>HTML5</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" alt="CSS3" className="tech-icon-small" />
                  <div>CSS3</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/wordpress/wordpress-plain.svg" alt="WordPress" className="tech-icon-small" />
                  <div>WordPress</div>
                </div>
              </div>
            </section>
          </section>

          {/* Backend */}
          <section className="icons-section-wrapper">
            <section className="icons-section tech-stack-section">
              <h3>Backend & Database</h3>
              <ul>
                <li>Developing secure, performant APIs and background services in Python.</li>
                <li>Modeling schemas, query design, and index tuning in PostgreSQL.</li>
                <li>Integrating asynchronous logic and request handling.</li>
              </ul>
              <div className="icons-wrapper">
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" alt="Python" className="tech-icon-small" />
                  <div>Python</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" alt="PostgreSQL" className="tech-icon-small" />
                  <div>PostgreSQL</div>
                </div>
              </div>
            </section>
          </section>

          {/* Tools & Methods */}
          <section className="icons-section-wrapper">
            <section className="icons-section tech-stack-section">
              <h3>Tools & Methods</h3>
              <ul>
                <li>Version control and branch management workflows in Git & GitHub.</li>
                <li>API route testing, payload simulation, and query tracing in Postman.</li>
                <li>Configuring environment secrets and automated builds on Render & Vercel.</li>
              </ul>
              <div className="icons-wrapper">
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" alt="Git" className="tech-icon-small" />
                  <div>Git</div>
                </div>
                <div className="techstack-icon">
                  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postman/postman-original.svg" alt="Postman" className="tech-icon-small" />
                  <div>Postman</div>
                </div>
                <div className="techstack-icon">
                  <img src="/render_logo.png" alt="Render Logo" className="tech-icon-small" />
                  <div>Render</div>
                </div>
              </div>
            </section>
          </section>
        </div>

        {/* CV Section */}
        <div id="resume-content" className="content-section">
          <h2 className="tab-headline">CV</h2>
          
          <div className="timeline-section">
            <div className="timeline">
              {/* IT Intern */}
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-date">July 2024 - October 2024</div>
                <div className="timeline-content">
                  <h3>IT Intern – Workforce Group, Lagos</h3>
                  <ul>
                    <li>Developed scripting solutions to automate systems logging and health reporting.</li>
                    <li>Optimized relational database queries using PostgreSQL to support application response speeds.</li>
                    <li>Administered hardware and server setups to keep corporate resources running for 150+ workers.</li>
                  </ul>
                </div>
              </div>

              {/* Technical Intern */}
              <div className="timeline-item">
                <span className="timeline-dot"></span>
                <div className="timeline-date">March 2023 - June 2023</div>
                <div className="timeline-content">
                  <h3>Technical Intern – GIZ Don Bosco, Ondo State</h3>
                  <ul>
                    <li>Created responsive web program pages and local content portals using WordPress.</li>
                    <li>Monitored, troubleshot, and set up routers and switches to improve training center connection speed.</li>
                    <li>Compiled hardware manuals and ran workshops for incoming technical students.</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div id="contact-content" className="content-section">
          <h2 className="tab-headline">Contact Me</h2>
          
          {formStatus === 'success' ? (
            <div className="form-success-message">
              <h3>Message Sent Successfully!</h3>
              <p>Thank you for reaching out. Henry will get back to you shortly.</p>
              <button onClick={() => setFormStatus('idle')} className="btn-primary" style={{ marginTop: '16px' }}>
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="contact-form">
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
              <button type="submit" className="intro-button" disabled={formStatus === 'submitting'} style={{ border: 'none', cursor: 'pointer', display: 'flex', justifyContent: 'center' }}>
                {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          )}
        </div>

      </div>

      {/* Footer */}
      <footer>
        <p>&copy; {new Date().getFullYear()} Henry Amaechi. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
