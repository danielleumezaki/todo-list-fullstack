import React, { Component } from 'react';
import './App.css';
import TodoList from './Components/TodoList.jsx';
import AddTodo from './Components/AddTodo.jsx';
import axios from 'axios';


class App extends Component {

  /*Set the state*/
  constructor(props) {
    super(props)

    this.state = {
      todoList: [],
      todoFiltered: []
    }
  }

  /*Grabbing the ID to change the checkbox status*/
  checkBox = (id, checked) => {
    let todos = this.state.todoList
    let todosChecked = todos.find((todo, i) => {
      if (id === todo.id) {
        todo.status = !todo.status;
        return todo
      }
    })

    axios.put('http://localhost:8080/updateTodo', todosChecked)
      .then((response) => {
        console.log(response)
        this.setState({
          todoList: response.data,
          todoFiltered: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /*Pushing the new itens to the state*/
  handleAddTodo = (todo) => {
    let todos = this.state.todoList.slice();
    todos.push(todo);
    this.setState({
      todoList: todos,
      todoFiltered: todos,
    })
    console.log('Did update')
    axios.post('http://localhost:8080/postTodo', { todo })
      .then((response) => {
        console.log('response: ', response)
        this.setState({
          todoList: response.data,
          todoFiltered: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  componentDidMount() {
    axios.get('http://localhost:8080/getTodo')
      .then(response => {
        if (response.data) {
          console.log('did mount')
          this.setState({
            todoList: response.data,
            todoFiltered: response.data,
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }

  /*Clear objects checked*/
  deleteChecked = (e) => {
    e.preventDefault()
    let filterTodo = this.state.todoList.filter((todo) => {
      return todo.status === true
    })
    console.log(filterTodo)
    let todo = this.state.filterTodo
    axios.delete('http://localhost:8080/deleteTodo', { todo })
      .then((response) => {
        console.log(response)
        this.setState({
          todoList: response.data,
          todoFiltered: response.data
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  /*Filter elements complete, not-complete and all*/
  filter = (e) => {
    if (e.target.value === "not-complete") {
      let filterTodo1 = this.state.todoList.filter((todo) => {
        return todo.status === false
      })
      this.setState({
        todoFiltered: filterTodo1
      })
    } else if (e.target.value === "complete") {

      let filterTodo1 = this.state.todoList.filter((todo) => {
        return todo.status === true
      })
      this.setState({
        todoFiltered: filterTodo1
      })
    } else {
      this.setState({
        todoFiltered: this.state.todoList
      })
    }
  }

  render() {

    return (
      <div className="container">
        <h1>Todo</h1>
        <AddTodo textInput={this.textInput} addInfoArray={this.addInfoArray} addTodoList={this.handleAddTodo.bind(this)} todoList={this.state.todoList} />
        <TodoList todoList={this.state.todoFiltered} checkBox={this.checkBox} filter={this.filter} />
        <br />
        <div className="row">
          <div className="col-3">
            <div className="form-group">
              <label>Filter</label>
              <select className="form-control" id="exampleFormControlSelect1" onChange={this.filter}>
                <option value="all">All</option>
                <option value="complete">Complete</option>
                <option value="not-complete">Not Complete</option>
              </select>
            </div>
          </div>
          <div className="col-6">
          </div>
          <div className="col-3">
            <input className="clear" type="submit" value="CLEAR" onClick={this.deleteChecked} disabled={this.filterTodo1 === false} />
          </div>
        </div>
      </div >
    );
  }
}

export default App;
