let next = document.querySelector('.left-swipe')
let prev = document.querySelector('.right-swipe')

let carousel = document.querySelector('.carousel')
let cards = document.querySelectorAll('.carousel-card')
let cardLength = cards.length;

let currIndex = 0;

next.addEventListener('click',function(){
    currIndex = (currIndex + 1) % (cardLength-2);
    showTestimonials(currIndex);
})

prev.addEventListener('click',function(){
    currIndex = (cardLength + currIndex - 3) % (cardLength-2);
    showTestimonials(currIndex);
})


function showTestimonials(index){
    let position = -index*350 + 'px';
    carousel.style = `transition:all .5s ease-in-out;`
    carousel.style.transform = 'translateX('+ position +')'
    console.log(position)
  }


carousel.addEventListener('transitioned',function(){
    carousel.style.transition = 'none'
 })