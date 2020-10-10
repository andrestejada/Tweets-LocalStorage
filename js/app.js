//Variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets')

let tweets = [];
//Eventos


eventListener()
//Cuando agregamos un Tweet
function eventListener(){
formulario.addEventListener('submit',agregandoTweet);
//cuando el documento carga

document.addEventListener('DOMContentLoaded',()=> {
tweets = JSON.parse(localStorage.getItem('tweets')) || []
crearHTML()

});

}

//Funciones

function agregandoTweet (e){
e.preventDefault()

//Text area donde escribe
const tweet = document.querySelector('#tweet').value;


//validad tweet
if(tweet === ""){
    mostrarError('El mensaje no puede ir vacio')
    return; // evita que se ejecute mas lineas de codigo//
}




const tweetObj ={
    id:Date.now(),
    tweet
}

//añadir tweet al arreglo

tweets =[...tweets,tweetObj]
 
//Crea el HTML de los tweets
crearHTML()

// resetear el formulario

formulario.reset();
}




//funcion de mostrar error

function mostrarError(error){

    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertar tweet al HTML

    const contenedor = document.querySelector('#contenido');
    contenedor.appendChild(mensajeError)
// elimina el mensaje de error despues de 3 segundos

    setTimeout(()=>{
        mensajeError.remove()
    },3000)
}


//funcion para craer el html de los tweets

function crearHTML(){
    limpiarHtml()

    if(tweets.length > 0){
        tweets.forEach( tweet =>{
            //crear boton de X
            const BtnBorrar = document.createElement('a');
            BtnBorrar.classList.add('borrar-tweet')
            BtnBorrar.textContent = 'X'
          
            //eliminar los tweets
            BtnBorrar.onclick = ()=>{
                borrarTweet(tweet.id)
            }
            //crear el html
            const li = document.createElement('li')
            li.textContent = tweet.tweet
            listaTweets.appendChild(li)
            li.appendChild(BtnBorrar)
        });
    }

    agregarLocalStorage()
}


//Limpia el html

function limpiarHtml (){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild)
    }
}

//agregar tweets al localStorage

function agregarLocalStorage(){

    localStorage.setItem('tweets',JSON.stringify(tweets))
}

//borrar tweets del DOM

function borrarTweet(id){
tweets = tweets.filter(tweet=> tweet.id !== id )
crearHTML()
}