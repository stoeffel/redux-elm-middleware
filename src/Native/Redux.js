var _stoeffel$redux_elm_middleware$Native_Redux = function() {

  function dispatch(action, payload) {
    window.__REDUX_ELM_STORE__.dispatch({
      type: '@@elm/' + action.ctor,
      payload: payload
    });
    return payload;
  }


  return {
    dispatch: F2(dispatch)
  };
}()
