const Todo = require('../models/Todo')

const DeleteData = {
    deleteTodo: (obj, callback) => {
        Todo
        .where({status: true})
        .destroy(obj)
        .then(() => {
            Todo.fetchAll().then(todos => {
                callback(todos.models.map(todo => todo.attributes))
            })
        })
    }
}

module.exports = DeleteData