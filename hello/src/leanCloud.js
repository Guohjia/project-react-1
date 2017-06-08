import AV from 'leancloud-storage'

var APP_ID = 'Y2K6a5h31TUvzkqsv73lbWJ9-gzGzoHsz';
var APP_KEY = 'OoOlYzFzoRPDMc6diPn6SpKW';
AV.init({
  appId: APP_ID,
  appKey: APP_KEY
});

export default AV

export function signUp(username,password,successFn,errorFn){
  var user=new AV.User()
  user.setUsername(username)
  user.setPassword(password)
  user.signUp().then(function(loginedUser){
    console.log(loginedUser)
    //loginedUser是leanCloud自带对象，里面有id，attributes等属性或对象
    let user=getUserFromAVUser(loginedUser)
    successFn.call(null,user)
  },function(error){
    errorFn.call(null,error)
  })
  return undefined
}

export function getCurrentUser(){
  let user=AV.User.current();
  if(user){
    return getUserFromAVUser(user)
  }else{
    return null
  }
}
export function signIn(username, password, successFn, errorFn){
  AV.User.logIn(username, password).then(function (loginedUser) {
     let user = getUserFromAVUser(loginedUser)
     successFn.call(null, user)
   }, function (error) {
     errorFn.call(null, error)
   })
 }

export function signOut(){
  AV.User.logOut()
  return undefined
}

function getUserFromAVUser(AVUser){
  return {
    id:AVUser.id,
    ...AVUser.attributes //把 attributes对象里的属性及对应的属性值一起返回
  }
}