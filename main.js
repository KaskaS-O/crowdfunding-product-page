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

const moneyCollected = document.getElementById('moneyCollected');
const backersNumber = document.getElementById('backersNumber');
const progressbarFilled = document.querySelector('.progressbar__filled');


class EnterPledge {
    constructor(value, activePledge) {
        this.value = value;
        this.parent = activePledge;
    }

    render() {
        const div = document.createElement('div');
        const p = document.createElement('p');
        const inputNumber = document.createElement('input');
        const btn = document.createElement('button');

        div.classList.add('pledge__enter-pledge', 'enter-pledge');
        p.classList.add('enter-pledge__txt', 'txt');
        p.innerText = 'Enter your pledge';
        inputNumber.classList.add('enter-pledge__input');
        inputNumber.type = 'number';
        inputNumber.value = parseInt(this.value);
        inputNumber.min = parseInt(this.value);
        btn.classList.add('enter-pledge__btn', 'btn', 'btn--sm');
        btn.innerText = 'Continue'

        this.parent.appendChild(div);
        div.appendChild(p);
        div.appendChild(inputNumber);
        div.appendChild(btn);

    }
};


const handleModalShowing = event => {
    const activeEl = event.target;
    const activePledge = activeEl.parentElement.parentElement;

    modalPledges.classList.remove('hidden');
    filter.classList.remove('hidden');
    filter.style.height = `${pageHeight}px`;

    if (activeEl === document.getElementById('goToBacking')) {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
        const pledgeModals = [...document.querySelectorAll('.pledge--modal')];

        const pledgeModal = pledgeModals.find(el => el.dataset.pledge === activePledge.dataset.pledge);
        const checkbox = activeCheckboxes.find(el => el.parentElement.parentElement.dataset.pledge === activePledge.dataset.pledge);
        
        const pledgeModalPos = pledgeModal.getBoundingClientRect();
        const bodyPos = document.body.getBoundingClientRect();

        window.scrollTo({ top: (bodyPos.y - pledgeModalPos.y + 20) * (-1), behavior: 'smooth' });

        pledgeModal.classList.add('pledge--selected');
        checkbox.classList.add('checked');

// Dodac zabezpieczenie przed wielokrotnym tworzeniem instancji w jednym pledge'u
        const enter = new EnterPledge(pledgeModal.dataset.value, pledgeModal);
        enter.render();
    }
}

const handleModalClosing = () => {
    modalPledges.classList.add('hidden');
    filter.classList.add('hidden');
    activeCheckboxes.forEach(el => {
        el.classList.remove('checked');
        el.parentElement.parentElement.classList.remove('pledge--selected');
    });
}

const handleHamburgerMenu = () => {
    menuIcon.classList.toggle('hidden');
    closeMenu.classList.toggle('hidden');
    menuList.classList.toggle('hidden');   
    filter.classList.toggle('hidden'); 
}

const handleCheckbox = event => {
    activeEl = event.target;
    const activePledge = activeEl.parentElement.parentElement;
    const pledgeModals = [...document.querySelectorAll('.pledge--modal')];
    const pledgeModal = pledgeModals.find(el => el.dataset.pledge === activePledge.dataset.pledge);

    activeCheckboxes.forEach(el => {
        if (el === activeEl) {
            el.classList.add('checked');
            el.parentElement.parentElement.classList.add('pledge--selected');

            const enter = new EnterPledge(pledgeModal.dataset.value, pledgeModal);
            enter.render();

// Dodac zabezpieczenie przed mozliwoscia pojawienia sie instancji enter w wielu miejscach na raz (usuwanie obiektu przy zmianie wyboru wysokosci pledge'a)

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

// Dodac obsluge btn w enter-pledge
// Obsluzyc zmiane ilosci dostepnych pledge'ow po zatwierdzeniu wyboru
// Obsluzyc pasek stanu wplat, licznik kwoty
// Obsluzyc zmiane ilosci backersow
// Obsluzyc bookmark
// Hovery i inne activy
// Desktop layout, media queries, zmiana wygladu menu
// Obsluzyc dynamiczna zmiane pledge'ow na nieaktywne kiedy zostanie ich 0
