<template>
    <div v-if="status == STATUS_CODE_TO_EMAIL || status == STATUS_GET_NEW_CODE" class="">
        <div v-if="!isLoad" class="">
            <div class="">
                <div class="form-row">
                    <label for="field-code">Введите код подтверждения</label>
                    <input type="text" id="field-code" v-model="code"/>
                </div>
                <div class="form-row">
                    <button ref="verifyCodeButton" @click.stop="verifyCode()">Отправить</button>
                </div>
            </div>
            <timer v-if="timerLimit" ref="timer" :limit="timerLimit" @onFinishTimer="finishTimer()"></timer>
        </div>
        <loading v-else></loading>
    </div>
    <div v-else-if="status == STATUS_CODE_VERIFY_SUCCESS" class="">
        Код успешно подтвержден
    </div>
    <div v-else-if="status == STATUS_CODE_VERIFY_FAIL" class="">
        <div>Ошибка, неверный код</div>
        <div v-if="limit > 0">Запросить новый можно через: <count-down :limit="limit" @onEndCountDown="endCountDown()"/> сек.</div>
        <button v-if="limit <= 0" @click.stop="getNewCode()">Получить новый код</button>
    </div>
    <div v-else-if="status == STATUS_TIME_OUT">
        <div>Время ожидания истекло</div>
        <button @click.stop="getNewCode()">Получить новый код</button>
    </div>
</template>

<script>
  import Timer from "./Timer";
  import Loading from "./Loading";
  import CountDown from "./CountDown";
  import {mapState} from 'vuex'
  import {VERIFY_CODE_TOKEN, VERIFY_EMAIL} from "../store/actions.type";
  import {
    STATUS_CODE_TO_EMAIL,
    STATUS_CODE_VERIFY_SUCCESS,
    STATUS_CODE_VERIFY_FAIL,
    STATUS_GET_NEW_CODE,
    STATUS_TIME_OUT
  } from "../common/statuses";
  import {SET_ERROR_VERIFY, SET_STATUS, SET_TIME_LIMIT} from "../store/mutations.type";

  export default {
    name: "CodeForm",
    components: {
      'timer': Timer,
      'loading': Loading,
      'count-down': CountDown
    },
    computed:{
      ...mapState({
        token: 'token',
        sended: 'sended',
        error: 'errorVerify',
        timerLimit: 'timer',
        status: 'status',
        limit: 'timeLimit'
      })
    },
    data() {
      return {
        'code': null,
        'isLoad': false,
        'result': null,
        STATUS_CODE_TO_EMAIL: STATUS_CODE_TO_EMAIL,
        STATUS_CODE_VERIFY_SUCCESS: STATUS_CODE_VERIFY_SUCCESS,
        STATUS_CODE_VERIFY_FAIL: STATUS_CODE_VERIFY_FAIL,
        STATUS_GET_NEW_CODE: STATUS_GET_NEW_CODE,
        STATUS_TIME_OUT: STATUS_TIME_OUT
      }
    },
    methods: {
      finishTimer() {
        this.$store.commit(SET_STATUS, STATUS_TIME_OUT)
      },
      verifyCode(){
        this.isLoad = true
        this.$refs.verifyCodeButton.disabled = true
        this.$refs.timer.stopTimer()
        let $this = this
        this.$store.dispatch(VERIFY_CODE_TOKEN, {code: this.code}).then(() => {
          $this.isLoad = false
          if(!$this.error){
            $this.$store.commit(SET_STATUS, STATUS_CODE_VERIFY_SUCCESS)
            $this.$emit('onVerifySuccess')
          }else {
            $this.$store.commit(SET_STATUS, STATUS_CODE_VERIFY_FAIL)
            $this.$emit('onVerifyFail')
          }
        })
      },
      getNewCode(){
        console.log('get new code')
        this.$store.commit(SET_STATUS, STATUS_GET_NEW_CODE)
        this.$store.commit(SET_ERROR_VERIFY, false)
        this.code = null
        this.isLoad = true
        let $this = this
        this.$store.dispatch(VERIFY_EMAIL).then(()=>{
          $this.$emit('onGetNewCode')
          $this.isLoad = false
        })
      },
      endCountDown(){
        this.$store.commit(SET_TIME_LIMIT, 0)
      }

    }
  }
</script>

<style scoped>

</style>
