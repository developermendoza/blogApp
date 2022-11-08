import React, { useState } from "react";
import {
  Typography,
  Box,
  Toolbar,
  Container,
  Paper,
  TextareaAutosize,
  Button,
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
import FormLabel from "@mui/material/FormLabel";

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

const AddPost = () => {
  const [post, setPost] = useState(initialState);
  // Post input
  // Title
  // Description
  // Pick category in a dropdown menu
  // Add the main picture
  // add more photos, the first one will be the main one
  // add video, one video allowed

  return (
    <Container maxWidth="md">
      <Toolbar style={{ marginTop: "100px" }} />
      <Typography variant="h2" component="h1">
        Create Post
      </Typography>
      <Paper elevation={1}>
        <Box
          component="form"
          sx={{
            p: 3,
          }}
          noValidate
          autoComplete="off"
        >
          <TextField
            id="standard-basic"
            label="Title"
            variant="standard"
            fullWidth
            value={post.title}
          />
          <TextareaAutosize
            aria-label="empty textarea"
            placeholder="Add description here"
            style={{ width: "100%", padding: "10px", boxSizing: "border-box" }}
            minRows={10}
            value={post.description}
          />
        </Box>
        <div style={{ background: "#ddd", padding: "0 20px", display: "flex" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
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
        </div>
      </Paper>
      <Accordion style={{ marginTop: "20px" }}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1a-content"
          id="panel1a-header"
        >
          <Typography>Category</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <div style={{ textAlign: "left" }}>
            <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-row-radio-buttons-group-label"
                name="row-radio-buttons-group"
              >
                {categories.map((item) => (
                  <FormControlLabel
                    value={post.category}
                    control={<Radio />}
                    label={item}
                  />
                ))}
              </RadioGroup>
            </FormControl>
          </div>
        </AccordionDetails>
      </Accordion>
      <div style={{ marginTop: "30px", textAlign: "left" }}>
        <Button variant="contained">Submit Post</Button>
      </div>
    </Container>
  );
};

export default AddPost;
