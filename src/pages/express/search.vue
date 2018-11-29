<template>
    <div class="search-container">
        <div class="input-context">
          <input type="text" v-model="expressNum" placeholder="请输入单号或者扫码">
          <button @click="handleScan">扫码</button>
          <button @click="handleSearch(expressNum)">查询</button>
        </div>
        <div class="list-content">
            <template v-if="express.list.length">
                <p>{{this.express.com}}</p>
                <div class="list-item" :key="index" v-for="(item,index) in express.list">
                  {{item.time + ' - ' + item.desc}}
                </div>
            </template>
            <template v-else>
               <p>稍等一会，再查询此【{{this.expressNum}}】单号</p>
            </template>
        </div>
    </div>
</template>

<script>
  import { expressSearch } from '@/api/express-api'
  export default {
    name: "search",
    data() {
      return {
        expressNum:'',
        express:{
          com:'快递公司',
          list:[]
        }

      };
    },
    components: {},
    methods: {
        handleScan(){
            wx.scanCode({
                onlyFromCamera: true,
                scanType:'barCode',
                success: (data) => {
                   console.log(data.result)
                   this.expressNum = data.result;
                   this.handleSearch(data.result)
                }
            })
        },
        handleSearch(expressNum){
            // if(!expressNum) return false;
          console.log(expressNum);
            let _data ={
                expressNum
            };
            expressSearch(_data).then(data => {
                console.log(data);
                this.express.com = data.data.com;
                this.express.list  = data.data.context;
            }).catch(err => {
              this.express.list = [];
            })
        }
    },
    computed: {},
    created() {
    }
  };
</script>

<style lang="scss"></style>
