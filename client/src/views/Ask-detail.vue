<template>
  <div class="container">
    <div v-if="!ask"></div>

    <p style="font-size: 24px;" v-if="ask">
      <strong v-text="ask.title"></strong>
    </p>

    <div class="mini-info" v-if="ask">
      <p>published</p>
      <p>20 September 2019</p>
    </div>

    <div class="content" v-if="ask">
      <div class="vote">
        <i class="fas fa-chevron-up fa-2x" @click.prevent="upvoteAsk(ask._id)"></i>
        <p v-text="vote"></p>
        <i class="fas fa-chevron-down fa-2x" @click.prevent="downvoteAsk(ask._id)"></i>
      </div>

      <div class="content-ask">
        <p v-html="ask.content"></p>
      </div>
    </div>

    <div class="answer-container" v-if="ask">
      <p>{{ask.answers.length}} Answer</p>
      <div class="content" v-for="(answer, i) in ask.answers" :key="i">
        <div class="vote">
          <i class="fas fa-chevron-up fa-2x" @click.prevent="upvoteAnswer(answer._id)"></i>
          <p v-text="answer.upvote.length - answer.downvote.length"></p>
          <i class="fas fa-chevron-down fa-2x" @click.prevent="downvoteAnswer(answer._id)"></i>
        </div>

        <div class="content-answer">
          <p v-html="answer.content"></p>
        </div>
      </div>
    </div>

    <div v-if="ask">
      <p>Your Answer</p>
      <Wysiwyg @passingcontent="passingcontent" :post="content" />
      <button @click="postAnswer(ask._id)">Post Answer</button>
    </div>
  </div>
</template>

<script>
import Wysiwyg from "../components/Wysiwyg.vue";
import axios from "axios";
let baseUrl = `https://me.maulanaghozi.web.id`;
export default {
  name: `ask-detail`,
  data() {
    return {
      content: "",
      ask: null
    };
  },
  components: {
    Wysiwyg
  },
  computed: {
    vote() {
      return this.ask.upvote.length - this.ask.downvote.length;
    }
  },
  methods: {
    passingcontent(content) {
      this.content = content;
    },
    postAnswer(id) {
      if(!localStorage.getItem("token")){
        this.$router.push('/login')
      } else {

        axios({
          method: `post`,
        url: `${baseUrl}/answers/${id}`,
        data: {
          content: this.content
        },
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.content = "";
          this.getAsk();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    getAsk() {
      let id = this.$route.params.id;
      axios({
        method: `get`,
        url: `${baseUrl}/asks/${id}`
      })
        .then(({ data }) => {
          this.ask = data;
        })
        .catch(err => {
          console.log(err);
        });
    },
    upvoteAsk(id) {
      if(!localStorage.getItem("token")){
        this.$router.push('/login')
      } else {
        axios({
          method: `patch`,
        url: `${baseUrl}/asks/upvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.getAsk();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    downvoteAsk(id) {
      if(!localStorage.getItem("token")){
        this.$router.push('/login')
      } else {

        axios({
          method: `patch`,
        url: `${baseUrl}/asks/downvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.getAsk();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    upvoteAnswer(id) {
      if(!localStorage.getItem('token')){
        this.$router.push('/login')
      } else {

        axios({
          method: `patch`,
        url: `${baseUrl}/answers/upvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.getAsk();
        })
        .catch(err => {
          console.log(err);
        });
      }
    },
    downvoteAnswer(id) {
      if(!localStorage.getItem("token")){
        this.$router.push('/login')
      } else {
        axios({
          method: `patch`,
        url: `${baseUrl}/answers/downvote/${id}`,
        headers: {
          token: localStorage.getItem("token")
        }
      })
        .then(({ data }) => {
          this.getAsk();
        })
        .catch(err => {
          console.log(err);
        });
      }
    }
  },
  created() {
    this.getAsk();
  }
};
</script>

<style scoped>
.container {
  text-align: left;
  padding: 20px;
  width: 75vw;
  display: flex;
  flex-direction: column;
}
.mini-info {
  display: flex;
  margin-top: 10px;
}

.mini-info p {
  font-size: 10px;
  margin-right: 10px;
}

.content {
  padding-top: 20px;
  display: flex;
  margin-top: 20px;
  border-top: 1px solid black;
}

.vote {
  text-align: center;
  margin-right: 10px;
}

.answer-container {
  margin-top: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top: 1px solid black;
  border-bottom: 1px solid #000;
  width: 100%;
}
button {
  width: 150px;
  height: 40px;
  background-color: #007ed9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
}
</style>