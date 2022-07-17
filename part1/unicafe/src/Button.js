export const Button = (props) => {
  console.log(props)
  // 不加小括号会怎样？
  return (
    <button onClick={props.onClick}>{props.text}</button>
  )
}