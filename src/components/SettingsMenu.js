import React, { useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import Logo from '../Picture/logo.png';

const SettingsMenu = ({
  isVisible,
  onClose,
  pomodoroTime,
  setPomodoroTime,
  shortBreakTime,
  setShortBreakTime,
  longBreakTime,
  setLongBreakTime,
  autoStartBreaks,
  setAutoStartBreaks,
  autoStartPomodoros,
  setAutoStartPomodoros,
  darkMode,
  setDarkMode,
}) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isVisible) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isVisible, onClose]);

  const handleSettingChange = (setter) => (e) => {
    setter(e.target.value);
  };

  return (
    isVisible && (
      <div className={`fixed inset-0 flex items-center justify-center ${darkMode ? 'bg-black bg-opacity-50' : 'bg-black bg-opacity-50'} z-30`}>
        <div ref={menuRef} className={`bg-white rounded-lg shadow-lg w-1/2 p-8 relative ${darkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
          <button onClick={onClose} className="absolute top-2 right-2 text-gray-600 hover:text-gray-900">
            <FontAwesomeIcon icon={faTimes} />
          </button>
          <h3 className="text-xl font-bold mb-4 flex items-center">
            <img src={Logo} alt="Logo" className="w-6 h-6 mr-2" /> Timer
          </h3>
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div>
              <label className="block mb-2 font-semibold">Pomodoro Time:</label>
              <input
                type="number"
                value={pomodoroTime}
                onChange={handleSettingChange(setPomodoroTime)}
                className={`block w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Short Break Time:</label>
              <input
                type="number"
                value={shortBreakTime}
                onChange={handleSettingChange(setShortBreakTime)}
                className={`block w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
            </div>
            <div>
              <label className="block mb-2 font-semibold">Long Break Time:</label>
              <input
                type="number"
                value={longBreakTime}
                onChange={handleSettingChange(setLongBreakTime)}
                className={`block w-full p-2 border rounded ${darkMode ? 'bg-gray-700 text-white' : 'bg-white text-black'}`}
              />
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <label className="mr-2 font-semibold">Auto Start Breaks:</label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="autoStartBreaks"
                id="autoStartBreaks"
                checked={autoStartBreaks}
                onChange={() => setAutoStartBreaks(!autoStartBreaks)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="autoStartBreaks"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <label className="mr-2 font-semibold">Auto Start Pomodoros:</label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="autoStartPomodoros"
                id="autoStartPomodoros"
                checked={autoStartPomodoros}
                onChange={() => setAutoStartPomodoros(!autoStartPomodoros)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="autoStartPomodoros"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
          <div className="mb-4 flex items-center">
            <label className="mr-2 font-semibold">Dark Mode:</label>
            <div className="relative inline-block w-10 mr-2 align-middle select-none">
              <input
                type="checkbox"
                name="darkMode"
                id="darkMode"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer"
              />
              <label
                htmlFor="darkMode"
                className="toggle-label block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer"
              ></label>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default SettingsMenu;
