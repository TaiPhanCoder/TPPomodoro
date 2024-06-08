import React, { useState, useEffect, useRef } from 'react';
import './index.css';
import Logo from './Picture/logo.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSquarePollVertical, faCog, faSignInAlt, faBars } from '@fortawesome/free-solid-svg-icons';
import SettingsMenu from './components/SettingsMenu';
import motivationalQuotes from './motivationalQuotes';

function App() {
  const [menuVisible, setMenuVisible] = useState(false);
  const [selectedButton, setSelectedButton] = useState('pomodoro');
  const [settingsVisible, setSettingsVisible] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25);
  const [shortBreakTime, setShortBreakTime] = useState(5);
  const [longBreakTime, setLongBreakTime] = useState(15);
  const [autoStartBreaks, setAutoStartBreaks] = useState(false);
  const [autoStartPomodoros, setAutoStartPomodoros] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [timeLeft, setTimeLeft] = useState(pomodoroTime * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [quote, setQuote] = useState('');
  const intervalRef = useRef(null);
  const quoteIntervalRef = useRef(null);
  const quoteContainerRef = useRef(null);

  useEffect(() => {
    setTimeLeft(pomodoroTime * 60);
    setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
  }, [pomodoroTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTimeLeft((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else {
      clearInterval(intervalRef.current);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  useEffect(() => {
    quoteIntervalRef.current = setInterval(() => {
      setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
    }, 2000);
    return () => clearInterval(quoteIntervalRef.current);
  }, []);

  useEffect(() => {
    adjustQuoteHeight();
  }, [quote]);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    if (buttonName === 'pomodoro') setTimeLeft(pomodoroTime * 60);
    if (buttonName === 'shortBreak') setTimeLeft(shortBreakTime * 60);
    if (buttonName === 'longBreak') setTimeLeft(longBreakTime * 60);
    setIsRunning(false);
  };

  const toggleSettings = () => {
    setSettingsVisible(!settingsVisible);
  };

  const handleStartPause = () => {
    setIsRunning((prev) => !prev);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const adjustQuoteHeight = () => {
    if (quoteContainerRef.current) {
      const lineHeight = parseFloat(window.getComputedStyle(quoteContainerRef.current).lineHeight);
      const lines = Math.ceil(quoteContainerRef.current.scrollHeight / lineHeight);
      const height = lines > 1 ? lineHeight * 2.5 : lineHeight * 2; // Adjust height based on number of lines
      quoteContainerRef.current.style.height = `${height}px`;
      quoteContainerRef.current.style.display = 'flex';
      quoteContainerRef.current.style.alignItems = 'center';
      quoteContainerRef.current.style.justifyContent = 'center';
    }
  };

  return (
    <div className={`${darkMode ? 'bg-gray-900 text-white' : 'bg-blue-50 text-black'} min-h-screen overflow-hidden`}>
      <header className={`flex justify-between items-center p-4 shadow-md border-b-2 px-10 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-white border-blue-300'}`}>
        <div className="flex items-center space-x-4">
          <a href="/" className="flex items-center space-x-2">
            <img src={Logo} alt="Pomofocus Logo" className="w-12 h-12 rounded-full" />
            <span className="text-xl font-bold">TP POMODORO</span>
          </a>
        </div>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <button className={`px-4 py-2 rounded flex items-center shadow-md transform hover:scale-105 transition-transform ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                <FontAwesomeIcon icon={faSquarePollVertical} className="mr-2" />
                Report
              </button>
            </li>
            <li>
              <button onClick={toggleSettings} className={`px-4 py-2 rounded flex items-center shadow-md transform hover:scale-105 transition-transform ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                <FontAwesomeIcon icon={faCog} className="mr-2" />
                Setting
              </button>
            </li>
            <li>
              <button className={`px-4 py-2 rounded flex items-center shadow-md transform hover:scale-105 transition-transform ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                <FontAwesomeIcon icon={faSignInAlt} className="mr-2" />
                Sign In
              </button>
            </li>
            <li className="relative">
              <button onClick={toggleMenu} className={`px-4 py-2 rounded shadow-md transform hover:scale-105 transition-transform focus:outline-none ${darkMode ? 'bg-gray-700 text-white hover:bg-gray-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}>
                <FontAwesomeIcon icon={faBars} />
              </button>
              {menuVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-20">
                  <button className="block text-left w-full px-4 py-2 text-gray-800 hover:bg-blue-500 hover:text-white transition duration-150 ease-in-out">Shortcuts</button>
                </div>
              )}
            </li>
          </ul>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center h-screen">
        <div className={`p-8 md:p-16 rounded-xl shadow-lg text-center ${darkMode ? 'bg-gray-800' : 'bg-blue-200'} w-full max-w-screen-md`}>
          <div className="flex justify-center space-x-4 mb-4">
            <button onClick={() => handleButtonClick('pomodoro')} className={`timer-btn ${selectedButton === 'pomodoro' ? 'bg-blue-800' : 'bg-blue-500'} text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transform hover:scale-105 transition-transform`}>Pomodoro</button>
            <button onClick={() => handleButtonClick('shortBreak')} className={`timer-btn ${selectedButton === 'shortBreak' ? 'bg-blue-800' : 'bg-blue-500'} text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transform hover:scale-105 transition-transform`}>Short Break</button>
            <button onClick={() => handleButtonClick('longBreak')} className={`timer-btn ${selectedButton === 'longBreak' ? 'bg-blue-800' : 'bg-blue-500'} text-white px-6 py-3 rounded-full shadow-md hover:bg-blue-600 transform hover:scale-105 transition-transform`}>Long Break</button>
          </div>
          <div className="text-8xl mb-4">
            {formatTime(timeLeft)}
          </div>
          <div ref={quoteContainerRef} className="bg-blue-600 text-white text-lg mb-4 px-6 py-3 md:py-4 rounded-full shadow-md break-words text-center transition-all duration-300 ease-in-out flex items-center justify-center">
            <div className="text-lg">
              {quote.length > 100 ? (
                <div className="text-sm">
                  {quote.split(/(?<=\.)|(?<=,)/).map((sentence, index) => (
                    <span key={index} className="block">{sentence.trim()}</span>
                  ))}
                </div>
              ) : (
                quote
              )}
            </div>
          </div>
          <button onClick={handleStartPause} className="bg-white text-blue-700 px-8 py-4 rounded-full shadow-md hover:bg-blue-100 transform hover:scale-105 transition-transform">
            {isRunning ? 'PAUSE' : 'START'}
          </button>
        </div>
      </main>

      <SettingsMenu
        isVisible={settingsVisible}
        onClose={toggleSettings}
        pomodoroTime={pomodoroTime}
        setPomodoroTime={setPomodoroTime}
        shortBreakTime={shortBreakTime}
        setShortBreakTime={setShortBreakTime}
        longBreakTime={longBreakTime}
        setLongBreakTime={setLongBreakTime}
        autoStartBreaks={autoStartBreaks}
        setAutoStartBreaks={setAutoStartBreaks}
        autoStartPomodoros={autoStartPomodoros}
        setAutoStartPomodoros={setAutoStartPomodoros}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    </div>
  );
}

export default App;
