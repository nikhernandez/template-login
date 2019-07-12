import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Prueba(user) {
  const [data, setData] = useState([])


  let pru = data
  console.log(pru.user)
  return pru.user
}

const login = async id => {
  const resp = await axios.get('http://localhost:4000/owl/user/' + id)
  let listo = await resp.data
  //console.log(listo)
  return listo
}

// const login = id => {
//   return new Promise((resolve, reject) => {
//     axios
//       .get('http://localhost:4000/owl/user/' + id)
//       .then(res => {
//         return resolve(res.data)
//       })
//       .catch(function(error) {
//         console.log(error)
//         return reject(error)
//       })
//   })
// }

export async function Testchange(user, password) {
  const id = hash(user)
  let resultado
  await login(id).then(result => validatepassword(result, password))

  return resultado
}

function validatepassword(obj, password) {
  if (obj.password === hash(password)) {
    console.log(obj)
    alert('ok')
  } else {
    console.log(obj)
    alert(`clave invalida`)
  }
}

function hash(str) {
  var hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

export default Testchange
