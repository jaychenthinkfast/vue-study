<template>
    <div>
        <h1 @click="add">{{ count }}</h1>
    </div>
    <div>
        <input type="text" v-model="title" @keydown.enter="addTodo" />
        <button v-if="active < all" @click="clear">清理</button>
        <ul v-if="todos.length">
            <transition-group name="flip-list" tag="ul">
                <li v-for="todo in todos" :key="todo.title">
                    <input type="checkbox" v-model="todo.done" />
                    <span :class="{ done: todo.done }"> {{ todo.title }}</span>
                </li>
            </transition-group>
        </ul>
        <div v-else>暂无数据</div>
        <div>
            全选<input type="checkbox" v-model="allDone" />
            <span> {{ active }} / {{ all }} </span>
        </div>
    </div>
    <transition name="modal">
        <div class="info-wrapper" v-if="showModal">
            <div class="info"> 哥，你啥也没输入！ </div>
        </div>
    </transition>
</template>

<script setup>
import { ref, computed } from "vue";
import { useMouse } from '../utils/mouse'

let { x, y } = useMouse()

let count = ref(1)
let color = ref("red");
function add() {
    count.value++
    color.value = Math.random() > 0.5 ? "blue" : "red"
}

let { title, todos, addTodo, clear, active, all, allDone, showModal } = useTodos();
function useTodos() {
    let showModal = ref(false)
    let title = ref("");
    let todos = ref([{ title: "学习Vue", done: false }]);
    function addTodo() {
        debugger
        if (!title.value) {
            showModal.value = true
            setTimeout(() => {
                showModal.value = false
            }, 1500)
            return
        }
        todos.value.push({
            title: title.value,
            done: false,
        }); title.value = "";
    }
    function clear() {
        todos.value = todos.value.filter((v) => !v.done);
    }
    let active = computed(() => todos.value.filter((v) => !v.done).length);
    let all = computed(() => todos.value.length);
    let allDone = computed({
        get: function () {
            return active.value === 0;
        },
        set: function (value) {
            todos.value.forEach((todo) => {
                todo.done = value;
            });
        },
    });
    return { title, todos, addTodo, clear, active, all, allDone, showModal };
}
</script>


<style scoped>
h1 {
    color: v-bind(color);
}



.info-wrapper {
    position: fixed;
    top: 20px;
    width: 200px;
}

.info {
    padding: 20px;
    color: white;
    background: #d88986;
}

.flip-list-move {
    transition: transform 0.8s ease;
}

.flip-list-enter-active,
.flip-list-leave-active {
    transition: all 1s ease;
}

.flip-list-enter-from,
.flip-list-leave-to {
    opacity: 0;
    transform: translateX(30px);
}
</style>




<style>
.modal-enter-from {
    opacity: 0;
    transform: translateY(-60px);
}

.modal-enter-active {
    transition: all 0.3s ease;
}

.modal-leave-to {
    opacity: 0;
    transform: translateY(-60px);
}

.modal-leave-active {
    transition: all 0.3s ease;
}
</style>