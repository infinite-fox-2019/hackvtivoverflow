<template>
  <div class="q-pa-md q-gutter-sm">
    <q-form @submit.prevent="create" class="q-gutter-md">
      <q-input outlined v-model="title" color="orange" label="Title" />
      <q-editor
        v-model="qeditor"
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
      <q-btn label="Post Your Answer" type="submit" glossy color="orange" />
    </q-form>
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "Editor",
  props: {
    question: Object
  },
  data() {
    return {
      title: "",
      qeditor: ""
    };
  },
  methods: {
    create() {
      const data = {
        title: this.title,
        description: this.qeditor
      };
      Axios({
        method: "post",
        url: `http://hoverflow-server.ricky-works.online/question`,
        headers: { token: localStorage.getItem("token") },
        data
      })
        .then(({ data }) => {
          const { response } = data;
          this.$awn.success(response);
          this.$router.push("/collection");
        })
        .catch(({ response }) => {
          const { data } = response;
          let message = data.errors[0];
          this.$awn.alert(message);
        });
    }
  },
  mounted() {
    if (!this.$store.state.user) {
      this.$router.push("/");
    }
  },
  watch: {
    "$store.state.user"() {
      if (!this.$store.state.user) {
        this.$router.push("/");
      }
    }
  }
};
</script>

<style scoped>
button.q-btn {
  margin-left: 15vw !important;
}
.q-field--outlined {
  width: 70vw !important;
  margin-left: 15vw !important;
}
.q-editor {
  height: 65vh !important;
  width: 70vw;
  margin-left: 15vw;
}
</style>
