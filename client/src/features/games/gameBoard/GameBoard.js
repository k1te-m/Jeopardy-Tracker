import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentGame,
  TOGGLE_DOUBLEJ,
  TOGGLE_MODAL,
  selectModal,
  SET_QUESTION_VALUE,
  selectCurrentValue,
} from "../gamesSlice";
// import { selectModal, TOGGLE_MODAL } from "../gameModalSlice";
import Modal from "./QuestionModal";

const jeopardy = ["$200", "$400", "$600", "$800", "$1000"];
const doubleJeopardy = ["$400", "$800", "$1200", "$1600", "$2000"];

const GameBoard = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector(selectCurrentGame);
  const showDJ = currentGame.game.showDoubleJeopardy;
  const showModal = useSelector(selectModal);
  const currentValue = useSelector(selectCurrentValue);

  console.log(showDJ);

  const handleDJClick = (e, data) => {
    e.preventDefault();
    dispatch(TOGGLE_DOUBLEJ());
    console.log(e.target.innerText);
  };

  const handleDollarClick = (e) => {
    e.preventDefault();
    console.log(e.target.innerText);
    const value = e.target.innerText;
    const editedValue = value.slice(1);
    const numValue = parseInt(editedValue);
    dispatch(SET_QUESTION_VALUE(numValue));
    dispatch(TOGGLE_MODAL());
  };

  let dollarAmounts = jeopardy.map((dollarAmount) => (
    <a
      onClick={(e) => {
        handleDollarClick(e);
      }}
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{dollarAmount}</h5>
        </div>
      </div>
    </a>
  ));

  if (showDJ == true) {
    dollarAmounts = doubleJeopardy.map((dollarAmount) => (
      <a
        onClick={(e) => {
          handleDollarClick(e);
        }}
      >
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
        <button onClick={(e) => handleDJClick(e)}>Double Jeopardy!</button>
      </div>
      <Modal isOpen={showModal} handleClose={() => dispatch(TOGGLE_MODAL())}>
        <div className="container">
          <div className="row m-2">
            <h3>${currentValue}</h3>
          </div>
          <div className="row m-2">
            <div className="col">
              <button>Correct</button>
            </div>
            <div className="col">
              <button>Incorrect</button>
            </div>
            <div className="row m-2">
              For Daily Double, please place your wager below.
            </div>
            <div className="row m-2">
              <form>
                <label for="wager">Wager:</label>
                <input name="wager" id="wager" />
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameBoard;
