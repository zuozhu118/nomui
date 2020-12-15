define(
    [
        './basic.js',
        './verticle.js',
        './horizontal.js',
        './horizontal-wrap.js',
    ],
    function () {
        return {
            title: 'List',
            subtitle: '列表',
            demos: Array.prototype.slice.call(arguments)
        }
    }
)