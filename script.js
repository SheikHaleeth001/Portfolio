// Constants
const TOP_CLEAR_THRESHOLD = 200;
const SECTION_REFERENCE_OFFSET = 120;

// Set current year in footer
document.getElementById("year").textContent = new Date().getFullYear();

// Cursor Tracking
const cursor = {
  dot: document.querySelector(".cursor-dot"),
  ring: document.querySelector(".cursor-ring"),
  x: 0,
  y: 0,
};

document.addEventListener("pointermove", (e) => {
  cursor.x = e.clientX;
  cursor.y = e.clientY;

  cursor.dot.style.opacity = "1";
  cursor.ring.style.opacity = "1";
  cursor.dot.style.left = cursor.x + "px";
  cursor.dot.style.top = cursor.y + "px";
  cursor.ring.style.left = cursor.x + "px";
  cursor.ring.style.top = cursor.y + "px";
});

// Cursor hover expansion
const interactiveElements = document.querySelectorAll("a, button, .project-card");
interactiveElements.forEach((el) => {
  el.addEventListener("mouseenter", () => {
    cursor.ring.style.width = "56px";
    cursor.ring.style.height = "56px";
    cursor.dot.style.opacity = "0";
  });

  el.addEventListener("mouseleave", () => {
    cursor.ring.style.width = "30px";
    cursor.ring.style.height = "30px";
    cursor.dot.style.opacity = "1";
  });
});

// Scroll Progress Bar
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;
  document.querySelector(".scroll-progress").style.width = scrollPercent * 100 + "%";
}

window.addEventListener("scroll", updateProgress, { passive: true });

// Navigation Active State
function setActiveLink(id) {
  document.querySelectorAll(".nav-link").forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + id) {
      link.classList.add("active");
    }
  });
}

function updateActiveSection() {
  if (window.scrollY < TOP_CLEAR_THRESHOLD) {
    setActiveLink("");
    return;
  }

  const sections = document.querySelectorAll("section[id]");
  let closestSection = null;
  let closestDistance = Infinity;

  sections.forEach((section) => {
    const rect = section.getBoundingClientRect();
    const distance = Math.abs(rect.top - SECTION_REFERENCE_OFFSET);

    if (distance < closestDistance) {
      closestDistance = distance;
      closestSection = section;
    }
  });

  if (closestSection) {
    setActiveLink(closestSection.id);
  }
}

window.addEventListener("scroll", updateActiveSection, { passive: true });

// Scroll Reveal Animation
const revealElements = document.querySelectorAll(".reveal");
const observerOptions = {
  threshold: 0.18,
  rootMargin: "0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

revealElements.forEach((el) => {
  observer.observe(el);
});

// Initialize
updateProgress();
updateActiveSection();
