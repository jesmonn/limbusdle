import jsonData from './data.json';

export const compareSpecialties = (guess, chosen) => {
    const identicalCheck = 
        guess.every(item => chosen.includes(item))
        && 
        chosen.every(item => guess.includes(item))
      if (identicalCheck) {
        return 'limegreen'
      }
      const similarCheck = guess.some(item => chosen.includes(item))
      if (similarCheck) {
        return 'orange'
      }
      return 'crimson'
  }
  
export const compareGuessAndCheckSolved = (identity, setSolved, chosenIdentity) => {
      setSolved((identity.id_title === chosenIdentity.id_title) && (identity.sinner_name === chosenIdentity.sinner_name))
      return {
          id_title: identity.id_title,
          sinner_name: identity.sinner_name,
          season: identity.season,
          id_rarity: identity.id_rarity,
          specialties: identity.specialties,
          sinnerColor: identity.sinner_name === chosenIdentity.sinner_name ? 'limegreen' : 'crimson',
          seasonColor: identity.season === chosenIdentity.season ? 'limegreen' : 'crimson',
          seasonArrow: compareSeasons(identity.season === "Standard Fare" ? "Season 0" : identity.season, chosenIdentity.season === "Standard Fare" ? "Season 0" : chosenIdentity.season),
          rarityColor: identity.id_rarity === chosenIdentity.id_rarity ? 'limegreen' : 'crimson',
          specialtiesColor: compareSpecialties(identity.specialties, chosenIdentity.specialties)
      }
  }

  export const compareGuessAndCheckSolvedEgo = (ego, setSolved, chosenEgo) => {
    setSolved((ego.ego_name === chosenEgo.ego_name) && (ego.sinner_name === chosenEgo.sinner_name))
    return {
        ego_name: ego.ego_name,
        sinner_name: ego.sinner_name,
        season: ego.season,
        rarity: ego.rarity,
        sin_affinity: ego.sin_affinity,
        specialties: ego.specialties,
        sinnerColor: ego.sinner_name === chosenEgo.sinner_name ? 'limegreen' : 'crimson',
        seasonColor: ego.season === chosenEgo.season ? 'limegreen' : 'crimson',
        seasonArrow: compareSeasons(ego.season === "Standard Fare" ? "Season 0" : ego.season, chosenEgo.season === "Standard Fare" ? "Season 0" : chosenEgo.season),
        rarityColor: ego.rarity === chosenEgo.rarity ? 'limegreen' : 'crimson',
        sinColor: ego.sin_affinity === chosenEgo.sin_affinity ? 'limegreen' : 'crimson',
        specialtiesColor: compareSpecialties(ego.specialties, chosenEgo.specialties)
    }
}

export const compareSeasons = (guess, season) => {
    if(guess > season) {
      return 'url(\./icons/arrowIconRedDown.png\)'
    }
    if(guess < season) {
      return 'url(\./icons/arrowIconRedUp.png\)'
    }
    return ""
}

export const getSkillIconPath = (sinner_name, identity_name, skill_name) => {
    const sinner_folder = sinner_name.replace(/\W/g, '');
    const identity_folder = identity_name.replace(/\W/g, '');
    return "https://raw.githubusercontent.com/jesmonn/limbusdle/refs/heads/master/src/assets/images\\IdentitySkillArt\\"+sinner_folder+"\\"+identity_folder+"\\"+skill_name+".png";
  }
  
export const getEgoIconPath = (sinner_name, ego_name) => {
    const sinner_folder = sinner_name.replace(/\W/g, '');
    const ego_folder = ego_name.replace(/\W/g, '');
    return "https://raw.githubusercontent.com/jesmonn/limbusdle/refs/heads/master/src/assets/images\\IdentitiesEGOArt\\"+sinner_folder+"\\EGO\\"+ego_folder+"\\_awaken_profile.png";
  }

  export const getSplashIconPath = (sinner_name, id_name, rarity, normal) => {
    const sinner_folder = sinner_name.replace(/\W/g, '');
    const id_folder = id_name.replace(/\W/g, '');
    if (rarity === '0' || normal) {
      return "https://raw.githubusercontent.com/jesmonn/limbusdle/refs/heads/master/src/assets/images\\IdentitiesEGOArt\\"+sinner_folder+"\\Identities\\"+id_folder+"\\_normal.png";
    } else {
      return "https://raw.githubusercontent.com/jesmonn/limbusdle/refs/heads/master/src/assets/images\\IdentitiesEGOArt\\"+sinner_folder+"\\Identities\\"+id_folder+"\\_gacksung.png";
    }   
  }

export const toColorEmoji = (color) => {
    switch(color) {
      case 'limegreen':
        return '🟩';
      case 'orange':
        return '🟨';
      case 'crimson':
        return '🟥';
      default:
        return '⬛';
    }
  }
  
export const toSinnerEmoji = (sinner) => {
    switch(sinner) {
      case 'Yi Sang':
        return '🪶';
      case 'Faust':
        return '👻';
      case 'Don Quixote':
        return '🎠';
      case 'Ryoshu':
        return '🚬';
      case 'Meursault':
        return '🌇';
      case 'Hong Lu':
        return '🔮';
      case 'Heathcliff':
        return '⛈️';
      case 'Ishmael':
        return '⛪️';
      case 'Rodion':
        return '🪓';
      case 'Sinclair':
        return '🐣';
      case 'Outis':
        return '👢';
      case 'Gregor':
        return '🪲';
      
    }
  }
  
export const guessToEmojis = (guessList) => {
    const stringList = guessList.map((guess) => {
      return(
      toSinnerEmoji(guess.sinner_name)
      +
      toColorEmoji(guess.sinnerColor)
      +
      toColorEmoji(guess.seasonColor)
      +
      toColorEmoji(guess.rarityColor)
      +
      toColorEmoji(guess.specialtiesColor))
    })
    return stringList.join('\r\n')
  }

  export const guessToEmojisIdentity = (guessList) => {
    const stringList = guessList.map((guess) => {
      return(
      '🪞' +
      toColorEmoji(guess.sinnerColor)
      +
      toColorEmoji(guess.seasonColor)
      +
      toColorEmoji(guess.rarityColor)
      +
      toColorEmoji(guess.specialtiesColor))
    })
    return stringList.join('\r\n')
  }

  export const guessToEmojisEgo = (guessList) => {
    const stringList = guessList.map((guess) => {
      return(
      '🧠' +
      toColorEmoji(guess.sinnerColor)
      +
      toColorEmoji(guess.seasonColor)
      +
      toColorEmoji(guess.rarityColor)
      +
      toColorEmoji(guess.specialtiesColor))
    })
    return stringList.join('\r\n')
  }

export const initializeIdentities = (setIdentities, setChosenIdentity, seed) => {
    console.log(jsonData);
    setIdentities(jsonData.identities.map((identity, index) => {
        return {
            id: index,
            name: '['+identity.id_title+'] '+identity.sinner_name,
            ...identity
        }
    }));
    setChosenIdentity(jsonData.identities.at(Math.floor(seed*jsonData.identities.length)));
}

export const initializeEgos = (setEgos, setChosenEgo, seed) => {
    console.log(jsonData);
    setEgos(jsonData.egos.map((ego, index) => {
        return {
            id: index,
            name: '['+ego.ego_name+'] '+ego.sinner_name,
            ...ego
        }
    }));
    setChosenEgo(jsonData.egos.at(Math.floor(seed*jsonData.egos.length)));
}