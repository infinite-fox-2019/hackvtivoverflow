<template>
    <v-card>
        <v-container>
            <v-row>
                <v-col cols="1" class="d-flex flex-column align-center ml-4">
                    <v-icon
                        size="36"
                        @click.stop="_upvote"
                        v-if="!(status === 'upvote')"
                    >mdi-arrow-up-bold</v-icon>

                    <v-icon
                        size="36"
                        @click.stop="_unvote"
                        v-if="status === 'upvote'"
                        color="orange"
                    >mdi-arrow-up-bold</v-icon>

                    <p class="title my-2">{{voteScore}}</p>

                    <v-icon
                        size="36"
                        @click.stop="_unvote"
                        v-if="status === 'downvote'"
                        color="red"
                    >mdi-arrow-down-bold</v-icon>

                    <v-icon
                        size="36"
                        @click.stop="_downvote"
                        v-if="!(status === 'downvote')"
                    >mdi-arrow-down-bold</v-icon>
                </v-col>
                <v-col cols="11" class="ml-n4">
                    <v-list-item three-line>
                        <v-list-item-content>
                            <div
                                class="overline mb-4"
                            >Created {{reply.createdAt | moment("from")}} | Last Edit {{reply.updatedAt | moment("from")}}</div>
                            <v-list-item-subtitle>{{reply.owner.username}} replied</v-list-item-subtitle>
                            <v-list-item-subtitle v-html="reply.content"></v-list-item-subtitle>
                        </v-list-item-content>

                        <v-list-item-avatar class="d-none d-sm-flex" tile size="80" color="grey">
                            <v-img :src="reply.owner.gravatar"></v-img>
                        </v-list-item-avatar>
                    </v-list-item>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
import { mapActions } from "vuex";

export default {
    name: "reply",
    props: ["reply"],
    data() {
        return {
            status: "unvote"
        };
    },
    computed: {
        voteScore() {
            return this.reply.upvotes.length - this.reply.downvotes.length;
        }
    },
    methods: {
        ...mapActions("thread", ["upvote", "downvote", "unvote"]),
        async _upvote() {
            this.loadStart();
            try {
                await this.upvote(this.reply._id);
                this.$emit("refresh");
            } catch (error) {
                this.next(error);
            } finally {
                this.loadEnd();
            }
        },
        async _downvote() {
            this.loadStart();
            try {
                await this.downvote(this.reply._id);
                this.$emit("refresh");
            } catch (error) {
                this.next(error);
            } finally {
                this.loadEnd();
            }
        },
        async _unvote() {
            this.loadStart();
            try {
                await this.unvote(this.reply._id);
                this.$emit("refresh");
            } catch (error) {
                this.next(error);
            } finally {
                this.loadEnd();
            }
        }
    },
    created() {
        const id = this.$store.state.user.id;
        if (this.reply.upvotes.includes(id)) {
            this.status = "upvote";
        } else if (this.reply.downvotes.includes(id)) {
            this.status = "downvote";
        } else {
            this.status = "unvote";
        }
    },
    watch: {
        reply(val) {
            const id = this.$store.state.user.id;
            if (val.upvotes.includes(id)) {
                this.status = "upvote";
            } else if (val.downvotes.includes(id)) {
                this.status = "downvote";
            } else {
                this.status = "unvote";
            }
        }
    }
};
</script>

<style>
</style>