const loginNav = document.querySelector("#login-link");
loginNav.addEventListener("click", handleLogin);

async function handleLogin(){
    login.style.fontWeight = "600"; 
    //Oblitérer les sections #introduction, #portefolio et #contact//
    const introSection = document.querySelector("#introduction");
    const portfolioSection = document.querySelector("#portfolio");
    const contactSection = document.querySelector("#contact");
    introSection.style.display = "none";
    portfolioSection.style.display = "none";
    contactSection.style.display = "none";

    //Afficher la section #login//
    const loginSection = document.querySelector("#login");
    loginSection.style.display = "flex";

    //Création du formulaire de connexion et ajout au DOM//
    const form = document.createElement("form");
    form.id = "login-form";
    loginSection.appendChild(form);

    //Création du titre du formulaire//
    const formTitle = document.createElement("h2");
    formTitle.id = ("login-title");
    formTitle.textContent = "Log In";
    form.appendChild(formTitle);

    // Création de la partie email et ajout au DOM//
    const emailInput = document.createElement("input");
    emailInput.type = "email";
    emailInput.id = "login-email";
    emailInput.required = true;

    const emailLabel = document.createElement("label");
    emailLabel.textContent = "E-mail";
    emailLabel.setAttribute("for","email");

    form.appendChild(emailLabel);
    form.appendChild(emailInput);

    //Création de la partie password et ajout au DOM//
    const passwordInput = document.createElement("input");
    passwordInput.type = "password";
    passwordInput.id = "password";
    passwordInput.required = true;

    const passwordLabel = document.createElement("label");
    passwordLabel.textContent = "Mot de passe";
    passwordLabel.setAttribute("for","password");

    form.appendChild(passwordLabel);
    form.appendChild(passwordInput);

    // Création du message d'erreur
    const errorMessage = document.createElement("p");
    errorMessage.id = "error-message";
    form.appendChild(errorMessage);

    //Création du bouton "se connecter"//
    const loginButton = document.createElement("input");
    loginButton.type = "submit";
    loginButton.value = "Se connecter"
    form.appendChild(loginButton)

    // Création du lien "mot de passe oublié"
    const forgetPwLink = document.createElement("a");
    forgetPwLink.setAttribute("id","forget-pw")
    forgetPwLink.textContent = "Mot de passe oublié";
    forgetPwLink.href = "#";
    form.appendChild(forgetPwLink);

    //Ecoute de l'évènement de soumission du formulaire//
    form.addEventListener("submit", async (event) =>{
        event.preventDefault();

        // Vérifier si les champs de saisie sont vides
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        if (email === "" || password === "") {
          // Afficher un message d'erreur
          errorMessage.textContent = "Veuillez remplir tous les champs";
          return;
        }

        // Réinitialiser le message d'erreur
        errorMessage.textContent = "";

        // Appeler l'API pour récupérer le token d'authentification
        const response = await fetch("http://localhost:5678/api/users/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }),
        });

        // Vérifier si la réponse est valide
        if (response.ok) {
          // Récupérer le token d'authentification à partir de la réponse
          const token = await response.json();

          // Stocker le token d'authentification dans le stockage local
          localStorage.setItem("token", token.token);

          // Rediriger l'utilisateur vers la page d'accueil
          window.location.href = "/";
        } else {
          // Afficher un message d'erreur à l'utilisateur
          errorMessage.style.display = "flex";
          errorMessage.textContent = "E-mail ou mot de passe incorrect";
        }
    })
}
