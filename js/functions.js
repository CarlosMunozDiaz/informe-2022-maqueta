/* VARIABLES GLOBALES */
let currentHeaderSection = '';
let urlTypes = ['#portada', '#demografia', '#salud', '#economia', '#social'];
let links = document.getElementsByClassName('menu__link');

/******
LÓGICA DE URLS Y MENÚ 
******/
window.addEventListener("hashchange", function() {
    getUrlHash();
}, false);

function getUrlHash() {
    let url = window.location.hash;
    if(url == '' || urlTypes.indexOf(url)!= -1) {
        setMenuStyles(url, 'url');
        displaySection(url);
    } else {
        alert("ERROR. NO EXISTE TAL PÁGINA")
    }    
}

function setMenuSelection(elem) {
    let link = elem.href;
    link = '#' + link.split("#")[1];
    if(link != currentHeaderSection) {
        setMenuStyles(elem, 'menu');
        displaySection(link);
    }    
}

function displaySection(path) {
    if(path == '') {
        path = '#portada';
    }

    console.log(path, currentHeaderSection);

    //Visibilidad para la sección
    if(path != currentHeaderSection) {
        if(currentHeaderSection != '') {
            document.getElementById(`${currentHeaderSection.substr(1,)}`).classList.remove('visible');
        }        

        switch(path) {
            case '#portada':
                document.getElementById('portada').classList.add('visible');
                break;
            case '#demografia':
                document.getElementById('demografia').classList.add('visible');
                break;
            case '#salud':
                document.getElementById('salud').classList.add('visible');
                break;
            case '#economia':
                document.getElementById('economia').classList.add('visible');
                break;
            case '#social':
                document.getElementById('social').classList.add('visible');
                break;
            default:
                document.getElementById('portada').classList.add('visible');
                break;
        }
    }
    
    currentHeaderSection = path;
}

function setMenuStyles(elem, type) {
    let links = document.getElementsByClassName('menu__link');
    for(let i = 0; i < links.length; i++) {
        links[i].classList.remove('active');
    }

    if(type == 'url') {
        if(elem == ""){
            let link = document.getElementsByClassName('menu__link')[0];
            link.classList.add('active');
        } else {
            for(let i = 0; i < links.length; i++) {
                let attribute = links[i].href;
                attribute = '#' + attribute.split("#")[1];
                if(elem == attribute) {
                    links[i].classList.add('active');
                }
            }            
        }
    } else {
        elem.classList.add('active');
    }    
}

/******
LÓGICA DE PORTADA (HEADER Y SCROLLYTELLING)
******/


/******
LÓGICA DE SECCIONES (SI FUESE NECESARIO) 
******/