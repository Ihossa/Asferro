import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)
const config = {
  headers: {'Authorization': "Bearer af0094e8061ba43b23da12a0d0be48b70f3a2a60700fd1219a90bf970b70c7f5"}
};
export default new Vuex.Store({
  state: {
    people: []
  },
  mutations: {
    SET_PEOPLE_TO_STATE: (state, people) =>{
      state.people = people;
    }
  },
  actions: {

    GET_PEOPLE_FROM_API({commit}){
      return axios.get("https://gorest.co.in/public-api/users")
      .then((people) => {
        const pages = people.data.meta.pagination.pages;
        return axios.get(`https://gorest.co.in/public-api/users?page=${pages}`)
        .then((people) => {
          commit("SET_PEOPLE_TO_STATE", people.data.data)
        })
      })
      .catch((error) =>{
        console.log("error")
      })
    },
    DELETE_PEOPLE_FROM_API({commit}, id){
      console.log(id);
      return axios.delete( 
        `https://gorest.co.in/public-api/users/${id}`,
          config
      ).then((people) => {
        commit("SET_PEOPLE_TO_STATE", people)
        location.reload();
        return people;
      }).catch((error) => {
        console.log(error)
      });
    },
    ADD_PEOPLE_FROM_API({commit}, obj){
      console.log(obj.name)
      const bodyParameters = {
        "name": obj.name,
        "gender": obj.gender, 
        "email": obj.email, 
        "status": obj.status
     }
     return axios.post( 
       'https://gorest.co.in/public-api/users',
       bodyParameters,
       config
     ).then((people) => {
       console.log(people)
      // location.reload();
     }).catch((error) => {
       console.log(error)
     });
    },
    UPDATE_PEOPLE_FROM_API({commit}, obj){
      console.log(obj)
      const bodyParameters = {
        "name": obj.name,
        "gender": obj.gender, 
        "email": obj.email, 
        "status": obj.status
     }
      return axios.patch( 
        `https://gorest.co.in/public-api/users/${obj.id}`,
        bodyParameters,
        config
      ).then((people) => {
        commit("SET_PEOPLE_TO_STATE")
        location.reload()
        
      }).catch((error) => {
        console.log(error)
      });
    }
  },
  getters: {
    PEOPLE(state) {
      return state.people;
    }
  }
})
