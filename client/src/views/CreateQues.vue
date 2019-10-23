<template>
  <div class="bccreate">
    <div class="form-group">
      <label style="color:white">Interested In</label>
      <div>
        <tags-input
          element-id="tags"
          v-model.lazy="tagsf"
          :existing-tags="existingTags"
          :typeahead="true"
          :only-existing-tags="true"
          input-class="form-control text-white"
          placeholder="Add watchtag ( optional )"
        ></tags-input>
      </div>
    </div>
    <wysiwyg v-model="content" class="box-create"></wysiwyg>
  </div>
</template>

<script>
export default {};
</script>

<style>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.bccreate {
  width: calc(100vw - 10vw);
  min-height: calc(100vh - 8vh);
  background: rgb(75, 10, 10);
}

.editr {
  width: 50vw;
  height: 320px;
  background: whitesmoke;
  overflow: scroll;
}
</style>