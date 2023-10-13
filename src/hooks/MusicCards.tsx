import { useEffect, useState } from "react";
import { IMusicCard } from "../components/MusicCard";
import axios from "axios";

export function useMusicCards(): IMusicCard[] {
   const [musicCards, setMusicCards] = useState<IMusicCard[]>([]);

   async function fetchMusicCards() {
      const response = await axios.get<IMusicCard[]>("https://localhost:7204/api/MusicCard/list");
      setMusicCards(response.data);
   }

   useEffect(() => {
      fetchMusicCards();
   }, []);

   return musicCards;
}
