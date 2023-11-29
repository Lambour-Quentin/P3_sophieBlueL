document.addEventListener("DOMContentLoaded", () => {

  const gallery = document.querySelector(".gallery");

  function displayWorksByCategory(categoryId) {
    fetch('http://localhost:5678/api/works')
      .then(response => response.json()) 
      .then(data => {
        gallery.innerHTML = '';
        
        data.forEach(item => {        
          const cId = parseInt(categoryId);

          if (cId === 0 || item.category.id === cId) {
            displayWork(item);
          }
        });
      });
    }  

    function displayWork(item) {
      
      const figure = document.createElement("figure"); 
      
      const img = document.createElement("img"); 
      img.src = item.imageUrl;
      img.alt = item.title;
      
      const figcaption = document.createElement("figcaption"); 
      figcaption.textContent = item.title;
      
      figure.appendChild(img);
      figure.appendChild(figcaption);
      
      gallery.appendChild(figure);
      
    }

    const filterItems = document.querySelectorAll(".filtre li");
    
    filterItems.forEach(item => {
      item.addEventListener("click", () => {
        displayWorksByCategory(item.getAttribute("data-category"));
      });
    });

    displayWorksByCategory("0");
});

