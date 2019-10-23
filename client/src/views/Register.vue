<template>
  <div class="bck">
    <div class="boxin">
      <div class="my-4">
      <h1>Create An Account</h1>
      </div>
      <div class="mx-5 px-5">
        <form @submit.prevent="tryRegister">
          <div class="form-group">
            <label for="exampleInputEmail1" style="color:white">Name</label>
            <input v-model="namer" type="text" class="form-control" placeholder="Your name" />
          </div>
          <div class="form-group">
            <label for="exampleInputEmail1" style="color:white">Email</label>
            <input
              v-model="emailr"
              type="email"
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1" style="color:white">Password</label>
            <input
              v-model="passwordr"
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
            />
          </div>
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
          <br>
          <b-button @click="tryRegister" variant="outline-warning" style="font-weight:700">Submit</b-button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import Swal from 'sweetalert2'
import axios from '../config/axios'
export default {
  name: 'register',
  data() {
    return {
      namer: "",
      emailr: "",
      passwordr: "",
      tagsf: [],
      tags: []
    };
  },
  computed: {
    existingTags() {
      let formattag = [];
      let tagnya = this.$store.state.allTag;
      tagnya.forEach(el => {
        let obj = {
          key: el.name,
          value: el.display
        };
        formattag.push(obj);
      });
      return formattag;
    }
  },
  methods: {
    tryRegister(){
      axios({
        method: 'post',
        url: '/users/',
        data: {
          name: this.namer,
          email: this.emailr,
          password: this.passwordr,
          watchTag: this.tags
        }
      })
      .then(({data})=>{
        localStorage.setItem("_id", data._id)
        localStorage.setItem("email", data.email)
        localStorage.setItem("token", data.token)
        this.$store.commit("SET_ISLOGIN", true)
        this.$router.push('/questions')
        console.log(data);
      })
      .catch(err =>{
        let errors = err.response.data.errMsg.join("<br>")
        Swal.fire({
            type: 'error',
            title: 'Error!',
            html: errors
        })
        console.log(err)
      })
      .finally(()=>{
        this.namer = ""
        this.emailr = ""
        this.passwordr = ""
        this.tagsf = []
        this.tags = []
      })
    }
  },
  watch: {
    tagsf() {
      let arr = [];
      this.tagsf.forEach(el => {
        arr.push(el.key);
      });
      this.tags = arr;
    }
  },
  created() {
    this.$store.dispatch("getAllTag");
  }
};
</script>

<style scoped>
.boxin {
  background: rgba(0, 0, 0, 0.589);
  width: 50%;
  height: 650px;
}
.bck {
  display: flex;
  justify-content: center;
  align-items: center;
  background: url(../assets/ph.jpeg);
  width: 100vw;
  height: calc(100vh - 10vh);
}
h1{
  color: white;
}
</style>
