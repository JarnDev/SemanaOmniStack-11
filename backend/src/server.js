const app = require('./config/custom_express');

const port = 3001

app.listen(process.env.PORT || port, ()=>{
    console.log(`Servidor ativo na porta ${port}`)
})