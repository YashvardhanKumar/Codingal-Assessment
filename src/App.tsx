import { Route, Routes } from "react-router";
import "./App.css";
import Navbar from "./components/navbar";
import { Posts } from "./pages/posts";
import { Passengers } from "./pages/passengers";
import InfiniteScrollProvider from "./components/context/InfiniteScrollProvider";
import First from "./First";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<First/>} />
        <Route
          path="posts"
          element={<InfiniteScrollProvider children={<Posts />} />}
        />
        <Route
          path="passengers"
          element={<InfiniteScrollProvider children={<Passengers />} />}
        />
      </Routes>
    </>
  );
}

export default App;
