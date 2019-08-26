## 0.3.0更新内容

* 样式整改
* region columns  拷贝
* select, text 加入placeholer
* pick 日期 改spinner
* select 加入disabled属性
* views, scroll  数据加入下标$index



## 0.2.7更新内容

* checkbox, radio, input, counter, pick-* 加入disabled属性
* 容器类提出
* 重构部分元素

## 0.2.6 更新内容

* 元素 pickdate, pickdatetime, picktime 改为 pick-date, pick-datetime, pick-time
* 添加自定义组件 Freedomen.register(key, Jsx)
* button 不可用状态时变灰
* 重写Region tag方法
* Views, Scroll 标签外用 <Freedomen.Views > <Freedomen.Scroll />
* checkbox 样式修改
* radio 缺省样式改为圆形
* rate 添加disabled属性

##  0.2.5 更新内容

* Region event 支持 Promise, function 返回類型， return new Promise((resolve, reject) => {}) , return  () => {}
* columns 支持 function  columns: [(data) => {return {type: 'text', value: 123}}]
* scroll,views return 跟新到item
* scroll, views 事件返回值添加坐標 index 屬性

