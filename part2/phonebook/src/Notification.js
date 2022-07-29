export const Notification = ({ message, messageType }) => {
  // TODO: type is waning or info?
  if (message === null || message === '') {
    return null
  }

  return (
    <div className={messageType}>
      {message}
    </div>
  )
}