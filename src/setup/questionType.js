import {onMounted, onUnmounted, ref, watchEffect} from "vue";
import axios from "axios"
import _ from 'loadsh'

export default function getQuestionType() {
    const width = {
        bodywidth: document.body.clientWidth + 'px',
        searchwidth: document.body.clientWidth * 0.7 + 'px',
        btnwidth: document.body.clientWidth * 0.7 + 'px',
    }
    const tiku = ref('angui')
    const querymethod = ref('index')
    const qtype = ref(['single','muti','judge'])
    const questions = ref([])
    const searchc = ref('')
    const axisopost = () => {
        axios({
            method: 'post', url: '/api/search?', params: {
                type: qtype.value.toString()
            }, data: {
                que: searchc.value,
                source: tiku.value,
                method: querymethod.value
            }
        }).then(response => {
            questions.value = response.data
        }).catch(res => {
            console.log(res)
        })
    }

    const search = _.debounce(axisopost, 500, {leading: false, trailing: true})
    const debouncecancel = () => {
        search.cancel()
    }

    const throttle = _.throttle(axisopost, 500, {leading: true, trailing: false})

    const stop = watchEffect(fn => {
        if (searchc.value.length >= 3) {
            throttle()
        }
        fn(() => {
            throttle.cancel()
        })
    })


    const clickSilder = () => {
        // 获取DOM元素
        let el = document.querySelector('#outer');
        if (el) {
            // chrome
            document.body.scrollTop = el.offsetTop;
            // firefox
            document.documentElement.scrollTop = el.offsetTop;
        }
    };

    onUnmounted(debouncecancel, stop)
    return {
        searchc, qtype, questions, search, clickSilder, width, tiku,querymethod
    }
}