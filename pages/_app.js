import "@fontsource/mona-sans";
import "./reset.css";
import "./global.css";
import "./App.css";
import "primereact/resources/themes/lara-light-cyan/theme.css";

import { TemplateConfigProvider } from "src/services/template/TemplateConfigContext";
import { PrimeReactProvider } from "primereact/api";

export default function MyApp({ Component, pageProps }) {
  const value = {
    appendTo: "self",
  };

  return (
    <>
      <PrimeReactProvider value={value}>
        <TemplateConfigProvider value={pageProps}>
          <div className="hudContent">
            <div className="mainContent">
              <Component {...pageProps} />
            </div>
          </div>
        
        </TemplateConfigProvider>
      </PrimeReactProvider>
    </>
  );
}
