<template>
  <footer>
      <div class="btn-group">
        <button v-if="todoList.length!=0" @click="confirm">Remove All</button>
        <button v-if="isRemoveCompletedCount" @click="removeCompleted">Remove completed</button>      
      </div>
      <Modal v-if="showModal">      
        <h3 slot="header"></h3>
        <div slot="body">할일을 모두 삭제하시겠어요?</div>
        <div slot="footer" class="btn-group">
          <button class="modal-primary-button" @click="removeAll">OK</button>
          <button class="modal-default-button" @click="showModal=false">Cancel</button>
        </div>
      </Modal>
  </footer>
</template>

<script>
import Modal from './Modal'
export default {  
  components:{ Modal },
  props:['todoList'],
  data() {
    return {
      showModal:false
    }
  },
  computed: {
    isRemoveCompletedCount:function(){
      var completedCount=this.todoList.filter( todo => todo.completed == true ).length;
      if(completedCount==0){
        return false;
      }      
      return true;
    }
  },
  methods: {
    confirm:function(){
      this.showModal=true;
    },
    removeAll:function(){
      this.showModal=false;
      this.$emit('removeAll');
    },
    removeCompleted:function() {
      this.$emit('removeCompleted');
    },
  }
}
</script>

<style lang="scss" scoped>
  footer{
    width: calc(100% - 40px);
    @include pos-fix(auto, auto, 20px);
  }
  .flex{
    display: flex;
  }
  .btn-group{
    display: flex;
    button{
      width: 100%;
      height: 30px;
      background-color: #fff;
      color: $primary;
      &:last-child{border-left:1px solid $light-gray;}
      &.modal-primary-button{
          height: 30px;
          background-color: $primary;
          color: $white;
      }
    }
  }
</style>