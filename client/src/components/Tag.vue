<template>
<div class='btnTags'>
  <b-badge class='btntag'><router-link :to='{ name: "tag", params: { name: getTag } }'><a href='#' class='atag'>{{getTag}}</a></router-link></b-badge>
</div>
</template>

<script>
export default {
    props: ['getTag']
}
</script>

<style>
.btntag{

  background-color: #9dd8c8 !important;
}
.btntag:hover{
  background-color:cadetblue !important;
}
.btnTags{
    margin-left: 5px;
}
.atag{
  color: blue
}
.atag:hover{
  color:black !important;
}
</style>