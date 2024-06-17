<template>
    <div>
      <NavigationBar />
      <br>
      <SearchForm />
      <br>
      <FooterBar />
      </div>
    
  </template>
  
  <script>
  import NavigationBar from './NavigationBar.vue'
  import SearchForm from './SearchForm.vue'
  import FooterBar from './FooterBar.vue';
  
  export default {
    components: {
      
      NavigationBar,
      SearchForm,
      FooterBar
      
    },
    
  };
  </script>
  
  <style scoped>
  .user-page {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    
  }
  </style>
  