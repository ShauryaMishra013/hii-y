// Typewriter cycling messages
const lines = [
  "Wishing you joy, health, and success all year long! ✨",
  "Keep shining, Yashawini — have an amazing year! 🌟",
  "Janmadin ki bohot bohot badhai! 🎂"
];

let li = 0, typing, erasing;

function typeCycle() {
  const el = document.getElementById('typed');
  const text = lines[li];
  let i = 0;
  clearTimeout(typing);
  clearTimeout(erasing);

  function type() {
    if (i < text.length) {
      el.textContent += text.charAt(i++);
      typing = setTimeout(type, 55);
    } else {
      erasing = setTimeout(erase, 1200);
    }
  }

  function erase() {
    if (el.textContent.length) {
      el.textContent = el.textContent.slice(0, -1);
      erasing = setTimeout(erase, 28);
    } else {
      li = (li + 1) % lines.length;
      typing = setTimeout(typeCycle, 350);
    }
  }

  el.textContent = "";
  type();
}

// Confetti burst function
function burstConfetti(count = 140) {
  const layer = document.getElementById('confetti');
  layer.innerHTML = ''; // Clear old confetti

  const colors = ['#ff4d6d', '#ffd166', '#6ee7ff', '#bdb2ff', '#80ed99', '#ffad33'];
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.className = 'confetti-piece';
    s.style.left = Math.random() * 100 + 'vw';
    s.style.background = colors[Math.floor(Math.random() * colors.length)];
    s.style.setProperty('--sx', (Math.random() * 20 - 10) + 'vw');
    s.style.setProperty('--dur', (Math.random() * 2 + 2.5) + 's');
    s.style.transform = `translate(0,0) rotate(${Math.random() * 360}deg)`;
    layer.appendChild(s);

    s.addEventListener('animationend', () => s.remove());
  }
}

// Copy link to clipboard with fallback
function copyLink() {
  const btn = document.getElementById('share');
  const prev = btn.textContent;

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(location.href).then(() => {
      btn.textContent = 'Copied! ✅';
      setTimeout(() => btn.textContent = prev, 1200);
    });
  } else {
    const textArea = document.createElement('textarea');
    textArea.value = location.href;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);

    btn.textContent = 'Copied! ✅';
    setTimeout(() => btn.textContent = prev, 1200);
  }
}

// Bind button actions
document.getElementById('celebrate').addEventListener('click', () => burstConfetti(180));
document.getElementById('share').addEventListener('click', copyLink);

// Start typewriter and initial confetti on page load
window.addEventListener('DOMContentLoaded', () => {
  typeCycle();
  burstConfetti(100); // Light initial confetti
});
