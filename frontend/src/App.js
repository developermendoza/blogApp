import { useEffect, useState } from "react";
import "./App.css";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBGwtSUTJ_W9rO2QLcHWTfz76U9GOOPRi0",
  authDomain: "blogapp-48df7.firebaseapp.com",
  projectId: "blogapp-48df7",
  storageBucket: "blogapp-48df7.appspot.com",
  messagingSenderId: "621784057473",
  appId: "1:621784057473:web:46d83625f56dc39a5f6f80",
  measurementId: "G-83WW8FDH0W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
// const snapshot = await getDocs(postsCol);
function App() {
  const [posts, setPosts] = useState([]);

  // const data = async () => {
  //   const snapshot = await getDocs(postsCol);
  //   return snapshot;
  // };

  const getPosts = async (db) => {
    const postsCol = collection(db, "posts");
    const postSnapshot = await getDocs(postsCol);
    const postList = postSnapshot.docs.map((doc) => doc.data());
    setPosts(postList);
    // console.log("postList: ", postList);
    // return postList;
  };

  useEffect(() => {
    getPosts(db);
    // const data = getCities(db);
    // console.log("data: ", data);
    // declare the data fetching function
    // const fetchData = async () => {
    //   const data = await getDocs(postsCol);
    //   console.log("data: ", data);
    // };
    // fetchData();
    // call the function
    // fetchData()
    // console.log();
    // make sure to catch any error
    // .catch(console.error);
    // const snapshot = await getDocs(postsCol);
    // const getData = data;
    // console.log("getData: ", getData);
    //  async ()=>{
    //  }
    // fetch("http://localhost:8080/")
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw response;
    //   })
    //   .then((data) => setGetPosts(data))
    //   .catch((err) => console.log("error: ", err));
  }, []);
  return (
    <div className="App">
      <ul>
        {posts.map((post) => (
          <li key={post.title}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
