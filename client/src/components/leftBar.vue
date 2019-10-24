<template>
<div class="main">
    <div class='rows'>
        <div class='cols'>
            <router-link to='/'>
                Home
            </router-link>
        </div>
        <div class="cols">
            <router-link to='/rating'>Rating</router-link>
        </div>
        <div class="cols">
          <router-link to='/profile'>Profile</router-link>
        </div>
        <div class="colbtm">
          
        </div>
    </div>
</div>
</template>

<script>
export default {

}
</script>

<style>
.rows{
    display: flex;
    flex-direction: column;
}
.cols{
    text-align: center;
    padding: 20px;
}
</style>