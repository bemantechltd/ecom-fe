// State
export const state = () => ({
    themeDirName: 'themes',
    dashboard: {
        'name': 'Dashboard',
        'prefix': 'dashboard'
    },
    blackOverlayHeader: false,
    blackOverlayFooter: false,
    outh_token_name: 'oauth_token',
    // content type list
    dashboard_featured_list: {
        'Collection Types': {
            1: {
                name: 'Products',
                path: '/dashboard/products',
                route: 'dashboard-products',
                icon: '<i class="fa fa-laptop-medical"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            2: {
                name: 'Categories',
                path: '/dashboard/categories',
                route: 'dashboard-categories',
                icon: '<i class="fa fa-bars"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            3: {
                name: 'Companies',
                path: '/dashboard/companies',
                route: 'dashboard-companies',
                icon: '<i class="fa fa-hospital"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            4: {
                name: 'Media Gallery',
                path: '/dashboard/media-galleries',
                route: 'dashboard-media-galleries',
                icon: '<i class="fa fa-images"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        },
        'Components': {
            5: {
                name: 'Generics',
                path: '/dashboard/generics',
                route: 'dashboard-generics',
                icon: '<i class="fa fa-first-aid"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            // 6: {
            //     name: 'Disease',
            //     path: '/dashboard/disease',
            //     route: 'dashboard-disease',
            //     icon: '<i class="fa fa-disease"></i>',
            //     position: 'dashboard-left-nav',
            //     onClick: 'page'
            // },
            7: {
                name: 'Product Info Types',
                path: '/dashboard/product-info-types',
                route: 'dashboard-product-info-types',
                icon: '<i class="fa fa-book-medical"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            8: {
                name: 'Product Types',
                path: '/dashboard/product-types',
                route: 'dashboard-product-types',
                icon: '<i class="fa fa-pills"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            9: {
                name: 'Product Price Types',
                path: '/dashboard/product-price-types',
                route: 'dashboard-product-price-types',
                icon: '<i class="fa fa-funnel-dollar"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            10: {
                name: 'Product Return Reasons',
                path: '/dashboard/product-return-reasons',
                route: 'dashboard-product-return-reasons',
                icon: '<i class="fa fa-list"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            11: {
                name: 'Tags',
                path: '/dashboard/tags',
                route: 'dashboard-tags',
                icon: '<i class="fa fa-tags"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            12: {
                name: 'Regions',
                path: '/dashboard/regions',
                route: 'dashboard-regions',
                icon: '<i class="fa fa-map-marker-alt"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            13: {
                name: 'Cities',
                path: '/dashboard/cities',
                route: 'dashboard-cities',
                icon: '<i class="fa fa-map-marker-alt"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            14: {
                name: 'Areas',
                path: '/dashboard/areas',
                route: 'dashboard-areas',
                icon: '<i class="fa fa-map-marker-alt"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        },
        'Data Information': {
            21: {
                name: 'Order Infos',
                path: '/dashboard/order-infos',
                route: 'dashboard-order-infos',
                icon: '<i class="fa fa-notes-medical"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            22: {
                name: 'Product Return & Refunds',
                path: '/dashboard/product-return-refunds',
                route: 'dashboard-product-return-refunds',
                icon: '<i class="fa-solid fa-arrow-rotate-left"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            23: {
                name: 'Customer Infos',
                path: '/dashboard/customer-infos',
                route: 'dashboard-customer-infos',
                icon: '<i class="fa fa-hospital-user"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            24: {
                name: 'Delivery Persons',
                path: '/dashboard/delivery-persons',
                route: 'dashboard-delivery-persons',
                icon: '<i class="fa fa-biking"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        },
        'Frontend Setting': {
            41: {
                name: 'Static Pages',
                path: '/dashboard/static-pages',
                route: 'dashboard-static-pages',
                icon: '<i class="fa fa-scroll"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            42: {
                name: 'Promotional Banners',
                path: '/dashboard/promotional-banners',
                route: 'dashboard-promotional-banners',
                icon: '<i class="fa fa-ad"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            43: {
                name: 'Logo Setup',
                path: '/dashboard/logo-setup',
                route: 'dashboard-logo-setup',
                icon: '<i class="fa fa-images"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            // 44: {
            //     name: 'Timeline Setup',
            //     path: '/dashboard/timeline-setup',
            //     route: 'dashboard-timeline-setup',
            //     icon: '<i class="fa fa-stream"></i>',
            //     position: 'dashboard-left-nav',
            //     onClick: 'page'
            // },
            45: {
                name: 'Basic Configuration',
                path: '/dashboard/basic-configuration',
                route: 'dashboard-basic-configuration',
                icon: '<i class="fa fa-cogs"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        },
        'Generals': {
            14: {
                name: 'Admin User Roles',
                path: '/dashboard/admin-user-roles',
                route: 'dashboard-admin-user-roles',
                icon: '<i class="fa fa-list"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            },
            15: {
                name: 'Admin Users',
                path: '/dashboard/admin-users',
                route: 'dashboard-admin-users',
                icon: '<i class="fa fa-users"></i>',
                position: 'dashboard-left-nav',
                onClick: 'page'
            }
        }
    },

    // Admin User Role Feature ID
    admin_user_role_feature_id: 14,

    // user dashboard list
    user_dashboard_nav_list: {
        1: {
            name: 'Manage Account',
            path: '/user/manage-account',
            page: 'manage-account',
            allow: true,
            icon: '<i class="far fa-user"></i>'
        },
        2: {
            name: 'Manage Address',
            path: '/user/manage-address',
            page: 'manage-address',
            allow: false,
            allow_user_type: 3, // user_type_id [1 => admin,2 => delivery person,3 => customer]
            icon: '<i class="far fa-address-book"></i>'
        },
        3: {
            name: 'Manage Orders',
            path: '/user/manage-orders',
            page: 'manage-orders',
            allow: false,
            allow_user_type: 2, // user_type_id [1 => admin,2 => delivery person,3 => customer]
            icon: '<i class="fa fa-shopping-basket"></i>'
        },
        4: {
            name: 'My Orders',
            path: '/user/my-orders',
            page: 'my-orders',
            allow: false,
            allow_user_type: 3, // user_type_id [1 => admin,2 => delivery person,3 => customer]
            icon: '<i class="fa fa-shopping-basket"></i>'
        },
        5: {
            name: 'Manage Exact Location',
            path: '/user/manage-exact-location',
            page: 'manage-exact-location',
            allow: false,
            allow_user_type: 2, // user_type_id [1 => admin,2 => delivery person,3 => customer]
            icon: '<i class="far fa-address-book"></i>'
        },
        6: {
            name: 'My Return Products',
            path: '/user/my-return-products',
            page: 'my-return-products',
            allow: false,
            allow_user_type: 3, // user_type_id [1 => admin,2 => delivery person,3 => customer]
            icon: '<i class="fa fa-arrow-rotate-left"></i>'
        },
        7: {
            name: 'My Prescriptions',
            path: '/user/my-prescriptions',
            page: 'my-prescriptions',
            allow: false,
            allow_user_type: 3, // user_type_id [1 => admin,2 => delivery person,3 => customer]
            icon: '<i class="fa fa-prescription"></i>'
        },
        8: {
            name: 'My reviews',
            path: '/user/my-reviews',
            page: 'my-reviews',
            allow: false,
            allow_user_type: 2, // user_type_id [1 => admin,2 => delivery person,3 => customer]
            icon: '<i class="far fa-star"></i>'
        },
        9: {
            name: 'Change Password',
            path: '/user/change-password',
            page: 'change-password',
            allow: true,
            icon: '<i class="fa fa-exchange-alt"></i>'
        }
    },

    // site basic config data
    site_basic_config_data: {},

    // site logo info data
    logo_info_data: {},

    // gender list
    gender_list: {
        1: 'Male',
        2: 'Female',
        3: 'Common',
        4: 'Not Mentioned'
    },

    // blood group list
    blood_group_list: {},

    // display on list
    display_on_list: {
        1: 'Top Header Section',
        2: 'Header Navigation Section',
        3: 'Footer Section'
    },

    // order timeline list
    order_timeline_list: {
        1: 'We are getting your order',
        2: 'Delivery person has been given the responsibility',
        3: 'The order has been placed',
        4: 'The order is ready',
        5: 'Your order is on the way to delivery',
        6: 'Order delivered to the customer\'s hand',
        7: 'Payment has been paid',
        8: 'Order has been delivered'
    },

    // order status list
    order_status_list: {
        1: 'Looking for a nearby delivery person',
        2: 'The delivery person is going to place the order',
        3: 'Order is being prepared',
        4: 'Order is being packed',
        5: 'Order delivery time (15min)',
        6: 'Payment is being paid',
        7: 'Order has been delivered'
    },

    // order status images
    order_status_images: {},

    // running order info
    running_order_info: [],

    // order delivery review info
    order_delivery_review_pending_info: [],

    // shipping address labels
    shipping_addr_labels: {
        1: {
            title: 'Home',
            icon: '<i class="fa fa-home"></i>'
        },
        2: {
            title: 'Office',
            icon: '<i class="fa fa-briefcase"></i>'
        }
    },

    // footer navigation list
    footer_nav_list: {
        1: {
            name: 'About Us',
            path: '/about-us',
            route: 'about-us',
            icon: '<i class="fa fa-info-circle"></i>'
        },
        2: {
            name: 'Terms &amp; Conditions',
            path: '/terms-and-conditions',
            route: 'terms-and-conditions',
            icon: '<i class="fa fa-info-circle"></i>'
        },
        3: {
            name: 'Privacy Policy',
            path: '/privacy-policy',
            route: 'privacy-policy',
            icon: '<i class="fa fa-info-circle"></i>'
        }
    },

    // label setup
    order_init_status_label: 'Order Submitted',

    // User type setup
    admin_user_type_id: 1,
    delivery_user_type_id: 2,
    customer_user_type_id: 3,

    // Setup paths
    user_dashboard_path: 'user',
    product_dtl_path: 'products',
    checkout_page_path: 'checkout',
    static_page_path: 'page',
    search_page_path: 'search',

    // Global variables
    currency_info: {
        title: 'Tk',
        symbol: '৳',
        symbol_pos: 'left'
    },

    // Banner display types
    banner_display_types: {
        1: 'On body',
        2: 'Popup'
    },
    banner_schedule_types: {
        0: 'Always Show',
        1: 'On Schedule'
    },

    // Checkout page variables
    vat: 0, // percentage
    delivery_fee_default: 60,

    // Media Gallery Images Path
    media_gallery_img_path: '',

    // Get role access
    user_role_access: {},

    // Get feature access list
    feature_access_list: '',

    // form action status
    add_new_status: false,
    form_submit_status: false,
    auth_form_open_status: false,

    // current location
    cur_lat: 23.727929,
    cur_lng: 90.410545,

    // order timeline stream status
    order_timeline_sse_status: false,

    // search data info
    search_keyword: '',

    // star rating out of
    rating_out_off: 5
  })

  export const mutations = {
    BLACK_OVERLAY_HEADER (state, value){
        // console.log('Overlay', value)
        state.blackOverlayHeader = value
    },
    BLACK_OVERLAY_FOOTER (state, value){
        console.log('Overlay', value)
        state.blackOverlayFooter = value
    },
    // Basic config data
    BASIC_CONFIG_DATA (state, data) {
        state.site_basic_config_data = data.site_basic_config_data
        state.gender_list = data.gender_list
        state.blood_group_list = data.blood_group_list
        state.display_on_list = data.display_on_list
        state.order_timeline_list = data.order_timeline_list
        state.order_status_list = data.order_status_list
        state.order_status_images = data.order_status_images
        state.order_init_status_label = data.order_init_status_label
        state.admin_user_type_id = data.admin_user_type_id
        state.delivery_user_type_id = data.delivery_user_type_id
        state.customer_user_type_id = data.customer_user_type_id
        state.currency_info = data.currency_info
        state.banner_display_types = data.banner_display_types
        state.banner_schedule_types = data.banner_schedule_types
        state.media_gallery_img_path = data.media_gallery_img_path
        state.vat = data.vat
        state.delivery_fee_default = data.delivery_fee_default
    },
    LOGO_INFO_DATA (state, data) {
        state.logo_info_data = data
    },
    // Set
    CUR_LAT_LNG (state, data) {
        // console.log('Get Latlng', data)
        state.cur_lat = data.latitude
        state.cur_lng = data.longitude
    },
    // Running Order Status
    RUNNING_ORDER_STATUS (state, data) {
        state.running_order_info = data
    },
    // Order Delivery Review Status
    ORDER_DELIVERY_REVIEW_PENDING_STATUS (state, data) {
        state.order_delivery_review_pending_info = data
    },
    // Get user data
    USER_ROLE_ACCESS (state, data) {
      state.user_role_access = data
    },
    // Get feature access list by role list
    FEATURE_ACCESS_LIST (state) {
      let arr = {};
      /*for (var access_id in state.user_role_access) {
          arr[access_id] = state.dashboard_featured_list[access_id];
      }*/
      // console.log('Get user role access', state.user_role_access)
      state.user_role_access.forEach(v => {
          arr[v.feature_id] = v
      });

      state.feature_access_list = arr
    },
    // Get form action status
    ADD_NEW_STATUS (state, status) {
        state.add_new_status = status
    },
    FORM_SUBMIT_STATUS (state, status) {
        state.form_submit_status = status
    },
    SERACH_STATUS(state, data) {
        state.search_keyword = data
    },
    AUTH_FORM_OPEN_STATUS(state, status) {
        state.auth_form_open_status = status
    },
    ORDER_TIMELINE_SSE_REQ_STATUS(state, status) {
        state.order_timeline_sse_status = status
    }
  }

  // Actions
  export const actions = {
    // eslint-disable-next-line require-await
    async nuxtServerInit ({ dispatch, commit, state}) {
        // eslint-disable-next-line no-console
        // console.log('State', state)
        // let state = context.state
        // let dispatch = context.dispatch
        // let commit = context.commit
        /*let getOauthToken = this.$cookiz.get(state.outh_token_name)
        // console.log('Oauth Token', getOauthToken)
        await dispatch('oauth_token/GET_OAUTH_TOKEN', getOauthToken)

        if(!state.oauth_token.cached){
            // console.log('Fetch OAUTh TOKEN')
            try{
                await dispatch('oauth_token/GET_TOKEN_INFO')

                let oauth_token = state.oauth_token.data
                this.$cookiz.set(state.outh_token_name, JSON.stringify(oauth_token))
                commit('oauth_token/CACHE_STATUS', true)
            } catch (e) {
                return error({ message: e.message, statuscode: e.response.status })
            }
        }

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
            const { data } = await this.$axios.get('/api/site-init-info', headerObj)
            // eslint-disable-next-line no-console
            // console.log('Get data', data.data)

            commit('BASIC_CONFIG_DATA', data.data.basic_config_info)
            commit('LOGO_INFO_DATA', data.data.logo_info)
            commit('category_info/GET_DATA', data.data.category_info && data.data.category_info.display_on_nav?data.data.category_info.display_on_nav:[])
            commit('category_info/GET_BODY_DATA', data.data.category_info && data.data.category_info.display_on_body?data.data.category_info.display_on_body:[])
            commit('promotional_banner_info/GET_DATA', data.data.promotional_banner_info)

            // commit('BASIC_CONFIG_DATA', data.data)
        } catch (err) {
            // eslint-disable-next-line no-console
            // console.log('Error', err)
        }*/

        // console.log('Testing', context)
        // console.log('Fetch BASIC INFO')
        // await dispatch('GET_BASIC_CONFIG_INFO', state.oauth_token.data)

        // console.log('Fetch LOGO INFO')
        // await dispatch('GET_LOGO_INFO', state.oauth_token.data)

        // console.log('Fetch Categories Info')
        // await dispatch('category_info/GET_DATA', {access_token: state.oauth_token.token,type: 'display_on_nav'})
    },
    async GET_BASIC_CONFIG_INFO ({ commit }, getTokenType) {
        // eslint-disable-next-line no-console
        // console.log('Basic configuration info data request', getTokenType)
        let headerObj = {
            headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getTokenType.access_token
            }
        }
        // console.log('header object', headerObj)
        try {
            // let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            const { data } = await this.$axios.get('/api/basic-config', headerObj)
            // eslint-disable-next-line no-console
            // console.log('Get data', data)

            commit('BASIC_CONFIG_DATA', data.data)
        } catch (err) {
            // eslint-disable-next-line no-console
            // console.log('Error', err)
        }
    },
    async GET_LOGO_INFO ({ commit }, getTokenType) {
        // eslint-disable-next-line no-console
        // console.log('Basic configuration info data request', getTokenType)
        let headerObj = {
            headers: {
                'Authorization': getTokenType.token_type + ' ' + getTokenType.access_token,
                'Content-Type': 'application/json',
                'X-XSRF-TOKEN': getTokenType.access_token
            }
        }
        // console.log('header object', headerObj)
        try {
            // let getTokenType = JSON.parse(localStorage.getItem('oauth_token'));
            const { data } = await this.$axios.get('/api/logo-info', headerObj)
            // eslint-disable-next-line no-console
            // console.log('Get data', data)

            commit('LOGO_INFO_DATA', data.data)
        } catch (err) {
            // eslint-disable-next-line no-console
            // console.log('Error', err)
        }
    },
  }
