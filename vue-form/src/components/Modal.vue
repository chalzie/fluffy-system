<template>
    <transition name="show-transition">
        <div class="modal-container" v-show="showModal">
            <div class="modal" v-show="showModal">
                <font-awesome-icon icon="fa-solid fa-circle-check" size=6x color="#17ba87" />
                <h1>Success registration</h1>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio nemo corporis, aliquam a magni dicta fugit soluta eligendi at id perferendis perspiciatis praesentium sunt optio odit quasi debitis, explicabo impedit?</p>
            </div>
        </div>
    </transition>
</template>

<script>
export default {
    name: "Modal",
    props: {
        showModal: {
            type: Boolean,
            required: true
        }
    }
}
</script>

<style lang="scss" scoped>
.modal-container {
    position: absolute;
    width: 874px;
    height: 887px;
    z-index: 10;
    left: 0;
    top: 0;
    overflow: hidden;
    background-color: rgb(0,0,0);
    background-color: rgb(255,255,255);
    border-radius: 20px;
}

.modal {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    background-color: #fefefe;
    margin: 0 auto;
    padding-top: 224px;
    width: 80%;
}

h1 {
    width: 400px;
    font-size: 3em;
    margin-bottom: 15px;
}
p {
    width: 500px;
    line-height: 2em;
    color: #76879e;
}

.show-transition-enter-active {
    animation: show 0.2s;
}

.show-transition-leave-active {
    animation: show 0.2s reverse;
}

@keyframes show {
    0% {
        transform: scale(100%, 0%);
    }
    100% {
        transform: scale(100%, 100%);
    }
}

@media screen and (max-width: 890px) {
    .modal-container{
        width: 335px;
        height: 951px;

        p {
            width: 300px;
        }
    }
}
</style>