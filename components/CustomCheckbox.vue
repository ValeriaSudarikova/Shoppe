<template>
    <label class="footer-top-form-checkbox">
        <div class="footer-top-form-checkbox-box">
            <input
                v-model="model"
                type="checkbox"
                class="footer-top-form-checkbox-box-default"
            />
            <span class="footer-top-form-checkbox-box-custom"></span>
        </div>
        i agree to the website’s terms and conditions
    </label>
</template>

<script setup lang="ts">
const model = defineModel<boolean>();
</script>

<style lang="scss">
.footer-top-form-checkbox {
    @include t-small(#000);
    position: absolute;
    bottom: -28px;
    display: flex;
    align-items: center;

    &-box {
        position: relative;
        flex: 0 0 auto;
        margin-right: 4px;
        width: 14px;
        height: 14px;

        &-default {
            position: absolute;
            clip: rect(0, 0, 0, 0);
            width: 1px;
            height: 1px;
        }

        &-custom {
            position: absolute;
            top: 0;
            left: 0;
            bottom: 0;
            right: 0;
            border: 1px solid #707070;
            border-radius: 2px;
            cursor: pointer;
        }

        &-default:checked + &-custom {
            border: 1px solid #a18a68;
            background: url('@/assets/images/icons/check.svg') 50% 50% no-repeat #a18a68;
        }
    }
}
</style>
