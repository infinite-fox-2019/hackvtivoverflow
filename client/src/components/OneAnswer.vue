<template>
  <div>
    <div class="row">
      <div class="vote">
        <button @click="upVote">^</button>
        <hr />
        <h1>{{totalVote}}</h1>
        <hr />
        <button @click="downVote">v</button>
      </div>
      <div class="one">
        <div class="authz" v-if="authz">
          <button @click="editAnswer">
            <i class="fas fa-pencil-alt fa-2x"></i>
          </button>
          <button @click="deleteMe">
            <i class="fas fa-trash-alt fa-2x"></i>
          </button>
        </div>
        <p class="date mini">{{createdAt}}</p>
        <p class="date mini">{{timePass}}</p>
        <div v-html="answer.answer"></div>
        <br />
        <p class="normal">{{name}}</p>
      </div>
    </div>
  </div>
</template>

<script>

</script>

<style scoped>
.row {
  display: flex;
  justify-content: center;
  background: white;
  min-height: 50px;
  margin: 0 auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 12px;
  border-radius: 8pt;
  width: 700px;
}
.one {
  margin: 10px 10px 25px 10px;
  display: flex;
  justify-content: flex-start;
  flex-direction: column;
  align-items: flex-start;
  width: 80%;
}
.date {
  align-self: flex-end;
  margin-right: 10px;
}
.vote {
  width: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}
.row {
  display: flex;
  justify-content: flex-start;
}
.authz {
  align-self: flex-end;
  margin-right: 10px;
}
.authz button {
  width: 30px;
  height: 30px;
  margin-right: 5px;
  margin-bottom: 6px;
}
h1 {
  font-size: 16pt;
  font-family: Arial, Helvetica, sans-serif;
  color: #0266d6;
}

.mini {
  font-size: 12px;
  font-family: Arial, Helvetica, sans-serif;
}

.vote button {
  width: 45px;
  height: 45px;
  border-radius: 50%;
  align-self: center;
}

.vote h1 {
  font-size: 18pt;
  font-style: inline;
  color: rgb(77, 76, 76);
}
.vote hr {
  width: 40%;
  align-self: center;
  margin: 8px;
}
p.normal{
  color: rgb(87, 13, 156);
  font-weight: 350
}
</style>
