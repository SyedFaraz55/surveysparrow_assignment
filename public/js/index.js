const btn = document.querySelector("#shrt");
const warn = document.getElementById('warn-display')
const close = document.querySelector('#warn-close')

btn.addEventListener('click',()=>{
    warn.style.visibility = 'visible'
})

close.addEventListener('click',()=>{
    warn.style.visibility = 'hidden'
})