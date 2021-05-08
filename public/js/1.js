// console.log('client side javascript is loaded!')
// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })



const weatherForm = document.querySelector('form')
const search = document.querySelector('input')

const msgOne = document.querySelector('#msg-1')



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    
    const location = search.value
    
    msgOne.textContent ="Loading....."

    fetch('/weather?address='+ location +'').then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent = data.error
        }else{
            msgOne.textContent = data.forecast
        }
    })
})

})