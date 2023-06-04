import React, { useRef, useState, useEffect } from "react";
import "./Workhour.css";

const initObj = {
  Monday: {
    morning: { open: "10:00", close: "12:00", closed: false },
    afternoon: { open: "12:00", close: "23:59", closed: false },
  },
  Tuesday: {
    morning: { open: "10:00", close: "12:00", closed: false },
    afternoon: { open: "12:00", close: "23:59", closed: false },
  },
  Wednesday: {
    morning: { open: "10:00", close: "12:00", closed: false },
    afternoon: { open: "12:00", close: "23:59", closed: false },
  },
  Thursday: {
    morning: { open: "10:00", close: "12:00", closed: false },
    afternoon: { open: "12:00", close: "23:59", closed: false },
  },
  Friday: {
    morning: { open: "10:00", close: "12:00", closed: false },
    afternoon: { open: "12:00", close: "23:59", closed: false },
  },
  Saturday: {
    morning: { open: "10:00", close: "12:00", closed: false },
    afternoon: { open: "12:00", close: "23:59", closed: false },
  },
  Sunday: {
    morning: { open: "10:00", close: "12:00", closed: false },
    afternoon: { open: "12:00", close: "23:59", closed: false },
  },
};
function Workhour() {
  const [value, setValue] = useState(
    JSON.parse(sessionStorage.getItem("tableData")) || initObj
  );
  const [isSubmitted, setIsSubmitted] = useState(
    sessionStorage.getItem("finalTable") || false
  );
  const format = "HH:mm";

  const weekDays = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  const onChange = (timeValue, day, noon, timings) => {
    const temp = value;
    temp[day][noon][timings] = timeValue.target.value;
    console.log(timeValue);
    setValue({ ...temp });
  };
  
  const handleClick = (day, noon) => {
    const temp = JSON.parse(JSON.stringify(value));
    temp[day][noon].closed = !temp[day][noon].closed;
    temp[day][noon].open = "00:00";
    temp[day][noon].close = "00:00";
    console.log(temp);
    setValue({ ...temp });
  };

  const handleSubmit = () => {
    sessionStorage.setItem("finalTable", !isSubmitted);
    sessionStorage.setItem("tableData", JSON.stringify(value));
    setIsSubmitted(!isSubmitted);
  };

  return (
    <div className="mainContainer">
      {!isSubmitted ? (
        <>
        <div className="fDiv">INSERT THE TIMINGS</div>
        <table className="firstTable">
          <tr>
            <th>DAYS</th>
            <th>Morning</th>
            <th>Closed</th>
            <th>Afternoon</th>
            <th>Closed</th>
          </tr>
          {weekDays.map((day) => {
            return (
              <tr>
                <td>{day}</td>
                <td>
                  <input
                    type="time"
                    onChange={(timeValue)=>
                      onChange(timeValue, day, "morning", "open")
                    }
                    disabled={value[day]["morning"]?.closed}
                    value={value[day]["morning"]?.open}
                  />
                  <input
                    type="time"
                    onChange={(timeValue) =>
                      onChange(timeValue, day, "morning", "close")
                    }
                    disabled={value[day]["morning"].closed}
                    value={value[day]["morning"]?.close}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleClick(day, "morning")}
                    defaultChecked={value[day]["morning"].closed}
                  />
                  closed
                </td>
                <td>
                  <input
                    type="time"
                    onChange={(timeValue) =>
                      onChange(timeValue, day, "afternoon", "open")
                    }
                    disabled={value[day]["afternoon"].closed}
                    value={value[day]["afternoon"]?.open}
                  />
                  <input
                    type="time"
                    onChange={(timeValue) =>
                      onChange(timeValue, day, "afternoon", "close")
                    }
                    disabled={value[day]["afternoon"].closed}
                    value={value[day]["afternoon"]?.close}
                  />
                </td>
                <td>
                  <input
                    type="checkbox"
                    onChange={() => handleClick(day, "afternoon")}
                    defaultChecked={value[day]["afternoon"].closed}
                  />
                  closed
                </td>
              </tr>
            );
          })}
        </table>
        </>
      ) : (
        <>
          <div className="topDiv">Final Table</div>

          <table>
            <tr>
              <th>DAYS</th>
              <th>Morning</th>
              <th>Afternoon</th>
            </tr>
            {weekDays.map((day) => {
              return (
                <tr>
                  <td>{day}</td>
                  <td>
                    <span>
                      {value[day]["morning"].closed
                        ? "Closed"
                        : `${value[day]["morning"]?.open} -${value[day]["morning"]?.close}`}
                    </span>
                  </td>
                  <td>
                    <span>
                      {value[day]["afternoon"].closed
                        ? "Closed"
                        : `${value[day]["afternoon"]?.open} -${value[day]["afternoon"]?.close}`}
                    </span>
                  </td>
                </tr>
              );
            })}
          </table>
        </>
      )}

      <button className="primaryButton" onClick={handleSubmit}>
        {!isSubmitted ? "Submit" : "Reset"}
      </button>
    </div>
  );
}

export default Workhour;
