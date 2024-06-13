/***************
 ***  MODALE ***
 ****************/
// Création de la modale//
const modal = document.createElement("aside");
modal.setAttribute("role", "dialog");
modal.classList.add("modal");

// Création de la div pour le contenu de la modale//
const modalContent = document.createElement("div");
modalContent.classList.add("modal-container");
modal.appendChild(modalContent);

//création de la div pour les boutons fermeture et back//
const modalButtons = document.createElement("div");
modalButtons.classList.add("modal-buttons");
modalContent.appendChild(modalButtons);

//Ajout du bouton de retour en arrière de la fenêtre modale//
const backButton = document.createElement("button");
backButton.classList.add("modal-back-button");
const backIcon = document.createElement("i");
backIcon.classList.add("fa-solid", "fa-arrow-left");
backButton.appendChild(backIcon);
modalButtons.appendChild(backButton);

// Ajout du bouton de fermeture de la fenêtre modale//
const closeButton = document.createElement("button");
closeButton.classList.add("modal-close-button");
const closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark");
closeButton.appendChild(closeIcon);
modalButtons.appendChild(closeButton);

// Ajout d'un titre à la fenêtre modale//
const modalTitle = document.createElement("h2");
modalTitle.textContent = "Galerie photo";
modalContent.appendChild(modalTitle);

// Création de la div pour l'affichage des photos//
const displayPhoto = document.createElement("div");
displayPhoto.classList.add("display-photo");
modalContent.appendChild(displayPhoto);

//Création de la div pour ajout de photo//
const addContent = document.createElement("div");
addContent.classList.add("add-content");
modalContent.appendChild(addContent);
addContent.style.display = "none";

//Création du formulaire d'ajout de photo//
const uploadForm = document.createElement ("form");
uploadForm.classList.add("upload-form");
uploadForm.setAttribute("id", "upload");
addContent.appendChild(uploadForm);

const uploadFileContainer = document.createElement("div");
uploadFileContainer.classList.add("up-file-container");
uploadForm.appendChild(uploadFileContainer);

//Création du fond d'ajout photo//
const uploadBackground = document.createElement("i");
uploadBackground.classList.add("fa-regular", "fa-image");
uploadFileContainer.appendChild(uploadBackground);

const addFileContainer = document.createElement("div");
addFileContainer.classList.add("add-file-container");
uploadFileContainer.appendChild(addFileContainer);

//Création du bouton d'ajout de fichier//
const inputButton = document.createElement("button");
inputButton.classList.add("input-add-btn");
addFileContainer.appendChild(inputButton);

const addFileBtn = document.createElement("input");
addFileBtn.classList.add("add-file-btn");
addFileBtn.type = "file";
addFileBtn.setAttribute("id", "file-btn");
addFileBtn.accept = ".jpg, .png";
inputButton.appendChild(addFileBtn);

//Création du texte d'ajout de photo//
const uploadText = document.createElement("label");
uploadText.classList.add("upload-text");
uploadText.setAttribute("for", "photo");
uploadText.textContent = "+ Ajouter photo";
inputButton.appendChild(uploadText);

//Création de la description//
const uploadDescription = document.createElement("p");
uploadDescription.classList.add("upload-description");
uploadDescription.innerText ="jpg, png : 4mo max";
addFileContainer.appendChild(uploadDescription);

//Création d'un message d'erreur si format photo invalide//
const invalidFile = document.createElement("p");
invalidFile.innerText = "";
invalidFile.classList.add("invalid-file");
uploadForm.appendChild(invalidFile); 

//Geston de l'affichage de la photo//
let img;

addFileBtn.addEventListener("input", () => {
  const file = addFileBtn.files[0];

  if (!file) return; // Exit if no file is selected

  if (file.type !== "image/jpeg" && file.type !== "image/png") {
      invalidFile.innerText = "Veuillez sélectionner un fichier JPG ou PNG.";
  } else if (file.size > 4 * 1024 * 1024) {
      invalidFile.innerText = "Veuillez sélectionner un fichier de moins de 4 Mo.";
  } else {
      invalidFile.innerText = "";
      const photoPreview = new FileReader();
      photoPreview.readAsDataURL(file);

      photoPreview.addEventListener("load", () => {
          const url = photoPreview.result;
          const img = new Image();
          img.classList.add("photoPreviewImg");
          img.src = url;
          uploadFileContainer.innerHTML = ""; // Clear previous image
          uploadFileContainer.appendChild(img);
      });
  }
});

//Création de la description de la photo//
const titleLabel = document.createElement("label");
titleLabel.classList.add("title-label");
titleLabel.textContent = "Titre";
uploadForm.appendChild(titleLabel);

const nameInput = document.createElement("input");
nameInput.classList.add("name-input");
nameInput.type = "text";
nameInput.name = "titre";
uploadForm.appendChild(nameInput);

//Création du choix de catégorie//
const categoryLabel = document.createElement("Label");
categoryLabel.classList.add("category-label");
categoryLabel.innerText = "Catégorie";
uploadForm.appendChild(categoryLabel);

const categorySelect = document.createElement("select");
categorySelect.name = "Categorie";
categorySelect.classList.add("category-select");
uploadForm.appendChild(categorySelect);

let categoryName;
  let categoryId;

  const initialOption = document.createElement("option");
  initialOption.value = "";
  initialOption.text = "Sélectionnez une catégorie";
  categorySelect.appendChild(initialOption);

  // Creation dynamique des differentes categories
  categorySelect.addEventListener("click", async () => {
    if (categorySelect.options.length === 1) {
      const response = await fetch("http://localhost:5678/api/categories");
      const data = await response.json();

      data.forEach((category) => {
        const option = document.createElement("option");
        option.value = category.id;
        option.text = category.name;
        categorySelect.appendChild(option);
      });
    } else {
      const selectedOption =
        categorySelect.options[categorySelect.selectedIndex];
      categoryName = selectedOption.text;
      categoryId = selectedOption.value;
    }
  });

// Création du conteneur de bouton pour l'ajout et la validation de photo//
const addWork = document.createElement("div");
addWork.classList.add("add-work");
modalContent.appendChild(addWork);

//Création du bouton d'ajout de photo//
const addButton = document.createElement("button");
addButton.classList.add("add-button");
addButton.textContent = "Ajouter une photo";
addWork.appendChild(addButton);

//Création du bouton valider d'ajout de photo//
const submitButton = document.createElement("button");
submitButton.classList.add("submit-button");
submitButton.textContent = "Valider";
addWork.appendChild(submitButton);
submitButton.style.display ="none";

//Ajout de l'event listener pour basculer sur la seconde modale d'ajout de photo//
addButton.addEventListener("click", () =>{
  displayPhoto.style.display = "none"
  modalTitle.textContent = "Ajout photo";
  backIcon.style.color = "black";
  addContent.style.display = "flex";
  submitButton.style.display = "block";
  addButton.style.display =  "none";
});

// Ajout de la fenêtre modale au document//
document.body.appendChild(modal);

// Récupération de la galerie et affichage des projets//
async function getWorksModal() {
  try {
    const response = await fetch("http://localhost:5678/api/works");
    if (!response.ok) {
      throw new Error("Erreur lors de la récupération des données");
    }
    const data = await response.json();

    // Création des balises HTML//
    data.forEach((item) => {
      const imgContainer = document.createElement("div");
      imgContainer.classList.add("img-container");

      const imgWrapper = document.createElement("div");
      imgWrapper.classList.add("img-wrapper");

      const imgModal = document.createElement("img");
      imgModal.src = item.imageUrl;
      imgModal.alt = item.title;
      imgModal.style.width = "75px";
      imgModal.style.padding = "0px";
      imgModal.setAttribute("data-id", item.id); // Ajouter l'attribut data-id
      imgWrapper.appendChild(imgModal);

      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");
      // Ajout de l'écouteur d'événements pour la suppression
      deleteIcon.addEventListener("click", () => deleteWork(item.id, imgContainer));

      imgWrapper.appendChild(deleteIcon);
      imgContainer.appendChild(imgWrapper);
      displayPhoto.appendChild(imgContainer);
    });
  } catch (error) {
    console.error("Erreur lors de la récupération des projets : ", error);
  }
}

async function deleteWork(id, imgContainer) {
  try {
    // Vérification que le jeton d'authentification est défini
    const token = localStorage.getItem("token");
    if (!token) {
      throw new Error("Aucun jeton d'authentification défini");
    }

    // Suppression de l'élément de l'API
    const response = await fetch(`http://localhost:5678/api/works/${id}`, {
      method: "DELETE",
      headers: {
        accept: "*/*",
        Authorization: "Bearer " + token,
      },
    });

    // Vérification du statut de la réponse HTTP
    if (response.ok) {
      // Suppression de l'élément de la modale
      if (imgContainer) {
        imgContainer.remove();
      }

      // Suppression de l'élément de la galerie principale
      const projectElement = document.querySelector(`.gallery .projectElement[data-id="${id}"]`);
      if (projectElement) {
        projectElement.remove();
      }
    } else {
      console.error("Erreur lors de la suppression de l'élément");
    }
  } catch (error) {
    console.error("Une erreur s'est produite lors de la suppression de l'élément : ", error);
  }
}

let modalContentLoaded = false;

editButton.addEventListener("click", () => {
  // Affichage de la fenêtre modale
  modal.style.display = "flex";
  modalContent.style.display = "flex";
  addContent.style.display = "none";

  // Chargement du contenu de la modale//
  if (!modalContentLoaded) {
    getWorksModal();
    modalContentLoaded = true;
  }

  closeButton.addEventListener("click", () => {
    modal.style.display = "none";
    modalContent.style.display = "none";
  });
});

modal.addEventListener("click", (e) => {
  if (e.target === modal) {
    modalContent.style.display = "none";
    modal.style.display = "none";
  }
});
  
