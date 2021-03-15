import React from "react";
import { useSelector } from "react-redux";
import { selectProfile } from "../profileSlice";
import { Line } from "react-chartjs-2";

const ProfileChart = () => {
  const profile = useSelector(selectProfile);
  const { games } = profile;

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

  const gameDates = games.map((game) => {
    return formatDate(game.date);
  });

  const gameScores = games.map((game) => {
    return parseInt(game.score);
  });

  const state = {
    labels: gameDates.reverse(),
    datasets: [
      {
        label: "Winnings",
        fill: false,
        lineTension: 0.5,
        backgroundColor: "rgba(75,192,192,1)",
        borderColor: "rgba(0,0,0,1)",
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
            },
            legend: {
              display: true,
              position: "right",
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    callback: function (value, index, values) {
                      return "$" + value;
                    },
                    suggestedMax: 30000,
                    suggestedMin: 0,
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
