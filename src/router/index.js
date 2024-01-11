import { createRouter, createWebHistory } from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import TaskList from '@/components/TaskList.vue';
import CreateTaskForm from '@/components/CreateTaskForm.vue';
import EditTaskForm from '@/components/EditTaskForm.vue';

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage  // Добавленная строка
  },
  {
    path: '/tasks',
    name: 'tasks',
    component: TaskList
  },
  {
    path: '/create-task',
    name: 'createTask',
    component: CreateTaskForm
  },
  {
    path: '/edit-task/:id',  // Параметр :id указывает на ID задачи
    name: 'editTask',
    component: EditTaskForm
  }
  // Добавьте другие маршруты при необходимости
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});


export default router;
