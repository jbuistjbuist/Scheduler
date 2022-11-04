import { useState } from "react"


const useVisualMode = function(initial) {

  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial])

  const transition = function(newMode, replace = false) {
    if (replace) {
      setHistory(prev => {
        const prevMod = prev.slice(0, -1);
        return [...prevMod, newMode];
      })
    } else {
      setHistory(prev => [...prev, newMode])
    }

    setMode(newMode);
    
  }

  const back = function() {
    if (history.length > 1) {
      setHistory(prev => {
        setMode(prev[prev.length - 2]);
        return prev.slice(0, -1);
      })
    }
  }

  

  return { mode, transition, back }
}

export default useVisualMode;