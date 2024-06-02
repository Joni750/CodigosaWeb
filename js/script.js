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

// var isScrolling = false;

// window.onscroll = function () {
//     mostrarFlecha();
// };

// function mostrarFlecha() {
//     var flecha = document.querySelector('.flecha');
//     if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
//         flecha.style.display = 'block';
//     } else {
//         flecha.style.display = 'none';
//     }
// }



/*Adquirimos el logo para cambiarlo de color cuando queramos*/ 

var logo= document.querySelector('.logoColor');

/*entramos aqui cuando usa el scroll*/

window.addEventListener("scroll", function () {

    /*adquirimos el header para cambiarlo de color cuando lo necesitemos*/

    var header = document.querySelector("header");
    header.classList.toggle("abajo", window.scrollY > 800);

    /*Si no esta el scroll en 0 (arriba) le ponemos que tenga un  color negro pero con transparencia para que se pueda leer las opciones,
    esto hasta llegar al borde de la portada, ahi se cambiaria a blanco */
    console.log(window.innerWidth)

    if (window.scrollY > 0) {

        header.style.backgroundColor = "#0008";
          
    }else{

        /*Si entra aqui significa que esta arriba, si esta en movil no lo dejamos transparente si esta en pc si */

        if(window.innerWidth > 900){
            header.style.backgroundColor = "transparent";  
        }
       
    } 

    if (window.scrollY > 800) {

        /*Si esta en el borde de la portada lo cambiamos a negro el logo y el header a blanco */

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


document.addEventListener('DOMContentLoaded', function() {

    var carta1 = document.getElementById('carta1');
    var carta2 = document.getElementById('carta2');
    var carta3 = document.getElementById('carta3');
    var cartaActiva = document.querySelector('.cartaActiva');

    carta1.addEventListener('click', function() {
        cartaActiva.classList.toggle('cartaActiva');
        carta1.classList.toggle('cartaActiva');

        /*Mover la carta*/
    });

    carta3.addEventListener('click', function() {
        cartaActiva.classList.toggle('cartaActiva');
        carta2.classList.toggle('cartaActiva');

        /*Mover la carta*/
    });

    carta3.addEventListener('click', function() {
        cartaActiva.classList.toggle('cartaActiva');
        carta3.classList.toggle('cartaActiva');

        /*Mover la carta*/
    });
    
});





/*PRUEBA CARROUSELL*/

var bloqueCartas = document.querySelector('#precios-cartas');
var punto = document.querySelectorAll('.punto');

//Cuando click en punto
    //Saber pos del punto
    //aplicar translateX al bloqueCartas
    //quitar clase activos a todos
    //añadir clase activo al que hemos dado click

punto.forEach( (cadaPunto, i)=> {
    punto[i].addEventListener('click', ()=>{
        let posicion = i;

        let operacion;
        if(posicion == 0){
            operacion = 33;
        }else if(posicion == 1){
            operacion = 0;
        }else if(posicion == 2){
            operacion = -33;
        }

        bloqueCartas.style.transform = `translateX(${operacion}%)`;

        punto.forEach((cadaPunto, h )=>{
            punto[h].classList.remove('activo')
        })
        punto[i].classList.add('activo');

        
    })
});

window.addEventListener('resize', ()=>{
    if(window.innerWidth > 1200){
        bloqueCartas.style.transform = `translateX(0%)`;

        punto.forEach((cadaPunto, i )=>{
            punto[i].classList.remove('activo')
            punto[1].classList.add('activo');
        })
    }
});

// Scroll inicio proyectos destacados

window.addEventListener("scroll", function () {

    var destacados = document.getElementById('destacadosTitulo');

    if (window.scrollY > 2000 && window.scrollY < 2806) {

        destacados.style.position = "fixed";

        destacados.style.top = "910px";

        destacados.style.marginTop = "initial";


    }else if (window.scrollY >= 2806) {

        destacados.style.position = "absolute";

        destacados.style.top = "initial";

        destacados.style.marginTop = "1600px";

    }else {

        destacados.style.position = "absolute";

        destacados.style.top = "initial";

        destacados.style.marginTop = "initial";

    }

})

// Carrusel servicios

document.addEventListener('DOMContentLoaded', function() {
    const carouselImages = document.getElementsByClassName("carousel-images")[0];
    const images = document.querySelectorAll('.carousel-images img');
    let index = 0;
    const totalImages = images.length;
    let intervalId;

    function moveCarousel() {
        index++;
        if (index >= totalImages) {
            index = 0;
            // Elimina la transición temporalmente para evitar un salto brusco
            carouselImages.style.transition = 'none';
            carouselImages.style.transform = 'translateX(0)';
            // Forzar reflujo para aplicar el cambio instantáneamente
            void carouselImages.offsetWidth; // o carouselImages.clientHeight;
            // Reestablece la transición
            carouselImages.style.transition = 'transform 1s ease';
        } else {
            const width = images[index].clientWidth;
            carouselImages.style.transform = `translateX(${-index * width}px)`;
        }
    }

});


// document.addEventListener('DOMContentLoaded', function() {
//     const carouselTrack = document.querySelector('.carousel-images');

//     function pauseAnimation() {
//         carouselTrack.style.animationPlayState = 'paused';
//     }

//     function resumeAnimation() {
//         carouselTrack.style.animationPlayState = 'running';
//     }

//     carouselTrack.addEventListener('mouseover', pauseAnimation);
//     carouselTrack.addEventListener('mouseout', resumeAnimation);
// });