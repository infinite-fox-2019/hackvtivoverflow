<template>
  <div>
      <div class="container" id="list-container">
        <div class="col">
            <div class="row">
                <slot name="totalVotes"></slot>
                <slot name="totalAnswers"></slot>
                <slot name="totalViews"></slot>
            </div>
            <div class="row">
                <slot name="questionList"></slot>
                <slot name="answerList"></slot>
            </div>
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
    align-items: stretch;
}
</style>
