import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

export default function MediaCard({ blog, handleDelete, handleUpdate, loading }: any) {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia
        sx={{ height: 140 }}
        image={blog.blogImageUrl}
        title={blog.title}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {blog.category}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          onClick={() => handleDelete(blog)}
          disabled={loading}
        >
          Delete
        </Button>
        <Button onClick={handleUpdate} size="small" disabled={loading}>
          Update
        </Button>
      </CardActions>
    </Card>
  );
}
