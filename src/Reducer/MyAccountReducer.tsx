import { MyAccountModel } from "../Model/MyAccountModel";

export class MyAccountActionType {
    static SET_ACCOUNT = 'SET_ACCOUNT';
}

export function myAccountReducer(state = new MyAccountModel(), action: any): MyAccountModel {
    if (action.type === MyAccountActionType.SET_ACCOUNT) {
        if (typeof action.xUserAddress === 'string' && typeof action.signature === 'string') {
            return new MyAccountModel(action.xUserAddress, action.signature);
        }
    }
    return state;
}