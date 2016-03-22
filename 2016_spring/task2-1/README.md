[**task2-1 Demo**](http://yenshih.com/ife/2016_spring/task2-1/dist/index.html)

# 任务十三：零基础JavaScript编码（一）

## 任务目的

 - JavaScript初体验
 - 初步明白JavaScript的简单基本语法，如变量、函数
 - 初步了解JavaScript的事件是什么
 - 初步了解JavaScript中的DOM是什么

## 任务描述

 - 参考以下示例代码，补充其中的JavaScript功能，完成一个JavaScript代码的编写
 - 本任务完成的功能为：用户可以在输入框中输入任何内容，点击“确认填写”按钮后，用户输入的内容会显示在“您输入的值是”文字的右边

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
  </head>
<body>

  <label>请输入北京今天空气质量：<input id="aqi-input" type="text"></label>
  <button id="button">确认填写</button>

  <div>您输入的值是：<span id="aqi-display">尚无录入</span></div>

<script type="text/javascript">

(function() {
  /*    
  在注释下方写下代码
  给按钮button绑定一个点击事件
  在事件处理函数中
  获取aqi-input输入的值，并显示在aqi-display中
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
 - 可以不考虑输入的合法性
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