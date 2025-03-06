import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useInfiniteScrollContext } from "../components/context/InfiniteScrollProvider";
import { Atom, Mosaic, OrbitProgress } from "react-loading-indicators";
import { BiGlobe, BiPhone, BiSearch } from "react-icons/bi";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
export interface Passengers {
  id: string;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
  };
  phone: string;
  website: string;
}
export const Passengers = () => {
  const [passengers, setPassengers] = useState<Passengers[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPassengers, setFilteredPassengers] = useState<Passengers[]>(
    []
  );
  const {
    page,
    loading,
    error,
    setMore,
    setLoading,
    setError,
    lastPostElementRef,
  } = useInfiniteScrollContext();

  const fetchPassengers = async (page: number) => {
    setLoading(true);
    try {
      // used this url as other url was not working properly
      const res = await axios.get<Passengers[]>(
        "https://jsonplaceholder.typicode.com/users",
        {
          params: { _limit: 10, _page: page },
        }
      );
      setPassengers((prev) => [...prev, ...res.data]);
      if (res.data.length < 10) {
        setMore(false);
      }
    } catch (err) {
      setError("An error occurred while fetching data.");
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 500);
      // added delay to show that infinite scrolling is working properly
    }
  };
  const filterPassengers = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery?.length) {
      setFilteredPassengers((prev) => passengers);
      return;
    }
    setFilteredPassengers(
      passengers.filter((passenger) =>
        passenger.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  useEffect(() => {
    if (!searchQuery?.length) {
      setFilteredPassengers(() => passengers);
      return;
    }
    setFilteredPassengers(
      passengers.filter((passenger) =>
        passenger.name.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, passengers]);
  useEffect(() => {
    fetchPassengers(page);
  }, [page]);
  return (
    <div className="flex flex-col px-5 sm:px-10 md:px-20 w-full items-center gap-4">
      <h1 className="text-3xl font-extrabold text-center py-6">
        All Passengers
      </h1>
      <form
        action=""
        method="get"
        className="flex gap-4 max-w-3xl w-full"
        onSubmit={filterPassengers}
      >
        <input
          type="text"
          placeholder="Search by name"
          className="border-2 border-gray-300 p-2 rounded-md focus:outline-none w-full"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button
          type="submit"
          className="bg-[#f05641] text-white p-2 rounded-md flex items-center gap-2"
        >
          <div>Search</div> <BiSearch size={20} />
        </button>
      </form>
      <div className="p-4 border max-w-3xl w-full flex flex-col items-center gap-4 rounded-xl">
        {filteredPassengers.map((passenger, index, arr) => {
          if (arr.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                key={index}
                className="border p-4 w-full rounded-xl"
              >
                <h2 className="inline-flex items-center gap-2">
                  <div className="text-xl font-bold">{passenger.name}</div>{" "}
                  <p className="text-gray-700">@{passenger.username}</p>
                </h2>
                <p className=" flex items-center gap-1 text-sm text-[#f05641]">
                  <MdEmail />
                  {passenger.email}
                </p>
                <p className=" flex items-center gap-1 text-sm text-[#f05641]">
                  <FaLocationDot />
                  {passenger.email}
                </p>
              </div>
            );
          } else {
            return (
              <div key={index} className="border p-4 w-full rounded-xl">
                <h2 className="inline-flex items-center gap-2">
                  <div className="text-xl font-bold">{passenger.name}</div>{" "}
                  <p className="text-gray-700">@{passenger.username}</p>
                </h2>
                <p className=" flex items-center gap-1 text-sm text-[#f05641]">
                  <MdEmail />
                  {passenger.email}
                </p>
                <p className=" flex items-center gap-1 text-xs text-gray-400">
                  <FaLocationDot />
                  {passenger.address.street}, {passenger.address.city}
                </p>
                <p className=" flex items-center gap-1 text-xs text-gray-400">
                  <BiPhone />
                  {passenger.phone.split(" ")[0]}
                </p>
                <a
                  href={passenger.website}
                  className=" flex items-center gap-1 text-xs text-[#f05641] underline"
                >
                  <BiGlobe />
                  {passenger.website}
                </a>
              </div>
            );
          }
        })}
        {loading && (
          <div className="p-3">
            <OrbitProgress color="#f05641" size="small" text="" textColor="" />
          </div>
        )}
        {error && <p className="text-center text-red-500 p-4">{error}</p>}
      </div>
    </div>
  );
};
