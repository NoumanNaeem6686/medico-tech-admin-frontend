"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  createPackage,
  deletePackage,
  getAllPackages,
  updatePackage,
} from "@/store/slices/packagSlice";

const Packages = () => {
  const [packageName, setPackageName] = useState("");
  const [price, setPrice] = useState("");
  const [benefits, setBenefits] = useState([""]);
  const [category, setCategory] = useState("");
  const [editingPackageId, setEditingPackageId] = useState(null);

  const dispatch = useDispatch(); //@ts-ignore
  const packages = useSelector((state) => state.packages.packages); //@ts-ignore
  const loading = useSelector((state) => state.packages.loading); //@ts-ignore
  const error = useSelector((state) => state.packages.error);
  console.log("🚀 ~ Packages ~ packages:", packages);

  useEffect(() => {
    const getPkg = async () => {
      //@ts-ignore
      const result = await dispatch(getAllPackages());
      console.log("🚀 ~ getPkg ~ result:", result);
    };
    getPkg();
  }, [dispatch]);

  const handleAddOrUpdatePackage = async (e: any) => {
    e.preventDefault();

    const categoryCount = packages.filter((pkg: any) => pkg.category === category).length;
    const totalPackages = packages.length;

    if (editingPackageId === null && categoryCount >= 1) {
      toast.error(`You can only add one package in the ${category} category.`);
      return;
    }

    if (editingPackageId === null && totalPackages >= 3) {
      toast.error("You can only add a total of three packages.");
      return;
    }

    if (
      packageName &&
      price &&
      benefits.some((benefit) => benefit.trim()) &&
      category
    ) {
      const newPackage = {
        name: packageName,
        price,
        category,
        benefits: benefits.filter((benefit) => benefit.trim()),
      };

      if (editingPackageId) {
        // Update package logic
        try {
          //@ts-ignore
          const result = await dispatch(//@ts-ignore
            updatePackage({ id: editingPackageId, ...newPackage }),
          ).unwrap();
          toast.success("Package updated successfully");
          setEditingPackageId(null);
        } catch (error) {
          toast.error("Failed to update package");
          console.error("Error updating package:", error);
        }
      } else {
        // Add package logic
        try {
          //@ts-ignore
          const result = await dispatch(createPackage(newPackage)).unwrap();
          toast.success("Package created successfully");
        } catch (error) {
          toast.error("Failed to create package");
          console.error("Error creating package:", error);
        }
      }

      setPackageName("");
      setPrice("");
      setCategory("");
      setBenefits([""]);
    }
  };

  const handleDelete = async (id: any) => {
    try {
      //@ts-ignore
      await dispatch(deletePackage(id));
      toast.success("Package deleted successfully");
    } catch (error) {
      toast.error("Failed to delete package");
      console.error("Error deleting package:", error);
    }
  };

  const handleEdit = (pkg: any) => {
    setEditingPackageId(pkg.id);
    setPackageName(pkg.name);
    setPrice(pkg.price);
    setCategory(pkg.category);
    setBenefits(pkg.benefits);
  };

  const handleBenefitChange = (index: any, value: any) => {
    const newBenefits = [...benefits];
    newBenefits[index] = value;
    setBenefits(newBenefits);
  };

  const addBenefitField = () => {
    setBenefits([...benefits, ""]);
  };

  const removeBenefitField = (index: any) => {
    const newBenefits = benefits.filter((_, i) => i !== index);
    setBenefits(newBenefits);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-2xl font-bold">
        {editingPackageId ? "Update Package" : "Create Package"}
      </h2>

      <form onSubmit={handleAddOrUpdatePackage} className="mb-6">
        <div className="mb-4">
          <label
            className="text-gray-700 mb-2 block text-sm font-bold"
            htmlFor="packageName"
          >
            Package Name
          </label>
          <input
            type="text"
            id="packageName"
            value={packageName}
            onChange={(e) => setPackageName(e.target.value)}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            placeholder="Enter package name"
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-700 mb-2 block text-sm font-bold"
            htmlFor="price"
          >
            Price
          </label>
          <input
            type="text"
            id="price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
            placeholder="Enter price"
          />
        </div>
        <div className="mb-4">
          <label
            className="text-gray-700 mb-2 block text-sm font-bold"
            htmlFor="category"
          >
            Category
          </label>
          <select
            id="category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
          >
            <option value="">Select category</option>
            <option value="Basic">Affordable</option>
            <option value="Standard">Popular</option>
            <option value="Premium">Premium</option>
          </select>
        </div>
        <div className="mb-4">
          <label
            className="text-gray-700 mb-2 block text-sm font-bold"
            htmlFor="benefits"
          >
            Benefits
          </label>
          {benefits.map((benefit, index) => (
            <div key={index} className="mb-2 flex">
              <input
                type="text"
                value={benefit}
                onChange={(e) => handleBenefitChange(index, e.target.value)}
                className="text-gray-700 focus:shadow-outline w-full appearance-none rounded border px-3 py-2 leading-tight shadow focus:outline-none"
                placeholder={`Benefit ${index + 1}`}
              />
              <button
                type="button"
                onClick={addBenefitField}
                className="focus:shadow-outline ml-2 rounded bg-green-500 px-4 py-2 font-bold text-white hover:bg-green-700 focus:outline-none"
              >
                +
              </button>
              {benefits.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeBenefitField(index)}
                  className="focus:shadow-outline ml-2 rounded bg-red px-4 py-2 font-bold text-white hover:opacity-75 focus:outline-none"
                >
                  -
                </button>
              )}
            </div>
          ))}
        </div>
        <button
          type="submit"
          className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
        >
          {editingPackageId ? "Update Package" : "Add Package"}
        </button>
      </form>
      <h3 className="mb-4 text-xl font-bold">Available Packages</h3>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error loading packages: {error}</p>
      ) : packages.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr>
                <th className="border-b px-4 py-2">Name</th>
                <th className="border-b px-4 py-2">Price</th>
                <th className="border-b px-4 py-2">Category</th>
                <th className="border-b px-4 py-2">Benefits</th>
                <th className="border-b px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {packages.map((pkg: any) => (
                <tr key={pkg.id}>
                  <td className="border-b px-4 py-2">{pkg.name}</td>
                  <td className="border-b px-4 py-2">{pkg.price}</td>
                  <td className="border-b px-4 py-2">{pkg.category}</td>
                  <td className="border-b px-4 py-2">
                    <ul className="list-inside list-disc">
                      {pkg.benefits?.map((benefit: any, idx: any) => (
                        <li key={idx}>{benefit}</li>
                      ))}
                    </ul>
                  </td>
                  <td className="border-b px-4 py-2">
                    <button
                      onClick={() => handleEdit(pkg)}
                      className="focus:shadow-outline rounded bg-yellow-500 px-4 py-2 font-bold text-white hover:bg-yellow-700 focus:outline-none"
                    >
                      Update
                    </button>
                    <button
                      onClick={() => handleDelete(pkg.id)}
                      className="focus:shadow-outline ml-2 rounded bg-red px-4 py-2 font-bold text-white hover:opacity-75 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No packages added yet.</p>
      )}
    </div>
  );
};

export default Packages;
