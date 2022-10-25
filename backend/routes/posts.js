import Post from "../schemas/post.js";

export const getPosts = async (req, res) => {
  try {
    const posts = await Post.find({});
    res.send(posts);
  } catch (error) {
    console.log("error: ", error);
  }
};
