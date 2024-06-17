<template>
  <div class="search-form">
    <div class="form-group">
      <label for="location">Location:</label>
      <input
        type="text"
        id="location"
        v-model="location"
        @input="fetchSuggestions"
        list="location-suggestions"
      >
      <datalist id="location-suggestions">
        <option v-for="suggestion in suggestions" :key="suggestion.id" :value="suggestion.name">{{ suggestion.name }}</option>
      </datalist>
    </div>
    <div class="form-group">
      <label for="checkInDate">Check-in Date:</label>
      <input type="date" id="checkInDate" v-model="checkInDate">
    </div>
    <div class="form-group">
      <label for="checkOutDate">Check-out Date:</label>
      <input type="date" id="checkOutDate" v-model="checkOutDate">
    </div>
    <div class="form-group">
      <label for="guests">Guests:</label>
      <input type="number" id="guests" v-model="guests">
    </div>
    <button @click="updateSearch" :disabled="!location || !checkInDate || !checkOutDate">Search</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    initialLocation: String,
    initialCheckInDate: String,
    initialCheckOutDate: String,
    initialGuests: Number
  },
  data() {
    return {
      location: this.initialLocation || '',
      checkInDate: this.initialCheckInDate || '',
      checkOutDate: this.initialCheckOutDate || '',
      guests: this.initialGuests || 1,
      suggestions: []
    };
  },
  methods: {
    updateSearch() {
      if (!this.location || !this.checkInDate || !this.checkOutDate) {
        alert('Please fill in all required fields.');
        return;
      }

      this.$router.push({
        name: 'SearchResults',
        query: {
          location: this.location,
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          guests: this.guests
        }
      });
    },
    fetchSuggestions() {
      axios.get('http://localhost:5213/api/Location')
        .then(response => {
          this.suggestions = response.data;
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    }
  }
};
</script>

<style scoped>
.search-form {
  max-width: 400px;
  margin: 0 auto;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-size: 1.2rem;
}

input[type="text"],
input[type="date"],
input[type="number"] {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  padding: 10px 20px;
  background-color: #080808;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

button:hover:enabled {
  background-color: #0056b3;
}
</style>
