# BinaryMonicPolynomial.js
[Demo Site](https://nokinoki.github.io/BinaryMonicPolynomial.js/)   
![DemoSite](https://nokinoki.github.io/BinaryMonicPolynomial.js/img.png "Demo Site Image")

##Tutorial  
Import `BinaryMonicPolynomial.js` in your HTML.  

```html
<script type="text/javascript" src="BinaryMonicPolynomial.js"></script>
```

Make Instance of BinaryMonicPolynomial. It require a paremater "Rank of MonicPolynomial". 

```javascript
var bmp = new BinaryMonicPolynomial(5);
```

You can access "Binary monic polynomial" and "Irreducibler binary monic polynomial" array.

```javascript
console.log(bmp.list);  //return Binary monic polynomial
console.log(bmp.irreducibler); 
                        //return Irreducibler binary monic polynomial
```

And... it have method draw a html canvas. 

```javascript
var cnv = document.getElementById("yourCanvasName");
bmp.graphicShow();
```

##Lisence
Copyright &copy; 2017 Haruta  
Released under the MIT license  

##Search  
モニック 多項式 既約 ガロア体 二元体 有限体
