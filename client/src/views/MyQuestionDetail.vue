<template>
    <div class="container detail mt-5">
        <h2 style="margin-bottom: 50px;">My Question</h2>
        <div class="question">
            <div class="ques-item">
               <div class="vote-sesction mx-5">
                    <div class="votes mx-5">
                        <a href="" style="color:gray;"><i class="fas fa-caret-up"></i></a>
                        <p style="margin:0;">{{ detailQuestion.upvotes.length }}</p>
                        <!-- <span style="color:gray;">Votes</span> -->
                        <a href="" style="color:gray;"><i class="fas fa-caret-down"></i></a>
                    </div>
               </div>
                
                <div class="ques-content">
                    <div>
                        <h3>{{ detailQuestion.title }}</h3>
                    </div>
                    <div v-html="detailQuestion.description">
                        {{ detailQuestion.description }}
                    </div>
                </div>
                <div class="update">
                    <button @click.prevent="deleteQue()">
                        ❌
                    </button>
                    <button>
                        📝
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from 'vuex'
export default {
    name:'MyQuestionDetail',
    methods:{
        deleteQue() {
            this.$store.dispatch('deleteQuestion',this.$route.params.id)
            this.$router.push('/myquestion')
        }
    },
    computed: {
        ...mapState(['detailQuestion'])
    },
    created() {
        this.$store.dispatch('getMyDetail',this.$route.params.id)
    }
}
</script>

<style>
.update {
    text-align: right;
}
.update button {
    font-size: 20px;
    margin-top: 5px;
}
a {
    text-decoration: none !important;
    /* margin: 0 10px; */
}
i {
    font-size: 30px !important;
}
.detail {
    padding-top: 100px;
    height: 100vh;
}

.question {
    /* background-color: gray; */
    border-top: 1px solid gray;
    padding: 20px 0;
}
.ques-item {
    display: flex;
}
.votes {
    width: 20%;
}
.ques-content {
    display: flex;
    flex-direction: column;
    width: 100%;
    text-align: left;
}
.vote-section {
    display: flex;
    flex-direction: column;
    text-align: center;
}
</style>