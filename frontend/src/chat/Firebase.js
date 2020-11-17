import firebase from 'firebase';
 
const config = {  
    apiKey: "AIzaSyCqyu6XGMPp1yCwVQ8LCU7jZSpcTQrbpvI",
    authDomain: "shmfirebase.firebaseapp.com",
    databaseURL: "https://shmfirebase.firebaseio.com",
    projectId: "shmfirebase",
    storageBucket: "shmfirebase.appspot.com",
    messagingSenderId: "505475840929",
    appId: "1:505475840929:web:3ebbc6e540bc03cd02a9e0",
    measurementId: "G-M1B3NHMESW",
};
 
firebase.initializeApp(config);

export default firebase;
