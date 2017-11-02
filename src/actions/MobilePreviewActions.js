export const actionTypeNextQuestion = "mobile preview next question";
export const actionTypePrevQuestion = "mobile preview prev question";
export const actionTypeToggleMobilePreview = "toggle mobile preview";
export const category = "mobile preview actions";

export function nextQuestion() {
    return {
        category,
        type: actionTypeNextQuestion
    }
}

export function prevQuestion(){
    return {
        category,
        type: actionTypePrevQuestion
    }
}

export function toggleMobilePreviewActionCreator() {
    return {
        category,
        type: actionTypeToggleMobilePreview
    }
}