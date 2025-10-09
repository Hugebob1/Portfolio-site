const bar   = document.getElementById('bar');
const menu  = document.getElementById('menu'); 
const items = [...bar.querySelectorAll('.btn')];

function setDelays(open) {
  items.forEach((el, i) => {
    const delay = (open ? (items.length - 1 - i) : i) * 80; 
    el.style.transitionDelay = delay + 'ms';
  });
}

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
