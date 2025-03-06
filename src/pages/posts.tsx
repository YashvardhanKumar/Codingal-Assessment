import { FormEvent, useEffect, useState } from "react";
import axios from "axios";
import { useInfiniteScrollContext } from "../components/context/InfiniteScrollProvider";
import { OrbitProgress } from "react-loading-indicators";
import { BiSearch } from "react-icons/bi";
export interface Post {
  userId: number;
  id: number;
  title: string;
  body: string;
}
export const Posts = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const {
    page,
    loading,
    error,
    setMore,
    setLoading,
    setError,
    lastPostElementRef,
  } = useInfiniteScrollContext();

  const fetchPosts = async (page: number) => {
    setLoading(true);
    try {
      const res = await axios.get<Post[]>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          params: { _limit: 10, _page: page },
        }
      );
      setPosts((prev) => [...prev, ...res.data]);
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

  const filterPosts = (e: FormEvent) => {
    e.preventDefault();
    if (!searchQuery?.length) {
      setFilteredPosts(() => posts);
      return;
    }
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  };
  useEffect(() => {
    if (!searchQuery?.length) {
      setFilteredPosts(() => posts);
      return;
    }
    setFilteredPosts(
      posts.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [searchQuery, posts]);
  useEffect(() => {
    fetchPosts(page);
  }, [page]);
  return (
    <div className="flex flex-col px-5 sm:px-10 md:px-20 w-full items-center gap-4">
      <h1 className="text-3xl font-extrabold text-center py-6">All Posts</h1>
      <form
        action=""
        method="get"
        className="flex gap-4 max-w-3xl w-full"
        onSubmit={filterPosts}
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
        {filteredPosts.map((post, index, arr) => {
          if (arr.length === index + 1) {
            return (
              <div
                ref={lastPostElementRef}
                key={index}
                className="border p-4"
              >
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-700">{post.body}</p>
                <p className=" flex items-center gap-1 text-sm text-[#f05641]">
                  <div>Posted by: </div>
                  {post.userId}
                </p>
              </div>
            );
          } else {
            return (
              <div key={index} className="border p-4 rounded-xl">
                <p className=" flex items-center gap-1">
                  <div>Post ID: </div>
                  {post.id}
                </p>
                <h2 className="text-xl font-bold">{post.title}</h2>
                <p className="text-gray-700">{post.body}</p>
                <p className=" flex items-center gap-1 text-sm text-[#f05641]">
                  <div>Posted by: </div>
                  {post.userId}
                </p>
              </div>
            );
          }
        })}
        {loading && (
          <div className="p-3">
            <OrbitProgress color="#f05641" size="small" text="" textColor="" />
          </div>
        )}
        {error && <p className="text-center text-red-500 py-4">{error}</p>}
      </div>
    </div>
  );
};
