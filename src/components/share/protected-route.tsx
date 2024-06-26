
import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from 'react-redux';
import { RootStoreState } from '../../services/store'

type Props = {
  onlyUnAuth?: boolean;
  element: JSX.Element;
  onlyFrom?:string
}

export const Protected:React.FC<Props> = ({ onlyUnAuth = false, element, onlyFrom }) => {
    const {authorized} = useSelector((store:RootStoreState) => store.user)
    const location = useLocation();

    if(onlyFrom && location.state?.from !== onlyFrom){
        return <Navigate to={"/"} />
    }

    if (onlyUnAuth && authorized) {
        const { from } = location.state || { from: { pathname: "/" } };
        return <Navigate to={from} />;
    }

    if (!onlyUnAuth && !authorized) {
        return <Navigate to="/login" state={{ from: location }} />;
    }
    return element;
};
export default Protected
export const Authorised = Protected;
export const OnlyUnauthorised:React.FC<{element:JSX.Element}> = ({ element }) => (
    <Protected onlyUnAuth={true} element={element} />
);
export const OnlyFrom:React.FC<{element:JSX.Element, onlyFrom:string, onlyUnAuth:boolean}> =({element, onlyFrom, onlyUnAuth}) => (
    <Protected {...{element, onlyFrom, onlyUnAuth}}/>
)