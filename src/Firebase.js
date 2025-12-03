import { initializeApp } from "firebase/app";
 
const firebaseConfig = {
  apiKey: "AIzaSyDvVEz8gN5K-t3zq0HidtWP3EbYAksxXgQ",
  authDomain: "auth-23sept.firebaseapp.com",
  projectId: "auth-23sept",
  storageBucket: "auth-23sept.appspot.com",
  messagingSenderId: "609451376894",
  appId: "1:609451376894:web:08535a0a4df2d0df2725af"
};
 
const app = initializeApp(firebaseConfig);
export default app;