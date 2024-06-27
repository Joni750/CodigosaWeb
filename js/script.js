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

//Animación sections

document.addEventListener("DOMContentLoaded", function() {

    const animarElements = document.querySelectorAll('.animar');
    function checkVisibility() {
        const triggerBottom = window.innerHeight / 5 * 4;

        animarElements.forEach(element => {
            const boxTop = element.getBoundingClientRect().top;

            if (boxTop < triggerBottom) {
                element.classList.add('visible');
            } else {
                element.classList.remove('visible');
            }
        });
    }

    window.addEventListener('scroll', checkVisibility);
    checkVisibility();
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


        if (window.innerWidth >= 2500) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 3000 && window.scrollY < 3740) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "4290px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3450px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2593 && window.scrollY < 3455) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "420px";                 
                } else if (window.scrollY >= 3455) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3880px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3030px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2625 && window.scrollY < 3441) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "395px";                
                } else if (window.scrollY >= 3441) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3840px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3010px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2592 && window.scrollY < 3419) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3810px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2970px";
    
                }
            }else{
                if (window.scrollY > 2600 && window.scrollY < 3445) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3445) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3800px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2955px";
    
                }
            }
            
        } else if (window.innerWidth >= 2200) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2800 && window.scrollY < 3640) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "4100px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3260px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2593 && window.scrollY < 3455) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "420px";                 
                } else if (window.scrollY >= 3455) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3880px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3030px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2625 && window.scrollY < 3441) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "395px";                
                } else if (window.scrollY >= 3441) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3840px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3010px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2592 && window.scrollY < 3419) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3810px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2970px";
    
                }
            }else{
                if (window.scrollY > 2600 && window.scrollY < 3445) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3445) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3800px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2955px";
    
                }
            }
            
        } else if (window.innerWidth >= 2000) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2700 && window.scrollY < 3530) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3980px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3150px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2593 && window.scrollY < 3455) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "420px";                 
                } else if (window.scrollY >= 3455) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3880px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3030px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2625 && window.scrollY < 3441) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "395px";                
                } else if (window.scrollY >= 3441) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3840px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3010px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2592 && window.scrollY < 3419) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3810px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2970px";
    
                }
            }else{
                if (window.scrollY > 2600 && window.scrollY < 3445) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3445) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3800px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2955px";
    
                }
            }
            
        } else if (window.innerWidth >= 1900) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2582 && window.scrollY < 3419) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3880px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3030px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2593 && window.scrollY < 3455) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "420px";                 
                } else if (window.scrollY >= 3455) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3880px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3030px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2625 && window.scrollY < 3441) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "395px";                
                } else if (window.scrollY >= 3441) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3840px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3010px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2592 && window.scrollY < 3419) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3810px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2970px";
    
                }
            }else{
                if (window.scrollY > 2600 && window.scrollY < 3445) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3445) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3800px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2955px";
    
                }
            }
            
        } else if (window.innerWidth >= 1800) {


            if (window.innerHeight >= 900){
                if (window.scrollY > 2582 && window.scrollY < 3419) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3419) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3825px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3000px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2547 && window.scrollY < 3355) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "435px";                 
                } else if (window.scrollY >= 3355) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3800px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2980px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2543 && window.scrollY < 3383) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "400px";                
                } else if (window.scrollY >= 3383) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3780px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2950px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2522 && window.scrollY < 3349) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3349) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3730px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2915px";
    
                }
            }else{
                if (window.scrollY > 2531 && window.scrollY < 3356) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3356) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3700px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2885px";
    
                }
            }

        }
        else if (window.innerWidth >= 1700) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2548 && window.scrollY < 3336) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3336) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3790px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3010px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2547 && window.scrollY < 3331) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "435px";                 
                } else if (window.scrollY >= 3331) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3765px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2980px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2543 && window.scrollY < 3328) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "400px";                
                } else if (window.scrollY >= 3328) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3735px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2950px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2522 && window.scrollY < 3329) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3329) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3710px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2915px";
    
                }
            }else{
                if (window.scrollY > 2531 && window.scrollY < 3356) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3356) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3700px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2885px";
    
                }
            }
        }else if (window.innerWidth >= 1600) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2548 && window.scrollY < 3336) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3336) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3790px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3010px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2547 && window.scrollY < 3331) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "435px";                 
                } else if (window.scrollY >= 3331) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3765px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2980px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2543 && window.scrollY < 3328) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "400px";                
                } else if (window.scrollY >= 3328) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3735px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2950px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2522 && window.scrollY < 3329) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3329) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3710px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2915px";
    
                }
            }else{
                if (window.scrollY > 2496 && window.scrollY < 3265) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3265) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3620px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2845px";
    
                }
            }
        } else if (window.innerWidth >= 1500) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2548 && window.scrollY < 3276) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3276) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3730px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2995px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2538 && window.scrollY < 3265) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "435px";                 
                } else if (window.scrollY >= 3265) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3695px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2970px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2525 && window.scrollY < 3252) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "400px";                
                } else if (window.scrollY >= 3252) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3655px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2930px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2522 && window.scrollY < 3242) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3242) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3625px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2895px";
    
                }
            }else{
                if (window.scrollY > 2496 && window.scrollY < 3235) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "355px";                 
                } else if (window.scrollY >= 3235) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3595px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2845px";
    
                }
            }
        } else if (window.innerWidth >= 1400) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2493 && window.scrollY < 3187) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3187) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3640px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2945px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2476 && window.scrollY < 3176) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "435px";                 
                } else if (window.scrollY >= 3176) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3605px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2910px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2472 && window.scrollY < 3164) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "410px";                
                } else if (window.scrollY >= 3164) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3575px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2880px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2460 && window.scrollY < 3152) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3152) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3540px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2845px";
    
                }
            }else{
                if (window.scrollY > 2450 && window.scrollY < 3147) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "357px";                 
                } else if (window.scrollY >= 3147) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3495px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2805px";
    
                }
            }
        } else if (window.innerWidth >= 1300) {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2431 && window.scrollY < 3106) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3106) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3560px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2885px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2433 && window.scrollY < 3105) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "425px";                 
                } else if (window.scrollY >= 3105) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3535px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2855px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2425 && window.scrollY < 3095) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "400px";                
                } else if (window.scrollY >= 3095) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3495px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2825px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2412 && window.scrollY < 3083) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3083) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3460px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2790px";
    
                }
            }else{
                if (window.scrollY > 2400 && window.scrollY < 3073) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "353px";                 
                } else if (window.scrollY >= 3073) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3428px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2750px";
    
                }
            }
        }else if (window.innerWidth >= 1250) {

            
            if (window.innerHeight >= 900){
                if (window.scrollY > 2396 && window.scrollY < 3051) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3051) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3500px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2850px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2388 && window.scrollY < 3045) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "425px";                 
                } else if (window.scrollY >= 3045) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3465px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2820px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2378 && window.scrollY < 3030) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "400px";                
                } else if (window.scrollY >= 3030) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3435px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2785px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2376 && window.scrollY < 3020) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 3020) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3400px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2755px";
    
                }
            }else{
                if (window.scrollY > 2362 && window.scrollY < 3009) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "353px";                 
                } else if (window.scrollY >= 3009) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3368px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2715px";
    
                }
            }
        }else {
            if (window.innerHeight >= 900){
                if (window.scrollY > 2372 && window.scrollY < 3000) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "450px";                 
                } else if (window.scrollY >= 3000) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3450px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2820px";
    
                }
            }else if (window.innerHeight >= 850){
                if (window.scrollY > 2366 && window.scrollY < 2999) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "425px";                 
                } else if (window.scrollY >= 2999) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3425px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2795px";
    
                }
            }else if (window.innerHeight >= 800){
                if (window.scrollY > 2351 && window.scrollY < 2985) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "400px";                
                } else if (window.scrollY >= 2985) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3385px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2755px";
    
                }
            }else if (window.innerHeight >= 750){
                if (window.scrollY > 2340 && window.scrollY < 2974) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "380px";                 
                } else if (window.scrollY >= 2974) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3355px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2720px";
    
                }
            }else{
                if (window.scrollY > 2332 && window.scrollY < 2965) {
                    destacados.style.position = "fixed";
                    destacados.style.marginTop = "initial";
                    destacados.style.top = "353px";                 
                } else if (window.scrollY >= 2965) {
                    /*POST*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "3318px";
    
                } else {
                    /*PRE*/
                    destacados.style.position = "absolute";
                    destacados.style.top = "2685px";
    
                }
            }
        }

    } else {
        destacados.style.top = "initial";
        destacados.style.position = "initial";
    }

}