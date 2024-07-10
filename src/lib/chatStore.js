import { doc, getDoc } from 'firebase/firestore'
import { create } from 'zustand'
import { db } from "./firebase.config"
import { useUserStore } from './userStore'
export const useChatStore = create((set) => ({
    chatId: null,
    user: null,
    isCurrentUserBlocked: false,
    isReceiverBlocked: false,
    changeChat: (chatId, user) => {
        const currentUser = useUserStore.getState().currentUser;
        //CHECK IF CURRENT USER IS BLOCKED
        if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            })
        }

        // CHECK IF RECEIVE IS BLOCKED
        // eslint-disable-next-line no-dupe-else-if
        else if (user.blocked.includes(currentUser.id)) {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: false,
                isReceiverBlocked: true,
            })
        }
        else {
            return set({
                chatId,
                user,
                isCurrentUserBlocked: true,
                isReceiverBlocked: false,
            })
        }
    },
    changeBlock: () => {
        set(state => ({
            ...state, isReceiverBlocked: !state.isCurrentUserBlocked
        }))
    }

}))