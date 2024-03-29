import Image from "next/image";
import { Header } from "./components/header";
import { Main } from "./components/Main";
import { Footer } from "./components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Header />
      <Main />
      <Footer />
    </div>
  );
}
