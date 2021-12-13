const hamburger = document.querySelector('.menu__hamburger');
const menuIcon = document.querySelector('.menu__icon');
const closeMenu = document.querySelector('.menu__close');
const menuList = document.querySelector('.menu__list');

const filter = document.querySelector('.filter');
const pageHeight = parseInt(document.querySelector('.header').offsetHeight + document.querySelector('.content').offsetHeight);

const modalPledges = document.getElementById('modalPledges');
const modalSuccess = document.getElementById('modalSuccess');
const closeModal = document.querySelector('.about__closing-icon');

const btns = [...document.querySelectorAll('.btn')];
let activeBtns = btns.filter(btn => !btn.parentElement.parentElement.classList.contains('inactive'));

let checkboxes = [...document.querySelectorAll('.checkbox')];
let activeCheckboxes = checkboxes.filter(el => !el.parentElement.parentElement.classList.contains('inactive'));


const handleModalShowing = () => {
    modalPledges.classList.remove('hidden');
    filter.classList.remove('hidden');
    filter.style.height = `${pageHeight}px`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

const handleModalClosing = () => {
    modalPledges.classList.add('hidden');
    filter.classList.add('hidden');
    activeCheckboxes.forEach(el => el.classList.remove('checked'));
}

const handleHamburgerMenu = () => {
    menuIcon.classList.toggle('hidden');
    closeMenu.classList.toggle('hidden');
    menuList.classList.toggle('hidden');   
    filter.classList.toggle('hidden'); 
}

const handleCheckbox = event => {
    activeEl = event.target;
    activeCheckboxes.forEach(el => {
        if (el === activeEl) {
            el.classList.add('checked');
            el.parentElement.parentElement.classList.add('pledge--selected');
        } else if (el.classList.contains('checked')) {
            el.classList.remove('checked');
            el.parentElement.parentElement.classList.remove('pledge--selected');
        }
    })
}

activeBtns.forEach(btn => btn.addEventListener('click', handleModalShowing));
activeCheckboxes.forEach(element => element.addEventListener('click', handleCheckbox));
hamburger.addEventListener('click', handleHamburgerMenu);
closeModal.addEventListener('click', handleModalClosing);
