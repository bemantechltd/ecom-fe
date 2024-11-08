<template>
    <div class="info_content_block">
        <div class="tab_items">
            <carousel
                :paginationEnabled="false"
                :perPage="4"
                :perPageCustom="[[360, 2], [990, 4]]"
                :minSwipeDistance="8"
                :loop="true">
                <template v-for="(item,index) in data">
                    <slide v-if="item.product_info_type_data" :key="index">
                        <div :class="['tab_item',{active:sel_info_index==index}]" @click="sel_info_index=index">{{ item.product_info_type_data.type_title }}</div>
                    </slide>
                </template>
            </carousel>            
        </div>
        <div class="tab_item_details mt-3">
            <div class="content_block" v-html="data[sel_info_index].content"></div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'InfoContentBlock',
    props: {
        data: Array
    },
    data(){
        return {
            sel_info_index: 0
        }
    }
}
</script>
<style scoped>
    .tab_item{        
        text-align: center;
        padding: 0px 15px;
        height: 40px;
        line-height: 40px;
        border-bottom: 2px solid #ccc;
    }
    .tab_item.active{
        border-color: #e5733a;
    }
</style>