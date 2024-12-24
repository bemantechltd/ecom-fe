<template>
  <div class="logo">
    <!-- <img src="~/images/main-site-logo.png" title="logo" /> -->
    <template v-if="type=='white'">
      <nuxt-img
        v-if="$store.state.logo_info_data.dark_logo"
        format="webp"
        title="Logo"
        alt="Logo"
        src="https://bemantech.com/wp-content/uploads/2024/04/full-logo.png"        
      />
      <nuxt-img
        v-else        
        format="webp"
        alt="Logo"
        src="https://bemantech.com/wp-content/uploads/2024/04/full-logo.png"      
      />
    </template>
    <template v-else>
      <nuxt-img
        v-if="$store.state.logo_info_data.logo"
        format="webp"
        alt="Logo"
        src="https://bemantech.com/wp-content/uploads/2024/04/full-logo.png"
      />
      <nuxt-img
        v-else
        format="webp"
        alt="Logo"
        src="https://bemantech.com/wp-content/uploads/2024/04/full-logo.png"      
      />
    </template>    
  </div>
</template>
<script>
export default {
  name: 'LogoBlock',
  props: ['type'],
  data() {
    return {
      jest: 'Logo'
    }
  }
}
</script>
<style scoped>
  .logo{
    display: flex;
    width: 100%;
    height: 65px;
    /* padding: 8px 0; */
  }
  .logo > img{
    align-self: center;
    width: 100%; height: 100%;
    object-fit: contain;
  }
  .logo > .logo_title{
    align-self: center;
  }
</style>
