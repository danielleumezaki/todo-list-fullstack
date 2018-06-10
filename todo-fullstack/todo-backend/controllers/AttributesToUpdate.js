const Todo = require('../models/Todo')

/*test*/

const AttributesToUpdate = {
    updateTodo: (obj, callback) => {
        console.log(obj.id)
        Todo
        .where({id: obj.id})
        .save({status: obj.status}, {patch:true})
        .then(() => {
            Todo
            .orderBy('id', 'ASC')
            .fetchAll()
            .then(todos => {
                callback(todos.models.map(todo => todo.attributes))
             })
        })
    }
}
 function sortFunction() {
    sort(todos)
    return todos
}
module.exports = AttributesToUpdate