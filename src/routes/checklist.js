const express = require('express')

const router = express.Router();

router.get('/', (req, res) => {
    console.log('Olá');
    res.send(`<h1>Olá</h1>`)
    res.send();
})

router.post('/', (req, res) => {
    console.log(req.body);
    res.status(200).json(req.body);
})

router.get('/:id', (req, res) => {
    console.log(req.params);
    res.send(`ID:${req.params.id}`)
})

router.put('/:id', (req, res) => {
    console.log(req.params);
    res.send(`PUT ID:${req.params.id}`)
})

router.delete('/:id', (req, res) => {
    console.log(req.params);
    res.send(`DELETE ID:${req.params.id}`)
})


module.exports = router;
