import { useContext } from "react";
import { counterContext } from "../contexts/CounterContext";

export default function Feed() {
    const {counter,setcounter} = useContext(counterContext);

  return (
    <div>Feed  { counter}</div>
  )
}
