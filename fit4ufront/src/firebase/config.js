import  firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import {getStorage} from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCO7Q0HUrnVAikGyXo-hm5aw7HJne1rHBc",
  authDomain: "fit4u-f70c8.firebaseapp.com",
  projectId: "fit4u-f70c8",
  storageBucket: "fit4u-f70c8.appspot.com",
  messagingSenderId: "249512355884",
  appId: "1:249512355884:web:50e303a85b12fbfbfb0989",
  measurementId: "G-SZ4LWQSYQ5"
};

if(!firebase.apps.length){
  firebase.initializeApp(firebaseConfig)
}
const auth = firebase.auth();
const storage = getStorage()
export {auth , firebase, storage}