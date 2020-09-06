import firebase from 'firebase'
import 'firebase/firestore'

var config = {
  apiKey: 'AIzaSyBsTipuWVDJTWrqaHqxaJR3FTalUH6TaOc',
  authDomain: 'scrumpoker-3c707.firebaseapp.com',
  databaseURL: 'https://scrumpoker-3c707.firebaseio.com',
  projectId: 'scrumpoker-3c707',
  storageBucket: 'scrumpoker-3c707.appspot.com',
  messagingSenderId: '107616135938',
  appId: '1:107616135938:web:410946762d369c7a0b701b',
  measurementId: 'G-Y0FRDXFQCK'
}

var fire = firebase.initializeApp(config)
export default fire
