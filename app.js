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
// 9- Yeni sekmeye tıklayınca eski ürünlerin silinmesi - DONE
// 10- Default size özelin seçili olması - DONE
// 11- Lazy-Loading images - DONE
// 12- Layout'un farklı ekranlarda düzgün çalıştığından emin ol - DONE
// 13- Ürün sepete eklendi animasyonunun yok olması - DONE

const mainCarousel = document.querySelector('.main-carousel');
const categories = document.getElementById("categories");
const carouselSection = document.getElementById("carousel-section");
const toast = document.querySelector(".toast");
const toastContainer = document.querySelector(".toast-container");

// ==============LAZYLOAD IMAGES=================
var lazyLoadInstance = new LazyLoad({});

async function program() {
  let response = await fetch("./product-list.json");
  let productList = await response.json();
  let userCategories = productList.responses[0][0].params.userCategories; // creating userCategories Array
  let recommendedProducts = productList.responses[0][0].params.recommendedProducts;
  let categoryArray = [];

  // Checking for ">" and splitting the string, then adding it to the Category array
  for (i = 0; i < userCategories.length; i++) { 
    if (userCategories[i].includes(">")) {
      let categoryName = userCategories[i].slice(userCategories[i].indexOf(">") + 2);
      categoryArray[i] = categoryName;
    } else {
      categoryArray[i] = userCategories[i];
    }
  }

  const createToast = () => {
    //create toast 
    let toast = document.createElement("div");
    toast.classList.add("toast");
    let toastContent = document.createElement("div");
    toastContent.classList.add("toast-content");
    let first = document.createElement("i");
    first.classList = "fas fa-solid fa-check check";
    let message = document.createElement("div");
    message.classList.add("message");
    let span = document.createElement("span");
    span.classList = "text text-1";
    span.appendChild(document.createTextNode("Ürün Sepete Eklendi"));

    message.appendChild(span);
    toastContent.appendChild(first);
    toastContent.appendChild(message);

    toast.appendChild(toastContent);

    let second = document.createElement("i");
    second.classList = "fa-solid fa-xmark close";

    toast.appendChild(second);
    toastContainer.appendChild(toast);
    toast.classList.add("active");
    
    // This code is for removing the toast notification
    let toastList = document.querySelectorAll(".toast"); // NodeList
    console.log(toastList)
    let closeList = document.querySelectorAll(".close"); // NodeList
    
    //add every close button and toast an id
    for (i=0; i < closeList.length; i++) {
      toastList[i].id = i;
      closeList[i].id = i;
    }  

    const deleteFunction = () => {
      for (i=0; i < toastList.length; i++) {
        toastList[i].classList.remove("active");
        setTimeout( function(){
          for (i=0; i < toastList.length; i++) {
            toastList[i].remove();
          }
        }, 500);
      }
    }

    setTimeout(deleteFunction, 3000);

    const removeActive = (e) => {
      toastList[e.target.id].classList.remove("active");

      setTimeout( function() { // Remove only the clicked toast
        toastList[e.target.id].remove();
      }, 500);

    }
  
    // Add every toast item event listener for removal
    for (i=0; i < closeList.length; i++) {
      closeList[i].addEventListener("click", removeActive);
    }

  }

  //Initial Page Setup 
  const initPage = () => { 

    //This will run everytime a sidebar link gets clicked
    const createPage = (tabId) => {
      // Seçilen sekmenin veya default sekmenin ID'si tabId olacak
      let selectedCategory = recommendedProducts[tabId]; // This will be an array

        const createProducts = () => {

          //this is for deleting the contents of the page in order to fill it with new content
          while (mainCarousel.hasChildNodes()) {
            mainCarousel.removeChild(mainCarousel.firstChild);
          }

          // we create the product cards 
          const createProductCards = () => {
            for (i = 0; i < selectedCategory.length; i++) {

              const productCard = document.createElement("div");
              const imageContainer = document.createElement("div");
              const image = document.createElement("img");
              image.classList.add("lazy");
              image.src = "placeholder.png" 
              image.setAttribute("data-src", selectedCategory[i].image);

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
  
              buyContainerButton.addEventListener("click", createToast);
  
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
              lazyLoadInstance.update();
              
            }
          }
          
          createProductCards();

        }
        createProducts();

    }

    const defaultTabOpen = () => {
      let defaultTab = document.querySelector(".default-open");
      defaultTab.classList.add("category-item-active");
      createPage(defaultTab.id);
    }

    const selectTab = (e) => {
      let selectedTabId = e.target.id;
      createPage(selectedTabId);
    }

    // Set Active for Sidebar Items
    const setActive = (e) => {
      let sidebarItems = document.getElementsByClassName("category-item");

      for (i = 0; i < sidebarItems.length; i++) {
        if (sidebarItems[i].classList.contains("category-item-active")) {
          sidebarItems[i].classList.remove("category-item-active");
        }
      }
      e.target.classList.add("category-item-active");
      mainCarousel.scrollTo(0,0); 
    }

    // Creating the Sidebar
    const createSidebar = () => {
      for (i = 0; i < categoryArray.length; i++) {
        let link = document.createElement("div");
        link.id = userCategories[i]; //in order to select categories we use userCategories (because they are same as the recommendedProducts)
        link.classList.add("category-item");
        link.appendChild(document.createTextNode(categoryArray[i]));
        link.addEventListener("click", selectTab);
        link.addEventListener("click", setActive);
        categories.appendChild(link);
      }
    }
    createSidebar();
    let allCategories = document.getElementsByClassName("category-item");
    allCategories[0].classList.add("default-open");
    defaultTabOpen();
    
  }

  initPage();

}

program();




