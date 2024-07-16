<template>
    <div id="footer">
      <p>Ana Julia & Bruno &copy; 2024</p>
    </div>
  </template>
  
  <script>
  export default {
    name: "Footer"
  }
  </script>
  
  <style scoped>
    #footer {
      height: 40px;
      background-color: rgb(116, 135, 103);
      border-top: 1px solid rgb(26, 69, 55);
      color: #FFF1D7;
      display: flex;
      align-items: center;
      justify-content: center;
      bottom: 0;
      width: 100%;
      z-index: 999;
    }
  </style>