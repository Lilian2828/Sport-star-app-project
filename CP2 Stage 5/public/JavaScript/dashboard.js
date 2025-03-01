//hamburger button togle:
const hamburgerButton = document.getElementsByClassName("hamburger-menu")[0];
const navbar = document.getElementsByTagName("ul")[0];

hamburgerButton.addEventListener('click', ()=>{
  navbar.classList.toggle('active');
})

let universities = {
  data: [
    {
      uniName: "King's College London",
      country: "england",
      courses: "7",
      image: "../images/KingCollege.jpeg",
      link: "https://www.kcl.ac.uk/sport",
    },
    {
      uniName: "University Of Ulster",
      country: "northernireland",
      courses: "8",
      image: "../images/ulster.webp",
      link: "https://www.ulster.ac.uk/sport",
    },
    {
      uniName: "University of Glasgow",
      country: "scotland",
      courses: "7",
      image: "../images/glasgow.jpg",
      link: "https://www.gla.ac.uk/myglasgow/sport/",
    },
    {
      uniName: "University of Cambridge",
      country: "england",
      courses: "9",
      image: "../images/Cambridge.jpeg",
      link: "https://u-paris.fr/en/sports",
    },
    {
      uniName: "University of Dundee",
      country: "scotland",
      courses: "18",
      image: "../images/dundee.png",
      link: "https://www.scottishstudentsport.com/events/basketball-trophy-final/",
    },
    {
      uniName: "Dublin City University",
      country: "northernireland",
      courses: "10",
      image: "../images/dublin.jpg",
      link: "https://www.dcu.ie/dcusport",
    },
    {
      uniName: "Greenwich, University of London",
      country: "england",
      courses: "16",
      image: "../images/Greenwich.jpg",
      link: "https://www.greenwichssp.co.uk/",
    },
    {
      uniName: "Brunel University London",
      country: "england",
      courses: "7",
      image: "../images/brunel.jpg",
      link: "https://www.brunel.ac.uk/life/sport",
    },
    {
       uniName: "University of Manchester",
       country: "england",
       courses: "18",
       image: "../images/manchester.jpg",
       link: "https://www.sport.manchester.ac.uk/",
    },
    {
       uniName: "University of South Wales",
       country: "wales",
       courses: "16",
       image: "../images/southwales.jpg",
       link: "https://www.southwales.ac.uk/study/subjects/sport-degrees/",
    },
    {
       uniName: "Cardiff University",
       country: "wales",
       courses: "13",
       image: "../images/cardif.jpg",
       link: "https://www.cardiff.ac.uk/community/use-our-facilities/sport",
    },
    {
       uniName: "University Of Wales Trinity Saint David",
       country: "wales",
       courses: "8",
       image: "../images/tsd.jpg",
       link: "https://www.uwtsd.ac.uk/sports-home/",
    },
  ],
};




for (let i of universities.data) {
  // Create an anchor tag
 let a = document.createElement("a");
 a.setAttribute('href',i.link);
 a.setAttribute('alt', i.uniName + " link to their website");
 a.setAttribute('style', "text-decoration: none; color: inherit");

  //Create Card
  let card = document.createElement("div");
  // Card should have category and should stay hidden initially
  card.classList.add("card", i.country, "hide");
  //image div
  let imgContainer = document.createElement("div");
  imgContainer.classList.add("image-container");
  //img tag
  let image = document.createElement("img");
  image.setAttribute("src", i.image);

  image.setAttribute("alt", " Image logo of " + i.uniName + " sport website ");

  imgContainer.appendChild(image);
  a.appendChild(imgContainer);
  //container
  let container = document.createElement("div");
  container.classList.add("container");
  //university name
  let name = document.createElement("h5");
  name.classList.add("uni-name");
  name.innerText = i.uniName.toUpperCase();
  container.appendChild(name);
  //number of courses
  let course = document.createElement("h6");
  course.innerText ="Available courses: " + i.courses;
  container.appendChild(course);
  a.appendChild(container);
  card.appendChild(a);
  document.getElementById("universities").appendChild(card);
}
//parameter passed from button (Parameter same as category)
function filterUniversity(value) {
  //Button class code
  let buttons = document.querySelectorAll(".button-value");
  buttons.forEach((button) => {
    //check if value equals innerText
    if (value.toUpperCase() == button.innerText.toUpperCase()) {
      button.classList.add("active");
    } else {
      button.classList.remove("active");
    }
  });
  //select all cards
  let elements = document.querySelectorAll(".card");
  //loop through all cards
  elements.forEach((element) => {
    //display all cards on 'all' button click
    if (value == "all") {
      element.classList.remove("hide");
    } else {
      //Check if element contains category class
      if (element.classList.contains(value)) {
        //display element based on category
        element.classList.remove("hide");
        element.classList.add("show");
      } else {
        //hide other elements
        element.classList.add("hide");
      }
    }
  });
}
//Search button click
document.getElementById("search").addEventListener("click", () => {
  //initializations n
  
  
  let searchInput = document.getElementById("search-input").value;
  let elements = document.querySelectorAll(".uni-name");
  let cards = document.querySelectorAll(".card");
  //loop through all elements
  elements.forEach((element, index) => {
    //check if text includes the search value
    if (element.innerText.includes(searchInput.toUpperCase())) {
      //display matching card
      cards[index].classList.remove("hide");
    } else {
      //hide others
      cards[index].classList.add("hide");
    }
  });
});
//Initially display all products
window.onload = () => {
  filterUniversity("all");
};