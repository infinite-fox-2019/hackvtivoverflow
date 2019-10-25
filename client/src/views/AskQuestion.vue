<template>
    <div class="question-body">
        <QuestionForm/>
    </div>
</template>

<script>
import QuestionForm from '@/components/QuestionForm'
export default {
  components: {
    QuestionForm
  }
}
</script>

<style scoped>
.question-body {
    width: 100vw;
    height: 100vh;
    background-color: #EFF0F1;
    display: flex;
    justify-content: center;
}
</style>
