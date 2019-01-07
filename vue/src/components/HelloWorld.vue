<template>
  <div class="hello">
    <h1>{{ msg }}</h1>

    <el-checkbox 
      :indeterminate="isIndeterminate" 
      v-model="checkAll" 
      @change="onCheckAllChange">全选</el-checkbox>

    <div style="margin: 15px 0;"></div>

    <el-checkbox-group 
      v-model="checkedCities" 
      @change="onCheckedCitiesChange">
      <el-checkbox v-for="city in cities" 
        :label="city" 
        :key="city">{{city}}</el-checkbox>
    </el-checkbox-group>
    
  </div>
</template>

<script>
const cityOptions = ['上海', '北京', '广州', '深圳'];
export default {
  name: "HelloWorld",
  props: {
    msg: String
  },
  data() {
    return {
      checkAll: false,
      checkedCities: ['上海', '北京'],
      cities: cityOptions,
      isIndeterminate: true
    };
  },
  methods: {
    onCheckAllChange(val) {
      this.checkedCities = val ? cityOptions : [];
      this.isIndeterminate = false;
    },
    onCheckedCitiesChange(value) {
      let checkedCount = value.length;
      this.checkAll = checkedCount === this.cities.length;
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.cities.length;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
