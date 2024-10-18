"use client";
import {
  deleteBlog,
  getAllBlogs,
  createBlog,
  updateBlog,
  getAllPsychics,
} from "@/store/slices/blogSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import MediaCard from "../Card/Card";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";
import { Box, Modal } from "@mui/material";
import { toast } from "react-toastify";
import CreateBlog from "./CreateBlog";
import { Plus } from "lucide-react";

const AllBlogs = () => {
  const dispatch = useDispatch();
  const blogs = useSelector((state: any) => state.blog.blogs);
  console.log("🚀 ~ AllBlogs ~ blogs:", blogs);
  // const psychics = useSelector((state: any) => state.blog.psychics || []);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);

  const openModal = (blog: any = null) => {
    setSelectedBlog(blog);
    setIsModalOpen(true);
    setIsUpdating(!!blog);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedBlog(null);
    setIsUpdating(false);
  };

  const handleCreate = async (newBlog: any) => {
    //@ts-ignore
    const result = await dispatch(createBlog(newBlog));
    //@ts-ignore
    if (result?.payload?.newBlog) {
      toast.success("Blog created successfully");
    }
    closeModal();
  };

  const handleUpdate = async (updatedBlog: any) => {
    //@ts-ignore
    const result = await dispatch(
      //@ts-ignore
      updateBlog({ ...selectedBlog, ...updatedBlog }),
    );
    //@ts-ignore
    if (result?.payload?.updatedBlog) {
      toast.success("Blog updated successfully");
    }
    closeModal();
  };

  const handleDelete = async (blog: any) => {
    const { id, blogImageId } = blog;
    if (blogImageId) {
      setLoading(true);
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/deleteImage`,
          {
            id: blogImageId,
          },
        );
        //@ts-ignore
        await dispatch(deleteBlog(id));
      } catch (error) {
        console.error("Error deleting blog or image:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  // const gettingAllPsychics = async () => {
  //   try {
  //     //@ts-ignore
  //     const res = await dispatch(getAllPsychics());
  //     console.log("🚀 ~ gettingAllPsychics ~ res:", res);
  //   } catch (error) {
  //     console.log("Error in getting all psychics");
  //   }
  // };

  // useEffect(() => {
  //   const gettingBlogs = async () => {
  //     setLoading(true);
  //     //@ts-ignore
  //     const result = await dispatch(getAllBlogs());
  //     console.log("🚀 ~ gettingBlogs ~ result:", result);
  //     setLoading(false);
  //   };
  //   gettingBlogs();
  //   // gettingAllPsychics();
  // }, [dispatch]);

  return (
    <div className="container mx-auto p-4">
      {loading && (
        <div className="my-4 flex items-center justify-center">
          <CircularProgress />
        </div>
      )}
      <div className=" mb-5 flex justify-end">
        <button
          onClick={() => openModal()}
          className="my-4 flex items-center rounded-md bg-[#3caad8] p-3 text-white hover:opacity-75"
        >
          <Plus />
          Add New Blog
        </button>
      </div>
      <div className="mt-10 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {blogs?.map((blog: any) => (
          <MediaCard
            key={blog.id}
            blog={blog}
            handleDelete={() => handleDelete(blog)}
            handleUpdate={() => openModal(blog)}
            loading={loading}
          />
        ))}
      </div>

      <Modal
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <Box className="max-h-[98vh] w-full max-w-3xl overflow-y-auto rounded-2xl bg-white p-4 shadow-lg">
          <CreateBlog
            initialValues={selectedBlog}
            onSubmit={isUpdating ? handleUpdate : handleCreate}
          />
        </Box>
      </Modal>
    </div>
  );
};

export default AllBlogs;
