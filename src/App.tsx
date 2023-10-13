import { Header } from "./components/Header";
import { IMusicCard, MusicCard } from "./components/MusicCard";
import { useMusicCards } from "./hooks/MusicCards";

function App() {
   const musicCards = useMusicCards();

   return (
   <>
   <Header text="MusicCards"/>
   <div>
   { musicCards.map(musicCard => <MusicCard props={musicCard} key={musicCard.id} />) }
   </div>
   </>
   );
}

export default App;
