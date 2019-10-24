<template>
  <div>
    <q-header elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          H8-OverFlow
        </q-toolbar-title>
          
        <q-input  rounded outlined v-model="search" class="q-pr-xl" label="search" style="width:600px;">
          <template v-slot:append>
            <q-icon name="search" />
          </template>
        </q-input>

        <q-btn class="q-mr-sm" color="secondary" icon-right="person_add" label="Register" />
        <q-btn color="white" text-color="black" icon-right="person" label="Login" @click="login = true" />
      </q-toolbar>
    </q-header>

    <q-dialog v-model="login">
      <q-card  style="width: 700px; max-width: 80vw;">
        <q-card-section>
            <div class="text-h6">Login</div>
        </q-card-section>
        <q-form
          @submit="onSubmit"
          @reset="onReset"
          class="q-gutter-md q-pa-sm"
        >
          <q-input outlined v-model="email" filled type="email" label="Email" :dense="dense" />
          <q-input outlined v-model="password" filled type="password" label="Password" :dense="dense" />

          <div>
            <q-btn label="Submit" type="submit" color="primary"/>
            <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
          </div>
        </q-form>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  data(){
    return{
      login: false,
    }
  }
}
</script>

<style>

</style>