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

// Audio player
let currentAudio = null;
let currentBtn = null;

function togglePlay(audioId, btn) {
  const audio = document.getElementById(audioId);
  if (!audio) return;

  // If clicking the same track that's playing, pause it
  if (currentAudio === audio && !audio.paused) {
    audio.pause();
    btn.classList.remove('playing');
    btn.querySelector('svg').innerHTML = '<path d="M8 5v14l11-7z"/>';
    return;
  }

  // Stop any currently playing track
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    if (currentBtn) {
      currentBtn.classList.remove('playing');
      currentBtn.querySelector('svg').innerHTML = '<path d="M8 5v14l11-7z"/>';
    }
  }

  // Play the new track
  audio.play();
  btn.classList.add('playing');
  btn.querySelector('svg').innerHTML = '<path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/>';
  currentAudio = audio;
  currentBtn = btn;

  // When track ends, reset button
  audio.onended = () => {
    btn.classList.remove('playing');
    btn.querySelector('svg').innerHTML = '<path d="M8 5v14l11-7z"/>';
    currentAudio = null;
    currentBtn = null;
  };
}

// Load audio durations
document.querySelectorAll('audio').forEach(audio => {
  const id = audio.id;
  const num = id.replace('audio', '');
  const durationEl = document.getElementById('duration' + num);

  audio.addEventListener('loadedmetadata', () => {
    if (durationEl) {
      durationEl.textContent = formatTime(audio.duration);
    }
  });

  audio.addEventListener('timeupdate', () => {
    if (durationEl) {
      durationEl.textContent = formatTime(audio.currentTime);
    }
  });
});

function formatTime(seconds) {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return m + ':' + (s < 10 ? '0' : '') + s;
}

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
