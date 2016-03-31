[**task1-8 Demo**](http://yenshih.com/ife/2016_spring/task1-8/dist/index.html)

# 任务八：响应式网格（栅格化）布局

## 任务目的

 - 使用 HTML 与 CSS 实现类似 [BootStrap 的响应式12栏网格布局](http://v4-alpha.getbootstrap.com/layout/grid/) ，根据屏幕宽度，元素占的栏数不同。

## 任务描述

 - 需要实现如 [效果图](http://7xrp04.com1.z0.glb.clouddn.com/task_1_8_1.png) 所示，调整浏览器宽度查看响应式效果，效果图中的红色的文字是说明，不需要写在 HTML 中。

## 任务注意事项

 - 网格布局的作用在于更有效地控制元素在网页中所占比例的大小。比如，博客中有一个留言板模块，在比较大的屏幕上，我们希望它占了右边 25% 的宽度，在手机等比较小的屏幕上，我们希望它占 100% 的宽度，出现在博客文章下方。网格布局是一种实现这一需求的办法，它的好处是，把所有的宽度分为固定栏数（常用 12 栏），从而更高效的控制元素宽度。而这功能，我们使用 HTML 和 CSS 就能实现了。
 - 以 BootStrap 的网格系统为例，DOM 元素类名形如 col-md-4；其中 col 是“列” column 的缩写；md 是 medium 的缩写，适用于应屏幕宽度大于 768px 的场景；4 是占四栏的意思。因此，col-md-4 的意思是，在屏幕宽度大于 768px 时，该元素占四栏。

## 任务协作建议

 - 团队集中讨论，明确题目要求，保证队伍各自对题目要求认知一致
 - 各自完成任务实践
 - 交叉互相Review其他人的代码，建议每个人至少看一个同组队友的代码
 - 相互讨论，最后合成一份组内最佳代码进行提交

## 在线学习参考资料

 - [BootStrap 官网](http://getbootstrap.com/)：如果你没用过的话，至少了解一下它是做什么的
 - [Bootstrap grid examples](https://getbootstrap.com/examples/grid/)：改变浏览器宽度，查看不同类名元素的表现，理解网格系统的作用。然后，通过“审查元素”查看对应 CSS，思考这一系统是如何实现的
 - [BootStrap 带 offset 的网格系统](http://getbootstrap.com/2.3.2/scaffolding.html#gridSystem)
 - [Creating Your Own CSS Grid System](http://j4n.co/blog/Creating-your-own-css-grid-system)：你可以先自己想想怎么实现，没有思路的话看看别人的做法