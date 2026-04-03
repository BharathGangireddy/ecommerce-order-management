
import { useEffect, useState } from "react";

const DealsSection = () => {
  const [time, setTime] = useState(3600);

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  return (
    <div className="bg-red-500 text-white p-6 rounded-xl my-10">
      <h2 className="text-2xl font-bold">
        Flash Sale Ends In
      </h2>

      <p className="text-xl mt-2">
        {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
      </p>
    </div>
  );
};

export default DealsSection;