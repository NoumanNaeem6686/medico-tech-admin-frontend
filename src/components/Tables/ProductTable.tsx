"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { FaEye } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import axios from "axios";
import {
  addProduct,
  deleteProduct,
  gettingAllProducts,
  updateProduct,
} from "../../store/slices/productSlice";

const ProductTable = () => {
  const dispatch = useDispatch(); //@ts-ignore
  const products = useSelector((state) => state.products.products);
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState("add"); // 'add' or 'update'
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
    if (
      !productName ||
      !productPrice ||
      !category ||
      !productDescription ||
      !imageUrl
    ) {
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
    if (
      !productName ||
      !productPrice ||
      !category ||
      !productDescription ||
      !imageUrl
    ) {
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

    const result = await dispatch(
      //@ts-ignore
      updateProduct({ id: selectedProduct?.id, productDetails }),
    ); //@ts-ignore
    if (result?.meta.arg?.productDetails) {
      toast.success("Product updated successfully");
    } else {
      toast.error("Failed to update product");
    }

    closeModal();
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedProduct(null);
    setModalMode("add");
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

  const handleImageChange = (event: any) => {
    const file = event.target.files[0];
    uploadFileToCloudinary(file);
  };

  const toggleModal = (product = null) => {
    if (product) {
      setSelectedProduct(product);
      setModalMode("update"); //@ts-ignore
      setProductName(product.productName); //@ts-ignore
      setProductPrice(product.productPrice); //@ts-ignore
      setDiscountPrice(product.discount || ""); //@ts-ignore
      setQuantity(product.quantity || ""); //@ts-ignore
      setProductDescription(product.description || ""); //@ts-ignore
      setCategory(product.category || ""); //@ts-ignore
      setImageUrl(product.productImageUrl || ""); //@ts-ignore
      setImageId(product.productImageId || "");
    } else {
      setModalMode("add");
      resetFormFields();
    }
    setModalOpen(true);
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

  const handleDelete = async (productId: any) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      //@ts-ignore
      const result = await dispatch(deleteProduct(productId));
      if (result.payload) {
        //@ts-ignore
        toast.success(result.payload);
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
              onClick={() => toggleModal()}
            >
              Add Product
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
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
                      key={product?.id}
                      style={{ borderBottom: "1px solid #f5f5f7" }}
                    >
                      <td className="whitespace-nowrap ps-2">
                        <img
                          src={product?.productImageUrl}
                          alt={product?.productName}
                          className="h-10 w-10 rounded-full object-cover"
                        />
                      </td>
                      <td className="text-gray-900 whitespace-nowrap px-6 py-4 text-sm font-medium">
                        {product?.productName}
                      </td>
                      <td className="text-gray-500 whitespace-nowrap px-6 py-4 text-sm">
                        ${product?.productPrice}
                      </td>
                      <td className="text-gray-500 whitespace-nowrap px-6 py-4 text-sm">
                        {product?.quantity}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm font-medium">
                        <button
                          onClick={() => toggleModal(product)}
                          className="mr-3 rounded bg-indigo-600 px-3 py-1 text-white transition duration-150 ease-in-out hover:bg-indigo-700"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(product?.id)}
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
        </div>
        {isModalOpen && (
          <div
            className="fixed inset-0 z-1 h-full w-full items-center justify-center overflow-y-auto bg-black bg-opacity-50"
            id="my-modal"
          >
            <div className="relative top-20 mx-auto w-96 rounded-md border bg-white p-5 shadow-lg">
              <div className="mt-3 text-center">
                <div className="flex items-center justify-between">
                  <h3 className="text-gray-900 text-lg font-medium leading-6">
                    {modalMode === "add" ? "Add New Product" : "Update Product"}
                  </h3>
                  <button
                    onClick={closeModal} // Close the modal
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
                  {modalMode === "add" ? (
                    <button
                      className="w-full rounded-md bg-green-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-300"
                      onClick={handleAddNewProduct}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Add Product"}
                    </button>
                  ) : (
                    <button
                      className="w-full rounded-md bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-300"
                      onClick={handleUpdateProduct}
                      disabled={isLoading}
                    >
                      {isLoading ? "Loading..." : "Update Product"}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductTable;
