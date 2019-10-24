<template>
    <v-container>
        <v-form ref="createthread" @submit.prevent="submit">
            <v-row>
                <v-col cols="12">
                    <v-text-field label="Title" v-model="title"></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-card light>
                        <wysiwyg v-model="content" />
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-card light outlined>
                        <v-toolbar dark dense>
                            <v-toolbar-title class="subtitle-2">Press enter to add tags</v-toolbar-title>
                        </v-toolbar>
                        <vue-tags-input
                            style="width:100vw"
                            v-model="tag"
                            :tags="tags"
                            @tags-changed="newTags => tags = newTags"
                        />
                    </v-card>
                </v-col>
                <v-col cols="12">
                    <v-btn block type="submit">Create</v-btn>
                </v-col>
            </v-row>
        </v-form>
    </v-container>
</template>

<script>
import VueTagsInput from "@johmun/vue-tags-input";

export default {
    name: "create-thread",
    data() {
        return {
            title: "",
            content: "",
            tags: [],
            tag: ""
        };
    },
    components: {
        VueTagsInput
    },
    methods: {
        async submit() {
            this.loadStart();
            try {
                let arr = [];
                this.tags.forEach(el => arr.push(el.text));
                if (!this.title && !this.content) {
                    throw new Error("Please set title and content of thread");
                }
                let data = await this.$store.dispatch(
                    "thread/createNewThread",
                    {
                        title: this.title,
                        content: this.content,
                        tags: arr
                    }
                );
                this.$router.push("/thread/" + data.slug);
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