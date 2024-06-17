<template>
    <div class="user-info">
      <div class="user-info-item">
        <label>Username:</label>
        <span>{{ user.username }}</span>
      </div>
      <div class="user-info-item">
        <label>Name:</label>
        <span>{{ user.firstName }} {{ user.lastName }}</span>
      </div>
      <div class="user-info-item">
        <label>Email:</label>
        <span>{{ user.email }}</span>
      </div>
      <div class="user-info-item">
        <label>Phone Number:</label>
        <span>{{ user.phoneNumber }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      user: {
        type: Object,
        required: true
      }
    }
  };
  </script>
  
  <style scoped>
  .user-info {
    margin-bottom: 20px;
  }
  
  .user-info-item {
    margin-bottom: 10px;
  }
  
  .user-info-item label {
    font-weight: bold;
  }
  </style>
  