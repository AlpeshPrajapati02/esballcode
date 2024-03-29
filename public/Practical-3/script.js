let next = document.querySelector('.slide-left')
let prev = document.querySelector('.slide-right')

let carousel = document.querySelector('.carousel')
let cards = document.querySelectorAll('.carousel-card')
let cardLength = cards.length;

let currIndex = 0;

next.addEventListener('click',function(){
    currIndex = (currIndex + 1) % (cardLength);
    showTestimonials(currIndex);
})

prev.addEventListener('click',function(){
    currIndex = (cardLength + currIndex - 1) % (cardLength);
    showTestimonials(currIndex);
})


function showTestimonials(index){
    let position = -index*100 + '%';
    carousel.style = `transition:all .5s ease-in-out;`
    carousel.style.transform = 'translateX('+ position +')'
    console.log(position)
  }



carousel.addEventListener('transitioned',function(){
    carousel.style.transition = 'none'
 })
