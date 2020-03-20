<template>
  <div id="app" :class="theme">    
    <TodoHeader :theme="theme"
                @themeChange="themeChange"/>
    <TodoInput @addTodo="addTodo"/>
    <TodoList :todoList="todoList" 
              :allDone="allDone"
              @shuffle="shuffle" 
              @checkCompleted="checkCompleted" 
              @removeTodo="removeTodo" 
              @allDoneChange="allDoneChange"
              @activeCountChange="todoListSet"
              />
    <TodoFooter :todoList="todoList" 
              @removeAll="removeAll"
              @removeCompleted="removeCompleted"/>    
  </div>
</template>

<script>
import TodoHeader from './components/TodoHeader.vue';
import TodoInput from './components/TodoInput.vue';
import TodoList from './components/TodoList.vue';
import TodoFooter from './components/TodoFooter.vue';

import _ from 'lodash';

export default {
  name: 'App',
  components: {
    TodoHeader, 
    TodoInput, 
    TodoList, 
    TodoFooter,
  },
  data() {
    return {
      todoList:[],
      theme:'',
      allDone: false,     
    }
  }, 
  created() {
    this.todoList=this.todoListFetch();
    this.theme=this.themeFetch();
  },
  watch: {
    todoList(todoList){      
      this.todoListSet(todoList)      
    }
  },
  methods: {
    todoListSet:function(todoList){
      localStorage.setItem('todoList',JSON.stringify(todoList)); 
    },
    todoListFetch:function(){
      const todoListJSON=localStorage.getItem('todoList');      
      if(!todoListJSON){
        localStorage.setItem('todoList','[]');
        return []; 
      }          
      const todoList=JSON.parse(todoListJSON);      
      return todoList;
    },
    themeFetch:function(){
      var theme=localStorage.getItem('theme');      
      if(!theme){
        localStorage.setItem('theme','light');
        return 'light'; 
      }          
      return theme;
    },
    addTodo:function(newTodoItem){      
      let id = 0;
      if (this.todoList.length != 0) {
        let findObj = this.todoList.reduce(function(previous, current) {
            return previous.id > current.id ? previous : current;
        });
        id = findObj.id + 1;
      }
      var newTodo={
        id:id,
        item:newTodoItem,
        completed:false
      }      
      this.todoList.push(newTodo);  
    },
    removeTodo:function(id){
      this.todoList = this.todoList.filter(todo => todo.id != id);
    },
    removeAll:function () {
      this.todoList=[];
      this.showModal=false;
      this.allDoneChange(false);  
    },
    checkCompleted:function (payload) {      
      if(payload.mode=='all'){
        this.todoList.forEach((todo) => {
          todo.completed=payload.allDone;
        });                
      }else{
        this.todoList.forEach((todo) => {
          if(todo.id == payload.id){
            todo.completed=!todo.completed;
          }
        });
      }      
    },
    removeCompleted:function() {
      this.todoList = this.todoList.filter(todo => todo.completed == false);      
    },
    themeChange:function (themeChangeCheck) {
      let theme = themeChangeCheck ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
      this.theme=theme;    
    },    
    shuffle: function () {
      this.todoList = _.shuffle(this.todoList)
    },
    allDoneChange(allDone) {
      this.allDone = allDone;
    }
  },
}
</script>

<style lang="scss">
  #app{
    height: 100vh;
    box-sizing: border-box;
    padding: 20px;
    background: $light-gray;
    &.dark{
      background: $dark-gray;
    }
  }
</style>
