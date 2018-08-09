# jquery-select-waterfall

## General 

This jQuery plugin allows to manage dependencies between html selectboxes.
Let's start with an example

[Demo](https://jsfiddle.net/camillinif/xpvt214o/579306/)

## Setup

1. assign an `id` for every `select` element 

```html
<select id="select-1">
    <option value=1>A</option>
    <option value=2>B</option>
    <option value=3>C</option>
</select>

<select id="select-2">
    <option selected disabled>[Select an option]</option>
</select>
```

2. add `data-waterfall` attribute into all `select` element into dependency chain

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

3. add `data-parent` attribute assigning the select by id of parent select

```html
<select id="select-1" data-waterfall>
    <option value=1>A</option>
    <option value=2>B</option>
    <option value=3>C</option>
</select>

<select id="select-2" data-waterfall data-parent="#select-1">
    <option selected disabled>[Select an option]</option>
</select>
```

4. add `data-origin` attribute assigning the name of callback function from which the data to be inserted inside the element will be retrieved

```html
<select id="select-1" data-waterfall>
    <option value=1>A</option>
    <option value=2>B</option>
    <option value=3>C</option>
</select>

<select id="select-2" data-waterfall data-parent="#select-1" data-origin='callbackForSelect2'>
    <option selected disabled>[Select an option]</option>
</select>
```

1. add `data-value-property` and `data-label-property` attributes with property names that, respectively, contains value and property for every option into select element

For example, if the callback function returns an array of object like 

```json
[
    {
        id = 'A'
        name = 'Apple'
    },
    {
        id = 'B'
        name = 'Banana'
    }
]
```

the attribute must be enhanced in this way

```html
<select id="select-2" data-waterfall data-parent="#select-1" data-origin='callbackForSelect2' data-value-property="id" data-label-property="name">
    <option selected disabled>[Select an option]</option>
</select>
```