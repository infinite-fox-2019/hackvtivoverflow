<template>
  <div>
    <q-item style="padding: 20px;">
      <q-item-section>
        <q-item-label lines="1">{{ question.title }}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold"
            >Asked By : {{ question.user.username }}</span
          >
        </q-item-label>
      </q-item-section>
      <q-item-section side top>
        <!-- DROPDOWN -->
        <q-btn-dropdown
          class="glossy q-ml-lg"
          color="orange"
          label="Options"
          style="margin-bottom: 10px;"
        >
          <q-list>
            <q-item clickable v-close-popup @click="updateOne">
              <q-item-section avatar>
                <q-avatar icon="update" color="amber-10" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Update</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup @click="deleteOne">
              <q-item-section avatar>
                <q-avatar icon="delete" color="red" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Delete</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <span style="margin-right: 1vw;">{{ time }}</span>
      </q-item-section>
    </q-item>
    <q-separator inset="item" v-if="index + 1 !== question.length" />
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "QuestionContent",
  props: {
    question: Object,
    index: Number
  },
  data() {
    return {
      time: null
    };
  },
  methods: {
    updateOne() {
      this.$router.push(`/update/${this.question._id}`);
    },
    deleteOne() {
      Axios({
        method: "delete",
        url: `http://hoverflow-server.ricky-works.online/question/${this.question._id}`,
        headers: { token: localStorage.getItem("token") }
      })
        .then(({ data }) => {
          this.$awn.success(data.response);
          this.$emit("requestRefresh");
        })
        .catch(console.log);
    }
  },
  mounted() {
    this.$store.dispatch("timelapse", this.question.created_at).then(data => {
      this.time = data;
    });
  }
};
</script>

<style></style>
