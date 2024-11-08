
<template>
    <div :class="['invoice_detail_drawer_view_block',{mobile_device:$device.isMobile}]">
        <div class="black_mask_overlay" @click="$parent.close_order_invoice_block"></div>        
        <div class="content clearfix">
            <div class="print_btn" @click="printContent()">
                <i class="fa fa-print"></i>
            </div>
            <div id="main_content_block">
                <InvoiceContentInfoBlock :copy_for="1" />
                <InvoiceContentInfoBlock :copy_for="2" />
            </div>
        </div>        
    </div>
</template>
<script>
import InvoiceContentInfoBlock from './components/InvoiceContentInfo'
export default {
    name: 'InvoiceDrawerViewBlock',
    components: {
        InvoiceContentInfoBlock
    },
    computed: {
        app_name: function(){
            return process.env.APP_NAME
        },
        sel_data: function(){
            return this.$store.state.order_info.sel_data
        }
    },
    mounted(){
        document.body.classList.add('popup_open')
        // this.getDataList = this.data    
    },
    methods: {
        printContent: function(){
            // var printContents = document.getElementById('main_content_block').innerHTML;
            // var originalContents = document.body.innerHTML;

            // document.body.innerHTML = printContents;

            // window.print();

            // document.body.innerHTML = originalContents;

            // var divContents = document.getElementById("main_content_block").innerHTML;
            // var a = window.open('', '', 'height=500, width=500');
            // a.document.write('<html>');
            // a.document.write('<body > <h1>Div contents are <br>');
            // a.document.write(divContents);
            // a.document.write('</body></html>');
            // a.document.close();
            // a.print();

            const options = {
                name: '_blank',
                specs: [
                    'fullscreen=yes',
                    'titlebar=yes',
                    'scrollbars=yes'
                ],
                styles: [
                    process.env.BASE_URL + '/css/bootstrap.v4.2.1.min.css',
                    // process.env.BASE_URL + '/css/fontawesome.v5.15.2.all.css',
                    process.env.BASE_URL + '/css/invoice.print.css'
                ],
                timeout: 1000, // default timeout before the print window appears
                autoClose: false, // if false, the window will not close after printing
                windowTitle: window.document.title,
            }

            this.$htmlToPaper('main_content_block', options);
        }
    }
}
</script>
<style lang="scss" scoped>
    .invoice_detail_drawer_view_block{
        position: relative;
        z-index: 1001;
    }
    .black_mask_overlay{
        position: fixed;
        left: 0; bottom: 0;
        width: 100%; height: 100%;
        background-image: linear-gradient(to top, #000000cc, #66666680);
    }
    .content{
        position: fixed;
        color: #333;
        background-color: #fff;
        width: 850px;
        padding: 50px;
        height: 100%;
        overflow-y: auto;
        right: 0;
        top: 0;
        box-shadow: 0 0 15px #333;
        transition: all 0.4s;

        .print_btn{
            position: absolute;
            display: inline-block;
            text-align: center;
            width: 46px; height: 46px; line-height: 46px;
            right: 15px; top: 15px;
            border-radius: 50%;
            color: #fff;
            background-color: $sys_brand_color;
            cursor: pointer;
            transition: all 0.4s;

            &:hover{
                background-color: #CD0000;
            }
        }
    }
    .mobile_device .content{
        width: 300px;
    }    
</style>