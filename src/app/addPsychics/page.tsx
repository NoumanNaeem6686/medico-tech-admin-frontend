"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultiSelect from "@/components/MultiSelect";
import axios from "axios";
import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { addPsychics } from "../../store/slices/psychicsSlice";
import { toast } from "react-toastify";
import MultiSelectForTopics from "@/components/MultiSelectForTopics";
import MultiSelectForTools from "@/components/MultiSelectForTools";
import MultiSelectForAbilities from "@/components/MultiSelectForAbilities";

const Page = () => {
  const dispatch = useDispatch();
  const [file, setFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSumbitLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [errors, setErrors] = useState("");
  const [doctorInfo, setDoctorInfo] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    zodiac: "",
    price: "",
    shortDescription:"",
    languages: [],
    joiningDate: "",
    description: "",
    topic: [],
    tools: [],
    abilities: [],
  });
  const initialValues = {
    name: "",
    email: "",
    password: "",
    phone: "",
    price: "",
    shortDescription:"",
    zodiac: "",
    joiningDate: "",
    description: "",
    languages: [],
    topic: [],
    tools: [],
    abilities: [],
  };

  const todayDate = new Date().toISOString().split("T")[0];

  const initialDoctorInfo = {
    ...initialValues,
    languages: [],
    topic: [],
    tools: [],
    abilities: [],
  };

  const validatePassword = (password: any) => {
    const errors = {};
    if (password.length < 8) {
      //@ts-ignore
      errors.password = "Password must be at least 8 characters long.";
    }
    if (!password.match(/[A-Z]/)) {
      //@ts-ignore
      errors.password = "Password must contain at least one uppercase letter.";
    }
    if (!password.match(/[0-9]/)) {
      //@ts-ignore
      errors.password = "Password must contain at least one number.";
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      //@ts-ignore
      errors.password = "Password must contain at least one special character.";
    }
    return errors;
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setDoctorInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
  };

  const uplaodFileToCloudinary = async (file: any) => {
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

      // Set the image URL in state from the response
      // setDoctorInfo(prevState => ({
      //   ...prevState,
      //   profilePicUrl: response.data.url
      // }));
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: any) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      updatePreview(files[0]);
      console.log("Dropped File:", files[0]);
      uplaodFileToCloudinary(files[0]);
    } else {
      setErrors("Please upload an image");
    }
  };

  const handleFileChange = (e: any) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      updatePreview(files[0]);
      console.log("Selected File:", files[0]);
      uplaodFileToCloudinary(files[0]);
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
        // Optionally reset or clear the image ID in your state
        // setDoctorInfo(prevState => ({ ...prevState, profilePicId: '' }));
      } catch (error) {
        console.error("Error deleting image:", error);
      } finally {
        setIsLoading(false); // Stop loading regardless of outcome
      }
    } else {
      console.log("No image ID found");
    }
  };

  const handleLanguagesChange = (selectedLanguages: any) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      languages: selectedLanguages,
    }));
  };
  const handleTopicChange = (selectedTopic: any) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      topic: selectedTopic,
    }));
  };
  const handleToolChange = (selectedTool: any) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      tools: selectedTool,
    }));
  };
  const handleAbilitiesChange = (selectedabilities: any) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      abilities: selectedabilities,
    }));
  };
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("please upload image");
      return;
    }

    const passwordErrors = validatePassword(doctorInfo.password);
    if (Object.keys(passwordErrors).length > 0) {
      //@ts-ignore
      setErrors(passwordErrors.password); //@ts-ignore
      toast.error(passwordErrors.password);
      return;
    }
    const data = {
      name: doctorInfo.name,
      email: doctorInfo.email,
      password: doctorInfo.password,
      zodiac: doctorInfo.zodiac,
      price: doctorInfo.price,
      languages: doctorInfo.languages,
      joiningDate: doctorInfo.joiningDate,
      description: doctorInfo.description,
      phoneNo: doctorInfo.phone,
      status: false,
      chat: false,
      userType: "admin",
      profileUrl: imageUrl,
      profilePicId: imageId,
      topic: doctorInfo.topic,
      tools: doctorInfo.tools,
      abilities: doctorInfo.abilities,
      shortDescription : doctorInfo.shortDescription
    };
    console.log(data);
    setSumbitLoading(true);
    try {
      //@ts-ignore
      const response = await dispatch(addPsychics(data));
      console.log("🚀 ~ handleSubmit ~ response:", response);
      //@ts-ignore
      if (response?.payload && response?.payload.success) {
        setDoctorInfo(initialDoctorInfo);
        setFile(null);
        setPreviewUrl(null);
        setImageUrl("");
        setImageId("");
        toast.success("Record created successfully");
        //@ts-ignore
      } else {
        //@ts-ignore
        toast.error(response?.payload);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Failed to create record.");
    } finally {
      setSumbitLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto p-4">
          <h1 className="mb-4 text-xl font-bold">Upload Image</h1>
          <div className="flex w-48 items-center justify-center">
            <label
              className="hover:bg-gray-100 hover:border-gray-300 relative flex h-48 w-full cursor-pointer flex-col border-2 border-dashed"
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
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Psysics Name
          </label>
          <input
            type="text"
            name="name"
            value={doctorInfo.name}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Short Description
          </label>
          <input
            type="text"
            name="shortDescription"
            value={doctorInfo.shortDescription}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Psysics Email
          </label>
          <input
            type="email"
            name="email"
            value={doctorInfo.email}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={doctorInfo.password}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Psysics Phone #
          </label>
          <input
            type="tel"
            name="phone"
            value={doctorInfo.phone}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Price
          </label>
          <input
            type="text"
            name="price"
            value={doctorInfo.price}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Topics
          </label>
          <MultiSelectForTopics onChange={handleTopicChange} />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Tools
          </label>
          <MultiSelectForTools onChange={handleToolChange} />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Abilities
          </label>
          <MultiSelectForAbilities onChange={handleAbilitiesChange} />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Select Language
          </label>
          <MultiSelect onChange={handleLanguagesChange} />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Zodiac Sign
          </label>
          <select
            name="zodiac"
            value={doctorInfo.zodiac}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          >
            <option value="">Select Zodiac Sign</option>
            {[
              "Aries",
              "Taurus",
              "Gemini",
              "Cancer",
              "Leo",
              "Virgo",
              "Libra",
              "Scorpio",
              "Sagittarius",
              "Capricorn",
              "Aquarius",
              "Pisces",
            ].map((zodiac) => (
              <option key={zodiac} value={zodiac}>
                {zodiac}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Date of joining
          </label>
          <input
            type="date"
            name="joiningDate"
            value={doctorInfo.joiningDate || ""}
            onChange={handleInputChange}
            min={todayDate}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            required
          />
        </div>
        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Description
          </label>
          <textarea
            name="description"
            value={doctorInfo.description || ""}
            onChange={handleInputChange}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            placeholder="Enter a brief description..."
            required
          ></textarea>
        </div>

        <button
          type="submit"
          disabled={submitLoading}
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          {submitLoading ? "Loading..." : "Register Psychic"}
        </button>
      </form>
    </DefaultLayout>
  );
};

export default Page;
