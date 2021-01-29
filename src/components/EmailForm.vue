<template>
    <div class="">
        <form action="">
            <div class="form-row">
                <label for="field-email">Адрес электронной почты</label>
                <input id="field-email" type="email" v-model="userEmail">
            </div>
        </form>
        <div v-if="status == STATUS_INSERT_EMAIL">
            <div v-if="!isLoad && email">
                <button ref="getCodeButton"  @click.stop="codeToEmail()">Получить код</button>
            </div>
            <div v-if="isLoad">
                <loading />
            </div>
        </div>
        <div v-else-if="status == STATUS_EXIST_EMAIL">
            <div>Код уже был отправлен ранее</div>
            <div v-if="timer">Получить новый код можно через <count-down :limit="timer" @onEndCountDown="showButtonNewCode()"  /></div>
            <div v-else>
                <button @click.stop="$refs.codeForm.getNewCode()">Получить новый код</button>
            </div>
        </div>
    </div>

</template>

<script>
import {mapState} from 'vuex'
import Loading from "./Loading";
import CountDown from "./CountDown";
import {SET_EMAIL, SET_STATUS, SET_TIMER} from "../store/mutations.type";
import {VERIFY_EMAIL} from "../store/actions.type";
import {STATUS_CODE_TO_EMAIL, STATUS_EXIST_EMAIL, STATUS_INSERT_EMAIL} from "../common/statuses";
  export default {
    components:{
      'loading': Loading,
      'count-down': CountDown
    },
    computed:{
      ...mapState({
        "email": "email",
        "sended":"sended",
        "timer":"timer",
        "status": "status"
      }),
      userEmail:{
        set(value){
          this.$store.commit(SET_EMAIL, value)
        },
        get(){
          return this.email
        }
      }
    },
    name: "EmailForm",
    data(){
      return {
        'isLoad': false,
        STATUS_INSERT_EMAIL: STATUS_INSERT_EMAIL,
        STATUS_EXIST_EMAIL: STATUS_EXIST_EMAIL,
        STATUS_CODE_TO_EMAIL: STATUS_CODE_TO_EMAIL
      }
    },
    mounted() {
      this.$store.commit(SET_STATUS, STATUS_INSERT_EMAIL)
    },
    methods:{
      codeToEmail(){
        this.$refs.getCodeButton.disabled = true
        this.isLoad = true
        let $this = this
        this.$store.dispatch(VERIFY_EMAIL).then(()=>{
          $this.isLoad = false
          if(!$this.sended){
            $this.$store.commit(SET_STATUS, STATUS_CODE_TO_EMAIL)
            $this.$emit('onCodeToEmail')
          }else {
            $this.$store.commit(SET_STATUS, STATUS_EXIST_EMAIL)
            $this.$emit('onFailedSending')
          }
        })
      },
      showButtonNewCode(){
        this.$store.commit(SET_TIMER,0)
      }
    },
  }
</script>

<style scoped>

</style>
