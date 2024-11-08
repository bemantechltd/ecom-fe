<template>
    <div class="static_page_block">        
        <div class="container pt-3">
            <label>Choose Date Range</label>
            <div class="search_input_block">
                <date-range-picker v-model="date_range" format="YYYY/MM/DD" :options="range_options" />
                <div class="srch_btn" role="button" @click="search_data()">Search</div>
            </div>
            <hr />
            <div v-if="pre_loader">
                <FormBlockLoader :cols="1" :height="20" :r1="true" :r2="false" :r1_w="50" :r2_w="0" :r1_h="15" :r2_h="0" />
                <div v-for="(n,i) in 5" :key="i">
                    <FormBlockLoader :cols="1" :height="10" :r1="true" :r2="false" :r1_w="100" :r2_w="0" :r1_h="5" :r2_h="0" />
                </div>
            </div>
            <template v-else-if="data.length>0">
                <div class="content_block table-responsive">
                    <table  class="table table-striped">
                        <tr>
                            <th>User Info</th>
                            <th>Registration Date</th>
                        </tr>
                        <tr v-for="user in data" :key="user.id">
                            <td>
                                <div v-if="user.mobile">Mobile: {{ user.mobile }}</div>
                                <div v-if="user.email">E-mail: {{ user.email }}</div>
                                <div v-if="user.user_info && user.user_info.full_name">Name: {{ user.user_info.full_name }}</div>
                                <div v-if="user.verified" class="succ"><i class="fa fa-check-circle"></i> Verified</div>
                                <div v-else class="err"><i class="far fa-check-circle"></i> Not Yet to Verify</div>
                            </td>
                            <td>{{ user.created_at }}</td>
                        </tr>
                    </table>
                </div>
                <div v-if="pagination_show" class="row mt-3">
                    <div class="col-md-12 mb-3" align="center">
                        <span class="total_record_block">Total records: {{ pagination_config.data.total }}</span>
                    </div>
                    <div class="col-md-12">
                        <Pagination :config="pagination_config" />
                    </div>
                </div>
            </template>
            <div v-else><i class="fa fa-info-circle"></i> There is no data found.</div>
        </div>
    </div>
</template>
<script>
import moment from 'moment'
export default {
    name: 'StaticPageBlock',
    scrollToTop: true,
    data(){
        return {
            pre_loader: false,
            data: [],
            cur_page: (this.$route.query.page>0?this.$route.query.page:1),
            limit: 10,
            pagination_show: false,
            pagination_config: {
                data: [],
                lang: 'en',
                align: 'center',
                action: ''
            },
            date_range: [moment().format("YYYY/MM/DD"), moment().format("YYYY/MM/DD")],
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
    watch: {
        $route(to,from){
            if(to.query.date_range) this.date_range = JSON.parse(to.query.date_range)
            this.load_data(to.query.page?to.query.page:1)
        }
    },    
    mounted(){
        if(this.$route.query.date_range) {
            // this.date_range = JSON.parse(this.$route.query.date_range)
            // console.log(this.date_range)
        }
        this.load_data();
    },
    methods: {
        scrollToTop: function(){
            // window.scrollTo(0,0)
            window.scrollTo({ top: 0, behavior: 'smooth' })
        },
        search_data: function(){
            if(this.$route.query.page) delete this.$route.query['page']
            if(this.$route.query.date_range) delete this.$route.query['date_range']
            
            let obj = {}; obj['date_range'] = JSON.stringify(this.date_range);
            this.$router.push({ query: Object.assign({}, this.$route.query, obj) });
            
            // this.load_data()
        },
        async load_data(pg=this.cur_page){
            // console.log(this.date_range)
            this.scrollToTop()
            this.pre_loader = true
            this.$axios.get('/api/check-customer-by-offer?date_range=' + this.date_range + (this.limit>0?'?limit=' + this.limit:'') + (pg>1?'&page=' + pg:''), this.$parent.$parent.header_config).then( (response) => {
                console.log('Get Data', response.data.data)
                
                if(response.data.data.length>0){
                    this.data = response.data.data
                    this.pagination_show = true
                    this.pagination_config.data = response.data.meta
                }
                this.pre_loader = false
                this.cur_page = pg
            }).catch(e => {
                console.log(e)                
                this.pre_loader = false;
            });
        }
    }
}
</script>
<style lang="scss" scoped>
    .search_input_block{
        display: flex;
        gap: 15px;
        align-items: center;
        font-size: 12px;

        ::v-deep input{
            width: 100%; max-width: 200px;
            border: 1px solid #ddd; padding: 0 15px; height: 30px;
        }

        .srch_btn{
            display: inline-block;
            background-color: $sys_brand_color;
            color: $white;
            line-height: 30px; padding: 0 15px;            
            border-radius: 5px;
            cursor: pointer;
            transition: all 0.4s;

            &:hover{
                background-color: #CD0000;
            }
        }
    }
    .content_block{
        background-color: $white;

        .succ{
            color: $succ_color
        }
        .err{
            color: $err_color
        }
    }
</style>