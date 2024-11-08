<template>
    <div class="category_list_block">
        <select v-model="$parent.product_cat_id">
            <option value="">All Products</option>
            <template v-for="(item,index) in $parent.category_list" >
                <option :key="'p-' + index" :value="item.id">{{ item.category_name }}</option>
                <!--Layer One-->
                <template v-if="item.sub_categories && item.sub_categories.length>0">
                    <template v-for="(sub_item,sub_index) in item.sub_categories" >
                        <option :key="'l-1-' + index + '-' + sub_index" :value="sub_item.id">--- {{ sub_item.category_name }}</option>
                        <!--Layer two-->
                        <template v-if="sub_item.sub_categories && sub_item.sub_categories.length>0">
                            <template v-for="(sub2_item,sub2_index) in sub_item.sub_categories" >
                                <option :key="'l-2-' + index + '-' + sub_index + '-' + sub2_index" :value="sub2_item.id">--- --- {{ sub2_item.category_name }}</option>
                            </template>
                        </template>
                    </template>
                </template>
            </template>
        </select>
    </div>
</template>
<script>
export default {
    name: 'CategoryListBlock'
}
</script>
<style scoped>
    select{
        font-size: 12px;
        padding: 5px 15px;
        border: 1px solid #ddd;
        border-radius: 25px;
        outline: none;
    }
</style>