# jquery-select-waterfall

## General 

This jQuery plugin allows to manage dependencies between html selectboxes.
Let's start with an example

[Demo](https://jsfiddle.net/camillinif/xpvt214o/579306/)

## Setup

1. add data-waterfall attribute into all select element int dependency chain

```html
<select id="select-1" data-waterfall>
    <option value=1>A</option>
    <option value=2>B</option>
    <option value=3>C</option>
</select>

<select id="select-2" data-waterfall>
    <option selected disabled>[Select an option]</option>
</select>
```
