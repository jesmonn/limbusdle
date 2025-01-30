import React from "react";
import './App.css'
import { DailyIdentity } from './DailyIdentity';
import { DailyEgo } from './DailyEgo';
import { DailyImage } from './DailyImage';
import { HashRouter as Router, Routes, Route, Link} from "react-router-dom"
import { titleTextStyleBold } from './styles';

export default class App extends React.Component  {

  render() {
    return <div className='Background'><div className='App'>
      <Router style={{overflowY: 'hidden'}}>
        <div style={{
          backgroundColor: 'darkred',
          boxShadow: '0px 0px 15px #8B0000',
        }}>
          <Link to={"/"} style={{...titleTextStyleBold, fontSize: 25, marginLeft: '20vw', marginRight: '2vw'}}>Identity</Link>
          <Link to={"/ego"} style={{...titleTextStyleBold, fontSize: 25, marginLeft: '2vw', marginRight: '2vw'}}>E.G.O</Link>
          <Link to={"/art"} style={{...titleTextStyleBold, fontSize: 25, marginLeft: '2vw', marginRight: '20vw'}}>Art</Link>
        </div>
        <Routes>
          <Route path="/" element={<DailyIdentity />} />
          <Route path="/ego" element={<DailyEgo />} />
          <Route path="/art" element={<DailyImage />} />
          <Route path="*" element={<h1 style={{...titleTextStyleBold, color: 'white', alignSelf: 'center'}}> {'<⬜⬜⬜⬜⬜>   '}  ...there's nothing here. </h1>} />
        </Routes>
      </Router>
      </div>
    </div>
  }
}
