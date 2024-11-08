import Vue from 'vue'
import VueFbCustomerChat from 'vue-fb-customer-chat'

Vue.use(VueFbCustomerChat, {
  page_id: '111427401325185', //  change 'null' to your Facebook Page ID,
  theme_color: '#f16837', // theme color in HEX
  locale: 'en_US', // default 'en_US'
})