function photographerFactory(data) {
    const {name, portrait, tagline, city, country, price} = data;
    const location = city + ", " + country;
    const priceDay = price + "€/jour";
    const pictureSource = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( 'article' );
        const linkPhotographer = document.createElement('a');
        linkPhotographer.setAttribute('title', 'photographerPage');
        linkPhotographer.setAttribute('href', 'photographer.html');
        const img = document.createElement( 'img' );
        img.setAttribute("src", pictureSource);
        img.setAttribute('alt', 'portrait du photographe ' + name);
        const h2 = document.createElement( 'h2' );
        h2.textContent = name;
        const paragraphe1 = document.createElement( 'p' );
        paragraphe1.classList.add('location');
        paragraphe1.textContent = location;
        const paragraphe2 = document.createElement( 'p' );
        paragraphe2.classList.add('tagline');
        paragraphe2.textContent = tagline;
        const paragraphe3 = document.createElement( 'p' );
        paragraphe3.classList.add('price_day');
        paragraphe3.textContent = priceDay;
        linkPhotographer.appendChild(img);
        linkPhotographer.appendChild(h2);
        article.appendChild(linkPhotographer);
        article.appendChild(paragraphe1);
        article.appendChild(paragraphe2);
        article.appendChild(paragraphe3);
        
        return (article);
    }
    return { name, pictureSource, getUserCardDOM }
}

