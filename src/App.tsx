import React, { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Router,
  Route,
  useRoutes
} from "react-router-dom";
import { EuiProvider, EuiThemeColorMode, EuiThemeProvider } from "@elastic/eui";
// import "@elastic/eui/dist/eui_theme_light.css";
// import "@elastic/eui/dist/eui_theme_dark.css";
import Login from "./app/pages/Login";
import Dashboard from "./app/pages/Dashboard";
import { useAppDispatch, useAppSelector } from "./app/hooks";
import ThemeSelector from "./app/components/ThemeSelector";
// import 

const App = () => {
  const dispatch=useAppDispatch();
  const isDarkTheme=useAppSelector((zoom)=>zoom.auth.isDarkTheme)
  const [theme, settheme] = useState<EuiThemeColorMode>("light")
  const [inititalTheme, setinititalTheme] = useState(true)
  useEffect(() => {
    
  const theme =localStorage.getItem("zoom-theme");
  if (theme) {
    settheme(theme as EuiThemeColorMode)
  }
  else{
    localStorage.setItem("zoom-theme","light")
  }
    
  }, [])

  useEffect(() => {
    

    if (inititalTheme) {
      setinititalTheme(false)
    }
    else{
      window.location.reload()
    }
      
    }, [isDarkTheme])
  
  const overrides={
    colors:{
          LIGHT:{primary:"#0b5cff"},
      DARK:{primary:"#0b5cff"}
    }
  }
  return (
    <>
    <ThemeSelector>

    
      <EuiProvider colorMode={theme}>
        <EuiThemeProvider modify={overrides}>

      <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Dashboard />} />

            </Routes>
        </EuiThemeProvider>

      </EuiProvider>
    </ThemeSelector>
    </>
  );
};

export default App;
