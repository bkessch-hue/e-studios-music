// Navbar toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile nav on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('active'));
});

// Navbar background on scroll
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.style.background = 'rgba(10,10,10,0.95)';
  } else {
    navbar.style.background = 'rgba(10,10,10,0.85)';
  }
});

// Track play button interaction
document.querySelectorAll('.track-play').forEach(btn => {
  btn.addEventListener('click', function () {
    const icon = this.querySelector('svg');
    const isPlaying = this.classList.contains('playing');

    // Reset all other buttons
    document.querySelectorAll('.track-play').forEach(b => {
      b.classList.remove('playing');
      b.querySelector('svg').innerHTML = '<path d="M8 5v14l11-7z"/>';
    });

    if (!isPlaying) {
      this.classList.add('playing');
      icon.innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
    }
  });
});

// Smooth reveal on scroll
const observerOptions = { threshold: 0.1 };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.querySelectorAll('.video-card, .track-item, .about-content').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});
