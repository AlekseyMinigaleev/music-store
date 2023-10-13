import '../css/Card.css';

export interface ICreateButtonProps{
  text:string,
  styleType: "music" | "other";
}

export function CreateButton(props: ICreateButtonProps){
   const buttonClassName = props.styleType === "music" ? "music-create-button" : "other-create-button";
   return(
      <button className={buttonClassName}>
         {props.text}
      </button>
  );
}