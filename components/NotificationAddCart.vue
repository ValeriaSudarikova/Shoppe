<template>
    <transition>
        <div v-if="notificationId === item.id" class="notification">
            <div class="notification-message">
                <img
                    src="@/assets/images/icons/checked.svg"
                    alt="checked"
                    class="notification-message-img"
                />
                <span class="notification-message-text"
                    >The item added to your Shopping bag.</span
                >
            </div>
            <NuxtLink to="/shop" class="notification-link">VIEW CART</NuxtLink>
        </div>
    </transition>
</template>

<script setup lang="ts">
interface Props {
    item: {
        id: number;
    };
    notificationId: number | null;
}

defineProps<Props>();
</script>

<style lang="scss">
.notification {
    position: fixed;
    z-index: 10;
    top: 20px;
    left: 0;
    right: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    border-radius: 8px;
    width: calc(100% - 30px);
    max-width: 1250px;
    padding: 24px 24px 24px 40px;
    background-color: #efefee;

    @media (max-width: $breakpoints-m) {
        padding: 14px 14px 14px 30px;
    }

    @media (max-width: $breakpoints-s) {
        padding: 10px 10px 10px 15px;
    }

    &-message {
        display: flex;
        align-items: center;

        &-text {
            @include h5(#000);
            margin: 0 16px;

            @media (max-width: $breakpoints-m) {
                font-size: 14px;
            }

            @media (max-width: $breakpoints-s) {
                margin: 0 10px;
                font-size: 12px;
                line-height: 20px;
            }
        }
    }

    &-link {
        @include t-large(#a18a68);
        @extend %trans;

        &:hover,
        &:active {
            @extend %trans;
            color: #000;
        }

        @media (max-width: $breakpoints-m) {
            @include t-medium(#a18a68);
        }

        @media (max-width: $breakpoints-s) {
            font-size: 12px;
        }
    }
}

.v-enter-active,
.v-leave-active {
    transition: all 0.5s ease;
}

.v-enter-from {
    transform: translateY(-100%);
}

.v-enter-to {
    transform: translateY(0%);
}

.v-leave-to {
    transform: translateY(-100%);
}
</style>
