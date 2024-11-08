<template>
    <div class="main_body_block">
        <div class="container">
            <LazyHydrate when-visible>
                <SelectedProducts />
            </LazyHydrate>
            <LazyHydrate when-visible>
                <ProductTypeList />
            </LazyHydrate>
            <LazyHydrate when-visible>
                <RecommendedProducts />
            </LazyHydrate>
            <LazyHydrate when-visible>
                <HotProducts />
            </LazyHydrate>            
            <ProductByCategory />
            <!-- <AllProducts /> -->
        </div>
    </div>
</template>
<script>
import ProductTypeList from '../frontend/components/ProductTypeList'
import RecommendedProducts from '../frontend/components/RecommendedProducts'
import SelectedProducts from '../frontend/components/SelectedProducts'
import HotProducts from '../frontend/components/HotProducts'
import ProductByCategory from '../frontend/components/ProductByCategory'
import AllProducts from '../frontend/components/AllProducts'
export default {
    name: 'MainBodyBlock',
    components: {
        ProductTypeList,
        RecommendedProducts,
        SelectedProducts,
        HotProducts,
        ProductByCategory,
        AllProducts
    },
    computed: {
        current_route: function(){
            return this.$route.name
        }        
    }
}
</script>
<style scoped>
    .main_body_block{
        display: block
    }
</style>