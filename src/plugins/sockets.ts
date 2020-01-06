import Vue from 'vue';
import VueSocketIOExt from 'vue-socket.io-extended';
import io from 'socket.io-client';
import store from '../store';
const socket = io('https://traviantactics.herokuapp.com');

Vue.use(VueSocketIOExt, socket, { store });

declare module 'vue/types/vue' {
    // 3. Declare augmentation for Vue
    interface VueConstructor {
        $socket: {
            client: { emit(...args: any[]): void; }
        };
    }
}
