import { flexFeat, basicTextStyle } from "./styles"

export const Ego = (props) => {

    return <div style={{
        display: 'flex',
        flexDirection: 'row',
        marginTop: 5,
        marginBottom: 5,
        justifyContent: 'center',
        minHeight: 50,
        minWidth: '40vw',
        maxWidth: '100vw',
      }} className={props.className}>
        <div style={flexFeat(1.2, props.guessEgo.nameColor)}>
          <img src={props.iconPath} style={{
            width: '100%', 
            height: '100%',
            minWidth: '100%', 
            minHeight: '100%',
            objectFit: "cover"
            }}></img>
        </div>
        <div style={{...flexFeat(1.5, props.guessEgo.sinnerColor),
          backgroundImage: props.guessEgo.sinnerArrow,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessEgo.sinner_name).slice(1, -1)}
          </p>
        </div>
        <div style={{
          ...flexFeat(2, props.guessEgo.seasonColor),
          backgroundImage: props.guessEgo.seasonArrow,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessEgo.season).slice(1, -1)}
          </p>
        </div>
        <div style={flexFeat(1.1, props.guessEgo.rarityColor)}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessEgo.rarity).slice(1, -1)}
          </p>
        </div>
        <div style={flexFeat(1.1, props.guessEgo.sinColor)}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessEgo.sin_affinity).slice(1, -1)}
          </p>
        </div>
        <div style={flexFeat(3, props.guessEgo.specialtiesColor)}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessEgo.specialties.join(', ')).slice(1, -1).replace(/-/g, ' ')}
            {props.guessEgo.specialties.length === 1 && props.guessEgo.specialties[0] === '-' && "None"}
          </p>
        </div>
    
      </div>
}