<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <OriginalPoster v-if="thread" :OP="thread" @refresh="getCurrentThread()" />
            </v-col>
        </v-row>
        <v-row v-if="thread">
            <v-col v-for="reply in thread.replies" :key="reply._id" cols="12">
                <Reply :reply="reply" @refresh="getCurrentThread()" />
            </v-col>
        </v-row>
        <v-btn
            @click="$router.push('/thread/' + $route.params.id + '/reply')"
            v-if="$store.state.user.login"
            fab
            fixed
            bottom
            right
            color="pink"
            dark
        >
            <v-icon>mdi-plus</v-icon>
        </v-btn>
    </v-container>
</template>

<script>
import { mapState } from "vuex";
import OriginalPoster from "@/components/Thread/OP";
import Reply from "@/components/Thread/Reply";
export default {
    name: "single-thread",
    components: {
        OriginalPoster,
        Reply
    },
    computed: {
        ...mapState("thread", ["thread"])
    },
    methods: {
        async getCurrentThread() {
            try {
                this.loadStart();
                let data = await this.$store.dispatch(
                    "thread/getSingleThread",
                    {
                        id: this.$route.params.id,
                        query: {
                            sort: "createdAt",
                            order: 1
                        }
                    }
                );
            } catch (error) {
                this.next(error);
            } finally {
                this.loadEnd();
            }
        }
    },
    created() {
        this.getCurrentThread();
    },
    watch: {
        $route() {
            this.getCurrentThread();
        }
    }
};
</script>

<style>
</style>