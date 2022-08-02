<script setup>
import { reactive, ref } from 'vue'
import Common from '@/components/Common/CommonComponent.vue'


const url = '/api/memos';
let isLoading = ref(true);

// 단일 데이터
let refTest = ref('내용 적용하기')

// 여러 데이터
const state = reactive({
    data: {}
})


// 저장된 내용 가져오기
try {

    axiosLoad();

} catch(err) {
    console.log(err);
}

async function listDelete(item) {

    await axios.post(this.url + '/delete', item)
    .then(res => {

        if(res.data.code === 'y') axiosLoad(); 

    })
    .catch(err => {console.log(err)});
}

// 저장된 메모 불러오기
async function axiosLoad() {

    await axios.post(url + '/read')
    .then(res => {
        state.data = res.data.data;
        setTimeout(() => {
            isLoading.value = false;
        }, 2000)
    })
    .catch(err => {console.log(err)});
}




</script>

<template>
    <Common v-if="isLoading" />
    <section id="main_contents_component">
        <div class="button_wrap">
            <button @click="modal()">+ 추가하기</button>
            
        </div>
        

        <div class="modal" v-if="modalOn">
            <input type="text" v-model="title" placeholder="제목을 입력해주세요." />
            <textarea type="text" placeholder="내용을 입력해주세요." v-model="contents"></textarea>
            <button @click="memoAdd(title, contents)">{{refTest}}</button>
        </div>
        <div class="bg_color" v-if="modalOn" @click="modal()"></div>
        <ul>
            <li v-for="(item, index) of state.data" :key="'a' + index">
                <a href="javascript:void(0)" @click="listModdal(item)">{{item.title}}</a>
                <a href="javascript:void(0)" @click="listDelete(item)">Delete</a>
            </li>
        </ul>

        <div class="list_modal" v-if="listModalOn">
            <div class="modal_close" @click="modalClose()"><img src="@/assets/styles/icons/close.svg" alt="닫기" /></div>
            <div class="modal_title" ref="modal_height">{{items.data[0].title}}</div>
            <div class="modal_create" ref="modal_create" v-if="today">{{this.$dayjs(items.data[0].createdAt).fromNow()}}</div>
            <div class="modal_create" ref="modal_create" v-if="!today">{{this.$dayjs(items.data[0].createdAt).format('YYYY-MM-DD HH:mm:ss')}}</div>
            <div class="modal_contents" id="modal_contents">{{items.data[0].contents}}</div>
        </div>
        <div class="bg_color" v-if="listModalOn" @click="modalClose()"></div>
    </section>
</template>

<script>
import axios from 'axios';


export default {
    setup() {

        // const memoAdd = (title, contents) => {
        //     let items = {
        //         title: title,
        //         contents: contents
        //     };

        //     axios.post(url + '/create', items)
        //     .then(res => {
        //         console.log(res);
        //     });
        //     this.modalOn = false;
        // }

        return {
            // memoAdd
        }
    },
    data() {
        let modalOn = false;
        let listModalOn = false;
        let items;
        return {
            modalOn,
            listModalOn,
            items
        }
    },
    methods: {
        modal() {
            if(this.modalOn === true) {
                this.modalOn = false;
            } else {
                this.modalOn = true;
            }
        },
        async memoAdd(title, contents) {

            let items = {
                title: title,
                contents: contents
            };

            await axios.post(this.url + '/create', items)
            .then(res => {
                this.axiosLoad();
                if(res.data.code === 'y') {
                    this.title = '';
                    this.contents = '';
                    this.modalOn = false;
                }
            })
            .catch(err => {console.log(err)});
        },
        async listModdal(item) {
            await axios.post(this.url + '/single', item)
            .then(res => {
                let date = this.$dayjs(new Date()).format('YYYY-DD-MM')
                let createdDate = this.$dayjs(res.data.data[0].createdAt).format('YYYY-DD-MM')
                if( date === createdDate) this.today = true; else this.today = false;
                this.items = res.data;
                this.listModalOn = true;
                this.$nextTick(() => {
                    let modalHeight = this.$refs.modal_height.clientHeight;
                    let createHeight = this.$refs.modal_create.clientHeight;
                    let modalContents = document.getElementById('modal_contents');
                    
                    modalContents.style.height = `calc(100% - ${modalHeight}px - ${createHeight}px)`;
                })
            })
            .catch(err => {console.log(err)});
        },
        modalClose() {
            this.listModalOn = false;
        },

    },
    updated() {
    },
    mounted() {
    },
}
</script>

<style lang="scss" scoped>
@import '@/assets/styles/main/contents.scss';

</style>