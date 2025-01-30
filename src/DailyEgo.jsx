import { useState, useEffect } from "react";
import Rand from 'rand-seed';
import { logoTextStyle, flexHeader, basicTextStyle, basicTextStyleBold } from './styles';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Ego } from "./Ego";
import { compareGuessAndCheckSolvedEgo, getEgoIconPath, guessToEmojis, initializeEgos, guessToEmojisEgo } from './CompareFunctions'

export const DailyEgo = () => {
    const [solved, setSolved] = useState(false);
    const [egos, setEgos] = useState([{}]);
    const [chosenEgo, setChosenEgo] = useState([false, {}]);
    const [guessList, setGuessList] = useState([]);
    // const [guessFilenames, setGuessFilenames] = useState([]);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
        const rand = new Rand(1+new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', year: 'numeric', month: 'numeric', day: 'numeric', }))
        initializeEgos(setEgos, setChosenEgo, rand.next())
        console.log(chosenEgo)
    }, [])

    const addGuess = (ego) => {
      setGuessList([compareGuessAndCheckSolvedEgo(ego, setSolved, chosenEgo), ...guessList])
      setEgos(egos.filter(id =>
         !((ego.ego_name === id.ego_name) && (ego.sinner_name === id.sinner_name))))
    }

    const handleOnSearch = (string, results) => {
      setSearchString(string);
    };

    const handleOnSelect = (item) => {
      addGuess(item);
      setSearchString("");
      const divElements = document.querySelectorAll('.clear-icon');
      divElements.forEach((divElement) => {
      divElement.click();
});
    }

    const formatResult = (item) => {
        const icon_path = getEgoIconPath(item.sinner_name, item.ego_name);
      return (
          <>
          <div style={
            {
              objectFit: 'contain',
              flex: 1,
              textTransform: 'capitalize',
              float: 'left',
              fontSize: 0,
              height: 50
            }
          }>
            <img src={icon_path} style={{
                width: 46,
                height: 46,
                border: '2px solid black'
              }}></img>
          </div>
          <div style={
            {
              objectFit: 'contain',
              flex: 3,
              textTransform: 'capitalize',
              display: "inline-block",
              height: 50,
              marginLeft: 10
            }
          }>
            <span style={{ textAlign: 'left', textTransform: 'capitalize', lineHeight: '50px', fontSize: 20 }}>{item.name}</span>
          </div>
          </>
      )
    }

    return (
        <div className="Game">
      <h1 style={logoTextStyle}>Limbusdle</h1>
      <p style={basicTextStyle}>Guess the E.G.O! Resets every midnight UTC+7. (Note: Standard Fare is considered Season 0.)</p>
      <div style={{marginBottom: 40}}>
        <div className="addGuess" style={
          {
            marginLeft: 'auto',
            marginRight: 'auto',
            marginTop: 20,
            minWidth: '40vw',
            maxWidth: '100vw',
          }
        }>
          {!solved && <div>
            {!(guessList.length > 5) && <div style={basicTextStyle}>A blurred monochrome image of its icon will reveal itself after {6-guessList.length} guess(es).</div>}
            {(guessList.length > 5) && <img 
              src={getEgoIconPath(chosenEgo.sinner_name, chosenEgo.ego_name)}
              style={{
                  width: 150,
                  height: 150,
                  border: '3px solid black',
                  filter: 'blur(6px) grayscale(100%)',
                  pointerEvents: 'none'
                }}
              ></img>}
          </div>
          }
          {!solved && <div style={{animation: 'fade-in 1.2s'}}><ReactSearchAutocomplete
              items={egos}
              onSelect={handleOnSelect}
              showIcon={false}
              autoFocus
              formatResult={formatResult}
              onSearch={handleOnSearch}
              inputSearchString={searchString}
              fuseOptions={{
                keys: ["name"]
              }}
              styling={
                {
                  borderRadius: '4px',
                }
              }
            />
           </div>}
          
          {solved && <h2 style={basicTextStyle}>
            You found the E.G.O in <b>{guessList.length}</b> guess(es)!
            <br></br>
            <p style={{whiteSpace: 'pre-wrap'}}>{guessToEmojis(guessList)}</p>
            <button onClick={ () =>
              navigator.clipboard.writeText(
                'I found today\'s Limbusdle E.G.O. in '+guessList.length+' tries!\n'+
                guessToEmojisEgo(guessList))
            }>Copy</button> 
            </h2>
            }
        </div>
        <div className="list" style={{
          marginTop: 20,
          height: '100vw',
          animation: 'fade-in 1.2s'
        }}>
        <div style={{
            display: 'flex',
            flexDirection: 'row',
            marginTop: 5,
            marginBottom: 5,
            justifyContent: 'center',
            borderBottom: '2px solid white',
            minHeight: 50,
            minWidth: '40vw',
            maxWidth: '100vw',
          }}>
            <div style={flexHeader(1.2)}>
              <p style={basicTextStyleBold}>
                E.G.O
              </p>
            </div>
            <div style={flexHeader(1.5)}>
              <p style={basicTextStyleBold}>
                Sinner
              </p>
            </div>
            <div style={flexHeader(2)}>
              <p style={basicTextStyleBold}>
                Season
              </p>
            </div>
            <div style={flexHeader(1.1)}>
              <p style={basicTextStyleBold}>
                Class
              </p>
            </div>
            <div style={flexHeader(1.1)}>
              <p style={basicTextStyleBold}>
                Affinity
              </p>
            </div>
            <div style={flexHeader(3)}>
              <p style={basicTextStyleBold}>
                Specialties
              </p>
            </div>

          </div>
          {[...guessList].map((guess) => {
            return <Ego
              guessEgo={guess}
              iconPath={getEgoIconPath(guess.sinner_name, guess.ego_name)}
              className=''
            />;
          })}
          </div>
         </div>
    </div>
    );

}