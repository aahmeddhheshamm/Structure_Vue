import { defineStore } from "pinia";
import type {UserDataResponse} from "@/types/UserData.ts";


interface AuthState {
    userData: UserDataResponse | null;
    token: string | null;
    isAuthenticated: boolean;
}

export const useAuthStore = defineStore("auth", {
    state: (): AuthState => ({
        token: null,
        userData: null,
        isAuthenticated: false,
    }),

    getters: {
        username(state) {
            return `${state.userData?.username}`;
        },
        userId(state) {
            return state.userData?.id;
        },
    },

    actions: {
        setToken(token: string) {
            this.token = token;
            localStorage.setItem("token", token);
        },

        setUserData(user: UserDataResponse) {
            this.userData = user;
            this.isAuthenticated = true;
        },

        async logout() {
            try {
                // const response = await apiLogout();
                this.clearAuth();
                // return response;
            } catch (e) {
                throw e;
            }
        },

        clearAuth() {
            this.userData = null;
            this.token = null;
            this.isAuthenticated = false;
            localStorage.removeItem("token");
        },
    },
});
