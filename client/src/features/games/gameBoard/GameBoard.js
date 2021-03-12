import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  selectCurrentGame,
  TOGGLE_DOUBLEJ,
  TOGGLE_MODAL,
  selectModal,
  SET_QUESTION_VALUE,
  selectCurrentValue,
  INCREMENT_SCORE,
  DECREMENT_SCORE,
  updateGameScore,
} from "../gamesSlice";
import Modal from "./QuestionModal";

const jeopardy = ["$200", "$400", "$600", "$800", "$1000"];
const doubleJeopardy = ["$400", "$800", "$1200", "$1600", "$2000"];

const GameBoard = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector(selectCurrentGame);
  const showDJ = currentGame.game.showDoubleJeopardy;
  const showModal = useSelector(selectModal);
  const currentValue = useSelector(selectCurrentValue);

  const [wagerObject, setWagerObject] = useState({
    wager: "",
  });

  const { wager } = wagerObject;

  const wagerInt = parseInt(wager);

  const noWager = isNaN(wagerInt);

  const handleDJClick = (e) => {
    e.preventDefault();
    dispatch(TOGGLE_DOUBLEJ());
  };

  const handleDollarClick = (e) => {
    e.preventDefault();
    const value = e.target.innerText;
    const editedValue = value.slice(1);
    const numValue = parseInt(editedValue);
    dispatch(SET_QUESTION_VALUE(numValue));
    dispatch(TOGGLE_MODAL());
  };

  const checkWager = (response) => {
    if (currentGame.game.score < 1000) {
      if (wagerInt > 1000) {
        setWagerObject({ ...wagerObject, wager: "" });
        return alert("Cannot wager more than $1000.");
      }
    } else if (wagerInt > currentGame.game.score) {
      setWagerObject({ ...wagerObject, wager: "" });
      return alert("Cannot wager more than current earnings.");
    } else if (response === "correct") {
      dispatch(INCREMENT_SCORE(wagerInt));

      const id = currentGame.game._id;
      const score = currentGame.game.score + wagerInt;

      dispatch(updateGameScore({ id, score }));
      setWagerObject({ ...wagerObject, wager: "" });
      dispatch(TOGGLE_MODAL());
    } else if (response === "incorrect") {
      dispatch(DECREMENT_SCORE(wagerInt));
      const id = currentGame.game._id;
      const score = currentGame.game.score - wagerInt;
      dispatch(updateGameScore({ id, score }));
      setWagerObject({ ...wagerObject, wager: "" });
      dispatch(TOGGLE_MODAL());
    }
  };

  const handleCorrectAnswer = (e) => {
    e.preventDefault();
    if (noWager) {
      dispatch(INCREMENT_SCORE(currentValue));

      const id = currentGame.game._id;
      const score = currentGame.game.score + currentValue;

      dispatch(updateGameScore({ id, score }));
      dispatch(TOGGLE_MODAL());
    } else {
      checkWager("correct");
    }
  };

  const hanldeIncorrectAnswer = (e) => {
    e.preventDefault();
    if (noWager) {
      dispatch(DECREMENT_SCORE(currentValue));
      const id = currentGame.game._id;
      const score = currentGame.game.score - currentValue;
      dispatch(updateGameScore({ id, score }));
      dispatch(TOGGLE_MODAL());
    } else {
      checkWager("incorrect");
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setWagerObject({ ...wagerObject, [name]: parseInt(value) });
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

  if (showDJ === true) {
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
        <span>Earnings: ${currentGame.game.score}</span>
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
              <button onClick={(e) => handleCorrectAnswer(e)}>Correct</button>
            </div>
            <div className="col">
              <button onClick={(e) => hanldeIncorrectAnswer(e)}>
                Incorrect
              </button>
            </div>
            <div className="row m-2">
              For Daily Double, please place your wager below.
            </div>
            <div className="row m-2">
              <div className="form-group">
                <label htmlFor="wager">Wager:</label>
                <input
                  name="wager"
                  id="wager"
                  value={wager}
                  onChange={handleInputChange}
                  className="form-control"
                  type="number"
                  placeholder="$1000"
                />
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameBoard;
