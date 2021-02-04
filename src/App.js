import React, { useState } from 'react'
import axios from 'axios'

import Search from './components/Search'
import Results from './components/Results'
import Popup from './components/Popup'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

function App() {

  const [state, setState] = useState({
    s: "",
    results: [],
    selected: {}
  });
  const apiurl = "http://www.omdbapi.com/?apikey=dfe6d885";

  const search = (e) => {
    if (e.key === "Enter") {
      axios(apiurl + "&s=" + state.s).then(({ data }) => {
        let results = data.Search;

        setState(prevState => {
          return { ...prevState, results: results }
        })
      });
    }
  }
  
  const handleInput = (e) => {
    let s = e.target.value;

    setState(prevState => {
      return { ...prevState, s: s }
    });
  }

  const openPopup = id => {
    axios(apiurl + "&i=" + id).then(({ data }) => {
      let result = data;

      console.log(result);

      setState(prevState => {
        return { ...prevState, selected: result }
      });
    });
  }

  const closePopup = () => {
    setState(prevState => {
      return { ...prevState, selected: {} }
    });
  }

  const [selectedDate, setSelectedDate] = useState(null)

  return (
    <div className="App">
      <header>
        <h1>Movie Gallery</h1>
        <h1>Technical Test Code.id - by Rofi Al Latif</h1>
      </header>
      <main>

        <Search handleInput={handleInput} search={search} />

        <DatePicker className="tanggal"
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        placeholderText={'dd/mm/yyyy'}
        // minDate={new Date()}
        // maxDate={new Date()}
        filterDate={date => date.getDay() !== 6 && date.getDay() !== 0}
        showYearDropdown
        scrollableYearDropdown
      />

        <Results results={state.results} openPopup={openPopup} />

        {(typeof state.selected.Title != "undefined") ? <Popup selected={state.selected} closePopup={closePopup} /> : false}
      </main>
    </div>
  );
}

export default App
