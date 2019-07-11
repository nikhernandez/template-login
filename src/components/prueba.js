import React, { useEffect, useState } from 'react'
import axios from 'axios'

function Prueba(user) {
  const [data, setData] = useState([])

  const id = hash(user)

  useEffect(() => {
    axios
      .get('http://localhost:4000/owl/user/' + id)
      .then(result => setData(result.data))
  }, [])

  let pru = data
  console.log(pru.user)
  return pru.user
}

function hash(str) {
  var hash = 5381,
    i = str.length

  while (i) {
    hash = (hash * 33) ^ str.charCodeAt(--i)
  }
  return String(hash >>> 0)
}

export default Prueba
