import { createContext } from 'react'
import { initializeApp } from 'firebase/app'

export const firebase = initializeApp({
  apiKey: 'AIzaSyAmIcx_La6adchUGbgqn5AUIUnscIhakco',
  authDomain: 'ranobe-net-dev.firebaseapp.com',
  projectId: 'ranobe-net-dev',
  storageBucket: 'ranobe-net-dev.appspot.com',
  messagingSenderId: '122890672045',
  appId: '1:122890672045:web:39196d91b0cdf56215f324'
})
const FirebaseContext = createContext(firebase)

export default FirebaseContext
