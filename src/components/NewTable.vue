<template>
  <div class="newtable" :id = tableTitle.id>
    <div class="table">
      <div class="head">
        <button class="table-btn" @click = "edit">+</button>
        <button class="table-btn" @click = "remove">-</button>
      </div>
      <div class="context"  >
        <p>{{tableTitle.name}}</p>
        <p>{{tableTitle.gender}}</p>
        <p>{{tableTitle.email}}</p>
        <p>{{tableTitle.status}}</p>
        <p>{{tableTitle.updated_at}}</p>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name:"newtable",
    props:['table-title'],
    methods: {
      
      edit(){
        this.$emit(`edit`, this.tableTitle);
      },
      remove(){
        this.$emit(`remove`, this.tableTitle.id);
      }
    }
  }
</script>
<style>
  .newtable {
    display: inline-block;
    max-width: 400px;
    vertical-align: top;

  }
  .table{
    margin: 3rem 4rem;
  }
  .table .head{
    background: gray;
    display: flex;
    justify-content:flex-end;
    padding-left:5rem; 
  }
  .table-btn{
    width: 2rem;
    margin: 0.2rem;
  }
  .context{
    background: lightgray;
  }

</style>