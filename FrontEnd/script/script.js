
// Récupération de la gallerie et affichage des projets//
async function getWorks() {
    await fetch("http://localhost:5678/api/works")
        .then((response) => {
            if (!response.ok) {
            throw new Error("Erreur lors de la récupération des données");
        }
        console.log(response.json)
        return response.json();
      })
         
      .then((data) => {
        const gallery = document.querySelector(".gallery");
        data.forEach((item) => {
          const projectElement = document.createElement("article");
          projectElement.classList.add("projectElement");
         
          const imgElement = document.createElement("img");
          imgElement.src = item.imageUrl;
          imgElement.alt = item.title;
  
          const titleElement = document.createElement("figcaption");
          titleElement.textContent = item.title;
  
          gallery.appendChild(projectElement);
          projectElement.appendChild(imgElement);
          projectElement.appendChild(titleElement);
        });
      });
  }

  getWorks();






