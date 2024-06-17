const portfolio = document.querySelector("#portfolio");
const gallery = document.querySelector(".gallery");
let buttonContainer;

async function getWorks() {
  const response = await fetch("http://localhost:5678/api/works");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données");
  }
  const data = await response.json();
  renderWorks(data);
}

function renderWorks(data) {
  gallery.innerHTML = ""; // effacer la galerie //
  data.forEach((item) => {
    const projectElement = document.createElement("article");
    projectElement.classList.add("projectElement");
    projectElement.setAttribute("data-category", item.category.name);

    const imgElement = document.createElement("img");
    imgElement.src = item.imageUrl;
    imgElement.alt = item.title;

    const titleElement = document.createElement("figcaption");
    titleElement.textContent = item.title;

    projectElement.appendChild(imgElement);
    projectElement.appendChild(titleElement);
    gallery.appendChild(projectElement);
  });
}

async function getCategories() {
  buttonContainer = document.createElement("div");
  buttonContainer.classList.add("buttons");
  gallery.parentNode.insertBefore(buttonContainer, gallery);

  // Création du bouton "Tous" //
  const anyButton = document.createElement("button");
  anyButton.classList.add("filter-button");
  anyButton.textContent = "Tous";
  buttonContainer.appendChild(anyButton);
  anyButton.addEventListener("click", () => {
    filterGallery();
  });

  const response = await fetch("http://localhost:5678/api/categories");
  if (!response.ok) {
    throw new Error("Erreur lors de la récupération des données");
  }
  const data = await response.json();
  const categoriesSet = new Set(data.map((item) => item.name));

  categoriesSet.forEach((category) => {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("filter-button");
    buttonContainer.appendChild(button);
    button.addEventListener("click", () => {
      filterGallery(category);
    });
  });

  // Initialize with the "Tous" filter selected
  filterGallery();
}

function filterGallery(category) {
  currentCategory = category;

  const galleryItems = document.querySelectorAll(".projectElement");
  galleryItems.forEach((item) => {
    const itemCategory = item.getAttribute("data-category");
    item.style.display = !category || category === itemCategory ? "block" : "none";
  });

  // Update button selection
  const buttons = document.querySelectorAll(".filter-button");
  buttons.forEach((button) => {
    button.classList.toggle("selected", button.textContent === (category || "Tous"));
  });
}

getWorks();
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
    adminMode.classList.add("admin-mode-active");
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