import React, { useEffect, useState, forwardRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectAuth, loadUser } from "../auth/authSlice";
import { getGames, createGame } from "../games/gamesSlice";
import GameList from "../games/gamelist/GameList";
import Header from "../header/Header";
import Footer from "../footer/Footer";
import DatePicker, { CalendarContainer } from "react-datepicker";
import Loading from "../loading/Loading";

const Dashboard = () => {
  const dispatch = useDispatch();
  const auth = useSelector(selectAuth);
  const [gameDate, setGameDate] = useState(new Date());
  const [loadWheel, setLoadWheel] = useState(true);

  useEffect(() => {
    if (!auth.user) {
      dispatch(loadUser());
    }
    if (auth.isAuthenticated) {
      dispatch(getGames(auth.user._id));
      setTimeout(() => {
        setLoadWheel(false);
      }, 700);
    }
    dispatch(getGames(auth.user._id));
  }, [auth.user, dispatch]);

  // Dispatches createGame and adds new game to db
  const submitNewGame = (e) => {
    e.preventDefault();
    dispatch(
      createGame({
        userId: auth.user._id,
        username: auth.user.username,
        gameDate: gameDate,
      })
    );
  };

  // Custom input for calendar component
  const CustomInput = forwardRef(({ value, onClick }, ref) => (
    <button className="custom-input button purpbtn" onClick={onClick} ref={ref}>
      {value}
    </button>
  ));

  // Custom container for calendar component
  const MyContainer = ({ className, children }) => {
    return (
      <div style={{ padding: "16px", background: "#5e17eb", color: "#fff" }}>
        <CalendarContainer className={className}>
          <div style={{ background: "#f0f0f0" }}>Please select a date.</div>
          <div style={{ position: "relative" }}>{children}</div>
        </CalendarContainer>
      </div>
    );
  };

  if (loadWheel === true) {
    return <Loading />;
  } else {
    return (
      <>
        <Header />
        <div className="container dashboard">
          <div className="row">
            <h5>Welcome, {auth.user.username}!</h5>
          </div>
          <div className="row">
            <div className="col-7">
              <div className="form-group">
                <label htmlFor="gameDate">Select Game Date: </label>
                <DatePicker
                  selected={gameDate}
                  onChange={(date) => {
                    setGameDate(date);
                  }}
                  name="gameDate"
                  dateFormat="MM/dd/yyyy"
                  popperClassName="popper"
                  popperPlacement="bottom-end"
                  customInput={<CustomInput />}
                  calendarContainer={MyContainer}
                  popperModifiers={{
                    offset: {
                      enabled: true,
                      offset: "5px, 10px",
                    },
                    preventOverflow: {
                      enabled: true,
                      escapeWithReference: false,
                      boundariesElement: "viewport",
                    },
                  }}
                />
              </div>
            </div>

            <div className="col-5">
              <button
                className="button new-game purpbtn"
                onClick={(e) => submitNewGame(e)}
              >
                Create New Game
              </button>
            </div>
          </div>
          <hr />
          <h5>Games:</h5>
          <div className="row">
            <GameList />
          </div>
        </div>
        <Footer />
      </>
    );
  }
};

export default Dashboard;
