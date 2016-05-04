'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var ELM = '@@elm';

var createElmMiddleware = function createElmMiddleware(elm) {
  var elmMiddleware = function elmMiddleware(_ref) {
    var dispatch = _ref.dispatch;
    return function (next) {
      return function (action) {
        if (elm.ports[action.type]) elm.ports[action.type].send(action.payload || null);
        next(action);
      };
    };
  };
  var run = function run(store) {
    return elm.ports.out.subscribe(function (x) {
      return store.dispatch({ type: ELM, payload: x });
    });
  };

  return { elmMiddleware: elmMiddleware, run: run };
};

exports.default = createElmMiddleware;
var reducer = exports.reducer = function reducer() {
  var state = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
  var action = arguments[1];

  if (action.type === ELM) {
    return action.payload;
  }

  return state;
};
