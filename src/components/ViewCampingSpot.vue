<template>
  <div>
    <h2>User's Camping Spots</h2>
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
      </div>
    </div>
    <div v-else>
      <p>No camping spots available.</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { getUserFromLocalStorage } from '../components/utils/user';

export default {
  data() {
    return {
      campingSpots: [],
      loading: false
    };
  },
  created() {
    this.fetchUserCampingSpots();
  },
  methods: {
    async fetchUserCampingSpots() {
      try {
        this.loading = true;
        const user = getUserFromLocalStorage();
        if (user && user.id) {
          const userId = user.id;
          const response = await axios.get(`http://localhost:5213/api/CampingSpot/User/${userId}`);
          this.campingSpots = response.data;
        } else {
          console.error('UserId not found in localStorage');
        }
      } catch (error) {
        console.error('Error fetching user camping spots:', error);
      } finally {
        this.loading = false;
      }
    },
    editCampingSpot(campingSpotId) {
      // Navigate to the editCampingSpot route with the campingSpotId parameter
      this.$router.push({ name: 'editCampingSpot', params: { id: campingSpotId } });
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
</style>
