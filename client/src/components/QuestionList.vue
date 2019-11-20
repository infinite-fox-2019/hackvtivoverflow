<template>
  <div>
    <q-item>
      <!-- <q-item-section top class="col-1 gt-sm lem">
        <q-btn class="gt-xs" size="12px" flat dense round icon="keyboard_arrow_up" @click="upvote" />
        <q-btn
          class="gt-xs"
          size="12px"
          flat
          dense
          round
          icon="keyboard_arrow_down"
          @click="downvote"
        />
      </q-item-section> -->
      <q-item-section top class="col-1 gt-sm">
        <div class="vote">
          <div class="vote-val">
            <q-avatar rounded size="32px" color="orange">{{ question.score }}</q-avatar>
          </div>
        </div>
      </q-item-section>

      <q-item-section top>
        <q-item-label lines="1">
          <span class="text-weight-medium cursor-pointer" @click="toReadArticle">{{question.title}}</span>
          <span class="text-grey-8"> author - {{question.user.username}}</span>
        </q-item-label>
        <q-item-label caption lines="1">updated at : {{question.updatedAt.slice(0,10)}}</q-item-label>
        <q-item-label lines="1" class="q-mt-xs text-body2 text-primary">
          <span class="cursor-pointer" v-for="(tag,i) in question.tags" :key="i">.{{ tag }}</span>
        </q-item-label>
      </q-item-section>

      <q-item-section top side v-if="userQuestion.status">
        <div class="text-grey-8 q-gutter-xs">
          <DropdownQuestion :question="question"></DropdownQuestion>       
        </div>
      </q-item-section>
    </q-item>

    <q-separator spaced />

    <q-dialog
      position="top"
      v-model="notification"
      persistent
      transition-show="flip-down"
      transition-hide="flip-up"
    >
      <q-card class="bg-orange-14 text-white">
        <q-card-section>
          <div class="text-h6 text-center">{{ message.status }}</div>
        </q-card-section>

        <q-card-section>{{ message.content }}</q-card-section>
      </q-card>
    </q-dialog>
  </div>
</template>

<script>
import { mapState } from "vuex";
import DropdownQuestion from '../components/DropdownQuestion'
export default {
  name: "questionList",
  props: ["question"],
  components : {
    DropdownQuestion
  },
  data() {
    return {
      notification: false,
      message: {
        status: "",
        content: ""
      }
    };
  },
  methods: {
    toReadArticle() {
      this.$router.push(`question/${this.question._id}`);
    },
    upvote() {
      this.$store
        .dispatch("upvoteQuestion", this.question._id)
        .then(data => {})
        .catch(err => {
          (this.notification = true),
            (this.message.status = "Oops something wrong!");
          this.message.content = `${err.data.message} please login to vote`;
          setTimeout(() => {
            (this.notification = false), (this.message.status = "");
            this.message.content = "";
          }, 1000);
        });
    },
    downvote() {
      this.$store
        .dispatch("downvoteQuestion", this.question._id)
        .then(data => {})
        .catch(err => {
          (this.notification = true),
            (this.message.status = "Oops something wrong!");
          this.message.content = `${err.data.message} please login to vote`;
          setTimeout(() => {
            (this.notification = false), (this.message.status = "");
            this.message.content = "";
          }, 1000);
        });
    }
  },
  created() {},
  computed: {
    ...mapState(["userQuestion"])
  }
};
</script>

<style scoped>
.vote-btn {
  margin: 0 -2vh 0 0;
  width: 20px !important;
}
.vote {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}
.vote .vote-val {
  padding: 0;
  margin: 0;
}
.lem {
  margin: auto -3vh auto auto;
  width: 50px;
}
</style>