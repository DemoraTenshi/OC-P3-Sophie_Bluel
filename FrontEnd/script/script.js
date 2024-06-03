const gallery = document.querySelector(".gallery");

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
      //Création des balises html//
      data.forEach((item) => {
        const projectElement = document.createElement("article");
        projectElement.classList.add("projectElement");
        projectElement.setAttribute("data-category", item.category.name);

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

//Récupérations des catégories et affichage des boutons de filtres//
async function getCategories() {
  const buttonContainer = document.querySelector(".buttons");
  if (buttonContainer === null) {
    return;
  }
  // Création du bouton "Tous"//
  const anyButton = document.createElement("button");
  anyButton.classList.add("filter-button");
  anyButton.setAttribute("id", "selected");
  anyButton.textContent = "Tous";
  buttonContainer.appendChild(anyButton);
  anyButton.addEventListener("click", () => {
    (gallery.innerHTML = ""), getWorks();
  });

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
      categories.forEach((category) => {
        const button = document.createElement("button");
        button.textContent = category;
        button.classList.add("filter-button");
        //Ajout dans le DOM//
        buttonContainer.appendChild(button);
        //Ajout de l'eventListener//
        button.addEventListener("click", () => {
          filterGallery(category);
        });
      });

      //fonction pour filtrer la galerie en fonction de la catégorie sélectionnée//
      function filterGallery(category) {
        // Récupération des éléments de la galerie//
        const galleryItems = document.querySelectorAll(".projectElement");

        // Parcours des éléments de la galerie//
        galleryItems.forEach((item) => {
          const itemCategory = item.getAttribute("data-category");

          // Vérification si la catégorie de l'élément correspond à la catégorie sélectionnée//
          if (category === undefined || category === itemCategory) {
            item.style.display = "block";
          } else {
            item.style.display = "none";
          }
        });
      }
    });
}

getCategories();
