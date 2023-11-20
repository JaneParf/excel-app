class Dom {
    constructor(selector) {
        this.$$listeners = {}
        this.$el = typeof selector === 'string'
            ? document.querySelector(selector)
            : selector
    }

    id(parse) {
        if (parse) {
            const parsed = this.id().split(':')
            return {
                row: +parsed[0],
                col: +parsed[1]
            }
        }
        return this.data.id
    }

    text(text) {
        if (typeof text === 'string') {
            // console.log(this.$el)
            if (this.$el.tagName.toLowerCase() === 'input') {
                this.$el.value = text
                return this
            }
            this.$el.textContent = text
            return this
        }
        if (this.$el.tagName.toLowerCase() === 'input') {
            return this.$el.value.trim()
        }
        return this.$el.textContent.trim()
    }

    html(html) {
        if (typeof html === 'string') {
            this.$el.innerHTML = html
            return this
        }
        return this.$el.outerHTML.trim()
    }

    clear() {
        this.html('')
        return this
    }

    append(node) {
        if (node instanceof Dom) {
            node = node.$el
        }
        this.$el.append(node)
        return this
    }

    on(eventType, callback) {
        this.$$listeners[eventType] = callback
        this.$el.addEventListener(eventType, callback)
    }

    off(eventType) {
        this.$el.removeEventListener(eventType, this.$$listeners[eventType])
    }

    closest(selector) {
        return $(this.$el.closest(selector))
    }

    getCoords() {
        return this.$el.getBoundingClientRect()
    }

    get data() {
        return this.$el.dataset
    }

    findAll(selector) {
        return this.$el.querySelectorAll(selector)
    }

    find(selector) {
        return $(this.$el.querySelector(selector))
    }

    css(styles = {}) {
        Object.keys(styles).forEach(key => this.$el.style[key] = styles[key])
    }

    addClass(className) {
        this.$el.classList.add(className)
        return this
    }

    removeClass(className) {
        this.$el.classList.remove(className)
        return this
    }

    focus() {
        this.$el.focus()
    }
}

export function $(selector) {
    return new Dom(selector)
}

$.create = (tagName, classes = '') => {
    const el = document.createElement(tagName)

    if (classes) {
        el.classList.add(classes)
    }
    return $(el)
}
