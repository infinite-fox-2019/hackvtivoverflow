<template>
  <div class="home">
    <b-container>
      <b-row>

        <b-col class="">
          <b-jumbotron header="Question List" class="p-5" lead="">
            <b-button class="mt-3" variant="primary" href="#">Add Question</b-button>
          </b-jumbotron>
        </b-col>
        
        
      </b-row>
      <b-row  align-v="center" no-gutters class="p-1 border-bottom border-top">
        <b-col md="1" class="">
          <p class="text-center border m-1 p-1">1<br>votes</p>
        </b-col>
        <b-col md="1">
          <p class="text-center border m-1 p-1">1<br>answer</p>
        </b-col>
        <b-col md="1">
          <p class="text-center border m-1 p-1">1<br>views </p>
        </b-col>
        <b-col md="9" class="font-weight-bold text-break">
          <p>Why my code is always suck?</p>
            
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'home',
  components: {
    
  }
}
</script>
