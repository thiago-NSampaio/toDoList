const express = require('express')

const checkListDependentRoute = express.Router();
const simpleRouter = express.Router();

const Checklist = require('../models/checklist');
const Task = require('../models/task');

checkListDependentRoute.get('/:id/tasks/new', async (req, res) => {
    try {
        let task = new Task()
        res.status(200).render('tasks/new', { checklistId: req.params.id, task: task })
    } catch (error) {
        res.status(422).render('pages/error', { errors: 'Erro ao carregar o formulário' })
    }
})

checkListDependentRoute.post('/:id/tasks', async (req, res) => {
    const { name } = req.body.task;
    const task = new Task({ name, checklist: req.params.id })
    
    try {
        await task.save()
        const checklist = await Checklist.findById(req.params.id)
        checklist.tasks.push(task)
        await checklist.save();
        res.redirect(`/checklists/${req.params.id}`);
    } catch (error) {
        let errors = error.errors
        res.status(422).render('tasks/new', { task: { ...task, errors }, checklistId: req.params.id })
        
    }
})

simpleRouter.delete('/:id', async (req, res) => {
    try {
        let task = await Task.findByIdAndDelete(req.params.id);
        let checklist = await Checklist.findById(task.checklist);
        let taskToRemove = checklist.tasks.indexOf(task.id);
        checklist.tasks.splice(taskToRemove, 1); // Use o método splice para remover o item da matriz
        await checklist.save(); // Certifique-se de salvar o checklist após a remoção
        res.redirect(`/checklists/${checklist._id}`);
    } catch (error) {
        res.status(422).render('pages/error', {errors: 'Erro ao remover uma tarefa' });
    }
});

module.exports = {
    checkListDependent: checkListDependentRoute,
    simple: simpleRouter
}