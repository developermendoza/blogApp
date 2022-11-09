import React, { useState } from "react";
import {
  Typography,
  Box,
  Toolbar,
  Container,
  Paper,
  TextareaAutosize,
  Button,
  Input,
  Grid,
} from "@mui/material";
import TextField from "@mui/material/TextField";
import AddIcon from "@mui/icons-material/Add";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import ImageUploading from "react-images-uploading";
import Modal from "@mui/material/Modal";
import AddAPhotoOutlinedIcon from "@mui/icons-material/AddAPhotoOutlined";
import OndemandVideoOutlinedIcon from "@mui/icons-material/OndemandVideoOutlined";

const categories = [
  "music",
  "lifestyle",
  "fashion",
  "culture",
  "fitness",
  "travel",
  "art",
  "agriculture",
  "design",
  "food",
  "politics",
  "entertainment",
  "sport",
  "health",
];

const initialState = {
  title: "",
  description: "",
  pictures: [],
  video: "",
  source: "",
  category: "",
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AddPost = () => {
  const [post, setPost] = useState(initialState);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const maxNumber = 5;
  // Post input
  // Title
  // Description
  // Pick category in a dropdown menu
  // Add the main picture
  // add more photos, the first one will be the main one
  // add video, one video allowed

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({
      ...post,
      [name]: value,
    });
  };

  const onChangeImage = (imageList, addUpdateIndex) => {
    // data for submit
    setPost({
      ...post,
      pictures: imageList,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submitted");

    console.log("post: ", post);
  };

  return (
    <Container maxWidth="md">
      <Toolbar style={{ marginTop: "100px" }} />
      <Typography variant="h2" component="h1">
        Create Post
      </Typography>
      <Paper elevation={1}>
        <Box
          id="createPost"
          component="form"
          sx={{
            p: 3,
          }}
          noValidate
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            fullWidth
            name="title"
            value={post.title}
            onChange={handleChange}
          />
          <TextareaAutosize
            aria-label="empty textarea"
            name="description"
            placeholder="Add description here"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            minRows={10}
            value={post.description}
            onChange={handleChange}
          />
        </Box>
        {/* <div style={{ background: "#ddd", padding: "0 20px", display: "flex" }}>
          <div
            style={{ display: "flex", alignItems: "center", cursor: "pointer" }}
            onClick={handleOpen}
          >
            <AddIcon style={{ color: "green" }} />
            <p style={{ color: "grey" }}>Add Pictures</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <AddIcon style={{ color: "green" }} />
            <p style={{ color: "grey" }}>Add Video</p>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "20px",
            }}
          >
            <AddIcon style={{ color: "green" }} />
            <p style={{ color: "grey" }}>Add Source</p>
          </div>
        </div> */}
      </Paper>
      <Paper elevation={1} style={{ padding: "10px", marginTop: "20px" }}>
        <p style={{ textAlign: "left" }}>Categories</p>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="row-radio-buttons-group"
          >
            {categories.map((item) => (
              <FormControlLabel
                style={{
                  position: "relative",
                  border:
                    post.category === item
                      ? "2px solid #f64744"
                      : "2px solid #eee",
                  borderRadius: "50px",
                  padding: "10px 20px",
                  margin: "5px",
                  color: post.category === item ? "#f64744" : "grey",
                }}
                key={item}
                control={
                  <Radio
                    name="category"
                    value={item}
                    onChange={handleChange}
                    checked={post.category === item}
                    style={{
                      visibility: "hidden",
                      position: "absolute",
                    }}
                  />
                }
                label={item}
              />
            ))}
          </RadioGroup>
        </FormControl>
      </Paper>
      <Grid container spacing={2} style={{ marginTop: "5px" }}>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={1}
            style={{
              background: "white",
              padding: "10px",
            }}
          >
            <ImageUploading
              multiple
              name="pictures"
              value={post.pictures}
              onChange={onChangeImage}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <div
                    style={{
                      backgroundColor: isDragging ? "#ddd" : "#eee",
                      height: "200px",
                      padding: "10px",
                      border: "2px dashed grey",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <div style={{ display: isDragging ? "none" : "block" }}>
                      <p>
                        <AddAPhotoOutlinedIcon fontSize="large" />
                      </p>
                      <p>Click or Drop Pictures here</p>
                    </div>
                  </div>
                  {/* <button onClick={onImageRemoveAll}>Remove all images</button> */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: "space-between",
                    }}
                  >
                    {imageList.map((image, index) => (
                      <div
                        key={index}
                        className="image-item"
                        style={{ border: "2px solid #eee", marginTop: "5px" }}
                      >
                        <img
                          src={image["data_url"]}
                          alt=""
                          height="80px"
                          width="auto"
                        />
                        <div className="image-item__btn-wrapper">
                          <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={() => onImageUpdate(index)}
                            style={{ marginBottom: "15px" }}
                          >
                            Update
                          </Button>
                          <Button
                            fullWidth
                            variant="contained"
                            color="warning"
                            onClick={() => onImageRemove(index)}
                          >
                            Remove
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </ImageUploading>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper
            elevation={1}
            style={{
              background: "white",
              padding: "10px",
            }}
          >
            {/* <ImageUploading
              multiple
              name="pictures"
              value={post.pictures}
              onChange={onChangeImage}
              maxNumber={maxNumber}
              dataURLKey="data_url"
            >
              {({
                imageList,
                onImageUpload,
                onImageRemoveAll,
                onImageUpdate,
                onImageRemove,
                isDragging,
                dragProps,
              }) => (
                // write your building UI
                <div className="upload__image-wrapper">
                  <div
                    style={{
                      backgroundColor: isDragging ? "#ddd" : "#eee",
                      height: "200px",
                      padding: "10px",
                      border: "2px dashed grey",
                      cursor: "pointer",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={onImageUpload}
                    {...dragProps}
                  >
                    <div style={{ display: isDragging ? "none" : "block" }}>
                      <p>
                        <OndemandVideoOutlinedIcon fontSize="large" />
                      </p>
                      <p>Click or Drop video here</p>
                    </div>
                  </div>
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading> */}
          </Paper>
        </Grid>
      </Grid>

      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <input
          style={{
            background: "#f64744",
            padding: "10px 20px",
            border: "none",
            color: "white",
            borderRadius: "5px",
          }}
          type="submit"
          form="createPost"
          value="Submit Post"
        />
        {/* <Button form="createPost" variant="contained">
          Submit Post
        </Button> */}
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ImageUploading
            multiple
            name="pictures"
            value={post.pictures}
            onChange={onChangeImage}
            maxNumber={maxNumber}
            dataURLKey="data_url"
          >
            {({
              imageList,
              onImageUpload,
              onImageRemoveAll,
              onImageUpdate,
              onImageRemove,
              isDragging,
              dragProps,
            }) => (
              // write your building UI
              <div className="upload__image-wrapper">
                <button
                  style={isDragging ? { color: "red" } : undefined}
                  onClick={onImageUpload}
                  {...dragProps}
                >
                  Click or Drop here
                </button>
                &nbsp;
                <button onClick={onImageRemoveAll}>Remove all images</button>
                {imageList.map((image, index) => (
                  <div key={index} className="image-item">
                    <img src={image["data_url"]} alt="" width="100" />
                    <div className="image-item__btn-wrapper">
                      <button onClick={() => onImageUpdate(index)}>
                        Update
                      </button>
                      <button onClick={() => onImageRemove(index)}>
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ImageUploading>
        </Box>
      </Modal>
    </Container>
  );
};

export default AddPost;
