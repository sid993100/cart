//latest version use imports like below
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";

const firebaseConfig = {

    //firebse config , remove everytime you git push
    apiKey: "AIzaSyAMAt-L3tJ7D9Z4hmyrBlh1AXoQXT5JMaA",
    authDomain: "cart-14c9d.firebaseapp.com",
    projectId: "cart-14c9d",
    storageBucket: "cart-14c9d.appspot.com",
    messagingSenderId: "958831628097",
    appId: "1:958831628097:web:ec87438b58d4dfe50cdbc0"
  

};

//latest version initiliaze and export db like this below
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const firestore = firebase.firestore();