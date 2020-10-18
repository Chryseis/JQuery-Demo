let data = [{
    id: 'node1',
    type: 'div',
    className: 'section1',
    children: [{
        id: 'node2',
        type: 'div',
        className: 'text',
        children: [{
            id: 'node3',
            type: 'span',
            content: '说明文字'
        }, {
            id: 'node4',
            type: 'i',
            className: 'icon-font-example'
        }]
    }]
}, {
    id: 'node5',
    type: 'div',
    className: 'section1',
    children: [{
        id: 'node6',
        type: 'input',
        className: 'custom-input'
    }]
}]

function renderElement(elemObj) {
    if (elemObj.type) {
        let elem = document.createElement(elemObj.type)
        if (elemObj.id) {
            elem.setAttribute('id', elemObj.id)
        }

        if (elemObj.className) {
            elem.setAttribute('class', elemObj.className)
        }

        if (elemObj.children) {
            elemObj.children.forEach(o => {
                elem.appendChild(renderElement(o))
            })
        }
        return elem
    } else {
        return null
    }
}

function renderHtml(elemArr) {
    if (elemArr && elemArr.length > 0) {
        elemArr.forEach(o => {
            document.body.appendChild(renderElement(o))
        })
    } else {
        return null
    }
}

renderHtml(data)

