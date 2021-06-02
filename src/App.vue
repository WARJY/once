<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link>|
            <router-link to="/about">About</router-link>
        </div>
        <router-view />
    </div>
</template>

<script>
import { init } from '../once'
import $ from 'jquery'
export default {
    mounted() {
        init(this)
        // function makeSelector(el) {
        //     var tag, index, stack = [];

        //     for (; el.parentNode; el = el.parentNode) {
        //         tag = el.tagName;
        //         if (tag != "HTML") {
        //             index = $(el).prevAll().length + 1;
        //             if (tag == "BODY") {
        //                 stack.unshift(tag);
        //             } else {
        //                 stack.unshift(tag + ':nth-child(' + index + ')');
        //             }
        //         }
        //     }
        //     return stack.join(' > ');
        // }
        // window.addEventListener("click", e=>{
        //     let query = makeSelector(e.target)
        //     console.log(query)
        // })
    }
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}

#nav {
    padding: 30px;
}

#nav a {
    font-weight: bold;
    color: #2c3e50;
}

#nav a.router-link-exact-active {
    color: #42b983;
}
</style>
