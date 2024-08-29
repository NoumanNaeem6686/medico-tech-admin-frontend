"use client";

import { useSelector } from "react-redux";
import Loader from "../Loader";
import { CalculateCustomerHistoryAmount } from "../utils/helper";

const TableOne = () => {
  const { customerHistory, loading } = useSelector(
    (state: any) => state.customerHistory
  );

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-3 sm:py-5">
      {/* <div className="mx-auto max-w-screen-2xl px-4 lg:px-12">
      <div className="dark:bg-gray-800 relative overflow-hidden bg-white shadow-md sm:rounded-lg">
      <div className="flex flex-col space-y-3 px-4 py-3 lg:flex-row lg:items-center lg:justify-between lg:space-x-4 lg:space-y-0">
        <div className="flex items-center flex-1 space-x-4">
          <h5>
            <span className="text-gray-500">All Products:</span>
            <span className="dark:text-white">123456</span>
          </h5>
          <h5>
            <span className="text-gray-500">Total sales:</span>
            <span className="dark:text-white">$88.4k</span>
          </h5>
        </div>
      </div> */}
      <div className="overflow-x-auto">
        <table className="min-w-full border rounded-2xl overflow-hidden shadow-lg">
          <thead className="bg-[#12A19B] text-white">
            <tr>
              <th scope="col" className="px-4 py-3">
                Client Name
              </th>
              <th scope="col" className="px-4 py-3">
                Psychics Name
              </th>
              <th scope="col" className="px-4 py-3">
                Money Invested
              </th>
              {/* <th scope="col" className="px-4 py-3">
                Rating
              </th> */}
              <th scope="col" className="px-4 py-3">
                Total Minutes
              </th>
            </tr>
          </thead>
          <tbody>
            {!loading ? (
              customerHistory?.map((item: any, index: number) => (
                <tr key={item.id} className={`hover:bg-[#a7ebd9] ${index % 2 !== 0 ? "bg-[#daedec]" : "bg-white"}`}>
                  <td
                    scope="row"
                    className="text-gray-900 text-center capitalize whitespace-nowrap px-4 py-2 font-medium dark:text-white"
                  >
                    {/* <img
                      src="https://static.vecteezy.com/system/resources/previews/009/749/643/non_2x/woman-profile-mascot-illustration-female-avatar-character-icon-cartoon-girl-head-face-business-user-logo-free-vector.jpg"
                      alt="iMac Front Image"
                      className="mr-3 h-8 w-auto"
                    /> */}
                    {item.user.userName}
                  </td>

                  <td className="text-gray-900 whitespace-nowrap capitalize text-center px-4 py-2 font-medium dark:text-white">
                    {item.psychic.name}
                  </td>
                  <td className="text-gray-900 whitespace-nowrap text-center px-4 py-2 font-medium dark:text-white">
                    $
                    {CalculateCustomerHistoryAmount(
                      item.selectedTime,
                      item.psychic.price
                    )}
                  </td>
                  {/* <td className="text-gray-900 whitespace-nowrap px-4 py-2 font-medium dark:text-white">
                    <div className="flex items-center">
                      <svg
                        aria-hidden="true"
                        className="h-5 w-5 text-yellow-400"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">
                        5.0
                      </span>
                    </div>
                  </td> */}
                  <td className="text-gray-900 whitespace-nowrap px-4 py-2 text-center font-medium dark:text-white">
                    {parseFloat((item.selectedTime / 60).toFixed(2))} Minutes
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center py-10">
                  <Loader />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default TableOne;
