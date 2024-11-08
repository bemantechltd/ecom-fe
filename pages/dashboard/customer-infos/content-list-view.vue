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
                    <label>Verified</label>
                    <select v-model="$parent.filter.verified" @change="filter_by_type('verified')">
                        <option value="">All</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </select>
                </li>
                <li>
                    <label>Active</label>
                    <select v-model="$parent.filter.status" @change="filter_by_type('status')">
                        <option value="">All</option>
                        <option value="1">Yes</option>
                        <option value="2">No</option>
                    </select>
                </li>
            </ul>
        </div>
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th>Login ID</th>
                    <th>User Info</th>
                    <th style="text-align:center" width="80">Verified</th>
                    <th style="text-align:center" width="80">Active</th>
                    <th width="80"></th>
                </tr>
            </thead>
            <tbody>
                 <template v-if="data.length>0">
                    <tr v-for="(item,index) in data" :key="index">
                        <td align="center">{{ index+1 }}</td>
                        <td>
                            <div v-if="item.email">Email: {{ item.email }}</div>
                            <div v-if="item.mobile">Mobile: {{ item.mobile }}</div>
                        </td>
                        <td>
                            <template v-if="item.user_info">
                                <div v-if="item.user_info.full_name">Name: {{ item.user_info.full_name }}</div>
                                <div v-if="item.user_info.gender_id">Gender: {{ $store.state.gender_list[item.user_info.gender_id] }}</div>
                                <div>Created at: {{ item.created_at }}</div>
                            </template>
                        </td>
                        <td align="center">
                            <span class="status">
                                <i :class="['far','fa-check-circle',{active:item.verified}]"></i>
                            </span>
                        </td>
                        <td align="center">
                            <span class="status">
                                <i :class="['far','fa-check-circle',{active:item.status}]"></i>
                            </span>
                        </td>
                        <td align="center">
                            <div class="action_block">
                                <template v-if="($parent.$parent.$parent.role_access.edit_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.edit))">
                                    <span @click="edit_item(item.id)"><i class="fa fa-edit"></i></span>
                                </template>
                                <template v-if="(item.id>1 || $store.state.auth_info.user_data.id!=item.id) && ($parent.$parent.$parent.role_access.delete_others || ($parent.$parent.$parent.get_login_user_id==item.created_by && $parent.$parent.$parent.role_access.delete))">
                                    <span @click="del_item(item.id)"><i class="fa fa-trash-alt"></i></span>
                                </template>
                            </div>
                        </td>
                    </tr>
                 </template>
                 <template v-else>
                    <tr><td colspan="7" align="center"><i class="fa fa-info-circle"></i> There is no data</td></tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    data() {
      return {
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
        edit_item: function(val){
            this.$parent.edit_content_id = val
            this.$parent.add_new_entity(true)
            this.$parent.$parent.$parent.edit_route(val)
        },
        del_item: function(id){
            if(confirm('Are you sure to delete it?')){
                this.$axios.get('/api/customer-infos/delete/' + id, this.$parent.header_config).then( (response) => {
                    console.log('Get Data', response.data)
                    this.$swal("Good job!", "Data has been deleted successfully.", "success");
                    this.$parent.load_data();
                }).catch(e => {
                    console.log(e)
                    this.$toast.error('Failed!!!', {icon: "error_outline"})
                });
            }
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
    .content_list_view > table{
        border: 1px solid #ddd
    }
    .status > i{
        font-size: 18px;
        color: #ccc
    }
    .status > i.active{
        color: #5dad5d
    }
    .action_block{
        display: block;
        text-align: right;
    }
    .action_block > span{
        display: inline-block;
        margin: 0 5px;
    }
</style>
