import { flexFeat, basicTextStyle } from "./styles"

export const Identity = (props) => {

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
        <div style={flexFeat(1.2, props.guessId.nameColor)}>
          <img src={props.iconPath} style={{
            width: '100%', 
            height: '100%',
            minWidth: '100%', 
            minHeight: '100%',
            objectFit: "cover"
            }}></img>
        </div>
        <div style={{...flexFeat(1.5, props.guessId.sinnerColor),
          backgroundImage: props.guessId.sinnerArrow,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessId.sinner_name).slice(1, -1)}
          </p>
        </div>
        <div style={{
          ...flexFeat(2, props.guessId.seasonColor),
          backgroundImage: props.guessId.seasonArrow,
          backgroundSize: 'contain',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center'
        }}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessId.season).slice(1, -1)}
          </p>
        </div>
        <div style={flexFeat(0.8, props.guessId.rarityColor)}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessId.id_rarity).slice(1, -1)}
          </p>
        </div>
        <div style={flexFeat(3, props.guessId.specialtiesColor)}>
          <p style={basicTextStyle}>
            {JSON.stringify(props.guessId.specialties.join(', ')).slice(1, -1).replace(/-/g, ' ')}
            {props.guessId.specialties.length === 1 && props.guessId.specialties[0] === '-' && "None"}
          </p>
        </div>
    
      </div>
}