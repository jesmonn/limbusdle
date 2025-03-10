import { useState, useEffect } from "react";
import Rand, { PRNG } from 'rand-seed';
import { logoTextStyle, flexFeat, basicTextStyle, basicTextStyleBold } from './styles';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { compareGuessAndCheckSolved, getSplashIconPath, guessToEmojis, initializeIdentities } from './CompareFunctions'
import './styles.css'

export const EndlessImage = () => {
    const [solved, setSolved] = useState(false);
    const [identities, setIdentities] = useState([{}]);
    const [chosenIdentity, setChosenIdentity] = useState([false, {}]);
    const [guessList, setGuessList] = useState([]);
    const [xRandom, setXRandom] = useState(100);
    const [yRandom, setYRandom] = useState(100);
    const [imageRandom, setImageRandom] = useState(0);
    const [imageRandom2, setImageRandom2] = useState(0);
    // const [guessFilenames, setGuessFilenames] = useState([]);
    const [searchString, setSearchString] = useState("");

    useEffect(() => {
      const random = Math.random()
      const rand = new Rand(String((Date.now()*random)), PRNG.xoshiro128ss)
      initializeIdentities(setIdentities, setChosenIdentity, rand.next())
      setXRandom(rand.next());
      setYRandom(rand.next());
      setImageRandom(rand.next() < 0.5);
      setImageRandom2(rand.next() < 0.5);
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
        <p style={basicTextStyle}>Identify the identity by its art! Endless mode, resets each time the page is loaded. The image will zoom out with each guess, up to a certain amount.</p>
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
        {chosenIdentity.sinner_name !== undefined && <div
        
        style={{
            maxWidth: '60%',
            margin: 'auto',
            aspectRatio: 1,
            overflow: 'hidden'
        }}
        
        ><img 
            src={getSplashIconPath(chosenIdentity.sinner_name, chosenIdentity.id_title, chosenIdentity.id_rarity, imageRandom)}
        
            style={{
                pointerEvents: 'none',
                position: 'relative',
                top: solved ? ('-25%') : imageRandom ? -10+'%' : (-200+10*guessList.length > -5 ? -200+10*guessList.length : -10)+'%',
                left: solved ? ('-25%') : imageRandom2 ? -10+'%' : (-200+10*guessList.length > -5 ? -200+10*guessList.length : -10)+'%',
                width: solved ? ('140%') : (700-710*((-1/(0.3*guessList.length+1))+1) > 140 ? 700-710*((-1/(0.3*guessList.length+1))+1) : 140)+'%',
                aspectRatio: 1,
                minWidth: '100%',
                objectFit: 'cover',
            }}
            >
            </img></div>}
            <br></br>
          {!solved && <div style={{animation: 'fade-in 1.2s'}}><ReactSearchAutocomplete
              items={identities}
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
            You identified the image in <b>{guessList.length}</b> guess(es)!
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

          </div>
          {[...guessList].map((guess) => {

            const sinner_folder = guess.sinner_name.replace(/\W/g, '');
            const id_folder = guess.id_title.replace(/\W/g, '');
            const icon_path = "https://raw.githubusercontent.com/jesmonn/limbusdle/refs/heads/master/src/assets/images\\IdentitiesEGOArt\\"+sinner_folder+"\\Identities\\"+id_folder+"\\_gacksung_profile.png";

            return <div style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginTop: 5,
                    marginBottom: 5,
                    justifyContent: 'center',
                    minHeight: 50,
                    maxHeight: 100,
                    minWidth: '40vw',
                    maxWidth: '100vw',
                  }} className={''}>
                    <div style={flexFeat(1.2, ((guess.id_title === chosenIdentity.id_title) && (guess.sinner_name === chosenIdentity.sinner_name)) ? 'limegreen' : 'crimson')}>
                      <img src={icon_path} style={{
                        width: '100%', 
                        height: '100%',
                        minWidth: '100%', 
                        minHeight: '100%',
                        objectFit: "cover"
                        }}></img>
                    </div>
                    <div style={flexFeat(2.5, ((guess.id_title === chosenIdentity.id_title) && (guess.sinner_name === chosenIdentity.sinner_name)) ? 'limegreen' : 'crimson')}>
                      <p style={basicTextStyle}>
                        {'['+guess.id_title+'] '+guess.sinner_name}
                      </p>
                    </div>
                  </div>;
          })}
          <div style={{marginTop: 30, marginBottom: 10}}></div>
          </div>
      </div>
    
    </div>
    );

}