import Vue from 'vue'

export default (err) => {
  if (err.response.data.messages) {
    let messages = ''
    err.response.data.messages.forEach(message => {
      messages += message + '<br>'
    })
    Vue.notify({
      group: 'alert',
      title: messages,
      type: 'error'
    })
  } else {
    Vue.notify({
      group: 'alert',
      title: 'Something went wrong in the server',
      type: 'error'
    })
  }
}
