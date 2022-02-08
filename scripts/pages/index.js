    async function getPhotographers() {
    
        const jsonData = await fetch('data/photographers.json')
        .then(responseData => responseData.json())
        //.then(data => console.log(data));  
        
        return ({
            photographers: jsonData.photographers
        })
    }

    async function displayData(photographers) {
        const photographersSection = document.querySelector(".photographer_section");

        photographers.forEach((photographer) => {
            const photographerModel = photographerFactory(photographer);
            const userCardDOM = photographerModel.getUserCardDOM();
            photographersSection.appendChild(userCardDOM);
        });
    };

    async function init() {
        // Récupère les datas des photographes
        const { photographers } = await getPhotographers();
        displayData(photographers);
    };
    
    init();
    