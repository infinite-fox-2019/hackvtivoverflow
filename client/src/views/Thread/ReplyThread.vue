<template>
    <v-container>
        <v-form ref="createthread" @submit.prevent="submit">
            <v-row>
                <v-col cols="12">
                    <v-btn
                        dark
                        color="red accent-4"
                        @click="$router.push('/thread/' + $route.params.id)"
                    >Back</v-btn>
                </v-col>
                <v-col cols="12">
                    <h1>Reply</h1>
                    <v-card light>
                        <wysiwyg v-model="content" />
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-btn block type="submit">Reply</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
export default {
    name: "create-thread",
    data() {
        return {
            content: ""
        };
    },
    components: {},
    methods: {
        async submit() {
            this.loadStart();
            try {
                await this.$store.dispatch("reply/reply", {
                    id: this.$route.params.id,
                    content: this.content
                });
                this.$router.push("/thread/" + this.$route.params.id);
                this.$emit("refresh");
            } catch (error) {
                this.next(error);
            } finally {
                this.loadEnd();
            }
        }
    }
};
</script>

<style scoped>
.vue-tags-input {
    max-width: none !important;
    width: 100% !important;
}
</style>