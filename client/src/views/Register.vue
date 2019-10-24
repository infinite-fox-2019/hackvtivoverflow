<template>
  <div id="card">
    <q-card style="width: 400px; max-width: 80vw;">
        <div class="q-pa-md" style="max-width: 400px">
          <h4>Register your account</h4> 
          <q-form
            @submit="onSubmit"
            @reset="onReset"
            class="q-gutter-md"
          >
          <q-input
            type="email"
            v-model="email"
            label="Your email *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please input your email']"
          />
          <q-input
            type="password"
            v-model="password"
            label="Your password *"
            lazy-rules
            :rules="[ val => val && val.length > 0 || 'Please input your password']"
          />
          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
          </q-form>
        </div>
      </q-card>
  </div>
</template>

<script>
export default {
  name : 'register',
  data(){
    return {
      email: '',
      password: '',
    }
  },
  methods : {
    onSubmit () {
      let payload = {
        email:this.email,
        password:this.password
      }
      this.$store.dispatch('register',payload)
        .then(()=>{
          this.$router.push('/')
           this.loginModalState = false
            this.$q.notify({
            color: 'green-4',
            textColor: 'white',
            icon: 'cloud_done',
            message: 'Submitted'
          })
        })
        .catch((err)=>{
          this.$q.notify({
          color: 'red-5',
          textColor: 'white',
          icon: 'warning',
          message: `${err.response.data.msg}`
        })
      })
    },
    onReset () {
      this.email = ''
      this.password = ''
    }
  }
}
</script>

<style>
#card{
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid rgba(0, 0, 0, 0.158);
  box-shadow: 0px 5px 5px 0px rgba(17, 17, 17, 0.473)
}
</style>