import { RESET_GENERAL_PROPS, UPDATE_GENERAL_PROPS } from "../../consts";

export const updateGeneralProps = (payload) => {
    return {
        type: UPDATE_GENERAL_PROPS,
        payload
    };
};
export const resetGeneralProps = (payload) => {
    return {
        type: RESET_GENERAL_PROPS,
        payload
    };
};
