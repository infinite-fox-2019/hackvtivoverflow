<template>
    <div class="flex flex-col mt-20">
        <div class="left">
            <img src="@/assets/qmarks.png" alt="">
        </div>
        <div class="right mt-2">
            <div style="width: 25%;" v-if="Login">
                <form @submit.prevent="login">
                    <input v-model="email" type="text" placeholder="Email">
                    <input v-model="password" type="password" placeholder="Password">
                    <button type="submit">Submit</button>
                </form>
                <a class="link" href="" @click.prevent="switchForm">Don't have an account?</a>

            </div>
            <div style="width: 25%;" v-else>
                <form @submit.prevent="register" >
                    <input v-model="email" type="text" placeholder="Email">
                    <input v-model="username" type="text" placeholder="Username">
                    <input v-model="password" type="password" placeholder="Password">
                    <button type="submit">Register</button>
                </form>
                <a class="link" href="" @click.prevent="switchForm">Have an account?</a>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data: function(){
        return {
            username: "",
            email: "",
            password: "",
            Login: true
        }
    },
    methods: {
        switchForm(){
            this.username = ""
            this.email = ""
            this.password = ""
            if(this.Login) this.Login = false
            else this.Login = true
        },
        login(){
            this.$store.dispatch('login', {email: this.email, password: this.password})
        },
        register(){
            this.$store.dispatch('register', {email: this.email, password: this.password, username: this.username})
            .then(_=>{
                this.Login = true;
            })
        }
    }

}
</script>

<style scoped>
    button{
        padding: 0.6rem 1rem;
        font-size: 1rem;
        border-radius: 5px;
        outline: none;
        color: white;
        border: none;
        background-color: #F57145;
        transition: 0.3s;
    }
    button:hover {
        cursor: pointer;
        background-color: #d12102;
    }
    .link {
        color: black;
        text-decoration: none;
    }
    .link:hover{
        text-decoration-line: underline

    }
    img{
        width: 10%;
        height: 2%;
        object-fit: contain;
        
    }
    .right, .left {
        width: 100%;
        display: flex;
        justify-content: center;
    }

    .label{
        font-size: 2rem;
    }
    .wrapper {
        display: grid;
        height: 93vh;
        grid-template-columns: 1fr 1fr;
    }
    form {
        display: flex;
        flex-direction: column;
        width: 100%;
    }
    input, button {
        margin-bottom: 2vh;
        padding: 1vh 0.5vw;  
        font-size: 1rem;
    }

</style>