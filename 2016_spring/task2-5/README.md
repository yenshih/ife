[**task2-5 Demo**](http://yenshih.com/ife/2016_spring/task2-5/dist/index.html)

# 任务十七：零基础JavaScript编码（五）

## 任务目的

 - 在上一任务基础上继续JavaScript的体验
 - 接触更加复杂的表单对象
 - 实现页面上的一个完整交互功能
 - 用DOM实现一个柱状图图表

## 任务描述

 - 参考以下示例代码，原始数据包含几个城市的空气质量指数数据
 - 用户可以选择查看不同的时间粒度，以选择要查看的空气质量指数是以天为粒度还是以周或月为粒度
   + 天：显示每天的空气质量指数
   + 周：以自然周（周一到周日）为粒度，统计一周7天的平均数为这一周的空气质量数值，如果数据中缺少一个自然周的几天，则按剩余天进行计算
   + 月：以自然月为粒度，统一一个月所有天的平均数为这一个月的空气质量数值
 - 用户可以通过select切换城市
 - 通过在"aqi-chart-wrap"里添加DOM，来模拟一个柱状图图表，横轴是时间，纵轴是空气质量指数，参考图（点击打开）。天、周、月的数据只根据用户的选择显示一种。
   + 天：每天的数据是一个很细的矩形
   + 周：每周的数据是一个矩形
   + 月：每周的数据是一个很粗的矩形
 - 鼠标移动到柱状图的某个柱子时，用title属性提示这个柱子的具体日期和数据

### task.html

```html
<!DOCTYPE>
<html>
  <head>
    <meta charset="utf-8">
    <title>IFE JavaScript Task 01</title>
    <script src="task.js"></script>
  </head>
<body>
  <fieldset id="form-gra-time">
    <legend>请选择日期粒度：</legend>
    <label>日<input name="gra-time" value="day" type="radio" checked="checked"></label>
    <label>周<input name="gra-time" value="week" type="radio"></label>
    <label>月<input name="gra-time" value="month" type="radio"></label>
  </fieldset>

  <fieldset>
    <legend>请选择查看的城市：</legend>
    <select id="city-select">
      <option>北京</option>
    </select>
  </fieldset>

  <div class="aqi-chart-wrap">
  </div>
</body>
</html>
```

```javascript
task.js

/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 

  // 设置对应数据

  // 调用图表渲染函数
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {

}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项

  // 给select设置事件，当选项发生变化时调用函数citySelectChange

}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
}

init();
```

## 任务注意事项

 - 实现简单功能的同时，请仔细学习JavaScript基本语法、事件、DOM相关的知识
 - 请注意代码风格的整齐、优雅
 - 代码中含有必要的注释
 - 示例图仅为参考，不需要完全一致
 - 点击select或者radio选项时，如果没有发生变化，则图表不需要重新渲染
 - 建议不使用任何第三方库、框架
 - 示例代码仅为示例，可以直接使用，也可以完全自己重写

## 任务协作建议

 - 如果是各自工作，可以按以下方式：
   + 团队集中讨论，明确题目要求，保证队伍各自对题目要求认知一致
   + 各自完成任务实践
   + 交叉互相Review其他人的代码，建议每个人至少看一个同组队友的代码
   + 相互讨论，最后合成一份组内最佳代码进行提交
 - 如果是分工工作（推荐），可以按以下模块切分
   + 基础图表部分
   + 选择天的处理逻辑
   + 选择周的处理逻辑
   + 选择月的处理逻辑
   + 切换城市时的处理逻辑

## 在线学习参考资料

 - [JavaScript入门篇](http://www.imooc.com/view/36)
 - [MDN JavaScript](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript)