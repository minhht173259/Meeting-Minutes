import Firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// 1) when seeding the database you'll have to uncomment this!
// import { seedDatabase } from '../seed';

const config = {
  apiKey: 'AIzaSyB5K8Mp_Hn_l4IUUvwCeHhmLT5MfksxhQs',
  authDomain: 'netflix-clone-ea7fb.firebaseapp.com',
  projectId: 'netflix-clone-ea7fb',
  storageBucket: 'netflix-clone-ea7fb.appspot.com',
  messagingSenderId: '373245559061',
  appId: '1:373245559061:web:683c6d9927034e6233e91c',
  measurementId: 'G-7G7VK7HH9Q'
};

const firebase = Firebase.initializeApp(config);

// console.log('firebase ', firebase);

// 2) when seeding the database you'll have to uncomment this!
// seedDatabase(firebase);
// 3) once you have populated the database (only run once!), re-comment this so you don't get duplicate data

export { firebase };
