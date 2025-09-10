const express = require('express')
const app = express()
const port = 3000;


const checkAuth = function(req,res,next){
    req.authStatus = true
    if(req.authStatus){
    console.log('Logado, pode continuar')
    next()
    }else{
        console.log('Não está logadom faça o login para continuar')
        next()
    }
}

app.use(checkAuth)

app.get('/', (req,res) => {
    res.send('testando porta')
})

app.listen(port, () => {
    console.log('testando')
})

