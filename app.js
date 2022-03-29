//==========SLIDER LIBRARY FLICKITY==============//

const products = document.querySelector('.main-carousel');

var flkty = new Flickity( products, {
  // options
  accessibility: true,
  // groupCells: 4,
  cellAlign: 'left',
  imagesLoaded: true,
  lazyLoad: true,
  pageDots: false,
  prevNextButtons: true,
  resize: true
});

//==================PROGRAM=======================//

//PSUEDO CODE 
// 1- ürün kategorilerini al, sekmelere ekle
// 2- Sekmelere tıklayınca o kategoriye ait ürünleri/datalarını ve sayılarını edin
// 3- Ürün sayısını al, sayı kadar ürün kartı oluştur
// 4- Ürün resimlerini al loop ile her karta ekle 
// 5- Ürün isimlerini loop ile ekle 
// 6- Ürün fiyatlarını loop ile ekle
// 7- bedava kargo true ise bedava kargo kısmını ekle

// const listLength = Object.keys(an_object_name).length Object length

const categories = document.getElementById("categories");

 async function program() {
  let response = await fetch("./product-list.json");
  let productList = await response.json();
  console.log(productList);
  console.log(productList.responses[0][0].params.userCategories); 

  // Creating the Sidebar
  const createSidebar = () => {
    let userCategories = productList.responses[0][0].params.userCategories; // creating userCategories Array
    console.log(userCategories.length);

    for (i=0; i < userCategories.length; i++) { // Checking for ">" and splitting the string
      let string = userCategories[i];
      if (string.includes(">")) {
        userCategories[i] = string.slice(string.indexOf(">") + 2);
      } 
    }

    for (i=0; i < userCategories.length; i++ ) { // create list element and add classes
        let link = document.createElement( "a" );
        link.classList.add("category-item");
        link.appendChild(document.createTextNode(userCategories[i]));
        categories.appendChild(link);
    }
  }

  createSidebar();
}

program();
