import { useEffect, useState } from "react";
import "./styles/Loading.css";
import { useLoading } from "../context/LoadingProvider";

const Loading = ({ percent }: { percent: number }) => {
  const { setIsLoading } = useLoading();
  const [loaded, setLoaded] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [clicked, setClicked] = useState(false);

  if (percent >= 100) {
    setTimeout(() => {
      setLoaded(true);
      setTimeout(() => {
        setIsLoaded(true);
      }, 1000);
    }, 600);
  }

  useEffect(() => {
    import("./utils/initialFX").then((module) => {
      if (isLoaded) {
        setClicked(true);
        setTimeout(() => {
          if (module.initialFX) {
            module.initialFX();
          }
          setIsLoading(false);
        }, 900);
      }
    });
  }, [isLoaded]);

  return (
    <div className={`modern-loading-screen ${clicked ? "fade-out" : ""}`}>
      <div className="modern-loading-content">
        <div className="modern-loading-top">
          <div className="modern-loading-logo">GS</div>
          <div className="modern-loading-role">DATA ENGINEER &bull; AI/ML DEVELOPER</div>
        </div>

        <div className="modern-loading-middle">
          <h1 className="modern-loading-title">
            {loaded ? "READY" : "LOADING"}
          </h1>
          <div className="modern-loading-percentage">
            {percent.toString().padStart(3, "0")} <span className="percent-sign">%</span>
          </div>
        </div>

        <div className="modern-loading-bottom">
          <div className="modern-loading-bar-bg">
            <div 
              className="modern-loading-bar-fill" 
              style={{ width: `${percent}%` }}
            ></div>
          </div>
          <div className="modern-loading-status">
            {percent === 100 ? "System initialized" : "Preparing assets..."}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;

export const setProgress = (setLoading: (value: number) => void) => {
  let percent: number = 0;

  let interval = setInterval(() => {
    if (percent <= 50) {
      let rand = Math.round(Math.random() * 5);
      percent = percent + rand;
      setLoading(percent);
    } else {
      clearInterval(interval);
      interval = setInterval(() => {
        percent = percent + Math.round(Math.random());
        setLoading(percent);
        if (percent > 91) {
          clearInterval(interval);
        }
      }, 2000);
    }
  }, 100);

  function clear() {
    clearInterval(interval);
    setLoading(100);
  }

  function loaded() {
    return new Promise<number>((resolve) => {
      clearInterval(interval);
      interval = setInterval(() => {
        if (percent < 100) {
          percent++;
          setLoading(percent);
        } else {
          resolve(percent);
          clearInterval(interval);
        }
      }, 2);
    });
  }
  return { loaded, percent, clear };
};
