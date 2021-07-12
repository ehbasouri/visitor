import { UPDATE_GENERAL_PROPS, RESET_GENERAL_PROPS } from "../../consts";
import initialState from "./initialState.json"


const today = new Date();
today.setHours(0,0,0,0);


const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate() + 1);
tomorrow.setHours(0,0,0,0);


const INITIAL_STATE = {
    ...initialState,
    fromDate: today,
    toDate: tomorrow
}

export const general_reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case UPDATE_GENERAL_PROPS:
            var newProps = {};
            if (Array.isArray(action.payload)) {
                for (var prop of action.payload) {
                    newProps = { ...newProps, [prop.key]: prop.value };
                }
                return { ...state, ...newProps };
            }
            return { ...state, [action.payload.key]: action.payload.value };
        case RESET_GENERAL_PROPS:
            return INITIAL_STATE;
        default:
            return state;
    }
};