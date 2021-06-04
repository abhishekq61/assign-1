<template>
  <div class="row">
    <div class="col">
      <h4 class="title">
        {{title}}
      </h4>
    </div>
  </div>
</template>

<script lang="ts">
   import {Component,Vue} from "nuxt-property-decorator";

  @Component({
    components: {}
  })
  export default class Index extends Vue {
    title = "Hi,there...";
    constructor(){
      super();
    }
    getData(app:string){

    }
  }

</script>

<style scoped>
</style>
