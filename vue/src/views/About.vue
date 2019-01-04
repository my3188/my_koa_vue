<template>
  <div class="about">
    <el-button type="success" plain>成功按钮</el-button>
    <h1>This is an about page</h1>
    <el-button type="success" plain @click='onclickget'>点击我(get)</el-button>
    <p>{{getResponse}}</p>

    <el-button type="success" plain @click='onclickpost'>点击我(post)</el-button>
    <p>{{postResponse}}</p>

    <el-button type="success" plain @click='onclickput'>点击我(put)</el-button>
    <p>{{putResponse}}</p>

    <el-button type="success" plain @click='onclickdelete'>点击我(delete)</el-button>
    <p>{{deleteResponse}}</p>
  </div>
</template>

<script>

import fetch from "../fetch";
// import fetch from "axios";

export default {
  name: "demo",
  data() {
    return {
      getResponse:{},
      postResponse:{},
      putResponse:{},
      deleteResponse:{},
    };
  },
  watch: {},
  computed: {
    
  },
  created() {},
  mounted() {
  },
  methods: {
    onclickget(){
      let self = this;
      fetch.get('/testget', {
        ID: 12345,
        name:'马越',
      })
      .then(function (response) {
        self.getResponse = response
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

     
    },
    onclickpost(){
      let self = this;
      fetch.post('/testpost', {
        type: 'post'
      },{showLoading:true})
      .then(response=>{
        self.postResponse = response
        console.log(response);
      })
      .catch(error=>{
        console.log(error);
      });
      setTimeout(()=>{
        fetch.post('/testpost2', {
          ID: 12345,
          name:'马越',
        })
      },1000)
    },    
    onclickput(){
      let self = this;
      fetch.put('/testput', {
        type: 'put'
      })
      .then(response=>{
        self.putResponse = response
        console.log(response);
      })
      .catch(error=>{
        console.log(error);
      });
    },    
    onclickdelete(){
      let self = this;
    	fetch.delete('/testdelete', {
        type: 'delete',
        type1: 'delete1',
        type2:{name:33}
      })
		  .then(response=>{
        self.deleteResponse = response
		    console.log(response);
		  })
		  .catch(error=>{
		    console.log(error);
		  });
    },

  }
};
</script>
<style scoped>

</style>
<style>

</style>
