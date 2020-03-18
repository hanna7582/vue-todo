<template>
  <div>
    <!-- 상대경로 -->
    <!-- <img src="../assets/logo.png" alt=""> -->
    <!-- 동적 이미지파일명-->
    <!-- <img src="@/assets/logo.png" alt=""> -->
    <!-- 정적 이미지파일명 -->
    <!-- <img src="/vue-todo/assets/logo.png" alt=""> -->

    <div id="list-demo">
      <button v-on:click="add">Add</button>
      <button v-on:click="remove">Remove</button>
      <button v-on:click="shuffle">Shuffle</button>
      <transition-group name="flip-list" tag="ul">

        <li v-for="item in items" v-bind:key="item" class="list-item">
          <span>{{ item }}</span>
        </li>
      </transition-group>
    </div>
  </div>
</template>

<script>

export default {
  props:['items'],
  data() {
    return {
      nextNum: 10
    }
  },
  methods: {
    randomIndex: function () {
      return Math.floor(Math.random() * this.items.length)
    },
    add: function () {
      this.items.splice(this.randomIndex(), 0, this.nextNum++)
    },
    remove: function () {
      this.items.splice(this.randomIndex(), 1)
    },
    shuffle: function () {
      this.$emit('shuffle');
    }
  }
}
</script>

<style>
  #list-demo{z-index: 1; position: relative;}
  .list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .list-enter-active, .list-leave-active {
    transition: all 1s;
  }
  .list-enter, .list-leave-to {
    opacity: 0;
    transform: translateY(30px);
  }
  .flip-list-move {
    transition: transform 1s;
  }
</style>