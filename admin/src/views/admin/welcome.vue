<template>
    <div>
      <h1>欢迎进入后台</h1>
    </div>
</template>
<script>

export default {
  name: "welcome",
  mounted() {
    $('body').attr('class', 'no-skin');
    this.$parent.activeSidebar("welcome-sidebar");
  },

}
</script>