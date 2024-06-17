<template>
  <form @submit.prevent="uploadImage">
    
    <input type="file" @change="onFileChange">
    <input type="text" v-model="campingSpotId" placeholder="Camping Spot ID" disabled>
    <input type="hidden" v-model="uploadedBy"> 
    <button type="submit">Upload Image</button>
  </form>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      file: null,
      campingSpotId: null,
      description: '',
      uploadedBy: null  
    };
  },
  mounted() {
    this.fetchCampingSpotId();
    this.fetchCurrentUser();
  },
  methods: {
    async fetchCampingSpotId() {
      try {
        const response = await axios.get('http://localhost:5213/api/CampingSpot/{id}');
        this.campingSpotId = response.data.id; 
      } catch (error) {
        console.error('Error fetching Camping Spot ID:', error);
      }
    },
    async fetchCurrentUser() {
      try {
        const response = await axios.get('http://localhost:5213/api/User/GetCurrentUser');
        this.uploadedBy = response.data.id;
      } catch (error) {
        console.error('Error fetching current user:', error);
      }
    },
    onFileChange(event) {
      this.file = event.target.files[0];
    },
    async uploadImage() {
      try {
        let formData = new FormData();
        formData.append('file', this.file);
        formData.append('campingSpotId', this.campingSpotId);
        formData.append('uploadedBy', this.uploadedBy); 

        const response = await axios.post('http://localhost:5213/api/Image', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log('Image uploaded successfully:', response.data);
      } catch (error) {
        console.error('Error uploading image:', error);
      }
    }
  }
};
</script>
