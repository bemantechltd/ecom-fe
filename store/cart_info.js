// State
export const state = () => ({    
    cart_items: {},
    total_cart_items: 0,
    total_cart_amount: 0
})

export const mutations = {    
    GET_CART_ITEMS (state) {
        if(localStorage.getItem('cart_items')){
            state.cart_items = JSON.parse(localStorage.getItem('cart_items'))
            
            let total = 0
            for(var index in state.cart_items){
                total += Object.keys(state.cart_items[index]).length
            }
            state.total_cart_items = total; //Object.keys(state.cart_items).length
        }else{
            state.cart_items = {}
            state.total_cart_items = 0
        }
    },
    UPDATE_CART_ITEMS_QUANTITY (state, data) {        
        state.cart_items[data.id][data.ptid].quantity = data.quantity        

        // Store to localstorage
        localStorage.setItem('cart_items', JSON.stringify(state.cart_items))
    },
    ADD_CART_ITEMS (state, data) {
        // console.log(data)
        let sel_price_type_index =  data.sel_price_type_index?data.sel_price_type_index:0
        let sel_price_type_id = data.product_price_infos[sel_price_type_index].product_price_type_data.id
        if(state.cart_items[data.id] && state.cart_items[data.id][sel_price_type_id]){
            if(data.req_quantity) state.cart_items[data.id][sel_price_type_id].quantity+=data.req_quantity
            else state.cart_items[data.id][sel_price_type_id].quantity++
        }else {
            let obj = {
                company_info: data.company_info,
                product_title: data.product_title,
                product_slug: data.slug,
                price: data.product_price_infos[sel_price_type_index].discount_price?data.product_price_infos[sel_price_type_index].discount_price:data.product_price_infos[sel_price_type_index].price,
                price_type_id: data.product_price_infos[sel_price_type_index].product_price_type_data.id,
                price_type: data.product_price_infos[sel_price_type_index].product_price_type_data.type_title,
                product_image: data.product_photo_infos[0]?data.product_photo_infos[0].product_photo_data.content:'',
                quantity: data.req_quantity?data.req_quantity:1,
                min_qty: data.product_price_infos[sel_price_type_index].min_qty,
                max_qty: data.product_price_infos[sel_price_type_index].max_qty
            }

            if(!state.cart_items[data.id]) state.cart_items[data.id] = {}
            state.cart_items[data.id][sel_price_type_id] = obj
        }

        let total = 0
        for(var index in state.cart_items){
            total += Object.keys(state.cart_items[index]).length
        }
        state.total_cart_items = total; //Object.keys(state.cart_items).length

        // Store to localstorage
        localStorage.setItem('cart_items', JSON.stringify(state.cart_items))
    },
    REMOVE_CART_ITEM (state, data) {
        delete state.cart_items[data.id][data.ptid]

        if(Object.keys(state.cart_items[data.id]).length==0) delete state.cart_items[data.id]

        state.total_cart_items = Object.keys(state.cart_items).length

        // Store to localstorage
        localStorage.setItem('cart_items', JSON.stringify(state.cart_items))
    },
    TOTAL_CART_AMOUNT (state) {
        let amount = 0
        for(var id in state.cart_items){
            for(var tid in state.cart_items[id]){
                amount = amount + (parseFloat(state.cart_items[id][tid].price) * parseInt(state.cart_items[id][tid].quantity))
            }
        }

        state.total_cart_amount = amount
    }
}

// Actions
export const actions = {}  