<template>
  <div class="bccreate">
    <form @submit.prevent="asking">
      <div class="form-group">
        <br />
        <h1>Edit Question</h1>
        <div></div>
      </div>
      <input
        type="text"
        class="title my-2"
        placeholder="Write your question here.."
        v-model="title"
      />
      <wysiwyg
        class="box-edit"
        placeholder="Write question description here.."
        v-model="description"
      ></wysiwyg>
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
      <b-button variant="light" size="lg" @click="doneEdit">Submit</b-button>
    </form>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../config/axios'
export default {
  data () {
    return {
      id: '',
      tags: [],
      tagsf: [],
      title: '',
      description: ''
    }
  },
  methods: {
    doneEdit () {
      axios({
        method: 'put',
        url: `/questions/` + this.id,
        headers: { token: localStorage.getItem('token') },
        data: {
          title: this.title,
          description: this.description,
          tags: this.tags
        }
      })
        .then(data => {
          this.$store.dispatch('getQuestions')
          this.$router.push({ path: '/questions' })
          Swal.fire({
            type: 'success',
            title: 'Success Edit!'
          })
        })
        .catch(err => {
          console.log(err)
          //   let errors = err.response.data.errMsg.join("<br>");
          //   Swal.fire({
          //     type: "error",
          //     title: "Error!",
          //     html: errors
          //   });
          //   console.log(err.response.data.msg);
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
    let id = this.$store.state.editThis
    axios({
      method: 'get',
      url: '/questions/' + id,
      headers: {
        token: localStorage.getItem('token')
      }
    }).then(({ data }) => {
      this.id = data.question._id
      let question = data.question
      this.title = question.title
      this.description = question.description
      this.tags = question.tags
      this.tags.forEach(el => {
        let obj = {
          key: el,
          value: el
        }
        this.tagsf.push(obj)
      })
    })
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
  justify-content: center;
}
form {
  width: 60%;
}
input[type="text"] {
  height: 45px;
  width: 50.5vw;
  font-size: 12pt;
}
.editr {
  width: 50.5vw;
  height: 300px;
  background: whitesmoke;
  overflow: scroll;
  margin-top: 20px;
  margin-bottom: 20px;
}
h1 {
  color: white;
}
</style>
