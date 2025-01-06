
/*
En la App.jsx tenemos:
1. Importamos el estado local del input dentro del formulario
2.Dentro del formulario:
  2.1 Evitamos el comporamiento por defecto del formulario a la hora de enviar una palabra
  2.2 Creamos una alerta en el caso de que el usuario no escriba nada en el texto
  2.3 Enviamos una petición POST al backend cuando verificamos la palabra
  2.4 Limpiamos el input una vez que la palabra ha sido enviada

*/


/*-----------------------------------*/


import { useState } from 'react'

function Formulario({ onCheck }) {
    
    const [input, setInput] = useState("") //Estado local del input

    return (
      <>
        <form className="form" onSubmit={evento => {

          evento.preventDefault() //Evita el comportamiento por defecto del formulario

          //En caso de que el usuario no escriba nada en el input
          if (input.trim().length === 0) {
            alert("Debe escribir un texto") //Alerta
            return
          }

          onCheck(input) //Pasa la función del componente padre (App.js)

          //Enviar la petición al backend
          fetch("https://backend-mongo-palindromos.onrender.com/verificar", {
            method : "POST",
            body : JSON.stringify({texto: input}),
            headers : {
              "Content-type" : "application/json"
            }
          })
          .then((respuesta) => respuesta.json()) //Parsea la respuesta del servidor
          //.then((datos) => console.log("Palabra enviada"))
          .catch((error) => console.error("Error al enviar la palabra", error)) 

          setInput("") //Limpia el formulario una vez enviada la palabra

        }}>
            <input
              id='text-input'
              type="text"
              placeholder='Escribe tu texto aquí'
              value={input}
              onChange={(evento) => setInput(evento.target.value)}
            /> 
            <button id='check-btn' type='submit'>Comprobar palíndromo</button>
        </form>
      </>
    )
  }

export default Formulario