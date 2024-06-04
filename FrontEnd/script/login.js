
const form = document.getElementById("login-form");
const loginApi = "http://localhost:5678/api/users/login"

//Ajout eventListener sur le formulaire et preventDefault//
form.addEventListener("submit", (event) =>{
    event.preventDefault();
})
//Création de la partie email et ajout au DOM//
const emailInput = document.createElement("input");
emailInput.type = "email";
emailInput.id = "email";
emailInput.required = true;

const emailLabel = document.createElement("label");
emailLabel.textContent = "E-mail",
emailLabel.setAttribute("for","email");

form.appendChild(emailLabel);
form.appendChild(emailInput);

//Création de la partie password et ajout au DOM//
const passwordInput = document.createElement("input");
passwordInput.type = "password";
passwordInput.id = "password";
passwordInput.required = true;

const passwordLabel = document.createElement("label");
passwordLabel.textContent = "Mot de passe",
passwordLabel.setAttribute("for","password");

form.appendChild(passwordLabel);
form.appendChild(passwordInput);