<template>
    <span>{{count}}</span>
</template>

<script>
  export default {
    name: "CountDown",
    props:['limit'],
    data(){
      return {
        count: null
      }
    },
    mounted() {
      this.count = this.limit
      this.runTimer()
    },
    methods: {
      runTimer(){
        if(this.count > 0){
          return setTimeout(()=>{
            this.count -= 1;
            this.runTimer()
          },1000)
        } else {
          this.$emit('onEndCountDown')
        }
      }
    }
  }
</script>

<style scoped>

</style>
