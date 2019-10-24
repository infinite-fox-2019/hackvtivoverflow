<template>
  <div>
    <multiselect
      v-model="value"
      tag-placeholder="Add this as new tag"
      placeholder="Search or add a tag"
      label="name"
      track-by="name"
      :options="options"
      :multiple="true"
      :taggable="true"
      @tag="addTag"
    ></multiselect>
  </div>
</template>

<script>
import Multiselect from "vue-multiselect";

export default {
  components: {
    Multiselect
  },
  data() {
    return {
      value: [],
      options: []
    };
  },
  methods: {
    addTag(newTag) {
      const tag = {
        name: newTag,
        code: newTag.substring(0, 2) + Math.floor(Math.random() * 10000000)
      };
      this.options.push(tag);
      this.value.push(tag);
    }
  },
  watch: {
    value() {
      this.$emit("passingtags", this.value);
    }
  },
  created() {
    this.options = this.$store.state.tags;
  }
};
</script>

<style src="vue-multiselect/dist/vue-multiselect.min.css"></style>