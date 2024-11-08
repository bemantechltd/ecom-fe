<template>
    <div class="info_content_block">
        <template v-for="(item,index) in data">
            <label :key="'label-' + index">{{ item.product_info_type_data.type_title }}</label>
            <div class="content_block mb-4" :key="'content-' + index" v-html="item.content"></div>
        </template>
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
        }
    }
}
</script>
<style scoped>
    .info_content_block >>> label{
        display: inline-block; padding-bottom: 5px;
        border-bottom: 2px dotted #ccc;
        font-size: 16px; color: #333;
    }
    .content_block{
        font-size: 13px;
    }
</style>