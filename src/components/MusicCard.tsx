import '../css/Card.css';
import { UUID } from "crypto";
import {CreateButton} from "./CreateButton";
export interface IMusicCard{
   id: UUID;
   musicName:string;
   genre:string;
   author:string;
   performanceCount:number
}

export function MusicCard({ props}: { props: IMusicCard; }) {
   const createButtonText:string = "Create cd";

   return (
      <div className="card">
         <h2>{props.musicName}</h2>
         <p>genre: {props.genre}</p>
         <p>autor: {props.author}</p>
         <p>Performances: {props.performanceCount}</p>
         <CreateButton
            styleType={"music"}  
            text={createButtonText}/>
      </div>
    );
}