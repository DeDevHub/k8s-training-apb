<template>
  <div class="home">
    <v-container>
      <template>
        <v-container style="max-width: 500px">
          <v-text-field
            v-model="newTodo"
            label="What are you working on?"
            solo
            @keydown.enter="saveTodo"
          >
            <template v-slot:append>
              <v-fade-transition>
                <v-icon dark color="primary" v-if="newTodo" @click="saveTodo">
                  mdi-plus-circle
                </v-icon>
              </v-fade-transition>
            </template>
          </v-text-field>

          <h2 class="display-1 success--text pl-4">
            Todos:&nbsp;
            <v-fade-transition leave-absolute>
              <span :key="`Todos-${todos.length}`">
                {{ todos.length }}
              </span>
            </v-fade-transition>
          </h2>

          <v-divider class="mt-4"></v-divider>

          <v-row class="my-1" align="center">
            <strong class="mx-4 info--text text--darken-2">
              Remaining: {{ remainingTodos }}
            </strong>

            <v-divider vertical></v-divider>

            <strong class="mx-4 success--text text--darken-2">
              Completed: {{ completedTodos }}
            </strong>

            <v-spacer></v-spacer>

            <v-progress-circular
              :value="progress"
              class="mr-2"
            ></v-progress-circular>
          </v-row>

          <v-divider class="mb-4"></v-divider>

          <v-card v-if="todos.length > 0">
            <v-slide-y-transition class="py-0" group tag="v-list">
              <template v-for="(todo, i) in todos">
                <v-divider v-if="i !== 0" :key="`${i}-divider`"></v-divider>

                <v-list-item :key="`${i}-${todo.text}`">
                  <v-list-item-action>
                    <v-checkbox
                      v-model="todo.status"
                      :color="(todo.status && 'grey') || 'primary'"
                      @change="editTodo(i)"
                    >
                      <template v-slot:label>
                        <div
                          :class="
                            (todo.status && 'grey--text') || 'primary--text'
                          "
                          class="ml-4"
                          v-text="todo.text"
                        ></div>
                      </template>
                    </v-checkbox>
                  </v-list-item-action>

                  <v-spacer></v-spacer>
                  <v-icon
                    color="red"
                    class="mx-2"
                    small
                    style="cursor: pointer"
                    @click="deleteTodo(i)"
                  >
                    mdi-trash-can
                  </v-icon>
                  <v-scroll-x-transition>
                    <v-icon v-if="todo.status" color="success">
                      mdi-check
                    </v-icon>
                  </v-scroll-x-transition>
                </v-list-item>
              </template>
            </v-slide-y-transition>
          </v-card>
        </v-container>
      </template>
    </v-container>
  </div>
</template>

<script>
// @ is an alias to /src
import axios from "axios";

const baseUrl = process.env.VUE_APP_TODO_API_URL || "http://localhost:9090";

export default {
  data: () => ({
    todos: [],
    newTodo: null,
  }),

  computed: {
    completedTodos() {
      return this.todos.filter((todo) => todo.status).length;
    },
    progress() {
      return (this.completedTodos / this.todos.length) * 100;
    },
    remainingTodos() {
      return this.todos.length - this.completedTodos;
    },
  },

  mounted() {
    this.getTodos();
  },

  methods: {
    async saveTodo() {
      const response = await axios.post(`${baseUrl}/todos`, {
        text: this.newTodo,
      });
      if (response.status === 200) {
        this.getTodos();
        this.newTodo = null
      }
    },
    async getTodos() {
      const response = await axios.get(`${baseUrl}/todos`);
      if (response.status === 200) {
        this.todos = [...response.data];
      }
    },
    async editTodo(index) {
      const todo = { ...this.todos[index] };
      const response = await axios.put(`${baseUrl}/todos/${todo.id}`, {
        text: todo.text,
        status: todo.status,
      });
      if (response.status === 200) {
        this.getTodos();
      }
    },
    async deleteTodo(index) {
      const todo = { ...this.todos[index] };
      const response = await axios.delete(`${baseUrl}/todos/${todo.id}`);
      if (response.status === 200) {
        this.getTodos();
      }
    },
  },
};
</script>
