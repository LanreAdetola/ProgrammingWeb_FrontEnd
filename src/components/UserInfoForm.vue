<template>
  <div>
    <form @submit.prevent="handleSubmit" class="user-form">
      <div class="form-group">
        <label for="username">Username:</label>
        <input type="text" id="username" v-model="user.username" required>
      </div>
      <div class="form-group">
        <label for="email">Email:</label>
        <input type="email" id="email" v-model="user.email" required>
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input type="password" id="password" v-model="user.password" required>
      </div>
      <div class="form-group">
        <label for="firstName">First Name:</label>
        <input type="text" id="firstName" v-model="user.firstName">
      </div>
      <div class="form-group">
        <label for="lastName">Last Name:</label>
        <input type="text" id="lastName" v-model="user.lastName">
      </div>
      <div class="form-group">
        <label for="phoneNumber">Phone Number:</label>
        <input type="text" id="phoneNumber" v-model="user.phoneNumber">
      </div>
      <button type="submit">Submit</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: {
        username: '',
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        phoneNumber: ''
      },
      successMessage: '',
      errorMessage: ''
    };
  },
  methods: {
    async handleSubmit() {
      if (!this.isValidForm()) {
        console.error('Form validation failed');
        return;
      }
      await this.submitFormData();
    },
    isValidForm() {
      return this.user.username.trim() !== '';
    },
    async submitFormData() {
      try {
        const response = await axios.post('http://localhost:5213/api/User/register', this.user);
        console.log('User created successfully:', response.data);
        this.successMessage = 'User created successfully';
        this.errorMessage = '';

        
        // Redirect to login or another page
        this.$router.push('/login');
      } catch (error) {
        console.error('Error creating user:', error);
        if (error.response && error.response.status === 409) {
          this.errorMessage = 'A user with the same email address already exists.';
          this.successMessage = '';
        } else {
          this.errorMessage = 'An error occurred while creating the user.';
          this.successMessage = '';
        }
      }
    }
  }
};
</script>

<style scoped>
.user-form {
  width: 400px; /* Set the width of the form */
  margin: 0 auto; /* Center the form horizontally */
}

.form-group {
  margin-bottom: 20px; /* Increase spacing between form groups */
}

label {
  display: block;
  margin-bottom: 5px; /* Add some space below the label */
}

input[type="text"],
input[type="email"],
input[type="password"],
input[type="number"],
textarea {
  padding: 10px; /* Add padding to input fields */
  border: 1px solid #ccc; /* Add a border to input fields */
  border-radius: 5px; /* Add rounded corners to input fields */
  width: 100%; /* Make input fields fill their container */
  box-sizing: border-box; /* Include padding and border in element's total width */
}

button[type="submit"] {
  padding: 10px 20px; /* Add padding to the button */
  background-color: #080808; /* Set button background color */
  color: #fff; /* Set button text color */
  border: none; /* Remove button border */
  border-radius: 5px; /* Add rounded corners to the button */
  cursor: pointer; /* Change cursor to pointer on hover */
  transition: background-color 0.3s; /* Add transition effect to background color */
}

button[type="submit"]:hover {
  background-color: #0056b3; /* Change background color on hover */
}

.error-message,
.success-message {
  margin-top: 10px; /* Add space above error/success messages */
  font-size: 14px; /* Adjust font size of messages */
}

.error-message {
  color: red; /* Set color for error messages */
}

.success-message {
  color: green; /* Set color for success messages */
}
</style>
