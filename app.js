//==========SLIDER LIBRARY FLICKITY==============//
const mainCarousel = document.querySelector('.main-carousel');
// var flkty = new Flickity( mainCarousel, {
//   // options
//   accessibility: true,
//   cellAlign: 'left',
//   imagesLoaded: true,
//   lazyLoad: true,
//   pageDots: false,
//   prevNextButtons: true,
//   resize: true
// });


//==================PROGRAM=======================//

//PSUEDO CODE 
// 1- ürün kategorilerini al, sekmelere ekle - DONE
// 2- Sekmelere tıklayınca o kategoriye ait ürünleri/datalarını ve sayılarını edin, sekme ismini linke ekle  - DONE
// 3- Ürün sayısını al, sayı kadar ürün kartı oluştur - DONE
// 4- Ürün resimlerini al loop ile her karta ekle - DONE
// 5- Ürün isimlerini loop ile ekle - DONE
// 6- Ürün fiyatlarını loop ile ekle - DONE
// 7- bedava kargo true ise bedava kargo kısmını ekle - DONE 
// 8- Ürün sepete eklendi animasyonu - DONE
// 9- Yeni sekmeye tıklayınca eski ürünlerin silinmesi
// 10- Lazy-Loading images 
// 11- Layout'un farklı ekranlarda düzgün çalıştığından emin ol 
// 12- Ürün sepete eklendi animasyonunun yok olması

// const listLength = Object.keys(an_object_name).length Object length

const categories = document.getElementById("categories");
const carouselSection = document.getElementById("carousel-section");
const toast = document.querySelector(".toast");
const closeIcon = document.querySelector(".close");
// const placeholderDiv = document.getElementsByClassName("placeholder-div");

closeIcon.addEventListener("click", () => {
  toast.classList.remove("active");
});

async function program() {
  let response = await fetch("./product-list.json");
  let productList = await response.json();
  let userCategories = productList.responses[0][0].params.userCategories; // creating userCategories Array
  let recommendedProducts = productList.responses[0][0].params.recommendedProducts;
  let categoryArray = [];

  for (i = 0; i < userCategories.length; i++) { // Checking for ">" and splitting the string, then adding it to the Category array
    if (userCategories[i].includes(">")) {
      let categoryName = userCategories[i].slice(userCategories[i].indexOf(">") + 2);
      categoryArray[i] = categoryName;
    } else {
      categoryArray[i] = userCategories[i];
    }
  }

  //Initial Page Setup 
  const initPage = () => {

    //This will run everytime a sidebar link gets clicked
    const createPage = (e) => {
      const tabId = e.target.id;
      const selectedCategory = recommendedProducts[tabId]; // This will be an array

      const createProducts = (e) => {

        const createProductCards = () => {

          for (i = 0; i < selectedCategory.length; i++) {

            const productCard = document.createElement("div");
            const imageContainer = document.createElement("div");
            const image = document.createElement("img");
            image.src = selectedCategory[i].image;
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
            let freeCargo = selectedCategory[i].params.shippingFee;
            const checkShippingFee = () => {
              if (freeCargo === "FREE") {
                cargo.classList = "cargo";
                cargoP = document.createElement("p");
                cargoP.appendChild(document.createTextNode("🚚 Ücretsiz Kargo"));
                cargo.appendChild(cargoP);
              } else {
                cargo.classList = "empty-box";
              }
            }

            checkShippingFee();

            const buyContainer = document.createElement("div");
            const buyContainerButton = document.createElement("button");
            buyContainerButton.appendChild(document.createTextNode("Sepete Ekle"));
            buyContainer.appendChild(buyContainerButton);

            buyContainerButton.addEventListener("click", () => {
              toast.classList.add("active");
            });

            productCard.classList = "product-card carousel-cell";
            imageContainer.classList = "image-container"
            container.classList = "container";
            productName.classList = "product-name";
            productPrice.classList = "product-price";
            buyContainer.classList = "buy-container";
            buyContainerButton.classList = "buy-button";

            imageContainer.appendChild(image);
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
    const setActive = (e) => {
      let sidebarItems = document.getElementsByClassName("category-item");

      for (i = 0; i < sidebarItems.length; i++) {
        if (sidebarItems[i].classList.contains("category-item-active")) {
          sidebarItems[i].classList.remove("category-item-active");
        }
      }
      e.target.classList.add("category-item-active");
    }
    // Creating the Sidebar
    const createSidebar = () => {
      for (i = 0; i < categoryArray.length; i++) {
        let link = document.createElement("div");
        link.id = userCategories[i]; //in order to select categories we use userCategories (because they are same as the recommendedProducts)
        link.classList.add("category-item");
        link.appendChild(document.createTextNode(categoryArray[i]));
        link.addEventListener("click", createPage);
        link.addEventListener("click", setActive);
        categories.appendChild(link);
      }
    }
    createSidebar();
  }

  initPage();

}

program();




