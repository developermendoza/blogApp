import { useEffect, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";
// import { Button, Form, Container, Row, Col } from "react-bootstrap";
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// import {
//   getFirestore,
//   collection,
//   getDocs,
//   getDoc,
//   addDoc,
// } from "firebase/firestore";
// import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Home from "./routes/Home";
import About from "./routes/About";
import Navbar from "./components/Navbar";
import Register from "./routes/Register";
import UserProfile from "./routes/UserProfile";
import PrivateRoute from "./components/PrivateRoute";

// const firebaseConfig = {
//   apiKey: "AIzaSyBGwtSUTJ_W9rO2QLcHWTfz76U9GOOPRi0",
//   authDomain: "blogapp-48df7.firebaseapp.com",
//   projectId: "blogapp-48df7",
//   storageBucket: "blogapp-48df7.appspot.com",
//   messagingSenderId: "621784057473",
//   appId: "1:621784057473:web:46d83625f56dc39a5f6f80",
//   measurementId: "G-83WW8FDH0W",
// };

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);

const initialStateNewPost = {
  title: "",
  body: "",
};

const initialStateNewUser = {
  email: "",
  password: "",
};
// const snapshot = await getDocs(postsCol);
function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState(initialStateNewPost);
  const [newUser, setNewUser] = useState(initialStateNewUser);

  // const handleSignupSubmit = (e) => {
  //   e.preventDefault();
  //   console.log("new user: ", newUser);
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
  //     .then((userCredential) => {
  //       // Signed in
  //       const user = userCredential.user;
  //       // console.log("user: ", user);
  //       // ...
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log("errorCode: ", errorCode);
  //       console.log("errorMessage: ", errorMessage);
  //       // ..
  //     });
  // };

  // const getPosts = async (db) => {
  //   const postsCol = collection(db, "posts");
  //   const postSnapshot = await getDocs(postsCol);
  //   const postList = postSnapshot.docs.map((doc) => {
  //     return { id: doc.id, ...doc.data() };
  //   });
  //   setPosts(postList);
  // };

  // const addPost = async (post) => {
  //   try {
  //     const docRef = await addDoc(collection(db, "posts"), post);

  //     console.log("Document written with ID: ", docRef.id);
  //   } catch (e) {
  //     console.error("Error adding document: ", e);
  //   }
  // };

  // useEffect(() => {
  //   getPosts(db);
  // }, []);

  // const handlePostChange = (e) => {
  //   const { name, value } = e.target;

  //   setNewPost({
  //     ...newPost,
  //     [name]: value,
  //   });
  // };

  // const handleNewUserChange = (e) => {
  //   const { name, value } = e.target;
  //   setNewUser({
  //     ...newUser,
  //     [name]: value,
  //   });
  // };

  // const handleNewPostSubmit = (e) => {
  //   e.preventDefault();
  //   addPost(newPost);
  //   setNewPost(initialStateNewPost);
  // };

  return (
    <div className="App">
      <div>
        {/* <Link to="/">Home</Link> */}
        {/* <Link to="/about">About</Link> */}
      </div>
      <BrowserRouter>
        <Navbar />
        {/* <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Navbar /> */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/user/profile"
            element={
              <PrivateRoute>
                <UserProfile />
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
      {/* <Container>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
        <form action="" onSubmit={handleNewPostSubmit}>
          <input
            type="text"
            placeholder="Post Title"
            value={newPost.title}
            name="title"
            onChange={handlePostChange}
          />
          <textarea
            id=""
            cols="30"
            rows="10"
            placeholder="Leave a post here"
            style={{ height: "100px" }}
            name="body"
            value={newPost.body}
            onChange={handlePostChange}
          ></textarea>
          <button type="submit">Submit Post</button>
        </form>

        <hr />
        <form action="" onSubmit={handleSignupSubmit}>
          <input
            type="email"
            placeholder="Enter email"
            value={newUser.email}
            name="email"
            onChange={handleNewUserChange}
          />

          <input
            type="password"
            placeholder="Password"
            autoComplete="off"
            name="password"
            value={newUser.password}
            onChange={handleNewUserChange}
          />
          <button type="submit">Register</button>
        </form>
      </Container> */}
    </div>
  );
}

export default App;
