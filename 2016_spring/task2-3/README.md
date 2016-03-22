[**task2-3 Demo**](http://yenshih.com/ife/2016_spring/task2-3/dist/index.html)

# 任务十五：零基础JavaScript编码（三）

## 任务目的

 - 在上一任务基础上继续JavaScript的体验
 - 接触一下JavaScript中的高级选择器
 - 学习JavaScript中的数组对象遍历、读写、排序等操作
 - 学习简单的字符串处理操作

## 任务描述

 - 参考以下示例代码，读取页面上已有的source列表，从中提取出城市以及对应的空气质量
将数据按照某种顺序排序后，在resort列表中按照顺序显示出来

```html
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  </head>
<body>

  <ul id="source">
    <li>北京空气质量：<b>90</b></li>
    <li>上海空气质量：<b>70</b></li>
    <li>天津空气质量：<b>80</b></li>
    <li>广州空气质量：<b>50</b></li>
    <li>深圳空气质量：<b>40</b></li>
    <li>福州空气质量：<b>32</b></li>
    <li>成都空气质量：<b>90</b></li>
  </ul>

  <ul id="resort">
    <!-- 
    <li>第一名：北京空气质量：<b>90</b></li>
    <li>第二名：北京空气质量：<b>90</b></li>
    <li>第三名：北京空气质量：<b>90</b></li>
     -->

  </ul>

  <button id="sort-btn">排序</button>

<script type="text/javascript">

/**
 * getData方法
 * 读取id为source的列表，获取其中城市名字及城市对应的空气质量
 * 返回一个数组，格式见函数中示例
 */
function getData() {
  /*
  coding here
  */

  /*
  data = [
    ["北京", 90],
    ["北京", 90]
    ……
  ]
  */

  return data;

}

/**
 * sortAqiData
 * 按空气质量对data进行从小到大的排序
 * 返回一个排序后的数组
 */
function sortAqiData(data) {

}

/**
 * render
 * 将排好序的城市及空气质量指数，输出显示到id位resort的列表中
 * 格式见ul中的注释的部分
 */
function render(data) {

}

function btnHandle() {
  var aqiData = getData();
  aqiData = sortAqiData(aqiData);
  render(aqiData);
}


function init() {

  // 在这下面给sort-btn绑定一个点击事件，点击时触发btnHandle函数

}

init();

</script>
</body>
</html>
```

## 任务注意事项

 - 实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
 - 请注意代码风格的整齐、优雅
 - 代码中含有必要的注释
 - 建议不使用任何第三方库、框架
 - 示例代码仅为示例，可以直接使用，也可以完全自己重写

## 任务协作建议

 - 团队集中讨论，明确题目要求，保证队伍各自对题目要求认知一致
 - 各自完成任务实践
 - 交叉互相Review其他人的代码，建议每个人至少看一个同组队友的代码
 - 相互讨论，最后合成一份组内最佳代码进行提交

## 在线学习参考资料

 - [JavaScript入门篇](http://www.imooc.com/view/36)
 - [MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)