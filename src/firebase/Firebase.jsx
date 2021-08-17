/**Importación de los servicios de Firebase */
import firebase from "firebase/app";
import "@firebase/firestore";

// Your web app's Firebase configuration
// Initialize Firebase
/**definir y crear la conexion con Firebase */
const firebaseConfig = {
    apiKey: "AIzaSyALCa2IyA4scM-GXZiyDzsRQEqhC9dRAQ4", //esta key es privada
    authDomain: "e-commers-react.firebaseapp.com",
    projectId: "e-commers-react",
    storageBucket: "e-commers-react.appspot.com",
    messagingSenderId: "339295472169",
    appId: "1:339295472169:web:7355fed2625fc8d7532a38"
};

firebase.initializeApp(firebaseConfig);
/**Crea la conexion con el servicio de Firestore */
const db = firebase.firestore();

export {
    db,
    firebase
}