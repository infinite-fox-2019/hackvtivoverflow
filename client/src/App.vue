<template>
    <v-app>
        <NavBar />

        <v-content>
            <router-view />
        </v-content>
    </v-app>
</template>

<script>
import NavBar from "@/components/NavBar/MainNavBar";
export default {
    name: "App",
    components: { NavBar },
    data: () => ({
        //
    }),
    created() {}
};
</script>
