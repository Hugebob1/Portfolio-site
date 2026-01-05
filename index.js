
document.addEventListener('DOMContentLoaded', () => {
  const items = Array.from(document.querySelectorAll('.reveal-item'));
  items.forEach((el, i) => {
    setTimeout(() => el.classList.add('is-visible'), i * 150); 
  });
});

document.querySelector("footer p").textContent = "Copyright © Alex " + new Date().getFullYear();

const bar   = document.getElementById('bar');
const menu  = document.getElementById('menu'); 
const items = [...bar.querySelectorAll('.btn')];

function setDelays(open) {
  items.forEach((el, i) => {
    const delay = (open ? (items.length - 1 - i) : i) * 100; 
    el.style.transitionDelay = delay + 'ms';
  });
}

$("h1").fadeOut(1).fadeIn(2000);

menu.addEventListener('click', () => {
  const opening = bar.hidden || !bar.classList.contains('open');

  if (opening) {

    bar.hidden = false;

    setDelays(true);

    void bar.offsetWidth; 

    bar.classList.add('open');
  } else {

    setDelays(false);
    bar.classList.remove('open');

    const onEnd = (e) => {
      if (e.target.classList.contains('btn')) {
        bar.hidden = true;
        bar.removeEventListener('transitionend', onEnd, true);
      }
    };
    bar.addEventListener('transitionend', onEnd, true);
  }
});

document.addEventListener('DOMContentLoaded', () => {
  const urlMap = {
    "Graph Splitter": "https://github.com/Hugebob1/GrafMasterJava",
    "Flash Cards": "https://github.com/Hugebob1/FlashCardApp",
    "OLX Scanner": "https://github.com/Hugebob1/Olx_Scanner",
    "Desk Master": "https://github.com/Hugebob1/DeskMaster",
    "MyChat": "https://github.com/Hugebob1/MyChat",
    "ML": "https://github.com/Hugebob1/ML-project"
  };

  document.querySelectorAll('.container .card').forEach(card => {
    const h1 = card.querySelector('h1');
    const url = h1 && urlMap[h1.textContent.trim()];
    if (!url) return;

    card.style.cursor = 'pointer';
    card.setAttribute('role', 'link');
    card.setAttribute('tabindex', '0');

    const go = () => { window.location.href = url; };

    card.addEventListener('click', e => {
      if (e.target.closest('a')) return; 
      go();
    });
    card.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); }
    });
  });
});

