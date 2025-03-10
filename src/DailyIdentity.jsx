import { useState, useEffect } from "react";
import Rand, { PRNG } from 'rand-seed';
import { logoTextStyle, flexHeader, basicTextStyle, basicTextStyleBold } from './styles';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { Identity } from "./Identity";
import { compareGuessAndCheckSolved, getSkillIconPath, guessToEmojis, initializeIdentities, guessToEmojisIdentity } from './CompareFunctions'
import './styles.css'

export const DailyIdentity = () => {
    const [solved, setSolved] = useState(false);
    const [identities, setIdentities] = useState([{}]);
    const [chosenIdentity, setChosenIdentity] = useState([false, {}]);
    const [guessList, setGuessList] = useState([]);
    // const [guessFilenames, setGuessFilenames] = useState([]);
    const [searchString, setSearchString] = useState("");
    const [showHint1, setShowHint1] = useState(false);
    const [showHint2, setShowHint2] = useState(false);

    const toggleHint1 = () => {
      setShowHint1(!showHint1)
    }

    const toggleHint2 = () => {
      setShowHint2(!showHint2)
    }

    useEffect(() => {
        const rand = new Rand(String(new Date().toLocaleString('en-US', { timeZone: 'Asia/Jakarta', year: 'numeric', month: 'numeric', day: 'numeric', })), PRNG.xoshiro128ss)
        initializeIdentities(setIdentities, setChosenIdentity, rand.next())
        console.log(chosenIdentity)
    }, [])

    const addGuess = (identity) => {
      setGuessList([compareGuessAndCheckSolved(identity, setSolved, chosenIdentity), ...guessList])
      setIdentities(identities.filter(id =>
         !((identity.id_title === id.id_title) && (identity.sinner_name === id.sinner_name))))
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
      const sinner_folder = item.sinner_name.replace(/\W/g, '');
      const id_folder = item.id_title.replace(/\W/g, '');
      const icon_path = "https://raw.githubusercontent.com/jesmonn/limbusdle/refs/heads/master/src/assets/images\\IdentitiesEGOArt\\"+sinner_folder+"\\Identities\\"+id_folder+"\\_gacksung_profile.png";
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
      <div style={{
        backgroundColor: 'rgba(33, 32, 32, 0.2)',
        borderColor: 'rgba(33, 32, 32, 0.2)',
        border: '2px',
        borderRadius: '5px',
        backdropFilter: 'blur(6px)'
      }}>
        <p style={basicTextStyle}>Guess the identity! Resets every midnight UTC+7. (Note: Standard Fare is considered Season 0.)</p>
      </div>
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
          {!solved && <div style={{
        backgroundColor: 'rgba(33, 32, 32, 0.2)',
        borderColor: 'rgba(33, 32, 32, 0.2)',
        border: '2px',
        borderRadius: '5px',
        backdropFilter: 'blur(6px)'
      }}>
            {!(guessList.length > 3) && <div style={basicTextStyle}>A blurred monochrome image of its Skill 1 can be revealed after {4-guessList.length} guess(es).</div>}
            {(guessList.length > 3 && !showHint1) && <button onClick={toggleHint1}>
              Show Skill
            </button>
            }
            {(guessList.length > 3 && showHint1) && <img 
              src={getSkillIconPath(chosenIdentity.sinner_name, chosenIdentity.id_title, chosenIdentity.skills[0].skill_name)}
              style={{
                  width: 150,
                  height: 150,
                  border: '3px solid black',
                  filter: 'blur(6px) grayscale(100%)',
                  pointerEvents: 'none'
                }}
              ></img>}
            <br></br>
            {!(guessList.length > 7) && <div style={basicTextStyle}>The name of its Support passive can be revealed after {8-guessList.length} guess(es).</div>}
            {(guessList.length > 7 && showHint2) && <div style={basicTextStyle}>Support Passive: {chosenIdentity.passives.at(-1).passive_name}</div>}
            {(guessList.length > 7 && !showHint2) && <button onClick={toggleHint2}>
              Show Passive
            </button>
            }
          </div>
          }
          {!solved && <div style={{animation: 'fade-in 1.2s'}}><ReactSearchAutocomplete
              items={identities}
              onSelect={handleOnSelect}
              showIcon={false}
              autoFocus
              formatResult={formatResult}
              onSearch={handleOnSearch}
              inputSearchString={searchString}
              fuseOptions={{
                keys: ["id_title", "sinner_name"]
              }}
              styling={
                {
                  borderRadius: '4px',
                }
              }
            />
           </div>}
          
          {solved && <div style={{
            backgroundColor: 'rgba(33, 32, 32, 0.2)',
            borderColor: 'rgba(33, 32, 32, 0.2)',
            border: '2px',
            borderRadius: '5px',
            backdropFilter: 'blur(6px)'
      }}><h2 style={basicTextStyle}>
            You found the identity in <b>{guessList.length}</b> guess(es)!
            <br></br>
            <p style={{whiteSpace: 'pre-wrap'}}>{guessToEmojis(guessList)}</p>
            <button onClick={ () =>
              navigator.clipboard.writeText(
                'I found today\'s Limbusdle Identity in '+guessList.length+' tries!\n'+
                guessToEmojisIdentity(guessList))
            }>Copy</button> 
            </h2>
            </div>
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
                ID
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
            <div style={flexHeader(0.8)}>
              <p style={basicTextStyleBold}>
                Rarity
              </p>
            </div>
            <div style={flexHeader(3)}>
              <p style={basicTextStyleBold}>
                Specialties
              </p>
            </div>

          </div>
          {[...guessList].map((guess) => {

            const sinner_folder = guess.sinner_name.replace(/\W/g, '');
            const id_folder = guess.id_title.replace(/\W/g, '');
            const icon_path = "https://raw.githubusercontent.com/jesmonn/limbusdle/refs/heads/master/src/assets/images\\IdentitiesEGOArt\\"+sinner_folder+"\\Identities\\"+id_folder+"\\_gacksung_profile.png";

            return <Identity
              guessId={guess}
              iconPath={icon_path}
              className=''
            />;
          })}
          <div style={{marginTop: 30, marginBottom: 10}}></div>
          </div>
      </div>
    
    </div>
    );

}