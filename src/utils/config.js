import firebase from 'firebase/app';
import 'firebase/firestore';
var firebaseconfig = {
    apiKey: "AIzaSyBW0JevbJgJnrmF9oGZiFQJrGn_ChVgCNA",
    authDomain: "agroplace-project.firebaseapp.com",
    databaseURL: "https://agroplace-project.firebaseio.com",
    projectId: "agroplace-project",
    storageBucket: "agroplace-project.appspot.com",
    messagingSenderId: "14765101880",
    appId: "1:14765101880:web:a1ad19f0235487b9"
}
export default firebase.initializeApp(firebaseconfig);