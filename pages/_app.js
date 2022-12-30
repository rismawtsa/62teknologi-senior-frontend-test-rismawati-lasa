import "../styles/globals.css";
import { BusinessProvider } from "../context/business";
export default function App({ Component, pageProps }) {
  return (
    <BusinessProvider>
      <Component {...pageProps} />
    </BusinessProvider>
  );
}
