<template>
  <div>
    <q-drawer show-if-above v-model="left" :width="200" side="left" bordered>
        <SideBar/>
    </q-drawer>

    <q-drawer show-if-above v-model="right" side="right" bordered>
      <!-- drawer content -->
    </q-drawer>
    
    <q-page class="flex flex-center">
      <img alt="Quasar logo" src="../assets/logo.png">
    </q-page>
  </div>
</template>

<style>
</style>

<script>
import SideBar from '../components/SideBar';
export default {
  name: 'PageHome',
  components: {
    SideBar
    } 
    
}
</script>
