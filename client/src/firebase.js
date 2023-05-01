import * as firebase from "firebase";

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyDniyhK46KyCVzN4PkypDIKjMEZLfTUx64",
//   authDomain: "ecommerce-225c8.firebaseapp.com",
//   databaseURL: "https://ecommerce-225c8.firebaseio.com",
//   projectId: "ecommerce-225c8",
//   storageBucket: "ecommerce-225c8.appspot.com",
//   messagingSenderId: "593746841585",
//   appId: "1:593746841585:web:f0090fc9296a27f7c67e50",
// };

const firebaseConfig = {
  apiKey: "AIzaSyBNhQrxD0vHZQRP8FNTL0WOOGzCpRER7i0",
  authDomain: "mern-ecommerce-a80ab.firebaseapp.com",
  projectId: "mern-ecommerce-a80ab",
  storageBucket: "mern-ecommerce-a80ab.appspot.com",
  messagingSenderId: "526600062895",
  appId: "1:526600062895:web:36adbe5f9ad6d6cda7115a"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// export
export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
