/*global displayModal*/  

let photographerPage;

// class to create the page of photographer except sort
class PhotographerPage {
    
    constructor(photographerData, photographerGallery) {
        this.photographerData = photographerData;
        this.photographerGallery = photographerGallery;
    }

    // display the header of the photographer selected
    displayPhotographerPresentation() {
       
         const {name, tagline, city, country, portrait} = this.photographerData;
         const location = city + ", " + country;
     
         // text presentation div
         const div = document.createElement("div");
         div.classList.add("photographer_presentation");
         div.setAttribute("tabindex",0);
     
         const h2 = document.createElement("h2");
         h2.textContent = name;
     
         const paragraphe1 = document.createElement("p");
         paragraphe1.classList.add("location_presentation");
         paragraphe1.textContent = location;
         
         const paragraphe2 = document.createElement("p");
         paragraphe2.classList.add("tagline_presentation");
         paragraphe2.textContent = tagline;
     
         div.appendChild(h2);
         div.appendChild(paragraphe1);
         div.appendChild(paragraphe2);

         // button 
         const contactButton = document.createElement("button");
         contactButton.classList.add("contact_button");
         contactButton.setAttribute("aria-label", "contactez-moi");
         contactButton.setAttribute("aria-haspopup","dialog");
         contactButton.textContent="Contactez-moi";
         contactButton.addEventListener("click",displayModal); //displayModal function from contactForm.js

     
         // portrait div
         const pictureSource = `assets/photographers/${portrait}`;
     
         const portraitDiv = document.createElement( "div");
         portraitDiv.classList.add("photographer_portrait");
     
         const img = document.createElement("img");
         img.setAttribute("src", pictureSource);
         img.setAttribute("alt", "portrait du photographe " + name)
         portraitDiv.appendChild(img);
     
         const photographHeader = document.querySelector(".photograph-header");
         photographHeader.appendChild(div);
         photographHeader.appendChild(contactButton);
         photographHeader.appendChild(portraitDiv);
     
         const photographerName = document.querySelector("#modal_photographer");
         photographerName.textContent = name;
    
     }
    
    // function to create a photo card with image/video + name + likes + heart icon
    createGalleryCard(mediaObject) {

        const {image, title, likes, video} = mediaObject;
        const mediaSource = `assets/images/media/${image || video}`;
        const gallery = document.querySelector(".photographer_gallery");
        
        const article = document.createElement( "article" );
        article.classList.add("card_photo");
    
        const linkLightbox = document.createElement("a");
        linkLightbox.setAttribute("title", title);
        linkLightbox.setAttribute("href", mediaSource);
        linkLightbox.setAttribute("aria-haspopup","dialog");
        

        linkLightbox.addEventListener("click", openLightbox);
        const divMedia = document.createElement("div");
        divMedia.classList.add("card_image_container");
       
        // display video or image
        if(mediaObject.image){
            const img = document.createElement( "img" );
            img.setAttribute("src", mediaSource);
            img.setAttribute("alt",  title + ", closeup view");
            divMedia.appendChild(img);
        }
        else {
            const vdo = document.createElement( "video" );
            const sourceElement = document.createElement("source");
            sourceElement.setAttribute("src", mediaSource);
            vdo.setAttribute("aria-label", "video " + title + ", closeup view");
            sourceElement.setAttribute("type", "video/mp4");
            vdo.appendChild(sourceElement);
            divMedia.appendChild(vdo);
        }

        const underMediaDiv = document.createElement("div");
        underMediaDiv.classList.add("card_body_container");
    
        const p = document.createElement( "p" );
        p.textContent = title;
    
        const nbLikes = document.createElement("span");
        nbLikes.textContent = likes;
    
        const heartIconButton = document.createElement("button");
        heartIconButton.classList.add("heart_icon-button");
        const heartIconImage = document.createElement("img");
        heartIconImage.setAttribute("src", "assets/icons/heart.svg");
        heartIconImage.setAttribute("alt", "bouton ajouter un coeur");
        heartIconButton.addEventListener("click", liked); 
        heartIconButton.appendChild(heartIconImage);

        function liked() {
    
            let totalLikes = document.querySelector(".likes")
            let isLiked = heartIconButton.classList.contains("isLiked")
            if (isLiked) {
                // remove isLiked class and decrement number of likes
                heartIconButton.classList.remove("isLiked")
                nbLikes.textContent = Number(nbLikes.textContent) - 1;
                totalLikes.textContent = Number(totalLikes.textContent) -1;
            } else {
                // add isLiked class and increment number of likes
                heartIconButton.classList.add("isLiked")
                nbLikes.textContent = Number(nbLikes.textContent) + 1;
                totalLikes.textContent = Number(totalLikes.textContent) +1;
            }
        }
        
        gallery.appendChild(article);
        linkLightbox.appendChild(divMedia);
        article.appendChild(linkLightbox);
        article.appendChild(underMediaDiv);
        underMediaDiv.appendChild(p);
        underMediaDiv.appendChild(nbLikes);
        underMediaDiv.appendChild(heartIconButton);
    
        // function to create the lightbox on click
        function openLightbox (e) {
            e.preventDefault();
            new Lightbox(mediaObject, photographerPage.photographerGallery);
        }
    }

    //  Function which will display the media in the gallery
    displayImages() {
        document.querySelector(".photographer_gallery").innerHTML="";
        this.photographerGallery.forEach(mediaObject => {
            this.createGalleryCard(mediaObject)
        });
    }
    
    updateGallery(newGallery) {
        this.photographerGallery = newGallery;
        this.displayImages();
    }
}

// function to clear all children
function removeAllChildrenNodes(parentNode) {
    while (parentNode.firstChild) {
        parentNode.removeChild(parentNode.firstChild)
    }
}

/* CLASS FOR MANAGING THE LIGHTBOX */
class Lightbox{ 
    constructor(mediaObject,listMediaObject) {
        this.closeLightbox =  this.closeLightbox.bind(this);
        this.onKeyUp = this.onKeyUp.bind(this)
        this.selectedImage  = mediaObject; //image currently displayed on lightbox the first time we click
        this.listImage = listMediaObject; 
        this.nextPicture = this.nextPicture.bind(this);
        this.previousPicture = this.previousPicture.bind(this);
        this.openLightbox();
        document.addEventListener("keyup", this.onKeyUp)
    }


    onKeyUp(e) {
        if(e.key === "Escape") {
            this.closeLightbox(e)
        }
        else if(e.key === "ArrowLeft") {
            this.previousPicture(e)
        }
        else if(e.key === "ArrowRight") {
            this.nextPicture(e)
        }
        
    }

    displayImage (){ 
        const selectedImageSource  = "assets/images/media/" + this.selectedImage.image;
        const selectedVideoSource = "assets/images/media/" + this.selectedImage.video;
        const mediaDiv = document.querySelector(".lightbox_container"); 
        
        const mediaTitle = document.createElement("p");
        mediaTitle.classList.add("image-title");
        mediaTitle.setAttribute("tabindex", 0);
        mediaTitle.textContent = this.selectedImage.title;

        removeAllChildrenNodes(mediaDiv);

        if (this.selectedImage.image) {
            const imageDisplayed = document.createElement("img");
            imageDisplayed.setAttribute("src", selectedImageSource);
            imageDisplayed.setAttribute("alt", this.selectedImage.title);
            mediaDiv.appendChild(imageDisplayed);
        }
        else { //this.selectedImage.video
            const videoDisplayed = document.createElement("video");
            videoDisplayed.setAttribute("controls", true);
            const videoSourceBalise = document.createElement("source");
            videoSourceBalise.setAttribute("src", selectedVideoSource);
            videoSourceBalise.setAttribute("type", "video/mp4");
            videoDisplayed.appendChild(videoSourceBalise);
            mediaDiv.appendChild(videoDisplayed);
        }

        mediaDiv.appendChild(mediaTitle);

    }

    openLightbox(){
        document.querySelector(".lightbox").style.display = "block";
        this.displayImage()
        document.querySelector(".lightbox_close").addEventListener("click",this.closeLightbox);
        document.querySelector(".lightbox_next").addEventListener("click",this.nextPicture);
        document.querySelector(".lightbox_previous").addEventListener("click",this.previousPicture);
        document.querySelector(".image-title").focus();
        document.querySelector(".lightbox").setAttribute("aria-hidden", false);
        document.querySelector("main").setAttribute("aria-hidden", true);
        document.querySelector("header").setAttribute("aria-hidden", true);
    }

    closeLightbox(e){
        e.preventDefault();
        document.querySelector(".lightbox_close").removeEventListener("click",this.closeLightbox);
        document.querySelector(".lightbox_next").removeEventListener("click",this.nextPicture);
        document.querySelector(".lightbox_previous").removeEventListener("click",this.previousPicture);
        document.removeEventListener("keyup",this.onKeyUp);
        document.querySelector(".lightbox").style.display = "none";

        document.querySelector(".lightbox").setAttribute("aria-hidden", true);
        document.querySelector("main").setAttribute("aria-hidden", false);
        document.querySelector("header").setAttribute("aria-hidden", false);
    }

    nextPicture(e){ // click right
        e.preventDefault();
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); //return the position index of the current image and keep the value
        const lastIndexOfArray = this.listImage.length -1; // to define the position of the last image of the list
        if (lastIndexOfArray === currentIndex ) {
            this.selectedImage = this.listImage[0]; // display first image if the current image was the last image. This create a caroussel effect
            this.displayImage()
        } else {
            this.selectedImage = this.listImage[currentIndex+1]; // display next image of the list        
            this.displayImage()
        }
        document.querySelector(".image-title").focus();
    }

    previousPicture(e){ // click left
        e.preventDefault();
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); 
        const firstIndexOfArray = 0; // to define the position of the first image of the list
        const lastIndexOfArray = this.listImage.length -1;
        if (firstIndexOfArray === currentIndex ) {
            // display last image if the current image was the first image. This create a caroussel effect
            this.selectedImage = this.listImage[lastIndexOfArray];         
            this.displayImage()
        } else {
            this.selectedImage = this.listImage[currentIndex-1];         
            this.displayImage()
        }
        document.querySelector(".image-title").focus();
    }
}

/* FUNCTIONS SORT */
document.querySelector(".button_dropdown").addEventListener("click", showOptions); 

// function which SHOW the sort options
function showOptions() {
    document.querySelector(".sort_dropdown_options").classList.toggle("show");
    document.querySelector(".button_dropdown").setAttribute("aria-expanded", true);
  }

window.addEventListener("click",hideExceptButton); 

// function which HIDE the sort options if we click anywhere on the widow except from the button.
function hideExceptButton (event){
    if (!event.target.matches(".button_dropdown") && !event.target.matches(".fa-chevron-down") && !event.target.matches(".button-name")) {
        hideOptions();
    }
}

function hideOptions() {
    if(document.querySelector(".sort_dropdown_options").classList.contains("show")) {
    document.querySelector(".sort_dropdown_options").classList.remove("show");
    document.querySelector(".button_dropdown").setAttribute("aria-expanded", false);
    }
}

document.querySelector(".sort_dropdown_options").addEventListener("keyup", onKeyUpEscape);
document.querySelector(".button_dropdown").addEventListener("keyup", onKeyUpEscape);
function onKeyUpEscape(e) {
    if(e.key === "Escape") {
        hideOptions();
    }
} 
 
    // function keyup for keyboard accessibility
function onKeyUpPopularity(e) {
    if(e.key === "Enter") {
    sortByPopularity();
    hideOptions();
    }
} 
function onKeyUpDate(e) {
    if(e.key === "Enter") {
    sortByDate()
    hideOptions();
    }
}  
function onKeyUpTitle(e) {
    if(e.key === "Enter") {
    sortByTitle()
    hideOptions();
    }
}   
    // sort by Popularity from biggest likes to smallest likes
function changeButtonName(newName) {
    document.querySelector(".button-name").textContent = newName; 
}

document.querySelector(".align-sort").addEventListener("fullscreenchange", sortByPopularity);
document.querySelector(".align-sort").addEventListener("keyup",onKeyUpPopularity);

function sortByPopularity() {
    
    const arrayByLikes = photographerPage.photographerGallery.sort(function(a,b) {
        a = a.likes;
        b = b.likes;
        return b - a;
    })
    changeButtonName("Popularité")
    photographerPage.updateGallery(arrayByLikes);
}
    // sort by Date from the newest to the oldest
document.querySelector("#date").addEventListener("click", sortByDate); 
document.querySelector("#date").addEventListener("keyup",onKeyUpDate);

function sortByDate() {
    
    const arrayByDate = photographerPage.photographerGallery.sort(function(a,b) {
        a = Date.parse(a.date); //Date.Parse transform in milliseconds (timestamp)
        b = Date.parse(b.date);
        return b - a;
    })
    changeButtonName("Date")
    photographerPage.updateGallery(arrayByDate);
}

    // sort by Title alphabetically
document.querySelector("#title").addEventListener("click", sortByTitle); 
document.querySelector("#title").addEventListener("keyup",onKeyUpTitle);

function sortByTitle() {

    const arrayByTitle = photographerPage.photographerGallery.sort(function(a,b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    })
    changeButtonName("Titre")
    photographerPage.updateGallery(arrayByTitle);
}

/* DISPLAYING LIKES AND PRICE INFO */

// display the likes
function displayLikes() {
    document.querySelector(".likes").textContent=sumOfLikes()
}


// sum of the likes
function sumOfLikes() {
    return photographerPage.photographerGallery.reduce(function (a, b) { //reduce() allows to accumulate a value by starting with 0
       return a + b.likes;
    }, 0);
 }
 
// displaying price
function displayPrice() {
    document.querySelector(".price").textContent=photographerPage.photographerData.price +"€ /jour"
}

/* GETTING DATA FOR PHOTOGRAPHER PAGE */

//fetch all data 
async function getPhotographerData() {
    const jsonData = await fetch("data/photographers.json")
    .then(responseData => responseData.json()) 
    return jsonData;
}

// UrlSearchParams
function getPhotographerId() {
    const currentUrl = new URL(location.href);
    const searchParams= new URLSearchParams(currentUrl.search);
    return searchParams.get("id")
}

async function init() {
    
    const result = await getPhotographerData();
    const photographerId = getPhotographerId();
    const selectedPhotographer = result.photographers.find(photographer=>photographer.id===Number(photographerId));
    const photographerGallery = result.media.filter(mediaObject=>mediaObject.photographerId===Number(photographerId));
    photographerPage = new PhotographerPage(selectedPhotographer, photographerGallery);
    photographerPage.displayPhotographerPresentation();
    sortByPopularity(); // display the gallery, sorted by popularity "by default".
    displayLikes();
    displayPrice();
}

init();