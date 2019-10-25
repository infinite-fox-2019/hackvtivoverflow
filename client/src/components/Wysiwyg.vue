<template>
  <wysiwyg v-model="myHTML" />
</template>

<script>
import "../../node_modules/vue-wysiwyg/dist/vueWysiwyg.css";
export default {
  name: "wysiwyg-vue",
  data() {
    return {
      myHTML: ""
    };
  },
  props: ["post"],
  watch: {
    myHTML() {
      this.$emit("passingcontent", this.myHTML);
    },
    post() {
      if (this.post.length == 0) {
        this.content = "";
      }
    }
  }
};
</script>

<style>
</style>