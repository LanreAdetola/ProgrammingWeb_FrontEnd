<template>
  <div>
    <NavigationBar />
    <button @click="toggleSearchForm">
      {{ showSearchForm ? 'Hide' : 'Show' }} Search Form
    </button>
    <SearchForm 
      v-if="showSearchForm"
      :initialLocation="searchParams.location"
      :initialCheckInDate="searchParams.checkInDate"
      :initialCheckOutDate="searchParams.checkOutDate"
      :initialGuests="searchParams.guests"
    />
    <div class="search-results">
      <h2>Search Results</h2>
      <div v-if="searchParams">
        <p>Location: {{ searchParams.location }}</p>
        <p>Check-in Date: {{ searchParams.checkInDate }}</p>
        <p>Check-out Date: {{ searchParams.checkOutDate }}</p>
        <p>Guests: {{ searchParams.guests }}</p>

        <div v-if="loading">
          <p>Loading...</p>
        </div>

        <div v-else-if="filteredResults.length > 0" class="results-container">
          <div v-for="spot in filteredResults" :key="spot.id" class="result-item" @click="viewSpot(spot.id)">
            <p><strong>Name:</strong> {{ spot.name }}</p>
            <p><strong>Location:</strong> {{ spot.location }}</p>
            <p><strong>Price per Night:</strong> ${{ spot.pricePerNight }}</p>
            <p><strong>Description:</strong> {{ spot.description }}</p>
            <p><strong>Amenities:</strong> {{ spot.amenities.join(', ') }}</p>
          </div>
        </div>

        <div v-else>
          <p>No results found for this location.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavigationBar from './NavigationBar.vue';
import axios from 'axios';
import SearchForm from './SearchForm.vue';

export default {
  components: { NavigationBar, SearchForm },
  data() {
    return {
      searchParams: this.$route.query,
      loading: false,
      allResults: [],
      filteredResults: [],
      showSearchForm: false  // Default to hidden
    };
  },
  watch: {
    '$route.query': {
      handler(newQuery) {
        this.searchParams = newQuery;
        this.filterResults();
      },
      immediate: true
    }
  },
  methods: {
    toggleSearchForm() {
      this.showSearchForm = !this.showSearchForm;
    },
    filterResults() {
      if (this.searchParams && this.searchParams.location) {
        this.loading = true; // Show loading state
        axios.get('http://localhost:5213/api/CampingSpot')
          .then(response => {
            this.allResults = response.data;
            this.filteredResults = this.allResults.filter(result =>
              result.location.toLowerCase() === this.searchParams.location.toLowerCase()
            );
          })
          .catch(error => {
            console.error('Error fetching results:', error);
          })
          .finally(() => {
            this.loading = false;
          });
      }
    },
    viewSpot(id) {
      this.$router.push({ name: 'SpotProfile', params: { id } });
    }
  }
};
</script>

<style scoped>
.results-container {
  display: grid;
  grid-template-columns: auto auto;
  gap: 16px;
}

.result-item {
  border: 1px solid #ccc;
  padding: 16px;
  background-color: #f9f9f9;
  border-radius: 8px;
  cursor: pointer;
}

.search-results {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.loading {
  margin-top: 20px;
  text-align: center;
}

button {
  margin: 10px 0;
  padding: 10px 20px;
  background-color: #080808;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
}

button:hover {
  background-color: #0056b3;
}
</style>
