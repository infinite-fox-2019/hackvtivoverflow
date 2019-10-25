<template>
  <div class="search">
      <div class="search-header">
          <div class="search-title">
              <p>Search results</p>
          </div>
          <div class="search-buttons">
              <button>Advanced search tips</button>
              <button @click="goToAskPage">Ask question</button>
          </div>
      </div>
      <div> Search result for 'error' </div>
      <div class="search-input">
          <input type="text" placeholder="error"/>
          <button>Search</button>
      </div>
      <div class="search-bottom">
          <div class="search-results-count">
              <p>500 results</p>
          </div>
          <div class="search-sort">
              <button>Relevance</button>
              <button>Newest</button>
              <select>
                <option value="Votes">Votes</option>
                <option value="Active">Active</option>
              </select>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    goToAskPage: function () {
      this.$router.push('/ask')
    }
  }
}
</script>

<style>
.search {
    display: flex;
    flex-direction: column;
    border-bottom: 1px;
    border-bottom-style: solid;
    border-bottom-color: grey;
}

.search-header {
    display: flex;
}

.search-bottom {
    display: flex;
}

.search-input {
    display: flex;
}

.search-input input {
    width: 80%;
    display: flex;
}

.search-title {
    width: 20vw;
    display: flex;
    align-items: center;
    justify-content: start;
}

.search-results-count {
    width: 20vw;
    display: flex;
    align-items: center;
    justify-content: start;
}

.search-buttons {
    width: 40vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.search-sort {
    width: 40vw;
    display: flex;
    justify-content: flex-end;
    align-items: center;
}

.search-buttons button {
    margin: 5px;
}
</style>
