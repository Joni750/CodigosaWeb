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

var logo = document.querySelector('.logoColor');

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

    } else {

        /*Si entra aqui significa que esta arriba, si esta en movil no lo dejamos transparente si esta en pc si */

        if (window.innerWidth > 900) {
            header.style.backgroundColor = "transparent";
        }

    }

    if (window.scrollY > 800) {

        /*Si esta en el borde de la portada lo cambiamos a negro el logo y el header a blanco */

        header.style.backgroundColor = "#fff";
        logo.style.fill = "#000";

    } else {

        /*si no esta debajo de la portada el logo seguira blanco */
        logo.style.fill = "#fff";

    }

})

// Menu hamburguesa

document.addEventListener('DOMContentLoaded', function () {

    var menuIcon = document.getElementById('burger');
    var nav = document.getElementById('nav');

    menuIcon.addEventListener('click', function () {
        nav.classList.toggle('open');
    });

});


document.addEventListener('DOMContentLoaded', function () {

    var carta1 = document.getElementById('carta1');
    var carta2 = document.getElementById('carta2');
    var carta3 = document.getElementById('carta3');
    var cartaActiva = document.querySelector('.cartaActiva');

    carta1.addEventListener('click', function () {
        cartaActiva.classList.toggle('cartaActiva');
        carta1.classList.toggle('cartaActiva');

        /*Mover la carta*/
    });

    carta3.addEventListener('click', function () {
        cartaActiva.classList.toggle('cartaActiva');
        carta2.classList.toggle('cartaActiva');

        /*Mover la carta*/
    });

    carta3.addEventListener('click', function () {
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

punto.forEach((cadaPunto, i) => {
    punto[i].addEventListener('click', () => {
        let posicion = i;

        let operacion;
        if (posicion == 0) {
            operacion = 33;
        } else if (posicion == 1) {
            operacion = 0;
        } else if (posicion == 2) {
            operacion = -33;
        }

        bloqueCartas.style.transform = `translateX(${operacion}%)`;

        punto.forEach((cadaPunto, h) => {
            punto[h].classList.remove('activo')
        })
        punto[i].classList.add('activo');


    })
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
        bloqueCartas.style.transform = `translateX(0%)`;

        punto.forEach((cadaPunto, i) => {
            punto[i].classList.remove('activo')
            punto[1].classList.add('activo');
        })
    }
});

// Scroll inicio proyectos destacados

window.addEventListener("scroll", adaptarTextoRotatorio);
window.addEventListener("DOMContentLoaded", adaptarTextoRotatorio);
window.addEventListener("resize", adaptarTextoRotatorio);


function adaptarTextoRotatorio() {


    var destacados = document.getElementById('destacadosTitulo');

    console.log(window.scrollY)
    console.log("width: " + window.innerWidth)

    if (window.innerWidth >= 1200) {

        /*Verificamos que rango de resulucion tiene, en funcion de eso
        tendra un scroll concreto y una colocacion concreta*/

        if (window.innerWidth >= 1900) {
            if (window.scrollY > 2582 && window.scrollY < 3319) {
                console.log("estoy aqui2")
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 3319) {
                console.log("estoy aqui3")
                destacados.style.position = "absolute";
                destacados.style.top = "3780px";
            } else {
                console.log("estoy aqui4")
                destacados.style.position = "absolute";
                destacados.style.top = "3030px";

            }
        } else if (window.innerWidth >= 1800) {
            if (window.scrollY > 2581 && window.scrollY < 3326) {
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 3326) {
                destacados.style.position = "absolute";
                destacados.style.top = "3760px";
            } else {
                destacados.style.position = "absolute";
                destacados.style.top = "3030px";
            }
        }
        else if (window.innerWidth >= 1700) {
            if (window.scrollY > 2532 && window.scrollY < 3266) {
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 3266) {
                destacados.style.position = "absolute";
                destacados.style.top = "3720px";
            } else {
                destacados.style.position = "absolute";
                destacados.style.top = "2980px";
            }
        } else if (window.innerWidth >= 1600) {
            if (window.scrollY > 2493 && window.scrollY < 3227) {
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 3227) {
                destacados.style.position = "absolute";
                destacados.style.top = "3680px";
            } else {
                destacados.style.position = "absolute";
                destacados.style.top = "2940px";
            }
        } else if (window.innerWidth >= 1500) {
            if (window.scrollY > 2483 && window.scrollY < 3218) {
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 3218) {
                destacados.style.position = "absolute";
                destacados.style.top = "3670px";
            } else {
                destacados.style.position = "absolute";
                destacados.style.top = "2932px";
            }
        } else if (window.innerWidth >= 1400) {
            if (window.scrollY > 2447 && window.scrollY < 3177) {
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 3177) {
                destacados.style.position = "absolute";
                destacados.style.top = "3635px";
            } else {
                destacados.style.position = "absolute";
                destacados.style.top = "2895px";
            }
        } else if (window.innerWidth >= 1300) {
            if (window.scrollY > 2390 && window.scrollY < 3077) {
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 3077) {
                destacados.style.position = "absolute";
                destacados.style.top = "3550px";
            } else {
                destacados.style.position = "absolute";
                destacados.style.top = "2840px";
            }
        } else {
            if (window.scrollY > 2326 && window.scrollY < 2998) {
                destacados.style.position = "fixed";
                destacados.style.marginTop = "initial";
                destacados.style.top = "450px";
            } else if (window.scrollY >= 2998) {
                destacados.style.position = "absolute";
                destacados.style.top = "3445px";
            } else {
                destacados.style.position = "absolute";
                destacados.style.top = "2780px";
            }
        }

    } else {
        destacados.style.top = "initial";
        destacados.style.position = "initial";
    }




}

// Carrusel servicios

document.addEventListener('DOMContentLoaded', function () {
    const carouselTrack = document.querySelector('.car-img1');
    const carouselTrack2 = document.querySelector('.car-img2');
    const carouselTrack3 = document.querySelector('.car-img3');

    function pauseAnimation() {
        carouselTrack.style.animationPlayState = 'paused';
        carouselTrack2.style.animationPlayState = 'paused';
        carouselTrack3.style.animationPlayState = 'paused';
    }

    function resumeAnimation() {
        carouselTrack.style.animationPlayState = 'running';
        carouselTrack2.style.animationPlayState = 'running';
        carouselTrack3.style.animationPlayState = 'running';
    }

    carouselTrack.addEventListener('mouseover', pauseAnimation);
    carouselTrack.addEventListener('mouseout', resumeAnimation);

    carouselTrack2.addEventListener('mouseover', pauseAnimation);
    carouselTrack2.addEventListener('mouseout', resumeAnimation);

    carouselTrack3.addEventListener('mouseover', pauseAnimation);
    carouselTrack3.addEventListener('mouseout', resumeAnimation);
});
