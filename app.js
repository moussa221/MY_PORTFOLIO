/*
// Désactive le clic droit sur toute la page
document.addEventListener('contextmenu', function (e) {
  e.preventDefault();
});


// Désactiver certains raccourcis clavier
document.addEventListener("keydown", function (e) {
  // Liste des combinaisons à bloquer
  if (
    e.ctrlKey && (e.key === "u" || e.key === "U") || // Ctrl+U
    e.ctrlKey && (e.key === "s" || e.key === "S") || // Ctrl+S
    e.ctrlKey && (e.key === "p" || e.key === "P") || // Ctrl+P
    e.key === "F12" || // F12
    (e.ctrlKey && e.shiftKey && (e.key === "i" || e.key === "I")) // Ctrl+Shift+I
  ) {
    e.preventDefault();
  }
});

//******************************************

function showAlert(message) {
  const popup = document.getElementById("alertPopup");
  popup.textContent = message;
  popup.classList.add("show");

  setTimeout(() => {
    popup.classList.remove("show");
  }, 2500);
}

// Désactiver le clic droit
document.addEventListener("contextmenu", function (e) {
  e.preventDefault();
  showAlert("Clic droit désactivé !");
});

// Désactiver certains raccourcis clavier
document.addEventListener("keydown", function (e) {
  const blockedShortcuts = [
    (e.ctrlKey && e.key.toLowerCase() === "u"),
    (e.ctrlKey && e.key.toLowerCase() === "s"),
    (e.ctrlKey && e.key.toLowerCase() === "p"),
    (e.key === "F12"),
    (e.ctrlKey && e.shiftKey && e.key.toLowerCase() === "i")
  ];

  if (blockedShortcuts.some(Boolean)) {
    e.preventDefault();
    showAlert("Cette action est bloquée !");
  }
});
*/
//****************************************** */

// changer dynamiquement l’élément actif
const links = document.querySelectorAll('.nav a');

links.forEach(link => {
  link.addEventListener('click', function () {
    links.forEach(l => l.classList.remove('active'));
    this.classList.add('active');
  });
});

//****************************************** */

// Initialisation de AOS (animation on scroll)
function aosInit() {
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
}

window.addEventListener('load', aosInit);

//****************************************** */

// Initialisation de Typed.js (texte animé dynamique)
document.addEventListener('DOMContentLoaded', () => {
  const selectTyped = document.querySelector('.typed');

  if (selectTyped) {
    let typed_strings = selectTyped.getAttribute('data-typed-items');
    typed_strings = typed_strings.split(',').map(s => s.trim());

    new Typed('.typed', {
      strings: typed_strings,
      loop: true,
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000
    });
  }
});

//****************************************** */

// Affichage automatique de l'année en cours
const yearElement = document.getElementById('year');

if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

//****************************************** */

// Scroll : Effet sticky sur le scroll pour la navbar
function checkStickyNav() {
  const nav = document.querySelector('.nav');
  if (!nav) return;

  if (window.innerWidth > 720) {
    if (window.scrollY > 690) {
      nav.classList.add('sticky');
    } else {
      nav.classList.remove('sticky');
    }
  } else {
    nav.classList.remove('sticky');
  }
}

window.addEventListener('scroll', checkStickyNav);
window.addEventListener('resize', checkStickyNav);

//****************************************** */

// Toggle du menu (header hamburger)
const headerToggleBtn = document.querySelector('.header-toggle');
const header = document.querySelector('#header');

if (headerToggleBtn && header) {
  headerToggleBtn.addEventListener('click', () => {
    header.classList.toggle('header-show');
    headerToggleBtn.classList.toggle('bi-list');
    headerToggleBtn.classList.toggle('bi-x');
  });
}

// Fermer le menu lorsque l'on clique sur un lien
if (header && links.length > 0) {
  links.forEach(link => {
    link.addEventListener('click', () => {
      if (header.classList.contains('header-show')) {
        header.classList.remove('header-show');
        headerToggleBtn.classList.add('bi-list');
        headerToggleBtn.classList.remove('bi-x');
      }
    });
  });
}

//****************************************** */

// Masquer des éléments en mobile si largeur <= 720px
if (window.innerWidth <= 720) {
  const logo = document.querySelector('.logo');
  const search = document.querySelector('.search');
  const content_presentation = document.querySelector('.content_presentation');

  logo?.remove();
  search?.remove();
  content_presentation?.remove();
}

//****************************************** */

// Scroll to top button
const scrollTop = document.querySelector('.scroll-top');

function toggleScrollTop() {
  if (scrollTop) {
    window.scrollY > 100 ? scrollTop.classList.add('active') : scrollTop.classList.remove('active');
  }
}

if (scrollTop) {
  scrollTop.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
}

window.addEventListener('load', toggleScrollTop);
document.addEventListener('scroll', toggleScrollTop);

//****************************************** */

//Animation on scroll function and init
function aosInit() {
  AOS.init({
    duration: 600,
    easing: 'ease-in-out',
    once: true,
    mirror: false
  });
 }

window.addEventListener('load', aosInit);

//******************************************************* */
const API_URL_LOCAL = 'http://localhost:3000/send-email'; // En dev
// const API_URL_PRODUCTION = 'https://portfolio-moussa-thiam.com/send-email';   // En prod
const API_URL_PRODUCTION = 'https://portfolio-backend-5xnz.onrender.com/send-email'; // 👈 exemple : En prod

const isLocalhost = window.location.hostname === "localhost";

const API_URL = isLocalhost ? API_URL_LOCAL: API_URL_PRODUCTION;

document.getElementById('contactForm').addEventListener('submit', async function (e) {
  e.preventDefault(); // Empêche le rechargement de la page

  const name = document.getElementById('name').value;
  const email = document.getElementById('email').value;
  const subject = document.getElementById('subject').value;
  const message = document.getElementById('message').value;

  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      name,
      email, 
      subject, 
      message 
    })
  });

  const data = await response.json();

  if (data.success) {
    alert('Votre message a été envoyé avec succès !');
    this.reset(); // 👈 Réinitialise tous les champs du formulaire
  } else {
    alert('Une erreur est survenue. Réessayez plus tard.');
  }
});



