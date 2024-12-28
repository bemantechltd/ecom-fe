<template>
    <div class="footer_container">
        <div class="clearfix">
            <div class="float-left">
                <span class="version_info">CMS - v1.0.1</span>
            </div>
            <div class="float-right">
                <span class="dev_info">Developed by <a href="https://www.bemantech.com" target="_blank"><img src="~/assets/images/bemantech.png" /></a></span>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'FooterContainer'
}
</script>
<style>
    .footer_container{
        display: block;
        font-family: 'Courier New', Courier, monospace;
    }
    .dev_info{        
        font-size: 14px;
        color: #000
    }
    .dev_info img{
        width: auto;
        height: 15px;
    }
</style>
    