import './App.css';
import Timer from "./component/timer";
import Settings from "./component/settings";
import {useState} from "react";
import SettingsContext from "./component/settingsContext";


function App() {
    const [showSettings, setShowSettings] = useState(false);
    const [workMinutes, setWorkMinutes] = useState(45);
    const [breakMinutes, setBreakMinutes] = useState(15)
    return (
        <div className="App">
            <SettingsContext.Provider value={{
                showSettings,
                setShowSettings,
                workMinutes,
                breakMinutes,
                setWorkMinutes,
                setBreakMinutes,
            }}>
            {showSettings ? <Settings/> : <Timer/> }
            </SettingsContext.Provider>
        </div>
    );
}

export default App;
