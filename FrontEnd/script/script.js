console.log("ça marche!")

// Récupération de la gallerie et affichage des projets//
async function getWorks() {
    //Récupération des données//
    await fetch("http://localhost:5678/api/works")
        .then((response) => {
            if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
        return response.json();
      })
    
      .then((data) => {
        const gallery = document.querySelector(".gallery");
        //Création des balises html//
        data.forEach((item) => {
          const projectElement = document.createElement("article");
          projectElement.classList.add("projectElement");
         
          const imgElement = document.createElement("img");
          imgElement.src = item.imageUrl;
          imgElement.alt = item.title;
  
          const titleElement = document.createElement("figcaption");
          titleElement.textContent = item.title;

        //Ajout des éléments dans le DOM//
          gallery.appendChild(projectElement);
          projectElement.appendChild(imgElement);
          projectElement.appendChild(titleElement);
        });
      });


  }

  getWorks();

//Récupérations des catégories et affichage des boutons de filtres  
const filtersArray = [];

async function getCategories() {
  console.log("Appel de getCategories")
  const buttonContainer = document.querySelector(".buttons");
    if (buttonContainer === null) {
    return;
    }
  const anyButton = document.createElement("button");
  anyButton.classList.add("filter-button");
  anyButton.setAttribute("id", "selected");
  anyButton.textContent = ("Tous");
  buttonContainer.appendChild(anyButton);
  filtersArray.push(anyButton);


    //Récupération des données//
    await fetch("http://localhost:5678/api/categories")
        .then((response) => {
            if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
      
        return response.json();
      })

        .then((data) => {
          // Création des catégories//
          const categoriesSet = new Set();
          data.forEach((item) => {
          categoriesSet.add(item.name);
        });
        

          //Création des filtres//
          const categories = Array.from(categoriesSet);
          categories.forEach((category) =>{
            const button = document.createElement("button");
            button.textContent = category;
            button.classList.add("filter-button");
            buttonContainer.appendChild(button);
            filtersArray.push(button);
          

          })

        
        })
  
    }

    getCategories()




