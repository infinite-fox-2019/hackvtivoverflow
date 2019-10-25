<template>
  <div class="container">
    <div v-if="!tag"></div>
    <div class="boom" v-else>
      <div class="ask">
        <p style="font-size:32px">Questions tagged [{{tag.name}}]</p>
        <button @click="toPageWrite">Ask Question</button>
      </div>
      <p
        style="font-size:12px; text-align:left; margin: 10px"
        v-text="tag.desc"
      >JavaScript (not to be confused with Java) is a high-level, dynamic, multi-paradigm, object-oriented, prototype-based, weakly-typed, and interpreted language used for both client-side and server-side scripting. Its primary use is in the rendering and manipulation of web pages. Use this tag for questions regarding ECMAScript and its various dialects/implementations (excluding ActionScript and Google-Apps-Script).</p>
    </div>

    <div v-if="asks.length == 0">
      <img src="../assets/empty.svg" alt="empty" />
      <h1>NO QUESTION!</h1>
    </div>
    <div v-else>
      <div class="card-ask" v-for="(ask, index) in asks" :key="index">
        <div class="number">
          <p
            style="color: #757575; font-size: 24px;"
            v-text="ask.downvote.length+ask.upvote.length"
          ></p>
          <p style="color: #757575; font-size: 10px;">vote</p>

          <div class="answer">
            <p v-text="ask.answers.length">20</p>
            <p style="font-size:10px">answers</p>
          </div>

          <p style="color: #f38024; font-size:10px">{{ask.watcher.length}} views</p>
        </div>

        <div class="text">
          <p
            style="color: #007ED9; cursor:pointer"
            @click.prevent="goDetailAsk(ask._id)"
            v-text="ask.title"
          ></p>
          <div class="content">
            <p v-html="ask.content"></p>
          </div>
          <div class="tags">
            <p
              class="tag"
              v-for="(tag, i) in ask.tags"
              :key="i"
              v-text="tag.name"
              @click="goDetailTag(tag.name)"
            ></p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
let baseUrl = `http://52.14.60.30`;
export default {
  name: `ask-list`,
  data() {
    return {
      tag: null,
      asks: []
    };
  },
  methods: {
    toPageWrite() {
      this.$router.push("/writeask");
    },
    goDetailAsk(id) {
      this.$router.push(`/ask/${id}`);
    },
    goDetailTag(name) {
      this.$router.push(`/tag/${name}`);
    },
    findTagByName() {
      let name = this.$route.params.name;
      axios({
        method: `get`,
        url: `${baseUrl}/tags/${name}`
      })
        .then(({ data }) => {
          this.asks = data.asks;
          this.tag = data.tag;
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  computed: {},
  created() {
    this.findTagByName();
  }
};
</script>

<style scoped>
img {
  height: 200px;
}
.container {
  width: 70vw;
}

.boom {
  border-bottom: 1px solid #dbdcdc;
  padding-bottom: 20px;
}

.ask {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
}

.card-ask {
  display: flex;
  height: 150px;
  border-bottom: 1px solid #dbdcdc;
}

.number {
  text-align: center;
  width: 150px;
  padding: 10px;
}

.answer {
  border-radius: 5px;
  background-color: #5fba7d;
  margin: 10px 3px;
  padding: 10px;
  color: white;
}

.text {
  padding: 10px;
  text-align: left;
}

.content {
  width: 60vw;
  margin: 5px 0;
  padding: 5px 0;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tags {
  display: flex;
}

.tag {
  background-color: #cee0ed;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

button {
  width: 150px;
  height: 40px;
  background-color: #007ed9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>