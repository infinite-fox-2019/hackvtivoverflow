<template>
    <div>
        <button class="btn btn-success" @click="showModal">update</button>
        <div>
            <b-modal ref="my-modal" hide-footer title="Update Answer">
                <form>
                    <div class="d-block text-center">
                        <div>
                            <quill v-model="description" output="html" :config="config"></quill>
                        </div>
                    </div>
                        <b-button class="mt-3" variant="outline-success" block @click="updateAnswer">Update Answer</b-button>
                        <b-button class="mt-3" variant="outline-danger" block @click="hideModal">Cancel</b-button>
                </form>
            </b-modal>
        </div>
    </div>
</template>

<script>
import Vue from 'vue'
import VueQuill from 'vue-quill'
import Swal from 'sweetalert2'

Vue.use(VueQuill)

export default {
  name: 'updateAnswer',
  data () {
    return {
      config: {
        placeholder: 'Description Here ...',
        modules: {
          toolbar: [
            ['bold', 'italic', 'underline', 'strike'], // toggled buttons
            ['blockquote', 'code-block'],

            [{ 'header': 1 }, { 'header': 2 }], // custom button values
            [{ 'list': 'ordered' }, { 'list': 'bullet' }],
            [{ 'script': 'sub' }, { 'script': 'super' }], // superscript/subscript
            [{ 'indent': '-1' }, { 'indent': '+1' }], // outdent/indent
            [{ 'direction': 'rtl' }], // text direction

            [{ 'size': ['small', false, 'large', 'huge'] }], // custom dropdown
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

            [{ 'color': [] }, { 'background': [] }], // dropdown with defaults from theme
            [{ 'font': [] }],
            [{ 'align': [] }],

            ['clean'] // remove formatting button
          ]
        }
      }
    }
  },
  props: [
    'id',
    'description'
  ],
  methods: {
    showModal () {
      this.$refs['my-modal'].show()
    },
    hideModal () {
      this.$refs['my-modal'].hide()
    },
    updateAnswer () {
      this.$store.dispatch('updateAnswer', { id: this.id, description: this.description })
        .then(data => {
          Swal.fire({
            position: 'top-end',
            type: 'success',
            title: `Success Update Answer`,
            showConfirmButton: false,
            timer: 2000
          })
          this.hideModal()
          return this.$store.dispatch('getAnswer', this.$route.params.id)
        })
        .then(data => {

        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: JSON.parse(err.response.request.response).message[0]
          })
        })
        .catch(err => {
          Swal.fire({
            type: 'error',
            title: 'Oops...',
            text: JSON.parse(err.response.request.response).message[0]
          })
        })
    }
  }
}
</script>

<style>
    .modal-dialog {
        max-width: 70% !important;
    }
</style>
