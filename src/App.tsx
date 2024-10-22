import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import BrowseBeers from "./pages/BrowseBeers";
import FavoriteBeers from "./pages/FavoriteBeers";
import Navbar from "./components/NavBar";
import Modal from "./components/Modal";
import { useSelector, useDispatch } from "react-redux";
import { setBeers, setLoading } from "./store/beerSlice";
import { fetchBeers } from "./api";
import { ClipLoader } from "react-spinners";
import React, { useEffect } from "react";
import { RootState, AppDispatch } from "./store";
import './styles/App.css';

const App: React.FC = (): JSX.Element => {
  const isModalOpen = useSelector((state: RootState) => state.modal.isOpen);
  const { loading } = useSelector((state: RootState) => state.beers);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    const loadBeers = async () => {
      dispatch(setLoading(true));
      try {
        const fetchedBeers = await fetchBeers();
        dispatch(setBeers(fetchedBeers));
      } catch (error) {
        console.error("Error fetching beers:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    loadBeers();
  }, [dispatch]);

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <ClipLoader color="#123abc" size={100} />
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<BrowseBeers />} />
        <Route path="/favorites" element={<FavoriteBeers />} />
      </Routes>
      {isModalOpen && <Modal />}
    </Router>
  );
};

export default App;
