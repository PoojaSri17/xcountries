import React, { useEffect, useState } from 'react';
import './App.css';  // Import the CSS for styling

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch countries' data
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await fetch('https://xcountries-backend.azurewebsites.net/all');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCountries();
  }, []);

  return (
    <div>
      <h1>XCountries Flags</h1>
      {loading && <p>Loading...</p>}
      {error && <p>Error fetching data: {error}</p>}
      <div className="country-list">
        {countries.map((country) => (
          <div key={country.name} className="country-card">
            <img src={country.flag} alt={`Flag of ${country.name}`} className="flag-img" />
            <p>{country.name}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
