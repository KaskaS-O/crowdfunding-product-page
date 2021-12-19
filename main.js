const leftPledgesDefaultNumbers = [
    {name: 'pledge25', value: 101},
    {name: 'pledge75', value: 64},
    {name: 'pledge200', value: 0},
];

const moneyToCollect = 100000;
let moneyCollected = 89914;
let backersNumber = 5007;
let daysLeft = 56;

const hamburger = document.querySelector('.menu__hamburger');
const menuIcon = document.querySelector('.menu__icon');
const closeMenu = document.querySelector('.menu__close');
const menuList = document.querySelector('.menu__list');

const bookmark = document.querySelector('.intro__bookmark');
const bookmarkIconMarked = document.querySelector('.intro__icon--cyan');
const bookmarkTxt = document.querySelector('.intro__bookmark-txt');

const filter = document.querySelector('.filter');
const pageHeight = parseInt(document.querySelector('.header').offsetHeight + document.querySelector('.content').offsetHeight);
const pageWidth = parseInt(document.querySelector('body').offsetWidth);

const modalPledges = document.getElementById('modalPledges');
const modalSuccess = document.getElementById('modalSuccess');
const closeModal = document.querySelector('.about__closing-icon');
const enterPledges = [...document.querySelectorAll('.enter-pledge')];
const pledgesLeft = [...document.querySelectorAll('[data-id]')];
const pledgesLeftModified = pledgesLeft.map(item => item = {name: item.parentElement.parentElement.parentElement.dataset.pledge, value: 0});

const btns = [...document.querySelectorAll('.btn')];
let activeBtns = [];

const checkboxes = [...document.querySelectorAll('.checkbox')];
let activeCheckboxes = [];

const enterPledgeBtns = [...document.querySelectorAll('.enter-pledge__btn')];
const enterPledgeInputs = [...document.querySelectorAll('.enter-pledge__input')];
const enterPledgeForms = [...document.querySelectorAll('.enter-pledge__form')];
let pledgeValue = 0;

const moneyCollectedSpan = document.getElementById('moneyCollected');
const backersNumberSpan = document.getElementById('backersNumber');
const daysLeftSpan = document.getElementById('daysLeft');
const progressbarFilled = document.querySelector('.progressbar__filled');

enterPledges.forEach(el => el.classList.add('hidden'));

if (pageWidth >=1200) {
    menuList.classList.remove('hidden');
}

const handleBookmark = () => {
    bookmark.classList.toggle('marked');
}

const showCampaignNumbers = () => {
    moneyCollectedSpan.innerText = `$${moneyCollected.toLocaleString('en-US')}`;
    backersNumberSpan.innerText = backersNumber.toLocaleString('en-US');
    daysLeftSpan.innerText = daysLeft;

    const progressBarFillPercentage = moneyCollected / moneyToCollect * 100;
    const translateX = 100 - progressBarFillPercentage;
    progressbarFilled.style.transform = `translateX(-${translateX}%)`;
};

const handleHamburgerMenu = () => {
    menuIcon.classList.toggle('hidden');
    closeMenu.classList.toggle('hidden');
    menuList.classList.toggle('hidden');   
    filter.classList.toggle('hidden'); 
};

const showDefaultLeftPledges = () => {
    pledgesLeftModified.forEach(item => {
        const matchingItem = leftPledgesDefaultNumbers.find(el => el.name === item.name);
        item.value = matchingItem.value;
    });
    pledgesLeft.forEach((field, index) => {
        field.innerText = pledgesLeftModified[index].value
    })
    
};

const handleInactivePledges = () => {
    pledgesLeft.forEach(el => {
        if (el.innerText === '0') {
            el.parentElement.parentElement.parentElement.classList.add('inactive');
            activeBtns = btns.filter(btn => !btn.parentElement.parentElement.classList.contains('inactive'));
            activeCheckboxes = checkboxes.filter(el => !el.parentElement.parentElement.classList.contains('inactive'));

            const inactiveBtns = btns.filter(item => !activeBtns.includes(item));
            inactiveBtns.forEach(item => item.innerText = 'Out of Stock')
        }
    })
};

const handleCheckbox = event => {
    activeEl = event.target;
    const activePledge = activeEl.parentElement.parentElement;

    activeCheckboxes.forEach(el => {
        if (el === activeEl) {
            el.classList.add('checked');
            activePledge.classList.add('pledge--selected');
            activePledge.children[activePledge.children.length - 1].classList.remove('hidden');

        } else if (el.classList.contains('checked')) {
            el.classList.remove('checked');
            el.parentElement.parentElement.classList.remove('pledge--selected');
            el.parentElement.parentElement.children[el.parentElement.parentElement.children.length - 1].classList.add('hidden');
        }
    })
};

const handleModalClosing = () => {
    modalPledges.classList.add('hidden');
    modalSuccess.classList.add('hidden');
    filter.classList.add('hidden');
    enterPledges.forEach(el => el.classList.add('hidden'));
    pledgeValue = 0;
    activeCheckboxes.forEach(el => {
        if (el.classList.contains('checked')) {
            el.classList.remove('checked');
            el.parentElement.parentElement.classList.remove('pledge--selected');
        }
    });
    enterPledgeInputs.forEach(input => input.value = input.defaultValue)
};

const handleModalShowing = event => {

    let activeEl = event.target;
    let activePledge = '';
    if (activeEl === document.getElementById('goToBacking')) {
        activePledge = document.getElementById('pledge0-modal');
        window.scrollTo({ top: 0, behavior: 'smooth' });

    } else {
        activePledge = activeEl.parentElement.parentElement;

    }
    const pledgeModals = [...document.querySelectorAll('.pledge--modal')];
    const pledgeModal = pledgeModals.find(el => el.dataset.pledge === activePledge.dataset.pledge);

    modalPledges.classList.remove('hidden');
    filter.classList.remove('hidden');
    filter.style.height = `${pageHeight}px`;

    if (activeEl !== document.getElementById('goToBacking') && !activeEl.classList.contains('enter-pledge__btn') && activeEl !==document.getElementById('closeSuccessModal')) {
        const checkbox = activeCheckboxes.find(el => el.parentElement.parentElement.dataset.pledge === activePledge.dataset.pledge);
        
        const pledgeModalPos = pledgeModal.getBoundingClientRect();
        const bodyPos = document.body.getBoundingClientRect();

        window.scrollTo({ top: (bodyPos.y - pledgeModalPos.y + 20) * (-1), behavior: 'smooth' });

        pledgeModal.classList.add('pledge--selected');
        checkbox.classList.add('checked');
        pledgeModal.children[pledgeModal.children.length - 1].classList.remove('hidden');
    }

    closeModal.addEventListener('click', handleModalClosing);
    activeCheckboxes.forEach(element => element.addEventListener('click', handleCheckbox));
    enterPledgeForms.forEach(form => form.addEventListener('submit', handlePledgeChoice));
};

const handlePledgeChoice = event => {
    event.preventDefault()
    const activeInput = enterPledgeInputs.find(el => el.parentElement === event.target);
    pledgeValue = parseInt(activeInput.value);
    modalSuccess.classList.remove('hidden');
    modalPledges.classList.add('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });

    pledgesLeftModified.forEach(item => {
        if (item.name === activeInput.dataset.pledge) {
            item.value--
        };
    });
    pledgesLeft.forEach((field, index) => {
        field.innerText = pledgesLeftModified[index].value
    });
    handleInactivePledges();
    handleCampaignProgress();
    document.getElementById('closeSuccessModal').addEventListener('click', handleModalClosing);
    return pledgeValue
};

const handleCampaignProgress = () => {
    moneyCollected = moneyCollected + pledgeValue;
    backersNumber++;

    showCampaignNumbers()
};

showDefaultLeftPledges();
handleInactivePledges();
showCampaignNumbers();
activeBtns.forEach(btn => btn.addEventListener('click', handleModalShowing));
hamburger.addEventListener('click', handleHamburgerMenu);
bookmark.addEventListener('click', handleBookmark);
