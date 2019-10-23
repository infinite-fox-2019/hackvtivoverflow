<template>
  <div class="container">
    <div class="ask">
      <p style="font-size:32px">All Question</p>
      <button @click="toWritePage">Ask Question</button>
    </div>

    <div class="card-ask" v-for="(ask, index) in asks" :key="index">
      <div class="number">
        <p style="color: #757575; font-size: 24px;">1000</p>
        <p style="color: #757575; font-size: 10px;">vote</p>

        <div class="answer">
          <p>20</p>
          <p style="font-size:10px">answers</p>
        </div>

        <p style="color: #f38024; font-size:10px">400 views</p>
      </div>

      <div class="text">
        <p
          style="color: #007ED9; cursor:pointer"
          @click.prevent="goDetailAsk(123)"
        >Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quo, consequuntur iste! Repellendus</p>
        <div class="content">
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Quos quod consequuntur a quam, esse nesciunt commodi voluptate ratione laborum nobis autem, nam ipsum sed delectus, nisi dolor veritatis et recusandae!. Lorem ipsum dolor sit amet consectetur adipisicing elit. A, quidem nostrum culpa praesentium odio ipsa. Suscipit, qui debitis odio sit reiciendis veritatis doloremque. Tenetur, error! Unde voluptate voluptatem quo tempora!</p>
        </div>
        <div class="tags">
          <p class="tag" v-for="(tag, i) in tags" :key="i">Vuejs</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: `ask-list`,
  data() {
    return {
      tags: [`vue.js`, "reactjs", `javascript`],
      asks: [1, 2, 3, 4, 5, 6, 7, 8, 9]
    };
  },
  methods: {
    toWritePage() {
      this.$router.push("/writeask");
    },
    goDetailAsk(id) {
      this.$router.push(`/ask/${id}`);
    }
  }
};
</script>

<style scoped>
.container {
  width: 70vw;
}

.ask {
  height: 100px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 5px 10px;
  border-bottom: 1px solid #dbdcdc;
}

.card-ask {
  display: flex;
  height: 150px;
  border-bottom: 1px solid #dbdcdc;
}

.number {
  text-align: center;
  width: 150px;
  padding: 10px;
}

.answer {
  border-radius: 5px;
  background-color: #5fba7d;
  margin: 10px 3px;
  padding: 10px;
  color: white;
}

.text {
  padding: 10px;
  text-align: left;
}

.content {
  width: 60vw;
  margin: 5px 0;
  padding: 5px 0;
  height: 40px;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.tags {
  display: flex;
}

.tag {
  background-color: #cee0ed;
  height: 30px;
  padding: 5px;
  border-radius: 5px;
  margin-right: 10px;
  cursor: pointer;
}

button {
  width: 150px;
  height: 40px;
  background-color: #007ed9;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>