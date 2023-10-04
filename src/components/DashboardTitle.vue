<template>
  <div class="project-title">
    <h1>Dashboard</h1>
  </div>
</template>

<style lang="scss" scoped>
@import '../style.scss';
.project-title {
  display: flex;
  align-items: center;
  justify-content: center;

  h1 {
    color: $green;
    font-size: 4rem;
    padding-top: 4rem;
    text-shadow: 4px 4px 2px rgba(0,0,0,0.6);
  }
}
</style>