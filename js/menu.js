const btnMenu = document.getElementById("toggle-menu");
const NMobile = document.getElementById("navigation-mobile");

function toggle_menu(){
    btnMenu.classList.toggle("active");
    NMobile.classList.toggle("active");
}
btnMenu.addEventListener("click", toggle_menu);