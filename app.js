//==========SLIDER LIBRARY FLICKITY==============//

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  accessibility: true,
  // groupCells: 4,
  cellAlign: 'left',
  imagesLoaded: true,
  lazyLoad: true,
  pageDots: false,
});