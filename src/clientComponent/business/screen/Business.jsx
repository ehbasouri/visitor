import React, {useCallback} from "react";
import { useState } from "react";
import { useEffect } from "react";
import ClientSceneWrapper from "../../../SceneWrapper/ClientSceneWrapper";
import { debounce } from "../../../utils/debounce";
import { Header } from "../../../common/Header";
import { SearchInput } from "../../../common/SearchInput";
import { API } from "../../../service/api";
import MainScreen from "../../../common/MainScreen";
import { useSelector } from 'react-redux';
import { useDispatch } from "react-redux"
import { updateGeneralProps } from '../../../redux/actions';
import { BUSINESS_LIST } from "../../../consts";
import BusinessItem from "../items/BusinessItem";

function Business({history}) {

    const [name, setName] = useState("");

    const business_list = useSelector(state=>state.general_reducer.business_list)

    const dispatch = useDispatch()

    useEffect(()=>{
        fetchBusinesses()
    },[])

    async function fetchBusinesses(searchValue) {
        const queries = { is_active : true}
        if(searchValue) queries.name= searchValue;
        try {
            const {data} = await API.get("business", queries);
            dispatch(updateGeneralProps({
                key: BUSINESS_LIST,
                value: data.users
            }));
        } catch (error) {
            console.log("error : ", error);
        }
    }

    const debounceCallback = useCallback(
        debounce((value) => {
            fetchBusinesses(value)
        }, 500),
        []
    );

    function onSearchValueChange(event) {
        setName(event.target.value);
        debounceCallback(event.target.value)
    }

    return(
        <div className={"mainScreen"}>
            <Header backEnabled={false} />
            <MainScreen>
                <SearchInput value={name} onChange={onSearchValueChange} />
                <div className={"mainItemsContainer"} >
                    {business_list.map(business=>(
                        <BusinessItem key={business._id} business={business} />
                    ))}
                </div>
            </MainScreen>
        </div>
    )
}

export default ClientSceneWrapper(Business)