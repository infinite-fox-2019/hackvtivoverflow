import Vue from 'vue'

export default (err) => {
  console.log(err.response.data.messages)
  let messages = ''
  err.response.data.messages.forEach(message => {
    messages += message + '<br>'
  })
  Vue.notify({
    group: 'alert',
    title: messages,
    type: 'error'
  })
}
