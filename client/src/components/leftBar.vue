<template>
<div class="main">
  <div class='rows'>
    <div class='cols'>
      <router-link to='/'>
        Home
      </router-link>
    </div>
    <div class="cols">
      <router-link to='/rating'>Top Views Question</router-link>
    </div>
    <div class="cols">
      <router-link to='/profile'>Profile</router-link>
    </div>
    <div class="cols">
      <router-link to='/tags'>Tags</router-link>
    </div>
    <div class="cols">
      <router-link to='/watch/tag'> Watch Tag </router-link>
    </div>
    <div class="cols">
      <router-link to='/chat'> Chat </router-link>
    </div>
    <div class="cols">
      <b-button @click="modalShow = !modalShow">Top Contributor</b-button>
    </div>
  </div>
  <b-modal v-model="modalShow">
    <div class="overflow-auto">
      <b-pagination
        v-model="currentPage"
        :total-rows="rows"
        :per-page="perPage"
        aria-controls="my-table"
      ></b-pagination>

      <p class="mt-3">Current Page: {{ currentPage }}</p>

      <b-table
        id="my-table"
        :items="items"
        :per-page="perPage"
        :current-page="currentPage"
        small
      ></b-table>
    </div>
  </b-modal>
</div>
</template>

<script>
import axios from '@/apis/server.js';

export default {
  data () {
    return {
      modalShow: false,
      perPage: 5,
      currentPage: 1,
      items: []
    }
  },
  computed: {
    rows() {
      return this.items.length
    }
  },
  methods: {
    fetchModal () {
      console.log('masuk method')
      axios({
        method: 'get',
        url: '/users/contribution'
      })
        .then(({data}) => {
          data.users.forEach((el, i) => {
            this.items.unshift({
              point: el.point,
              name: el.username,
              email: el.email
            })
          })
        })
        .catch(err => {
          this.$awn.warning(err.response.data.msg)
        })
    }
  },
  created () {
    this.fetchModal()
  }
}
</script>

<style>
.rows{
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgb(235, 228, 228);
  height: 44  vw
}
.cols{
  text-align: center;
  padding: 20px;
}
</style>