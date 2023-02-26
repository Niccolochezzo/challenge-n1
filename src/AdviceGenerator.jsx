import { useEffect, useState } from "react";
import "./AdviceGenerator.css";
import img1 from "./images/pattern-divider-desktop.svg";
import img2 from "./images/icon-dice.svg";

function AdviceGenerator() {
  const [advice, setAdvice] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    setIsLoading(true);
    fetch("https://api.adviceslip.com/advice")
      .then((response) => response.json())
      .then((data) => {
        setAdvice(data.slip.advice);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleClick = () => {
    fetchAdvice();
  };

  return (
    <div className="adviceGenerator">
      <div className="board">
        <h1>ADVICE #100</h1>
        {isLoading ? (
          <p>Loading advice...</p>
        ) : (
          <>
            <p>{advice}</p>
            <img src={img1} alt="img1" />
            <img src={img2} alt="img2" onClick={handleClick} />
          </>
        )}
      </div>
    </div>
  );
}

export default AdviceGenerator;
