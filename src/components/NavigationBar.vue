<template>
  <div>
    <header>
      <h1>{{ title }}</h1>
    </header>
    <nav>
      <router-link to="/">Nomad's Nest</router-link>
      <router-link to="/help">Help Center</router-link>
      <router-link v-if="!loggedIn" to="/login">Sign In</router-link>
      <router-link v-if="!loggedIn" to="/register">Register</router-link>
      <router-link v-if="loggedIn" to="/dashboard">Dashboard</router-link>
      <button v-if="loggedIn" @click="logout">Logout</button>
    </nav>
  </div>
</template>

<script>
import router from '@/router'; 

export default {
  data() {
    return {
      title: "Nomad's Nest",
      loggedIn: false 
    };
  },
  created() {
    // Check if user is logged in using localStorage
    const userData = localStorage.getItem('user');
    if (userData) {
      this.loggedIn = true;
    }
  },
  methods: {
    logout() {
      // Implement logout functionality
      localStorage.removeItem('user'); // Remove user data from localStorage
      this.loggedIn = false; // Set loggedIn to false
      router.push({ path: '/login', replace: true }); // Redirect to login page and force reload
    }
  }
};
</script>

<style>
header {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}


nav {
  background-color: #333;
  color: #fff;
  padding: 10px;
}
nav a {
  color: #fff;
  margin-right: 10px;
  text-decoration: none;
}
nav a:hover {
  text-decoration: underline;
}
</style>
