import { PSYCHICS_TABLE } from "@/types/brand";
import Image from "next/image";
import { FaEye } from "react-icons/fa";

const brandData: PSYCHICS_TABLE[] = [
  {
    logo: "/images/brand/brand-01.svg",
    name: "Hanan",
    visitors: "Hanan",
    revenues: "5,768",
    sales: 590,
    conversion: 240,
    earnings : '250'
  },
  {
    logo: "/images/brand/brand-02.svg",
    name: "Afaq",
    visitors: "usman",
    revenues: "4,635",
    sales: 467,
    conversion: 320,
    earnings : '250'
  },
  {
    logo: "/images/brand/brand-03.svg",
    name: "Nouman",
    visitors: "nouman",
    revenues: "4,290",
    sales: 420,
    conversion: 410,
    earnings : '250'
  },
  {
    logo: "/images/brand/brand-04.svg",
    name: "Hamza",
    visitors: "Afaq",
    revenues: "3,580",
    sales: 389,
    conversion: 195,
    earnings : '250'
  },
  {
    logo: "/images/brand/brand-05.svg",
    name: "Muneeb",
    visitors: "Munaeeb",
    revenues: "6,768",
    sales: 390,
    conversion: 285,
    earnings : '250'
  },
];

const PsychicsTable = () => {
  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
    <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div className="dark:bg-gray-800 relative overflow-hidden bg-white shadow-md sm:rounded-lg">
        <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-x-4 lg:space-y-0">
          {/* <div className="flex items-center flex-1 space-x-4">
        <h5>
          <span className="text-gray-500">All Products:</span>
          <span className="dark:text-white">123456</span>
        </h5>
        <h5>
          <span className="text-gray-500">Total sales:</span>
          <span className="dark:text-white">$88.4k</span>
        </h5>
      </div> */}
        </div>
        <div className="overflow-x-auto">
          <table className="text-gray-500 dark:text-gray-400 w-full text-left text-sm">
            <thead className="text-white bg-gray-50 bg-[#12a19b] dark:bg-gray-700 dark:text-gray-400 text-xs uppercase">
              <tr>
                <th scope="col" className="p-4">
                  {/* <div className="flex items-center">
                    <input
                      id="checkbox-all"
                      type="checkbox"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label htmlFor="checkbox-all" className="sr-only">
                      checkbox
                    </label>
                  </div> */}
                </th>
                <th scope="col" className="px-4 py-3">
                  Psychics
                </th>
                <th scope="col" className="px-4 py-3">
                  Category
                </th>
                <th scope="col" className="px-4 py-3">
                  Status
                </th>
                <th scope="col" className="px-4 py-3">
                 <FaEye/>
                </th>
                <th scope="col" className="px-4 py-3">
                  Employed
                </th>
                <th scope="col" className="px-4 py-3">
                  Hours
                </th>
                <th scope="col" className="px-4 py-3">
                  Earnings
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx7HjRXcShPt-oR-OPPYLL8IZWWiNIcnvPAASBPvGIw&s"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Nouman
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  usman
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx7HjRXcShPt-oR-OPPYLL8IZWWiNIcnvPAASBPvGIw&s"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Hamza
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  zeeshan
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx7HjRXcShPt-oR-OPPYLL8IZWWiNIcnvPAASBPvGIw&s"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  afaq
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Muneeb
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx7HjRXcShPt-oR-OPPYLL8IZWWiNIcnvPAASBPvGIw&s"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Shahmeer
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Ali
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx7HjRXcShPt-oR-OPPYLL8IZWWiNIcnvPAASBPvGIw&s"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Nomi
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Hanan
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdx7HjRXcShPt-oR-OPPYLL8IZWWiNIcnvPAASBPvGIw&s"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Hanan
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
              <tr className="dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-700 border-b">
                <td className="w-4 px-4 py-3">
                  <div className="flex items-center">
                    <input
                      id="checkbox-table-search-1"
                      type="checkbox"
                      // onClick="event.stopPropagation()"
                      className="bg-gray-100 border-gray-300 text-primary-600 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600 h-4 w-4 rounded focus:ring-2"
                    />
                    <label
                      htmlFor="checkbox-table-search-1"
                      className="sr-only"
                    >
                      checkbox
                    </label>
                  </div>
                </td>
                <th
                  scope="row"
                  className="text-gray-900 flex items-center whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                    alt="iMac Front Image"
                    className="mr-3 h-8 w-auto"
                  />
                  Hanan
                </th>
               
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    <div className="bg-red-700 mr-2 inline-block h-4 w-4 rounded-full" />
                    category
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  online/offline
                </td>
                
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  on/off
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    joining Date
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    120 hours
                  </div>
                </td>
                <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                  <div className="flex items-center">
                    
                    $6000
                  </div>
                </td>
                
                
              </tr>
            </tbody>
          </table>
        </div>
        <nav
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
        </nav>
      </div>
    </div>
  </section>
  );
};

export default PsychicsTable;
