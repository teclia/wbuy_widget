<template>
    <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-20">
        <div class="bg-white rounded-lg shadow-lg p-6 w-11/12 max-w-md text-left">
            <h2 class="text-xl font-semibold mb-4">Tem certeza de que deseja encerrar esta conversa?</h2>
            <p class="text-sm text-gray-500 mb-6">Todo o histórico de mensagens será apagado.</p>
            <div class="flex justify-center gap-4 text-sm">
                <button @click="$emit('confirm')" class="bg-rose-500 text-white px-4 py-2 rounded-lg">Sim, encerrar</button>
                <button @click="$emit('cancel')" class="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg">Não</button>
            </div>
        </div>
    </div>
</template>
