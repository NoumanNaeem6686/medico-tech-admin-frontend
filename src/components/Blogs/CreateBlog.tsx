"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const CreateBlog = ({ initialValues, onSubmit }: any) => {
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState(initialValues?.title || "");
  const [category, setCategory] = useState(initialValues?.category || "");
  const [imageUrl, setImageUrl] = useState(initialValues?.blogImageUrl || "");
  const [imageId, setImageId] = useState(initialValues?.blogImageId || "");
  const [errors, setErrors] = useState("");
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState(
    initialValues?.description || "",
  );
  const [psychicId, setPsychicId] = useState(initialValues?.psychicId || ""); // New state for psychic selection
  const [psychicName, setPsychicName] = useState(""); //@ts-ignore
  const psychics = useSelector((state) => state.blog.psychics);

  useEffect(() => {
    if (initialValues?.blogImageUrl) {
      setPreviewUrl(initialValues.blogImageUrl);
    }
  }, [initialValues]);

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      updatePreview(files[0]);
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

  const clearImage = async (e: any) => {
    e.preventDefault();
    e.stopPropagation();

    if (imageId) {
      setIsLoading(true);
      try {
        const response = await axios.post(
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

  const handlePsychicChange = (e: any) => {
    const selectedPsychic = psychics.find(
      (psychic: any) => psychic.id === e.target.value,
    );
    setPsychicId(selectedPsychic.id);
    setPsychicName(selectedPsychic.name);
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (
      !category ||
      !title ||
      !imageUrl ||
      !imageId ||
      !description ||
      !psychicId
    ) {
      setErrors("Please fill in all fields");
      return;
    }
    const blogData = {
      category,
      title,
      blogImageUrl: imageUrl,
      blogImageId: imageId,
      description,
      psychicId, // Include psychicId in the blog data
      psychicName, // Include psychicName in the blog data
      adminId: "663080c4341f818233e4ce87",
    };

    console.log("blogData", blogData);

    try {
      setLoading(true);
      await onSubmit(blogData);
      setLoading(false);
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while submitting the blog");
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex items-center justify-center">
          <label
            className="hover:bg-gray-100 hover:border-gray-300 relative flex h-96 w-full cursor-pointer flex-col justify-center border-2 border-dashed"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => {
              e.preventDefault();
              const files = e.dataTransfer.files;
              if (files && files.length > 0) {
                //@ts-ignore
                setFile(files[0]);
                updatePreview(files[0]);
                uploadFileToCloudinary(files[0]);
              } else {
                setErrors("Please upload an image");
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
                  <span className="text-lg text-primary">click to select</span>
                </p>
              </div>
            )}
            <input type="file" onChange={handleFileChange} className="hidden" />
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
            <option value="Love & Relationships">Love & Relationships</option>
            <option value="Zodiac Sign Compatibility">
              Zodiac Sign Compatibility
            </option>
            <option value="Astrology & Numerology">
              Astrology & Numerology
            </option>
            <option value="Animal Sightings & Symbolism">
              Animal Sightings & Symbolism
            </option>
            <option value="Mind, Body & Spirit">Mind, Body & Spirit</option>
            <option value="Destiny & Life Path">Destiny & Life Path</option>
            <option value="Dreams & Interpretation">
              Dreams & Interpretation
            </option>
            <option value="Career & Money">Career & Money</option>
            <option value="Psychic Tools & Abilities">
              Psychic Tools & Abilities
            </option>
            <option value="Psychic Questions">Psychic Questions</option>
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
        <div>
          <label className="text-gray-700 block text-sm font-medium">
            Psychic
          </label>
          <select
            value={psychicId}
            onChange={handlePsychicChange}
            className="border-gray-300 mt-1 block w-full rounded-md border p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="">Select Psychic</option>
            {psychics?.map((psychic: any) => (
              <option key={psychic.id} value={psychic.id}>
                {psychic.name}
              </option>
            ))}
          </select>
        </div>
        <button
          type="submit"
          className="w-full rounded-md bg-[#12a19b] px-4 py-2 font-semibold text-white shadow hover:opacity-75 focus:outline-none focus:ring-2 "
        >
          {initialValues ? "Update Blog" : "Create Blog"}
        </button>
      </form>
    </div>
  );
};

export default CreateBlog;
