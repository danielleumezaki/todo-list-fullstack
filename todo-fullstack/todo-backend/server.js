const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const port = process.argv[2] || 8080
const jsonParser = bodyParser.json()
const knex = require('knex')(require('./knexfile')) 
const bookshelf = require('bookshelf')(knex)
const Todo = require('./models/Todo')
const TodoController = require('./controllers/TodoController')
const AttributesToUpdate = require('./controllers/AttributesToUpdate')
const DeleteData = require('./controllers/DeleteData')

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next();
  });

  app.get("/getTodo", (req, res) => {
    Todo
	.fetchAll()
	.then(todos => {
		res.json(todos.models.map(todo => todo.attributes))
	})

  })
  app.post("/postTodo", (req, res) => {
    let result = req.body

    TodoController.addTodo(result.todo, (todos) => {
        res.json(todos)
    })
  })

app.put("/updateTodo", (req, res) => {
    let result = req.body
    AttributesToUpdate.updateTodo(result, (todos) => {
        console.log(todos)
        res.json(todos)
    })  
})

app.delete("/deleteTodo", (req, res) => {
    let result = req.body
    DeleteData.deleteTodo(result, (todos) => {
        res.json(todos)
    })

})
  
app.listen(port, () => {
    console.log(`Server started on http://localhost: ${port}`);
    console.log('Press CTRL + C to stop server');
  })