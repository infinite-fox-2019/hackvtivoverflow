<template>
  <div class="side">
      <a>Home</a>
      <ul class="side-menu">Public
          <li>Stack Overflow</li>
          <li>Tags</li>
          <li>Users</li>
          <li>Jobs</li>
      </ul>
 </div>
</template>

<script>
export default {

}
</script>

<style>
.side {
    display: flex;
    margin: 2%;
    padding: 2%;
    flex-direction: column;
    align-items: flex-end;
    width: 10vw;
    height: 100vh;
    border-right: 1px;
    border-right-style: solid;
    border-right-color: grey;
}

.side-menu {
    list-style-type: none
}
</style>
