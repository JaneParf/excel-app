import {createHeader} from "@/components/header/header.template";
import {$} from "@core/dom";
import * as actions from "@/redux/actions";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {debounce} from "@core/utils";

export class Header extends ExcelStateComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input'],
            ...options
        });
    }

    prepare() {
        this.onInput = debounce(this.onInput, 300)
    }

    toHTML() {
        return createHeader(this.store)
    }

    onInput(event) {
            this.updateTitleInStore($(event.target).text())
    }

    storeChanged(changes) {
        this.setState(changes.headerTitle)
    }

    updateTitleInStore(value) {
        this.$dispatch(actions.saveHeader(value))
    }
}


