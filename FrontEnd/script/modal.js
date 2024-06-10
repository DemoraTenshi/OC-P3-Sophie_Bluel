/***************
 ***  MODALE ***
 ****************/
// Création de la modale//
const modal = document.createElement("aside");
modal.setAttribute("role", "dialog");
modal.classList.add("modal");
  
//création de la div pour le contenu de la modale//
const modalContent = document.createElement("div");
modalContent.classList.add("modal-container");   
modal.appendChild(modalContent);
  
//Ajout du bouton de fermeture de la fenêtre modale//
closeButton = document.createElement("button");
closeButton.classList.add("modal-close-button");
const closeIcon = document.createElement("i");
closeIcon.classList.add("fa-solid", "fa-xmark");
closeButton.appendChild(closeIcon);
modalContent.appendChild(closeButton);
  
// Ajout d'un titre à la fenêtre modale//
const modalTitle = document.createElement("h2");
modalTitle.textContent = "Galerie photo";
modalContent.appendChild(modalTitle);

  
// Création de la div pour l'affichage des photos//
const displayPhoto = document.createElement("div");
displayPhoto.classList.add("display-photo");
modalContent.appendChild(displayPhoto);

//Création du bouton d'ajout de photo//
const addWork = document.createElement("div");
addWork.classList.add("add-work");
modalContent.appendChild(addWork);
const addButton = document.createElement("button");
addButton.classList.add("add-button");
addButton.textContent = "Ajouter une photo";
addWork.appendChild(addButton);
       
// Ajout de la fenêtre modale au document
document.body.appendChild(modal);
  
// Récupération de la gallerie et affichage des projets//
async function getWorksModal() {
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
          const imgContainer = document.createElement("div");
          imgContainer.classList.add("img-container");

          const imgWrapper = document.createElement("div");
          imgWrapper.classList.add("img-wrapper");

          const imgModal = document.createElement("img");
          imgModal.src = item.imageUrl;
          imgModal.alt = item.title;
          imgModal.style.width = "75px";
          imgModal.style.padding = "0px";
          imgWrapper.appendChild(imgModal);
  
          const deleteIcon = document.createElement("i");
          deleteIcon.classList.add("fa-solid", "fa-trash-can", "delete-icon");

          imgWrapper.appendChild(deleteIcon);
          imgContainer.appendChild(imgWrapper);
          displayPhoto.appendChild(imgContainer);
  
          
        });
      });
  } 
  async function deleteWork(id) {
    try {
      // Vérification que le jeton d'authentification est défini //
      const token = localStorage.getItem("token");
      console.log(token);
      if (!token) {
        throw new Error("Aucun jeton d'authentification défini");
      }
  
      // Suppression de l'élément de l'API //
      const response = await fetch(`http://localhost:5678/api/works/${id}`, {
        method: "DELETE",
        headers: {
          accept: "*/*",
          Authorization: "Bearer " + token,
        },
      });
      
      if (!response.ok) {
        throw new Error("Erreur lors de la suppression de l'élément");
      }
  
      const data = await response.json();
  
      // Suppression de l'élément de la galerie //
      const imgContainer = document.querySelector(`.img-container img[data-id="${id}"]`);
      if (imgContainer) {
        imgContainer.parentNode.parentNode.parentNode.removeChild(imgContainer.parentNode.parentNode);
      }
  
      return data;
    } catch (error) {
      throw error;
    }
  }
  

  let modalContentLoaded = false
  
  editButton.addEventListener("click",() => {
    // Affichage de la fenêtre modale //
    modal.style.display = "flex";
    modalContent.style.display = "flex";
  
    // Chargement du contenu de la modale si nécessaire //
    if (!modalContentLoaded) {
      getWorksModal();
      modalContentLoaded = true;
    }
  
    closeButton.addEventListener("click", () => {
      modal.style.display ="none";
      modalContent.style.display = "none";
    })

  });


  