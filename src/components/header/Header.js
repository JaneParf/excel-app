import {createHeader} from "@/components/header/header.template";
import {$} from "@core/dom";
import * as actions from "@/redux/actions";
import {ExcelStateComponent} from "@core/ExcelStateComponent";
import {debounce, deleteFromStorage} from "@core/utils";
import {storageName} from "@/shared/LocalStorageClient";
import {ActiveRoute} from "@core/routes/ActiveRoute";

export class Header extends ExcelStateComponent {
    static className = 'excel__header';

    constructor($root, options) {
        super($root, {
            name: 'Header',
            listeners: ['input', 'click'],
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
            this.updateTitleInStore(event.target.value)
    }

    storeChanged(changes) {
        this.setState(changes.headerTitle)
    }

    updateTitleInStore(value) {
        this.$dispatch(actions.saveHeader(value))
    }

    onClick(event) {
        const $target = $(event.target)
        if ($target.data.button === 'remove') {
            const decision
                = confirm('Are you sure you want to delete this table?')
            if (decision) {
                deleteFromStorage(storageName(ActiveRoute.param))
                ActiveRoute.navigate('')
            } else {
                ActiveRoute.navigate(storageName(ActiveRoute.param))
            }
            ActiveRoute.navigate('')
        } else if ($target.data.button === 'exit') {
            ActiveRoute.navigate('')
        }
    }
}


