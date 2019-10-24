<template>
  <div class="background">
    <div class="wrapper">
      <div class="root">
        <div>
          <p style="font-size: 1.6rem;">Edit your question</p>
        </div>
        <div class="content shadow-lg" style="display:flex; flex-direction: column;">
          <div class="box" style="width:100%; margin-bottom: 4vh;">
            <p class="title">Question Title</p>
            <input v-model="title" type="text" placeholder="Title" />
          </div>
          <div class="box" style="width:100%;">
            <p class="title">Question Body</p>
            <wysiwyg class="formQuestion" v-model="description" />
          </div>
          <div>
            <button
              v-if="this.$store.state.isLogin"
              @click.prevent="edit"
              class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
              style="border: none; font-size: 1rem; transition: 0.3s;"
            >Edit</button>
            <router-link v-else to="/login">
              <button
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                style="border: none; font-size: 1rem; transition: 0.3s;"
              >Login</button>
            </router-link>
          </div>
          <div class="output">
            <p style="font-weight: 700; font-size:1.5rem; margin-bottom: 3vh;" v-text="title"></p>
            <p style="width: 60vw; word-wrap: break-word;" v-html="description"></p>
          </div>
        </div>
      </div>
      <div></div>
    </div>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      title: "",
      description: ""
    };
  },
  methods: {
    edit() {
      this.$store.dispatch("updateQuestion", {
        id: this.$route.params.id,
        title: this.title,
        description: this.description
      });
    }
  },
  created() {
    this.$store.dispatch("fetchAQuestion", this.$route.params.id).then(data => {
      this.title = data.title;
      this.description = data.description;
    });
  }
};
</script>

<style scoped>
.title {
  margin-bottom: 2vh;
}
.output {
  margin-top: 5vh;
  margin-bottom: 5vh;
  border-top: 1px solid silver;
  border-bottom: 1px solid silver;
  padding-top: 3vh;
  padding-bottom: 3vh;
}
input {
  font-size: 0.8rem;
  padding: 0.4rem 0.8rem;
  width: 50vw;
  border-radius: 5px;
  border: 1px solid grey;
}
.content {
  padding: 1rem;
}

.background {
  min-width: 100vw;
  min-height: 93vh;
  background-color: #eff0f1;
}
.formQuestion {
  width: 60vw;
  overflow-wrap: break-word;
}
p {
  margin: 0;
}
.box {
  margin-bottom: 5vh;
}
button:hover {
  cursor: pointer;
}
.content {
  margin-top: 5vh;
  min-height: 70vh;
  background-color: white;
  border-radius: 5px;
}
.root {
  display: flex;
  width: 100%;
  flex-direction: column;
}
.wrapper {
  margin-left: auto;
  margin-right: auto;
  padding-top: 5vh;
  display: grid;
  width: 90%;
  padding-bottom: 10vh;
  grid-template-columns: 4fr 1fr;
}
</style>