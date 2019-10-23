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
  }
};
</script>

<style>
</style>