//Scroll a cada sección

function scrollToSection(sectionId) {
    var section = document.querySelector(sectionId);
    var targetPosition = section.offsetTop; // Obtiene la posición superior de la sección
    var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

    var distance = targetPosition - currentPosition;
    var duration = 700; // Duración de la animación en milisegundos
    var startTime;

    function scrollStep(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = timestamp - startTime;

        var easing = function (t) {
            return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
        };

        window.scrollTo(0, currentPosition + distance * easing(progress / duration));

        if (progress < duration) {
            window.requestAnimationFrame(scrollStep);
        } else {
            window.scrollTo(0, targetPosition);
            isScrolling = false;
        }
    }

    window.requestAnimationFrame(scrollStep);

}

//Scroll para arriba

function scrollToTop() {
    if (!isScrolling) {
        isScrolling = true;
        scrollToTopAnimation();
    }
}

function scrollToTopAnimation() {
    var currentPosition = document.documentElement.scrollTop || document.body.scrollTop;

    if (currentPosition > 0) {
        window.requestAnimationFrame(scrollToTopAnimation);
        window.scrollTo(0, currentPosition - currentPosition / 30);
    } else {
        isScrolling = false;
    }
}

//Flecha

var isScrolling = false;

window.onscroll = function () {
    mostrarFlecha();
};

function mostrarFlecha() {
    var flecha = document.querySelector('.flecha');
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        flecha.style.display = 'block';
    } else {
        flecha.style.display = 'none';
    }
}

var logoBlanco = document.getElementById('logoBlanco');
var logoNegro = document.getElementById('logoNegro');

//Cambio de fondo header

window.addEventListener("DOMContentLoaded", function () {
    logoNegro.style.display = "none";
})

window.addEventListener("scroll", function () {
    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 800);
 
    if (window.scrollY > 800) {
        logoBlanco.style.display = "none";
        logoNegro.style.display = "block";    
    } else  {
        logoNegro.style.display = "none";
        logoBlanco.style.display = "block";
    } 

})

