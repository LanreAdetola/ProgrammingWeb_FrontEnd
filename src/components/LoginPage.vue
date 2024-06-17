<template>
  <div>
    <NavigationBar />
    <br>
    <div class="login-form">
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <div class="form-group">
          <label for="email">Email:</label>
          <input type="email" id="email" v-model="loginData.email" required />
        </div>
        <div class="form-group">
          <label for="password">Password:</label>
          <input type="password" id="password" v-model="loginData.password" required />
        </div>
        <button type="submit">Login</button>
        <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import NavigationBar from './NavigationBar.vue';
import bcrypt from 'bcryptjs';

export default {
  components: {
    NavigationBar
  },
  data() {
    return {
      loginData: {
        email: '',
        password: ''
      },
      errorMessage: ''
    };
  },
  methods: {
    async loginUser() {
      try {
        const response = await axios.get('http://localhost:5213/api/User/emails-passwords');
        const users = response.data;

        const user = users.find(user => user.email === this.loginData.email);

        if (user && bcrypt.compareSync(this.loginData.password, user.passwordHash)) {
          localStorage.setItem('user', JSON.stringify(user));
          this.$router.push('/dashboard');
        } else {
          this.errorMessage = 'Invalid email or password. Please try again.';
        }
      } catch (error) {
        console.error('Login failed:', error);
        this.errorMessage = 'An error occurred. Please try again later.';
      }
    }
  }
};
</script>

<style scoped>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
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
  background-color: #080808;
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
