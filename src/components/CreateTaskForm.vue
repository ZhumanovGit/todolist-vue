<template>
  <div>
    <router-link :to="{ name: 'tasks' }">Back to Task List</router-link>
    <h2>Create New Task</h2>
    <form @submit.prevent="createTask">
      <label for="title">Title:</label>
      <input v-model="newTask.title" type="text" id="title" required />

      <label for="description">Description:</label>
      <textarea v-model="newTask.description" id="description" required></textarea>

      <label for="isDone">Is Done:</label>
      <input v-model="newTask.isDone" type="checkbox" id="isDone" />

      <label for="tag">Tag:</label>
      <select v-model="newTask.tagId" id="tag" required>
        <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.title }}</option>
      </select>

      <button @click="showNewTagForm">Add New Tag</button>

      <!-- Форма для добавления нового тега -->
      <div v-if="isNewTagFormVisible">
        <form @submit.prevent="createTag">
          <label for="newTagName">New Tag Name:</label>
          <input v-model="newTagName" type="text" id="newTagName" required />
          <button @click="addNewTag">Add Tag</button>
        </form>
      </div>

      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      newTask: {
        title: '',
        description: '',
        isDone: false,
        tagId: '',
      },
      tags: [],
      isNewTagFormVisible: true,
      newTagName: '',
    };
  },
  mounted() {
    this.fetchTags();
  },
  methods: {
    async fetchTags() {
      try {
        const response = await this.$axios.get('http://localhost:8080/tags');
        this.tags = response.data;
      } catch (error) {
        console.error('Error fetching tags:', error);
      }
    },
    async createTask() {
      try {
        await this.$axios.post('http://localhost:8080/tasks', this.newTask);
        this.fetchTasks();
        this.$router.push({ name: 'tasks' });
      } catch (error) {
        console.error('Error creating task:', error);
      }
    },
    async createTag() {
      try {
        const tag = {title: this.newTagName}
        await this.$axios.post('http://localhost:8080/tags', tag)
        this.fetchTags();
        this.$router.push({ name: 'tags' });
      } catch (error) {
        console.error('error creating tag:', error)
      }

    },
    showNewTagForm() {
      this.isNewTagFormVisible = true;
    },
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
textarea,
select {
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

/* Стили для формы добавления нового тега */
.new-tag-form {
  margin-top: 15px;
  border: 1px solid #ddd;
  padding: 10px;
  border-radius: 5px;
}

.new-tag-form label {
  display: block;
  margin-top: 10px;
}

.new-tag-form input {
  width: calc(100% - 20px);
  padding: 8px;
  box-sizing: border-box;
  margin-top: 5px;
  margin-bottom: 15px;
}

.new-tag-form button {
  background-color: #4caf50;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.new-tag-form button:hover {
  background-color: #388e3c;
}
</style>
