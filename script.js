'use strict';

const showModalBtn = document.querySelectorAll('.btn-show-modal');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const closeBtn = document.querySelector('.btn-close');
const learnmoreBtn = document.querySelector('.btn--text');
const section1 = document.querySelector('#section--1');
const navigation = document.querySelector('.nav')
const nav = document.querySelector('.nav__list');
const header = document.querySelector('.header');
const featureImage = document.querySelectorAll('img[data-src]');
const sections = document.querySelectorAll('.section');
const tabContainer = document.querySelector('.tab-box');
const slides = document.querySelectorAll('.slide');
const rightBtn = document.querySelector('.testimonial__btn--right');
const leftBtn = document.querySelector('.testimonial__btn--left');
const dotContainer = document.querySelector('.dots');

//////////////////////////////////////////
//////// show and close modal ////////////
const showModal = function(e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
}

const closeModal = function() {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
}

showModalBtn.forEach(btn => btn.addEventListener('click', showModal));
[overlay, closeBtn].forEach(el => el.addEventListener('click', closeModal));

//////////////////////////////////////////
//////// menu link clicking effect when humberger menu ////////////
nav.addEventListener('click', function(e) {
  if(!e.target.classList.contains('nav__link')) return;

  document.querySelector('.checkbox').checked = false;
})

//////////////////////////////////////////
//////// smooth scroll at learn more btn ////////////
learnmoreBtn.addEventListener('click', function(){
  console.log(section1);
  section1.scrollIntoView({behavior: 'smooth'});
});

//////////////////////////////////////////
//////// smooth scroll at nav ////////////
nav.addEventListener('click', function(e) {
  e.preventDefault();
  const id = e.target.getAttribute('href');
  if(!id) return;
  document.querySelector(id).scrollIntoView({behavior: 'smooth'});
});

//////////////////////////////////////////
//////// navigation effect ////////////
const navEffectFunc = function(e) {
  if(!e.target.closest('.nav__link')) return;
  
  const navLinks = document.querySelectorAll('.nav__link');

  navLinks.forEach(link => {
    if(link !== e.target) {
      link.style.opacity = this;
      document.querySelector('.nav__logo').style.opacity = this;
    };
  });
};

navigation.addEventListener('mouseover', navEffectFunc.bind('0.6'));
navigation.addEventListener('mouseout', navEffectFunc.bind('1'));

//////////////////////////////////////////
//////// stickey navigation ////////////
const stikyNavOption = {
  root: null,
  threshold: 0
}

const stickyNavFanc = function(entries) {
  const [entry] = entries;
  if(!entry.isIntersecting)
    document.querySelector('.nav').classList.add('sticky');
  if(entry.isIntersecting)
    document.querySelector('.nav').classList.remove('sticky');
}

const stikyNavObserver = new IntersectionObserver(stickyNavFanc, stikyNavOption);

stikyNavObserver.observe(header);

//////////////////////////////////////////
//////// lazy image ////////////
const lazyImageOption = {
  root: null,
  threshold: 0,
  rootMargin: '50px'
}

const lazyImageFunc = function(entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;

  
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener('load', function() {
    entry.target.classList.remove('blur');
  })
  observer.unobserve(entry.target);
}

const lazyImageObserver = new IntersectionObserver(lazyImageFunc, lazyImageOption);

featureImage.forEach(img => {
  lazyImageObserver.observe(img);
});

console.log(document.querySelector('.blur'));

//////////////////////////////////////////
//////// fadein ////////////
const fadeinOpetion = {
  root: null,
  threshold: 0.20,
}

const fadeinFanc = function(entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;
  entry.target.classList.remove('fadein');
}

const fadeinObserver = new IntersectionObserver(fadeinFanc, fadeinOpetion);
sections.forEach(section => fadeinObserver.observe(section));

//////////////////////////////////////////
//////// tab compornent ////////////
tabContainer.addEventListener('click', function(e) {
  const tabNum = e.target.dataset.tab;

  [...tabContainer.children].forEach(el => el.classList.remove('tab__btn--active'));
  e.target.classList.add('tab__btn--active');

  document.querySelectorAll('.tab__content').forEach(el => el.classList.remove('content--active'));
  document.querySelector(`.operations__content--${tabNum}`).classList.add('content--active');
});

//////////////////////////////////////////
//////// slider animation ////////////
let curSlide = 0;

slides.forEach((_, i) => {
  dotContainer.insertAdjacentHTML('beforeend', `
    <button class="dots__dot" data-dot="${i}"></button>
  `)
});

const slideFunc = function(curSlide) {
  slides.forEach((slide, i) => slide.style.transform = `translateX(${(i - curSlide) * 100}%)`);
};

const addDotsFunc = function() {
  [...dotContainer.children].forEach(dot => dot.classList.remove('dots__dot--active'));
  document.querySelector(`.dots__dot[data-dot="${curSlide}"]`).classList.add('dots__dot--active');
}

rightBtn.addEventListener('click', function() {
  if(curSlide === slides.length-1) curSlide = 0;
  else curSlide++;

  slideFunc(curSlide);
  addDotsFunc();
});

leftBtn.addEventListener('click', function() {
  if(curSlide === 0) curSlide = slides.length-1;
  else curSlide--;

  slideFunc(curSlide);
  addDotsFunc();
});

dotContainer.addEventListener('click', function(e) {
  if(!e.target.classList.contains('dots__dot')) return;

  curSlide = +e.target.dataset.dot;
  
  slideFunc(curSlide);
  addDotsFunc();
})

const init = function() {
  slideFunc(0);
  dotContainer.firstElementChild.classList.add('dots__dot--active');
}
init();