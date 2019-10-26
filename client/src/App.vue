<template>
  <div id="app">
    <Navbar />
    <div class="container">
      <div class="row">
        <div class="col-md-3 my-3">
          <Menubar />
        </div>
        <div class="col-md-6 my-3">
          <router-view />
        </div>
        <div class="col-md-3 my-3">
          <div class="card">
            <div class="card-header">Top Questions</div>
            <div class="card-body">
              <p v-for="question in top.top" :key="question.id">
                <a
                  @click.prevent="$router.push(`/question/${question._id}`)"
                  href
                  >{{ question.title }}</a
                >
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Navbar from "@/components/Navbar";
import Menubar from "@/components/Menubar";

export default {
  created() {
    this.getTop();
  },
  computed: {
    top() {
      return this.$store.state.top;
    }
  },
  components: {
    Navbar,
    Menubar
  },
  methods: {
    getTop() {
      this.$store.dispatch("getTop");
    }
  }
};
</script>

<style></style>
