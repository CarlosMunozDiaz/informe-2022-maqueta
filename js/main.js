/* LÓGICA DE ENTRADA */
getUrlHash();

/* LÓGICA EN BOTONES DE MENÚ */
for(let i = 0; i < links.length; i++) {
    links[i].addEventListener('click', function(e){
        e.preventDefault();
        setMenuSelection(e.target);
    });
}