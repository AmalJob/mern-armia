const express = require("express");
const router = express.Router();
const {addTodo, getTodos, getTodo, editTodo, deleteTodo} = require('../Controller/TodoController');
const {verifyToken} = require('../middlewares/SessionCheck')



router.route('/').post(verifyToken, addTodo);

router.route('/:id').get(verifyToken, getTodos)

// get a todo

router.route('/todo/:id').get(getTodo);

// edit todo 

router.route('/:id').put(editTodo); 


// delete a todo

router.route('/:id').delete(deleteTodo)

module.exports = router;
