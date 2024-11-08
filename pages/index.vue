<template>
  <div class="default-theme">
    <!-- {{ $store.state.site_basic_config_data }} -->
    <component :is="defaultTheme"></component>
  </div>
</template>

<script>
  export default {
    name: 'DefaultTheme',
    scrollToTop: true,
    async asyncData({ $cookiz, $axios, store, route, params, redirect }){
      // console.log('Fetch SSR')
      let getOauthToken = $cookiz.get(store.state.outh_token_name)
      // console.log(store.state.outh_token_name,getOauthToken)
      // console.log(new Date(getOauthToken.expires_in * 1000))
      if(getOauthToken && getOauthToken.token_type) await store.dispatch('oauth_token/GET_OAUTH_TOKEN', getOauthToken)

      // console.log(store.state.oauth_token.cached)
      if(store.state.oauth_token.cached){
        // console.log('Basic configuration info data request', getTokenType)
        let headerObj = {
            headers: {
                'Authorization': getOauthToken.token_type + ' ' + getOauthToken.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getOauthToken.access_token
            }
        }

        // console.log('header object', headerObj)
        try {
            // let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            const { data } = await $axios.$get('/api/site-init-info', headerObj)
            // eslint-disable-next-line no-console
            // console.log('Get data', data)

            store.commit('BASIC_CONFIG_DATA', data.basic_config_info)
            store.commit('LOGO_INFO_DATA', data.logo_info)
            store.commit('category_info/GET_DATA', data.category_info && data.category_info.display_on_nav?data.category_info.display_on_nav:[])
            store.commit('category_info/GET_BODY_DATA', data.category_info && data.category_info.display_on_body?data.category_info.display_on_body:[])
            store.commit('promotional_banner_info/GET_DATA', data.promotional_banner_info)

            const [getSelProducts,getProductTypes,getHotProducts,getRecommendedProducts] = await Promise.all([

              // console.log('Fetch SELECTED PRODUCT INFO')
              store.dispatch('product/GET_SELECTED_PRODUCTS', {access_token: store.state.oauth_token.token,limit: 15}),
              // console.log(store.state.product.selected_data)

              // console.log('Fetch PRODUCT TYPE INFO')
              store.dispatch('product_type/GET_DATA', {access_token: store.state.oauth_token.token}),

              // console.log('Fetch HOT PRODUCT INFO')
              store.dispatch('product/GET_HOT_PRODUCTS', {access_token: store.state.oauth_token.token,limit: 15}),
              // console.log(store.state.product.hot_data)

              // console.log('Fetch RECOMENDED PRODUCT INFO')
              store.dispatch('product/GET_RECOMENDED_PRODUCTS', {access_token: store.state.oauth_token.token,limit: 15})
              // console.log(store.state.product.recommended_data)

            ]);
        } catch (err) {
            // eslint-disable-next-line no-console
            // console.log('Got Error', err.message)            
            if(err.message.indexOf('code 401')>=0){
                $cookiz.remove(store.state.outh_token_name)
                redirect(`${process.env.BASE_URL}`)
            }

            console.log('Error', err)
            return false
        }

        // console.log('Basic Config Data', store.state.site_basic_config_data)
        // if(Object.keys(store.state.site_basic_config_data).length==0) {
        //   $cookiz.remove(store.state.outh_token_name)
        //   redirect(`${process.env.BASE_URL}`)
        // }
      }else{
        console.log('Fetch OAUTh TOKEN')
        try{
          await store.dispatch('oauth_token/GET_TOKEN_INFO')

          let oauth_token = store.state.oauth_token.data
          $cookiz.set(store.state.outh_token_name, JSON.stringify(oauth_token))
          store.commit('oauth_token/CACHE_STATUS', true)
          redirect(`${process.env.BASE_URL}`)
        } catch (e) {
          return error({ message: e.message, statuscode: e.response.status })
        }
      }

      // console.log('Fetch LOGO INFO')
      // await store.dispatch('GET_LOGO_INFO', store.state.oauth_token.data)

      // console.log('Fetch Categories Info')
      // await store.dispatch('category_info/GET_DATA', {access_token: store.state.oauth_token.token,type: 'display_on_nav'})

      // console.log('Fetch STATIC PAGE INFO')
      // await store.dispatch('static_page_info/GET_DATA', {access_token: store.state.oauth_token.token,limit: 20})

      // console.log(params)
      if(route.name=='index-'+ store.state.product_dtl_path +'-slug' && params.slug){
        console.log('Fetch DETAILS PAGE')
        await Promise.all([
          store.dispatch('product/GET_PRODUCT_INFO', {access_token: store.state.oauth_token.token, slug: params.slug})
        ])
      }else{
        // console.log('Fetch PROMOTIONAL BANNER INFO')
        // await store.dispatch('promotional_banner_info/GET_DATA', {access_token: store.state.oauth_token.token,limit: 8})

        // console.log('Fetch Categories Display on Body Info')
        // await store.dispatch('category_info/GET_DATA', {access_token: store.state.oauth_token.token,type: 'display_on_body'})
        // console.log('Display on body', store.state.category_info.get_body_data)

        // console.log('Fetch PRODUCT TYPE INFO')
        // await store.dispatch('product_type/GET_DATA', {access_token: store.state.oauth_token.token})

        // console.log('Fetch HOT PRODUCT INFO')
        // await store.dispatch('product/GET_HOT_PRODUCTS', {access_token: store.state.oauth_token.token,limit: 15})

        // console.log('Fetch RECOMENDED PRODUCT INFO')
        // await store.dispatch('product/GET_RECOMENDED_PRODUCTS', {access_token: store.state.oauth_token.token,limit: 15})

        // console.log('Fetch ALL PRODUCT INFO')
        // await store.dispatch('product/GET_ALL_PRODUCTS', {access_token: store.state.oauth_token.token,limit: 18})
      }
    },
    // middleware({ store, redirect }) {
    //   if(Object.keys(store.state.site_basic_config_data).length==0) {
    //     console.log('Middle')
    //     return redirect('/')
    //   }
    // },
    watch: {
      $route(to, from) {
        // console.log('Route',to)
        if(to.path=='/') this.$store.commit('product/GET_PRODUCT_DTL_INFO','');
      }
    },
    computed: {
      defaultTheme: function() {
        return () => import(`@/${this.$store.state.themeDirName}/${process.env.DEFAULT_THEME}`);
      }
    }
  }
</script>
