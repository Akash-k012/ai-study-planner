import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

export default function TimerPage() {
  const [minutes, setMinutes] = useState(25);
  const [seconds, setSeconds] = useState(1500);
  const [running, setRunning] = useState(false);
  const [laps, setLaps] = useState([]);

  useEffect(() => {
    let interval;

    if (running && seconds > 0) {
      interval = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [running, seconds]);

  const format = (time) => {
    const m = Math.floor(time / 60);
    const s = time % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const setCustomTime = () => {
    setSeconds(minutes * 60);
    setRunning(false);
    setLaps([]);
  };

  
  const addLap = () => {
    const lapTime = format(seconds);
    setLaps((prev) => [...prev, lapTime]);
  };

  return (
    <div className="flex min-h-screen bg-black text-white relative overflow-hidden">

     
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-indigo-600 via-purple-600 to-blue-600 opacity-80"></div>

      <Sidebar />

      <div className="ml-64 flex-1 flex items-center justify-center p-8">

        <div className="bg-white/10 backdrop-blur-lg p-10 rounded-2xl border border-white/10 shadow-lg text-center w-full max-w-md">

          <h1 className="text-xl font-semibold mb-4">Study Timer ⏱️</h1>

          
          <div className="mb-4 flex items-center justify-center gap-2">
            <input
              type="number"
              value={minutes}
              onChange={(e) => setMinutes(e.target.value)}
              className="w-20 p-2 rounded bg-white/10 border border-white/20 text-center"
            />
            <span>min</span>

            <button
              onClick={setCustomTime}
              className="px-3 py-1 bg-white text-black rounded"
            >
              Set
            </button>
          </div>

          {/* Timer */}
          <div className="text-5xl font-bold mb-6">
            {format(seconds)}
          </div>

          {/* Controls */}
          <div className="flex gap-3 justify-center mb-6">

            <button
              onClick={() => setRunning(true)}
              className="bg-green-500 px-4 py-2 rounded"
            >
              Start
            </button>

            <button
              onClick={() => setRunning(false)}
              className="bg-yellow-500 px-4 py-2 rounded"
            >
              Pause
            </button>

            <button
              onClick={() => {
                setSeconds(minutes * 60);
                setRunning(false);
                setLaps([]);
              }}
              className="bg-red-500 px-4 py-2 rounded"
            >
              Reset
            </button>

          </div>

          
          <button
            onClick={addLap}
            className="bg-purple-500 px-4 py-2 rounded mb-4"
          >
            Add Lap
          </button>

          
          {laps.length > 0 && (
            <div className="mt-4 text-left max-h-40 overflow-y-auto">

              <h3 className="font-semibold mb-2">Laps</h3>

              {laps.map((lap, i) => (
                <div
                  key={i}
                  className="flex justify-between bg-white/10 p-2 rounded mb-2"
                >
                  <span>Lap {i + 1}</span>
                  <span>{lap}</span>
                </div>
              ))}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}