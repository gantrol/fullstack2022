import { Part } from "./Part"

export const Content = ({ parts }) => {
  return <ul>
    {parts.map((part) => <Part key={part.id} part={part} />)}
  </ul>
}