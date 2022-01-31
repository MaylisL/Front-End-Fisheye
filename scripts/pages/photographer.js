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
const fakeGallery = [{
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

// function to create a photo card with image + name + likes + heart icon

function createGalleryCard(mediaObject) {

    const {image, title, likes} = mediaObject;
    const imagesSource = `assets/images/media/Mimi/${image}`;
    const gallery = document.querySelector('.photographer_gallery');
    
    const article = document.createElement( 'article' );
    article.classList.add('card_photo');

    const linkLightbox = document.createElement('a');
    linkLightbox.setAttribute('title', 'zoom image');
    linkLightbox.setAttribute('href', imagesSource);
    linkLightbox.addEventListener('click', openLightbox)

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
}


fakeGallery.forEach(mediaObject => {
    createGalleryCard(mediaObject)  
});


// function sort 3 options


// function to create the lightbox on click
function openLightbox (e) {
    e.preventDefault()
    document.querySelector('.lightbox').style.display = 'block';
    document.querySelector('.lightbox_container img').setAttribute('src', e.currentTarget.getAttribute('href'))
}
//const lightboxLinks = document.querySelectorAll
