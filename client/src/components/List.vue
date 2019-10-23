<template>
      <div id="list-container">
        <div class="col sm-2 ml-2">
            <div class="row">
                <slot name="totalVotes"></slot>
                <slot name="totalAnswers"></slot>
                <slot name="totalViews"></slot>
                <slot name="questionList"></slot>
            </div>
            <div class="row">
                <slot name="questionList2"></slot>
                <slot name="answerList"></slot>
            </div>
        </div>
      </div>
</template>

<script>
export default {

}
</script>

<style>
#list-container {
    display: flex;
    flex-direction: row;
    max-width: 720px;
}
</style>
