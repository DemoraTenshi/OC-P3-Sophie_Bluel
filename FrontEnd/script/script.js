const portfolio = document.querySelector("#portfolio");
const gallery = document.querySelector(".gallery");
let buttonContainer;

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
  buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons");
  gallery.parentNode.insertBefore(buttonContainer,gallery);
  console.log("conteneur créé!");


  // Création du bouton "Tous"//
  const anyButton = document.createElement("button");
  anyButton.classList.add("filter-button");
  anyButton.textContent = "Tous";
  buttonContainer.appendChild(anyButton);
  anyButton.addEventListener("click", () => {
    (gallery.innerHTML = ""), getWorks();
  });
  console.log("bouton tous créé!")

  //Récupération des données//
  await fetch("http://localhost:5678/api/categories")
    .then((response) => {
      if (!response.ok) {
        throw new Error("Erreur lors de la récupération des données");
      }
      console.log("réponse reçu", response);
      return response.json();
    })
   

    .then((data) => {
      // Création des catégories//
      console.log("données reçu", data);
      const categoriesSet = new Set();
      data.forEach((item) => {
        categoriesSet.add(item.name);
      });

      //Création des filtres//
      const categories = Array.from(categoriesSet);
      console.log("catégories:", categories);

      categories.forEach((category) => {
        const button = document.createElement("button");
        console.log("bouton crée pour la catégorie:", category);
        button.textContent = category;
        button.classList.add("filter-button");
        //Ajout dans le DOM//
        buttonContainer.appendChild(button);
        console.log("bouton ajoutéa au conteneur pour la catégorie:", category);
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


// admin mode!//
//création du bandeau mode édition et ajout au DOM//
const header = document.querySelector("header");
const adminMode = document.createElement("div");
adminMode.classList.add("admin-mode");
header.appendChild(adminMode)

const logoAdminMode = document.createElement("i");
logoAdminMode.classList.add("fa-regular", "fa-pen-to-square");
adminMode.appendChild(logoAdminMode);

const titleAdminMode = document.createElement("span");
titleAdminMode.classList.add("admin-title");
titleAdminMode.textContent = "Mode édition";
adminMode.appendChild(titleAdminMode);

//Création du lien logout dans le menu de navigation et ajout au DOM//
const navMenu = document.querySelector("nav ul");
const logout = document.createElement("li");
const logoutLink = document.createElement("a");
logoutLink.appendChild(document.createTextNode("logout"));
logoutLink.setAttribute("href", "./index.html");
logoutLink.setAttribute("id", "logout-link");
logout.appendChild(logoutLink);
//Récupération du logo instagram//
const instaLogo = navMenu.querySelector("li:last-child");
//Insertion de logout avant le logo instagram//
navMenu.insertBefore(logout, instaLogo);

  //Création du bouton d'appel à la modale//
  const projectTitle = document.querySelector("#portfolio h2");
  const editButton = document.createElement("button");
  editButton.classList.add("edit-button");
  const editIcon = document.createElement("i");
  editIcon.classList.add("fa-regular", "fa-pen-to-square");
  editButton.textContent = "modifier";
  editButton.appendChild(editIcon);
// Ajoutez le bouton modifier à la balise h2
  projectTitle.appendChild(editButton);

//Cache le lien login et affiche le lien logout si logged in//

const loginLink = document.querySelector("#login");
if (localStorage.getItem("token")) {
    adminMode.style.display ="flex";
    logout.style.display ="flex";
    loginLink.style.display = "none";
    editButton.style.display = "flex";
    buttonContainer.style.display = "none";
} else {
    adminMode.style.display ="none";
    logout.style.display ="none";
    loginLink.style.display = "flex";
    editButton.style.display = "none";
    buttonContainer.style.display = "flex";
}


//Gestion de la déconnexion//
logoutLink.addEventListener("click", (event) =>{
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "./index.html";
})
