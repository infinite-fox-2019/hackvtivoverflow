<template>
  <div class="bccreate">
      <form @submit.prevent="asking">
    <div class="form-group">
      <br>
      <h1>Ask Question</h1>
      <div>
      </div>
    </div>
     <input type="text" class="title my-2" placeholder="Write your question here.." v-model="title">
    <wysiwyg class="box-edit" placeholder="Write question description here.." v-model="description"></wysiwyg>
        <div style="height:135px">
        <tags-input
        class="my-3 py-0"
          element-id="tags"
          v-model.lazy="tagsf"
          :existing-tags="existingTags"
          :typeahead="true"
          :only-existing-tags="true"
          input-class="form-control text-white"
          placeholder="Add tags"
        ></tags-input>

        </div>
        <b-button variant="light" size="lg"
        @click="doneWrite">Submit</b-button>
     </form>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  data () {
    return {
      title: '',
      description: '',
      tags: [],
      tagsf: []
    }
  },
  methods: {
    doneWrite () {
      axios({
        method: 'post',
        url: `/questions/`,
        headers: { token: localStorage.token },
        data: {
          title: this.title,
          description: this.description,
          tags: this.tags
        }
      })
        .then(data => {
          this.$router.push({ path: '/questions' })
        })
        .catch(err => {
          console.log(err.response)
        })
    }
  },
  computed: {
    existingTags () {
      let formattag = []
      let tagnya = this.$store.state.allTag
      tagnya.forEach(el => {
        let obj = {
          key: el.name,
          value: el.display
        }
        formattag.push(obj)
      })
      return formattag
    }
  },
  watch: {
    tagsf () {
      let arr = []
      this.tagsf.forEach(el => {
        arr.push(el.key)
      })
      this.tags = arr
    }
  },
  created () {
    this.$store.dispatch('getAllTag')
  }
}
</script>

<style scoped>
@import "~vue-wysiwyg/dist/vueWysiwyg.css";
.bccreate {
  width: calc(100vw - 17vw);
  min-height: calc(100vh - 8vh);
  background: rgb(75, 10, 10);
  display: flex;
  justify-content: center
}
form{
    width: 60%
}
input[type="text"]{
  height : 45px;
  width: 50.5vw;
  font-size: 12pt;
}
.editr {
  width: 50.5vw;
  height: 300px;
  background: whitesmoke;
  overflow: scroll;
  margin-top: 20px;
  margin-bottom: 20px
}
h1{
  color: white
}
</style>
