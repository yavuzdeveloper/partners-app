import _ from "lodash";

export const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_PARTNERS":
      return { ...state, data: action.payload };

    case "NAME_FILTER":
      return {
        ...state,
        data: state.data.filter(partner =>
          partner.name.includes(action.payload)
        ),
      };

    case "PREFIX_FILTER":
      return {
        ...state,
        data: state.data.filter(partner =>
          partner.groupPrefix.includes(action.payload)
        ),
      };

    case "OFSTED_RATING_FILTER":
      let Data = [];
      action.payload.map(item =>
        state.data.filter(partner => {
          if (partner.ofstedRating === item) {
            Data.push(partner);
          }
        })
      );
      return {
        ...state,
        data: Data,
      };

    case "INPUT_NAME":
      return { ...state, inputName: action.payload };

    case "INPUT_PREFIX":
      return { ...state, inputPrefix: action.payload };

    case "SELECTED_OFSTED_RATING":
      return { ...state, selectedOfstedRating: action.payload };

    case "CHANGE_SORT":
      if (state.column === action.column) {
        return {
          ...state,
          data: state.data.slice().reverse(),
          direction:
            state.direction === "ascending" ? "descending" : "ascending",
        };
      }

      return {
        column: action.column,
        data: _.sortBy(state.data, [action.column]),
        direction: "ascending",
      };
    default:
      throw new Error();
  }
};
