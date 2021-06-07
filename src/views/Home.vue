<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <el-input v-model="input"></el-input>
    <el-select v-model="input2">
      <el-option label="1" value="1"></el-option>
      <el-option label="2" value="2"></el-option>
    </el-select>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  },
  data(){
    return {
      input: "",
      input2: ""
    }
  },
  mounted(){
    console.log(this.$route)
  }
}
</script>
