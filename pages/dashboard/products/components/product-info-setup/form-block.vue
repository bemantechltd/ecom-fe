<template>
    <div class="product_info_form_block">
        <div class="mb-4">
            <label>Choose Information Type</label>
            <div class="mb-4">
                <select v-model="$parent.info_arr[cur_index].index" class="form-control" @change="$parent.select_info_type(cur_index)">
                    <option value="">Select One</option>
                    <template v-if="$parent.product_info_types.length>0">
                        <option v-for="(item,index) in $parent.product_info_types" :key="index" :value="index">{{ item.title }}</option>
                    </template>
                </select>
            </div>
            <label>Content</label>
            <div class="text_editor_block">
                <vue-editor v-model="$parent.info_arr[cur_index].content" />
                <!-- <tinymce :id="'product-' + cur_index" v-model="$parent.info_arr[cur_index].content"></tinymce> -->
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ProductInfoFormBlock',
    props: ['data','cur_index']
}
</script>
<style scoped>
    .product_info_form_block{
        display: block;
        padding: 15px; background-color: #eee;
        border-bottom: 1px solid #ddd;
        transition: all 0.4s;
    }
    .text_editor_block{
        background-color: #fff;
    }
</style>