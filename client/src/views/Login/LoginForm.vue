<template>
    <div>
        <v-row>
            <v-col cols="12" class="d-flex justify-center">
                <h1>LOGIN</h1>
            </v-col>
            <v-col cols="12">
                <v-form ref="formlogin" @submit.prevent="submit">
                    <v-text-field label="Username / Email" v-model="identity" :rules="required"></v-text-field>
                    <v-text-field
                        label="Password"
                        type="password"
                        v-model="password"
                        :rules="required"
                    ></v-text-field>
                    <div class="d-flex justify-center">
                        <v-checkbox v-model="rememberMe" label="Remember me? (30 days)"></v-checkbox>
                    </div>
                    <v-btn block type="submit" :loading="loading">LOGIN</v-btn>
                </v-form>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <h3>Not a User?</h3>
            </v-col>
            <v-col cols="12" class="d-flex justify-center">
                <v-btn outlined @click="$router.push('/login/register')">Register</v-btn>
            </v-col>
        </v-row>
    </div>
</template>

<script>
export default {
    name: "login-form",
    data() {
        return {
            identity: "",
            password: "",
            required: [v => !!v || "Required."],
            rememberMe: false,
            loading: false
        };
    },
    methods: {
        async submit() {
            if (this.$refs.formlogin.validate()) {
                this.loading = true;
                const payload = {
                    identity: this.identity,
                    password: this.password,
                    expire: this.rememberMe
                };
                try {
                    await this.$store.dispatch("user/login", payload);
                    this.$router.push("/");
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