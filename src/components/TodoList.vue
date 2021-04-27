<template>
  <div>
    <input class="todo-input" placeholder="Add some tasks" 
    v-model="newTodo" 
    @keyup.enter="addTodo">
    <!------------------------------------------------------------------------->
    <transition-group name="fade" enter-active-class="animated fadeInUp" 
                                  leave-active-class="animated fadeOutDown">
      <todo-item v-for="(todo) in todosFiltered" 
      :key="todo.id"
      :todo="todo"
      :checkAll="!anyRemaining">
      </todo-item>
    </transition-group>
    <!------------------------------------------------------------------------->
    <div class="extra-container">
      <todo-check-all/>
      <todo-items-remaining/>
    </div>
    <!---------->
    <div class="extra-container">
      <todo-filtered/>
      <div>
        <transition name="fade">
          <todo-clear-completed/>
        </transition>
      </div>
    </div>
  </div>
</template>


<script>
import TodoItem from './TodoItem'
import TodoItemsRemaining from './TodoItemsRemaining'
import TodoCheckAll from './TodoCheckAll'
import TodoFiltered from './TodoFiltered'
import TodoClearCompleted from './TodoClearCompleted'

export default {
    name: 'todo-list',
    components: {
      TodoItem,
      TodoItemsRemaining,
      TodoCheckAll,
      TodoFiltered,
      TodoClearCompleted,
    },
    data() {
        return {
            newTodo : '',
            beforeEditCache : '',
            idForTodo: 4,
        }
    },

    computed: {
        remaining() {
          return this.$store.getters.remaining
        },

        anyRemaining() {
          return this.$store.getters.anyRemaining
        },

        todosFiltered() {
          return this.$store.getters.todosFiltered
        },

        showClearCompletedButton() {
          return this.$store.getters.showClearCompletedButton
        }
    },

    methods: {
      addTodo() {
        if (this.newTodo.trim().length == 0) {
          return
        }

        this.$store.dispatch('addTodo', {
          id: this.idForTodo,
          title: this.newTodo,
        })

        this.newTodo = ''
        this.idForTodo++
      },
    }
}
</script>

<style lang="scss">

  @import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.2/animate.min.css");

  .todo-input {
    width: 100%;
    padding: 10px 18px;
    font-size: 18px;
    margin-bottom: 16px;
    border: none;
    border-radius: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px rgba(0,0,0,0.19);

    &:focus {
      outline: 0;
    }
  }

  .todo-item {
    margin-bottom: 12px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    animation-duration: 0.3s;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 0 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px rgba(0,0,0,0.19);
  }

  .remove-item {
    cursor: pointer;
    margin-left: 14px;
    width: 30px;
    height: 30px;
    text-align: center;
    border-radius: 50%;
    background-color:lightpink;
    border:1px solid lightgrey;
    &:hover {
      color: black;
    }
  }

  .todo-item-left {
    display: flex;
    align-items: center;
  }

  .todo-item-label {
    padding: 10px;
    border: 1px solid white;
    margin-left: 12px;
  }

  .todo-item-edit {
    font-size: 24px;
    color: #2c3e50;
    margin-left: 12px;
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    font-family: 'Avenir', Helvetica, Arial, sans-serif;

    &:focus {
      outline: none;
    }
  }

  .completed {
    text-decoration: line-through;
    color: grey;
  }

  .extra-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 16px;
    border-top: 1px solid lightgray;
    padding-top: 14px;
    margin-bottom: 14px;
  }

  button {
    font-size: 14px;
    background-color: white;
    appearance: none;
    border: 2px solid grey;
    border-radius: 5px;
    margin-right: 10px;
    box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2), 0 3px 10px rgba(0,0,0,0.19);
    cursor: pointer;

    &:hover {
      background:lightgrey;
      box-shadow: 0 6px 8px 0 rgba(0,0,0,0.24), 0 6px 15px rgba(0,0,0,0.19);
    }

    &:focus {
      outline: none;
    }
  }

  .active {
    background: lightgreen;
  }

  .fade-enter-active, .fade-leave-active{
    transition: opacity .2s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

</style>