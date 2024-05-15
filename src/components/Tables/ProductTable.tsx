"use client";
import { PSYCHICS_TABLE } from "@/types/brand";
import Image from "next/image";
import { FaEye } from "react-icons/fa";
import ChartThree from "../Charts/ChartThree";
import ChartTwo from "../Charts/ChartTwo";
import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {
  addProduct,
  deleteProduct,
  gettingAllProducts,
  updateProduct,
} from "../../store/slices/productSlice";
import { RxCross2 } from "react-icons/rx";

const ProductTable = () => {
  const dispatch = useDispatch();
  //@ts-ignore
  const products = useSelector((state) => state.product.products);
  const [isModalOpen, setModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [productDescription, setProductDescription] = useState("");
  const [category, setCategory] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [imageId, setImageId] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    //@ts-ignore
    dispatch(gettingAllProducts());
  }, [dispatch]);

  const handleAddNewProduct = async () => {
    if (!productName || !productPrice || !category || !productDescription || !imageUrl) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    const productDetails = {
      productName,
      productPrice,
      discount: discountPrice,
      category,
      quantity,
      description: productDescription,
      productImageUrl: imageUrl,
      productImageId: imageId,
    };
//@ts-ignore
    const result = await dispatch(addProduct(productDetails)); //@ts-ignore
    if (result?.payload?.product) {
      toast.success("Product added successfully");
    } else {
      toast.error("Failed to add product");
    }

    closeModal();
  };

  const handleUpdateProduct = async () => {
    if (!productName || !productPrice || !category || !productDescription || !imageUrl) {
      toast.error("Please fill in all fields.");
      return;
    }

    const productDetails = {
      productName,
      productPrice,
      discount: discountPrice,
      category,
      quantity,
      description: productDescription,
      productImageUrl: imageUrl,
      productImageId: imageId,
    };
//@ts-ignore
    const result = await dispatch(updateProduct({  //@ts-ignore
      id: selectedProduct?.id,
      productDetails
    }));
//@ts-ignore
    if (result?.payload?.productDetails) {
      toast.success("Product updated successfully");
    } else {
      toast.error("Failed to update product");
    }

    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    resetFormFields();
  };

  const resetFormFields = () => {
    setProductName("");
    setProductPrice("");
    setDiscountPrice("");
    setQuantity("");
    setProductDescription("");
    setCategory("");
    setImageUrl("");
    setImageId("");
  };

  const handleImageChange = (event:any) => {
    const file = event.target.files[0];
    uploadFileToCloudinary(file);
  };

  const toggleModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      //@ts-ignore
      setProductName(product.productName); //@ts-ignore
      setProductPrice(product.productPrice); //@ts-ignore
      setDiscountPrice(product.discount || ""); //@ts-ignore
      setQuantity(product.quantity || ""); //@ts-ignore
      setProductDescription(product.description || ""); //@ts-ignore
      setCategory(product.category || ""); //@ts-ignore
      setImageUrl(product.productImageUrl || ""); //@ts-ignore
      setImageId(product.productImageId || ""); //@ts-ignore
    } else {
      resetFormFields();
    }
    setModalOpen(true);
  };

  const uploadFileToCloudinary = async (file:any) => {
    const formData = new FormData();
    formData.append("image", file);
    setIsLoading(true);
    try {
      const response = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/image/upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      setImageUrl(response.data.data.secure_url);
      setImageId(response.data.data.public_id);
      setIsLoading(false);
    } catch (error) {
      console.error("Error uploading image:", error);
      setIsLoading(false);
    }
  };

  const handleDelete = async (productId:any) => {
    if (window.confirm("Are you sure you want to delete this product?")) { //@ts-ignore
      const result = await dispatch(deleteProduct(productId));
      if (result.type.endsWith('fulfilled')) {
        toast.success("Product deleted successfully");
      } else {
        toast.error("Failed to delete product");
      }
    }
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
        <div className="dark:bg-gray-800 relative overflow-hidden bg-white shadow-md sm:rounded-lg">
          <div className="flex items-center justify-between p-4">
            <h2 className="text-lg font-bold">Products</h2>
            <button
              className="rounded bg-[#12a19b] px-4 py-2 font-bold text-white hover:opacity-75"
              //@ts-ignore
              onClick={toggleModal}
            >
              Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="text-gray-500  dark:text-gray-400 w-full text-left text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700 dark:text-gray-400 bg-[#12a19b] text-xs uppercase text-white">
                <tr>
                  <th scope="col" className="px-4 py-3">
                    Product Image
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product Name
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product Price
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Product Quantity
                  </th>
                  <th scope="col" className="px-4 py-3">
                    Actions
                  </th>
                  <th scope="col" className="px-4 py-3"></th>
                </tr>
              </thead>
              <tbody>
                {products &&
                  products.map((product: any) => (
                    <tr
                      key={product.id}
                      style={{ borderBottom: "1px solid #f5f5f7" }}
                    >
                      <td className="whitespace-nowrap ps-2">
                        <img
                          src={product.productImageUrl}
                          alt={product.productName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-6 py-4 text-sm font-medium">
                        {product.productName}
                      </td>
                      <td className="text-gray-500 whitespace-nowrap px-6 py-4 text-sm">
                        ${product.productPrice}
                      </td>
                      <td className="text-gray-500 whitespace-nowrap px-6 py-4 text-sm">
                        {product.quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => toggleModal(product)}
                          className="mr-3 rounded bg-indigo-600 px-3 py-1 text-white transition duration-150 ease-in-out hover:bg-indigo-700"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(product.id)}
                          className="rounded bg-red px-3 py-1 text-white transition duration-150 ease-in-out"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          {/* <nav
            className="flex flex-col items-start justify-between space-y-3 p-4 md:flex-row md:items-center md:space-y-0"
            aria-label="Table navigation"
          >
            <span className="text-gray-500 dark:text-gray-400 text-sm font-normal">
              Showing
              <span className="text-gray-900 font-semibold dark:text-white">
                1-10
              </span>
              of
              <span className="text-gray-900 font-semibold dark:text-white">
                1000
              </span>
            </span>
            <ul className="inline-flex items-stretch -space-x-px">
              <li>
                <a
                  href="#"
                  className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 ml-0 flex h-full items-center justify-center rounded-l-lg border bg-white px-3 py-1.5 dark:hover:text-white"
                >
                  <span className="sr-only">Previous</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex items-center justify-center border bg-white px-3 py-2 text-sm leading-tight dark:hover:text-white"
                >
                  1
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex items-center justify-center border bg-white px-3 py-2 text-sm leading-tight dark:hover:text-white"
                >
                  2
                </a>
              </li>
              <li>
                <a
                  href="#"
                  aria-current="page"
                  className="text-primary-600 bg-primary-50 border-primary-300 hover:bg-primary-100 hover:text-primary-700 dark:border-gray-700 dark:bg-gray-700 z-10 flex items-center justify-center border px-3 py-2 text-sm leading-tight dark:text-white"
                >
                  3
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex items-center justify-center border bg-white px-3 py-2 text-sm leading-tight dark:hover:text-white"
                >
                  ...
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex items-center justify-center border bg-white px-3 py-2 text-sm leading-tight dark:hover:text-white"
                >
                  100
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-500 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 flex h-full items-center justify-center rounded-r-lg border bg-white px-3 py-1.5 leading-tight dark:hover:text-white"
                >
                  <span className="sr-only">Next</span>
                  <svg
                    className="h-5 w-5"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </li>
            </ul>
          </nav> */}
        </div>
        {/* model */}
        {isModalOpen && (
          <div
            className="fixed inset-0 z-1 h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50"
            id="my-modal"
          >
            <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
              <div className="mt-3 text-center">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 text-lg font-medium leading-6">
                    Add New Product
                  </h3>
                  <button
                    onClick={() => setModalOpen(false)} // Close the modal
                    className="text-gray-700 hover:text-gray-900 rounded p-1"
                    style={{ outline: "none" }}
                  >
                    <RxCross2 fontSize={25} />
                  </button>
                </div>
                <div className="mt-2 py-3">
                  <input
                    className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                    type="text"
                    placeholder="Product Name"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <input
                    className="text-gray-700 focus:shadow-outline mt-4 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                    type="number"
                    placeholder="Product Price"
                    value={productPrice}
                    onChange={(e) => setProductPrice(e.target.value)}
                  />
                  <input
                    className="text-gray-700 focus:shadow-outline mt-4 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                    type="number"
                    placeholder="Discount Price"
                    value={discountPrice}
                    onChange={(e) => setDiscountPrice(e.target.value)}
                  />
                  <input
                    className="text-gray-700 focus:shadow-outline mt-4 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                    type="number"
                    placeholder="Quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="text-gray-700 focus:shadow-outline mt-4 w-full appearance-none rounded border bg-white px-3 py-2 leading-tight shadow focus:outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="clothing">Clothing</option>
                    <option value="books">Books</option>
                    <option value="accessories">Accessories</option>
                  </select>
                  <textarea
                    placeholder="Product Description"
                    value={productDescription}
                    onChange={(e) => setProductDescription(e.target.value)}
                    className="text-gray-700 focus:shadow-outline mt-4 w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                    rows={3}
                  />
                  <div className="mt-4">
                    <label className="block">Product Image</label>
                    <input
                      type="file"
                      onChange={handleImageChange}
                      className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                    />
                  </div>
                </div>
                <div className="items-center px-4 py-3">
                  <button
                    className="w-full rounded-md bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                    onClick={handleAddNewProduct}
                    disabled={isLoading}
                  >
                    {isLoading ? "Loading... " : "Add Product"}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        {/* <div className="mt-6">
          <ChartTwo />
        </div> */}
      </div>
    </section>
  );
};

export default ProductTable;
