<template>
    <div class="fb_chat_block">
        <div id="fb-root"></div>
        <div id="fb-customer-chat" class="fb-customerchat"></div>
    </div>
</template>
<script>
export default {
    name: 'FBChatBlock',
    mounted() {
        var chatbox = document.getElementById('fb-customer-chat');
        chatbox.setAttribute("page_id", process.env.FB_PAGE_ID);
        chatbox.setAttribute("attribution", "biz_inbox");

        window.fbAsyncInit = function() {
            FB.init({
                appId     : process.env.FB_APP_ID,
                xfbml     : true,
                version   : 'v12.0'
            });
        };

        (function(d, s, id) {
            var js, fjs = d.getElementsByTagName(s)[0];
            if (d.getElementById(id)) return;
            js = d.createElement(s); js.id = id;
            js.src = 'https://connect.facebook.net/en_US/sdk/xfbml.customerchat.js';
            fjs.parentNode.insertBefore(js, fjs);
        }(document, 'script', 'facebook-jssdk'));
    }
}
</script>