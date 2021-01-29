<template>
  <div class="home">
    <verify-form @onVerifySuccess="showMessageForm()" />
    <message-form v-if="isShowMessage" />
  </div>
</template>

<script>
import VerifyForm from "../components/VerifyForm";
import Message from "../components/Message";
export default {
  name: 'Home',
  data(){
    return{
      isShowMessage: false
    }
  },
  components: {
    'verify-form': VerifyForm,
    'message-form': Message
  },
  methods: {
    showMessageForm(){
      this.isShowMessage = true
    }
  }
}
</script>

<style lang="less">
  .form-row{
    padding: 5px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items:center;
    label{
      margin: 10px;
    }
  }
</style>
