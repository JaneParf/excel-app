import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from '@/components/table/table.template'
import {resizeHandler} from '@/components/table/table.resize'
import {
    isCell,
    isGroup,
    matrix,
    nextSelector,
    shouldResize
}
    from '@/components/table/table.functions'
import {TableSelection} from "@/components/table/TableSelection";
import * as actions from '@/redux/actions'
import {$} from "@core/dom";
import {defaultStyles} from "@/constants";
import {parse} from '@core/parse'

export class Table extends ExcelComponent {
    static className = 'excel__table'

    constructor($root, options) {
        super($root, {
            name: 'Table',
            listeners: ['mousedown', 'keydown', 'input'],
            ...options
        })
    }

    toHTML() {
        return createTable(20, this.store.getState())
    }

    prepare() {
        this.selection = new TableSelection(this.$root)
    }

    init() {
        super.init()

        this.selectCell(this.$root.find('[data-id="0:0"]'))
        this.$on('formula:input', (text) => {
            this.selection.current
                .attr('data-value', text)
                .text(parse(text))
            this.updateTextInStore(text)
        })
        this.$on('formula:enter', () => {
            this.selection.current.focus()
        })

        this.$on('toolbar:applyStyle', value => {
            this.selection.applyStyle(value)
            this.$dispatch(actions.applyStyle({
                value,
                ids: this.selection.selectedIds
            }))
        })
    }

    selectCell($cell) {
        this.selection.select($cell)
        this.$emit('table:select', $cell)
        const styles = $cell.getStyles(Object.keys(defaultStyles))

        this.$dispatch(actions.changeStyles(styles))
    }

    async resizeTable(event) {
        try {
            const data = await resizeHandler(this.$root, event)
            this.$dispatch(actions.tableResize(data))
        } catch (e) {
            console.warn('Resize error', e.message)
        }
    }

    onMousedown(event) {
        if (shouldResize(event)) {
            this.resizeTable(event)
        } else if (isCell(event)) {
            const $target = $(event.target)
            if (isGroup(event)) {
                const $cells = matrix($target, this.selection.current).map(id =>
                    this.$root.find(`[data-id="${id}"]`))

                this.selection.selectGroup($cells)
            } else {
                this.selectCell($target)
            }
        }
    }

    onKeydown(event) {
        const keys = [
            'Enter',
            'Tab',
            'ArrowLeft',
            'ArrowRight',
            'ArrowDown',
            'ArrowUp'
        ]
        const {key} = event
        if (keys.includes(key) && !event.shiftKey) {
            event.preventDefault()
            const id = this.selection.current.id(true)
            const $next = this.$root.find(nextSelector(key, id))
            this.selectCell($next)
        }
    }

    updateTextInStore(value) {
        this.$dispatch(actions.changeText({
            id: this.selection.current.id(),
            value
        }))
    }

    onInput(event) {
        this.updateTextInStore($(event.target).text())
    }

    destroy() {
        super.destroy();
    }
}
