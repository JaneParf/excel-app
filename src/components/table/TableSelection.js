export class TableSelection {
    static className = 'selected'

    constructor() {
        this.group = []
        this.current = null
    }

    get selectedIds() {
        return this.group.map($el => $el.id())
    }

    select($el) {
        this.clear()
        this.group.push($el)
        this.group.forEach(el => {
            el.focus()
            el.addClass(TableSelection.className)
        })
        this.current = $el
    }
    selectGroup($group = []) {
        this.clear()
        this.group = $group
        this.group.forEach($el => $el.addClass(TableSelection.className))
    }

    clear() {
        this.group.forEach($el => {
            $el.removeClass(TableSelection.className)
        })
        this.group = []
    }

    applyStyle(style) {
        this.group.forEach($el => $el.css(style))
    }
}

