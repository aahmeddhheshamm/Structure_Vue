<script setup></script>

<template>
  <span class="loader"></span>
</template>

<style scoped>
.loader {
  height: 30px;
  width: 30px;
}

html[dir='ltr'] .loader {
  animation: rotate 1.5s infinite;
}

html[dir='rtl'] .loader {
  animation: rotateRtl 1.5s infinite;
}

.loader:before,
.loader:after {
  border-radius: 50%;
  content: "";
  display: block;
  height: 12px;
  width: 12px;
}

.loader:before {
  background-color: #fff;
  margin-bottom: 6px;
}

html[dir='ltr'] .loader:before {
  animation: ball1 1.5s infinite;
  box-shadow: 18px 0 0 #ffcdc4;
}

html[dir='rtl'] .loader:before {
  animation: ball1Rtl 1.5s infinite;
  box-shadow: -18px 0 0 #ffcdc4;
}

.loader:after {
  background-color: #ffcdc4;
}

html[dir='ltr'] .loader:after {
  animation: ball2 1.5s infinite;
  box-shadow: 18px 0 0 #fff;
}

html[dir='rtl'] .loader:after {
  animation: ball2Rtl 1.5s infinite;
  box-shadow: -18px 0 0 #fff;
}

@keyframes rotate {
  0% {
    transform: rotate(0deg) scale(0.8);
  }
  50% {
    transform: rotate(360deg) scale(1.2);
  }
  100% {
    transform: rotate(720deg) scale(0.8);
  }
}

@keyframes ball1 {
  0% {
    box-shadow: 18px 0 0 #ffcdc4;
  }
  50% {
    box-shadow: 0 0 0 #ffcdc4;
    margin-bottom: 0;
    transform: translate(9px, 9px);
  }
  100% {
    box-shadow: 18px 0 0 #ffcdc4;
    margin-bottom: 6px;
  }
}

@keyframes ball2 {
  0% {
    box-shadow: 18px 0 0 #fff;
  }
  50% {
    box-shadow: 0 0 0 #fff;
    margin-top: -12px;
    transform: translate(9px, 9px);
  }
  100% {
    box-shadow: 18px 0 0 #fff;
    margin-top: 0;
  }
}


@keyframes rotateRtl {
  0% {
    transform: rotate(0deg) scale(0.8);
  }
  50% {
    transform: rotate(-360deg) scale(1.2);
  }
  100% {
    transform: rotate(-720deg) scale(0.8);
  }
}

@keyframes ball1Rtl {
  0% {
    box-shadow: -18px 0 0 #ffcdc4;
  }
  50% {
    box-shadow: 0 0 0 #ffcdc4;
    margin-bottom: 0;
    transform: translate(-9px, 9px);
  }
  100% {
    box-shadow: -18px 0 0 #ffcdc4;
    margin-bottom: 6px;
  }
}

@keyframes ball2Rtl {
  0% {
    box-shadow: -18px 0 0 #fff;
  }
  50% {
    box-shadow: 0 0 0 #fff;
    margin-top: -12px;
    transform: translate(-9px, 9px);
  }
  100% {
    box-shadow: -18px 0 0 #fff;
    margin-top: 0;
  }
}

</style>
