import React from 'react';
import {CircularProgressbar, buildStyles} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import PlayButton from "./buttons/playButton";
import PauseButton from "./buttons/pauseButton";
import SettingsButton from "./buttons/settingsButton";
import {useContext, useState, useEffect, useRef} from "react";
import SettingsContext from "./settingsContext";

const red = '#b20a1a';
const green = '#28be06';

const Timer = () => {
    const settingsInfo = useContext(SettingsContext);

    const [isPaused, setIsPaused] = useState(true);
    const [mode, setMode] = useState('work')
    const [secondsLeft, setSecondsLeft] = useState(0)

    const secondsLeftRef = useRef(secondsLeft);
    const isPausedRef = useRef(isPaused);
    const modeRef = useRef(mode);

    function switchMode() {
        const nextMode = modeRef.current === "work" ? 'break' : 'work';
        const nextSeconds = (nextMode === "work" ? settingsInfo.workMinutes : settingsInfo.breakMinutes) * 60;

        setMode(nextMode);
        modeRef.current = nextMode;

        setSecondsLeft(nextSeconds);
        secondsLeftRef.current = nextSeconds;
    };

    function tick() {
        secondsLeftRef.current--;
        setSecondsLeft(secondsLeftRef.current);
    }

    function initTimer() {
        setSecondsLeft(settingsInfo.workMinutes * 60)
    }

    useEffect(() => {
        initTimer();

      const interval =  setInterval(() => {
            if (isPausedRef.current) {
                return;
            }
            if (secondsLeftRef.current === 0) {
                return switchMode();
            }
            tick();
        }, 100);
      return () => clearInterval(interval);
    }, [settingsInfo])

    const totalSeconds = mode === 'work'
        ? settingsInfo.workMinutes * 60
        : settingsInfo.breakMinutes * 60;

    const percentage = Math.round(secondsLeft / totalSeconds * 100);

    const minutes = Math.floor(secondsLeft / 60);

    let seconds = secondsLeft % 60;
    if(seconds < 10) seconds = "0" + seconds

    return (
        <div className={'test'}>
            <CircularProgressbar
                value={percentage}
                text={minutes + ':' + seconds}
                styles={buildStyles({
                textColor: '#fff',
                pathColor: mode === "work" ? red : green,
                tailColor: 'rgba(255,255,255,.2)'
            })}/>
            <div>
                {isPaused
                    ? <PlayButton onClick={() => {setIsPaused(false); isPausedRef.current = false}}/>
                    : <PauseButton onClick={() => {setIsPaused(true); isPausedRef.current = true}}/>}
            </div>
            <div>
                <SettingsButton onClick={() => settingsInfo.setShowSettings(true)}/>
            </div>
        </div>
    );
};

export default Timer;