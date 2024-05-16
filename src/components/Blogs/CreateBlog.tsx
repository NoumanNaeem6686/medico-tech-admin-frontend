"use client";
import { createBlog } from "@/store/slices/blogSlice";
import axios from "axios";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";

const CreateBlog = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [errors, setErrors] = useState("");
  const [loading, setloading] = useState(false);
  const [description, setDescription] = useState(""); // State for description

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      updatePreview(files[0]);
      console.log("Selected File:", files[0]);
      uploadFileToCloudinary(files[0]);
    } else {
      setErrors("Please upload an image");
    }
  };

  const updatePreview = (file: any) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      //@ts-ignore
      setPreviewUrl(reader.result);
    };
    reader.readAsDataURL(file);
  };

  const uploadFileToCloudinary = async (file: any) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://localhost:8000/api/image/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      console.log(response.data.data);
      setImageUrl(response.data.data.secure_url);
      setImageId(response.data.data.public_id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      updatePreview(files[0]);
      console.log("Dropped File:", files[0]);
      uploadFileToCloudinary(files[0]);
    } else {
      setErrors("Please upload an image");
    }
  };

  const clearImage = async (e: any) => {
    e.preventDefault(); // Prevent default file input click
    e.stopPropagation(); // Stop the event from propagating to lower elements

    if (imageId) {
      setIsLoading(true);
      try {
        const response = await axios.post(
          "http://localhost:8000/api/image/deleteImage",
          { id: imageId },
        );
        console.log(response.data);
        setFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error deleting image:", error);
      } finally {
        setIsLoading(false); // Stop loading regardless of outcome
      }
    } else {
      console.log("No image ID found");
    }
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    // console.log("category", category);
    // console.log("title", title);
    // console.log("blogImageUrl", imageUrl);
    // console.log("blogImageId", imageId);
    // console.log("description", description);

    if (!category || !title || !imageUrl || !imageId || !description) {
      setErrors("Please fill in all fields");
      return;
    }
    const blogData = {
      category,
      title,
      blogImageUrl: imageUrl,
      blogImageId: imageId,
      description,
      adminId: "663080c4341f818233e4ce87",
    };

    try {
      setloading(true);
      //@ts-ignore
      const result = await dispatch(createBlog(blogData));
      console.log("🚀 ~ handleSubmit ~ result:", result); //@ts-ignore
      if (result?.payload?.newBlog) {
        toast.success("Blog created successfully");
        // Reset form fields
        setCategory("");
        setTitle("");
        setImageUrl("");
        setImageId("");
        setFile(null);
        setPreviewUrl(null);
        setDescription("");
      }
    } catch (error) {
      console.error(error);
      alert("An error occurred while creating the blog");
    }
  };

  return (
    <>
      <div className="container mx-auto p-4">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex items-center justify-center">
            <label
              className="hover:bg-gray-100 hover:border-gray-300 relative flex h-96 w-full cursor-pointer flex-col justify-center border-2 border-dashed"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
            >
              {isLoading ? (
                <div className="flex h-full flex-col items-center justify-center">
                  <div className="loader"></div> {/* Loading spinner */}
                  <p className="text-gray-500 text-sm">Uploading...</p>
                </div>
              ) : previewUrl ? (
                <>
                  <img
                    src={previewUrl}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                  <button
                    onClick={clearImage}
                    className="absolute right-0 top-0 p-2"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="text-red-600 h-6 w-6"
                      fill="red"
                      viewBox="0 0 24 24"
                      stroke="red"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center pt-5">
                  <p className="text-gray-400 ps-3 pt-1 text-sm tracking-wider">
                    Drag your photo here or{" "}
                    <span className="text-lg text-primary">
                      click to select
                    </span>
                  </p>
                </div>
              )}
              <input
                type="file"
                onChange={handleFileChange}
                className="hidden"
              />
            </label>
          </div>
          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border-gray-300 mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
            >
              <option value="">Select Category</option>
              <option value="Technology">Technology</option>
              <option value="Health">Health</option>
              <option value="Lifestyle">Lifestyle</option>
              <option value="Travel">Travel</option>
              <option value="Food">Food</option>
            </select>
          </div>
          <div>
            <label className="text-gray-700 block text-sm font-medium">
              Description
            </label>
            <ReactQuill
              value={description}
              onChange={setDescription}
              className="mb-15 mt-1 h-40"
              theme="snow"
            />
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-[#12a19b] px-4 py-2 font-semibold text-white shadow hover:opacity-75 focus:outline-none focus:ring-2 "
          >
            Create Blog
          </button>
        </form>
      </div>
    </>
  );
};

export default CreateBlog;
