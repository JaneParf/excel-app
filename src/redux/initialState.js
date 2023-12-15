import {defaultStyles, defaultTitle} from "@/constants";
import {clone} from "@core/utils";

const defaultState = {
    rowState: {},
    colState: {},
    dataState: {},
    stylesState: {},
    currentText: '',
    headerTitle: defaultTitle,
    currentStyles: defaultStyles,
    lastOpened: new Date().toJSON()
}

const normalize = state => ({
    ...state,
    currentStyles: defaultStyles,
    currentText: ''
})

export function normalizeInitialState(state) {
    return state ? normalize(state) : clone(defaultState)
}


