import { UPDATE_GENERAL_PROPS, RESET_GENERAL_PROPS } from "../../consts";
import initialState from "./initialState.json"

export const general_reducer = (state = initialState, action) => {
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
            return initialState;
        default:
            return state;
    }
};