import React from "react";
import { useSelector } from "react-redux";
import { selectProfile } from "../profileSlice";
import { Line } from "react-chartjs-2";

const ProfileChart = () => {
  const profile = useSelector(selectProfile);
  const { games } = profile;

  // Formats date to local time and provides day, month, and year
  const formatDate = (date) => {
    const dateObj = new Date(date);
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    const formattedDate = dateObj.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      timeZone: tz,
    });
    const formattedTime = formattedDate;
    return formattedTime;
  };

  // Returns formatted game dates for chart labels
  const gameDates = games.map((game) => {
    return formatDate(game.gameDate);
  });

  // Returns game scores for chart data in number format
  const gameScores = games.map((game) => {
    return parseInt(game.score);
  });

  // State for React Chart, using gameDates as labels and gameScores as data
  const state = {
    labels: gameDates.reverse(),
    datasets: [
      {
        label: "Winnings",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(130,55,148,1)",
        borderColor: "rgba(6,12,233,1)",
        borderWidth: 2,
        data: gameScores.reverse(),
      },
    ],
  };

  if (profile.games.length === 0) {
    return <></>;
  } else {
    return (
      <div>
        <Line
          data={state}
          options={{
            title: {
              display: true,
              text: "Daily Winnings!",
              fontSize: 20,
              fontColor: "black",
            },
            legend: {
              display: true,
              position: "right",
              labels: {
                fontColor: "black",
                fontSize: 12,
              },
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    fontColor: "black",
                    fontSize: 10,
                    callback: function (value, index, values) {
                      return "$" + value;
                    },
                    suggestedMax: 20000,
                    suggestedMin: 0,
                  },
                },
              ],
              xAxes: [
                {
                  ticks: {
                    fontColor: "black",
                    fontSize: 10,
                  },
                },
              ],
            },
          }}
        />
      </div>
    );
  }
};

export default ProfileChart;
