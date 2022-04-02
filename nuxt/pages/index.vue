<template>
  <div class="container">
      <div class="input">
        <input
          type="date"
          name=""
          id="date-input"
          v-model="futureDate"
          v-bind="futureDate"
          @change="onDateChange"
        />
      </div>
      <div class="title" id="title">
        {{ title }}
      </div>
      <div class="digits" id="digits">
        <!-- Days -->
        <div class="inner">
          <div class="value" id="days">
            {{ date.days }}
          </div>
          <div class="units">
            days
          </div>
        </div>
        <!-- Hours -->
        <div class="inner">
          <div class="value" id="hours">
            {{ date.hours }}
          </div>
          <div class="units">
            hours
          </div>
        </div>
        <!-- Minutes -->
        <div class="inner">
          <div class="value" id="minutes">
            {{ date.minutes }}
          </div>
          <div class="units">
            minutes
          </div>
        </div>
        <!-- Sec -->
        <div class="inner">
          <div class="value" id="seconds">
            {{ date.seconds }}
          </div>
          <div class="units">
            seconds
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import Vue from "vue";
import { mapMutations } from "vuex";
export default {
  watch: {
    futureDate: (newVal, oldValue) => {
      console.log("ok");
    }
  },
  data() {
    return {
      futureDate: this.$store.state.futureDate || "1 Jan 2051",
      date: {
        days: "0",
        hours: "0",
        minutes: "0",
        seconds: "0"
      }
    };
  },

  methods: {
    onDateChange: function() {
      //  this.$store.commit('changeDate', this.futureDate)
      const futureDate = new Date(this.futureDate).getTime();
      const nowDate = new Date().getTime();
      const totalSeconds = (futureDate - nowDate) / 1000;
      this.date.days = Math.round(totalSeconds / 3600 / 24);
      this.date.hours = Math.floor(totalSeconds / 3600) % 24;
      this.date.minutes = Math.floor(totalSeconds / 60) % 60;
      this.date.seconds = Math.floor(totalSeconds) % 60;
    }
  },
  mounted() {
    console.log(this.futureDate);
    setInterval(()=>{this.onDateChange()}, 1000)
  },
  computed:{
    title(){
      if (new Date(this.futureDate) > new Date()) {
        return "Remaining time before " + this.futureDate;
      } else {
        return "Passed time since " + this.futureDate;
      }
    }
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Poppins&display=swap");
body {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  font-family: "Poppins", sans-serif;
  background-image: url("~/static/aron-visuals-BXOXnQ26B7o-unsplash.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  color: white;
  margin: 0;
}

html {
  height: 100%;
}

.container {
  text-align: center;
  width: 100%;
}
.digits {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
}

.title {
  font-size: 3rem;
}
.inner {
  margin: 0 2rem;
}
.value {
  font-size: 5em;
  font-weight: bold;
}
.rotate {
  animation: rotate 1s infinite;
}
.input {
  position: absolute;
  top: 20px;
  left: 0;
  display: flex;
  justify-content: center;
  width: 100%;
}
input {
  outline: none;
  font-family: "Poppins";
  padding: 5px;
  border-radius: 4px;
}

@keyframes rotate {
  0% {
    transform: rotateX(0deg);
  }
  50% {
    transform: rotateX(90deg);
  }
  100% {
    transform: rotateX(0deg);
  }
}
</style>
