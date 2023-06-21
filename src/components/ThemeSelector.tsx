import { EuiThemeColorMode } from "@elastic/eui";
import React, { Suspense, useEffect, useState } from "react";

const LightTheme = React.lazy(() => import('./themes/Lighttheme'))
const DarkTheme = React.lazy(()=>import("./themes/Darktheme"))
export default function ThemeSelector({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<EuiThemeColorMode>("light");
  useEffect(() => {
    const theme = localStorage.getItem("zoom-theme");
    if (theme) {
      setTheme(theme as EuiThemeColorMode);
    }
  }, []);

  return (
    <>
      <Suspense fallback={<></>}>
        {theme === "dark" ? <DarkTheme /> : <LightTheme />}
      </Suspense>
      {children}
    </>
  );
}