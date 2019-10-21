<template>
  <div>
    <div id="form">
      <LoginForm
        v-if="currentForm === 'login-form'"
        @show-dashboard-page="showDashboard"
        @to-register-form="switchForm"
      ></LoginForm>
      <RegisterForm
        v-else-if="currentForm === 'register-form'"
        @to-login-form="switchForm"
        @show-dashboard-page="showDashboard"
      ></RegisterForm>
    </div>
  </div>
</template>

<script>
import LoginForm from "@/components/LoginForm";
import RegisterForm from "@/components/RegisterForm";
export default {
  data: function() {
    return {
      currentForm: "register-form"
    };
  },
  methods: {
    showDashboard() {
      this.$emit("show-dashboard-page");
    },
    switchForm() {
      if (this.currentForm === "login-form") {
        this.currentForm = "register-form";
      } else {
        this.currentForm = "login-form";
      }
    }
  },
  components: {
    LoginForm,
    RegisterForm
  }
};
</script>

<style scoped>
#LoginPage {
  background-image: linear-gradient(to bottom right, #380036, #0cbaba);
}

#form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>