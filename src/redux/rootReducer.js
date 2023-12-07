import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    SAVE_HEADER,
    TABLE_RESIZE
} from "./types";

export function rootReducer(state, action) {
    let field
    let val
    switch (action.type) {
        case TABLE_RESIZE:
            field = action.data.type === 'col' ? 'colState' : 'rowState'
            return {...state, [field]: value(state, field, action)}
        case CHANGE_TEXT:
            field = 'dataState'
            return {
                ...state,
                currentText: action.data.value,
                [field]: value(state, field, action)
            }
        case CHANGE_STYLES:
            return {...state, currentStyles: action.data}
        case APPLY_STYLE:
            field = 'stylesState'
            val = state[field] || {}
            action.data.ids.forEach(id => {
                val[id] = {...val[id], ...action.data.value}
            })
            return {
                ...state,
                [field]: val,
                currentStyles: {...state.currentStyles, ...action.data.value}
            }
        case SAVE_HEADER:
            field = 'headerTitle'
            val = state[field] || ''
            return {
                ...state,
                [field]: action.data
            }
        default: return state
    }
}

function value(state, field, action) {
    const val = state[field] || {}
    val[action.data.id] = action.data.value
    return val
}
