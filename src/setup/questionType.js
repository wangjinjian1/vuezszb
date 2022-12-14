import {ref, watchEffect, watch, onMounted} from "vue";
import {onBeforeRouteLeave} from "vue-router";
import axios from "axios"
import _ from 'loadsh'

export default function getQuestionType() {
    const width = {
        bodywidth: document.body.clientWidth + 'px',
        searchwidth: document.body.clientWidth * 0.6 + 'px',
        btnwidth: document.body.clientWidth * 0.15 + 'px',
        optwidth: document.body.clientWidth * 0.8 + 'px',
    }
    const tiku = ref('angui')
    const querymethod = ref('index')
    const qtype = ref(['single', 'muti', 'judge', 'fill'])
    var info = JSON.parse(window.localStorage.getItem('angui'))
    if (info === null) {
        info = {}
        info['tiku'] = tiku.value
        info['querymethod'] = querymethod.value
        info['qtype'] = qtype.value
    } else {
        tiku.value = info.tiku
        querymethod.value = info.querymethod
        qtype.value = info.qtype
    }
    const input = ref('')
    const questions = ref([])
    const searchc = ref('')
    const axisopost = () => {
        axios({
            method: 'post', url: '/api/search?', params: {
                type: qtype.value.toString()
            }, data: {
                que: searchc.value, source: tiku.value, method: querymethod.value
            }
        }).then(response => {
            questions.value = response.data
        }).catch(res => {
            console.log(res)
        })
        input.value.focus()
    }
    const search = _.debounce(axisopost, 750, {leading: false, trailing: true})
    watchEffect(() => {
        if (searchc.value.startsWith('sqlmode') || searchc.value.startsWith('hxgd')) {
            return
        }
        if (searchc.value.length >= 3) {
            search()
        }
    })
    watch(tiku, (news, olds) => {
        info['tiku'] = tiku.value
        window.localStorage.setItem('angui', JSON.stringify(info))
        if (searchc.value === 'sqlmode' || searchc.value === 'hxgd') {
            return
        }
        if (searchc.value.length >= 3) {
            search()
        }
    })
    watch(querymethod, (news, olds) => {
        info['querymethod'] = querymethod.value
        window.localStorage.setItem('angui', JSON.stringify(info))
        if (searchc.value === 'sqlmode' || searchc.value === 'hxgd') {
            return
        }
        if (searchc.value.length >= 3) {
            search()
        }
    })
    watch(qtype, (news, olds) => {
        info['qtype'] = qtype.value
        window.localStorage.setItem('angui', JSON.stringify(info))
        if (searchc.value.startsWith('sqlmode') || searchc.value.startsWith('hxgd')) {
            return
        }
        if (searchc.value.length >= 3) {
            search()
        }
    })
    onMounted(() => {
        input.value.focus()
    })
    const clickSilder = () => {
        // ??????DOM??????
        let el = document.querySelector('#outer');
        if (el) {
            // chrome
            document.body.scrollTop = el.offsetTop;
            // firefox
            document.documentElement.scrollTop = el.offsetTop;
        }
    }
    const clear = () => {
        searchc.value = ''
        input.value.focus()
    }
    return {
        searchc, qtype, questions, search, clickSilder, width, tiku, querymethod, clear, input
    }
}