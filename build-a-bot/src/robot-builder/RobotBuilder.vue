<template>
<!-- eslint-disable -->
  <div class="content">
    <button class="add-to-cart" @click="addToCart()">Add to cart</button>
    <div class="top-row">
      <div :class="[saleBorderClass, 'top', 'part']">
        <div class="robot-name">
          {{selectedRobot.head.title}}
          <span v-if="selectedRobot.head.onSale" class="sale">Sale!</span>
        </div>
        <img :src="selectedRobot.head.src" alt="" title="head"/>
        <button @click="updateSelectedHeadIndex('previous')" class="prev-selector">&#9668;</button>
        <button @click="updateSelectedHeadIndex('next')" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div class="middle-row">
      <div class="left part">
        <img :src="selectedRobot.leftArm.src" alt="" title="left arm"/>
        <button @click="updateSelectedLeftArmIndex('previous')" class="prev-selector">&#9650;</button>
        <button @click="updateSelectedLeftArmIndex('next')" class="next-selector">&#9660;</button>
      </div>
      <div class="center part">
        <img :src="selectedRobot.torso.src" alt="" title="torso"/>
        <button @click="updateSelectedTorsoIndex('previous')" class="prev-selector">&#9668;</button>
        <button @click="updateSelectedTorsoIndex('next')" class="next-selector">&#9658;</button>
      </div>
      <div class="right part">
        <img :src="selectedRobot.rightArm.src" alt="" title="right arm"/>
        <button @click="updateSelectedRightArmIndex('previous')" class="prev-selector">&#9650;</button>
        <button @click="updateSelectedRightArmIndex('next')" class="next-selector">&#9660;</button>
      </div>
    </div>
    <div class="bottom-row">
      <div class="bottom part">
        <img :src="selectedRobot.base.src" alt="" title="base"/>
        <button @click="updateSelectedBaseIndex('previous')" class="prev-selector">&#9668;</button>
        <button @click="updateSelectedBaseIndex('next')" class="next-selector">&#9658;</button>
      </div>
    </div>
    <div>
      <h1>Cart</h1>
      <table>
        <caption></caption>
        <thead>
          <tr>
            <th scope="">Robot</th>
            <th class="cost" scope="">Cost</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(robot, index) in cart" :key="index">
            <td>{{robot.head.title}}</td>
            <td class="cost">{{robot.cost}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import availableParts from '../data/parts';

function getPreviousIndex(index, length) {
  const newIndex = index - 1;
  return newIndex < 0 ? length - 1 : newIndex;
}

function getNextIndex(index, length) {
  const newIndex = index + 1;
  return newIndex >= length ? 0 : newIndex;
}

export default {
  name: 'RobotBuilder',
  data() {
    return {
      availableParts,
      cart: [],
      selectedHeadIndex: 0,
      selectedLeftArmIndex: 0,
      selectedTorsoIndex: 0,
      selectedRightArmIndex: 0,
      selectedBaseIndex: 0,
    };
  },
  computed: {
    saleBorderClass() {
      return this.selectedRobot.head.onSale ? 'sale-border' : '';
    },
    selectedRobot() {
      return {
        head: availableParts.heads[this.selectedHeadIndex],
        leftArm: availableParts.arms[this.selectedLeftArmIndex],
        torso: availableParts.torsos[this.selectedTorsoIndex],
        rightArm: availableParts.arms[this.selectedRightArmIndex],
        base: availableParts.bases[this.selectedBaseIndex],
      };
    },
  },
  methods: {
    addToCart() {
      const robot = this.selectedRobot;
      const cost = robot.head.cost + robot.leftArm.cost + robot.torso.cost
      + robot.rightArm.cost + robot.base.cost;
      this.cart.push({ ...robot, cost });
    },
    updateSelectedHeadIndex(action) {
      this.selectedHeadIndex = action === 'next'
        ? getNextIndex(this.selectedHeadIndex, this.availableParts.heads.length)
        : getPreviousIndex(this.selectedHeadIndex, this.availableParts.heads.length);
    },
    updateSelectedLeftArmIndex(action) {
      this.selectedLeftArmIndex = action === 'next'
        ? getNextIndex(this.selectedLeftArmIndex, this.availableParts.arms.length)
        : getPreviousIndex(this.selectedLeftArmIndex, this.availableParts.arms.length);
    },
    updateSelectedTorsoIndex(action) {
      this.selectedTorsoIndex = action === 'next'
        ? getNextIndex(this.selectedTorsoIndex, this.availableParts.torsos.length)
        : getPreviousIndex(this.selectedTorsoIndex, this.availableParts.torsos.length);
    },
    updateSelectedRightArmIndex(action) {
      this.selectedRightArmIndex = action === 'next'
        ? getNextIndex(this.selectedRightArmIndex, this.availableParts.arms.length)
        : getPreviousIndex(this.selectedRightArmIndex, this.availableParts.arms.length);
    },
    updateSelectedBaseIndex(action) {
      this.selectedBaseIndex = action === 'next'
        ? getNextIndex(this.selectedBaseIndex, this.availableParts.bases.length)
        : getPreviousIndex(this.selectedBaseIndex, this.availableParts.bases.length);
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
  }
}
.top-row {
  display:flex;
  justify-content: space-around;
}
.middle-row {
  display:flex;
  justify-content: center;
}
.bottom-row {
  display:flex;
  justify-content: space-around;
  border-top: none;
}
.head {
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
  & .prev-selector {
    top: -28px;
    left: 24px;
    width: 144px;
    height: 25px;
  }
  & .next-selector {
    top: auto;
    bottom: -28px;
    left: 24px;
    right: -3px;
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
.center .prev-selector, .center .next-selector {
  opacity:0.8;
}
.robot-name {
  position: absolute;
  top: -25px;
  text-align: center;
  width: 100%;
}
.sale {
  color: red;
}
.content {
  position: relative;
}
.add-to-cart {
  position: absolute;
  right: 30px;
  font-size: 16px;
  width: 220px;
  padding: 3px;
}
td, th {
  text-align: left;
  padding: 5px;
  padding-right: 20px;
}
.cost {
  text-align: right;
}
.sale-border{
  border: 3px solid red;
}
</style>
