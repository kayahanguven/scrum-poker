<template>
    <div class="story-card">
        <div class="story-card-inner">{{ point }}</div>
    </div>
</template>

<script>
export default {
  props: {
    point: {
      type: [Number, String],
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.story-card {
    width: 90px;
    height: 130px;
    font-size: 25px;
    position: relative;
    border: 1px solid gray;
    border-radius: 4px;
    float: left;
    margin: 5px;
    cursor: pointer;

    &:hover {
        box-shadow: 0px 0px 3px 3px rgba(112,188,255,1);
    }

    &.selected {
        background-color: rgba(112,188,255,1);
        color: white;
    }

    .story-card-inner {
        position: absolute;
        left: 0;
        right: 0;
        top: 0;
        bottom: 0;
        margin: auto;
        width: fit-content;
        height: fit-content;
    }
}
</style>
