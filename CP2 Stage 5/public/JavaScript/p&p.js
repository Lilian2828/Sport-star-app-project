//hamburger button togle:
const hamburgerButton = document.getElementsByClassName("hamburger-menu")[0];
const navbar = document.getElementsByTagName("ul")[0];

hamburgerButton.addEventListener('click', ()=>{
  navbar.classList.toggle('active');
})