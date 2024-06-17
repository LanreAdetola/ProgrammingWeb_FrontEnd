<template>
    <div>
      <h1>Camping Spots</h1>
      <div v-if="error" class="error">{{ error }}</div>
      <div v-if="loading">Loading...</div>
      <div v-else class="camping-spot-grid">
        <div v-for="spot in limitedCampingSpots" :key="spot.id" class="camping-spot">
          <h2>{{ spot.name }}</h2>
          <p><strong>Location:</strong> {{ spot.location }}</p>
          <p><strong>Price per Night:</strong> ${{ spot.pricePerNight }}</p>
          <p><strong>Description:</strong> {{ spot.description }}</p>
          <p><strong>Amenities:</strong> {{ spot.amenities.join(', ') }}</p>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        campingSpots: [],
        loading: true,
        error: null
      };
    },
    computed: {
      limitedCampingSpots() {
        return this.campingSpots.slice(0, 4);
      }
    },
    mounted() {
      axios.get('http://localhost:5213/api/CampingSpot')
        .then(response => {
          this.campingSpots = response.data;
          this.loading = false;
        })
        .catch(error => {
          this.error = 'Failed to load camping spots: ' + error.message;
          this.loading = false;
        });
    }
  };
  </script>
  
  <style scoped>
  .camping-spot-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 16px;
  }
  
  .camping-spot {
    border: 1px solid #ccc;
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 8px;
  }
  
  .error {
    color: red;
  }
  </style>
  