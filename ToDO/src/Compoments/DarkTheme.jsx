import { ThemeProvider } from "../App"

const DisplayTheme = () => {
    const theme = useContext (ThemeContext)
    
    return <p> Change Theme: {theme} </p>
};

export default DisplayTheme;