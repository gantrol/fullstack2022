export const PersonForm = ({addPerson, newPerson, setNewPerson}) => {
  return (
    <form onSubmit={addPerson}>
      <p>name: <input type="text" value={newPerson.name} onChange={e => setNewPerson({...newPerson, 'name': e.target.value})}/></p>
      <p>number: <input type="text" value={newPerson.number} onChange={e => setNewPerson({...newPerson, 'number': e.target.value})}/></p>
      <button type='submit'>save</button>
    </form>
  )
}