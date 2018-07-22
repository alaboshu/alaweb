<template>
  <div>
    <x-input v-model="$parent.model[item.field]" :title="item.name" :placeholder="item.placeHolder" :maxlength="item.maxlength" :minlength="item.minlength" />
  </div>
</template>

<script>
  export default {
    props: {
      item: Object
    }
  }
</script>
