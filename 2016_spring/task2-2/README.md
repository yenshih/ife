# 任务十四：零基础JavaScript编码（二）

## 任务目的

 - 在上一任务基础上继续JavaScript的体验
 - 学习JavaScript中的if判断语法，for循环语法
 - 学习JavaScript中的数组对象
 - 学习如何读取、处理数据，并动态创建、修改DOM中的内容

## 任务描述

 - 参考以下示例代码，页面加载后，将提供的空气质量数据数组，按照某种逻辑（比如空气质量大于60）进行过滤筛选，最后将符合条件的数据按照一定的格式要求显示在网页上

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  </head>
<body>

  <h3>污染城市列表</h3>
  <ul id="aqi-list">
<!--   
    <li>第一名：福州（样例），10</li>
    <li>第二名：福州（样例），10</li> -->
  </ul>

<script type="text/javascript">

var aqiData = [
  ["北京", 90],
  ["上海", 50],
  ["福州", 10],
  ["广州", 50],
  ["成都", 90],
  ["西安", 100]
];

(function () {

  /*
  在注释下方编写代码
  遍历读取aqiData中各个城市的数据
  将空气质量指数大于60的城市显示到aqi-list的列表中
  */

})();

</script>
</body>
</html>
```

## 任务注意事项

 - 实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
 - 请注意代码风格的整齐、优雅
 - 代码中含有必要的注释
 - 其中的数据以及60的判断逻辑可以自行设定
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