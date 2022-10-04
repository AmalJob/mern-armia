const TodoService = require("../services/TodoServices");

// add a todo

const addTodo = async (req, res) => {
    console.log(req.body);
  const todo = req.body.todo;
  const userId = req.body.userId;
  try {
    const data = await TodoService.addTodo(todo, userId);
    res.status(200).json(todo);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get todos

const getTodos = async(req,res)=>{
try {
    const userId = req.params.id;
    console.log("haiii",userId);
    const todos = await TodoService.getTodos(userId);
    console.log(todos);
    if (todos) {
        console.log(todos);
        res.status(200).json(todos);
      } else {
        res.status(401).json("Data not found");
      }
} catch (error) {
    res.status(500).json(error);
}
}

// get a todo

const getTodo = async(req,res)=>{
    const id = req.params.id
    try {
        const todo = await TodoService.getATodo(id);
        if (todo) {
            console.log(todo);
            res.status(200).json(todo);
          } else {
            res.status(401).json("Data not found");
          }
    } catch (error) {
        res.status(500).json(error);
    }
}

// edit a todo

const editTodo = async(req,res)=>{
    try {
        const id = req.params.id;
        const data = req.body;
        console.log("bo",req.body,id);
        const todo = await TodoService.editTodo(id,data);
        if(todo){
            res.status(200).json(todo); 
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// delete a todo

const deleteTodo = async(req,res)=>{
    try {
        const id = req.params.id
        const todo = await TodoService.deleteTodo(id);
        res.status(200).json("Todo Deleted Successfully")
    } catch (error) {
        res.status(500).json(error);
    }
}

module.exports= {addTodo,getTodos,getTodo,editTodo,deleteTodo};
