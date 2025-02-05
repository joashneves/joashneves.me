import "./reset.css";
import "./global.css";
import "./App.css";

import Footer from "src/components/footer/Footer.jsx";
import HudMenu from "src/components/HudMenu/HudMenu";
import { TemplateConfigProvider } from "src/services/template/TemplateConfigContext";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <TemplateConfigProvider value={pageProps}>
        <div className="hudContent">
          <HudMenu />
          <div className="mainContent">
            <Component {...pageProps} />
          </div>
        </div>
        <Footer />
      </TemplateConfigProvider>
    </>
  );
}
