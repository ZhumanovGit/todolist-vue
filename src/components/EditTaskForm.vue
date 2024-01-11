<template>
  <div>
    <router-link :to="{ name: 'tasks' }">Back to Task List</router-link>
    <h2>Edit Task</h2>
    <form @submit.prevent="updateTask">
      <label for="title">Title:</label>
      <input v-model="editedTask.title" type="text" id="title" required />
      <label for="description">Description:</label>
      <textarea v-model="editedTask.description" id="description" required></textarea>
      <label for="isDone">Is Done:</label>
      <input v-model="editedTask.isDone" type="checkbox" id="isDone" />
      <label for="tagId">Tag ID:</label>
      <input v-model="editedTask.tagId" type="int" id="tagId" required />
      <button type="submit">Update Task</button>
    </form>
  </div>
</template>
  
<script>
export default {
  data() {
    return {
      editedTask: {
        title: '',
        description: '',
        isDone: false,
        tagId: Number('')
      }
    };
  },
  methods: {
    async updateTask() {
      try {
        
        // Отправка PUT-запроса для обновления задачи
        await this.$axios.put(`http://localhost:8080/tasks/${this.$route.params.id}`, this.editedTask);
        // После успешного обновления задачи можно выполнить дополнительные действия,
        // например, перенаправление на страницу со списком задач
        this.fetchTasks();
        this.$router.push({ name: 'tasks' });
      } catch (error) {
        console.error('Error updating task:', error);
      }
    }
  }
};
</script>
  
<style scoped>
h2 {
  margin-bottom: 20px;
}

form {
  max-width: 400px;
  margin: 0 auto;
}

label {
  display: block;
  margin-top: 10px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  margin-bottom: 15px;
  box-sizing: border-box;
}

button {
  background-color: #2196F3;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #0d47a1;
}
</style>

  