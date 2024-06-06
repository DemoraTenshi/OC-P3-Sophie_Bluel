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

//Cache le lien login et affiche le lien logout si logged in//
const loginLink = document.querySelector("#login");
if (localStorage.getItem("token")) {
    adminMode.style.display ="flex";
    logout.style.display ="flex";
    loginLink.style.display = "none";
} else {
    adminMode.style.display ="none";
    logout.style.display ="none";
    loginLink.style.display = "flex";
}

//Gestion de la déconnexion//
logoutLink.addEventListener("click", (event) =>{
    event.preventDefault();
    localStorage.removeItem("token");
    window.location.href = "./index.html";
})
