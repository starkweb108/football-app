import React, { useState } from 'react';
import CountryLeagues from '../Components/CountryLeagues';
import { useGetFootballInfoQuery } from '../services/footballInfoApi';
import logo from '../preloader.png';

function Leagues({ first }) {
  const { data, isLoading } = useGetFootballInfoQuery();
  const [selectCountry, setSelectCountry] = useState({ country: 'World' });

  if (isLoading) {
    return (
      <div className="preloader--container">
        <img src={logo} alt="" />
      </div>
    );
  }
  const countriesData = Object.values(data.api.countries);

  function handleChange(e) {
    setSelectCountry({ country: e.target.value });
    e.preventDefault();
  }

  return (
    <section
      className="league--section--container"
      style={{ paddingTop: `${first && '3em'}` }}
    >
      <h2>Leagues Around the World</h2>
      <label htmlFor="countries">Select a country</label>
      <select
        name="countries"
        id="countries"
        value={selectCountry.country}
        onChange={handleChange}
      >
        {countriesData.map((item, index) => {
          return (
            <option key={index} value={item}>
              {item}
            </option>
          );
        })}
      </select>
      <CountryLeagues selectCountry={selectCountry} first={first} />
    </section>
  );
}

export default Leagues;
