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
  watch: {
    myHTML() {
      this.$emit("passingcontent", this.myHTML);
    }
  }
};
</script>

<style>
</style>