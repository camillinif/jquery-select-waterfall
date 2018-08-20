# jquery-select-waterfall

## General 

This jQuery plugin allows to manage dependencies between html selectboxes.
Let's start with an example

[Demo](https://jsfiddle.net/camillinif/xpvt214o/579306/)

## JS Setup

Call the function on the root element of select chain 

```js
$('#select-1').initWaterfall();
```

Additionally, you can pass an options object; the plugin accepts this option:

- `removeFirst` (default `false`): if the first option of select element is a placeholder, with this option you can choose to maintain this options
- `loadingCallback`: this callback will be called during the recovery of select data (can be used for stilize the loading)
- `completeLoadingCallback`: this callback will be called when the select has been updated
- `disableWhenIsEmpty` (default `true`): disable the select box when it is empty 

## HTML Setup

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

3. add `data-parent` attribute assigning the select by id of parent select; an element can be have more parents; the `data-parent` attribute's value must be writter with array notation

```html
<select id="select-1" data-waterfall>
    <option value=1>A</option>
    <option value=2>B</option>
    <option value=3>C</option>
</select>

<select id="select-2" data-waterfall data-parent='["#select-1", "#select-1b"]'>
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

<select id="select-2" data-waterfall data-parent='["#select-1", "#select-1b"]' data-origin='callbackForSelect2'>
    <option selected disabled>[Select an option]</option>
</select>
```

5. add `data-value-property` and `data-label-property` attributes with property names that, respectively, contains value and property for every option into select element

For example, if the callback function returns an array of object like:

```json
[
    {
        "id": "A",
        "name": "Apple"
    },
    {
        "id": "B",
        "name": "Banana"
    }
]
```

the attribute must be enhanced in this way:

```html
<select id="select-2" data-waterfall data-parent='["#select-1", "#select-1b"]' data-origin='callbackForSelect2' data-value-property="id" data-label-property="name">
    <option selected disabled>[Select an option]</option>
</select>
```

## Stylish loading

Additionally, you can add loading effect during the execution of the data recovery function.
To obtain this:

1. add an element that will manage the loading effect and add data-loading-for with the id of relative select element

```html
<span id='loading-1' data-loading-for='#select-2'></span>
```

In combination with the `loadingCallback` and `completeLoadingCallback`, you can stilyze this element.
The elements with `data-loading-for` are passed as parameter to callback function.

## Custom callback loading for every element in waterfall

The `completeLoadingCallback` callback is always called for every selectbox in the waterfall; in addition, you can define a costum callback just adding `data-loading-callback` in selectbox

```html
<select id="select-2" data-waterfall data-parent='["#select-1", "#select-1b"]' data-origin='callbackForSelect2' data-loading-callback='custom-loading-callback' data-value-property="id" data-label-property="name">
    <option selected disabled>[Select an option]</option>
</select>
```