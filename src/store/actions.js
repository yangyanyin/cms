export default {
  pushLabels ( {commit, state}, obj) {
    const labels = state.labels
    const n = []
    labels.map(item => {
      n.push(item.path)
    })

    // 添加
    if (obj.type === 'add') {
      if (!n.includes(obj.path)) {
        labels.push(obj)
      }
    }
    // 删除
    if (obj.type === 'del') {
      const index = n.indexOf(obj.path)
      labels.splice(index, 1)
    }
    commit('changeLabels', labels)

  }
}