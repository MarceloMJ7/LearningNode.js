const express = require('express')
const app = express()
const port = 3000;
const path = require('path')

const basePath = path.join(__dirname,'templates')


app.get('/users/:id', (req,res) => {
    const id = parseInt(req.params.id) //Pega informações que vem da URL

    console.log(`Buscando o usuário ${id}`)

    if(id === 7){
        console.log(`Buscando o usuário ${id}`)
        res.sendFile(`${basePath}/index.html`)
    }else{
        res.sendFile(`${basePath}/users.html`)
        console.log(`Buscando o usuário ${id}`)
    }

   
})



app.listen(port, () => {
    console.log('testando')
})

