export const basicTextStyleBold = {
    alignContent: 'center',
    color: 'white',
    textShadow: '0px 0px 3px #000000',
    fontFamily: '"Impact", fantasy',
    fontWeight: 700,
    wordWrap: 'break-word',
    whiteSpace: 'no-wrap',
    wordBreak: 'break-word'
}

export const titleTextStyleBold = {
    alignContent: 'center',
    color: 'white',
    textShadow: '0px 0px 6px #000000',
    fontFamily: '"Impact", fantasy',
    fontWeight: 700,
    fontSize: 70,
}

export const logoTextStyle = {
    alignContent: 'center',
    color: 'khaki',
    textShadow: '0px 0px 15px #8B0000',
    fontFamily: '"Impact", fantasy',
    fontWeight: 700,
    fontSize: '10vw',
}

export const basicTextStyle = {
    alignContent: 'center',
    color: 'white',
    textShadow: '0px 0px 3px #000000',
    fontFamily: '"Helvetica", sans-serif',
    fontWeight: 400,
    wordWrap: 'break-word',
    whiteSpace: 'no-wrap',
    wordBreak: 'break-word'
}

export const flexHeader = (flex) => {
    return {
        alignContent: 'center',
        flex: flex,  
        textTransform: 'capitalize',
        backgroundImage: 'linear-gradient(to bottom, rgba(0,0,0,0), rgba(0,0,0,0.3))'
    }
}

export const flexFeat = (flex, color) => {
    return {
        objectFit: 'contain',
        alignContent: 'center',
        flex: flex,  
        border: "1px solid black",
        textTransform: 'capitalize',
        backgroundColor: color,
    }
}