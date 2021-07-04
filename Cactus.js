export const Cactus = (props) => {
  return {
    $template: '#cactus-template',
    props,
    onMousedown() {
      console.log(props.x, this.store)
      props.x = 0
    },
  }
}
