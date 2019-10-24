<template>
  <div id="rightbar">
    <b-card-group deck class="pt-4">
      <b-card bg-variant="default" header="Watchtag" text-variant="dark" class="text-center mx-5">
        <div v-if="!edit" name="card1">
          <div>
            <div class="d-flex mb-3">
              <b-button
                class="mx-1"
                variant="success"
                size="sm"
                v-for="(tag, index) in tags"
                :key="index"
                @click="toPage(tag)"
              >{{tag}}</b-button>
            </div>
            <b-button variant="outline-dark" @click="toEdit">Edit</b-button>
          </div>
        </div>
        <div v-else>
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
          <b-button variant="success" @click="updatewt">Submit</b-button>
        </div>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
import axios from '../config/axios'
export default {
  name: 'rightbar',
  data () {
    return {
      edit: false,
      tagsf: [],
      newtag: []
    }
  },
  computed: {
    user () {
      return this.$store.state.user
    },
    tags () {
      return this.user.watchTag
    },
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
  methods: {
    toEdit () {
      this.tagsfnya()
      this.edit = true
    },
    tagsfnya () {
      let arr = []
      this.tags.forEach(el => {
        let obj = {
          key: el,
          value: el
        }
        arr.push(obj)
      })
      this.tagsf = arr
    },
    updatewt () {
      this.edit = false
      axios({
        method: 'patch',
        url: '/users/watchtag',
        headers: {
          token: localStorage.getItem('token')
        },
        data: {
          watchTag: this.newtag
        }
      })
        .then(({ data }) => {
          this.$store.dispatch('getMyAcc')
        })
        .catch(err => {
          console.log(err)
        })
    },
    toPage (tag) {
      this.$store.dispatch('getQuesTag', tag)
      this.$router.push(`/questions/tag/${tag}`)
    }
  },
  watch: {
    tagsf () {
      let arr = []
      this.tagsf.forEach(el => {
        arr.push(el.key)
      })
      this.newtag = arr
    }
  },
  created () {
    this.$store.dispatch('getAllTag')
  }
}
</script>

<style scoped>
#rightbar {
  width: 25vw;
  height: 100%;
  background: rgb(245, 242, 242);
}
</style>
