<template>
 <div class="wrapper" ref="wrapper">
   <div class="content">
     <slot></slot>
   </div>
 </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
  name: "Scroll",
  props:{
    probeType:{
      type:Number,
      default(){
        return 0
      }
    },
    pullUpLoad:{
      type:Boolean,
      default() {
        return false;
      }
    }
  },
  data(){
    return {
      scroll:null
    }
  },
  mounted() {
     this.scroll=new BScroll(this.$refs.wrapper,{
       click:true,
       probeType:this.probeType,
       pullUpLoad:this.pullUpLoad,
     })
    this.scroll.on("scroll",position=>{
         this.$emit("scroll",position)
    })
    this.scroll.on("pullingUp",()=>{
      this.$emit("pullingUp")
    })
  },
  methods:{
    refresh(){
      this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    scrollTo(x,y,time){
      this.scroll.scrollTo(x,y,time)
    },
    getCurrentY(){
      return this.scroll.y
    }
  }
}
</script>

<style scoped>

</style>