<template>
  <div>
    <h2>Camping Spot Details</h2>
    <div v-if="loading">
      <p>Loading...</p>
    </div>
    <div v-else>
      <div class="camping-spot">
        <h3>{{ campingSpot.name }}</h3>
        <p><strong>Location:</strong> {{ campingSpot.location }}</p>
        <p><strong>Price Per Night:</strong> ${{ campingSpot.pricePerNight }}</p>
        <p><strong>Description:</strong> {{ campingSpot.description }}</p>
        <p><strong>Amenities:</strong></p>
        <ul>
          <li v-for="amenity in campingSpot.amenities" :key="amenity">{{ amenity }}</li>
        </ul>
        <p><strong>Max Guests:</strong> {{ campingSpot.maxGuests }}</p>
        <button @click="editCampingSpot">Edit</button>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['campingSpotId'],
  data() {
    return {
      campingSpot: {},
      loading: false
    };
  },
  created() {
    this.fetchCampingSpot();
  },
  methods: {
    async fetchCampingSpot() {
      try {
        this.loading = true;
        const response = await axios.get(`http://localhost:5213/api/CampingSpot/${this.campingSpotId}`);
        this.campingSpot = response.data;
      } catch (error) {
        console.error('Error fetching camping spot details:', error);
      } finally {
        this.loading = false;
      }
    },
    editCampingSpot() {
      this.$router.push(`/edit-camping-spot/${this.campingSpot.id}`);
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
