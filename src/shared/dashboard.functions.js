import {storage} from "@core/utils";


function toHTML(key) {
    const model = storage(key)
    const id = key.split('/')[1]
    const date = new Date(model.lastOpened)
    const lastOpened = `
    ${date.getDate()}.${date.getMonth()}.${date.getFullYear()}
    ${date.toLocaleTimeString()}
    `
    return `
        <li class="db__record">
          <a href="#excel/${id}">${model.headerTitle}</a>
          <strong>${lastOpened}</strong>
        </li>
    `
}

function getAllKeys() {
    const keys = []
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (!key.includes('excel')) {
            continue
        }
        keys.push(key)
    }
    return keys
}

export function createRecordsTable() {
    const keys = getAllKeys()

    if (!keys.length) {
        return 'No spreadsheets yet'
    }

    return `
    <div class="db__list-header">
        <span>Title</span>
        <span>Last opened</span>
      </div>

      <ul class="db__list">
      ${keys.map(toHTML).join('')}
      </ul>
    `
}

