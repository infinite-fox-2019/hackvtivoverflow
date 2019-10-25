<template>
  <div class="q-pa-md" style="max-width: 250px">
    <q-list>
      <q-item
        clickable
        v-ripple
        :active="link === 'home'"
        @click="link = 'home'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="home" />
        </q-item-section>

        <q-item-section>Home</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'person'"
        @click="link = 'person'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="person" />
        </q-item-section>

        <q-item-section>Your Questions</q-item-section>
      </q-item>

      <q-item
        clickable
        v-ripple
        :active="link === 'all'"
        @click="link = 'all'"
        active-class="my-menu-link"
      >
        <q-item-section avatar>
          <q-icon name="select_all" />
        </q-item-section>

        <q-item-section>All Questions</q-item-section>
      </q-item>

    </q-list>
  </div>
</template>

<script>
export default {
  name: 'SideBar'
}
</script>

<style>

</style>