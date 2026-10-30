"use client";
import "./Footer.css";
import { useState, useEffect } from "react";

const Footer = () => {
  const [torontoTime, setTorontoTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const options = {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
        timeZone: "America/Toronto",
      };

      const formatter = new Intl.DateTimeFormat("en-US", options);
      const timeString = formatter.format(new Date());
      setTorontoTime(timeString);
    };

    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="footer">
      <div className="footer-col">
        <p>&copy;2026 All rights reserved</p>
      </div>
      <div className="footer-col">
        <div className="footer-clock">
          <p>Montréal, QC {torontoTime}</p>
        </div>
        <div className="footer-author">
          <p>
            Ostra — Independent design resources
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
