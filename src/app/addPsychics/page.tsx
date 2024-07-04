"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import MultiSelect from "@/components/MultiSelect";
import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addPsychics } from "../../store/slices/psychicsSlice";
import { toast } from "react-toastify";
import MultiSelectForTopics from "@/components/MultiSelectForTopics";
import MultiSelectForTools from "@/components/MultiSelectForTools";
import MultiSelectForAbilities from "@/components/MultiSelectForAbilities";
import { auth } from "@/lib/firebase"; // Add your Firebase configuration file here
import { createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Add your Firestore configuration file here
import "react-dates/initialize";
import "react-dates/lib/css/_datepicker.css";
import { DateRangePicker, FocusedInputShape } from "react-dates";
import moment, { Moment } from "moment";
import { useRouter } from "next/navigation";
import ReactModal from "react-modal";

interface BankDetails {
  accountHolderName: string;
  bankName: string;
  bankAddress: string;
  accountNumber: string;
  iban: string;
  swiftCode: string;
}

interface DoctorInfo {
  name: string;
  email: string;
  phone: string;
  experience: string;
  statusMessage: string;
  profileDescription: string;
  password: string;
  zodiac: string;
  price: string;
  shortDescription: string;
  languages: string[];
  joiningDate: string;
  description: string;
  topic: string[];
  tools: string[];
  abilities: string[];
  availability: {
    startDate: Moment | null;
    endDate: Moment | null;
  };
  bankDetails?: BankDetails; // Add this line
}

const Page: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [submitLoading, setSumbitLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [errors, setErrors] = useState("");
  const [focusedInput, setFocusedInput] = useState<null>(null);
  const [dateRange, setDateRange] = useState<{
    startDate: Moment | null;
    endDate: Moment | null;
  }>({ startDate: null, endDate: null });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bankDetails, setBankDetails] = useState({
    accountHolderName: "",
    bankName: "",
    bankAddress: "",
    accountNumber: "",
    iban: "",
    swiftCode: "",
  });

  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo>({
    name: "",
    email: "",
    profileDescription: "",
    statusMessage: "",
    phone: "",
    password: "",
    zodiac: "",
    price: "",
    experience: "",
    shortDescription: "",
    languages: [],
    joiningDate: "",
    description: "",
    topic: [],
    tools: [],
    abilities: [],
    availability: {
      startDate: null,
      endDate: null,
    },
  });

  const initialValues: DoctorInfo = {
    name: "",
    email: "",
    phone: "",
    password: "",
    statusMessage: "",
    experience: "",
    profileDescription: "",
    zodiac: "",
    price: "",
    shortDescription: "",
    languages: [],
    joiningDate: "",
    description: "",
    topic: [],
    tools: [],
    abilities: [],
    availability: {
      startDate: null,
      endDate: null,
    },
  };

  const URL = process.env.NEXT_PUBLIC_BACKEND_URL || "";

  const todayDate = moment().format("YYYY-MM-DD");

  const initialDoctorInfo: DoctorInfo = {
    ...initialValues,
    languages: [],
    topic: [],
    tools: [],
    abilities: [],
    bankDetails: {
      accountHolderName: "",
      bankName: "",
      bankAddress: "",
      accountNumber: "",
      iban: "",
      swiftCode: "",
    },
  };

  const handleBankDetailsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBankDetails((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleBankDetailsSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Bank Details Submitted:", bankDetails);
    // Update the doctorInfo state with bank details
    setDoctorInfo((prevState) => ({
      ...prevState,
      bankDetails: bankDetails,
    }));
    setIsModalOpen(false);
  };

  const validatePassword = (password: string) => {
    const errors: { [key: string]: string } = {};
    if (password.length < 8) {
      errors.password = "Password must be at least 8 characters long.";
    }
    if (!password.match(/[A-Z]/)) {
      errors.password = "Password must contain at least one uppercase letter.";
    }
    if (!password.match(/[0-9]/)) {
      errors.password = "Password must contain at least one number.";
    }
    if (!password.match(/[^a-zA-Z0-9]/)) {
      errors.password = "Password must contain at least one special character.";
    }
    return errors;
  };

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value } = e.target;
    setDoctorInfo((prevState) => ({
      ...prevState,
      [name]: value,
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
      console.log("Dropped File:", files[0]);
      uploadFileToCloudinary(files[0]);
    } else {
      setErrors("Please upload an image");
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

    if (imageId) {
      setIsLoading(true);
      try {
        const response = await axios.post(`${URL}/api/image/deleteImage`, {
          id: imageId,
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

  const handleDateRangeChange = ({
    startDate,
    endDate,
  }: {
    startDate: Moment | null;
    endDate: Moment | null;
  }) => {
    setDateRange({ startDate, endDate });
    setDoctorInfo((prevState: any) => ({
      ...prevState,
      availability: {
        startDate: startDate ? startDate.format("YYYY-MM-DD") : null,
        endDate: endDate ? endDate.format("YYYY-MM-DD") : null,
      },
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!imageUrl) {
      toast.error("please upload image");
      return;
    }

    const passwordErrors = validatePassword(doctorInfo.password);
    if (Object.keys(passwordErrors).length > 0) {
      setErrors(passwordErrors.password);
      toast.error(passwordErrors.password);
      return;
    }

    const data = {
      name: doctorInfo.name,
      email: doctorInfo.email,
      experience: doctorInfo.experience,
      password: doctorInfo.password,
      zodiac: doctorInfo.zodiac,
      price: doctorInfo.price,
      profileDescription: doctorInfo.profileDescription,
      statusMessage: doctorInfo.statusMessage,
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
      shortDescription: doctorInfo.shortDescription,
      availability: doctorInfo.availability,
      bankDetails: doctorInfo.bankDetails,
    };
    console.log(data);
    setSumbitLoading(true);
    try {
      // const userCredential = await createUserWithEmailAndPassword(
      //   auth,
      //   doctorInfo.email,
      //   doctorInfo.password,
      // );
      // const user = userCredential.user;
      // await addDoc(collection(db, "psychics"), {
      //   uid: user.uid,
      //   name: doctorInfo.name,
      //   email: doctorInfo.email,
      //   zodiac: doctorInfo.zodiac,
      //   price: doctorInfo.price,
      //   languages: doctorInfo.languages,
      //   joiningDate: doctorInfo.joiningDate,
      //   description: doctorInfo.description,
      //   phoneNo: doctorInfo.phone,
      //   status: false,
      //   chat: false,
      //   userType: "admin",
      //   profileUrl: imageUrl,
      //   profilePicId: imageId,
      //   topic: doctorInfo.topic,
      //   tools: doctorInfo.tools,
      //   abilities: doctorInfo.abilities,
      //   shortDescription: doctorInfo.shortDescription,
      //   availability: doctorInfo.availability,
      // });
      //@ts-ignore
      const response = await dispatch(addPsychics(data));

      console.log("🚀 ~ handleSubmit ~ response:", response);
      console.log("🚀 ~ handleSubmit ~ response:", response);
      //@ts-ignore
      if (response?.payload && response?.payload.success) {
        setDoctorInfo(initialDoctorInfo);
        setFile(null);
        setPreviewUrl(null);
        setImageUrl("");
        setImageId("");
        toast.success("Record created successfully");
        router.push("/psychics-table");
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

        <div className="mb-4">
          <label className="text-gray-700 mb-2 block text-sm font-bold">
            Availability Date
          </label>
          <DateRangePicker
            startDate={dateRange.startDate}
            startDateId="start_date_id"
            endDate={dateRange.endDate}
            endDateId="end_date_id"
            onDatesChange={handleDateRangeChange}
            focusedInput={focusedInput} //@ts-ignore
            onFocusChange={(focusedInput) => setFocusedInput(focusedInput)}
            numberOfMonths={1}
            displayFormat="YYYY-MM-DD"
            isOutsideRange={() => false}
            minimumNights={0}
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="focus:shadow-outline rounded bg-[#12a19b] px-4 py-2 font-bold text-white hover:opacity-70 focus:outline-none"
          >
            Add Bank Details
          </button>
          <button
            type="submit"
            disabled={submitLoading}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            {submitLoading ? "Loading..." : "Register Psychic"}
          </button>
        </div>
      </form>

      <ReactModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Add Bank Details"
        className="fixed inset-0 z-50 flex items-center justify-center outline-none focus:outline-none"
        overlayClassName="fixed inset-0 bg-gray-600 bg-opacity-75 backdrop-blur-sm"
      >
        <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
          <h2 className="mb-4 text-2xl">Add Bank Details</h2>
          <form onSubmit={handleBankDetailsSubmit}>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold">
                Name of Account
              </label>
              <input
                type="text"
                name="accountHolderName"
                value={bankDetails.accountHolderName}
                onChange={handleBankDetailsChange}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold">Bank Name</label>
              <input
                type="text"
                name="bankName"
                value={bankDetails.bankName}
                onChange={handleBankDetailsChange}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold">
                Bank Address
              </label>
              <input
                type="text"
                name="bankAddress"
                value={bankDetails.bankAddress}
                onChange={handleBankDetailsChange}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold">
                Account Number
              </label>
              <input
                type="text"
                name="accountNumber"
                value={bankDetails.accountNumber}
                onChange={handleBankDetailsChange}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold">
                IBAN / ABA / Firewire / BSB
              </label>
              <input
                type="text"
                name="iban"
                value={bankDetails.iban}
                onChange={handleBankDetailsChange}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                required
              />
            </div>
            <div className="mb-4">
              <label className="mb-2 block text-sm font-bold">SWIFT CODE</label>
              <input
                type="text"
                name="swiftCode"
                value={bankDetails.swiftCode}
                onChange={handleBankDetailsChange}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                required
              />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="focus:shadow-outline bg-gray-500 hover:bg-gray-700 mr-2 rounded px-4 py-2 font-bold text-black focus:outline-none"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
              >
                Save
              </button>
            </div>
          </form>
        </div>
      </ReactModal>
    </DefaultLayout>
  );
};

export default Page;
