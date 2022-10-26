import { useEffect, useState } from "react";
import "./App.css";
import { Button, Form, Container, Row, Col } from "react-bootstrap";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getFirestore,
  collection,
  getDocs,
  getDoc,
  addDoc,
} from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

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

  const handleSignupSubmit = (e) => {
    e.preventDefault();
    console.log("new user: ", newUser);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, newUser.email, newUser.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("user: ", user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("errorCode: ", errorCode);
        console.log("errorMessage: ", errorMessage);
        // ..
      });
  };

  const getPosts = async (db) => {
    const postsCol = collection(db, "posts");
    const postSnapshot = await getDocs(postsCol);
    const postList = postSnapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });
    setPosts(postList);
  };

  const addPost = async (post) => {
    try {
      const docRef = await addDoc(collection(db, "posts"), post);

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  useEffect(() => {
    getPosts(db);
  }, []);

  const handlePostChange = (e) => {
    const { name, value } = e.target;

    setNewPost({
      ...newPost,
      [name]: value,
    });
  };

  const handleNewUserChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value,
    });
  };

  const handleNewPostSubmit = (e) => {
    e.preventDefault();
    addPost(newPost);
    setNewPost(initialStateNewPost);
  };

  return (
    <div className="App">
      <Container>
        <ul>
          {posts.map((post) => (
            <li key={post.id}>{post.title}</li>
          ))}
        </ul>
        <Form onSubmit={handleNewPostSubmit}>
          <Form.Group className="mb-3" controlId="postTitle">
            <Form.Control
              type="text"
              placeholder="Post Title"
              value={newPost.title}
              name="title"
              onChange={handlePostChange}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="postBody">
            <Form.Control
              as="textarea"
              placeholder="Leave a post here"
              style={{ height: "100px" }}
              name="body"
              value={newPost.body}
              onChange={handlePostChange}
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Submit Post
          </Button>
        </Form>

        <hr />
        <Form onSubmit={handleSignupSubmit}>
          <Row>
            <Col>
              <Form.Group className="mb-3" controlId="userEmail">
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  value={newUser.email}
                  name="email"
                  onChange={handleNewUserChange}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group className="mb-3" controlId="userPassword">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  autoComplete="off"
                  name="password"
                  value={newUser.password}
                  onChange={handleNewUserChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <Button variant="primary" type="submit">
            Register
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default App;
