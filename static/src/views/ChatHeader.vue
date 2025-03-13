<template>
    <div class="flex items-center px-4 h-[60px] shadow-md fixed top-0 left-0 right-0 z-10" :style="{
        background: `linear-gradient(180deg, ${headerGradientStart}, ${headerGradientEnd})`,
        color: headerTextColor
    }">
        <div class="relative">
            <img :src="avatar" alt="Avatar" class="w-10 h-10 rounded-full" />
            <div class="absolute top-0 right-0 w-3 h-3 bg-green-500 border-white border-2 rounded-full"></div>
        </div>
        <div class="ml-4 flex flex-col justify-center">
            <h2 class="text-lg font-semibold">{{ title }}</h2>
            <span v-if="isTyping" class="text-xs mt-0">Digitando...</span>
            <span v-else class="text-xs mt-0">ONLINE</span>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        title: String,
        avatar: String,
        isTyping: Boolean,
        headerGradientStart: String,
        headerGradientEnd: String,
        headerTextColor: String,
    },
};
</script>
