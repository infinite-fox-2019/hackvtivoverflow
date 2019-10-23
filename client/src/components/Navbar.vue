<template>
  <div>
    <nav id="nav1">
      <div class="redcode"></div>
      <div class="logout"></div>
    </nav>
    <nav id="nav2" class="px-4">
      <div class="date">
        <p>
        {{today}}
        </p>
      </div>
    </nav>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  computed: {
    today () {
      return new Date().toDateString()
    }
  },
};
</script>

<style scoped>
#nav1{
  height: 6vh;
  width: 100vw;
  background-color: black
}
#nav2{
  height: 4vh;
  width: 100vw;
  background-color:#bbbbbb;
  display: flex;
  justify-content: flex-end;
}
p{
  margin-top: 3px;
  display: flex;
  font-weight: 800;
  align-self: center
}
</style>