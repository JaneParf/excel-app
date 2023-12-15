import {
    APPLY_STYLE,
    CHANGE_STYLES,
    CHANGE_TEXT,
    SAVE_HEADER,
    TABLE_RESIZE,
    UPDATE_DATE
} from "./types";

export function tableResize(data) {
    return {
        type: TABLE_RESIZE,
        data
    }
}

export function changeText(data) {
    return {
        type: CHANGE_TEXT,
        data
    }
}

export function changeStyles(data) {
    return {
        type: CHANGE_STYLES,
        data
    }
}

export function applyStyle(data) {
    return {
        type: APPLY_STYLE,
        data
    }
}

export function saveHeader(data) {
    return {
        type: SAVE_HEADER,
        data
    }
}

export function updateDate() {
    return {
        type: UPDATE_DATE,
    }
}
