/**
 * Created by sheng.wang on 2017/07/27.
 */

export const actionTypeUndo = "undo";
export const actionTypeRedo = "redo";

export function undoActionCreator() {
    return {
        type: actionTypeUndo
    }
}

export function redoActionCreator(){
    return {
        type: actionTypeRedo
    }
}