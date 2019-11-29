<template>
  <div id='live-chat'>
    <div id="top" class="border">
      <div class="header border-bottom">
        <div id="lc-title">
          <h4>Dc OverThink Chat</h4>
        </div>
      </div>
      <div id="message" class='border'>
          <div class="chats" v-for='(message, i) in messages' :key='i'>
            <b-card align="center" class='mb-2' :title='message.message'>
              <b-card-text>from: {{message.UserId.username}}</b-card-text>
              </b-card>
          </div>
        </div>
      </div>

    <div id="send-chat" class="border-right border-left border-bottom">
      <form id="btm" @submit.prevent='sendMessage'>
        <div class="inputBox col-10 mt-3">
          <input type="text" id="inpuText" v-model='newMessage' placeholder="all message will be reset once a day" style='text-align: center;width: 100%; height: 40px'>
        </div>
          <button id="lc-send-button" type="submit" class="btn"><unicon name='message'></unicon> Send</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from '@/apis/server.js'
import io from 'socket.io-client'

export default {
  data () {
    return {
      messages: [],
      newMessage: null,
      socket: io.connect('http://localhost:3000')
    }
  },
  methods: {
    sendMessage () {
      const message = this.newMessage;
      axios({
        method: 'post',
        url: '/messages',
        data: { message },
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.socket.emit('send-message', data.msg)
          this.newMessage = null
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    },
    fetchMessage () {
      axios({
        method: 'get',
        url: '/messages',
        headers: {
          token: localStorage.getItem('token')
        }
      })
        .then(({data}) => {
          this.messages = data.msgs
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchMessage()

    this.socket.on('send-message', (data) => {
      this.messages.unshift(data)
    })
  }
}
</script>

<style>
.card {
  width: 100%
}
.header {
  height: 80px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #F8F9FA;
}

#message {
  padding: 5px;
  height: 67vh;
  overflow: auto;
  display: flex;
  flex-direction: column-reverse;

  background-color: white
}

#top {
  height: 73vh
}

#live-chat {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80vh;
  margin: 30px;
}

.inputBox{
  display: flex;
  justify-content: center;
  align-items: center;
}

#btm {
  display: flex;
  justify-content: space-between;
  padding: 15px;
  width: 100%;
  height:  90px;
  padding-top: 0;
}

.btnsend {
  display: flex;
  justify-content: center
}

#lc-title {
  background-color: #006266;
  color: white;
  font-weight: bold;
  border-radius: 3px;
  padding: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
}

h4 {
  margin-bottom: 0px;
}

#lc-send-button {
  background-color: #f09595;
  color: white;
  font-weight: bold;
  height: 50%;
  margin-top: 25px;
  margin-right: 18px;
}
</style>