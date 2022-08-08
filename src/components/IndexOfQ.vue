<script setup>
import getQuestionType from "@/setup/questionType.js"

const {searchc, qtype, questions, search, clickSilder, width,tiku,querymethod,clear} = getQuestionType()
</script>

<template>
  <div class="outer" id="outer">
    <div class="title">{{'我爱学习'}}</div>
    <div class="checktype">
      检索类型
      <input type="checkbox" value="single" checked v-model="qtype">单选
      <input type="checkbox" value="muti" checked v-model="qtype">多选
      <input type="checkbox" value="judge" checked v-model="qtype">判断
      <input type="checkbox" value="fill" checked v-model="qtype">填空
    </div>
    <div class="checksource">
      检索题库
      <select v-model="tiku">
        <option disabled value="">请选择题库</option>
        <option value="angui">安规954</option>
        <option value="anquanc">安全等级C430</option>
        <option value="bigdata">SB大数据</option>
      </select>
    </div>
    <div>
      检索方式
      <select v-model="querymethod">
        <option disabled>检索方式</option>
        <option value="index">拼音首字母头部(3-9位，不带数字、字母、符号)</option>
        <option value="indexR">拼音首字母尾部(3-9位，不带数字、字母、符号)</option>
        <option value="regex">精确搜索(精确搜索带词)</option>
        <option value="fulltext">关键词(分词长度2，在题目、答案中搜索)</option>
      </select>
    </div>
    <div class="search">
      <input type="text" class="searchbox" v-model.trim="searchc" @keydown.enter="search">
      <button class="btnS" @click="search">搜索</button>
      <button class="btnC" @click="clear">清空</button>
    </div>
    <div class="que">
      <ul class="ul">
        <li v-for="value in questions">
          <div class="q">{{ value.q }}</div>
          <div class="a" v-for="opt in  value.a">{{ opt }}</div>
        </li>
      </ul>
    </div>
    <div class="up" @click="clickSilder">^</div>
  </div>
</template>

<style scoped>
.title{
  font-size: 20px;
  text-align: center;
  color: cornflowerblue;
  font-weight: bolder;
}
.outer {
  /*width: 370px;*/
  width: v-bind(width.bodywidth);
  display: flex;
  flex-direction: column;
}

.search {
  display: block;
}

.searchbox {
  width: v-bind(width.searchwidth);
  height: 20px;
  border-color: green;
}
.btnS {
  width: v-bind(width.btnwidth);
  height: 28px;
  margin-left: 3px;
  border-color: green;
  border-radius: 15px;
}
.btnC {
  width: v-bind(width.btnwidth);
  height: 28px;
  margin-left: 3px;
  border-color: green;
  border-radius: 15px;
}

.ul {
  list-style-type: none;
  list-style-position: outside;
  margin: 0;
  padding: 0;
}

.q {
  background-color: antiquewhite;
}

.a {
  background-color: azure;
}
select{
  width: v-bind(width.optwidth);
  color: black;
  border-color: blueviolet;
}


.up {
  width: 40px;
  height: 40px;
  position: fixed;
  right: 30px;
  bottom: 100px;
  font-size: 40px;
  text-align: center;
  color: green;
  border: 1px solid silver;
}

</style>
