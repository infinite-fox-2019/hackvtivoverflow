<template>
  <div class="back1">
    <div class="title">
      <p># {{tag.display}}</p>
      <p>{{totalQues}}</p>
    </div>
    <hr />
    <div class="content">{{tag.description}}</div>
    <div class="footer">
      <b-button class="only" size="sm" variant="outline-dark" v-if="allowOpen">
        <p>See More</p>
      </b-button>
          <b-button class="only" size="sm" variant="outline-dark" disabled v-else>
              <p>0 Qs</p>
          </b-button>
      <div class="watcher">
        <p>{{totalWatch}}</p>
        <i class="fas fa-user-ninja ninja"></i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['tag'],
  computed: {
    totalQues () {
      return this.tag.questions.length + ' Qs'
    },
    totalWatch () {
      return this.tag.users.length
    },
    allowOpen () {
      if (this.totalQues > 0) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>

<style scoped>
.back1 {
  padding: 6pt;
  border-radius: 6px;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 4px 3px 0 rgba(0, 0, 0, 0.19);
}
p {
  font-size: 9pt;
  margin-bottom: 0;
  padding-bottom: 0;
}
.title {
  margin-left: 5pt;
  padding-bottom: 0;
  margin-top: 1pt;
  margin-bottom: 0;
  font-weight: 900;
  display: flex;
  justify-content: space-between;
}

.content {
  height: 33px;
  padding: 5px;
  display: flex;
  font-size: 7pt;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0;
}

hr {
  margin: 2pt;
}
.footer {
  display: flex;
  justify-content: space-between;
}
.ninja {
  margin-left: 8px;
}
.watcher {
    display: flex;
}
.only{
    width: 60px;
    margin:2.5px
}
.only p{
    font-size: 7pt
}
</style>
