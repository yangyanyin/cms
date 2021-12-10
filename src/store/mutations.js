export default {
  changeLabels (state, labels) {
    state.labels = labels
  },
  changeSidebarUnfold (state, val) {
    console.log(val)
    state.sidebarUnfold = val
  }
}