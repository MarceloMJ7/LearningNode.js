const express = require('express')
const app = express()
const port = 3000;
const path = require('path')

const basePath = path.join(__dirname,'templates')

//middleware para ler o body

app.use(
    express.urlencoded({
        extended:true
    }),
)

app.use(express.json())


app.get('/users/add', (req,res) => {
    res.sendFile(`${basePath}/userform.html`)
})

app.post('/users/save', (req,res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`O seu nome é ${name} e sua idade é ${age}`)
})

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

