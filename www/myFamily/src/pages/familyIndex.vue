<template>
  <div>
    <Head></Head>
    <ClassList v-if="pageType == 'list'"
      @changePage="changePageType"></ClassList>
    <ImgList
      v-else-if="pageType == 'detail'"
      :typeName="typeName"></ImgList>
  </div>
</template>

<script>
import head from '../components/head'
import imgList from '../components/img_list'
import classList from '../components/class_list'
export default {
  name: 'familyIndex',
  data () {
    return {
      pageType: 'list',
      typeName: ''
    }
  },
  methods: {
    changePageType (param) {
      this.pageType = param.page
      this.typeName = param.typeName || ''
    }
  },
  components: {
    Head: head,
    ImgList: imgList,
    ClassList: classList
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
