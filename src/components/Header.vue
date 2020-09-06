<template>
    <div id="header">
        <div class="header-wrapper">
          <p>SCRUM</p>
            <router-link to="/create-room"><img class="logo" src="../assets/logo.png"></router-link>
          <p>POKER</p>
        </div>
    </div>
</template>

<style lang="scss">
$primary-color: #eaeaea;

#header {
  background-color: $primary-color;
  height: 100px;
  position: relative;

  .header-wrapper {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: fit-content;
    display: flex;
    align-items: center;

    p {
      font-size: 18px;
      margin-bottom: 0;
      &:first-child {
        float: left;
      }
      &:last-child {
        float: right;
        margin-left: 5px;
      }
    }
  }

  img.logo {
    width: 70px;
  }
}
</style>
