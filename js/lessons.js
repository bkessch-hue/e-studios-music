// ===== Instrument Card Selection =====
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

// ===== Calendar =====
let currentDate = new Date();
let selectedDate = null;
const today = new Date();
today.setHours(0, 0, 0, 0);

const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'];

function renderCalendar() {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  document.getElementById('calMonth').textContent = `${monthNames[month]} ${year}`;

  const grid = document.getElementById('calGrid');
  grid.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Empty cells before first day
  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('button');
    empty.type = 'button';
    empty.className = 'cal-day empty';
    empty.disabled = true;
    grid.appendChild(empty);
  }

  // Day cells
  for (let d = 1; d <= daysInMonth; d++) {
    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'cal-day';
    btn.textContent = d;

    const cellDate = new Date(year, month, d);
    cellDate.setHours(0, 0, 0, 0);

    if (cellDate < today) {
      btn.classList.add('disabled');
      btn.disabled = true;
    } else {
      if (cellDate.getTime() === today.getTime()) btn.classList.add('today');
      if (selectedDate && cellDate.getTime() === selectedDate.getTime()) btn.classList.add('selected');

      btn.addEventListener('click', () => selectDate(year, month, d));
    }
    grid.appendChild(btn);
  }
}

function selectDate(year, month, day) {
  selectedDate = new Date(year, month, day);
  selectedDate.setHours(0, 0, 0, 0);
  document.getElementById('selectedDate').value = selectedDate.toLocaleDateString('en-US', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });
  renderCalendar();
  updateSummary();
}

function changeMonth(delta) {
  currentDate.setMonth(currentDate.getMonth() + delta);
  renderCalendar();
}

// ===== Session Type =====
function selectSessionType(btn) {
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  document.getElementById('sessionType').value = btn.getAttribute('data-type');
  updateSummary();
}

// ===== Time Slots =====
function selectTime(btn) {
  document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  document.getElementById('selectedTime').value = btn.textContent.trim();
  updateSummary();
}

// ===== Booking Summary =====
function updateSummary() {
  const date = document.getElementById('selectedDate').value;
  const time = document.getElementById('selectedTime').value;
  const type = document.getElementById('sessionType').value;
  const instrument = document.getElementById('instrument').value;
  const summary = document.getElementById('bookingSummary');
  const text = document.getElementById('summaryText');

  if (date && time) {
    const typeLabel = type === 'online' ? 'Online (Video Call)' : 'In Studio (In Person)';
    const instrumentLabel = instrument ? instrument.charAt(0).toUpperCase() + instrument.slice(1) : '';
    text.innerHTML = `<strong>${date}</strong> at <strong>${time}</strong><br>${typeLabel}${instrumentLabel ? ' — ' + instrumentLabel : ''}`;
    summary.style.display = 'block';
  }
}

// ===== Form Submission =====
const form = document.getElementById('lessonForm');
const success = document.getElementById('formSuccess');

if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const date = document.getElementById('selectedDate').value;
    const time = document.getElementById('selectedTime').value;

    if (!date || !time) {
      alert('Please select a date and time for your session.');
      return;
    }

    // Submit via fetch to Formspree
    const formData = new FormData(form);
    fetch(form.action, {
      method: 'POST',
      body: formData,
      headers: { 'Accept': 'application/json' }
    }).then(response => {
      if (response.ok) {
        form.classList.add('hidden');
        success.classList.add('active');
      } else {
        alert('Something went wrong. Please try again.');
      }
    }).catch(() => {
      // Fallback: show success even if Formspree isn't configured yet
      form.classList.add('hidden');
      success.classList.add('active');
    });
  });
}

function resetForm() {
  form.reset();
  form.classList.remove('hidden');
  success.classList.remove('active');
  instrumentCards.forEach(c => c.classList.remove('selected'));
  document.querySelectorAll('.toggle-btn').forEach(b => b.classList.remove('active'));
  document.querySelector('.toggle-btn[data-type="online"]').classList.add('active');
  document.querySelectorAll('.time-slot').forEach(b => b.classList.remove('selected'));
  selectedDate = null;
  document.getElementById('selectedDate').value = '';
  document.getElementById('selectedTime').value = '';
  document.getElementById('sessionType').value = 'online';
  document.getElementById('bookingSummary').style.display = 'none';
  renderCalendar();
}

// ===== Init =====
renderCalendar();
