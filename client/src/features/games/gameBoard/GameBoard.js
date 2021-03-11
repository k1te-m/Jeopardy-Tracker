import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentGame, TOGGLE_DOUBLEJ } from "../gamesSlice";
import { selectModal, TOGGLE_MODAL } from "../gameModalSlice";
import Modal from "./QuestionModal";

const jeopardy = ["$200", "$400", "$600", "$800", "$1000"];
const doubleJeopardy = ["$400", "$800", "$1200", "$1600", "$2000"];

const GameBoard = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector(selectCurrentGame);
  const showDJ = currentGame.game.showDoubleJeopardy;
  const showModal = useSelector(selectModal);

  console.log(showDJ);

  const handleClick = (e, data) => {
    e.preventDefault();
    dispatch(TOGGLE_DOUBLEJ());
    console.log(e.target.innerText);
  };

  let dollarAmounts = jeopardy.map((dollarAmount) => (
    <a>
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{dollarAmount}</h5>
        </div>
      </div>
    </a>
  ));

  if (showDJ == true) {
    dollarAmounts = doubleJeopardy.map((dollarAmount) => (
      <a>
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{dollarAmount}</h5>
          </div>
        </div>
      </a>
    ));
  }

  return (
    <>
      <div className="row">
        <span>GameBoard</span>
      </div>
      <div className="row">{dollarAmounts}</div>
      <div className="row">
        <button onClick={(e) => handleClick(e)}>Double Jeopardy!</button>
      </div>
      <Modal isOpen={showModal} handleClose={() => dispatch(TOGGLE_MODAL())}>
        <div className="container"></div>
      </Modal>
    </>
  );
};

export default GameBoard;
