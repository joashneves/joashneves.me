import "./reset.css";
import "./global.css";
import Footer from "src/components/footer/Footer.jsx";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <h1>Eu to tranquilão</h1>
      <Component {...pageProps} />
      <Footer />
    </>
  );
}
