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
  selectFinalJeopardy,
  TOGGLE_FJ,
} from "../gamesSlice";
import Modal from "./QuestionModal";
import { SET_ALERT } from "../../alert/alertSlice";

const jeopardy = ["$200", "$400", "$600", "$800", "$1000"];
const doubleJeopardy = ["$400", "$800", "$1200", "$1600", "$2000"];

const GameBoard = () => {
  const dispatch = useDispatch();
  const currentGame = useSelector(selectCurrentGame);
  const showDJ = currentGame.game.showDoubleJeopardy;
  const showModal = useSelector(selectModal);
  const currentValue = useSelector(selectCurrentValue);
  const showFJ = useSelector(selectFinalJeopardy);

  const [wagerObject, setWagerObject] = useState({
    wager: "",
    finalJWager: "",
  });

  const { wager, finalJWager } = wagerObject;

  const wagerInt = parseInt(wager);
  const finalJWagerInt = parseInt(finalJWager);

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

  const handleFJClick = (e) => {
    e.preventDefault();
    dispatch(TOGGLE_FJ());
  };

  const checkWager = (response) => {
    if (response === "correct") {
      if (currentGame.game.score < 1000) {
        if (wagerInt > 1000) {
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(
            SET_ALERT({
              message: "Cannot wager more than $1000.",
              type: "danger",
            })
          );
        } else {
          dispatch(INCREMENT_SCORE(wagerInt));

          const id = currentGame.game._id;
          const score = currentGame.game.score + wagerInt;

          dispatch(updateGameScore({ id, score }));
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(TOGGLE_MODAL());
        }
      } else {
        if (wagerInt > currentGame.game.score) {
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(
            SET_ALERT({
              message: "Cannot wager more than current earnings.",
              type: "danger",
            })
          );
        } else {
          dispatch(INCREMENT_SCORE(wagerInt));

          const id = currentGame.game._id;
          const score = currentGame.game.score + wagerInt;

          dispatch(updateGameScore({ id, score }));
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(TOGGLE_MODAL());
        }
      }
    } else if (response === "incorrect") {
      if (currentGame.game.score < 1000) {
        if (wagerInt > 1000) {
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(
            SET_ALERT({
              message: "Cannot wager more than $1000.",
              type: "danger",
            })
          );
        } else {
          dispatch(DECREMENT_SCORE(wagerInt));

          const id = currentGame.game._id;
          const score = currentGame.game.score - wagerInt;

          dispatch(updateGameScore({ id, score }));
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(TOGGLE_MODAL());
        }
      } else {
        if (wagerInt > currentGame.game.score) {
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(
            SET_ALERT({
              message: "Cannot wager more than current earnings.",
              type: "danger",
            })
          );
        } else {
          dispatch(DECREMENT_SCORE(wagerInt));

          const id = currentGame.game._id;
          const score = currentGame.game.score - wagerInt;

          dispatch(updateGameScore({ id, score }));
          setWagerObject({ ...wagerObject, wager: "" });
          dispatch(TOGGLE_MODAL());
        }
      }
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

  const checkFJWager = (response) => {
    if (finalJWagerInt > currentGame.game.score) {
      return dispatch(
        SET_ALERT({
          message: "Cannot wager more than current earnings.",
          type: "danger",
        })
      );
    } else if (response === "correct") {
      dispatch(INCREMENT_SCORE(finalJWagerInt));

      const id = currentGame.game._id;
      const score = currentGame.game.score + finalJWagerInt;

      dispatch(updateGameScore({ id, score }));
      setWagerObject({ ...wagerObject, finalJWager: "" });
      dispatch(TOGGLE_FJ());
    } else if (response === "incorrect") {
      dispatch(DECREMENT_SCORE(finalJWagerInt));

      const id = currentGame.game._id;
      const score = currentGame.game.score - finalJWagerInt;

      dispatch(updateGameScore({ id, score }));
      setWagerObject({ ...wagerObject, finalJWager: "" });
      dispatch(TOGGLE_FJ());
    }
  };

  const handleFJ = (e, response) => {
    e.preventDefault();
    if (response === "correct") {
      checkFJWager("correct");
    } else {
      checkFJWager("incorrect");
    }
  };

  let dollarAmounts = jeopardy.map((dollarAmount) => (
    <button
      className="dollar-button"
      onClick={(e) => {
        handleDollarClick(e);
      }}
      key={dollarAmount}
    >
      <div className="card">
        <div className="card-body">
          <h5 className="card-title">{dollarAmount}</h5>
        </div>
      </div>
    </button>
  ));

  if (showDJ === true) {
    dollarAmounts = doubleJeopardy.map((dollarAmount) => (
      <button
        className="dollar-button"
        onClick={(e) => {
          handleDollarClick(e);
        }}
        key={dollarAmount}
      >
        <div className="card">
          <div className="card-body">
            <h5 className="card-title">{dollarAmount}</h5>
          </div>
        </div>
      </button>
    ));
  }

  return (
    <>
      <div className="row mb-2">
        <h5>Earnings: ${currentGame.game.score}</h5>
      </div>
      <div className="row">{dollarAmounts}</div>
      {showDJ === false && (
        <div className="row justify-content-center mt-4">
          <button
            className="button btn game-nav"
            onClick={(e) => handleDJClick(e)}
          >
            Move to Double Jeopardy!
          </button>
        </div>
      )}
      {showDJ === true && (
        <>
          <div className="row justify-content-center mt-4">
            <div className="col-6" align="center">
              <button
                className="button btn game-nav"
                onClick={(e) => handleDJClick(e)}
              >
                Back to prior round.
              </button>
            </div>
            <div className="col-6" align="center">
              <button
                className="button btn game-nav"
                onClick={(e) => handleFJClick(e)}
              >
                Final Jeopardy!
              </button>
            </div>
          </div>
        </>
      )}
      <Modal isOpen={showModal} handleClose={() => dispatch(TOGGLE_MODAL())}>
        <div className="container">
          <div className="row m-2">
            <h3>${currentValue}</h3>
          </div>
          <div className="row m-2">
            <div className="col">
              <button
                className="button btn answer"
                onClick={(e) => handleCorrectAnswer(e)}
              >
                Correct
              </button>
            </div>
            <div className="col">
              <button
                className="button btn answer"
                onClick={(e) => hanldeIncorrectAnswer(e)}
              >
                Incorrect
              </button>
            </div>
            <div className="row m-2">
              For Daily Double, please place your wager below:
            </div>
            <div className="row m-2">
              <div className="form-group">
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
      <Modal isOpen={showFJ} handleClose={() => dispatch(TOGGLE_FJ())}>
        <div className="container">
          <div className="row m-2">
            <h3>Final Jeopardy!</h3>
          </div>
          <div className="row m-2">
            <div className="col">
              <button
                className="button btn answer"
                onClick={(e) => handleFJ(e, "correct")}
              >
                Correct
              </button>
            </div>
            <div className="col">
              <button
                className="button btn answer"
                onClick={(e) => handleFJ(e, "incorrect")}
              >
                Incorrect
              </button>
            </div>
          </div>
          <div className="row">
            <p>Please enter your wager below:</p>
          </div>
          <div className="row m-2">
            <div className="form-group">
              <input
                name="finalJWager"
                id="finalJWager"
                value={finalJWager}
                onChange={handleInputChange}
                className="form-control"
                type="number"
                placeholder="$1000"
              />
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default GameBoard;
