<template>
    <v-card
        dark
        outlined
        hover
        :color="randomColor"
        @click="$router.push('/thread/' + thread.slug)"
    >
        <v-row>
            <v-col cols="8" lg="10">
                <v-card-title>{{thread.title}}</v-card-title>
                <v-card-text v-html="thread.content"></v-card-text>
            </v-col>
            <v-col cols="4" lg="2" class="d-flex flex-column align-center">
                <v-card-title>Votes</v-card-title>
                <v-card-text class="text-center display-1">{{voteScore}}</v-card-text>
            </v-col>
            <v-col cols="4" class="d-flex flex-column align-center">
                <v-card-text class="text-center">{{thread.owner.username}}</v-card-text>
                <v-avatar>
                    <v-img :src="thread.owner.gravatar"></v-img>
                </v-avatar>
            </v-col>
            <v-col cols="8" class="d-flex flex-column align-end">
                <v-card-text class="text-end">Created: {{thread.createdAt | moment("from")}}</v-card-text>
                <v-card-text class="text-end">Updated: {{thread.updatedAt | moment("from")}}</v-card-text>
            </v-col>
            <v-col cols="12">
                <v-card-text>Views: {{thread.views}}</v-card-text>
            </v-col>
            <v-col cols="12">
                <v-chip class="mx-3" v-for="tag in thread.tags" :key="tag._id">{{tag.name}}</v-chip>
            </v-col>
        </v-row>
    </v-card>
</template>

<script>
export default {
    props: ["thread"],
    data() {
        return {
            colors: [
                "red",
                "pink",
                "purple",
                "deep-purple",
                "indigo",
                "blue",
                "cyan",
                "teal",
                "brown",
                "blue-grey",
                "deep-orange",
                "green"
            ]
        };
    },
    computed: {
        voteScore() {
            return this.thread.upvotes.length - this.thread.downvotes.length;
        },
        randomColor() {
            return this.colors[~~(Math.random() * this.colors.length)];
        }
    }
};
</script>

<style>
</style>