<template>
  <div>
    <q-item style="padding: 20px;">
      <q-item-section>
        <q-item-label lines="1">{{ answer.title }}</q-item-label>
        <q-item-label caption lines="2">
          <span class="text-weight-bold"
            >Asked By : {{ answer.user.username }}</span
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
            <q-item
              clickable
              v-close-popup
              @click="update(answer.question._id, answer._id)"
            >
              <q-item-section avatar>
                <q-avatar icon="update" color="amber-10" text-color="white" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Update</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <span style="margin-right: 1vw;">{{ time }}</span>
      </q-item-section>
    </q-item>
    <q-separator inset="item" v-if="index + 1 !== answer.length" />
  </div>
</template>

<script>
import Axios from "axios";

export default {
  name: "AnswerContent",
  props: {
    answer: Object,
    index: Number
  },
  data() {
    return {
      time: null
    };
  },
  methods: {
    update(questionId, answerId) {
      this.$router.push(`/update/${questionId}/${answerId}`);
    }
  },
  mounted() {
    this.$store.dispatch("timelapse", this.answer.created_at).then(data => {
      this.time = data;
    });
  }
};
</script>

<style></style>
