const CODES = {
    A: 65,
    Z: 90
}

function createRow(index, content) {
    return `<div class="row">
        <div class="row-info">${index ? index : ''}</div>
        <div class="row-data">${content}</div>
        </div>
            `
}

// Мое решение. Не забыть удалить!
// function createHeaderRow() {
//     let letter = ''
//     const headerRow = []
//
//     for (let i = 65; i <= 90; i++) {
//         letter = String.fromCharCode(i)
//         headerRow.push(`<div class="row-info">${letter}</div>`)
//     }
//
//     return `<div class="row">
//         <div class="row-info">1</div>
//         ${headerRow.join('')}
//         </div>
//             `
// }

function toCell() {
    return `
      <div class="cell" contenteditable></div>
    `
}

function toColumn(col) {
    return `
    <div class="column">${col}</div>
    `
}

function toChar(_, index) {
    return String.fromCharCode(CODES.A + index)
}
export function createTable(rowsCount = 10) {
    const colsCount = CODES.Z - CODES.A + 1
    const rows = []

    const cols = new Array(colsCount)
        .fill('')
        .map(toChar)
        .map(toColumn)
        .join('')

    rows.push(createRow(null, cols))

    for (let i = 1; i <= rowsCount; i++) {
        const cells = new Array(colsCount)
            .fill('')
            .map(toCell)
            .join('')

        rows.push(createRow(i, cells))
    }

    return rows.join('')
}
