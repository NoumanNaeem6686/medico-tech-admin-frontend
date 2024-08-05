"use client";
import DefaultLayout from "@/components/Layouts/DefaultLayout";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import Loader from "@/components/Loader";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useSelector } from "react-redux";

const Page = ({ params }: any) => {
  const URL = process.env.NEXT_PUBLIC_BACKEND_URL;
  const { id } = params;
  console.log("🚀 ~ Page ~ id:", id);
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  console.log("🚀 ~ Page ~ name:", name);
  // const [data, setData] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [filteredReviews, setFilteredReviews] = useState([]);
  // const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [selectedNote, setSelectedNote] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("");
  const [messages, setMessages] = useState([]);
  const { customerHistory, loading } = useSelector(
    (state: any) => state.customerHistory,
  );
  const data = customerHistory.filter((item: any) => item.psychic.id == id);
  console.log("🚀 ~ Page ~ data:", data)
  // useEffect(() => {
  //   if (id) {
  //     fetchData(id);
  //     fetchAllReviews();
  //   }
  // }, [id]);

  // const fetchData = async (psychicId: string) => {
  //   try {
  //     const response = await axios.get(
  //       `${URL}/api/customer/customer-detail-by-id/${psychicId}`,
  //     );
  //     console.log("response", response.data);
  //     setData(response.data);
  //     setLoading(false);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     setLoading(false);
  //   }
  // };

  // const fetchAllReviews = async () => {
  //   try {
  //     const response = await axios.get(`${URL}/api/user/all-review`);
  //     setReviews(response.data.reviews);
  //     console.log("🚀 ~ fetchAllReviews ~ response:", response);
  //   } catch (error) {
  //     console.error("Error fetching reviews:", error);
  //   }
  // };

  const openReviewModal = (note: string, psychicId: string, userId: string) => {
    console.log("🚀 ~ openReviewModal ~ note:", note);
    setSelectedNote(note);
    setSelectedUserId(userId);
    const filtered = reviews.filter(
      (review: any) =>
        review.psychicId === psychicId && review.userId === userId,
    );
    console.log("🚀 ~ openReviewModal ~ filtered:", filtered);
    setFilteredReviews(filtered);
    setIsModalOpen(true);
  };

  const openChatModal = (psychicId: string, userId: string) => {
    console.log("psychicId", psychicId);
    console.log("userId", userId);
    setSelectedUserId(userId);
    fetchChatMessages(psychicId, userId);
    setIsChatModalOpen(true);
  };

  const closeReviewModal = () => {
    setIsModalOpen(false);
    setSelectedNote("");
    setSelectedUserId("");
    setFilteredReviews([]);
  };

  const closeChatModal = () => {
    setIsChatModalOpen(false);
    setSelectedUserId("");
    setMessages([]);
  };

  const fetchChatMessages = async (psychicId: string, userId: string) => {
    const combinedId = `${userId}_${psychicId}`;
    try {
      const docRef = doc(db, "chats", combinedId);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setMessages(docSnap.data().messages || []);
      } else {
        console.log("No such document!");
        setMessages([]);
      }
    } catch (error) {
      console.error("Error fetching chat messages:", error);
    }
  };

  const renderStars = (rating: number) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    const emptyStars = 5 - fullStars - (halfStars ? 1 : 0);

    return (
      <div className="flex">
        {Array(fullStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={`full-star-${index}`}
              className="h-5 w-5 text-yellow-500"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.316 2.154 10.684 2.154 10.951 2.927L12.27 6.363C12.362 6.622 12.615 6.822 12.888 6.883L16.614 7.709C17.453 7.898 17.765 8.92 17.174 9.504L14.409 12.258C14.207 12.455 14.116 12.745 14.172 13.024L15.018 16.765C15.178 17.578 14.302 18.202 13.59 17.841L10.163 16.065C9.907 15.934 9.593 15.934 9.337 16.065L5.91 17.841C5.198 18.202 4.322 17.578 4.482 16.765L5.328 13.024C5.384 12.745 5.293 12.455 5.091 12.258L2.326 9.504C1.735 8.92 2.047 7.898 2.886 7.709L6.612 6.883C6.885 6.822 7.138 6.622 7.23 6.363L8.549 2.927z" />
            </svg>
          ))}
        {halfStars && (
          <svg
            className="h-5 w-5 text-yellow-500"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M10 15l-5.878 3.09L5.07 10.92.5 6.32 6.243 5.06 10 0l3.757 5.06L19.5 6.32l-4.57 4.6L15.878 18.09zM10 12.82V2.184l1.55 3.125.792.312 3.408.49-2.463 2.404-.428.422.108.64.618 3.605-3.244-1.657-.62-.317-.621.317L6.235 18l.618-3.605.108-.64-.428-.422L4.07 6.123l3.408-.49.792-.312L10 2.184V12.82z" />
          </svg>
        )}
        {Array(emptyStars)
          .fill(0)
          .map((_, index) => (
            <svg
              key={`empty-star-${index}`}
              className="text-gray-300 h-5 w-5"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path d="M9.049 2.927C9.316 2.154 10.684 2.154 10.951 2.927L12.27 6.363C12.362 6.622 12.615 6.822 12.888 6.883L16.614 7.709C17.453 7.898 17.765 8.92 17.174 9.504L14.409 12.258C14.207 12.455 14.116 12.745 14.172 13.024L15.018 16.765C15.178 17.578 14.302 18.202 13.59 17.841L10.163 16.065C9.907 15.934 9.593 15.934 9.337 16.065L5.91 17.841C5.198 18.202 4.322 17.578 4.482 16.765L5.328 13.024C5.384 12.745 5.293 12.455 5.091 12.258L2.326 9.504C1.735 8.92 2.047 7.898 2.886 7.709L6.612 6.883C6.885 6.822 7.138 6.622 7.23 6.363L8.549 2.927z" />
            </svg>
          ))}
      </div>
    );
  };

  if (loading) {
    return (
      <DefaultLayout>
        <Loader />;
      </DefaultLayout>
    );
  }

  if (!data) {
    return (
      <DefaultLayout>
        <div>No data found</div>
      </DefaultLayout>
    );
  }

  return (
    <DefaultLayout>
      <div className="container mx-auto p-4">
        <h1 className="mb-4 text-2xl font-bold">{name} Details</h1>
        <table className="min-w-full border bg-white">
          <thead>
            <tr>
              <th className="border-b px-4 py-2">User Name</th>
              <th className="border-b px-4 py-2">Selected Time</th>
              <th className="border-b px-4 py-2">Total Amount</th>
              <th className="border-b px-4 py-2">Last Readings</th>
              <th className="border-b px-4 py-2">Notes</th>
              <th className="border-b px-4 py-2">Chat</th>
              <th className="border-b px-4 py-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {data &&
              //@ts-ignore
              data.map((item: any) => (
                <tr key={item.id}>
                  <td className="border-b px-4 py-2">{item.userName}</td>
                  <td className="border-b px-4 py-2">{item.selectedTime}m</td>
                  <td className="border-b px-4 py-2">${item.totalAmount}</td>
                  <td className="border-b px-4 py-2">
                    {new Date(item.createdAt).toLocaleString()}
                  </td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() =>
                        openReviewModal(item.notes, item.psychicId, item.userId)
                      }
                      className="rounded bg-blue-500 px-2 py-1 text-white"
                    >
                      Notes & Reviews
                    </button>
                  </td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => openChatModal(item.psychicId, item.userId)}
                      className="rounded bg-green-500 px-2 py-1 text-white"
                    >
                      Chat
                    </button>
                  </td>
                  <td className="border-b px-4 py-2">{item.status}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="bg-gray-900 fixed inset-0 z-50 flex items-center justify-center bg-opacity-75">
          <div className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-lg">
            <button
              onClick={closeReviewModal}
              className="text-gray-600 hover:text-gray-900 absolute right-2 top-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="mb-4 text-xl font-bold">Notes</h2>
            <p>{selectedNote || "No notes available"}</p>
            <h2 className="mb-4 mt-6 text-xl font-bold">Reviews</h2>
            {filteredReviews.length > 0 ? (
              <ul>
                {filteredReviews.map((review: any) => (
                  <li key={review.id} className="mb-2 border-b pb-2">
                    <div className="flex items-center">
                      <strong>Rating:</strong>
                      {renderStars(review.rating)}
                    </div>
                    <p>
                      <strong>Comment:</strong> {review.review}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews available</p>
            )}
          </div>
        </div>
      )}

      {isChatModalOpen && (
        <div className="bg-gray-900 fixed inset-0 z-50 flex items-center justify-center bg-opacity-75">
          <div
            className="relative w-full max-w-lg rounded-lg bg-white p-8 shadow-lg"
            style={{ height: "70vh", width: "70vw" }}
          >
            <button
              onClick={closeChatModal}
              className="text-gray-600 hover:text-gray-900 absolute right-2 top-2"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <h2 className="mb-4 text-xl font-bold">Chat Messages</h2>
            <div
              className="overflow-y-auto"
              style={{ height: "calc(100% - 50px)" }}
            >
              {messages.length > 0 ? (
                <ul>
                  {messages.map((message: any, index) => (
                    <li key={index} className="mb-2 border-b pb-2">
                      <div className="flex items-center">
                        <strong>
                          {message.senderId === selectedUserId
                            ? "User"
                            : "Psychic"}
                          :
                        </strong>
                        <p className="ml-2">{message.content}</p>
                      </div>
                      <p className="text-gray-500 text-sm">
                        {new Date(
                          message.timestamp.seconds * 1000,
                        ).toLocaleString()}
                      </p>
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No messages available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default Page;
