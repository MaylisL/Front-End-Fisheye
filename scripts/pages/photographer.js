let photographerPage;

async function getPhotographerData() {
    
    const jsonData = await fetch('data/photographers.json')
    .then(responseData => responseData.json()) 
    
    return jsonData;
}

function getPhotographerId() {
    const currentUrl = new URL(location.href);
    const searchParams= new URLSearchParams(currentUrl.search);
    console.log(currentUrl)
    console.log(searchParams);
    return searchParams.get("id")
}

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
    
    // function to create a photo card with image + name + likes + heart icon
    createGalleryCard(mediaObject) {

        const {image, title, likes, video} = mediaObject;
        const imagesSource = `assets/images/media/${image}`;
        const videosSource = `assets/images/media/${video}`;
        const gallery = document.querySelector('.photographer_gallery');
        
        const article = document.createElement( 'article' );
        article.classList.add('card_photo');
    
        const linkLightbox = document.createElement('a');
        linkLightbox.setAttribute('title', title);
        linkLightbox.setAttribute('href', imagesSource);
        linkLightbox.addEventListener('click', openLightbox);
    
        const divImage = document.createElement('div');
        divImage.classList.add('card_image_container');
        const img = document.createElement( 'img' );
        img.setAttribute("src", imagesSource);
        img.setAttribute('alt',  title + ', closeup view');
       
        const vdo = document.createElement( 'video' );
        vdo.setAttribute("controls", true)
        const sourceElement = document.createElement('source');
        sourceElement.setAttribute("src", videosSource);
        sourceElement.setAttribute("type", 'video/mp4');
        vdo.appendChild(sourceElement);
    
       
        const underImageDiv = document.createElement('div');
        underImageDiv.classList.add('card_body_container');
    
        const p = document.createElement( 'p' );
        p.textContent = title;
    
        const nbLikes = document.createElement ('span');
        nbLikes.textContent = likes;
    
        const heartIcon = document.createElement ('img');
        heartIcon.setAttribute("src", 'assets/icons/heart.svg');
        heartIcon.setAttribute('alt', 'likes');
        heartIcon.addEventListener('click', liked); 

        function liked() {
    
            let totalLikes = document.querySelector(".likes")
            let isLiked = heartIcon.classList.contains('isLiked')
            if (isLiked) {
                // remove isLiked class and decrement number of likes
                heartIcon.classList.remove('isLiked')
                nbLikes.textContent = Number(nbLikes.textContent) - 1;
                totalLikes.textContent = Number(totalLikes.textContent) -1;
            } else {
                // add isLiked class and increment number of likes
                heartIcon.classList.add('isLiked')
                nbLikes.textContent = Number(nbLikes.textContent) + 1;
                totalLikes.textContent = Number(totalLikes.textContent) +1;
            }
        }

        
        if(mediaObject.hasOwnProperty('image')){
            divImage.appendChild(img);
        }
        else {
            divImage.appendChild(vdo);
        }

        gallery.appendChild(article);
        linkLightbox.appendChild(divImage);
        article.appendChild(linkLightbox);
        article.appendChild(underImageDiv);
        underImageDiv.appendChild(p);
        underImageDiv.appendChild(nbLikes);
        underImageDiv.appendChild(heartIcon);
    
        // function to create the lightbox on click
        function openLightbox (e) {
            e.preventDefault()
            let lightbox = new Lightbox(mediaObject, photographerPage.photographerGallery)
        }
    };

    //  Function which will display the images in the gallery
    displayImages() {
        document.querySelector('.photographer_gallery').innerHTML="";
        this.photographerGallery.forEach(media => {
            this.createGalleryCard(media)
        });
    }
    updateGallery(newGallery) {
        this.photographerGallery = newGallery;
        this.displayImages();
    }
}


class Lightbox{ 
    constructor(image,listImage) {
        this.closeLightbox =  this.closeLightbox.bind(this);
        this.selectedImage  = image; //image currently displayed on lightbox the first time we click
        this.listImage = listImage; 
        this.nextPicture = this.nextPicture.bind(this);
        this.previousPicture = this.previousPicture.bind(this);

        console.log(this);
        this.openLightbox();
    }
    displayImage (){ 
        const selectedImageSource  = 'assets/images/media/' + this.selectedImage.image;
        const selectedVideoSource = 'assets/images/media/' + this.selectedImage.video;
        const mediaDiv = document.querySelector('.lightbox_container'); 
        mediaDiv.removeChild(mediaDiv.lastChild);

        if (this.selectedImage.image) {
            const imageDisplayed = document.createElement('img');
            imageDisplayed.setAttribute("src", selectedImageSource);
            imageDisplayed.setAttribute("alt", this.selectedImage.title);
            mediaDiv.appendChild(imageDisplayed);
        }
        else { //this.selectedImage.video
            const videoDisplayed = document.createElement('video');
            videoDisplayed.setAttribute("controls", true);
            const videoSourceBalise = document.createElement('source');
            videoSourceBalise.setAttribute("src", selectedVideoSource);
            videoSourceBalise.setAttribute("type", 'video/mp4');
            videoDisplayed.appendChild(videoSourceBalise);
            mediaDiv.appendChild(videoDisplayed);
        }
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

    nextPicture(){ // click right
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); //return the position index of the current image and keep the value
        const lastIndexOfArray = this.listImage.length -1; // to define the number of pictures in the list 
        if (lastIndexOfArray === currentIndex ) {
            this.selectedImage = this.listImage[0]; // display first image if the current image was the last image. This create a caroussel effect
            this.displayImage()
        } else {
            this.selectedImage = this.listImage[currentIndex+1]; // display next image of the list        
            this.displayImage()
        }
    }

    previousPicture(){ // click left
        const findCurrentPosition = (element) => element.id === this.selectedImage.id;
        const currentIndex = this.listImage.findIndex(findCurrentPosition); 
        const firstIndexOfArray = 0; // to define the first image of the list
        const lastIndexOfArray = this.listImage.length -1;
        if (firstIndexOfArray === currentIndex ) {
            // display last image if the current image was the first image. This create a caroussel effect
            this.selectedImage = this.listImage[lastIndexOfArray];         
            this.displayImage()
        } else {
            this.selectedImage = this.listImage[currentIndex-1];         
            this.displayImage()
        }
    }
}

/* FUNCTIONS SORT */
document.querySelector(".button_dropdown").addEventListener('click', showOptions); 

// function which SHOW the sort options
function showOptions() {
    document.querySelector(".sort_dropdown_options").classList.toggle("show");
    console.log('je suis là')
  }

window.addEventListener('click',hideExceptButton); 
// function which HIDE the sort options if we click anywhere on the widow except from the button.
function hideExceptButton (event){
    console.log(event.target)
    if (!event.target.matches('.button_dropdown') && !event.target.matches('.fa-chevron-down') && !event.target.matches('.button-name') ) {
        hideOptions();
    }
}

function hideOptions() {
    document.querySelector(".sort_dropdown_options").classList.remove("show");
    console.log('je ne suis pas là')
}

// function sort 3 options    
    // sort by Popularity from biggest likes to smallest likes
function changeButtonName(newName) {
    document.querySelector(".button-name").textContent = newName; 
}

document.querySelector("#popularity").addEventListener('click', sortByPopularity); 
function sortByPopularity() {
    
    const arrayByLikes = photographerPage.photographerGallery.sort(function(a,b) {
        a = a.likes;
        b = b.likes;
        return b - a;
    })
    changeButtonName('Popularité')
    console.log(arrayByLikes)
    photographerPage.updateGallery(arrayByLikes);
}
    // sort by Date from the newest to the oldest
document.querySelector("#date").addEventListener('click', sortByDate); 
function sortByDate() {
    
    const arrayByDate = photographerPage.photographerGallery.sort(function(a,b) {
        a = Date.parse(a.date); //Date.Parse transform in milliseconds (timestamp)
        b = Date.parse(b.date);
        return b - a;
    })
    changeButtonName('Date')
    console.log(arrayByDate)
    photographerPage.updateGallery(arrayByDate);
}

    // sort by Title alphabetically

document.querySelector("#title").addEventListener('click', sortByTitle); 
function sortByTitle() {

    const arrayByTitle = photographerPage.photographerGallery.sort(function(a,b) {
        a = a.title.toLowerCase();
        b = b.title.toLowerCase();
        return a < b ? -1 : a > b ? 1 : 0;
    })
    changeButtonName('Titre')
    console.log(arrayByTitle)
    photographerPage.updateGallery(arrayByTitle);
}

/* Displaying info */

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

async function init() {
    
    const result = await getPhotographerData();
    const photographerId = getPhotographerId();
    const selectedPhotographer = result.photographers.find(photographer=>photographer.id===parseInt(photographerId,10));
    const photographerGallery = result.media.filter(mediaObject=>mediaObject.photographerId===parseInt(photographerId,10))
    photographerPage = new PhotographerPage(selectedPhotographer, photographerGallery);
    photographerPage.displayPhotographerPresentation();
    photographerPage.displayImages();
    displayLikes();
    displayPrice();
};

init();