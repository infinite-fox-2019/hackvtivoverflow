<template>
  <q-layout view="hHh Lpr fff">

    <NavBar/>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          Title
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script>
import NavBar from '@/components/NavBar';
export default {
  name: 'DefaultLayout',
  components: {
    NavBar
  },
  data () {
    return {
    }
  }
}
</script>