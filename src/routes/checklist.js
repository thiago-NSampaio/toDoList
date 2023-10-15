const express = require('express')

const router = express.Router();

const Checklist = require('../models/checklist');

router.get('/', async (req, res) => {
  try {
      let checklists = await Checklist.find({}) // Encontra todas as checklists.
      res.status(200).render('checklists/index', {checklists: checklists}) // Redireciona após a criação.
  } catch (error) {
    res.status(200).render('pages/error', {error: 'Erro ao exibir as Listas'}) // Renderiza a página de erro em caso de falha.
}
})



router.post('/', async (req, res) => {
    const { name } = req.body.checklist; // Extrai o nome do checklist do corpo da solicitação.
    const checklist = new Checklist({ name }); // Cria uma instância de Checklist com o nome fornecido.

    try {
        await checklist.save(); // Salve a instância no banco de dados.
        res.redirect('/checklists'); // Redireciona após a criação.
    } catch (error) {
        res.status(422).render('pages/error', { error }); // Renderiza a página de erro em caso de falha.
    }
    console.log(req.body.checklist);
});


router.get('/new', async (req, res) => {
    try {
        let checklist = new Checklist();
        res.status(200).render('checklists/new', {checklist: checklist})
    } catch (error) {
        res.status(500).render('pages/error', {erros: 'Erro ao carregar o formulário'})
    }
})

router.get('/:id', async (req, res) => {
    try {
      let checklist = await Checklist.findById(req.params.id);
      res.status(200).render('checklists/show', { checklist: checklist });
    } catch (error) {
      res.status(500).render('pages/error', { error: 'Erro ao exibir as Listas de tarefas' });
    }
  });

router.get('/:id/edit', async (req, res) => {
    try {
        let checklist = await Checklist.findById(req.params.id)
        res.status(200).render('checklists/edit', {checklist: checklist})
    } catch (error) {
        res.status(200).render('pages/error', {error: 'Erro ao exibir a edição da Lista de tarefas'})
    }

})

router.put('/:id', async (req, res) => {
    const { name } = req.body.checklist;
    const checklist = await Checklist.findById(req.params.id);

    try {
        await checklist.updateOne({ name });
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('pages/error', { error }); // Use a variável 'error' para renderizar o erro.
    }
    console.log(req.body.checklist);
});



router.delete('/:id', async (req, res) => {
    try {
        let checklist = await Checklist.findByIdAndRemove(req.params.id)
        res.redirect('/checklists');
    } catch (error) {
        res.status(422).render('checklists/edit', {checklist: {...Checklist, errors}})
    }
})


module.exports = router;
