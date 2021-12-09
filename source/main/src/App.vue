<template>
  <div>
    <h2>Hello Main</h2>
    <div class="btns">
      <el-button @click="goPage('/sub1/about')">去 Demo1 的 About 页面</el-button>
      <el-button @click="goPage('/sub2/about')">去 Demo2 的 About 页面</el-button>
    </div>
    <div id="subapp"></div>
  </div>
</template>

<script>
export default {
  name: 'App',
  methods: {
    goPage(page) {
      history.pushState({}, '', page);
    }
  }
}
</script>
