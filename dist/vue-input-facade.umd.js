(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["vue-input-facade"] = factory();
	else
		root["vue-input-facade"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.4.2',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var nativeFunctionToString = __webpack_require__("9e81");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(nativeFunctionToString).split('toString');

shared('inspectSource', function (it) {
  return nativeFunctionToString.call(it);
});

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || nativeFunctionToString.call(this);
});


/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var nativeFunctionToString = __webpack_require__("9e81");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(nativeFunctionToString.call(WeakMap));


/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 'a', { get: function () { return 7; } }).a != 7;
});


/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9e81":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");

module.exports = shared('native-function-to-string', Function.toString);


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  if (false) {}

  var i
  if ((i = window.document.currentScript) && (i = i.src.match(/(.+\/)[^/]+\.js(\?.*)?$/))) {
    __webpack_require__.p = i[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// CONCATENATED MODULE: ./src/tokens.js
/* harmony default export */ var src_tokens = ({
  '#': {
    pattern: /\d/
  },
  X: {
    pattern: /[0-9a-z]/i
  },
  S: {
    pattern: /[a-z]/i
  },
  A: {
    pattern: /[a-z]/i,
    transform: v => v.toLocaleUpperCase()
  },
  a: {
    pattern: /[a-z]/i,
    transform: v => v.toLocaleLowerCase()
  },
  '\\': {
    escape: true
  }
});
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./src/core.js

const CONFIG_KEY = '__input-facade__';
function FacadeValue(val = '') {
  this.masked = this.raw = val;
}
/**
 * Creates a CustomEvent('input') with detail = { facade: true }
 * used as a way to identify our own input event
 */

function FacadeInputEvent() {
  return new CustomEvent('input', {
    bubbles: true,
    cancelable: true,
    detail: {
      facade: true
    }
  });
}
/**
 * Transform an array or string config into an object
 *
 * @param {object} config The mask config object
 */

function normalizeConfig(config = {}) {
  if (Array.isArray(config) || typeof config === 'string') {
    config = {
      mask: config
    };
  }

  return config;
}
/**
 * ensure that the element we're attaching to is an input element
 * if not try to find an input element in this elements childrens
 *
 * @param {HTMLInputElement} el
 */

function getInputElement(el) {
  const inputElement = el instanceof HTMLInputElement ? el : el.querySelector('input');

  if (!inputElement) {
    /* istanbul ignore next */
    throw new Error('facade directive requires an input element');
  }

  return inputElement;
}
/**
 * Input event handler
 *
 * @param {Event} event The event object
 */

function inputHandler(event) {
  const {
    target,
    detail
  } = event; // We dont need to run this method on the event we emit (prevent event loop)

  if (detail && detail.facade) {
    return false;
  } // since we will be emitting our own custom input event
  // we can stop propagation of this native event


  event.stopPropagation();
  const originalValue = target.value;
  const originalPosition = target.selectionEnd;
  updateValue(target, {
    emit: false
  });
  updateCursor(event, originalValue, originalPosition);
  target.dispatchEvent(FacadeInputEvent());
}
/**
 * Updates the cursor position to the right place after the masking rule was applied
 *
 * @param {InputEvent} event the event that trigger this update
 * @param {String} originalValue the original input value, prior to masking
 * @param {Number} originalPosition the original cursor position
 */

function updateCursor(event, originalValue, originalPosition) {
  const {
    target
  } = event; // setSelectionRange applies only to inputs of types text, search, URL, tel and password.
  // https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/setSelectionRange

  const supportedInputType = ['text', 'tel', 'search', null].includes(target.getAttribute('type'));
  const config = target[CONFIG_KEY] && target[CONFIG_KEY].config;

  if (target !== document.activeElement || !supportedInputType || !config.mask) {
    return;
  } // get some information about the cursor based on the original value


  const pasting = event.inputType === 'insertFromPaste';
  const isCursorAtEnd = (event.data || pasting) && originalPosition == originalValue.length;
  let insertedChar = originalValue[originalPosition - 1];
  const newValue = target.value.toLocaleLowerCase(); // set the cursor position to an appropriate location

  let cursorPosition = originalPosition;

  if (isCursorAtEnd) {
    cursorPosition = newValue.length;
  } else if (insertedChar) {
    insertedChar = insertedChar.toLocaleLowerCase();
    let newPosition = cursorPosition; // if the last inserted char was changed, increment position until find it again

    while (newPosition <= newValue.length && newValue.charAt(newPosition - 1) !== insertedChar) {
      newPosition++;
    } // if we didnt find the digit must be an unacceptable char, leave the cursor where it was


    cursorPosition = newPosition <= newValue.length ? newPosition : cursorPosition - 1;
  }

  target.setSelectionRange(cursorPosition, cursorPosition);
  setTimeout(function () {
    /* istanbul ignore next */
    target.setSelectionRange(cursorPosition, cursorPosition);
  }, 0);
}
/**
 * Updates the element's value and unmasked value based on the masking config rules
 *
 * @param {HTMLInputElement} el The input element to update
 * @param {object} options
 * @param {Boolean} options.emit Wether to dispatch a new InputEvent or not
 * @param {Boolean} options.force Forces the update even if the old value and the new value are the same
 */

function updateValue(el, {
  emit = true,
  force = false
} = {}) {
  const {
    config,
    oldValue
  } = el[CONFIG_KEY];

  if (force || oldValue !== el.value) {
    const newValue = masker(el.value, config);
    el[CONFIG_KEY].oldValue = newValue.masked;
    el.value = newValue.masked;
    el.unmaskedValue = newValue.raw;
    emit && el.dispatchEvent(FacadeInputEvent());
  }
}
// CONCATENATED MODULE: ./src/masker.js



let tokenDefinitions = src_tokens;
/**
 * Overrides the default global token definitions
 *
 * @param {object} tokens the new token object
 */

function setTokens(tokens) {
  tokenDefinitions = tokens;
}
/**
 * Given an array of masks, determines which one is the appropriate one based on the value
 *
 * @param {String} value the value to mask
 * @param {{masks: [String]}} config
 * @param {Array} config.masks the list of masks to choose from
 * @returns {FacadeValue} facade value object
 */

function dynamic(value, config = {}) {
  const masks = config.masks.slice().sort((a, b) => a.length - b.length);

  const withConfig = overrides => Object.assign({}, config, overrides);

  const fullRawValue = formatter(value, withConfig({
    mask: masks[masks.length - 1],
    short: true
  }));

  const compareWithFullRawValue = currentMask => {
    const maskedVal = formatter(value, withConfig({
      mask: currentMask,
      short: true
    }));
    return maskedVal.raw === fullRawValue.raw;
  };

  for (let i = 0; i < masks.length; i++) {
    const currentMask = masks[i];
    const nextMask = masks[i + 1];

    if (!nextMask || compareWithFullRawValue(currentMask)) {
      return formatter(value, withConfig({
        mask: currentMask
      }));
    }
  }

  return new FacadeValue(); // empty masks
}
/**
 * Formats the value based on the given masking rule
 *
 * @param {string} value the value to mask
 * @param {{mask: String, tokens: Object, short: Boolean}} config
 * @param {string} config.mask the masking string
 * @param {object} config.tokens the tokens to add/override to the global
 * @param {boolean} config.short to keep the string as short as possible (not append extra chars at the end)
 */

function formatter(value = '', config = {}) {
  let {
    mask = '',
    tokens,
    short = false
  } = config; // append/override global tokens instead of complete override

  tokens = tokens ? Object.assign({}, tokenDefinitions, tokens) : tokenDefinitions; // ensure we have a string

  value = value.toString();
  let output = new FacadeValue();
  let escaped = false;
  let valueIndex = 0;
  let maskIndex = 0;
  let accumulator = '';

  while (maskIndex < mask.length) {
    const maskChar = mask[maskIndex];
    const masker = tokens[maskChar];
    let char = value[valueIndex]; // no more input charactors and next charactor is a masked char

    if (!char && (short || masker)) break;

    if (masker && !escaped) {
      // when is escape char, do not mask, just continue
      if (masker.escape) {
        escaped = true;
        maskIndex++;
        continue;
      }

      if (masker.pattern.test(char)) {
        char = masker.transform ? masker.transform(char) : char;
        output.raw += char;
        output.masked += accumulator + char;
        accumulator = '';
        maskIndex++;
      }

      valueIndex++;
    } else {
      accumulator += maskChar;
      if (char === maskChar) valueIndex++; // user typed the same char

      escaped = false;
      maskIndex++;
    }
  } // if there is no raw value, set masked to empty to avoid
  // showing masking characters in an otherwise empty input


  if (output.raw && !short) {
    output.masked += accumulator;
  }

  return output;
}
/**
 * Facade to formatter/dynamic when mask is String or Array
 *
 * @param {String} value the value to mask
 * @param {*} config the masking config
 * @returns {FacadeValue} facade value object
 */

function masker(value, config) {
  config = normalizeConfig(config); // disable on empty mask

  if (!config.mask) {
    return new FacadeValue(value);
  }

  return Array.isArray(config.mask) ? dynamic(value, Object.assign({}, config, {
    masks: config.mask
  })) : formatter(value, config);
}
// CONCATENATED MODULE: ./src/directive.js

const directive_CONFIG_KEY = CONFIG_KEY;
/* harmony default export */ var directive = ({
  bind: function bind(el, binding) {
    el = getInputElement(el);
    el.addEventListener('input', inputHandler, true);
    el[directive_CONFIG_KEY] = {
      config: normalizeConfig(binding.value) // TODO: if we set this here it won't try to mask on initial value
      // should this be a default bahaviour?
      // oldValue: el.value

    }; // set initial value

    updateValue(el);
  },
  update: (el, {
    value,
    oldValue
  }) => {
    el = getInputElement(el);

    if (value !== oldValue) {
      el[directive_CONFIG_KEY].config = normalizeConfig(value);
      updateValue(el, {
        force: true
      });
    } else {
      updateValue(el);
    }
  },
  unbind: el => el.removeEventListener('input', inputHandler, true)
});
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"9eb248da-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/component.vue?vue&type=template&id=29578026&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('input',{directives:[{name:"facade",rawName:"v-facade",value:(_vm.config),expression:"config"}],attrs:{"type":"text"},domProps:{"value":_vm.maskedValue},on:{"input":_vm.input,"blur":function($event){return _vm.$emit('blur')},"focus":function($event){return _vm.$emit('focus')}}})}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/component.vue?vue&type=template&id=29578026&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/component.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//

/**
 * The component is basically a wrapper around a native input element, as such it inherits all
 * properties available to [HTMLInputElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement).
 *
 * However it provides a cleaner and more straight forward interface to the directive's features.
 *
 * @example ../docs/component.md
 */

/* harmony default export */ var componentvue_type_script_lang_js_ = ({
  name: 'InputFacade',
  props: {
    /**
     * The mask pattern for this input
     */
    mask: [String, Array],

    /**
     * Weather to emit the value masked or unmasked
     */
    masked: {
      type: Boolean,
      default: false
    },

    /**
     * Token object to override the defaults with
     */
    tokens: Object,

    /**
     * The input's value
     * @model
     */
    value: [String, Number]
  },
  directives: {
    facade: directive
  },

  data() {
    return {
      emittedValue: this.value,
      maskedValue: this.value,
      unmaskedValue: null
    };
  },

  watch: {
    value(newValue) {
      // avoid trigering the directive's update hook when we emit
      // the unmasked value to the parent component
      if (newValue !== this.emittedValue) {
        this.maskedValue = newValue;
      }
    },

    mask(newMask) {
      if (!newMask) {
        // when removing the masking rule, set the displayed value to the unmasked
        // to remove any unwanted masking characters from the input
        this.maskedValue = this.unmaskedValue;
      }
    },

    masked() {
      this.refresh();
    }

  },
  computed: {
    config() {
      return {
        mask: this.mask,
        tokens: this.tokens
      };
    }

  },
  methods: {
    input({
      target
    }) {
      this.maskedValue = target.value;
      this.unmaskedValue = target.unmaskedValue;
      this.refresh();
    },

    refresh() {
      let newEmittedValue = this.mask && this.masked ? this.maskedValue : this.unmaskedValue; // avoid unecessary emit when has no change

      if (this.emittedValue !== newEmittedValue) {
        this.emittedValue = newEmittedValue;
        /**
         * Input event when the value changes
         * @param {value}
         */

        this.$emit('input', newEmittedValue);
      }
    }

  }
});
// CONCATENATED MODULE: ./src/component.vue?vue&type=script&lang=js&
 /* harmony default export */ var src_componentvue_type_script_lang_js_ = (componentvue_type_script_lang_js_); 
// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/component.vue





/* normalize component */

var component = normalizeComponent(
  src_componentvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  null,
  null
  
)

/* harmony default export */ var src_component = (component.exports);
// CONCATENATED MODULE: ./src/plugin.js




/**
 * Vue plugin definittion
 *
 * @param {Vue} Vue the vue instance
 * @param {Object} options.tokens the tokens to use as global tokens
 * @param {Object} options.name the tokens to use as global tokens
 */

function install(Vue, options = {}) {
  // override the default tokens
  if (options.tokens) {
    setTokens(options.tokens);
  }

  Vue.component(src_component.name, src_component);
  Vue.directive(options.name || 'facade', directive);
  Vue.filter(options.name || 'facade', filter);
}
/**
 * Utility function to be used as a vue filter
 *
 * @param {String} value the value to apply the filter to
 * @param {*} config the masking config
 * @returns {string} the masked value as returned by the masker function
 */


function filter(value, config) {
  return masker(value, config).masked;
}

/* harmony default export */ var src_plugin = (install);
 // Install by default if included from script tag

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install);
}
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js
/* concated harmony reexport InputFacade */__webpack_require__.d(__webpack_exports__, "InputFacade", function() { return src_component; });
/* concated harmony reexport facade */__webpack_require__.d(__webpack_exports__, "facade", function() { return directive; });
/* concated harmony reexport tokens */__webpack_require__.d(__webpack_exports__, "tokens", function() { return src_tokens; });
/* concated harmony reexport masker */__webpack_require__.d(__webpack_exports__, "masker", function() { return masker; });
/* concated harmony reexport filter */__webpack_require__.d(__webpack_exports__, "filter", function() { return filter; });


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_plugin);



/***/ })

/******/ });
});