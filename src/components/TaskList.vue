<template>
  <div>
    <h2>Task List</h2>
    <div v-for="task in tasks" :key="task.id" class="task">
      <input type="checkbox" v-model="task.isDone" />
      <div>
        <h3>{{ task.title }}</h3>
        <p>{{ task.description }}</p>
        <p>Tag: {{ getTagName(task.tagId) }}</p>
      </div>
      <button @click="deleteTask(task.id)" class="delete">Delete</button>
      <router-link :to="{ name: 'editTask', params: { id: task.id } }">
        <button class="edit">Edit</button>
      </router-link>
    </div>

    <router-link to="/create-task">
      <button class="create">Create New Task</button>
    </router-link>
  </div>
</template>


<script>
export default {
  data() {
    return {
      tasks: Array,
      tags: Array
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    async fetchTasks() {
      try {
        const [tasksResponse, tagsResponse] = await Promise.all([
          this.$axios.get('http://localhost:8080/tasks'),
          this.$axios.get('http://localhost:8080/tags')
        ]);

        this.tasks = tasksResponse.data;
        console.log(this.tasks)
        this.tags = tagsResponse.data;
      } catch (error) {
        console.error('Error fetching tasks and tags:', error);
      }
    },
    async deleteTask(taskId) {
      try {
        await this.$axios.delete(`http://localhost:8080/tasks/${taskId}`);
        this.fetchTasks();
      } catch (error) {
        console.error(`Error deleting task with ID ${taskId}:`, error);
      }
    },
    getTagName(tagId) {
      // Метод для получения названия тега по его ID
      const tag = this.tags.find(tag => tag.id === tagId);
      return tag ? tag.title : 'N/A';
    }
  }
};
</script>

<style scoped>
/* Ваши стили для компонента TaskList */
.task {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
}

button {
  margin-left: 10px;
  cursor: pointer;
  padding: 5px 10px;
  border: none;
  border-radius: 5px;
}

button.delete {
  background-color: #f44336;
  color: white;
}

button.delete:hover {
  background-color: #d32f2f;
}

button.edit {
  background-color: #2196F3;
  color: white;
}

button.edit:hover {
  background-color: #0d47a1;
}

button.create {
  background-color: #4caf50;
  color: white;
}

button.create:hover {
  background-color: #388e3c;
}
</style>
