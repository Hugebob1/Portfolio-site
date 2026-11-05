// Mobile menu: adds a hamburger button to the header (visible below 800px)
const header = document.querySelector('header');
const headerNav = header.querySelector('nav');

const menuBtn = document.createElement('button');
menuBtn.className = 'menu-toggle';
menuBtn.setAttribute('aria-label', 'Open menu');
menuBtn.setAttribute('aria-expanded', 'false');
menuBtn.innerHTML = '<span></span><span></span><span></span>';
header.appendChild(menuBtn);

function setMenu(open){
    document.body.classList.toggle('menu-open', open);
    menuBtn.setAttribute('aria-expanded', open);
    menuBtn.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
}

menuBtn.addEventListener('click', () => setMenu(!document.body.classList.contains('menu-open')));
headerNav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => setMenu(false)));
document.addEventListener('keydown', e => { if (e.key === 'Escape') setMenu(false); });
