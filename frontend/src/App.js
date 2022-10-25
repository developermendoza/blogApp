import { useEffect, useState } from "react";
import "./App.css";
function App() {
  const [getPosts, setGetPosts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw response;
      })
      .then((data) => setGetPosts(data))
      .catch((err) => console.log("error: ", err));
  }, []);

  return (
    <div className="App">
      <ul>
        {getPosts.map((post) => (
          <li key={post._id}>{post.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
