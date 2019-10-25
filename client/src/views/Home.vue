<template>
  <div class="">
    <nav-bar-start></nav-bar-start>
    <div class="row">
      <div id="mySidenav" class="sidenav">
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Clients</a>
      <a href="#">Contact</a>
    </div>
    <div class="container">
    <List v-for="(item, index) in listQuestion" :key="index" class="card" id="questionList">
      <template v-slot:totalVotes>
        <div class="col sm-1 ml-1">
          <h4>{{ item.upVotes.length - item.downVotes.length }}</h4>
          <h6>Votes</h6>
        </div>
      </template>
      <template v-slot:totalAnswers>
        <div class="col sm-1 ml-1">
          <h4>0</h4>
          <h6>Answers</h6>
        </div>
      </template>
      <template v-slot:questionList>
        <div>
          <a href='#' @click.prevent="questionDetail(item._id)">{{ item.title }}</a>
          <p v-html="getDescription(index)"></p>
        </div>
      </template>
    </List>
    </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex'
import NavBarStart from '../components/NavBarStart'
import List from '../components/List'
export default {
  name: 'home',
  components: {
    NavBarStart,
    List
  },
  computed: {
    ...mapState(['listQuestion'])
  },
  created () {
    this.$store.dispatch('setListQuestion')
  },
  methods: {
    questionDetail (id) {
      this.$store.dispatch('questionDetail', id)
    },
    getDescription (index) {
      let arr = this.listQuestion[index]
      if (arr.description.length >= 50) {
        return arr.description.slice(0, 50) + '...'
      } else {
        return arr.description
      }
    }
  }

}
</script>
<style scoped>
.modal-body {
  padding: 5px;
  margin: 10px;
}
#btn-login {
  margin: 10px;
  padding: 5px;
}
#btn-register {
  margin: 10px;
  padding: 5x;
}
#questionList {
  padding: 10px;
}
/* The side navigation menu */
.sidenav {
  height: 100%; /* 100% Full-height */
  width: 150px; /* 0 width - change this with JavaScript */
  position: fixed; /* Stay in place */
  z-index: 1; /* Stay on top */
  top: 10; /* Stay at the top */
  left: 0;
  background-color: rgb(248, 248, 248); /* Black*/
  overflow-x: hidden; /* Disable horizontal scroll */
  padding-top: 60px; /* Place content 60px from the top */
  transition: 0.5s; /* 0.5 second transition effect to slide in the sidenav */
}

/* The navigation menu links */
.sidenav a {
  padding: 8px 8px 8px 32px;
  text-decoration: none;
  font-size: 25px;
  color: #818181;
  display: block;
  transition: 0.3s;
}

/* When you mouse over the navigation links, change their color */
.sidenav a:hover {
  color: #f1f1f1;
}

/* Position and style the close button (top right corner) */

/* Style page content - use this if you want to push the page content to the right when you open the side navigation */
#main {
  transition: margin-left .5s;
  padding: 20px;
}

/* On smaller screens, where height is less than 450px, change the style of the sidenav (less padding and a smaller font size) */
@media screen and (max-height: 450px) {
  .sidenav {padding-top: 15px;}
  .sidenav a {font-size: 18px;}
}
</style>
