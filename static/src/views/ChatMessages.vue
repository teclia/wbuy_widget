<template>
    <div class="flex-1 mt-[60px] overflow-y-auto p-4 pb-12" :style="{
        background: `linear-gradient(180deg, ${backgroundGradientStart}, ${backgroundGradientEnd})`,
    }">
    <div v-if="messages.length === 0" class="flex flex-col items-center justify-center h-full text-center">

<svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"
    class="w-16 h-16 mb-4 text-slate-600">
    <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
    <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
    <g id="SVGRepo_iconCarrier">
        <path
            d="M13.1318 11.3125L12.7388 10.7333L12.7388 10.7333L13.1318 11.3125ZM4.98688 10.3431L4.31382 10.5354L4.31382 10.5354L4.98688 10.3431ZM4.44847 8.45868L3.77541 8.65098L3.77541 8.65098L4.44847 8.45868ZM2.33917 9.0235L3.01827 8.85373L3.01827 8.85372L2.33917 9.0235ZM3.89881 15.262L4.57791 15.0923L4.57791 15.0923L3.89881 15.262ZM13.7445 21C13.7445 21.3866 14.0579 21.7 14.4445 21.7C14.8311 21.7 15.1445 21.3866 15.1445 21H13.7445ZM15.1445 18.3333C15.1445 17.9467 14.8311 17.6333 14.4445 17.6333C14.0579 17.6333 13.7445 17.9467 13.7445 18.3333H15.1445ZM18.5 10V9.3C18.3618 9.3 18.2267 9.34091 18.1117 9.41756L18.5 10ZM15.5 10H16.2C16.2 9.6134 15.8866 9.3 15.5 9.3V10ZM15.5 12H14.8C14.8 12.2582 14.9421 12.4954 15.1697 12.6172C15.3973 12.739 15.6735 12.7256 15.8883 12.5824L15.5 12ZM10.889 11.3C9.06642 11.3 7.58896 9.82255 7.58896 8.00001H6.18896C6.18896 10.5958 8.29322 12.7 10.889 12.7V11.3ZM7.58896 8.00001C7.58896 6.17746 9.06642 4.7 10.889 4.7V3.3C8.29322 3.3 6.18896 5.40427 6.18896 8.00001H7.58896ZM10.889 4.7C12.7115 4.7 14.189 6.17746 14.189 8.00001H15.589C15.589 5.40427 13.4847 3.3 10.889 3.3V4.7ZM14.189 8.00001C14.189 9.13616 13.6154 10.1386 12.7388 10.7333L13.5248 11.8918C14.769 11.0477 15.589 9.61973 15.589 8.00001H14.189ZM12.7388 10.7333C12.2115 11.091 11.5757 11.3 10.889 11.3V12.7C11.8647 12.7 12.7728 12.4019 13.5248 11.8918L12.7388 10.7333ZM18.2555 21V18.7778H16.8555V21H18.2555ZM12.6666 13.1889H9.68766V14.5889H12.6666V13.1889ZM5.65995 10.1508L5.12154 8.26637L3.77541 8.65098L4.31382 10.5354L5.65995 10.1508ZM1.66007 9.19328L3.21971 15.4318L4.57791 15.0923L3.01827 8.85373L1.66007 9.19328ZM3.21971 15.4318C3.48767 16.5037 4.45071 17.2556 5.55553 17.2556V15.8556C5.09312 15.8556 4.69006 15.5409 4.57791 15.0923L3.21971 15.4318ZM3.39853 6.9667C2.23273 6.9667 1.37732 8.06229 1.66007 9.19328L3.01827 8.85372C2.95643 8.60634 3.14353 8.3667 3.39853 8.3667V6.9667ZM5.12154 8.26637C4.90174 7.49708 4.1986 6.9667 3.39853 6.9667V8.3667C3.57353 8.3667 3.72733 8.48271 3.77541 8.65098L5.12154 8.26637ZM9.68766 13.1889C7.81741 13.1889 6.17375 11.9491 5.65995 10.1508L4.31382 10.5354C4.99934 12.9347 7.19234 14.5889 9.68766 14.5889V13.1889ZM18.2555 18.7778C18.2555 15.6911 15.7533 13.1889 12.6666 13.1889V14.5889C14.9801 14.5889 16.8555 16.4643 16.8555 18.7778H18.2555ZM15.1445 21V18.3333H13.7445V21H15.1445ZM14.5 3.7H19.5V2.3H14.5V3.7ZM20.8 5V8H22.2V5H20.8ZM19.5 9.3H18.5V10.7H19.5V9.3ZM15.5 9.3H14V10.7H15.5V9.3ZM18.1117 9.41756L15.1117 11.4176L15.8883 12.5824L18.8883 10.5824L18.1117 9.41756ZM16.2 12V10H14.8V12H16.2ZM20.8 8C20.8 8.71797 20.218 9.3 19.5 9.3V10.7C20.9912 10.7 22.2 9.49117 22.2 8H20.8ZM19.5 3.7C20.218 3.7 20.8 4.28203 20.8 5H22.2C22.2 3.50883 20.9912 2.3 19.5 2.3V3.7ZM14.5 2.3C13.3671 2.3 12.3988 2.99751 11.9979 3.98386L13.2949 4.51098C13.4887 4.03415 13.9562 3.7 14.5 3.7V2.3Z"
            fill="currentColor"></path>
        <circle cx="16.5" cy="6.5" fill="currentColor" r="0.5"></circle>
        <circle cx="18.5" cy="6.5" fill="currentColor" r="0.5"></circle>
    </g>
</svg>

<p class="text-lg font-semibold text-slate-600">Nenhuma mensagem por aqui!</p>
<p class="text-sm text-slate-500">Envie a primeira mensagem para começar a conversa.</p>
</div>
        <div v-else>
            <div v-for="(message, index) in messages" :key="message.id" class="space-y-2"
                :style="{ color: textColorMessages }">
                <div v-if="isNewDay(index)" class="text-center text-xs text-gray-400 my-2">
                    {{ formatDate(message.timestamp) }}
                </div>
                <div class="flex items-start" :class="{
                    'mt-6': shouldShowAvatarAndName(index),
                    'mt-2': !shouldShowAvatarAndName(index),
                }">
                    <div class="w-8 mr-2">
                        <img v-if="shouldShowAvatarAndName(index)" :src="message.avatar || defaultAvatar"
                            alt="Avatar" class="w-8 h-8 rounded-full" />
                    </div>
                    <div>
                        <p v-if="shouldShowAvatarAndName(index)" class="text-sm font-semibold">
                            {{ message.name }}
                        </p>
                        <div class="shadow-lg p-2 rounded-b-lg rounded-tr-lg max-w-xs break-words" :style="{
                            background: message.sender === 'user'
                                ? `linear-gradient(18deg, ${balloonUserStyles.gradientStart}, ${balloonUserStyles.gradientEnd})`
                                : `linear-gradient(18deg, ${balloonAgentStyles.gradientStart}, ${balloonAgentStyles.gradientEnd})`,
                            color: message.sender === 'user'
                                ? balloonUserStyles.textColor
                                : balloonAgentStyles.textColor,
                        }">
                            <div v-html="message.text"></div>
                            <p class="text-xs text-right">{{ formatDateMessage(message.timestamp) }}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div v-if="isTyping" class="flex items-start mt-4 mb-6">
            <div class="w-8 mr-2"></div>
            <div class="shadow-lg border p-2 rounded-full rounded-tl-sm max-w-xs w-[80px] h-[40px] flex justify-center items-center"
                :style="{
                    background: `linear-gradient(180deg, ${balloonAgentStyles.gradientStart}, ${balloonAgentStyles.gradientEnd})`,
                    color: balloonAgentStyles.textColor,
                }">
                <img src="/img/loading.gif" class="h-6 w-6">
            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        messages: Array,
        isTyping: Boolean,
        backgroundGradientStart: String,
        backgroundGradientEnd: String,
        textColorMessages: String,
        balloonUserStyles: Object,
        balloonAgentStyles: Object,
        defaultAvatar: String,
    },
    methods: {
        isNewDay(index) {
            if (index === 0) return true;
            const prev = new Date(this.messages[index - 1].timestamp);
            const curr = new Date(this.messages[index].timestamp);
            return prev.toDateString() !== curr.toDateString();
        },
        formatDate(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" });
        },
        formatDateMessage(timestamp) {
            const date = new Date(timestamp);
            return date.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
        },
        shouldShowAvatarAndName(index) {
            if (index === 0) return true;
            const current = this.messages[index];
            const previous = this.messages[index - 1];
            return current.name !== previous.name;
        },
    },
};
</script>
