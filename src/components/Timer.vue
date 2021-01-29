<template>
    <div v-if="!finish" class="">
        Осталось секунд: {{count}}
    </div>
</template>

<script>
  import {SET_TIME_LIMIT} from "../store/mutations.type";
  export default {
    name: "Timer",
    props: ['limit'],
    data(){
      return {
        count: null,
        finish: false
      }
    },
    mounted() {
      this.count = this.limit
      console.log('Start timer')
      this.startTimer()
    },
    methods: {
      startTimer(){
        if(this.count > 0 && !this.finish ){
          return setTimeout(()=>{
            --this.count
            this.startTimer()
          }, 1000)
        }else{
          console.log('Finish timer')
          this.$emit('onFinishTimer')
          this.finish = true
        }
      },
      stopTimer(){
        console.log('Stop timer')
        this.finish = true
        this.$store.commit(SET_TIME_LIMIT, this.count)
        this.$emit('onStopTimer')
      }
    }
  }
</script>

<style scoped>

</style>
