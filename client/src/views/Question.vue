<template>
    <div class="wrapper">  
        <div class="box">
        </div>
        <div class="root">
            <div class="top slot">
                <div  style="display: flex; align-items: center; justify-content: start; width: 80%;">
                    <p style="font-size: 1.7rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;" v-text="question.title"></p>
                </div>
                <div style="display: flex; justify-content: center; align-items: center;">
                    <router-link to="/ask"><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" style="border: none; font-size: 1rem; transition: 0.3s;">Ask Question</button></router-link>
                </div>
            </div>
                    <p>Question by: {{question.user.username}}</p>
            <div class="slot">
                <div style="display: flex; width: 100%;">
                    <div style="width: 10%; height: 20vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                        <a class="vote" href="" @click.prevent="upvoteQuestion(question._id)"><i class="fas fa-caret-square-up fa-2x" style="color: #F57145"></i></a>
                        <p class="vote" style="margin: 0.3rem 0px; font-size: 1.5rem;" >{{question.upvotes.length - question.downvotes.length }}</p>
                        <a class="vote" href="" @click.prevent="downvoteQuestion(question._id)"><i class="fas fa-caret-square-down fa-2x" style="color: #F57145"></i></a>
                    </div>
                    <div >
                        <p style="width: 60vw; word-wrap: break-word;" v-html="question.description"></p>
                    </div>
                </div>
                <div style="display: flex; width: 100%; justify-content: space-between; align-items: center">
                    <p style="font-weight: 500; font-size: 1.3rem; ">{{question.answers.length }} Answers</p>
                    <div>
                        <div v-if="belong(question.user._id)" style="display: flex;">
                            <button class="not" @click="gotoUpdate(question._id)">update</button>
                            <Setting :id="question._id" :category="category('questions')"/>
                        </div>
                    </div>
                </div>
            </div>
            <div style="width: 100%; display: flex; border-bottom: 1px solid silver;" v-for="(answer, index) in question.answers" :key="index">
                <div style="width: 30%; height: 20vh; display: flex; flex-direction: column; justify-content: center; align-items: center; color: #69737C;">
                    <a class="vote" href="" @click.prevent="upvoteAnswer(answer._id)"><i class="fas fa-caret-square-up fa-lg" style="color: #F57145"></i></a>
                    <p class="vote" style="margin: 0.3rem 0px; font-size: 1rem;" >{{answer.upvotes.length - answer.downvotes.length}}</p>
                    <a class="vote" href="" @click.prevent="downvoteAnswer(answer._id)"><i class="fas fa-caret-square-down fa-lg" style="color: #F57145"></i></a>
                </div>
                <div >
                    <p class="text-red-700">Answer by: {{answer.user.username}}</p>
                    <p style="width:50vw; word-wrap: break-word;" v-html="answer.description"></p>

                </div>
                <div style=" width: 100%; height: 100%;padding: 1em; display: flex; justify-content:flex-end; position:relative; bottom: 0px;">
                    <div v-if="belong(answer.user)">
                        <button href="#form" class="not" @click="updateForm(answer)">update</button>
                    </div>
                    <Setting v-if="belong(answer.user)" :id="answer._id" :category="category('answers')"/>
                </div>
            </div>
            <div v-if="!update">
                <div style="width: 80%;">
                    <wysiwyg class="formQuestion" v-model="description" />
                </div>
                <div style="margin-bottom: 10 vh;">
                    <button v-if="this.$store.state.isLogin" @click.prevent="comment" class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" style="border: none; font-size: 1rem; transition: 0.3s;">Comment</button>
                    <router-link v-else to="/login"><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" style="border: none; font-size: 1rem; transition: 0.3s;">Login</button></router-link>
                </div>
            </div>
            <div v-else>
                <div style="width: 80%;">
                    <wysiwyg id="form" class="formQuestion" v-model="description" />
                </div>
                <div style="margin-bottom: 10 vh;">
                    <button style="margin-right: 1vw;" v-if="this.$store.state.isLogin" @click.prevent="updateAnswer">Update</button>
                    <button v-if="update" @click.prevent="commentForm">Cancel</button>
                    <router-link v-else to="/login"><button class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full" style="border: none; font-size: 1rem; transition: 0.3s;">Login</button></router-link>
                </div>
            </div>
        </div>
        <div class="box">
        </div>
    </div>
</template>

<script>
import Setting from '@/components/Setting'
export default {
    data: function(){
        return {
            question: {
                title: "",
                description: "",
                upvotes:[],
                downvotes: [],
                answers: []
            },
            description: "",
            answers: null,
            update: null
        }
    },
    components:{
        Setting
    },
    methods:{
        gotoUpdate(id){
            this.$router.push(`/update/${id}`)
        },
        updateAnswer(){
            this.$store.dispatch('updateAnswer',{ id: this.update, description: this.description })
            .then(data=>{
                this.question = data;
                console.log(this.question);
                this.commentForm()
            })
        },
        updateForm(answer){
            this.description = answer.description
            this.update = answer._id
        },
        commentForm(){
            this.description = ""
            this.update = null
        },
        category(val){
            return val
        },
        belong(id){
        
            return id == localStorage.getItem('id')
        },
        total(up, down){
            return up
        },
        upvoteAnswer(id){
            this.$store.dispatch('upvoteAnswer', id)
            .then(data =>{
                this.question = data
            })
        },
        downvoteAnswer(id){
     
            this.$store.dispatch('downvoteAnswer', id)
            .then(data =>{
                this.question = data
            })
        },
        upvoteQuestion(id){
            this.$store.dispatch('upvoteQuestion', id)
            .then(data =>{
                this.question = data
            })
        },
        downvoteQuestion(id){
            this.$store.dispatch('downvoteQuestion', id)
            .then(data =>{
                this.question = data
            })
        },
        comment(){
            this.$store.dispatch('comment', {id: this.$route.params.id, description: this.description})
            .then(data =>{
                this.question = data
                this.description = ""
            })
        }
    },

    created(){
        this.$store.dispatch('fetchAQuestion', this.$route.params.id)
        .then(data =>{
            this.question = data
        })   
    }
}
</script>

<style scoped>
    .not{
        margin-right: 1vw;
    }
    .vote{
        color: #69737C;
    }
    .vote:hover{
        color: black;
    }
    .formQuestion{
        margin: 5vh 0px;
        width: 50vw;
        overflow-wrap: break-word;
    }
    .slot{
        border-bottom: 1px solid silver;
    }
    .top{
        display: flex;
        height: 10vh;
        justify-content: space-between;
    }
    .root{
        border-left: 1px solid silver;
        min-height: 93vh;
        display: flex;
        padding: 2rem;
        flex-direction: column;
    }
    .wrapper {
        display: grid;
        grid-template-columns: 1fr 5fr;
        padding-right: 10vw;
    }

    button:hover{
        cursor: pointer;
    } 
</style>