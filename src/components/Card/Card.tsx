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
    <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:scale-[102%] transition-all duration-300 ease-in-out">
      <CardMedia
        sx={{ height: 140 }}
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
        <div className="flex items-center gap-4 ml-5 pb-4">

          <button
            className="bg-transparent border-2 border-red p-2 rounded-lg text-red px-4 hover:bg-red hover:text-white"
            onClick={() => handleDelete(blog)}
            disabled={loading}
          >
            {
              loading ? "Deleting.." : "Delete"
            }

          </button>
          <button
            className="bg-green-700 border-2 border-green-700 p-2 rounded-lg hover:bg-transparent hover:text-green-700 px-4 text-white"
            onClick={handleUpdate}
            disabled={loading}
          >
            {
              loading ? "Editing.." : "Update"
            }

          </button>
        </div>

      </CardActions>
    </div>
  );
}
