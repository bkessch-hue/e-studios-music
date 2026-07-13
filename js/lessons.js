// Instrument card selection
const instrumentCards = document.querySelectorAll('.instrument-card');
const instrumentSelect = document.getElementById('instrument');

instrumentCards.forEach(card => {
  card.addEventListener('click', () => {
    instrumentCards.forEach(c => c.classList.remove('selected'));
    card.classList.add('selected');
    const value = card.getAttribute('data-instrument');
    if (instrumentSelect) instrumentSelect.value = value;
  });
});

// Form submission
const form = document.getElementById('lessonForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    form.classList.add('hidden');
    success.classList.add('active');
  });
}

function resetForm() {
  form.reset();
  form.classList.remove('hidden');
  success.classList.remove('active');
  instrumentCards.forEach(c => c.classList.remove('selected'));
}
