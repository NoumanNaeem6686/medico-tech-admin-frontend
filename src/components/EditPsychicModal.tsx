"use client";
import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import MultiSelectForTopics from "@/components/MultiSelectForTopics";
import MultiSelectForTools from "@/components/MultiSelectForTools";
import MultiSelectForAbilities from "@/components/MultiSelectForAbilities";
import MultiSelect from "@/components/MultiSelect";
import { Psychic } from "@/types/psychic"; // Ensure this import matches your actual types

interface EditPsychicModalProps {
  psychic: Psychic;
  onClose: () => void;
  onUpdate: (psychic: Psychic) => void;
}
const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

const EditPsychicModal: React.FC<EditPsychicModalProps> = ({
  psychic,
  onClose,
  onUpdate,
}) => {
  const [doctorInfo, setDoctorInfo] = useState<Psychic>(psychic);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    psychic.profileUrl,
  );
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState(psychic.profileUrl);
  const [imageId, setImageId] = useState("");

  useEffect(() => {
    setDoctorInfo(psychic);
    setPreviewUrl(psychic.profileUrl);
    setImageUrl(psychic.profileUrl);
  }, [psychic]);

  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setDoctorInfo((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleLanguagesChange = (selectedLanguages: string[]) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      languages: selectedLanguages,
    }));
  };

  const handleTopicChange = (selectedTopic: string[]) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      topic: selectedTopic,
    }));
  };

  const handleToolChange = (selectedTool: string[]) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      tools: selectedTool,
    }));
  };

  const handleAbilitiesChange = (selectedAbilities: string[]) => {
    setDoctorInfo((prevState) => ({
      ...prevState,
      abilities: selectedAbilities,
    }));
  };

  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  const uploadFileToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsLoading(true);
    try {
      const response = await axios.post(`${URL}/api/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response.data.data);
      setImageUrl(response.data.data.secure_url);
      setImageId(response.data.data.public_id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      setFile(files[0]);
      updatePreview(files[0]);
      uploadFileToCloudinary(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
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

  const clearImage = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();

    if (doctorInfo.profilePicId) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${URL}/api/image/deleteImage`, {
          id: doctorInfo.profilePicId,
        });
        console.log(response.data);
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onUpdate({ ...doctorInfo, profileUrl: imageUrl });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="dark:bg-gray-800 relative h-[88vh] w-full max-w-2xl overflow-y-auto rounded-lg bg-white p-8 shadow-lg">
        <button
          onClick={onClose}
          className="text-gray-600 hover:text-gray-900 absolute right-4 top-4 text-2xl"
        >
          &times;
        </button>
        <h2 className="mb-4 text-2xl font-bold">Edit Psychic</h2>
        <form onSubmit={handleSubmit}>
          <div className="container mx-auto p-4">
            <h1 className="mb-4 text-xl font-bold">Upload Image</h1>
            <div className="flex w-48 items-center justify-center">
              <label
                className="hover:border-gray-300 hover:bg-gray-100 relative flex h-48 w-full cursor-pointer flex-col items-center justify-center border-2 border-dashed"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
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
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
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
                    <p className="text-gray-400 pt-1 text-sm tracking-wider">
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
              Psychic Name
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
              Profile Description
            </label>
            <input
              type="text"
              name="profileDescription"
              value={doctorInfo.profileDescription}
              onChange={handleInputChange}
              className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 mb-2 block text-sm font-bold">
              Status Message
            </label>
            <input
              type="text"
              name="statusMessage"
              value={doctorInfo.statusMessage}
              onChange={handleInputChange}
              className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 mb-2 block text-sm font-bold">
              Experience
            </label>
            <input
              type="text"
              name="experience"
              value={doctorInfo.experience}
              onChange={handleInputChange}
              className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 mb-2 block text-sm font-bold">
              Psychic Email
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
              Phone
            </label>
            <input
              type="tel"
              name="phoneNo"
              value={doctorInfo.phoneNo}
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
            <MultiSelectForTopics
              onChange={handleTopicChange}
              selectedValues={doctorInfo.topic}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 mb-2 block text-sm font-bold">
              Tools
            </label>
            <MultiSelectForTools
              onChange={handleToolChange}
              selectedValues={doctorInfo.tools}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 mb-2 block text-sm font-bold">
              Abilities
            </label>
            <MultiSelectForAbilities
              onChange={handleAbilitiesChange}
              selectedValues={doctorInfo.abilities}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 mb-2 block text-sm font-bold">
              Languages
            </label>
            <MultiSelect
              onChange={handleLanguagesChange}
              selectedValues={doctorInfo.languages}
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 mb-2 block text-sm font-bold">
              Zodiac Sign
            </label>
            <select
              name="zodiac"
              value={doctorInfo.zodiacSign}
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
              Date of Joining
            </label>
            <input
              type="date"
              name="joiningDate"
              value={doctorInfo.joiningDate || ""}
              onChange={handleInputChange}
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
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 mr-4 rounded px-4 py-2 text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded bg-blue-500 px-4 py-2 text-white"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditPsychicModal;
