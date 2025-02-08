<template>
  <div id="app">
    <div>
      <van-dropdown-menu style="width: 300px">
        <van-dropdown-item v-model="curhero" :options="herolist" @open="getallhero" @change="changehero"/>
        <van-dropdown-item v-model="value2" :options="option2" @change="changehero"/>
      </van-dropdown-menu>
    </div>
    <div style="margin-top: 20px">
      <van-card v-for="(item,i) in heromsg" :key="i"
                currency=""
                :price="item.updatetime"
                :title="item.alias"
                :thumb="item.photo"
                :tag="power.guobiao"
      />
    </div>
    <div>
      <van-cell :value="power.provincePower" style="width: 300px;border-bottom: 1px outset #ffffff">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title" style="font-size: 16px">{{power.province}}</span>
          <van-tag style="color: white;font-size: 1px;border: 1px outset red;background-color: red;border-radius: 3px">省级</van-tag>
        </template>
      </van-cell>
    </div>
    <div>
      <van-cell :value="power.cityPower" style="width: 300px;border-bottom: 1px outset #ffffff">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title" style="font-size: 16px">{{power.city}}</span>
          <van-tag style="color: white;font-size: 1px;border: 1px outset red;background-color: red;border-radius: 3px">市级</van-tag>
        </template>
      </van-cell>
    </div>
    <div>
      <van-cell :value="power.areaPower" style="width: 300px;border-bottom: 1px outset #ffffff">
        <!-- 使用 title 插槽来自定义标题 -->
        <template slot="title">
          <span class="custom-title" style="font-size: 16px">{{power.area}}</span>
          <van-tag style="color: white;font-size: 1px;border: 1px outset red;background-color: red;border-radius: 3px">区级</van-tag>
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
import axios from "axios";


export default {
  name: 'App',
  components: {
    HelloWorld
  },
  data(){
    return{
      heroname:'诸葛亮',
      heromsg:[],
      curhero:'',
      value2: "aqq",
      herolist: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      option2: [
        { text: '安卓QQ区', value: 'aqq' },
        { text: '安卓微信区', value: 'awx' },
        { text: '苹果QQ区', value: 'iqq' },
        { text: '苹果微信区', value: 'iwx' },
      ],
      power:{}
    }
  },
  mounted() {
    window['setheroname'] = val => {
      this.setheroname(val)
    }
  },
  created() {
  },
  methods:{
    changehero()
    {
      axios.post("https://hhsc.kangnasi.xyz:9630/hero?name="+this.curhero).then((data)=>{
        // console.log(data.data.data)
        data.data.data.updatetime="截止时间："+data.data.data.updatetime
        this.heromsg=[data.data.data]
      })
      axios.post("https://hhsc.kangnasi.xyz:9630/hero/power?name="+this.curhero+"&type="+this.value2).then((data)=>{
        // console.log(data.data.data)
        data.data.data.guobiao="国标 "+data.data.data.guobiao
        this.power=data.data.data
      })
    },
    setheroname(val)
    {
      this.heroname=val
      this.herolist=[{"text":val,"value":val}]
      this.curhero=val
      axios.post("https://hhsc.kangnasi.xyz:9630/hero?name="+val).then((data)=>{
        // console.log(data.data.data)
        data.data.data.updatetime="截止时间："+data.data.data.updatetime
        data.data.data.guobiao="国标 "+data.data.data.guobiao
        this.heromsg=[data.data.data]
        this.power=data.data.data
      })
    },
    getallhero()
    {
      axios.get("https://www.somekey.cn/mini/hero/getHeroList.php").then((data)=>{
        // console.log(data.data.data)
        var zan=[]
        for(var i in data.data.data)
        {
          zan[i]={"text":data.data.data[i].cname,"value":data.data.data[i].cname}
        }
        // console.log(zan)
        this.herolist=zan
      })
    }
  },
}
</script>

<style lang="less">
#app {
  display: flex;
  flex-direction: column;
  align-items: center;
}
body{
  background-color: white;
}
</style>
