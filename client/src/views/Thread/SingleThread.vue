<template>
    <v-container>
        <v-row>
            <v-card>123123</v-card>
        </v-row>
    </v-container>
</template>

<script>
export default {
    created() {
        console.log(this.$route.params.id);
    }
};
</script>

<style>
</style>