import AV from 'leancloud-storage'

var APP_ID = 'Y2K6a5h31TUvzkqsv73lbWJ9-gzGzoHsz';
var APP_KEY = 'OoOlYzFzoRPDMc6diPn6SpKW';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export const TodoModel = {
  getByUser(user, successFn, errorFn) {
    // 文档见 https://leancloud.cn/docs/leanstorage_guide-js.html#批量操作
    let query = new AV.Query('Todo')
    query.find().then((response) => {
      let array = response.map((t) => {
        return { id: t.id, ...t.attributes }
      })
      successFn.call(null, array)
    }, (error) => {
      errorFn && errorFn.call(null, error)
    })
  },
  
  create({ status, title, deleted }, successFn, errorFn) {
    let Todo = AV.Object.extend('Todo')
    let todo = new Todo()
    todo.set('title', title)
    todo.set('status', status)
    todo.set('deleted', deleted)
    let acl = new AV.ACL()
    acl.setPublicReadAccess(false) // 注意这里是 false
    acl.setWriteAccess(AV.User.current(), true)
    todo.setACL(acl);
    todo.save().then(function (response) {
      successFn.call(null, response.id)
    }, function (error) {
      errorFn && errorFn.call(null, error) ///???
    });
  },
  update() {

  },
  destroy() {

  }

}

export function signUp(email, username, password, successFn, errorFn) {
  var user = new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.setEmail(email)
  user.signUp().then(function (loginedUser) {
    //loginedUser是leanCloud自带对象，里面有id，attributes等属性或对象
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
  return undefined
}




export function getCurrentUser() {
  let user = AV.User.current();
  if (user) {
    return getUserFromAVUser(user)
  } else {
    return null
  }
}


export function signIn(username, password, successFn, errorFn) {
  AV.User.logIn(username, password).then(function (loginedUser) {
    let user = getUserFromAVUser(loginedUser)
    successFn.call(null, user)
  }, function (error) {
    errorFn.call(null, error)
  })
}

export function signOut() {
  AV.User.logOut()
  return undefined
}


export function todolistStore(Todolists) {
  var TodolistStore = AV.Object.extend('TodolistStore');
  var todolistStore = new TodolistStore();
  todolistStore.save({
    todolists: Todolists
  }).then(function (object) {
    // console.log(object)
    // alert('TodoList Store!');
  })
}

export function sendPasswordResetEmail(email, successFn, errorFn) {
  AV.User.requestPasswordReset(email).then(function (success) {
    successFn.call()
  }, function (error) {
    errorFn.call(null, error)
  })
}

function getUserFromAVUser(AVUser) {
  return {
    id: AVUser.id,
    ...AVUser.attributes //把 attributes对象里的属性及对应的属性值一起返回
  }
}