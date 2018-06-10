const Todo = require('../models/Todo')

const TodoController = {
    addTodo: (obj, callback) => {
        new Todo({
            text: obj.text,
            status: false
        })
        .save()
        .then(() => {
            Todo.fetchAll().then(todos => {
                callback(todos.models.map(todo => todo.attributes))
            })
        })
    }
}

module.exports = TodoController
