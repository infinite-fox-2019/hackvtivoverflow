<template>
<div class="card25 card-blue-light">
  <div class="tittle">
    <h3>{{ getQuestion.title }}</h3>
    <div class="row">
      <div class="col">
        <small>Vote: {{ getQuestion.upvotes.length - getQuestion.downvotes.length }}</small>
      </div>
      <div class="col">
        <small>CreatedAt: {{ getQuestion.createdAt }}</small>
      </div>
    </div>
    <hr>
  </div>
  <div class="boddyy">
    <p v-html='getQuestion.description'></p>
    <hr>
  </div>
  <div class="foott">
    <div class="row">
      <div class="col-6">
        <div class='modall'>
           <b-button v-b-modal.modal-prevent-closing @click='editData()'>Edit Question</b-button>

        </div>
      </div>
      <div class="col-6 kanann">
     <b-button @click="showMsgBoxTwo(getQuestion._id)">Delete</b-button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios'

export default {
  data () {
    return {
      editedQuestion: {
        id: '',
        title: '',
        desc: ''
      }
    }
  },
  props: ['getQuestion'],
  methods: {
    editData () {
      this.editedQuestion.id = this.getQuestion._id;
      this.editedQuestion.title = this.getQuestion.title;
      this.editedQuestion.description = this.getQuestion.description
      this.$emit('oldQuestion', this.editedQuestion)
    },
    showMsgBoxTwo(id) {
      this.boxTwo = ''
      this.$bvModal.msgBoxConfirm('Are you sure want delete this Question?', {
        title: 'Please Confirm',
        size: 'sm',
        buttonSize: 'sm',
        okVariant: 'danger',
        okTitle: 'Sure',
        cancelTitle: 'No',
        footerClass: 'p-2',
        hideHeaderClose: false,
        centered: true
      })
        .then(value => {
          if(value) {
            axios({
              method: 'delete',
              url: `http://localhost:3000/questions/${id}`,
              headers: {
                token: localStorage.getItem('token')
              }
            })
              .then(({data}) => {
                this.$emit('fetchProfile')
                this.$awn.success('success')
              })
              .catch(err => {
                this.$awn.warning(err.response.data.msg)
              })
          } else {
            this.$awn.info('You cancel delete')
          }
        })
        .catch(err => {
          this.$awn.warning(err)
        })
    }
  }
}
</script>

<style lang='scss'>
.kanann{
  bottom: -10px;
}
.modall{
  padding:10px;
}
.button2{
  position: absolute;
  left: 50px;
  bottom: 12px;
  font-size: 14px;
  color: white;
  background: rgba(0,0,0,.2);
  text-decoration: none;
  text-transform: uppercase;
  padding: 10px 20px;
  transition: .3s all;
  &:hover {
    background: rgba(255,255,255,.8);
    color: #2e2e2e;
  }
}
.tittle {
  height: 100%;
}
.foott {
  height: 35px;
}
.boddyy {
  height:100%;
  margin-top: -25px;
}
</style>