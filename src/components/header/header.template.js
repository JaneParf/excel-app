import {defaultTitle} from "@/constants";

export function createHeader(store) {
    const value = store.getState().headerTitle || defaultTitle
        return `
        <input type="text" class="input" value="${value}"/>

      <div>
        <div class="button">
          <i class="material-icons">delete</i>
        </div>

        <div class="button">
          <i class="material-icons">logout</i>
        </div>
      </div>
        `
}
