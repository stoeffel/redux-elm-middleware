var _stoeffel$redux_elm_middleware$Native_Redux = function() {

  function dispatch(payload) {
    window.__REDUX_ELM_STORE__.dispatch({
      type: '@@elm',
      payload: payload
    });
    return payload;
  }


  return {
    dispatch: dispatch
  };
}()
