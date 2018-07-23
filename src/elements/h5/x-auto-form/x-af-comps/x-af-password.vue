<template>
  <div>
    <x-input v-model="$parent.model[item.field]" type="password" :title="item.name" :placeholder="item.placeHolder" :maxlength="item.maxlength" />
  </div>
</template>

<script>
  export default {
    props: {
      item: Object
    }
  }
</script>
