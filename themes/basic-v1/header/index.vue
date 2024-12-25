<template>
    <div :class="['header_block',{overlay_block:$store.state.blackOverlayHeader},{mobile_device:$device.isMobile}]">
        <template v-if="logout_loader">
            <LogoutPopupView />
        </template>
        <div class="container">
            <div class="main_block">
                <template v-if="$device.isMobile">
                    <div class="mobile_header_left_block">
                        <span class="menu_bar" @click="open_category_list=true">
                            <i class="fa fa-align-left"></i>
                        </span>
                    </div>
                </template>
                <template v-else>
                    <nuxt-link :to="{path: '/'}">
                        <Logo />
                        <!-- <SvgLogo /> -->
                    </nuxt-link>
                </template>

                <SearchInputBlock />

                <div v-if="$device.isMobile" class="header_right_block ml-3">
                    <span class="cart" @click="open_cart_list=true;setBlackOverlayHeader(true)">
                        <i class="fa fa-cart-plus"></i>
                        <sup>{{ $store.state.cart_info.total_cart_items }}</sup>
                    </span>
                </div>
                <div v-else class="header_right_block">
                    <!-- {{ $store.state.auth_info.user_data.user_type }}
                    {{ $store.state.user_dashboard_path  }}
                    {{ $store.state.auth_info.loggedIn }} -->
                    <!-- <template v-if="$store.state.auth_info.user_data.user_type==$store.state.customer_user_type_id && $store.state.auth_info.loggedIn">
                        <nuxt-link :to="{path: '/user/my-prescriptions?action=new'}" class="upload_prescription_btn" title="Upload Prescription">
                            <i class="fa fa-prescription"></i>
                            <span>Prescription Upload</span>
                        </nuxt-link>
                    </template>
                    <template v-else-if="!$store.state.auth_info.loggedIn">
                        <span class="upload_prescription_btn" title="Upload Prescription" @click="$parent.auth_form_open_status(true)">
                            <i class="fa fa-prescription"></i>
                            <span>Prescription Upload</span>
                        </span>
                    </template> -->
                    <!-- <span class="install-app-btn-container" id="installApp">
                        <i class="fa fa-download"></i>
                    </span> -->
                    <a :href="$store.state.site_basic_config_data.ios_app_store" target="_blank" class="apple_app" title="Apple app store">
                        <i class="fab fa-apple"></i>
                    </a>
                    <a :href="$store.state.site_basic_config_data.android_play_store" target="_blank" class="google_play" title="Google play store">
                        <i class="fab fa-google-play"></i>
                    </a>
                    <span class="cart" @click="open_cart_list=true">
                        <i class="fa fa-cart-plus"></i>
                        <sup>{{ $store.state.cart_info.total_cart_items }}</sup>
                    </span>
                    <span class="notification">
                        <i class="fa fa-bell"></i>
                        <sup>0</sup>
                    </span>
                    <LoginUserInfo v-if="$store.state.auth_info.loggedIn" />
                    <span v-else class="user_info" @click="$parent.auth_form_open_status(true)"><i class="fa fa-user"></i></span>
                </div>
            </div>
        </div>
        <UserNavigationBlock v-if="open_navigation" />
        <CartListItemBlock v-else-if="open_cart_list" />
        <CategoryListItemBlock v-else-if="open_category_list" />
        <!-- <AddCartSound /> -->
    </div>
</template>
<script>
import Logo from '@/components/Logo'
import SvgLogo from '@/components/svg-logo'
import LogoutPopupView from '@/components/content_display/LogoutPopupView'
// import AddCartSound from '@/components/sounds/AddCartSound'
import SearchInputBlock from './search-input-block'
import LoginUserInfo from './LoginUserInfo'
import UserNavigationBlock from './UserNavigationBlock'
import CartListItemBlock from './CartListBlock'
import CategoryListItemBlock from './CategoryListBlock'
import { mapMutations, mapActions } from 'vuex'
// import $ from 'jquery'
export default {
    name: 'HeaderBlock',
    components: {
        Logo,
        SvgLogo,
        LogoutPopupView,
        // AddCartSound,
        SearchInputBlock,
        LoginUserInfo,
        UserNavigationBlock,
        CartListItemBlock,
        CategoryListItemBlock
    },
    data(){
        return {
            logout_loader: false,
            open_category_list: false,
            open_navigation: false,
            open_cart_list: false
        }
    },
    watch: {
        $route(to, from){
            this.close_navigation_block()
            this.close_cart_list_block()
            this.close_category_list_block()
        },
        total_cart_items: function(){}
    },
    mounted() {
        // let deferredPrompt;

        // window.addEventListener('beforeinstallprompt', (e) => {
        //     $('.install-app-btn-container').show();
        //     deferredPrompt = e;
        // });

        // const installApp = document.getElementById('installApp');

        // installApp.addEventListener('click', async () => {
        //     if (deferredPrompt !== null) {
        //         deferredPrompt.prompt();
        //         const { outcome } = await deferredPrompt.userChoice;
        //         if (outcome === 'accepted') {
        //             deferredPrompt = null;
        //         }
        //     }
        // });
    },
    methods: {
        ...mapActions({
            userLogout: 'auth_info/LOGOUT_REQ'
        }),
        ...mapMutations({
            setBlackOverlayHeader: 'BLACK_OVERLAY_HEADER'
        }),
        user_logout: async function(){
            this.logout_loader = true;
            localStorage.removeItem('user_info')
            await this.userLogout(this.$store.state.oauth_token.data)
            this.$router.push('/')
            this.logout_loader = false
            this.close_navigation_block()
            this.close_cart_list_block()
            this.close_category_list_block()

            this.$notify.success({
                title: 'Logout',
                message: 'Successfully Done',
                position: 'bottomRight',
                transitionIn: 'bounceInRight',
                transitionOut: 'fadeOutLeft',
                timeout: 1500
            })
        },
        close_navigation_block: function(){
            this.open_navigation = false
            this.setBlackOverlayHeader(false)
            document.body.classList.remove('popup_open')
        },
        close_cart_list_block: function(){
            this.open_cart_list = false
            this.setBlackOverlayHeader(false)
            document.body.classList.remove('popup_open')
        },
        close_category_list_block: function(){
            this.open_category_list = false
            this.setBlackOverlayHeader(false)
            document.body.classList.remove('popup_open')
        }
    }
}
</script>
<style lang="scss" scoped>
    .header_block{
        position: fixed;
        left: 0; top: 0;
        width: 100%;
        height: 60px;
        background-color: $white;
        box-shadow: 0 0 15px $default_text_color;
        z-index: 999;

        &.overlay_block{
            z-index: 1001;
        }

        &.mobile_device{
            background-color: $sys_brand_color;
        }
    }
    .main_block{
        display: flex;
        width: 100%; height: 60px;
    }
    .main_block > a,
    .main_block > div{
        align-self: center;
    }
    .mobile_header_left_block{
        display: flex;
    }
    .menu_bar{
        display: inline-block;
        font-size: 22px;
        color: $light_ash;
        cursor: pointer;
    }
    .header_right_block{
        display: flex; text-align: right; margin-left: auto;

        & > span,
        & > a{
            position: relative;
            // display: table;
            align-self: center;
            margin: 0 5px; cursor: pointer;
            width: 40px; height: 40px;
            border: 1px solid $white;
            line-height: 38px; text-align: center;
            background-color: $light_ash;
            border-radius: 50%;
            transition: all 0.4s;
        }

        & > .upload_prescription_btn{
            width: auto;
            margin-left: auto;
            white-space: nowrap;
            color: #fff;
            background-color: #f16837;
            border-radius: 25px;
            transition: all 0.4s;

            &:hover{
              background-color: #CD0000
            }

            & > i{
                width: 33px;
                height: 33px;
                background-color: #ff794a;
                border: 1px solid #ddd;
                text-align: center;
                line-height: 33px;
                border-radius: 50%;
                margin-left: 2px;
                display: inline-block;
            }

            & > span{
                display: inline-block;
                font-size: 10px;
                font-weight: bold;
                margin: 0px 10px 0 5px;
                position: relative;
                top: -2px;
            }
        }

        & > a.apple{
            color: #000000;
            font-size: 20px;

            &:hover{
                background-color: #000000;
                color: #fff;
            }
        }

        & > a.apple_app{
            color: #fc3158;
            font-size: 20px;

            &:hover{
                background-color: #fc3158;
                color: #fff;
            }
        }

        & > a.android{
            color: #78C257;
            font-size: 18px;

            &:hover{
                background-color: #78C257;
                color: #fff;
            }
        }

        & > a.google_play{
            color: #3BCCFF;

            font-size: 18px;

            &:hover{
                background-color: #3BCCFF;
                color: #fff;
            }
        }
    }

    .seach_input_block ::v-deep .speech_recongition_block {
        display: inline-block;
        align-self: center;
        font-size: 16px;
        color: #ccc;
        .action_btn {
            width: 30px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            font-size: 20px;
            border-radius: 50%;
            cursor: pointer;
            transition: all .4s;

            &.active,&:hover{
                font-size: 14px;
                background-color: #cd0000;
                color: #f7f7f7;
                border-color: #cd0000;
            }
        }
    }

    .mobile_device .header_right_block > span,
    .mobile_device .header_right_block > a{
        width: 36px; height: 36px; line-height: 34px;
    }
    .mobile_device .seach_input_block{
        height: 38px;
        margin: 0 0 0 15px;
    }
    .header_right_block > span:first-child,
    .header_right_block > a:first-child{
        margin-left: auto;
    }
    .header_right_block > span:last-child,
    .header_right_block > a:last-child{
        margin-right: 0;
    }
    .header_right_block > span:hover,
    .header_right_block > a:hover{
        background-color: $sys_brand_color;
        color: $white;
    }
    .header_right_block > span.notification:hover,
    .header_right_block > a.notification:hover{
        background-color: $notification_hover;
    }
    .mobile_device .cart{
        background-color: #f16837;
        color: #fff;
    }
    .notification > sup,
    .cart > sup{
        position: absolute;
        top: 0;
        width: 18px;
        height: 18px;
        background-color: $sys_brand_color;
        color: $white;
        border-radius: 50%;
        margin: 0;
        padding: 0;
        line-height: 16px;
        border: 1px solid $white;
        font-size: 10px;
    }
    .notification > sup{
        background-color: $notification_sup;
    }
    .mobile_device .content{
        width: 300px;
    }    
</style>
