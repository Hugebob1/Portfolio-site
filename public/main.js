
document.addEventListener('DOMContentLoaded', () => {
  const logo  = document.querySelector('header h1');
  const items = Array.from(document.querySelectorAll('header nav a')); 
  const sign_button = document.querySelector('header .btn-signing');
  const bubble = document.querySelector('.bubble');

  logo.style.cursor = 'pointer';

  logo.addEventListener('click', () => {
    alert("Hello! I'm Alex, an Applied Computer Science student passionate about backend development and machine learning. Welcome to my website!");
  });


  requestAnimationFrame(() => {
    logo.classList.add('show');
  });

  const onLogoDone = () => {
    setDelays(items, true);

    items.forEach((el, i) => {
      setTimeout(() => el.classList.add('is-visible'), i * 150);
    });

    const last = items[items.length - 1];
    last.addEventListener('transitionend', () => {
      sign_button.classList.add('show');
    }, { once: true });


    logo.removeEventListener('transitionend', onLogoDone);
  };


  logo.addEventListener('transitionend', onLogoDone, { once: true });
});

function setDelays(items, open) {
  items.forEach((el, i) => {
    const idx = open ? i : (items.length - 1 - i);
    el.style.transitionDelay = (idx * 80) + 'ms';
  });
}


document.querySelector("footer p").textContent = "Copyright © Alex " + new Date().getFullYear();


