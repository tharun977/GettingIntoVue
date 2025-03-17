<template>
    <div class="search-box animate__animated animate__fadeIn">
      <input v-model="query" @keyup.enter="search" placeholder="Enter city, zip, or landmark..." />
      <button @click="search">
        <i class="fas fa-search"></i>
      </button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return { query: "" };
    },
    methods: {
      search() {
        if (this.query.trim()) {
          this.$emit("search", this.query);
          this.query = "";
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .search-box {
    display: flex;
    align-items: center;
    background: rgba(255, 255, 255, 0.2);
    padding: 12px;
    border-radius: 30px;
    backdrop-filter: blur(10px);
    width: 100%;
    max-width: 400px;
    margin: 20px auto;
  }
  
  input {
    border: none;
    background: none;
    outline: none;
    padding: 12px;
    font-size: 18px;
    color: #fff;
    flex-grow: 1;
  }
  
  button {
    border: none;
    background: none;
    cursor: pointer;
    color: #fff;
    font-size: 22px;
  }
  </style>
  