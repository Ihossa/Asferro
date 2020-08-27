<template>
  <div class="mainTitle">
    <div id = "header" class="head">
      <div class="email">Asferro</div>
    </div>

    <Popup 
    v-if = 'visPop'
    :editInf = "editInf"
    @closePop = "closePop"
     />

    <div class="container"><NewTable
    v-for="newtable in this.PEOPLE" 
    :key="newtable.id" 
    :table-title = "newtable"
    @edit = "edit" 
    @remove = "remove"
    /></div>

    <button 
    id = "pop" 
    @click="popNew"
    >+</button>
  </div>
  
</template>
<script>

  import NewTable from '@/components/NewTable'
  import Popup from '@/components/Popup'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name:"mainTitle",
    components: {
      Popup,
      NewTable
    },
    data() {
      return{
        mail: localStorage.getItem('mail'),
        visPop:false,
        editInf: {},
        pop: false
      }
    },
    computed: {
      ...mapGetters([
        "PEOPLE"
      ]),
    },
    methods: {
      popNew(){
        this.editInf = {};
        this.visPop = true;
      },
      edit(table){
        //this.GET_ONE_PEOPLE_FROM_API(table.id);
        console.log(table);
        this.editInf = table;
        this.visPop = true;
      },
      remove(id){
       this.DELETE_PEOPLE_FROM_API(id);
      },
      closePop(seen){
        this.visPop = seen;
      },
      ...mapActions([
        'GET_PEOPLE_FROM_API',
        'DELETE_PEOPLE_FROM_API',
        'GET_ONE_PEOPLE_FROM_API',
      ]),
    },
    mounted(){
      this.GET_PEOPLE_FROM_API();
    }
    
  }
</script>
<style>
  body{
    margin: 0;
    padding: 0;
  }
  #heder{
    position: fixed;
    overflow: hidden;
  }
  .head{
    display: flex;
    align-items:center;
    background:lightgray;
    justify-content: space-around;
  }
  .head .email{
    margin: 1rem;
    font-size: 1rem;
    font-style: italic;
  }
  .head button{
    padding: 0.4rem;
    height: 70%;
    border-radius: 5rem;
  }
  #pop{
    font-size: 3rem;
    width: 4rem;
    border-radius: 10rem;
    outline: 0;
    position: absolute; 
    bottom: 2rem;
    right: 2rem;

  }

  #pop:hover{
    background: gray;
  }
  .container{
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  
  }

</style>