<template>
  <div class="user-page">
    <NavigationBar />
    <br>
    <UserInfoForm @submit="handleSubmit" />
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue'
import UserInfoForm from './UserInfoForm.vue';

export default {
  components: {
    NavigationBar,
    UserInfoForm
  },
  methods: {
    handleSubmit(userInfo) {
      console.log('User info submitted:', userInfo);
    }
  }
};
</script>

<style scoped>

.login-form {
    max-width: 400px;
    margin: 0 auto;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  label {
    display: block;
    margin-bottom: 5px;
  }
  
  input[type="email"],
  input[type="password"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  button[type="submit"] {
    padding: 10px 20px;
    background-color: #007bff;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #0056b3;
  }
  
  .error-message {
    color: red;
    margin-top: 10px;
  }
</style>
