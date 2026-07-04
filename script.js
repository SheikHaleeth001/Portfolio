const dot = document.querySelector('.cursor-dot');
const ring = document.querySelector('.cursor-ring');
const year = document.getElementById('year');
const progressBar = document.querySelector('.scroll-progress');
const navLinks = document.querySelectorAll('.nav-links .nav-link');
const sections = Array.from(document.querySelectorAll('main section[id]'));
const roleText = document.querySelector('.role-text');
const roles = ['Golang Developer', 'Full Stack Developer', 'Backend Developer'];
let roleIndex = 0;
// Adjustable thresholds
const TOP_CLEAR_THRESHOLD = 200; // px from top to clear active nav
const SECTION_REFERENCE_OFFSET = 120; // vertical offset used when measuring section distance

const rotateRole = () => {
  if (!roleText) return;

  roleText.style.opacity = '0';
  roleText.style.transform = 'translateY(8px)';

  setTimeout(() => {
    roleIndex = (roleIndex + 1) % roles.length;
    roleText.textContent = roles[roleIndex];
    roleText.style.opacity = '1';
    roleText.style.transform = 'translateY(0)';
  }, 400);
};

setInterval(rotateRole, 2400);

if (year) {
  year.textContent = new Date().getFullYear();
}

const updateProgress = () => {
  if (!progressBar) return;
  const scrollTop = window.scrollY;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0;
  progressBar.style.width = `${Math.min(progress, 100)}%`;
};

window.addEventListener('scroll', updateProgress, { passive: true });
window.addEventListener('load', updateProgress);

const setActiveLink = (id) => {
  navLinks.forEach((link) => {
    const isActive = id && link.getAttribute('href') === `#${id}`;
    link.classList.toggle('active', isActive);
  });
};

const updateActiveSection = () => {
  if (!sections.length) return;

  if (window.scrollY < TOP_CLEAR_THRESHOLD) {
    setActiveLink('');
    return;
  }

  let activeSectionId = '';
  let smallestDistance = Infinity;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - SECTION_REFERENCE_OFFSET);

    if (distance < smallestDistance) {
      smallestDistance = distance;
      activeSectionId = section.id;
    }
  });

  setActiveLink(activeSectionId);
};

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    const targetId = link.getAttribute('href')?.replace('#', '');
    if (targetId) {
      setActiveLink(targetId);
    }
  });
});

window.addEventListener('scroll', updateActiveSection, { passive: true });
window.addEventListener('resize', updateActiveSection);
window.addEventListener('load', updateActiveSection);
updateActiveSection();

if (dot && ring) {
  window.addEventListener('pointermove', (event) => {
    dot.style.left = `${event.clientX}px`;
    dot.style.top = `${event.clientY}px`;
    ring.style.left = `${event.clientX}px`;
    ring.style.top = `${event.clientY}px`;
  });

  document.querySelectorAll('a, button, .project-card').forEach((element) => {
    element.addEventListener('mouseenter', () => {
      ring.style.width = '56px';
      ring.style.height = '56px';
      ring.style.borderColor = 'rgba(117, 240, 255, 0.85)';
    });

    element.addEventListener('mouseleave', () => {
      ring.style.width = '38px';
      ring.style.height = '38px';
      ring.style.borderColor = 'rgba(255,255,255,0.35)';
    });
  });
}

const revealItems = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  {
    threshold: 0.18,
  }
);

revealItems.forEach((item) => observer.observe(item));
