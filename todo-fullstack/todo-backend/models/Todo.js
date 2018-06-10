const knex = require('knex')(require('../knexfile'))
const bookshelf = require('bookshelf')(knex)

const Todo = bookshelf.Model.extend({
    tableName: 'todos'
}, {
        orderBy: function (column, order) {
            return this.query(function (qb) {
                qb.orderBy(column, order);
            })
        }
    }
)
module.exports = Todo