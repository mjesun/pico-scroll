PicoScroll
==========

PicoScroll is a lightweight JS library that allows you to customize scrollbars. It requires some additional markup to make it work; and the CSS included. The HBS file is a handlebars template; but you can change it to work for your custom templating system, or even copy and paste the HTML included inside it.


Usage
-----
The usage is very simple; you need to create an instance of `Scroll` passing the main element of the template (the one with the `scroll` class); and that's all:

```js
var scroll = new Scroll(document.getElementById('scroll'));
```


Features
--------
* Less than 2KB when minimized (JS + CSS)
* Dynamic resizing (when content changes, the scrollbar position and size is recalculated)
* Unobtrusive JS (without JS, a standard scrollbar is shown)
* Works in IE8+, Firefox, Chrome, Safari and Opera


IFRAMES
-------
As you may notice, the HTML code has two `<IFRAME>` tags in it. This is because they are used for controlling the dynamic resizing. You can remove them if you find them ugly or useless; but then you will need to trigger `scroll.calculate()` each time the content changes.
