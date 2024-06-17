<template>
  <div>
  <NavigationBar />
  <div class="list-property">
    <form @submit.prevent="handleSubmit" class="user-form">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="campingSpot.name">
      </div>
      <div class="form-group">
        <label for="location">Location:</label>
        <input
          type="text"
          id="location"
          v-model="campingSpot.location"
          @input="fetchSuggestions"
          list="location-suggestions"
        >
        <datalist id="location-suggestions">
          <option v-for="suggestion in suggestions" :key="suggestion.id" :value="suggestion.name">
            {{ suggestion.name }}
          </option>
        </datalist>
      </div>
      <div class="form-group">
        <label for="pricePerNight">Price per Night:</label>
        <input type="number" id="pricePerNight" v-model="campingSpot.pricePerNight">
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="campingSpot.description">
      </div>
      <div class="form-group">
        <label>Amenities:</label>
        <div v-for="(amenity, index) in availableAmenities" :key="index" class="checkbox">
          <label>
            <input type="checkbox" :value="amenity" v-model="campingSpot.amenities"> {{ amenity }}
          </label>
        </div>
      </div>
      
      <!-- Pass the UserId to the ImageUpload component -->
      <ImageUpload v-if="campingSpotId" :campingSpotId="campingSpotId" :uploadedBy="userId" />
      
      <button type="submit">Submit Camping Spot</button>
      <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
      <p v-if="successMessage" class="success-message">{{ successMessage }}</p>
    </form>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import ImageUpload from './ImageUpload.vue';
import NavigationBar from './NavigationBar.vue';

export default {
  components: {
    ImageUpload,NavigationBar
  },
  data() {
    return {
      campingSpot: {
        name: '',
        location: '',
        pricePerNight: '',
        description: '',
        amenities: []
      },
      availableAmenities: [
        'Clean and accessible restrooms',
        'Showers with hot water',
        'Picnic tables',
        'Fire pits or grills',
        'Potable water access',
        'Electrical hookups'
      ],
      suggestions: [],
      successMessage: '',
      errorMessage: '',
      campingSpotId: null,
      userId: null 
    };
  },
  mounted() {
    const userData = localStorage.getItem('user');
    if (userData) {
      this.userId = JSON.parse(userData).id;
    }
  },
  methods: {
    fetchSuggestions() {
      axios.get('http://localhost:5213/api/Location')
        .then(response => {
          this.suggestions = response.data;
        })
        .catch(error => {
          console.error('Error fetching suggestions:', error);
        });
    },
    handleSubmit() {
      if (!this.isValidForm()) {
        console.error('Form validation failed');
        return;
      }
      this.submitFormData();
    },
    isValidForm() {
      return this.campingSpot.name.trim() !== '' && 
             this.campingSpot.location.trim() !== '' && 
             this.campingSpot.pricePerNight.trim() !== '' && 
             this.campingSpot.description.trim() !== '';
    },
    submitFormData() {
      this.campingSpot.userId = this.userId;

      axios.post('http://localhost:5213/api/CampingSpot', this.campingSpot)
        .then(response => {
          console.log('Camping Spot created successfully:', response.data);
          this.campingSpotId = response.data.id;
          this.successMessage = 'Camping Spot created successfully';
          this.errorMessage = '';
        })
        .catch(error => {
          console.error('Error creating camping spot:', error);
          if (error.response && error.response.status === 409) {
            this.errorMessage = 'A camping spot with the same name already exists.';
            this.successMessage = '';
          } else {
            this.errorMessage = 'An error occurred while creating the camping spot.';
            this.successMessage = '';
          }
        });
    }
  }
};
</script>

<style scoped>
.user-form {
  width: 400px; 
  margin: 0 auto; 
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px; 
}

input[type="text"],
input[type="number"] {
  padding: 10px; 
  border: 1px solid #ccc; 
  border-radius: 5px; 
  width: 100%; 
  box-sizing: border-box; 
}

.checkbox {
  margin-bottom: 10px; 
}

button[type="submit"] {
  padding: 10px 20px; 
  background-color: #080808; 
  color: #fff; 
  border: none; 
  border-radius: 5px; 
  cursor: pointer; 
  transition: background-color 0.3s; 
}

button[type="submit"]:hover {
  background-color: #0056b3; 
}

.error-message,
.success-message {
  margin-top: 10px; 
  font-size: 14px;
}

.error-message {
  color: red;
}

.success-message {
  color: green; 
}
</style>
