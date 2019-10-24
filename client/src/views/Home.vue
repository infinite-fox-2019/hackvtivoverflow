<template>
    <v-container>
        <v-row>
            <v-col v-for="thread in threads" :key="thread._id" cols="12">
                <ThreadList :thread="thread" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src
import { mapState } from "vuex";
import ThreadList from "@/components/Thread/ThreadList";
export default {
    name: "home",
    components: {
        ThreadList
    },
    computed: {
        ...mapState("thread", ["threads"])
    },
    methods: {
        async getThreads() {
            try {
                this.loadStart();
                await this.$store.dispatch("thread/getThreads");
            } catch (err) {
                this.next(err);
            } finally {
                this.loadEnd();
            }
        }
    },
    created() {
        this.getThreads();
    }
};
</script>
