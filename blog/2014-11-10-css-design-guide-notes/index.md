---
title: CSS 中那些大大小小的坑
published_at: 10 Nov 14 @ 17:08
tags: [frontend, notes]
---

# CSS 中那些大大小小的坑

>中国读者不是不善于交流，而是对基础知识掌握不够牢固，不敢交流。就如同有人提到用英文写作时所说的，最难的不是怎么写，而是写什么。英文语法错误其实是别人最容易纠正的，但你到底想要表达什么则是别人无法知道的。具体到CSS，虽然不难学，但真正彻底把原理和基本概念全搞通也不是一件容易的事。 —— 李松峰

最近读完了Charles Wyke-Smith的《CSS设计指南》，上面那段话是节选的译者李松峰的序（在这多说一句，觉得李松峰翻译的书质量都很高，现在的我基本在遍历）。越来越觉得只读书不思考是毫无用处的，于是把笔记整理出来，并加上了自己思考过的感悟。

<!--truncate-->

---
###  CHAPTER 1 HTML标记与文档结构
用HTML标记内容的目的是为了赋予网页语义（semantic）。换句话说，就是要给你的网页内容赋予某些用户代理（user agent）能够理解的含义。 浏览器、屏幕阅读器，以及搜索引擎放出的web爬虫都是用户代理，它们需要显示、朗读和分析网页。

-  <mark>文本用闭合标签，引用内容用自闭合标签。</mark>
	-  闭合标签与自闭合标签的区别在于，闭合标签包含的是会显示的实际内容，而自闭合标签只是给浏览器提供一个对要显示内容的**引用**。浏览器会在HTML页面加载时候，**额外向服务器发送请求**，以取得自闭合标签引用的内容。
- 属性alt(alternative)，定义的是在图片因故未能加载成功时候在屏幕上显示的文本。视障用户的屏幕阅读器会大声读出alt属性的内容，因此一定要给`<img>`标签的`alt`属性添加让人一听（或一看）就能明白的内容。
-  `<h1>`被搜索引擎视为仅次于`<tittle>`标签的另一个搜索关键词重要来源。
- 只要有不适合放在其他文本标签中的文本，都可以把它放在一个段落里。
- 某些标签，如`<ol>`要求其他标签，如`<li>`与之共同出现。
- `<!DOCTYPE html>`是DTD（文档类型定义），声明：“以下是一个HTML文档。”
- `<html>`只有两个直接的子标签：`<head>`和`<body>`。帮助浏览器理解页面的信息都包含在`<head>`标签中。
-  块级标签：标题、段落、列表、独立引用等，如文档流一般上下堆叠显示；行内标签：链接、图片、字体样式、简写`<abbr>`、引证`<cite>`、文本内引用`<q>`相互并列显示，只有在空间不足以并列的情况下才会折到下一行。
- **块级元素盒子会拓展到与父元素同宽。**
- **行内元素盒子会“收缩包裹”其内容，并且会尽可能包紧。**
- DOM（文档对象模型）是从浏览器的视角来观察页面中的元素及每个元素的属性，由此得出这些元素的一个家族树。通过DOM，可以确定元素之间的相互关系。在CSS中引用DOM中特定的位置，就可以选中相应的HTML元素，并修改其样式属性。CSS修改了元素后，这些变化会立即在DOM中发生，并体现在页面上。

---
###  CHAPTER 2 CSS工作原理
当元素的同一个样式属性有多种样式值的时候，CSS靠层叠机制来决定最终应用哪种样式。

- 为文档添加样式的三种方法：
	- 行内样式 ：  `<p style="font-size: 12px; font-weight: bold;">Adding inline CSS styling</p>` 作用范围：只影响它所在的标签，而且总会覆盖嵌入样式和链接样式。
	- 嵌入样式： 嵌在`head`元素中。如
`<head><style type="text/css">...</style></head>`
作用范围仅限于当前页面。会覆盖外部样式表，但被行内样式覆盖。
	- 链接样式：把样式集中在一个单独文件——样式表（一个拓展名为.css的文本文件）。
	在多个HTML中连接同一个样式表：
	```<link href="style.css" rel="stylesheet" type="text/css" />```
	作用范围：有`<link>`标签的页面。
	- **@import指令**：一种@规则，可以在样式表中链接其他样式表。
	```import url(css/style2.css) ```
	注意：@import必须出现在样式表其他样式之前，否则不会被加载。*（见link css与@import css 的区别）*
- 一般上下文选择符。 基于祖先或同胞元素选择一个元素。
	```tag1 tag2 {statements} ```  **只要tag2在整个结构层次中有个tag1的祖先元素，无论上下文之间隔着多少层次没有关系**。
- 子选择符`>` ```tag1 > tag2 ```   标签2必须是标签1的子元素。
- 紧邻同胞选择符`+` ```tag1 + tag2```   标签2必须紧跟在其同胞标签1后面。
- 一般同胞选择符`~` ```tag1 ~ tag2 ```  标签2必须跟（不一定紧跟）在其同胞标签1后面。
- 通用选择符`*` 匹配任何元素。`* {color: green;}` **`color` 属性设定的是前景色，前景色既影响文本也影响边框，但一般用来设定文本颜色。**
	故`p * {color: red;}`改变p包含的所有元素的文本变成红色。
	构成非子选择符：`section * a {font-size: 1.3em}` 任何是section孙子元素，而非子元素的a标签都会被选中。
- **多类选择符**。 `<p class="specialtext featured">...</p>`
	选择同时存在这两个类名的元素：`.specialtext.featured {statements}`  注意两个类名之间没有空格，因为选择同时具有这个类名的那个元素。
- **ID属性**：ID用于页内导航链接。
	- ```<a href="#bio">Biography</a>
		<h3 id="bio">Biography</h3>
		<p>....</p>
	```
	`href`属性值开头的`#`表示链接的目标在当前页面中，因而不会触发浏览器加载页面（如果没有#，浏览器会尝试加载bio目录下的默认页面）。会跳到h3元素的位置。
	`<a href="#">Back to Top</a>` 点击该链接返回页面顶部。
	另外，如果不知道href放什么URL，可以用#作为占位符，但不能留空，因为href属性值为空的链接行为跟正常链接不一样。
- **ID**是为了唯一的标识一个元素。每个ID名在页面中只能用一次。给页面中每个顶级区域都添加一个ID，得到明确的上下文。
- **类**是为了标识一组具有相同特征的元素。
- **属性名选择符** `标签名[属性名]`，选择任何带有属性名的标签名。
	什么时候使用？一般经常给alt和title属性设定相同的值。alt属性中的文本会在图片因故未能加载时显示，或者由屏幕朗读器朗读出来。而title属性会在用户鼠标移动到图片上时，显示一个包含相应文本的提示。
- **属性值选择符** `标签名[属性名="属性值"]`，选择任何带有值为属性值的属性名的标签名。
- **UI伪类**在HTML元素处于某种状态时应用CSS。
	- 链接伪类。`::link/::visited / ::hover / ::active`
	- `:focus`伪类。`e:focus`在单击它获得焦点时候改变CSS。
	- **`:target`伪类**。 `e:target`如果用户点击一个指向页面中其他元素的链接，则那个元素就是目标（target），可以用:target伪类选中它。
	```
	<a href="#more_info">More Information</a>
	<h2 id="more_info">This is the information you are looking for.</h2>
	```
 	那么规则`#more_info:target {background: #eee;}`会在用户单击链接转向ID为more_info的元素时候，为该元素（h2）添加浅灰色背景，以便在一大堆引证中识别。（实例见Wikipedia）
- 结构伪类
	- `li:frist-child`&`li:last-child`代表一组同胞元素中第一个或最后一个元素。
	- `e:nth-child(n)` e为元素名，n表示一个数值（也可以使用odd或even）。用于提高表格的可读性，对表格的所有行交替应用不同颜色。
- 伪元素（CSS3 new）
	- `e::first-letter` 首字符。
	- `e::first-line`文本段落第一行，长度会随着浏览器窗口大小变换而改变。
	- `::before`和`::after`伪元素，可用在特定元素前后添加特殊内容。[（见用CSS伪类绘制各种图形 CSS trick）](#)
- 继承：文本样式（颜色）及字体（字号）。不继承元素盒子的定位和显示方式（边距、边框等）。**所以使用相对字体单位（em和百分比）要格外小心！**
- 层叠：样式在文档层次中逐层叠加。
	- 层叠顺序：浏览器默认CSS->用户CSS->作者链接CSS(按照它们链接到页面的先后顺序)->作者嵌入CSS->作者行内CSS。
	- 层叠规则：
		1. 找到应用给每个元素和属性的所有声明。
		2. 按顺序和权重排序。 ` !important;`用于加重声明的权重。
		3. 按特指度（specificity）排序。ID>类>标签名。但设定的样式胜过继承的样式。
		4. 顺序决定权重。位置靠下或者后声明的规则胜出。
- em和ex都是字体大小的单位。但它们作为长度单位适用于任何元素。
	- em表示一种字体中字母M的宽度，因此它的具体大小取决于你使用的字体。
	- ex等于给定字体中字母x的高度（小写字母x代表一种字体的字母中间部分的高度，不包括字母上下突出的部分——如d、p上下出头）。
- 百分比非常适合设定被包含元素的宽度，此时的百分比是相对于宽度而言。**可以把HTML结构元素宽度设定为body宽度的百分比，“流式”设计的关键，可以根据浏览器窗口大小而成比例伸缩。**
- 饱和度设定有多少颜色，灰色的饱和度低，而强烈色彩饱和度高。亮度设定颜色的明暗，0%就是黑色，100%就是白色。

---
###  CHAPTER 3 定位元素
要掌握CSS，核心就是要掌握元素定位！
可见页面的版式 主要由三个属性控制：position 属性、display 属性和 float 属性。 position：控制页面上元素间的位置关系；display：控制元素是堆叠、并排还是根本不在页面上出现；float：提供控制的方式，以便把元素组成多栏布局。

**！！此处添加一张描述盒模型的图！！**

- HTML页面实际由一堆盒子组成。默认情况下，每个盒子的边框不可见，背景也是透明。
- 三组属性：
	- 边框（border）：宽窄、样式和颜色。
	- 内边距（padding）：盒子内容区与边框的间距。
	- 外边距（margin）：盒子与相邻元素的间距。
	如何理解？**外边距是边框向外推其他元素，内边距是边框向内推元素的内容。**
- 简写样式：`margin{top, right, bottom, left}`
- 边框（border）3个属性：
	- `border-width`：thin, medium, thick等文本值，也可以用除百分比和负值之外的任何绝对值；
	- `border-style`：none,  hidden, dotted, dashed, solid, double, groove, ridge, inset, outset文本值；
	-  `border-color`：使用任意颜色值，包括RGB、HSL、十六进制值和颜色关键字。
	默认情况下，边框三个相关属性的值分别为`border-width: medium; border-style: none; border-color: black;`。调试的时候设置`border: 1px solid;`，1px可以把边框对布局宽度和高度的影响降到最低。
- 盒子外边距：
	- 使用`* {margin: 0; padding: 0;} `中和默认值，再根据需要添加，就会在各浏览器上获得一致的效果。
	- 叠加外边距：**垂直方向上的外边距会叠加，水平外边距不叠加。**上下外边距相遇时，它们会相互重叠，直至一个外边距碰到另一个元素的边框，且较宽的外边距决定两个元素最终距离。而水平相邻的元素，水平间距是相邻外边距之和。
	- 设置外边距时需要混合使用不同的单位。比如一个段落的左右外边距可以使用像素，以便该段文本始终与包含元素边界保持固定间距，不受字号变大或变小的影响。而对于上下外边距，以em为单位则可以让段间距随字号变化而相应增大或缩小（按比例变化，整体布局就会依旧协调）。
- 盒子到底有多大
	 - 没有宽度的盒子：如果不设置块级元素的width属性，那么这个属性的默认值为auto，结果会让元素的宽度拓展到与父元素同宽。sum(添加水平边框、内边距和外边距) = 内容宽度减少量。
	 - 为设定了宽度的盒子添加边框、内边距和外边距，会导致盒子扩展得更宽。实际上，盒子的`width`属性设定的只是盒子内容区的宽度，而非盒子要占据的水平宽度。
- 浮动与清除
浮动可以实现：1. 传统出版物的文字绕排图片的效果。2. 可以让原来上下堆叠的块级元素变成左右并列，从而实现布局中的分栏。
	- 浮动元素会脱离常规文档流，在原来紧跟其后的元素就会在空间的允许下，向上提升到与浮动元素平起平坐。
	> 尽量把这个元素往上放，能放多高放多高，直到碰到某个元素的边界为止。  -- Eric Meyer

    - 浮动非图片元素时，必须给它设定宽度，否则后果难料。
	- 浮动元素脱离文档流，父元素也不会再包围它。三种围住浮动元素：
    	1. 为父元素添加`overflow: hidden`。实际上`overflow: hidden`声明的真正用途是防止包含元素被超大内容撑大，包含元素依然保持其设定的宽度，而超大的子内容则会被容器剪切掉（之前有在下拉菜单的顶级元素上应用这个声明，结果作为其子元素的下拉菜单没有被显示，就是因为其被父元素剪切了），除此之外，它能可靠地迫使父元素包含其浮动的子元素。
        2. 同时浮动父元素。浮动父元素后，不管其子元素是否浮动，它总是会紧紧包围（也称收缩包裹）住它的子元素。
        3.  添加非浮动的清除元素。原理：给父元素的最后添加一个非浮动的子元素，然后清除该子元素。由于包含元素一定会包围非浮动的子元素，而且清除会让这个子元素位于（清除一侧）浮动元素的下方，因此包含元素一定会包含这个子元素——以及前面的浮动元素。此种方法一共有两种方式：
	- 在HTML标记中添加一个子元素div，且给它应用clear属性。

```language-html
<section>
    <img src="images/...">
    <p>It's fun to float.</p>
    <div class="clear-me"></div>
</section>
<footer>Here is the footer.</footer>
.clear_me { clear: left; }
```
  - 用CSS来添加消除元素的方法。

```language-html
<section class = "clearfix">
    <imag src="images/... />
    <p>It's fun to float.</p>
</section>
<footer>Here is the footer.</footer>
```
```laguage-css
.clearfix:after {
    content: ".";
    display:block;
    height: 0;
    visibility: hidden;
    clear: both;
}
```
`clear: both` 意味这section中新增的子元素会清除左右浮动元素。

#### 定位
`position`有4个属性：static、relative、absolute、fixed，默认为static。
**static（静态定位）**：块级元素在常规文档流中自上而下的堆叠。
**relative（相对定位）**：到底相对哪里定位？相对的是它原来在文档流中的位置（或者默认位置）。
`p{ position: relative; top:25px; left:30px;}`
注意：top,left为正（负）值意味着把元素向下（上）、向右（左）移动。
**absolute(绝对定位)**：绝对定位会把元素彻底从文档流中拿出来。
`p{ position: absolute; top:25px; left:30px;}`
绝对定位元素默认的*定位上下文*是body。但绝对定位元素的任何祖先元素都可以成为它的定位上下文，只要你把相应的祖先元素`position：relative;`
**fixed（固定定位）**：固定定位元素也被完全移除了文档流，但固定定位的定位上下文是视口（浏览器窗口或手持设备的屏幕），因此它不会随页面而移动。一般情况下，常用来创建位于顶部或左右侧，不随页面滚动而移动的导航元素。

#### 显示属性
display 把块级元素变成行内元素（或相反），可以使原先的行内元素填满其父元素。
`display: none`：该元素及所有包含在其中的元素，都不会在页面中显示。它们原先占据的所有空间也都会被“回收”，就好像相关的标记根本不存在一样。
`visibility`默认为visible，若设置为`hidden`，元素会隐藏，但它占据的页面空间仍然在（也就是只在页面上隐形了而已咯）。

#### 背景
**！！此处添加盒模型三维透视图！！**
CSS每个元素盒子可以想象成两个图层组成。
**背景颜色**
元素的前景层包含内容（如文本或图片）和边框，元素的背景层可以用实色填充（background-color属性），也可以包含任意多个背景图片（使用background-image属性），背景图片叠加在背景颜色之上。
*注意* 关于`color`属性：前景色属性，作用范围是元素的内容和边框。影响边框的前提是border没有设定边框颜色（或者`border-color`没有设定），边框就会使用color属性设定的字体颜色。默认为黑色。
**背景图片**
指定背景图片来源：`background-image: url(images/path);`
默认情况下，比元素小的背景图片以元素左上角为起点，水平和垂直方向上重复出现，直至填满整个背景空间。所以元素盒子底部和右侧的圆形图案都只显示了一部分。
**背景重复**
`background-repeat`：
`repeat`：默认值， 水平与垂直方向均重复；
`repeat-x`：只在水平方向重复；
 `repeat-y`：只在垂直方向重复；
 `no-repeat`：在任何方向上均不重复，即只让背景图片显示一次。
 **CSS3背景**
 `background-repeat: round` ：通过调整图片大小来适应背景区来确保图片不被剪切；
 `background-repeat: space`： 通过在图片间添加空白来适应背景区域。
**背景位置**
`background-position`：该属性有五个关键字值。`top、left、bottom、right和center`。 关键字中任意两个组合起来都可以作为该属性值。
**注意**，`background-position`属性会同时设定元素和图片的原点。原点决定了元素和图片中某一点的水平和垂直坐标。默认情况下。`background-position`的原点位于左上角，即元素左上角和图片的左上角是对齐的。
但是当把起点位置改为center center（50% 50% 也是一样的效果），如
`p#center {background-position: center;}`
若只设一个关键字值（不是数值），则另一个也会取相同的值。
设定了图片中心点与元素中心点重合，然后向水平和垂直方向重复。
如再设置`background-repeat: no-repeat` 则会实现图片在背景区域内居中的效果。
**比较设置背景位置三个值：关键字、百分比、绝对或相对单位的数值。**
**关键字**：顺序不重要。
**数值**：第一个值表示水平位置，第二个值表示垂直位置。要是只设定一个值，则将其用来设定水平位置，垂直位置被设为`center`。
使用关键字和百分比，设定的值同时应用于元素和图片。
**像素等绝对单位数值**：设定图片的左上角会被放在距离元素左上角指定位置的地方。
有趣的是，还可以设置负值，或者足够大的正值，实现显示部分图片。
**背景尺寸**
`background-size`：
50%：缩放图片，使其填充背景区的一半。
100px 50px：把图片调整到100px宽，50px高。
cover：拉大图片，使其完全填满背景区；保持宽高比。
contain：缩放图片，使其恰好适合背景区；保持宽高比。
**背景粘附**
`background-attachment`：控制滚动元素内的背景图片是否随元素滚动而移动。
`scroll`：属性默认值，即背景图片随元素移动。
`fixed`： 背景图片不随元素滚动而移动。
`inherit` ：继承初始值。
**附**：原书关于`background-attachment`属性设置并没有讲太多内容，但是在制作现代网页设计常见的**视差滚动效果**时候，是个重要属性。当然，在实现更amazing的效果时候会较复杂，需要结合CSS3的多背景图片属性，还有JavaScript(jQuery)来对页面进行控制。感兴趣请戳 [Tencent ISUX「视“差”滚动浅析」](http://isux.tencent.com/parallax-scrolling.html)。
**其他CSS3背景属性**
`background-clip`： 控制背景绘制区域的范围。如让背景颜色和背景图片只出现在内容区，而不出现在内边距区域。
`background-origin`：控制背景定位区域的原点，可以设定盒子左上角以外的位置。
`background-break`：控制分离元素（比如跨越多行的行内盒子）的显示效果。

#### 多背景图片
CSS3中可以给元素添加多个背景图片，使用简写属性`background`如下：

```language-css
	p {
		text-align: center;
		background:
		url(images/01.png) 30px -10px no-repeat,
		url(images/02.png) 145px 0px no-repeat,
		url(images/03.png) 140px -30px no-repeat #ffbd75;
	}
```
**注意**：CSS规则中先列出的图片显示在上层，更接近前景。

#### 背景渐变
`linear-gradient`:
`radial-gradient`:

---
### Chapter 4 字体和文本

> 一个网站的品质如何，有时候只要看看它用的字体就能一目了然。如果说图片是蛋糕上的糖衣，那么排版才是卓越设计的根本。

接触CSS这么久后，发现字体与排版是门大学问（也就是说，是个深坑…），只有经验丰富的设计师，才能创造出专业水准的网页排版吧。

**难道字体和文本不是一回事？**
啊哈，当然不是。
**字体**是“文字的不同体式”，或“字的形体结构”。根据外观，字体可以分为不同*类别*（font collection），包括衬线字体（serif）、无衬线字体（sans-serif）和等宽字体（monospace）。每一类字体可以继续分为不同的*字体族*（font family），比如 Times 和 Helvetica。而字体族中又可以包含不同的*字形*（font face），反应了相应字体族基本设计的不同变化，例如 Times Roman、Times Bold、Helvetica Condensed、Bodoni italic。
**文本**就是一组字或者字符，比如章标题、段落正文等，跟使用什么字体无关。
CSS为字体和文本分别定义了属性。字体属性主要用于描述一类字体的大小和外观（什么字体族，多大字号，粗体还是斜体）。文本属性描述对文本的处理方式（行高或者字符间距，有没有下划线和缩进）。
#### 字体族
一般应该给整个页面`body`设定一种主字体，然后只对那些需要使用不同字体的元素再应用font-family。
有些字体在用户机器上不支持，那么就应该设置字体栈来指定本地字体。为了保险，字体栈的后面应补上大多数操作系统都内置的字体。
**注意**如果字体名像 Trebuchet MS 一样多于一个单词（有空格），应该加上引号："Trebuchet MS "。
#### 字体大小
浏览器样式表默认为每个HTML元素都设定了font-size，所以你在设定 font-size 的时候，其实就是在修改默认值。
