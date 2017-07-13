import React, { Component } from 'react';
import './App.css';
import './reset.css';
import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import Menu from './menu'
import DateHeader from './date'
import 'normalize.css';
import UserDialog from './UserDialog';
import { getCurrentUser, signOut, TodoModel } from './leanCloud.js'


class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      user: getCurrentUser() || {},
      newTodo: '',
      changedTodo: '',
      todoList: []     //每次进入页面的时候load
    }
    this.JSONCopy = this.JSONCopy.bind(this)
    let user = getCurrentUser()
    if (user) {
      TodoModel.getByUser(user, (todos) => {
        let stateCopy = this.JSONCopy(this.state)
        stateCopy.todoList = todos
        this.setState(stateCopy)
      })
    }
  }


  render() {
    let todos = this.state.todoList
      .filter((item) => !item.deleted)
      .map((item, index) => {
        return (
          <li key={index} >
            <TodoItem todo={item} onToggle={this.toggle.bind(this)}
              onDelete={this.delete.bind(this)} onChange={this.changeTodo.bind(this)}
              onBlur={this.sendData.bind(this)} />
          </li>
        )
      })
    return (
      <div className="App">
        <Menu />
        <div className="Todo">
          <DateHeader getDate={this.getDate.bind(this)}/>
          <div className="inputWrapper">
            <TodoInput content={this.state.newTodo}
              onChange={this.changeTitle.bind(this)}
              onSubmit={this.addTodo.bind(this)} />
          </div>
          <ol className="todoList">
            {todos}
          </ol>
          {this.state.user.id ? <button onClick={this.signOut.bind(this)}>登出</button> : null}
          {this.state.user.id ? null : <UserDialog onSignUp={this.onSignUpOronSignIn.bind(this)} onSignIn={this.onSignUpOronSignIn.bind(this)} />}
        </div>
      </div>
    )
  }

  getDate() {
    let currentDate = new Date()
    let monthArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov.', 'Dec']
    let weekArray = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY', 'SATURDAY', 'SUNDAY']
    let dateObj = {
      year: currentDate.getFullYear(), month: monthArray[currentDate.getMonth()],
      day: currentDate.getDate(), week: weekArray[currentDate.getDay() - 1]
    }
    return dateObj
  }
  signOut() {
    signOut();  //这里的signOut,todolistStore是从leanCloud导入的LeanCloud,每次退出的时候上传todolist到数据库
    let stateCopy = this.JSONCopy(this.state)
    stateCopy.user = {}
    stateCopy.todoList = [] //登出todoList清空
    this.setState(stateCopy)
  }

  onSignUpOronSignIn(user) {
    let stateCopy = this.JSONCopy(this.state)  //块级作用域必须为函数作用域，才能让getByUser中的stateCopy起到作用
    stateCopy.user = user
    TodoModel.getByUser(user, (todos) => {
      if (todos.length !== 0) {
        stateCopy.todoList = todos
      }
      this.setState(stateCopy)  //this.setState必须在这里，保证其在获取todos之后
    })
    // this.setState(stateCopy)  
  }

  JSONCopy(data) {
    return JSON.parse(JSON.stringify(data))
  }  //JSON深拷贝封装

  componentDidUpdate() {
    //每次setState的时候存储用户操作
    //componentDidUpdate 会在组件更新[数据更新]之后调用。可以把 localStore.save('todoList', this.state.todoList) 写在这个钩子里。当用户的待办事项发生改变之后，即存储操作
  }

  changeTodo(event, todo) {
    todo.title = event.target.value
    let stateCopy = this.JSONCopy(this.state)
    stateCopy.changedTodo = todo //保存改变的todo
    this.setState(stateCopy)
  }

  sendData(todo) {
    let oldState = this.JSONCopy(this.state)  //保留更新之前的state
    oldState.changedTodo = ''  //不管是否发送请求成功 changedTodo都将清空
    let changedTodo = this.state.changedTodo  //获得要更新的todo
    TodoModel.update(changedTodo, () => {
      this.setState(this.state)
    }, (error) => {
      this.setState(oldState)  //请求失败 更新之前的state
    })
  }

  toggle(e, todo) {
    let oldStatus = todo.status
    todo.status = todo.status === 'completed' ? '' : 'completed'
    TodoModel.update(todo, () => {
      this.setState(this.state)
    }, (error) => {
      todo.status = oldStatus
      this.setState(this.state)
    })
  }

  changeTitle(event) {
    this.setState({
      newTodo: event.target.value,
      todoList: this.state.todoList
    })
  }

  addTodo(event) {
    let newTodo = {
      title: event.target.value,
      status: '',
      deleted: false
    }

    TodoModel.create(newTodo, (id) => {
      newTodo.id = id
      this.state.todoList.push(newTodo)
      this.setState({
        newTodo: '',
        todoList: this.state.todoList
      })
    }, (error) => {
      console.log(error)
    })
  }

  delete(event, todo) {
    TodoModel.destroy(todo.id, () => {
      todo.deleted = true
      this.setState(this.state)
    })
  }

}

export default App;

