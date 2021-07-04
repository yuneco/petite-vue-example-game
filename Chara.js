export const Chara = () => {
  return {
    $template: '#chara-template',

    onMousedown(ev) {
      this.store.jump()
    },  

    onMounted() {
    },
  
  }
}
