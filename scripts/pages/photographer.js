function photographerPresentationText(data) {
   // text presentation div
    const {name, tagline, city, country} = data;
    const location = city + ", " + country;

    const div = document.createElement( 'div');
    div.classList.add("photographer_presentation");

    const h2 = document.createElement( 'h2' );
    h2.textContent = name;

    const paragraphe1 = document.createElement( 'p' );
    paragraphe1.classList.add('location_presentation');
    paragraphe1.textContent = location;
    
    const paragraphe2 = document.createElement( 'p' );
    paragraphe2.classList.add('tagline_presentation');
    paragraphe2.textContent = tagline;

    div.appendChild(h2);
    div.appendChild(paragraphe1);
    div.appendChild(paragraphe2);

    // portrait div
    const {portrait} = data;
    const pictureSource = `assets/photographers/${portrait}`;

    const portraitDiv = document.createElement( 'div');
    portraitDiv.classList.add("photographer_portrait");

    const img = document.createElement( 'img');
    img.setAttribute("src", pictureSource);
    img.setAttribute('alt', 'portrait du photographe ' + name)
    portraitDiv.appendChild(img);

    const photographHeader = document.querySelector(".photograph-header");
    photographHeader.appendChild(div);
    photographHeader.appendChild(portraitDiv);

    const photographerName = document.querySelector("#modal_photographer");
    photographerName.textContent = name;
   
};

// TODO fetch json data instead of fakeData
const fakeData = {
        "name": "Mimi Keel",
        "id": 243,
        "city": "London",
        "country": "UK",
        "tagline": "Voir le beau dans le quotidien",
        "price": 400,
        "portrait": "MimiKeel.jpg"
    };

photographerPresentationText(fakeData);

// function fetchData() { 
//     fetch('data/photographers.json')
//     .then(responseData => responseData.json())
//     .then(data => console.log(data))    
// }
// fetchData()


// fake data for photographer galery
let fakeGallery = [{
			"id": 623534343,
			"photographerId": 243,
			"title": "Lonesome",
			"image": "Travel_Lonesome.jpg",
			"likes": 88,
			"date": "2019-02-03",
			"price": 45
		},
		{
			"id": 625025343,
			"photographerId": 243,
			"title": "Hillside Color",
			"image": "Travel_HillsideColor.jpg",
			"likes": 85,
			"date": "2019-04-03",
			"price": 45
		},
		{
			"id": 2525345343,
			"photographerId": 243,
			"title": "Wednesday Potrait",
			"image": "Portrait_Wednesday.jpg",
			"likes": 34,
			"date": "2019-04-07",
			"price": 45
		},
		{
			"id": 2523434634,
			"photographerId": 243,
			"title": "Nora Portrait",
			"image": "Portrait_Nora.jpg",
			"likes": 63,
			"date": "2019-04-07",
			"price": 45
		}]


class Lightbox{ 
    constructor(image,listImage) {
        this.closeLightbox =  this.closeLightbox.bind(this);
        this.selectedImage  = image; //image currently displayed on lightbox the first time we click ONLY. then NO!
        this.listImage = listImage; // list of all the image
        this.nextPicture = this.nextPicture.bind(this);
        this.previousPicture = this.previousPicture.bind(this);

        console.log(this);
        this.openLightbox();
    }
    displayImage (){ // function a eéutiliser pour montrer l'image à l'ouverture de la lightbox et aussi ensuite au click next ou previous
        const selectedImageSource  = 'assets/images/media/' + this.selectedImage.image;
        document.querySelector('.lightbox_container img').setAttribute('src', selectedImageSource);
        document.querySelector('.lightbox_container img').setAttribute('alt',this.selectedImage.title );
    }

    openLightbox(){
        document.querySelector('.lightbox').style.display = 'block';
        this.displayImage()
        document.querySelector('.lightbox_close').addEventListener('click',this.closeLightbox);
        document.querySelector('.lightbox_next').addEventListener('click',this.nextPicture);
        document.querySelector('.lightbox_previous').addEventListener('click',this.previousPicture);
    }

    closeLightbox(){
        document.querySelector('.lightbox_close').removeEventListener('click',this.closeLightbox);
        document.querySelector('.lightbox_next').removeEventListener('click',this.nextPicture);
        document.querySelector('.lightbox_previous').removeEventListener('click',this.previousPicture);

        document.querySelector('.lightbox').style.display = 'none';

    }

    nextPicture(){ // click droit
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); //retourne l'index de la position...
        //  ... de l'image actuelle et la stock grâce à la constance.
        const lastIndexOfArray = this.listImage.length -1; // pour déterminer le nb de photos dans ma liste
        if (lastIndexOfArray === currentIndex ) {
            // display first image en cliquant "à droite"
            this.selectedImage = this.listImage[0];         
            this.displayImage()
        } else {
            this.selectedImage = this.listImage[currentIndex+1];         
            this.displayImage()
        }
        
// exemple de mdn pour trouver un élément avec la condition  = true: 
// const array1 = [5, 12, 8, 130, 44];
//const isLargeNumber = (element) => element > 13;
//console.log(array1.findIndex(isLargeNumber));
    }

    previousPicture(){ // click gauche
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); //retourne l'index de la position...
        //  ... de l'image actuelle et la stock grâce à la constance.
        const firstIndexOfArray = 0; // pour définir la première image de ma liste
        const lastIndexOfArray = this.listImage.length -1;
        if (firstIndexOfArray === currentIndex ) {
            // en cliquant "à gauche" display last image
            this.selectedImage = this.listImage[lastIndexOfArray];         
            this.displayImage()
        } else {
            this.selectedImage = this.listImage[currentIndex-1];         
            this.displayImage()
        }
    }
}


// function to create a photo card with image + name + likes + heart icon

function createGalleryCard(mediaObject) {

    const {image, title, likes} = mediaObject;
    const imagesSource = `assets/images/media/${image}`;
    const gallery = document.querySelector('.photographer_gallery');
    
    const article = document.createElement( 'article' );
    article.classList.add('card_photo');

    const linkLightbox = document.createElement('a');
    linkLightbox.setAttribute('title', 'zoom image');
    linkLightbox.setAttribute('href', imagesSource);
    linkLightbox.addEventListener('click', openLightbox);

    const divImage = document.createElement('div');
    divImage.classList.add('card_image_container');
    const img = document.createElement( 'img' );
    img.setAttribute("src", imagesSource);
    // to amend the json file    img.setAttribute('alt',description photo );
   
    const underImageDiv = document.createElement('div');
    underImageDiv.classList.add('card_body_container');

    const p = document.createElement( 'p' );
    p.textContent = title;

    const nbLikes = document.createElement ('span');
    nbLikes.textContent = likes;

    const heartIcon = document.createElement ('img');
    heartIcon.setAttribute("src", 'assets/icons/heart.svg');
   // ajouter alt
    
    gallery.appendChild(article);
    linkLightbox.appendChild(divImage);
    article.appendChild(linkLightbox);
    article.appendChild(underImageDiv);
    divImage.appendChild(img);
    underImageDiv.appendChild(p);
    underImageDiv.appendChild(nbLikes);
    underImageDiv.appendChild(heartIcon);

    // function to create the lightbox on click
    function openLightbox (e) {
        e.preventDefault()
        let lightbox = new Lightbox(mediaObject, fakeGallery)
    }
}



//  Function which will display the images in the gallery

function displayImages(listOfImages) {
    document.querySelector('.photographer_gallery').innerHTML="";
    listOfImages.forEach(function(objet) {
        createGalleryCard(objet)
    });
}


// FUNCTION SORT
    // function which SHOW the sort options
document.querySelector(".button_dropdown").addEventListener('click', showOptions); 

function showOptions() {
    document.querySelector(".sort_dropdown_options").classList.toggle("show");
    console.log('je suis là')
  }

  // function which HIDE the sort options if we click anywhere on the widow except from the button.

window.addEventListener('click',hideExceptButton); 

function hideExceptButton (event){
    console.log(event.target)
    if (!event.target.matches('.button_dropdown') && !event.target.matches('.fa-chevron-up') && !event.target.matches('.button-name') ) {
        hideOptions();
    }
}

function hideOptions() {
    document.querySelector(".sort_dropdown_options").classList.remove("show");
    console.log('je ne suis pas là')
}

// function sort 3 options    
/////// sort by Popularity from biggest likes to smallest like
function changeButtonName(newName) {
    document.querySelector(".button-name").textContent = newName; 
}

document.querySelector("#popularity").addEventListener('click', sortByPopularity); 
function sortByPopularity() {
    
    const arrayByLikes = fakeGallery.sort(function(a,b) {
        a = a.likes;
        b = b.likes;
        return b - a;
    })
    changeButtonName('Popularité')
    console.log(arrayByLikes)
    displayImages(arrayByLikes);
}
    /////// sort by Date from the newest to the oldest
document.querySelector("#date").addEventListener('click', sortByDate); 
function sortByDate() {
    
    const arrayByDate = fakeGallery.sort(function(a,b) {
        a = Date.parse(a.date); //Date.Parse transform en milliseconde (timestamp)
        b = Date.parse(b.date);
        return b - a;
    })
    changeButtonName('Date')
    console.log(arrayByDate)
    displayImages(arrayByDate);
}

    /////// sort by Title alphabetically

document.querySelector("#title").addEventListener('click', sortByTitle); 
function sortByTitle() {

    const arrayByTitle = fakeGallery.sort(function(a,b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    })
    changeButtonName('Titre')
    console.log(arrayByTitle)
    displayImages(arrayByTitle);
}

// fakegallery sera par défaut sur un tri par popularité
// dans la constance fakegallery, pour chacun des objets j'exécute une fonction sans nom qui prend le paramètre
// (un objet de ma constance) qui va appeller une fonction que j'ai créée createGalleryCard avec comme paramètre 
//(les mêmes objets précédents) qui créé les cartes des images.
// before  ... fakeGallery = sortByPopularity() ...

sortByPopularity();




//   places.sort( function( a, b ) {
//     a = a.city.toLowerCase();
//     b = b.city.toLowerCase();

//     return a < b ? -1 : a > b ? 1 : 0;
// });