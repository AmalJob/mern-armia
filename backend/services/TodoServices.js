const Todo = require("../modal/TodoModal");

// add todo

const addTodo = async(text,userId)=>{
 try {
    const newTodo = new Todo({
        todo: text,
        userId: userId,
      });
      const todo = await newTodo.save();
      return todo
 } catch (error) {
    throw Error(error)
 }
}

// get todos

const getTodos = async(userId)=>{
  try {
    const todos = await Todo.find({ userId:userId }).sort({_id:-1});
    return todos
  } catch (error) {
    throw Error(error)
  }
}

// get a todo

const getATodo = async(id)=>{
 try {
    const todos = await Todo.findOne({
        _id: id,
      });
      return todos
 } catch (error) {
    throw Error(error)
 }
};

// edit a todo

const editTodo = async(id,data)=>{
    try {
        const todo = await Todo.findByIdAndUpdate(
            id,
            { $set: data},
            { new: true }
          );
          return todo
    } catch (error) {
        throw Error(error)
    }
};

// delete a todo

const deleteTodo = async(id)=>{
    try {
        const todo = await Todo.findByIdAndDelete(id);
        if(todo){
            return todo
        }
    } catch (error) {
        throw Error(error)
    }
}
module.exports = {addTodo,getTodos,getATodo,editTodo,deleteTodo}