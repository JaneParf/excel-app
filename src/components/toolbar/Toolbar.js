import {createToolbar} from "@/components/toolbar/toolbar.template";
import {$} from "@core/dom";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {defaultStyles} from "@/constants";

export class Toolbar extends ExcelStateComponent {
    static className = 'excel__toolbar';

    constructor($root, options) {
        super($root, {
            name: 'Toolbar',
            listeners: ['click'],
            subscribe: ['currentStyles'],
            ...options,
        });
    }

    prepare() {
        this.initState(defaultStyles)
    }
    get template() {
        return createToolbar(this.state)
    }

    toHTML() {
       return this.template
    }

    storeChanged(changes) {
        this.setState(changes.currentStyles)
    }

    onClick(event) {
        const $target = $(event.target)
        $target.$el.classList.toggle('active')
        if ($target.data.type === 'button') {
            const value = JSON.parse($target.data.value)
            // const key = Object.keys(value)[0]
            this.$emit('toolbar:applyStyle', value)
            // console.log('value', value)
            // Здесь эмитится стиль согласно нажатой кнопке
            // this.setState({[key]: value[key]})
        }
    }
}

