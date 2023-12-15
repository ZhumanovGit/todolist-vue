<template>
  <div>
    <h2>Welcome to Task Manager!</h2>
    <p>This is the home page.</p>
    <router-link to="/tasks">
      <button>Go to Task List</button>
    </router-link>
  </div>
</template>
  
  <script>
  export default {
    // Ваш код компонента
  };
  </script>
  
  <style scoped>
  h2 {
    margin-bottom: 20px;
  }

  p {
    margin-bottom: 15px;
  }

  button {
    background-color: #4caf50;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background-color: #388e3c;
  }
</style>

  