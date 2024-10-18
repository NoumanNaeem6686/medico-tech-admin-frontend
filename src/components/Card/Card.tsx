import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { CircularProgress } from "@mui/material";

export default function MediaCard({
  blog,
  handleDelete,
  handleUpdate,
  loading,
}: any) {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-lg transition-all duration-300 ease-in-out hover:scale-[102%]">
      <CardMedia
        sx={{ height: 300 }}
        image={blog.blogImageUrl}
        title={blog.title}
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {blog.category}
        </Typography>
        <Typography gutterBottom variant="h5" component="div">
          {blog.title}
        </Typography>
      </CardContent>
      <CardActions>
        <div className="ml-5 flex items-center gap-4 pb-4">
          <button
            className="rounded-lg border-2 border-red bg-transparent p-2 px-4 text-red hover:bg-red hover:text-white"
            onClick={() => handleDelete(blog)}
            disabled={loading}
          >
            {loading ? "Deleting.." : "Delete"}
          </button>
          <button
            className="rounded-lg border-2 border-[#3caad8] bg-[#3caad8] p-2 px-4 text-white hover:bg-transparent hover:text-[#3caad8]"
            onClick={handleUpdate}
            disabled={loading}
          >
            {loading ? "Editing.." : "Update"}
          </button>
        </div>
      </CardActions>
    </div>
  );
}
