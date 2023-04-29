<template>

</template>

<script>
export default {
  name: 'Logout',
  mounted() {
    this.logout()
  },
  methods: {
    logout() {
      console.log(this.$global_msg.username);
      this.$axios
        .post('/logout', {
          username: "1"
        })
        .then(successResponse => {
          this.$router.replace('/chat')
        })
        .catch(failResponse => {
          alert("服务器未响应")
        })
    }
  }

}
</script>

<style scoped>

</style>
