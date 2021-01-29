<template>
    <form action="">
        <div class="">
            <div class="form-row">
                <div class="">
                <label for="author-name">ФИО</label>
                </div>
                <div><input type="text" id="author-name" v-model="name" /></div>
            </div>
            <div class="form-row">
                <label for="author-message">Сообщение</label>
                <textarea id="author-message" cols="30" rows="10"></textarea>
            </div>
            <div class="form-row">
                <input type="submit" value="Отправить сообщение">
            </div>
        </div>
    </form>
</template>

<script>
  export default {
    name: "Message",
    data(){
      return{
        name: null,
        message: null,
        email: null,
      }
    }
  }
</script>

<style lang="less">

</style>
