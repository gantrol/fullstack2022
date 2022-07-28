export const Filter = ({nameFilter, changeHandler}) => {
  return <p>filter shown with <input type='text' value={nameFilter} onChange={changeHandler}/></p>
}