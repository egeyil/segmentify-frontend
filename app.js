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

