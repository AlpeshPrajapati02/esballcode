let technologies = document.querySelectorAll('.tech-nav ul li')

let wordpress = technologies[0];
let magento = technologies[1];
let laravel = technologies[2];
let php = technologies[3];


wordpress.addEventListener('click',function(){
    let wpdiv = document.querySelector('.Wordpress')
    if(!wordpress.classList.contains('active')){
        let activeRemoved = removeActive();
        document.querySelector(`.${activeRemoved}`).style.display = 'none'
        wordpress.classList.add('active')
        // console.log('first')
        wpdiv.style.display = 'flex'
    }
    else{
        wpdiv.style.display = 'flex'
    }
})




magento.addEventListener('click',function(){
    let mgdiv = document.querySelector('.Magento')
    if(!magento.classList.contains('active')){
        let activeRemoved = removeActive();
        document.querySelector(`.${activeRemoved}`).style.display = 'none'
        magento.classList.add('active')
        // console.log('first')
        mgdiv.style.display = 'flex'
    }
    else{
        mgdiv.style.display = 'flex'
    }
})




laravel.addEventListener('click',function(){
    let lvdiv = document.querySelector('.Laravel')
    if(!laravel.classList.contains('active')){
        let activeRemoved = removeActive();
        document.querySelector(`.${activeRemoved}`).style.display = 'none'
        laravel.classList.add('active')
        // console.log('first')
        lvdiv.style.display = 'flex'
    }
    else{
        lvdiv.style.display = 'flex'
    }
})




php.addEventListener('click',function(){
    let phpdiv = document.querySelector('.PHP')
    if(!php.classList.contains('active')){
        let activeRemoved = removeActive();
        document.querySelector(`.${activeRemoved}`).style.display = 'none'
        php.classList.add('active')
        // console.log('first')
        phpdiv.style.display = 'flex'
    }
    else{
        phpdiv.style.display = 'flex'
    }
})


function removeActive(){
    for(let i = 0; i<technologies.length; i++){
        if(technologies[i].classList.contains('active')){
            technologies[i].classList.remove('active')
            return technologies[i].querySelector('p span').innerText;
        }
    }
}



