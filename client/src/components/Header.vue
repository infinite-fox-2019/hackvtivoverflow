<template>
  <div class="container">
      <p id="brand" class="header-element">Hacktiv Overflow</p>
    <div class="header-element">
      <label>Search:</label>
      <input type="text" @keyup.enter="search"/>
    </div>
    <div class="buton-div header-element">
        <button>Login</button>
        <button>Sign up</button>
      <button>Logout</button>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style>
.container {
  background-color: white;
  justify-content: space-between;
  align-items: center;
  height: 50px;
  color: black;
  font-size: 20px;
  margin: 0%;
  border-top: 2px solid orange;
  border-bottom: 1px solid grey;
}
</style>
