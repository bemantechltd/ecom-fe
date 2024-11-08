<template>
    <div class="content_list_view table-responsive">
        <div class="filter_option_block">
            <span>Filters</span>
            <ul>
                <li>
                  <div class="show_date_range_btn" @click="$parent.showDateRange()">
                    <i v-if="$parent.show_date_range" class="far fa-check-circle"></i>
                    <i v-else class="far fa-circle"></i>
                    <span>Show Date Range</span>
                  </div>
                </li>
                <li v-if="$parent.show_date_range">
                  <label>Choose Date Range</label>
                  <div>
                    <date-range-picker v-model="$parent.filter.date_range" format="YYYY/MM/DD" :options="range_options" />
                  </div>
                </li>
                <li>
                    <label>Status</label>
                    <select v-model="$parent.filter.status" @change="filter_by_type('status')">
                        <option value="">All</option>
                        <option value="4">Pending</option>
                        <option value="3">Running</option>
                        <option value="1">Completed</option>
                        <option value="2">Canceled</option>
                    </select>
                </li>
            </ul>
        </div>
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th width="35%">Return Product Info</th>
                    <th width="35%">Return Reason</th>
                    <th width="25%">Photos</th>
                    <th width="120"></th>
                </tr>
            </thead>
            <tbody>
                <template v-if="data.length>0">
                    <tr v-for="(item,index) in data" :key="index">
                        <td align="center">{{ index+1 }}</td>
                        <td>
                            <div v-if="item.order_item_info" class="product_info">
                              <div class="image">
                                <template v-if="item.order_item_info.product_photo_info.length > 0">
                                  <img :src="item.order_item_info.product_photo_info[0].product_photo_data.content" :alt="item.order_item_info.product_photo_info[0].product_photo_data.content_title" :title="item.order_item_info.product_photo_info[0].product_photo_data.content_title" />
                                </template>
                              </div>
                              <div class="info">
                                  <div class="order_id">Order ID # {{ item.order_info.order_id }}</div>
                                  <div class="title">{{ item.order_item_info.product_title }}</div>
                                  <div class="qty">Qty: {{ item.order_item_info.qty }}</div>
                                  <div class="price">Price: {{ $store.state.currency_info.symbol }} {{ item.order_item_info.price }}</div>
                              </div>
                            </div>
                        </td>
                        <td>
                            <div><b><em>{{ item.return_reason_info.reason_title }}</em></b></div>
                            <blockquote v-if="item.description">{{ item.description }}</blockquote>
                            <div><small>Requestd at: {{ item.created_at }}</small></div>
                        </td>
                        <td>
                            <div v-if="item.photos!=='null' && JSON.parse(item.photos).length>0" class="photo_list_block">
                                <div v-for="(photo,photo_index) in JSON.parse(item.photos)" :key="photo_index">
                                    <img :src="item.image_base_url + '/' + item.order_info.id + '/' + item.order_item_info.id + '/' + photo" />
                                </div>
                            </div>
                            <div v-else><small><em>[Not Provided]</em></small></div>
                        </td>
                        <td align="center">
                            <div class="action_block">
                                <div @click="view_details(index,item.order_info)"><i class="fa fa-eye"></i> Order Details</div>

                                <div @click="action_block(item.order_info.id,item.order_info.order_id,item.id)" class="status_update_btn mt-2"><i class="far fa-check-circle"></i> Update Action</div>

                                <template v-if="($parent.$parent.$parent.role_access.edit_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.edit))">
                                    <span @click="edit_item(item.id)"><i class="fa fa-edit"></i></span>
                                </template>
                                <!-- <template v-if="($parent.$parent.$parent.role_access.delete_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.delete))">
                                    <span @click="del_item(item.id)"><i class="fa fa-trash-alt"></i></span>
                                </template> -->
                            </div>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr><td colspan="5" align="center"><i class="fa fa-info-circle"></i> There is no data</td></tr>
                </template>
            </tbody>
        </table>

        <OrderDetailsDrawerView v-if="open_order_details" />
        <ReturnRequestActionDrawerView v-if="open_action_block" :order_id="sel_order_id" :req_order_id="sel_item_order_id" :req_id="sel_item_id" />
    </div>
</template>
<script>
import PriceViewBlock from '@/components/content_display/price/ViewBlock'
import OrderDetailsDrawerView from './details-drawer-view'
import ReturnRequestActionDrawerView from './return-request-action-drawer-view'
import { mapActions, mapMutations } from 'vuex'
import moment from 'moment'
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    components: {
        PriceViewBlock,
        OrderDetailsDrawerView,
        ReturnRequestActionDrawerView
    },
    data(){
        return {
            open_order_details: false,
            open_action_block: false,
            sel_order_data: '',
            sel_order_id: '',
            sel_order_index: '',
            sel_item_id: '',
            sel_order_id: '',
            sel_item_order_id: '',
            range_options: {
                // singleDatePicker: true,
                // showDropdowns: true,
                minYear: 2021,
                maxYear: +moment().format("YYYY"),
                ranges: {
                  'Today': [moment(), moment()],
                  'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                  'Last 7 Days': [moment().subtract(6, 'days'), moment()],
                  'Last 30 Days': [moment().subtract(29, 'days'), moment()],
                  'This Month': [moment().startOf('month'), moment().endOf('month')],
                  'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
                }
            }
        }
    },
    methods: {
        ...mapMutations({
            selOrderData: 'order_info/SEL_DATA'
        }),
        filter_by_type: function(type){
            if(this.$route.query.page) delete this.$route.query['page']

            if(this.$parent.filter[type]==''){
                let query = Object.assign({}, this.$route.query);
                delete query[type];
                this.$router.replace({ query });
            }else{
                let obj = {}; obj[type] = this.$parent.filter[type];
                this.$router.push({ query: Object.assign({}, this.$route.query, obj) });
            }
        },
        action_block: function(order_pk,order_id, id){
            this.open_action_block = true
            this.sel_item_id = id
            this.sel_order_id = order_pk
            this.sel_item_order_id = order_id
        },
        view_details: function(index,data){
            this.open_order_details = true
            this.sel_order_data = data
            this.sel_order_index = index
            this.selOrderData(data)
        },
        edit_item: function(val){
            this.$parent.edit_content_id = val
            this.$parent.add_new_entity(true)
            this.$parent.$parent.$parent.edit_route(val)
        },
        del_item: function(id){
            if(confirm('Are you sure to delete it?')){
                this.$axios.get('/api/order-infos/delete/' + id, this.$parent.header_config).then( (response) => {
                    console.log('Get Data', response.data)
                    this.$swal("Good job!", "Data has been deleted successfully.", "success");
                    this.$parent.load_data();
                }).catch(e => {
                    console.log(e)
                    this.$toast.error('Failed!!!', {icon: "error_outline"})
                });
            }
        },
        close_order_dtl_block: function(){
            this.open_order_details = false
            document.body.classList.remove('popup_open')
        },
        close_action_block: function(){
            this.open_action_block = false
            document.body.classList.remove('popup_open')
        }
    }
}
</script>
<style scoped>
    .filter_option_block{
        display: flex;
        height: 60px;
        border: 1px solid #ddd;
        background-color: #eee;
        margin-bottom: 15px;
        padding: 0 15px;
        border-radius: 3px;
    }
    .filter_option_block > span,
    .filter_option_block > ul{
        align-self: center;
    }
    .filter_option_block > span{
        padding-right: 15px; color: #444; font-size: 14px; border-right: 1px solid #ccc;
    }
    .filter_option_block > ul{
        display: flex;
        list-style: none;
        margin: 0; padding: 0;
        margin-left: auto;
        height: 30px
    }
    .filter_option_block > ul > li{
        /* display: flex; */
        align-self: center;
        /* height: 100%; */
        font-size: 12px;
        cursor: pointer;
        user-select: none;
        margin-left: 10px
    }
    .filter-option_block > ul > li > .show_date_range_btn{
        cursor: pointer;
    }
    .filter_option_block > ul > li label{
        margin-bottom: 3px
    }
    .filter_option_block > ul > li select{
        display: block;
        border: 1px solid #ddd;
        padding: 1px 5px; border-radius: 3px;
        max-width: 185px; outline: none;
    }
    .label{
        font-size: 13px; font-weight: bold; color: #888;
        margin-bottom: 10px;
    }
    .content_list_view > table{
        border: 1px solid #ddd
    }
    .assign_delivery_person_btn{
        display: block; text-align: left; margin-top: 15px;
    }
    .assign_delivery_person_btn > span{
        display: inline-block;
        background-color: chocolate;
        color: #fff; padding: 3px 15px;
        border-radius: 25px; cursor: pointer;
        transition: all 0.4s;
    }
    .assign_delivery_person_btn > span:hover{
        background-color: crimson;
    }
    .product_info{
        display: flex;
        align-items: center;
        gap: 10px;
        font-size: 13px;
    }
    .product_info > .image{
        width: 75px;
        height: 75px;
        background-color: #eee;
        border: 1px solid #ddd
    }
    .product_info > .image > img{
        width: 100%; height: 100%; object-fit: contain;
    }
    .product_info > .info > .title{
        font-weight: 600;
    }
    .photo_list_block{
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        align-items: center;
    }
    .photo_list_block > div{
        width: 50px;
        height: 40px;
        background-color: #eee;
        border: 1px solid #ddd;
    }
    .photo_list_block > div > img{
        width: 100%; height: 100%; object-fit: contain;
    }
    .status{
        display: flex;
        height: 34px;
    }
    .status > i,
    .status > div{
        font-weight: bold;
    }
    .status > div > h6{
        font-size: 12px; color: #444;
        line-height: 16px; margin: 0;
    }
    .status > div > em{
      display: block;
      font-size: 10px; font-weight: normal; color: #666;
      text-align: left
    }
    .status > i{
        margin-right: 10px;
        margin-top: 3px;
        font-size: 16px;
        color: rgb(77 210 77);
    }
    .cancel_status > i,
    .cancel_status > span{
        color: #CD0000
    }
    .cancel_reason_dtl{
        font-size: 13px;
        font-weight: normal;
        text-align: left;
        color: #666
    }
    .action_block > div{
        display: block;
        margin: 0 5px;
        cursor: pointer;
        white-space: nowrap;
        background-color: #666;
        color: #fff;
        font-size: 10px;
        padding: 2px 10px;
        border-radius: 25px;
        transition: all 0.4s
    }
    .action_block > div.status_update_btn{
        background-color: darkolivegreen;
    }
    .action_block > div:hover{
        background-color: #006699;
    }
    .action_block > div.status_update_btn:hover{
        background-color: #336633
    }
</style>
