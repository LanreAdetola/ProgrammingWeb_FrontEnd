<template>
  <div>
    <NavigationBar />
    <br>
    <div class="profile-page">
      <h1>Profile</h1>
      <div v-if="loading" class="loading-message">Loading...</div>
      <div v-else>
        <div v-if="user" class="profile-container">
          <div class="profile-picture">
            <img :src="getImageUrl()" alt="Profile Picture" v-if="user.profilePicturePath" />
            <button @click="openFileInput" class="upload-button" :disabled="uploading || editing">Upload Profile Picture</button>
            <input type="file" ref="fileInput" @change="onFileChange" accept="image/*" class="file-input" :disabled="uploading || editing">
            <span v-if="uploading" class="uploading-message">Uploading...</span>
          </div>
          <div class="profile-info">
            <div class="info-item">
              <label>Username:</label>
              <span v-if="!editing">{{ user.username }}</span>
              <input v-else v-model="user.username" class="edit-input">
            </div>
            <div class="info-item">
              <label>First Name:</label>
              <span v-if="!editing">{{ user.firstName }}</span>
              <input v-else v-model="user.firstName" class="edit-input">
            </div>
            <div class="info-item">
              <label>Last Name:</label>
              <span v-if="!editing">{{ user.lastName }}</span>
              <input v-else v-model="user.lastName" class="edit-input">
            </div>
            <div class="info-item">
              <label>Email:</label>
              <span v-if="!editing">{{ user.email }}</span>
              <input v-else v-model="user.email" class="edit-input">
            </div>
            <div class="info-item">
              <label>Phone Number:</label>
              <span v-if="!editing">{{ user.phoneNumber }}</span>
              <input v-else v-model="user.phoneNumber" class="edit-input">
            </div>
            <!-- Add more user details here -->
            <div v-if="editing" class="save-cancel-buttons">
              <button @click="saveProfile" :disabled="saving">Save</button>
              <button @click="cancelEdit">Cancel</button>
            </div>
            <button v-if="!editing" @click="startEdit" class="edit-button">Edit</button>
          </div>
        </div>
        <div v-else>
          <p>User not found.</p>
        </div>
      </div>
    </div>
    <br>
    <div>
      <button @click="navigateToListProperty">List Property</button>
      <br>
      <button @click="navigateToViewCampingSpot">View Property</button>

    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import axios from 'axios';

export default {
  components: {
    NavigationBar
  },
  data() {
    return {
      loading: true,
      user: null,
      selectedFile: null,
      uploading: false,
      editing: false, // Flag to toggle edit mode
      saving: false // Flag to track saving state
    };
  },
  mounted() {
    this.getUserInfo();
  },
  methods: {
    async getUserInfo() {
      const userData = localStorage.getItem('user');
      if (userData) {
        this.user = JSON.parse(userData);
        this.loading = false;
      } else {
        // If no user data is found, redirect to login page
        this.$router.push('/login');
      }
    },
    getImageUrl() {
      return this.user.profilePicturePath ? `http://localhost:8080/${this.user.profilePicturePath}` : '/default-profile-picture.jpg';
    },
    openFileInput() {
      // Programmatically trigger file input click
      this.$refs.fileInput.click();
    },
    async onFileChange(event) {
      const file = event.target.files[0];
      if (file) {
        this.selectedFile = file;
        this.uploading = true; // Set uploading flag

        try {
          const formData = new FormData();
          formData.append('file', this.selectedFile);

          const response = await axios.post(`http://localhost:5213/api/User/${this.user.id}/upload-profile-picture`, formData, {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          });

          this.user.profilePicturePath = response.data.path;
          localStorage.setItem('user', JSON.stringify(this.user));
        } catch (error) {
          console.error('Error uploading profile picture:', error);
        } finally {
          this.uploading = false; 
        }
      }
    },
    startEdit() {
      this.editing = true;
    },
    async saveProfile() {
      try {
        this.saving = true;

        await axios.put(`http://localhost:5213/api/User/${this.user.id}`, this.user);

        localStorage.setItem('user', JSON.stringify(this.user));

        this.editing = false;
        this.saving = false;
      } catch (error) {
        console.error('Error saving profile:', error);
        this.saving = false;
      }
    },
    cancelEdit() {
      this.editing = false;
      this.getUserInfo();
    },
    navigateToListProperty() {
      this.$router.push({ name: 'List Property' });
    },
    navigateToViewCampingSpot() {
      this.$router.push({ name: 'viewCampingSpot' });

    }
  }
};
</script>

<style scoped>
.profile-page {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading-message {
  font-size: 1.2em;
  text-align: center;
  margin-top: 20px;
}

.profile-container {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}

.profile-picture {
  position: relative;
  width: 250px;
  height: 250px;
  border: 2px solid #ccc;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 20px;
}

.profile-picture img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.file-input {
  position: absolute;
  opacity: 0;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  cursor: pointer;
}

.uploading-message {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(255, 255, 255, 0.7);
  padding: 5px 10px;
  border-radius: 5px;
  font-weight: bold;
}

.profile-info {
  flex-grow: 1;
}

.info-item {
  margin-bottom: 10px;
}

.info-item label {
  font-weight: bold;
}

.edit-input {
  width: 100%;
  padding: 5px;
  font-size: 1em;
}

.edit-button {
  margin-top: 10px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.save-cancel-buttons {
  margin-top: 10px;
}

.upload-button {
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style>
