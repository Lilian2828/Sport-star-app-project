//hamburger button togle:
const hamburgerButton = document.getElementsByClassName("hamburger-menu")[0];
const navbar = document.getElementsByTagName("ul")[0];

hamburgerButton.addEventListener('click', ()=>{
  navbar.classList.toggle('active');
})
 

//Index of the slide
let slideIndex = 0;
function showSlides() {
  let i;
  //create variables to access the html clases
  let slides = document.getElementsByClassName("slide");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  slides[slideIndex-1].style.display = "block";  
  setTimeout(showSlides, 4000); // Change image every 3.5 seconds
}

showSlides();