<template>
    <div :class="['footer_block','mt-4',{mobile_device:$device.isMobile}]">
        <div class="footer-theme-bg"></div>
        <ContentFooterSection :current_route="$parent.current_route" />
        <BottomFooterSection />
        <FBChat />
    </div>
</template>
<script>
import ContentFooterSection from './ContentFooter'
import BottomFooterSection from './BottomFooter'
import FBChat from '@/components/chat/FBChat'
export default {
    name: 'FooterBlock',
    components: {
        ContentFooterSection,
        BottomFooterSection,
        FBChat
    }
}
</script>
<!-- <script>
    window.gdprCookieConsent = (function () {
        const COOKIE_VALUE = 1;
        const COOKIE_DOMAIN = 'mecommerce.rdcd.orangebd.com';

        function consentWithCookies() {
            hideCookieDialog();
            setCookie('RDCD e-Commerce_cookie_consent', COOKIE_VALUE, 7300);
        }

        function cookieExists(name) {
            return (document.cookie.split('; ').indexOf(name + '=' + COOKIE_VALUE) !== -1);
        }

        function hideCookieDialog() {
            const dialogs = document.getElementById('new-cookie-consent-container');

            if(dialogs) {
                dialogs.style.display = 'none';
            }
        }

        function setCookie(name, value, expirationInDays) {
            const date = new Date();
            date.setTime(date.getTime() + (expirationInDays * 24 * 60 * 60 * 1000));
            document.cookie = name + '=' + value
                + ';expires=' + date.toUTCString()
                + ';domain=' + COOKIE_DOMAIN
                + ';path=/';
        }

        if (cookieExists('RDCD e-Commerce_cookie_consent')) {
            hideCookieDialog();
        }

        const consentButton = document.getElementById('cookie-consent-button');
        const cancelButton = document.getElementById('cookie-cancel-button');

        if(consentButton) {
            consentButton.addEventListener('click', consentWithCookies);
        }

        if(cancelButton) {
            cancelButton.addEventListener('click', hideCookieDialog);
        }

        return {
            consentWithCookies: consentWithCookies,
            hideCookieDialog: hideCookieDialog
        };
    })();
</script> -->
<style lang="scss" scoped>
    .footer-theme-bg{
        display: block;
        width: 100%; height: 250px;
        background-image: url(.~assets/images/footer-theme-bg.png);
        background-size: cover;
        background-position: bottom center;
        background-repeat: no-repeat;
    }
    .mobile_device{
        .footer-theme-bg{
            height: 80px;
            // background-size: contain;
        }
    }
</style>
