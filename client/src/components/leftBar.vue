<template>
<div class="main">
    <div class='rows'>
        <div class='cols'>
            <router-link to='/'>
                Home
            </router-link>
        </div>
        <div class="cols">
            Hacktiv Overflow
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
}
</style>