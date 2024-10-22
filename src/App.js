import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [countries, setCountries] = useState([]); // Store all countries
  const [filteredCountries, setFilteredCountries] = useState([]); // Store filtered results
  const [searchTerm, setSearchTerm] = useState(''); // Store search input

  // Fetch country data on initial render
  useEffect(() => {
    fetch('https://restcountries.com/v3.1/all')
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
        setFilteredCountries(data); // Initially display all countries
      })
      .catch((error) => {
        console.error('Error fetching countries:', error);
      });
  }, []);

  // Filter countries based on search term
  useEffect(() => {
    const filtered = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCountries(filtered);
  }, [searchTerm, countries]);

  return (
    <div className="App">
      <input
        type="text"
        placeholder="Search for a country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <div className="countryGrid">
        {filteredCountries.length > 0 ? (
          filteredCountries.map((country) => (
            <div className="countryCard" key={country.cca3}>
              <img
                src={country.flags.png}
                alt={`Flag of ${country.name.common}`}
              />
              <p>{country.name.common}</p>
            </div>
          ))
        ) : (
          <p>No countries found</p>
        )}
      </div>
    </div>
  );
}

export default App;
