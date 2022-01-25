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

};

// TODO fetch json data instead of fakeData
const fakeData = {
    "name": "Ma data test",
    "id": 1,
    "city": "Paris",
    "country": "France",
    "tagline": "Ceci est ma data test",
    "price": 400,
    "portrait": "account.png"
};

photographerPresentationText(fakeData);

