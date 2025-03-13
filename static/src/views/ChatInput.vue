<template>
    <div class="bg-white p-1 fixed bottom-0 left-0 right-0 z-10">
        <div class="flex bg-gray-100 rounded-lg p-1 items-end gap-2">
            <textarea v-model="message" @input="resize" @keydown.enter.prevent="sendMessage" rows="1" ref="textarea"
                placeholder="Digite sua mensagem..."
                class="bg-gray-100 rounded-lg flex-1 resize-none p-2 ring-0 ring-gray-300 focus:ring-transparent focus:outline-none">
            </textarea>
            <button @click="sendMessage"
                class="bg-gray-500 hover:bg-gray-600 text-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300"
                style="width: 40px; height: 40px; min-width: 40px; min-height: 40px;">
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" id="send" class="icon glyph h-5 w-5"
                    fill="currentColor">
                    <path
                        d="M21.66,12a2,2,0,0,1-1.14,1.81L5.87,20.75A2.08,2.08,0,0,1,5,21a2,2,0,0,1-1.82-2.82L5.46,13H11a1,1,0,0,0,0-2H5.46L3.18,5.87A2,2,0,0,1,5.86,3.25h0l14.65,6.94A2,2,0,0,1,21.66,12Z"
                        style="fill:currentColor"></path>
                </svg>
            </button>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        modelValue: String,
    },
    emits: ["update:modelValue", "sendMessage", "resize"],
    computed: {
        message: {
            get() {
                return this.modelValue;
            },
            set(value) {
                this.$emit("update:modelValue", value);
            },
        },
    },
    methods: {
        sendMessage() {
            if (this.message.trim()) {
                this.$emit("sendMessage");
                this.message = "";
            }
        },
        resize() {
            const textarea = this.$refs.textarea;
            if (textarea) {
                textarea.style.height = "auto";
                const maxHeight = 4 * parseFloat(getComputedStyle(textarea).lineHeight);
                textarea.style.height = `${Math.min(textarea.scrollHeight, maxHeight)}px`;
                this.$emit("resize");
            }
        },
    },
};
</script>
