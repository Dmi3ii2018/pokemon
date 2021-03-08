import { useSelector, useDispatch } from "react-redux";
import { useCallback } from "react";
import { createSelector } from "reselect";
import { ActionCreator } from "actions";
import { getTypesAction } from '../../store/pokemon';

const useTemplateStore = () => {
  const dispatch = useDispatch();

  const pokemons = useSelector((state) => state.pokemons);

  const cartItems = useSelector(
    createSelector(
      (state) => state.pokemons,
      (cartItems) =>
        cartItems.filter((item) => item.description.inCartAmmount > 0)
    )
  );

  const chooseProduct = useCallback(
    (qurey: object) => dispatch(getTypesAction(qurey)),
    [dispatch]
  );

  return {
    cartItems,
    chooseProduct
  };
};

export default useTemplateStore;