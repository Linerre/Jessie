# Preview
At the moment, a card with multiple-choice (MC) notes looks like this:
![mc notes template]()

On the left, there are **3** fields:
1. Front Template
2. Styling (shared between cards)
3. Back Template

The content in these fields are shown belown in the respetive sections.

## Front Template
Code for **Front Template** field:
```
<span class="q">题目</span>

{{Q_fron}}<br>

<div class="opt">{{Options}}</div>
```

## Styling (shared between cards)
```css
.card {
 font-family: arial;
 text-align: left;
 color: black;
 background-color: white;
}

.q {
background-color: #6699CC;
color: #fff;
padding: 2px 3px;
font-size: 14px;
}

.opt {
font-size: 16px;
margin-top: 6px;
}

.page {
font-size: 12.5px;
color: #C594C5;
}

.als {
font-size: 14px;
color: #5FB3B3;
}
```

## Back Template
```
<div class="opt">{{Answer}}</div><br>

<span class="page">参考 {{Pages}} 页</span><br>

{{#Analysis}}
<div class="als">解析：{{Analysis}}</div>
{{/Analysis}}
```