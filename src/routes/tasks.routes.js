const { Router } = require ('express');
const pool = require('../db');
const router = Router();

const { getAllTasks, getTask, createTask, deleteTask, updateTask } = require('../controllers/tasks.controllers')

router.get('/tasks', getAllTasks );

router.get('/tasks/:id', getTask);

router.post('/tasks', createTask);
router.delete('/tasks', deleteTask);
router.put('/tasks', updateTask);


module.exports = router;