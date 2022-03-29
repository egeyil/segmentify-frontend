//==========SLIDER LIBRARY FLICKITY==============//
var mainCarousel = document.querySelector('.main-carousel');

var flkty = new Flickity( mainCarousel, {
  // options
  accessibility: true,
  cellAlign: 'left',
  imagesLoaded: true,
  lazyLoad: true,
  pageDots: false,
  prevNextButtons: true,
  resize: true
});

//==================PROGRAM=======================//

//PSUEDO CODE 
// 1- ürün kategorilerini al, sekmelere ekle - DONE
// 2- Sekmelere tıklayınca o kategoriye ait ürünleri/datalarını ve sayılarını edin, sekme ismini linke ekle 
// 3- Ürün sayısını al, sayı kadar ürün kartı oluştur
// 4- Ürün resimlerini al loop ile her karta ekle 
// 5- Ürün isimlerini loop ile ekle 
// 6- Ürün fiyatlarını loop ile ekle
// 7- bedava kargo true ise bedava kargo kısmını ekle

// const listLength = Object.keys(an_object_name).length Object length

const categories = document.getElementById("categories");
const carouselSection = document.getElementById("carousel-section");

  
async function program() {
  let response = await fetch("./product-list.json");
  let productList = await response.json();
  let userCategories = productList.responses[0][0].params.userCategories; // creating userCategories Array
  let recommendedProducts = productList.responses[0][0].params.recommendedProducts; 
  let categoryArray = [];

  for (i=0; i < userCategories.length; i++) { // Checking for ">" and splitting the string, then adding it to the Category array
    if (userCategories[i].includes(">")) {
      let categoryName = userCategories[i].slice(userCategories[i].indexOf(">") + 2);
      categoryArray[i] = categoryName;
    } else {
      categoryArray[i]  = userCategories[i];
    }
  }

  //Initial Page Setup 
  const initPage = () => {

    //This will run everytime a sidebar link gets clicked
    const createPage = (e) => {
      const tabId = e.target.id;
      const selectedCategory = recommendedProducts[tabId]; // This will be an array
      
      const createProducts = () => {

        const createProductCards = () => {
          for (i=0; i < selectedCategory.length; i++) {
            const productCard = document.createElement("div");
            const imageContainer = document.createElement("div");
            const imagePlaceholder = document.createElement("img");
            imagePlaceholder.src = selectedCategory[i].image;
            const container = document.createElement("div");

            const productName = document.createElement("div");
            const productNameP = document.createElement("p");
            productNameP.appendChild(document.createTextNode(selectedCategory[i].name));
            productName.appendChild(productNameP);

            const productPrice = document.createElement("div");
            const productPriceP = document.createElement("p");
            productPriceP.appendChild(document.createTextNode(selectedCategory[i].priceText));
            productPrice.appendChild(productPriceP);

            cargo = document.createElement("div");
            cargoP = document.createElement("p");

            const checkShippingFee = () => {
              if (selectedCategory[i].params.shippingFee = "FREE") {
                cargoP.appendChild(document.createTextNode("🚚 Ücretsiz Kargo"));
                cargo.appendChild (cargoP);
              } else {
                cargoP.appendChild(document.createTextNode("YOK"));
                cargo.appendChild (cargoP);
              }
            }
            
            checkShippingFee();

            const buyContainer = document.createElement("div");
            const buyContainerButton = document.createElement("button");
            buyContainerButton.appendChild(document.createTextNode("Sepete Ekle"));
            buyContainer.appendChild(buyContainerButton);

            productCard.classList = "product-card carousel-cell";
            imageContainer.classList = "image-container"
            container.classList = "container";
            productName.classList = "product-name";
            productPrice.classList = "product-price";
            cargo.classList = "cargo";
            buyContainer.classList = "buy-container";
            buyContainerButton.classList = "buy-button";

            imageContainer.appendChild(imagePlaceholder);
            productCard.appendChild(imageContainer);
            container.appendChild(productName);
            container.appendChild(productPrice);
            container.appendChild(cargo);
            container.appendChild(buyContainer);
            productCard.appendChild(container);

            mainCarousel.appendChild(productCard);
          }
          
        }

        createProductCards();
      } 

      createProducts();   
    }

    // Creating the Sidebar
    const createSidebar = () => {
      for (i=0; i < categoryArray.length; i++ ) { // create list element and add classes
        let link = document.createElement( "div" );
        link.id = userCategories[i]; //in order to select categories we use userCategories (because they are same as the recommendedProducts)
        link.classList.add("category-item");
        link.appendChild(document.createTextNode(categoryArray[i]));
        link.addEventListener("click", createPage);
        categories.appendChild(link);
      }
    }
    
    
    createSidebar();
  }

  initPage();


}

program();
