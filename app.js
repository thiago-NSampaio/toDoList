const express = require('express')
require('./config/database')

const checkListRouter = require('./src/routes/checklist.js');

const app = express();

app.use(express.json())

app.use('/checklists',checkListRouter)

app.listen(3000, () => {
    console.log('Servidor Iniciado');
})