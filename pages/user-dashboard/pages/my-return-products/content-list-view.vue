<template>
    <div class="content_list_view table-responsive">
        <TableContentLoader v-if="content_loader" :cols="5" />
        <table v-else class="table table-striped">
            <thead>
                <tr>
                    <th style="text-align:center" width="50">Sl.</th>
                    <th width="35%">Return Product Info</th>
                    <th width="35%">Return Reason</th>
                    <th width="25%">Photos</th>
                    <th>Status</th>
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
                            <div v-if="item.return_reason_info"><b><em>{{ item.return_reason_info.reason_title }}</em></b></div>
                            <blockquote v-if="item.description">{{ item.description }}</blockquote>
                            <div><small>Requestd at: {{ item.created_at }}</small></div>
                        </td>
                        <td>
                            <div v-if="JSON.parse(item.photos).length>0" class="photo_list_block">
                                <div v-for="(photo,photo_index) in JSON.parse(item.photos)" :key="photo_index">
                                    <img :src="item.image_base_url + '/' + item.order_info.id + '/' + item.order_item_info.id + '/' + photo" />
                                </div>
                            </div>
                            <div v-else><small><em>[Not Provided]</em></small></div>
                        </td>
                        <td>
                            <div v-if="item.status=='0'">
                               <div style="white-space: nowrap">
                                  <i class="fa fa-person-digging"></i> Pending
                               </div>
                            </div>
                            <div v-else-if="item.status=='1'">
                               <div style="white-space: nowrap">
                                  <i class="far fa-check-circle"></i> Accept
                               </div>
                            </div>
                            <div v-else-if="item.status=='2'">
                               <div style="white-space: nowrap">
                                  <i class="fa fa-times"></i> Reject
                               </div>
                            </div>
                        </td>
                    </tr>
                </template>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
    name: 'ContentListView',
    props: ['data','content_loader'],
    data(){
        return {
        }
    },
    methods: {
    }
}
</script>
<style scoped>
    .content_list_view > table{
        border: 1px solid #ddd
    }
    table th,
    table td{
        font-size: 12px;
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
</style>
