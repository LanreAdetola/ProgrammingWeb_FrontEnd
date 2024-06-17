<template>
  <div>
    <div v-if="spot">
      <h2>Spot Name: {{ spot.name }}</h2>
      <p><strong>Location:</strong> {{ spot.location }}</p>
      <p><strong>Price per Night:</strong> ${{ spot.pricePerNight }}</p>
      <p><strong>Description:</strong> {{ spot.description }}</p>
      <p><strong>Amenities:</strong> {{ spot.amenities.join(', ') }}</p>

      <form @submit.prevent="bookSpot">
        <label for="checkInDate">Check-in Date:</label>
        <input type="date" id="checkInDate" v-model="checkInDate" required>

        <label for="checkOutDate">Check-out Date:</label>
        <input type="date" id="checkOutDate" v-model="checkOutDate" required>

        <label for="guests">Guests:</label>
        <input type="number" id="guests" v-model.number="guests" min="1" required>

        <p><strong>Total Price:</strong> ${{ calculateTotalCost }}</p>

        <button type="submit">Book Now</button>
      </form>
    </div>
    <div v-else>
      <p>Loading spot details...</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      spot: null,
      checkInDate: '',
      checkOutDate: '',
      guests: 1,
      user: null  
    };
  },
  created() {
    this.fetchSpot();
    this.initializeDates();
    this.fetchUserData(); 
  },
  computed: {
    calculateTotalCost() {
      if (!this.checkInDate || !this.checkOutDate || !this.spot) return 0;
      
      const start = new Date(this.checkInDate);
      const end = new Date(this.checkOutDate);
      const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      
      return nights * this.spot.pricePerNight;
    }
  },
  methods: {
    fetchSpot() {
      const spotId = this.$route.params.id;
      axios.get(`http://localhost:5213/api/CampingSpot/${spotId}`)
        .then(response => {
          this.spot = response.data;
        })
        .catch(error => {
          console.error('Error fetching spot:', error);
        });
    },
    initializeDates() {
      const { checkInDate, checkOutDate, guests } = this.$route.query;
      if (checkInDate && checkOutDate && guests) {
        this.checkInDate = checkInDate;
        this.checkOutDate = checkOutDate;
        this.guests = parseInt(guests);
      }
    },
    fetchUserData() {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData) {
        this.user = {
          id: userData.Id,
          username: userData.Username,
          email: userData.Email,
          firstName: userData.FirstName,
          lastName: userData.LastName,
          phoneNumber: userData.PhoneNumber,
          profilePicturePath: userData.ProfilePicturePath
        };
      } else {
        console.error('User data not found in local storage.');
      }
    },
    bookSpot() {
      if (!this.checkInDate || !this.checkOutDate || !this.guests || !this.spot || !this.user) {
        console.error('Incomplete booking data:', {
          checkInDate: this.checkInDate,
          checkOutDate: this.checkOutDate,
          guests: this.guests,
          spot: this.spot
        });
        return;
      }

      const booking = {
        campingSpotId: this.spot.id,
        userId: this.user.id,
        startDate: this.checkInDate,
        endDate: this.checkOutDate,
        numGuests: this.guests,
        totalPrice: this.calculateTotalCost,
        campingSpot: this.spot
      };

      console.log('Booking data to be sent:', booking);

      axios.post('http://localhost:5213/api/Bookings', booking)
        .then(response => {
          console.log('Booking successful:', response.data);
        })
        .catch(error => {
          console.error('Error creating booking:', error);
          if (error.response && error.response.data && error.response.data.errors) {
            console.error('Validation errors:', error.response.data.errors);
          }
        });
    }
  }
};
</script>
