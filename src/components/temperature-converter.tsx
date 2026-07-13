import React, { useState } from 'react';

const TemperatureConverter: React.FC = () => {
  // We'll store the source of truth as Celsius
  const [celsius, setCelsius] = useState<string>('');

  const parseOrEmpty = (val: string): number | null => {
    const parsed = parseFloat(val);
    return isNaN(parsed) ? null : parsed;
  };

  const handleCelsiusChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCelsius(e.target.value);
  };

  // Format helpers to avoid long decimals, but allow typing
  const formatVal = (val: number | null): string => {
    if (val === null) return '';
    // Use Number() to drop trailing zeros after toFixed
    return Number(val.toFixed(2)).toString();
  };

  const handleFahrenheitChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseOrEmpty(e.target.value);
    if (val === null) {
      setCelsius('');
    } else {
      setCelsius(formatVal((val - 32) * 5 / 9));
    }
  };

  const handleKelvinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseOrEmpty(e.target.value);
    if (val === null) {
      setCelsius('');
    } else {
      setCelsius(formatVal(val - 273.15));
    }
  };

  const cVal = parseOrEmpty(celsius);

  const displayFahrenheit = cVal !== null ? formatVal((cVal * 9 / 5) + 32) : '';
  const displayKelvin = cVal !== null ? formatVal(cVal + 273.15) : '';

  return (
    <article>
      <header>
        <h2>Temperature Converter</h2>
      </header>
      <form onSubmit={(e) => e.preventDefault()}>
        <fieldset role="group">
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="temp-celsius">Celsius (°C)</label>
            <input
              id="temp-celsius"
              type="number"
              value={celsius}
              onChange={handleCelsiusChange}
              placeholder="e.g. 20"
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="temp-fahrenheit">Fahrenheit (°F)</label>
            <input
              id="temp-fahrenheit"
              type="number"
              value={celsius === '' ? '' : displayFahrenheit}
              onChange={handleFahrenheitChange}
              placeholder="e.g. 68"
            />
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <label htmlFor="temp-kelvin">Kelvin (K)</label>
            <input
              id="temp-kelvin"
              type="number"
              value={celsius === '' ? '' : displayKelvin}
              onChange={handleKelvinChange}
              placeholder="e.g. 293.15"
            />
          </div>
        </fieldset>
      </form>
    </article>
  );
};

export default TemperatureConverter;
