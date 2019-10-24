<template>
    <div class="container">
        <div class="flex">
            <div>
                <h1>/\</h1>
                <h1>0</h1>
                <h1>\/</h1>
            </div>
            <div class="questionAnswer">
                <h3>Question by {{  }} :</h3>
                <h2>{{ this.$store.state.question.title }}</h2>
                <div class="buttonflex">
                    <updateQuestion
                        :title="this.$store.state.question.title"
                        :description="this.$store.state.question.description"
                    ></updateQuestion>
                    <button class="btn btn-danger">delete</button>
                </div>
            </div>
        </div>
        <div v-for="(answer, index) in this.$store.state.answers" :key="index">
            <div class="flex">
                <div>
                    <h1>/\</h1>
                    <h1>0</h1>
                    <h1>\/</h1>
                </div>
                <div class="questionAnswer">
                    <h4>{{ index+1 }}. Answer by {{ answer.userId.username }} :</h4>
                    <h6 v-html="answer.description"></h6>
                    <updateAnswer
                        :description="answer.description"
                        :id="answer._id"
                    ></updateAnswer>
                </div>
            </div>
        </div>
        <addAnswer></addAnswer>
    </div>
</template>

<script>
import addAnswer from '../components/addAnswer'
import updateQuestion from '../components/updateQuestion'
import updateAnswer from '../components/updateAnswer'

export default {
  name: 'question',
  components: {
    addAnswer,
    updateQuestion,
    updateAnswer
  }
//   created () {
//     this.$store.dispatch()
//   }
}
</script>

<style scoped>
    .container {
        margin-top: 4%;
        text-align: left;
    }
    .flex {
        display: flex;
    }
    .questionAnswer {
        word-wrap:break-word;
        width: 90%;
        margin: 0 4%;
    }
    .buttonflex {
        display: flex;
    }
    .center {
        justify-content: center;
        align-content: center;
    }
</style>
