"use client";
import { deleteBlog, getAllBlogs } from "@/store/slices/blogSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../Card/Card";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Modal } from "@mui/material";
import CreateBlog from "./CreateBlog";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 650,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const AllBlogs = () => {
  const dispatch = useDispatch(); //@ts-ignore
  const blogs = useSelector((state) => state.blog.blogs);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const openModal = (blog: any) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
  };
  const handleUpdate = async (updatedBlog: any) => {
    //@ts-ignore
    const result = await dispatch(updateBlog(updatedBlog));
    console.log("🚀 ~ handleUpdate ~ result:", result)
  };

  const handleDelete = async (blog: any) => {
    const { id, blogImageId } = blog; //@ts-ignore
    if (blogImageId) {
      setLoading(true);
      try {
        // Delete the image from Cloudinary
        await axios.post("http://localhost:8000/api/image/deleteImage", {
          id: blogImageId,
        });

        //@ts-ignore
        await dispatch(deleteBlog(id));
      } catch (error) {
        console.error("Error deleting blog or image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const gettingBlogs = async () => {
      //@ts-ignore
      const result = await dispatch(getAllBlogs());
      console.log("🚀 ~ gettingBlogs ~ result:", result);
    };
    gettingBlogs();
  }, []);
  return (
    <div className="container mx-auto p-4">
      {loading && (
        <div className="my-4 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog: any) => (
          <MediaCard
            key={blog.id}
            blog={blog}
            handleDelete={() => handleDelete(blog)}
            handleUpdate={() => openModal(blog)} // add this line
            loading={loading}
          />
        ))}
      </div>
      {selectedBlog && (
        <Modal
          open={isModalOpen}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <CreateBlog  />
          </Box>
        </Modal>
      )}
    </div>
  );
};

export default AllBlogs;
