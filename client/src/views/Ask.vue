<template>
  <div class='askk'>
    <b-tabs
        active-nav-item-class="font-weight-bold text-uppercase text-danger"
        active-tab-class="font-weight-bold text-success"
        content-class="mt-3"
        align='center'
    >
        <b-tab title="Tags" active>
            <p>
                <b-form-select v-model="hasil" :options="options"></b-form-select>
            </p>
        </b-tab>
        <b-tab title="Description">
          <p>
            <vue-editor v-model='question'></vue-editor>
          </p>
        </b-tab>
    </b-tabs>
</div>
</template>

<script>
export default {
  data () {
      return {
        question: '',
        hasil: null,
        options: [
          { value: null, text: 'Please select an option' },
          { value: 'javascript', text: 'Javascript' },
          { value: 'c++', text: 'C++' },
          { value: 'vuex', text: 'Vuex' },
          { value: 'other', text: 'other'}
        ]
      }
  }
}
</script>

<style>
</style>