import Vue from 'vue'

import ComponentName from './ComponentName.vue'

// Change "ComponentName" to something a bit more meaningfull :-D
window.vueCreateComponentName = function (id) {
  const app = new Vue({
    el: `#${id}`,
    render: h => h(ComponentName)
  })

  return { app }
}