<template>
  <div :class="['part', position]">
    <img @click="showPartInfo()" :src="selectedPart.src" alt="">
    <button @click="updateSelectedPart('previous')" class="prev-selector"></button>
    <button @click="updateSelectedPart('next')" class="next-selector"></button>
    <span v-pin="{bottom: '5px', right: '5px'}" class="sale" v-show="selectedPart.onSale">
      Sale!
    </span>
  </div>
</template>

<script>
function getPreviousIndex(index, length) {
  const newIndex = index - 1;
  return newIndex < 0 ? length - 1 : newIndex;
}

function getNextIndex(index, length) {
  const newIndex = index + 1;
  return newIndex >= length ? 0 : newIndex;
}

export default {
  props: {
    parts: { type: Array, required: true },
    position: {
      type: String,
      required: true,
      validator: (value) => ['top', 'left', 'bottom', 'right', 'center'].includes(value),
    },
  },
  created() {
    this.emitSelectedPart();
  },
  updated() {
    this.emitSelectedPart();
  },
  data() {
    return {
      selectedPartIndex: 0,
    };
  },
  computed: {
    selectedPart() {
      return this.parts[this.selectedPartIndex];
    },
  },
  methods: {
    emitSelectedPart() {
      this.$emit('partSelected', this.selectedPart);
    },
    updateSelectedPart(action) {
      this.selectedPartIndex = action === 'next'
        ? getNextIndex(this.selectedPartIndex, this.parts.length)
        : getPreviousIndex(this.selectedPartIndex, this.parts.length);
    },
    showPartInfo() {
      this.$router.push({
        name: 'Parts',
        params: {
          id: this.selectedPart.id,
          partType: this.selectedPart.type,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.part {
  position: relative;
  width:165px;
  height:165px;
  border: 3px solid #aaa;
  & img {
    width:165px;
    cursor: pointer;
  }
}
.sale {
  color: white;
  background-color: red;
  padding: 3px;
}
.part-title {
  position: absolute;
  width: 100%;
  text-align: center;
  font-size: 18px;
  color: red;
  padding-top: 5px;
  top: -25px;
}

.top {
  border-bottom: none;
}
.left {
  border-right: none;
  & img {
    transform: rotate(-90deg);
  }
  & .prev-selector {
    top: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
  & .next-selector {
    top: auto;
    bottom: -28px;
    left: -3px;
    width: 144px;
    height: 25px;
  }
}
.right {
  border-left: none;
  & img {
    transform: rotate(90deg);
  }
  & .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
  & .prev-selector {
    top: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
}
.bottom {
  border-top: none;
}
.prev-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  left: -28px;
  width: 25px;
  height: 171px;
}
.next-selector {
  position: absolute;
  z-index:1;
  top: -3px;
  right: -28px;
  width: 25px;
  height: 171px;
}
.left, .right {
  & .prev-selector:after {
    content: '\25B2';
  }
  & .next-selector:after {
    content: '\25BC';
  }
}
.top, .bottom, .center {
  & .prev-selector:after {
    content: '\25C4';
  }
  & .next-selector:after {
    content: '\25BA';
  }
}
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.highlight {
  border: 1px solid red;
}
</style>
