<template>
  <b-container class="w-75">
    <b-row class="border-left">
    <h2 class="my-4 ml-3">WPF Semi-dynamic grid</h2>
      <b-media>
        <template v-slot:aside>
          <b-container>
            <b-row>
              <b-col>
                <b-img width="40" src="https://image.flaticon.com/icons/svg/25/25223.svg" class="" alt="placeholder"></b-img>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h4 class="mb-0 text-center">189</h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40" class="" alt="placeholder"></b-img>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
          Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
          ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </b-media>
    </b-row>

    <b-row class="border-left mt-3">
      <h4 class="ml-3">Answer</h4>
      <b-media class="border-top pt-3">
        <p class="mb-2"><small class="text-primary">Kadek Dinarta Gita</small></p>
        <template v-slot:aside>
          <b-container>
            <b-row>
              <b-col>
                <b-img width="40" src="https://image.flaticon.com/icons/svg/25/25223.svg" class="" alt="placeholder"></b-img>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h4 class="mb-0 text-center">18</h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40" class="" alt="placeholder"></b-img>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
          Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
          ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </b-media>
      <b-media class="border-top pt-3">
        <p class="mb-2"><small class="text-primary">Dipadana Putu</small></p>
        <template v-slot:aside>
          <b-container>
            <b-row>
              <b-col>
                <b-img width="40" src="https://image.flaticon.com/icons/svg/25/25223.svg" class="" alt="placeholder"></b-img>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <h4 class="mb-0 text-center">8</h4>
              </b-col>
            </b-row>
            <b-row>
              <b-col>
                <b-img src="https://image.flaticon.com/icons/svg/25/25623.svg" width="40" class="" alt="placeholder"></b-img>
              </b-col>
            </b-row>
          </b-container>
        </template>
        <p>
          Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin.
          Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc
          ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.
        </p>
        <p>
          Donec sed odio dui. Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque
          penatibus et magnis dis parturient montes, nascetur ridiculus mus.
        </p>
      </b-media>
    </b-row>

    <b-row class=" border-left border-top">
      <b-col class="my-4">
        <h4 class="mb-4">Your Answer</h4>
        <ckeditor :editor="editor" v-model="editorData" :config="editorConfig"></ckeditor>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

export default {
  data() {
      return {
          editor: ClassicEditor,
          editorData: '<p>Content of the editohohohohoholalallar.</p>',
          editorConfig: {
              // The configuration of the editor.
          }
      };
  }

}
</script>

<style scope>
.ck-content { height:200px;}
</style>