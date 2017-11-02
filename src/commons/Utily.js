/**
 * Created by sheng.wang on 2017/07/20.
 */
export function uuidv4() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        let r = Math.random() * 16 | 0, v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}

export function propertyChangeReducerCreator(targetType) {
    return function fn(entity, {type, propertyName, propertyValue}) {
        if (type === targetType) {
            if (entity[propertyName] !== undefined) {
                return {[propertyName]: propertyValue};
            }
        }
        return {};
    }
}

export function findIndexById(list, id){
    return list.findIndex(elm => elm.id === id);
}

// export function findElemById(list, id){
//     return list.find(elm => elm.id === id);
// }
