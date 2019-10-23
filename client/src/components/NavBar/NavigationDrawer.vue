<template>
    <div>
        <Profile v-if="username" @close="$emit('close')" />
        <v-list dense>
            <router-link
                v-if="!login"
                to="/login"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
                <v-list-item :active="isActive" :href="href" @click="navigate">
                    <v-list-item-action>
                        <v-icon>mdi-login</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Login</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>

            <router-link to="/" v-slot="{ href, route, navigate, isActive, isExactActive }">
                <v-list-item :active="isActive" :href="href" @click="navigate">
                    <v-list-item-action>
                        <v-icon>mdi-home</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Home</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>

            <router-link
                v-if="login"
                to="/thread/create"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
                <v-list-item :active="isActive" :href="href" @click="navigate">
                    <v-list-item-action>
                        <v-icon>mdi-plus</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Create New Thread</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>

            <router-link
                v-if="login"
                to="/subscribed"
                v-slot="{ href, route, navigate, isActive, isExactActive }"
            >
                <v-list-item :active="isActive" :href="href" @click="navigate">
                    <v-list-item-action>
                        <v-icon>mdi-post</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>My Threads</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>

            <router-link to="/tags" v-slot="{ href, route, navigate, isActive, isExactActive }">
                <v-list-item :active="isActive" :href="href" @click="navigate">
                    <v-list-item-action>
                        <v-icon>mdi-tag-multiple</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Most Watched</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </router-link>
        </v-list>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Profile from "./Profile";

export default {
    name: "navigation-drawer-items",
    computed: {
        ...mapState("user", ["login", "username"])
    },
    components: {
        Profile
    },
    methods: {}
};
</script>

<style>
</style>