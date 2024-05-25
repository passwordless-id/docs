<script>
export default {
  props: ['name', 'tag', 'type', 'description']
}
</script>

<template>
    <td class="prop-name">{{'"' + name + '":'}}</td>
    <td class="prop-type">{{type}}</td>
    <td><span :class="'prop-tag-' + tag">{{tag}}</span></td>
    <td>{{description}}</td>
</template>