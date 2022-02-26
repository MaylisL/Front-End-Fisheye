/*global photographerFactory*/    
    
    async function getPhotographers() {
    
        const jsonData = await fetch("data/photographers.json")
        .then(responseData => responseData.json())
        
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
    }

    async function init() {
        // take photographer data
        const response = await getPhotographers();
        const photographers = response.photographers;
        displayData(photographers);
    }
    init();
    