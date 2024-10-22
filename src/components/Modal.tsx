import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store";
import { closeModal } from "../store/modalSlice";
import "../styles/Modal.css";

const Modal: React.FC = () => {
  const dispatch = useDispatch();
  const beerId = useSelector((state: RootState) => state.modal.beerId);
  const beer = useSelector((state: RootState) =>
    state.beers.beers.find((beer) => beer.id === beerId)
  );

  if (beer) {
    return (
      <div className="modal-overlay">
        <div className="modal-content">
          <h2 className="modal-header">{beer.name}</h2>
          <div className="modal-body">
            <p>Price: {beer.price}</p>
            <p>Average Rating: {beer.rating.average.toFixed(2)}</p>
            <p>Food Pairing: {beer.foodPairing.join(", ")}</p>
            <p>Beer ID: {beerId}</p>
          </div>
          <div className="modal-footer">
            <button
              className="modal-button"
              onClick={() => dispatch(closeModal())}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Modal;
