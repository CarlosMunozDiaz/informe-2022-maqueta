/* LÓGICA DE ENTRADA */
getUrlHash();

/* LÓGICA EN BOTONES DE MENÚ */
for(let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e){
        e.preventDefault();
        setMenuSelection(e.target);
    });
}

//SCROLLYTELLING
let body = d3.select('body');
let scrolly = body.select("#scrolly");
let figure = scrolly.select("#header-chart");
let figureJs = document.getElementById('figure');
let article = scrolly.select("article");
let step = article.selectAll(".step");
let scroller = scrollama();
let lastScrollTop = 0, centerHeight = 0, lastHeight = 0;

//SCROLLAMA
function handleScrollamaResize() {
    let stepH = Math.floor(window.innerHeight * 1);
    step.style("height", stepH + "px");

    let altoVentana = window.innerHeight;
    let altoFlourish = figureJs.getBoundingClientRect().height;

    let diferencia = altoVentana - altoFlourish;
    let diferencia_2 = diferencia / 2;

    centerHeight = diferencia_2;
    lastHeight = document.getElementById('scrolly').clientHeight - 650;

    figure.style("top", centerHeight + "px");    

    scroller.resize();
}

function handleStepEnter(response) {
    step.classed("is-active", function(d, i) {
        return i === response.index;
    });

    let iframe = document.getElementById('index');
    iframe.textContent = response.index + 1;
}

function handleOwnResize() {
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
}

function init() {
    handleOwnResize();
    handleScrollamaResize();

    scroller
      .setup({
        step: "#scrolly article .step",
        offset: 0.35,
        debug: false
      })
      .onStepEnter(handleStepEnter);

    // setup resize event
    window.addEventListener("resize", function() {
      handleOwnResize();
      handleScrollamaResize();    
    });

    
}

// kick things off
init();

//CSS PARA FIXED-ABSOLUTE DE LA VISUALIZACIÓN
function handleStepEnter2() {
    percentageOfElement(document.getElementById('scrolly'));
}

function percentageOfElement(el){
    // Get the relevant measurements and positions
    const viewportHeight = window.innerHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const elementOffsetTop = el.offsetTop;
    const elementHeight = el.offsetHeight;

    // Calculate percentage of the element that's been seen
    const distance = scrollTop + viewportHeight - elementOffsetTop;
    let percentage = Math.round(distance / ((viewportHeight + elementHeight) / 100));

    // Restrict the range to between 0 and 100
    let perc = Math.min(100, Math.max(0, percentage));

    // Detección de movimiento en scroll
    let st = window.pageYOffset || document.documentElement.scrollTop;

    if (st > lastScrollTop){
        if (perc == 20) {
            document.getElementById('header-chart').classList.add('active');
            figure.style("top", centerHeight + "px");    
        } else if (perc >= 84 && perc <= 86) {
            document.getElementById('header-chart').classList.remove('active');
            figure.style("top", lastHeight + "px");    
        }
    } else {
        if (perc <= 20) {
            document.getElementById('header-chart').classList.remove('active');
            figure.style("top", centerHeight + "px");    
        } else if (perc >= 84 && perc <= 86) {
            document.getElementById('header-chart').classList.add('active');
            figure.style("top", centerHeight + "px"); 
        }
    }

    lastScrollTop = st <= 0 ? 0 : st;
}

window.addEventListener('scroll', function() {
  handleStepEnter2();
});



