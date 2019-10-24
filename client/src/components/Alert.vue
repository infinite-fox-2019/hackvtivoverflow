<template>
  <notify-me
    container="notification"
    status="alert-success"
    :width="300"
    close="bulma"
    :event-bus="bus"
  >
    <template slot="content" scope="{data}">
      <div style="width: 100%; word-break: break-all; text-align: left">
        <h4>
          <b>{{data.title}}</b>
        </h4>
        <p style="margin: 0">{{data.text}}</p>
      </div>
    </template>
  </notify-me>
</template>

  <script>
import Notify from "vue-notify-me";
import Vue from "vue";

const bus = new Vue();

export default {
  components: {
    "notify-me": Notify
  },
  data() {
    return {
      bus
    };
  },
  mounted() {
    this.bus.$emit("notify-me", {
      data: {
        title: "The pygmy team :)",
        text: "this is my notification"
      }
    });
  }
};
</script>