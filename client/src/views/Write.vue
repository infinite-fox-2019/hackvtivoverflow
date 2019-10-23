<template>
  <div class="container">
    <div class="title">
      <form>
        <input type="text" placeholder="Enter Title" />
      </form>
    </div>
    <Multiselect />
    <Wysiwyg />
    <button>Post Question</button>
  </div>
</template>

<script>
import Wysiwyg from "../components/Wysiwyg.vue";
import Multiselect from "../components/Multi-select.vue";
export default {
  name: "write",
  components: {
    Wysiwyg,
    Multiselect
  }
};
</script>

<style scoped>
.container {
  width: 80vw;
  margin: 10px auto;
  display: flex;
  flex-direction: column;
}

.title {
  width: 100%;
}
form {
  width: 100%;
}

input {
  width: 100%;
  height: 40px;
  padding: 5px 10px;
  border-radius: 5px;
  border: 1px solid #d3d3d3;
  font-size: 18px;
}
button {
  width: 150px;
  height: 40px;
  background-color: #007ed9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  align-self: flex-end;
}
</style>