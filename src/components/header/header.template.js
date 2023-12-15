import {defaultTitle} from "@/constants";

export function createHeader(store) {
    const value = store.getState().headerTitle || defaultTitle
        return `
      <input type="text" class="input" value="${value}"/>

      <div>

        <div class="button" data-button="remove">
          <i class="material-icons" data-button="remove">delete</i>
        </div>

        <div class="button" data-button="exit">
          <i class="material-icons" data-button="exit">exit_to_app</i>
        </div>

      </div>
        `
}
