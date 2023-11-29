const pool = require('../db')

const getAllTasks = async (req, res)=>{
    try {
        const allTasks = await pool.query("SELECT * FROM tasks");
        res.json(allTasks.rows);
        //res.send('creating a task');
    } catch (error) {
        next(error);
    }
    
}

const getTask = async (req, res)=>{
    try {
        const { id } = req.params;
        const result = await pool.query("SELECT * FROM tasks WHERE id = $1",[id]);
        
        if (result.rows.length===0){
            return res.status(404).json({
                message: "task not found",
            });
        }
        return res.json(result.rows[0]);
       
    } catch (error) {
   
        next(error);
    }
    res.send('retrieving a single task');
}

const createTask = async (req, res)=>{
    const { title, description }= req.body;
    
    try {
        const result = await pool.query("INSERT INTO tasks(title, description) VALUES ($1, $2) RETURNING *",[
            title,
            description
        ]);
        res.json(result.rows[0]);
        //res.send('creating a task');
    } catch (error) {
        next(error);
    }
}

const deleteTask = async (req, res)=>{
   try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    
    if (result.rowCount===0){
        return res.status(404).json({
            message: "task not found",
        });
    }

    return res.sendStatus(204);
   

   } catch (error) {
    next(error); 
   }
}

const updateTask = async (req, res)=>{
    try {
        const { id } = req.params;
    const {title, description} = req.body;

    const result = await pool.query('UPDATE tasks SET title = $1, description = $2 WHERE id = $3 RETURNING *', [
        title, 
        description, 
        id]);
    
    if (result.rowCount===0){
        return res.status(404).json({
            message: "task not found",
        });
    }

    return res.json(result.rows[0]);
    } catch (error) {
        next(error);
    }
    
}

module.exports = {
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask
}