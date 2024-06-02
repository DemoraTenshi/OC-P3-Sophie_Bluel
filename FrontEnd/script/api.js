// Url de l'API pour récupérer les oeuvres//

const worksUrl = "http://localhost:5678/api/works";
const categoriesUrl = "http://localhost:5678/api/categorie";

// Récupération de la gallerie via l'API//

export async function getWorksApi(){
    try {
        const response = await fetch(worksUrl);
        const data = await response.json;
        // traitement de la réponse et renvoi des données//
        return data;
    } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des données:", error);
    }
}

// Récupération des catégorie via l'API//

export async function getCategoriesApi(){
    try{
    const response = await fetch(categoriesUrl)
    const data = await response.json;
        // traitement de la réponse et renvoi des données//
        return data;
    } catch (error) {
        console.log("Une erreur est survenue lors de la récupération des données:", error);
    }
}