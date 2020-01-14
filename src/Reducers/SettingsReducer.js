export const SettingReducer = (state, action) => {
  switch (action.type) {
    case 'SET_ROW':
      return { ...state, isRow: !state.isRow };

    case 'SET_SECTIONS':
      let { payload: { key, value } } = action;
      const { subsections } = state;
      return { ...state, subsections: { ...subsections, [key]: value }};
  
    case 'ADD_LABEL':
      const { subsections: { Labels } } = state;
      return { ...state, subsections: { ...state.subsections, 'Labels': [...Labels, action.label] } }

    default:
      return state;
  }
};
