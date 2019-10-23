<template>
    <div>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <h1>REGISTER</h1>
            </v-col>
            <v-col cols="12">
                <v-form ref="formregister" @submit.prevent="submit">
                    <v-text-field label="Username" v-model="username" :rules="required"></v-text-field>
                    <v-text-field label="Email" v-model="email" :rules="required" type="email"></v-text-field>
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        :rules="required"
                    ></v-text-field>
                    <v-btn block type="submit" :loading="loading">REGISTER</v-btn>
                </v-form>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <h3>Already a user?</h3>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <v-btn outlined @click="$router.push('/login')">Login</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    data() {
        return {
            username: "",
            email: "",
            password: "",
            required: [v => !!v || "Required."],
            loading: false
        };
    },
    methods: {
        async submit() {
            if (this.$refs.formregister.validate()) {
                this.loading = true;
                const payload = {
                    username: this.username,
                    email: this.email,
                    password: this.password
                };
                try {
                    await this.$store.dispatch("user/register", payload);
                    this.$awn.success("User registered, please login");
                    this.$router.push("/login");
                } catch (error) {
                    this.next(error);
                } finally {
                    this.loading = false;
                }
            }
        }
    }
};
</script>

<style>
</style>