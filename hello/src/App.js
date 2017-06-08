import React, { Component } from 'react';
import './App.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import 'normalize.css';
import UserDialog from './UserDialog';
import {getCurrentUser,signOut} from './leanCloud.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user:getCurrentUser()||{},
      newTodo: '',
      todoList: []     //每次进入页面的时候load
    }
  }
  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <li key={index} >
            <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} />
          </li>
        )
      })
    return (
      <div className="App">
        <h1>{this.state.username||'我'}的待办
          {this.state.user.id?<button onClick={this.signOut.bind(this)}></button>:null}
        </h1>
        <div className="inputWrapper">
          <TodoInput content={this.state.newTodo}
            onChange={this.changeTitle.bind(this)}
            onSubmit={this.addTodo.bind(this)} />
        </div>
        <ol className="todoList">
          {todos}
        </ol>
        {this.state.user.id?null:<UserDialog onSignUp={this.onSignUp.bind(this)}/>}
      </div>
    )
  }
  signOut(){
    signOut();
    let stateCopy=JSON.parse(JSON.stringify(this.state))
    stateCopy.user={}
    this.setState(stateCopy)
  }
  onSignUp(user){
    let stateCopy=JSON.parse(JSON.stringify(this.state))
    stateCopy.user=user
    this.setState(stateCopy)
  }
  componentDidUpdate() {
     //每次setState的时候存储用户操作
    //componentDidUpdate 会在组件更新[数据更新]之后调用。可以把 localStore.save('todoList', this.state.todoList) 写在这个钩子里。当用户的待办事项发生改变之后，即存储操作
  }
  toggle(e, todo) {
    todo.status = todo.status === 'completed' ? '' : 'completed'
    this.setState(this.state)  
  }
  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }
  addTodo(event) {
   if((/\S+/).test(event.target.value)===false){
     alert('输入为空，请输入有效的待办事项')
     return
  }
    this.state.todoList.push({
      id: idMaker(),
      title: event.target.value,
      status: null,
      deleted: false
    })
    this.setState({
      newTodo: '',
      todoList: this.state.todoList
    })
  }
  delete(event, todo) {
    todo.deleted = true
    this.setState(this.state)
  }
}
export default App;

let id = 0;

function idMaker() {
  id += 1
  return id
}
