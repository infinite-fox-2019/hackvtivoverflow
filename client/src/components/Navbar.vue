<template>
  <div class="bg-orange glossy text-white">
    <q-toolbar>
      <q-btn v-if="$store.state.user" flat round dense icon="perm_identity" />
      <q-btn v-else flat round dense icon="record_voice_over" />
      <q-toolbar-title v-if="$store.state.user">{{
        $store.state.user.username
      }}</q-toolbar-title>
      <q-toolbar-title v-else>Hoverflow</q-toolbar-title>
      <q-space />
      <span v-if="$store.state.user" id="time">{{ current }}</span>
      <q-btn
        @click="logout"
        v-if="$store.state.user"
        flat
        round
        dense
        icon="logout"
      />
      <q-btn
        v-else
        flat
        round
        dense
        icon="meeting_room"
        class="q-mr-xs"
        to="/register"
      />
    </q-toolbar>
    <q-toolbar inset>
      <q-breadcrumbs active-color="white" style="font-size: 16px">
        <q-breadcrumbs-el @click="redirectToHome" label="Home" icon="home" />
        <q-breadcrumbs-el
          v-if="$store.state.user"
          to="/collection"
          label="My Collections"
          icon="question_answer"
        />
        <q-breadcrumbs-el
          v-if="$store.state.user"
          @click="addNew"
          label="Ask"
          icon="add_circle"
        />
      </q-breadcrumbs>
    </q-toolbar>
  </div>
</template>

<script>
import io from "socket.io-client";

export default {
  name: "Navbar",
  data() {
    return {
      socket: io.connect("http://localhost:3000"),
      current: null
    };
  },
  methods: {
    logout() {
      this.$store.commit("LOGOUT");
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    redirectToHome() {
      if (this.$route.path !== "/") {
        this.$router.push("/");
      }
    },
    addNew() {
      this.$router.push("/create");
    }
  },
  mounted() {
    this.socket.on("Show Time", time => {
      this.current = time;
    });
  }
};
</script>

<style scoped>
#time {
  margin-right: 15px;
  font-size: 20px;
}
</style>
