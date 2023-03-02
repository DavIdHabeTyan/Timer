import React, {useContext} from 'react';
import ReactSlider from "react-slider";
import './slider.css'
import SettingsContext from "./settingsContext";
import BackButton from "./buttons/backButton";

const Settings = () => {
    const settingsInfo = useContext(SettingsContext)
    return (
        <div className={'settings'}>
            <label htmlFor=""> work: {settingsInfo.workMinutes}:00 </label>
            <ReactSlider
                className={'slider'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.workMinutes}
                onChange={newValue => settingsInfo.setWorkMinutes(newValue)}
                min={1}
                max={120}
            />
            <label htmlFor="">break: {settingsInfo.breakMinutes}:00 </label>
            <ReactSlider
                className={'slider green'}
                thumbClassName={'thumb'}
                trackClassName={'track'}
                value={settingsInfo.breakMinutes}
                onChange={newValue => settingsInfo.setBreakMinutes(newValue)}
                min={1}
                max={120}
            />
            <div style={{textAlign:'center'}}>
                <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
            </div>

        </div>
    );
};

export default Settings;