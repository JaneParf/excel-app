import {ExcelComponent} from '@core/ExcelComponent';
import {Toolbar} from '@/components/toolbar/Toolbar';
import {createTable} from "@/components/table/table.template";

export class Table extends ExcelComponent {
    static className = 'excel__table';
    toHTML() {
        return createTable(30)
    }
}
