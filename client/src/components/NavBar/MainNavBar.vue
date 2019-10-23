<template>
    <div>
        <v-navigation-drawer v-model="drawer" @input="getInput" @close="closeDrawer" app>
            <NavigationDrawer />
        </v-navigation-drawer>
        <v-app-bar app>
            <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
            <v-img src="@/assets/underflow.png" contain max-width="200"></v-img>
            <v-spacer></v-spacer>
            <v-btn text v-if="(path === '/admin' || path === '/') && !loading">
                <v-icon>mdi-refresh</v-icon>
            </v-btn>
            <v-progress-circular v-if="loading" indeterminate></v-progress-circular>
            <v-btn text v-if="(path === '/admin' || path === '/')">
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
        </v-app-bar>
    </div>
</template>

<script>
import { mapState } from "vuex";
import NavigationDrawer from "./NavigationDrawer";
export default {
    name: "main-nav-bar",
    components: {
        NavigationDrawer
    },
    data() {
        return {
            drawer: null,
            loading: false,
            dialog: false
        };
    },
    methods: {
        closeDrawer() {
            this.drawer = false;
        },
        getInput(val) {
            this.drawer = val;
        }
    },
    computed: {
        path: function() {
            return this.$route.path;
        }
    },
    created() {}
};
</script>

<style>
</style>