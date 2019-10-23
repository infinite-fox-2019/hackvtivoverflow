<template>
    <v-container>
        <v-row>
            <v-col cols="12">
                <v-card class="pa-12"></v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
// @ is an alias to /src

export default {
    name: "home",
    components: {},
    methods: {
        async getThreads() {
            try {
                this.loadStart();
                let data = await this.$store.dispatch("thread/getThreads");
                console.log(data);
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
