<template>
    <div class="">
        <email-form ref="emailForm" @onCodeToEmail="codeToEmail" />
        <code-form ref="codNZ~T!v&2!x5^t2SDeForm" @onGetNewCode="getNewCode()" />
    </div>
</template>

<script>
import {mapState} from 'vuex'
import EmailForm from "./EmailForm";
import CodeForm from "./CodeForm";


export default {
  name: "VerifyForm",
  components: {
    'email-form': EmailForm,
    'code-form': CodeForm
  },
  computed:{
    ...mapState({
      token:'token',
      email: 'email',
    }),
  },
  data(){
      return{
        stepSendCode: false,
        stepVerifyCode: false,
        isSuccessVerify: false,
        getReCode: false,
      }
  },
  methods: {
    codeToEmail(){
      this.stepSendCode = true
    },
    verifySuccess(){
      this.stepVerifyCode = true
    },
    getNewCode(){
    },
  }
}
</script>

<style scoped>

</style>
