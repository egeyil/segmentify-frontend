//==========SLIDER LIBRARY FLICKITY==============//

var elem = document.querySelector('.main-carousel');
var flkty = new Flickity( elem, {
  // options
  accessibility: true,
  groupCells: '80%',
  cellAlign: 'left',
  contain: true,
  lazyLoad: true
});