<template>
    <div>
      <h2>Admin Dashboard</h2>
      <div v-if="loading">
        <p>Loading...</p> 
      </div>
      <div v-else-if="campingSpots.length">
        <div v-for="spot in campingSpots" :key="spot.id" class="camping-spot">
          <h3>{{ spot.name }}</h3>
          <p><strong>Location:</strong> {{ spot.location }}</p>
          <p><strong>Price Per Night:</strong> ${{ spot.pricePerNight }}</p>
          <p><strong>Description:</strong> {{ spot.description }}</p>
          <p><strong>Amenities:</strong></p>
          <ul>
            <li v-for="amenity in spot.amenities" :key="amenity">{{ amenity }}</li>
          </ul>
          <p><strong>Max Guests:</strong> {{ spot.maxGuests }}</p>
          <button @click="editCampingSpot(spot.id)">Edit</button>
          <button @click="deleteCampingSpot(spot.id)">Delete</button>
        </div>
      </div>
      <div v-else>
        <p>No camping spots available.</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        campingSpots: [],
        loading: false
      };
    },
    created() {
      this.fetchAllCampingSpots();
    },
    methods: {
      async fetchAllCampingSpots() {
        try {
          this.loading = true;
          const response = await axios.get('http://localhost:5213/api/CampingSpot');
          this.campingSpots = response.data;
        } catch (error) {
          console.error('Error fetching camping spots:', error);
        } finally {
          this.loading = false;
        }
      },
      editCampingSpot(campingSpotId) {
        this.$router.push(`/edit-camping-spot/${campingSpotId}`);
      },
      async deleteCampingSpot(campingSpotId) {
        try {
          await axios.delete(`http://localhost:5213/api/CampingSpot/${campingSpotId}`);
          this.campingSpots = this.campingSpots.filter(spot => spot.id !== campingSpotId);
        } catch (error) {
          console.error('Error deleting camping spot:', error);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .camping-spot {
    border: 1px solid #ccc;
    padding: 16px;
    margin-bottom: 16px;
    border-radius: 8px;
  }
  
  .camping-spot h3 {
    margin-top: 0;
  }
  
  .camping-spot ul {
    list-style-type: disc;
    padding-left: 20px;
  }
  
  button {
    margin-right: 8px;
  }
  </style>
  