/*exported photographerFactory*/  

function photographerFactory(data) {
    const {name, portrait, tagline, city, country, price,id} = data;
    const location = city + ", " + country;
    const priceDay = price + "€/jour";
    const pictureSource = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement( "article" );       
        const linkPhotographer = document.createElement("a");
        linkPhotographer.setAttribute("title", "photographerPage");
        linkPhotographer.setAttribute("href", "photographer.html?id="+id);
        
        const img = document.createElement( "img" );
        img.setAttribute("src", pictureSource);
        img.setAttribute("alt","");
        img.classList.add("photographer_page_portrait");
        
        const h2 = document.createElement( "h2" );
        h2.textContent = name;

        const photographerPresentation = document.createElement("div");
        photographerPresentation.classList.add("photographer-presentation");
        photographerPresentation.setAttribute("tabindex", 0);
        
        const paragraphe1 = document.createElement( "p" );
        paragraphe1.classList.add("location");
        paragraphe1.textContent = location;
       
        const paragraphe2 = document.createElement( "p" );
        paragraphe2.classList.add("tagline");
        paragraphe2.textContent = tagline;
        
       
        const paragraphe3 = document.createElement( "p" );
        paragraphe3.classList.add("price_day");
        paragraphe3.textContent = priceDay;
        
        linkPhotographer.appendChild(img);
        linkPhotographer.appendChild(h2);
        article.appendChild(linkPhotographer);
        article.appendChild(photographerPresentation);
        photographerPresentation.appendChild(paragraphe1);
        photographerPresentation.appendChild(paragraphe2);
        photographerPresentation.appendChild(paragraphe3);
       
        
        return (article);
    }
    return { name, pictureSource, getUserCardDOM }
}