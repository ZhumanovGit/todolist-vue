<template>
    <div>
      <h2>Create New Task</h2>
      <form @submit.prevent="createTask">
        <label for="title">Title:</label>
        <input v-model="newTask.title" type="text" id="title" required />
        <label for="description">Description:</label>
        <textarea v-model="newTask.description" id="description" required></textarea>
        <label for="isDone">Is Done:</label>
        <input v-model="newTask.isDone" type="checkbox" id="isDone" />
        <label for="tagId">Tag ID:</label>
        <input v-model="newTask.tagId" type="text" id="tagId" required />
        <label for="tag">Tag:</label>
        <select v-model="newTask.tagId" id="tag" required>
            <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
        </select>
        <label for="tag">Tag:</label>
        <select v-model="newTask.tagId" id="tag" required>
            <option v-for="tag in tags" :key="tag.id" :value="tag.id">{{ tag.name }}</option>
        </select>
        <button @click="showNewTagForm">Add New Tag</button>

      <!-- Форма для добавления нового тега -->
        <div v-if="isNewTagFormVisible">
            <label for="newTagName">New Tag Name:</label>
            <input v-model="newTagName" type="text" id="newTagName" required />
            <button @click="addNewTag">Add Tag</button>
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
        tagId: ''
      },
      tags: []  // Добавлено свойство для списка тегов
    };
  },
  mounted() {
    this.fetchTags();  // Получаем список тегов при монтировании компонента
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
          // Отправка POST-запроса на создание новой задачи
          // Замените URL на ваш фактический URL для создания задач
          await this.$axios.post('http://localhost:8080/tasks', this.newTask);
          // После успешного создания задачи можно выполнить дополнительные действия,
          // например, перенаправление на страницу со списком задач
          this.$router.push({ name: 'tasks' });
        } catch (error) {
          console.error('Error creating task:', error);
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
