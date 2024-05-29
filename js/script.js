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



/*Adquirimos el logo para cambiarlo de color cuando queramos*/ 

var logo= document.querySelector('.logoColor');

/*entramos aqui cuando usa el scroll*/

window.addEventListener("scroll", function () {

    /*adquirimos el header para cambiarlo de color cuando lo necesitemos*/

    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 800);

    /*Si no esta el scroll en 0 (arriba) le ponemos que tenga un 
    color negro pero con transparencia para que se pueda leer las opciones,
    esto hasta llegar al borde de la portada, ahi se cambiaria a blanco */
    console.log(window.innerWidth)
    if (window.scrollY > 0) {
        header.style.backgroundColor = "#0008";
          
    }else{

        /*Si entra aqui significa que esta arriba, si esta en movil no
        lo dejamos transparente si esta en pc si */

        if(window.innerWidth > 900){
            header.style.backgroundColor = "transparent";  
        }
       
    } 

    if (window.scrollY > 800) {

        /*Si esta en el borde de la portada lo cambiamos a negro el logo
        y el header a blanco */

        header.style.backgroundColor = "#fff";
        logo.style.fill = "#000";    

    }else{
        /*si no esta debajo de la portada el logo seguira blanco */
        logo.style.fill = "#fff";
    } 


   

})



// Menu hamburguesa

document.addEventListener('DOMContentLoaded', function() {

    var menuIcon = document.getElementById('burger');
    var nav = document.getElementById('nav');

    menuIcon.addEventListener('click', function() {
        nav.classList.toggle('open');
    });
    
});