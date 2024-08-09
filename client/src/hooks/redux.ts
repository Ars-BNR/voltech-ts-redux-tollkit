import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../store/store";
import { RootState } from "../store/reducers";
import { bindActionCreators } from "redux";
import actionCreators from "../store/action-creators";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export const useAppDispatches = () => {
  const dispatch = useDispatch();
  return bindActionCreators(actionCreators, dispatch);
};
