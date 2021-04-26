<template>
  <div class="todo-item">
    <div class="todo-item-left">
        <input type="checkbox" 
        v-model="completed"
        @change="doneEdit">
          <div class="todo-item-label"
          :class="{completed : completed}" 
          v-if="!editing" 
          @dblclick="editTodo" >
            {{title}}
          </div>
          <input v-else class="todo-item-edit" type="text" 
          v-model="title" 
          @blur="doneEdit"
          @keyup.enter="doneEdit"
          @keyup.esc="cancelEdit"
          v-focus>
      </div>
      <div class="remove-item" @click="removeTodo(index)">
        &times;
      </div>
  </div>
</template>

<script>
export default {
    name: 'todo-item',
    props: {
      todo: {
        type: Object,
        required: true,
      },
      index: {
        type: Number,
        required: true,
      },
      checkAll: {
        type: Boolean,
        required: true,
      }
    },

    data() {
      return {
        'id' : this.todo.id,
        'title' : this.todo.title,
        'completed' : this.todo.completed,
        'editing' : this.todo.editing,
        'beforeEditCache' : '',
      }
    },

    watch: {
      checkAll() {
        if (this.checkAll) {
        this.completed = true
      }
      else {
        this.completed = this.todo.completed
      }
      }
    },

    directives: {
      focus: {
        inserted: function (el) {
          el.focus
        }
      }
    },

    methods: {
      removeTodo(id) {
        const index = this.$store.state.todos.findIndex(item => item.id == id);
        this.$store.state.todos.splice(index,1);
      },

      editTodo() {
        this.editing =true
        this.beforeEditCache = this.title
      },

      doneEdit() {
        if (this.title.trim() == '') {
          this.title = this.beforeEditCache
        }
        this.editing = false

        const index = this.$store.state.todos.findIndex(item => item.id == this.id)
        this.$store.state.todos.splice(index, 1, {
          'id': this.id,
          'title': this.title,
          'completed': this.completed,
          'editing': this.editing,
        })
      },

      cancelEdit() {
        this.title = this.beforeEditCache
        this.editing = false
      }
    }
}
</script>