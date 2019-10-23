<template>
    <v-card>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-img src="../assets/underflow.png"></v-img>
                </v-col>

                <v-col cols="12">
                    <v-container>
                        <router-view />
                    </v-container>
                </v-col>
            </v-row>
        </v-container>
    </v-card>
</template>

<script>
export default {};
</script>

<style>
</style>