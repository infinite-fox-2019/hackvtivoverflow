<template>
    <v-app>
        <v-app-bar app>
            <v-img src="@/assets/underflow.png" contain max-width="200"></v-img>
            <v-spacer></v-spacer>
        </v-app-bar>

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
export default {
    name: "App",
    components: {},
    data: () => ({
        //
    }),
    created() {}
};
</script>
