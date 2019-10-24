<template>
  <div>
    <div class="q-pa-md q-gutter-sm">
      <q-form @submit.prevent="update" class="q-gutter-md">
        <q-input outlined v-model="title" color="orange" label="Title" />
        <q-editor
          v-model="description"
          :dense="$q.screen.lt.md"
          :toolbar="[
            [
              {
                label: $q.lang.editor.align,
                icon: $q.iconSet.editor.align,
                fixedLabel: true,
                options: ['left', 'center', 'right', 'justify']
              }
            ],
            ['bold', 'italic', 'strike', 'underline'],
            ['hr'],
            [
              {
                label: $q.lang.editor.formatting,
                icon: $q.iconSet.editor.formatting,
                list: 'no-icons',
                options: ['p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'code']
              },
              {
                label: $q.lang.editor.fontSize,
                icon: $q.iconSet.editor.fontSize,
                fixedLabel: true,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'size-1',
                  'size-2',
                  'size-3',
                  'size-4',
                  'size-5',
                  'size-6',
                  'size-7'
                ]
              },
              {
                label: $q.lang.editor.defaultFont,
                icon: $q.iconSet.editor.font,
                fixedIcon: true,
                list: 'no-icons',
                options: [
                  'default_font',
                  'arial',
                  'arial_black',
                  'comic_sans',
                  'courier_new',
                  'impact',
                  'lucida_grande',
                  'times_new_roman',
                  'verdana'
                ]
              }
            ],
            ['quote', 'unordered', 'ordered'],
            ['undo', 'redo']
          ]"
          :fonts="{
            arial: 'Arial',
            arial_black: 'Arial Black',
            comic_sans: 'Comic Sans MS',
            courier_new: 'Courier New',
            impact: 'Impact',
            lucida_grande: 'Lucida Grande',
            times_new_roman: 'Times New Roman',
            verdana: 'Verdana'
          }"
        />
        <q-btn
          id="submitBtn"
          label="Update"
          type="submit"
          color="orange"
          glossy
        />
      </q-form>
    </div>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Update",
  data() {
    return {
      title: "",
      description: "",
      question: null,
      answer: null,
      mode: null
    };
  },
  methods: {
    fetchQuestion() {
      const { question } = this.$route.params;
      Axios({
        method: "get",
        url: `http://localhost:3000/question/${question}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.question = data;
          this.title = data.title;
          this.description = data.description;
        })
        .catch(console.log);
    },
    fetchAnswer() {
      const { question, answer } = this.$route.params;
      Axios({
        method: "get",
        url: `http://localhost:3000/answer/${question}/${answer}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.answer = data;
          this.title = data.title;
          this.description = data.description;
        })
        .catch(console.log);
    },
    update() {
      const data = {
        title: this.title,
        description: this.description
      };
      if (this.mode === "question") {
        Axios({
          method: "patch",
          url: `http://localhost:3000/question/${this.question._id}`,
          headers: { token: localStorage.getItem("token") },
          data
        })
          .then(({ data }) => {
            this.$router.push("/collection");
            this.$awn.success(data.response);
          })
          .catch(console.log);
      } else {
        Axios({
          method: "patch",
          url: `http://localhost:3000/answer/${this.answer.question._id}/${this.answer._id}`,
          headers: { token: localStorage.getItem("token") },
          data
        })
          .then(({ data }) => {
            this.$router.push("/collection");
            this.$awn.success(data.response);
          })
          .catch(console.log);
      }
    }
  },
  mounted() {
    if (this.$route.params.answer) {
      this.mode = "answer";
      this.fetchAnswer();
    } else {
      this.mode = "question";
      this.fetchQuestion();
    }
  }
};
</script>

<style scoped>
.q-editor {
  height: 65vh !important;
}
form {
  width: 60vw;
  margin-left: 20vw;
}
</style>
