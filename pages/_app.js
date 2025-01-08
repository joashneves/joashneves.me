import "./reset.css";
import "./global.css";
import "./App.css";

import Footer from "src/components/footer/Footer.jsx";
import HudMenu from "src/components/HudMenu/HudMenu";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="hudContent">
        <HudMenu />
        <div className="mainContent">
          <Component {...pageProps} />
        </div>
      </div>
      <Footer />
    </>
  );
}
