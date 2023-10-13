import '../css/Header.css';

export interface IHeaderProps{
   text:string,
 }

export function Header(props:IHeaderProps){
  return (
    <div className="header">{props.text}</div>
  )
}