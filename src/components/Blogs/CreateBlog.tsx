"use client";
import React, { useState, useEffect } from "react";
import { TextField, Chip, Box } from "@mui/material";
import dynamic from "next/dynamic";
import axios from "axios";
import Image from "next/image";

// Dynamically import ReactQuill to avoid SSR issues
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

interface BlogProps {
  initialValues: any;
  onSubmit: (data: any) => void;
}

const CreateBlog = ({ initialValues, onSubmit }: BlogProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [doctorName, setDoctorName] = useState(initialValues?.doctorName || "");
  const [imageUrl, setImageUrl] = useState(initialValues?.blogImageUrl || "");
  const [imageId, setImageId] = useState(initialValues?.blogImageId || "");
  const [tags, setTags] = useState<string[]>(initialValues?.tags || []); // Initialize with initialValues.tags
  const [inputValue, setInputValue] = useState("");
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );

  useEffect(() => {
    if (initialValues?.blogImageUrl) {
      setPreviewUrl(initialValues.blogImageUrl);
    }

    // Prepopulate tags when editing a blog
    if (initialValues?.tags) {
      setTags(initialValues.tags);
    }
  }, [initialValues]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      updatePreview(files[0]);
      uploadFileToCloudinary(files[0]);
    }
  };

  const updatePreview = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const uploadFileToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      );
      setImageUrl(response.data.data.secure_url);
      setImageId(response.data.data.public_id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const clearImage = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageId) {
      setIsLoading(true);
      try {
        await axios.post(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/deleteImage`,
          { id: imageId },
        );
        setFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error deleting image:", error);
      } finally {
        setIsLoading(false);
      }
    } else {
      console.log("No image ID found");
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      if (!tags.includes(inputValue.trim())) {
        setTags((prevTags) => [...prevTags, inputValue.trim()]);
      }
      setInputValue("");
      event.preventDefault();
    }
  };

  const handleDelete = (tagToDelete: string) => {
    setTags((prevTags) => prevTags.filter((tag) => tag !== tagToDelete));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const blogData = {
      title,
      doctorName,
      blogImageUrl: imageUrl,
      blogImageId: imageId,
      description,
      tags, // Include the updated tags array
    };

    try {
      setIsLoading(true);
      await onSubmit(blogData);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container mx-auto overflow-hidden rounded-xl p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Image upload */}
        <div className="flex items-center justify-center">
          <label
            className="hover:bg-gray-100 hover:border-gray-300 relative flex h-70 w-full cursor-pointer flex-col justify-center rounded-xl border-2 border-dashed"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = e.dataTransfer.files;
              if (files && files.length > 0) {
                setFile(files[0]);
              }
            }}
          >
            {isLoading ? (
              <div className="flex h-full flex-col items-center justify-center">
                <div className="loader"></div>
                <p className="text-gray-500 text-sm">Uploading...</p>
              </div>
            ) : previewUrl ? (
              <>
                <Image
                  src={previewUrl}
                  alt="Preview"
                  height={2000}
                  width={2000}
                  className="h-full w-full object-cover"
                />
                <button
                  onClick={clearImage}
                  className="text-red-500 absolute right-0 top-0 mt-2 rounded bg-red px-4 py-2 text-white"
                >
                  Remove
                </button>
              </>
            ) : (
              <p className="text-center text-blue-600">
                click to select image
              </p>
            )}
            <input type="file" onChange={handleFileChange} className="hidden" />
          </label>
        </div>

        {/* Blog Title */}
        <TextField
          label="Blog Title"
          sx={{
            mt: 1,
            borderRadius: "10px",
          }}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          fullWidth
          placeholder="Blog Title"
        />

        {/* Doctor's Name */}
        <TextField
          label="Doctor's Name"
          sx={{
            mt: 1,
            borderRadius: "10px",
          }}
          value={doctorName}
          onChange={(e) => setDoctorName(e.target.value)}
          fullWidth
          placeholder="Doctor's Name"
        />

        {/* Tags */}
        <TextField
          label="Add Tags"
          sx={{
            mt: 1,
            borderRadius: "10px",
          }}
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          variant="outlined"
          fullWidth
          placeholder="Press Enter to add tags"
        />
        <Box sx={{ mt: 2 }}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleDelete(tag)}
              sx={{ mr: 1, mb: 1 }}
            />
          ))}
        </Box>

        {/* Description */}
        <label className="block text-sm font-medium text-black">
          Description
        </label>
        <ReactQuill
          value={description}
          onChange={setDescription}
          className="mb-15 mt-1 h-50 overflow-y-scroll"
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="mt-9 w-full rounded-md bg-[#3caad8] px-4 py-2 font-semibold text-white shadow"
        >
          {initialValues ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
