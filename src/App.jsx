
/*
En la App.jsx tenemos:
1. Importaciones de useState, Formulario.jsx y App.css
2.Dentro de la App:
  2.1 Creamos una función para verificar la API
    2.1.1 Primera petición POST para verificar si una palabra es un palíndromo o no
    2.1.2 Segunda petición GET para obtener el historial de cada palabra enviada junto con su id generado y su valor booleano de true/false

*/


/*-----------------------------------*/


import { useState } from 'react'
import Formulario from "./Formulario"
import './App.css'

function App() {

  const [result, setResult] = useState("") //Estado para el resultado


  //Función para verificar la API
  function checkPalindrome(texto) {

    //Primera petición: Verificamos si la palabra es un palíndromo
    fetch("https://backend-mongo-palindromos.onrender.com/verificar", {
      method : "POST",
      body : JSON.stringify({texto}), //Enviar un texto al servidor
      headers : {
        "Content-type" : "application/json"
      },
    })
    .then((respuesta) => respuesta.json()) //Parsea la respuesta del servidor
    .then((datos) => {
      //Actualiza el resultado de la respuesta
      if (datos.esPalindromo) {
        setResult( <> ¡<span>{texto}</span> es un palíndromo! </> )
      } else {
        setResult( <> ¡<span>{texto}</span> no es un palíndromo! </> )
      }
    })
    .catch((error) => { //Se ejecuta si hay algún error
      console.error("Error al verificar la palabra", error)
    })


    //Segunda petición: Obtenemos el historial + el id de cada última palabra
    fetch("https://backend-mongo-palindromos.onrender.com/historial", {
      method : "GET"
    })
    .then((respuesta) => respuesta.json()) //Parsea la respuesta del servidor
    .then((historial) => { //Parsea la respuesta del historial
      //Historial vacío
      if (historial.length === 0) {
        return
      }

      //Obtenemos el Id de la última palabra
      const ultimoRegistro = historial[historial.length - 1]
      //console.log("Id generado: ", ultimoRegistro?.id || "No disponible")
      
    })
    .catch((error) => {
      console.error("Error al enviar la palabra", error)
    })

  }


  return (
    <>
      <div className="contenedor">
        <div className="header">
          <h1>Gestor de Palíndromos</h1>
          <p>Un <i>palíndromo</i> es una palabra o frase que se escribe igual tanto hacia delante como hacia atrás ignorando la puntuación, las mayúsculas y los espacios.</p>
        </div>

        <Formulario onCheck={checkPalindrome} />

        <p id='result'>{result}</p>
      </div>
    </>
  )
}

export default App
