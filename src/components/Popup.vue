<template>
  <div class="parent-popup">
    <div class="popup" v-if = "seen">
      <form @submit.prevent = "newTable">
        <label>Name</label>
        <input type="text" name="name" maxlength="60" v-model="name" required>
        <label>Gender</label>
        <div class="rad">
          <input class="radio" name="gender" type="radio" value="Male" v-model="gender">
          <label for="gender">Male</label>
          <input class="radio2" name="gender" type="radio" value="Female" v-model="gender">
          <label for="gender">Female</label> 
        </div>
        <label>Email</label>
        <input type="email" name="email" v-model="email" required>
        <label>Status</label>
        <div class="rad">
          <input class="radio" name="status" type="radio" value="Active" v-model="status">
          <label for="gender">Active</label>
          <input class="radio2" name="status" type="radio" value="Inactive" v-model="status">
          <label for="gender">Inactive</label>
        </div>                     
        <button>Save</button>
        <button @click = "close">X</button>
      </form>
    </div>
    <div class="popup-other" @click = "close"></div>
  </div>
</template>
<script>

import { mapActions } from 'vuex'

  export default {
    name:"popup",
    props:['editInf'],
    
    
    data() {
      return{
        id:this.editInf.id?this.editInf.id: Date.now(),
        name:this.editInf.name?this.editInf.name:"",
        gender:this.editInf.gender?this.editInf.gender:"Male",
        email:this.editInf.email?this.editInf.email:"",
        status:this.editInf.status?this.editInf.status:"Active",
        seen: true,
      }
    },

    methods: {
      newTable(){
        console.log(this.gender);
        const infTable = {
          id:this.id,
          name: this.name,
          gender: this.gender,
          email: this.email,
          status: this.status
        }
        
        this.$emit('add', infTable, this.editInf);
        this.id = "";
        this.name = "";
        this.gender = "";
        this.email = "";
        this.status = "";
        if(this.editInf.id){
          this.UPDATE_PEOPLE_FROM_API(infTable);
          this.GET_PEOPLE_FROM_API();
        } else{
          this.ADD_PEOPLE_FROM_API(infTable);
          this.GET_PEOPLE_FROM_API();
        }

        this.seen = false;
        this.$emit('closePop', this.seen);
      },
      close(){
        this.seen = false;
        this.$emit('closePop', this.seen);
      },
      ...mapActions([
        'GET_PEOPLE_FROM_API',
        'ADD_PEOPLE_FROM_API',
        'UPDATE_PEOPLE_FROM_API',
      ]),
    }
  }
</script>
<style>

  .parent-popup{
    position: fixed;
    overflow: hidden;
    height: 100%;
    width: 100%;
  }
  .popup-other{
    display: inline-block;
    position: absolute;
    height: inherit;
    background: #000;
    opacity: 0.8;
    width: 100%;
    z-index: 1;
  }
  .popup{
    display: inline-block;
    opacity: 1;
    position: fixed;
    height: inherit;
    padding: 30px;
    background: gray;
    z-index: 2;
  }
  .popup label{
    display: block;
    margin: 0.5rem 1rem;
    font-size: 1.3rem;

  }
  .popup input{
    width: 100%;
    line-height: 2rem;
    padding-left: 0.3rem;
    border-radius: 3rem;
    margin-bottom: 1.5rem;
  }
  .popup .rad{
    margin-bottom: 5px;
    border: 1px solid white;
  }
  .popup .radio, .radio2{
    position: absolute;
    transform: translateY(7px);
  }
  .radio2{
    transform: translateY(2px);
  }
  .popup button{
    display: inline-block;
    width: 50%;
    font-size: 1.3rem;
    border-radius: 3rem;
    margin: 3rem 0;

  }

</style>