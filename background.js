import { c as __commonJSMin, l as __exportAll, n as initializeDownloadTracking, s as require_browser_polyfill, t as DiskBackedFS, u as __toESM } from "./disk-backed-fs-BQhKauW3.js";
//#region ../../node_modules/.pnpm/redux@5.0.1/node_modules/redux/dist/redux.mjs
function formatProdErrorMessage$1(code) {
	return `Minified Redux error #${code}; visit https://redux.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
var symbol_observable_default = /* @__PURE__ */ (() => typeof Symbol === "function" && Symbol.observable || "@@observable")();
var randomString = () => Math.random().toString(36).substring(7).split("").join(".");
var actionTypes_default = {
	INIT: `@@redux/INIT${/* @__PURE__ */ randomString()}`,
	REPLACE: `@@redux/REPLACE${/* @__PURE__ */ randomString()}`,
	PROBE_UNKNOWN_ACTION: () => `@@redux/PROBE_UNKNOWN_ACTION${randomString()}`
};
function isPlainObject$1(obj) {
	if (typeof obj !== "object" || obj === null) return false;
	let proto = obj;
	while (Object.getPrototypeOf(proto) !== null) proto = Object.getPrototypeOf(proto);
	return Object.getPrototypeOf(obj) === proto || Object.getPrototypeOf(obj) === null;
}
function createStore$1(reducer, preloadedState, enhancer) {
	if (typeof reducer !== "function") throw new Error(formatProdErrorMessage$1(2));
	if (typeof preloadedState === "function" && typeof enhancer === "function" || typeof enhancer === "function" && typeof arguments[3] === "function") throw new Error(formatProdErrorMessage$1(0));
	if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
		enhancer = preloadedState;
		preloadedState = void 0;
	}
	if (typeof enhancer !== "undefined") {
		if (typeof enhancer !== "function") throw new Error(formatProdErrorMessage$1(1));
		return enhancer(createStore$1)(reducer, preloadedState);
	}
	let currentReducer = reducer;
	let currentState = preloadedState;
	let currentListeners = /* @__PURE__ */ new Map();
	let nextListeners = currentListeners;
	let listenerIdCounter = 0;
	let isDispatching = false;
	function ensureCanMutateNextListeners() {
		if (nextListeners === currentListeners) {
			nextListeners = /* @__PURE__ */ new Map();
			currentListeners.forEach((listener, key) => {
				nextListeners.set(key, listener);
			});
		}
	}
	function getState() {
		if (isDispatching) throw new Error(formatProdErrorMessage$1(3));
		return currentState;
	}
	function subscribe(listener) {
		if (typeof listener !== "function") throw new Error(formatProdErrorMessage$1(4));
		if (isDispatching) throw new Error(formatProdErrorMessage$1(5));
		let isSubscribed = true;
		ensureCanMutateNextListeners();
		const listenerId = listenerIdCounter++;
		nextListeners.set(listenerId, listener);
		return function unsubscribe() {
			if (!isSubscribed) return;
			if (isDispatching) throw new Error(formatProdErrorMessage$1(6));
			isSubscribed = false;
			ensureCanMutateNextListeners();
			nextListeners.delete(listenerId);
			currentListeners = null;
		};
	}
	function dispatch(action) {
		if (!isPlainObject$1(action)) throw new Error(formatProdErrorMessage$1(7));
		if (typeof action.type === "undefined") throw new Error(formatProdErrorMessage$1(8));
		if (typeof action.type !== "string") throw new Error(formatProdErrorMessage$1(17));
		if (isDispatching) throw new Error(formatProdErrorMessage$1(9));
		try {
			isDispatching = true;
			currentState = currentReducer(currentState, action);
		} finally {
			isDispatching = false;
		}
		(currentListeners = nextListeners).forEach((listener) => {
			listener();
		});
		return action;
	}
	function replaceReducer(nextReducer) {
		if (typeof nextReducer !== "function") throw new Error(formatProdErrorMessage$1(10));
		currentReducer = nextReducer;
		dispatch({ type: actionTypes_default.REPLACE });
	}
	function observable() {
		const outerSubscribe = subscribe;
		return {
			/**
			* The minimal observable subscription method.
			* @param observer Any object that can be used as an observer.
			* The observer object should have a `next` method.
			* @returns An object with an `unsubscribe` method that can
			* be used to unsubscribe the observable from the store, and prevent further
			* emission of values from the observable.
			*/
			subscribe(observer) {
				if (typeof observer !== "object" || observer === null) throw new Error(formatProdErrorMessage$1(11));
				function observeState() {
					const observerAsObserver = observer;
					if (observerAsObserver.next) observerAsObserver.next(getState());
				}
				observeState();
				return { unsubscribe: outerSubscribe(observeState) };
			},
			[symbol_observable_default]() {
				return this;
			}
		};
	}
	dispatch({ type: actionTypes_default.INIT });
	return {
		dispatch,
		subscribe,
		getState,
		replaceReducer,
		[symbol_observable_default]: observable
	};
}
function assertReducerShape(reducers) {
	Object.keys(reducers).forEach((key) => {
		const reducer = reducers[key];
		if (typeof reducer(void 0, { type: actionTypes_default.INIT }) === "undefined") throw new Error(formatProdErrorMessage$1(12));
		if (typeof reducer(void 0, { type: actionTypes_default.PROBE_UNKNOWN_ACTION() }) === "undefined") throw new Error(formatProdErrorMessage$1(13));
	});
}
function combineReducers(reducers) {
	const reducerKeys = Object.keys(reducers);
	const finalReducers = {};
	for (let i = 0; i < reducerKeys.length; i++) {
		const key = reducerKeys[i];
		if (typeof reducers[key] === "function") finalReducers[key] = reducers[key];
	}
	const finalReducerKeys = Object.keys(finalReducers);
	let shapeAssertionError;
	try {
		assertReducerShape(finalReducers);
	} catch (e) {
		shapeAssertionError = e;
	}
	return function combination(state = {}, action) {
		if (shapeAssertionError) throw shapeAssertionError;
		let hasChanged = false;
		const nextState = {};
		for (let i = 0; i < finalReducerKeys.length; i++) {
			const key = finalReducerKeys[i];
			const reducer = finalReducers[key];
			const previousStateForKey = state[key];
			const nextStateForKey = reducer(previousStateForKey, action);
			if (typeof nextStateForKey === "undefined") {
				action && action.type;
				throw new Error(formatProdErrorMessage$1(14));
			}
			nextState[key] = nextStateForKey;
			hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
		}
		hasChanged = hasChanged || finalReducerKeys.length !== Object.keys(state).length;
		return hasChanged ? nextState : state;
	};
}
function compose(...funcs) {
	if (funcs.length === 0) return (arg) => arg;
	if (funcs.length === 1) return funcs[0];
	return funcs.reduce((a, b) => (...args) => a(b(...args)));
}
function applyMiddleware(...middlewares) {
	return (createStore2) => (reducer, preloadedState) => {
		const store = createStore2(reducer, preloadedState);
		let dispatch = () => {
			throw new Error(formatProdErrorMessage$1(15));
		};
		const middlewareAPI = {
			getState: store.getState,
			dispatch: (action, ...args) => dispatch(action, ...args)
		};
		dispatch = compose(...middlewares.map((middleware) => middleware(middlewareAPI)))(store.dispatch);
		return {
			...store,
			dispatch
		};
	};
}
function isAction(action) {
	return isPlainObject$1(action) && "type" in action && typeof action.type === "string";
}
//#endregion
//#region ../../node_modules/.pnpm/immer@11.1.15/node_modules/immer/dist/immer.mjs
var NOTHING = Symbol.for("immer-nothing");
var DRAFTABLE = Symbol.for("immer-draftable");
var DRAFT_STATE = Symbol.for("immer-state");
function die(error, ...args) {
	throw new Error(`[Immer] minified error nr: ${error}. Full error at: https://bit.ly/3cXEKWf`);
}
var O = Object;
var getPrototypeOf = O.getPrototypeOf;
var CONSTRUCTOR = "constructor";
var PROTOTYPE = "prototype";
var CONFIGURABLE = "configurable";
var ENUMERABLE = "enumerable";
var WRITABLE = "writable";
var VALUE = "value";
var isDraft = (value) => !!value && !!value[DRAFT_STATE];
function isDraftable(value) {
	if (!value) return false;
	return isPlainObject(value) || isArray(value) || !!value[DRAFTABLE] || !!value[CONSTRUCTOR]?.[DRAFTABLE] || isMap(value) || isSet(value);
}
var objectCtorString = O[PROTOTYPE][CONSTRUCTOR].toString();
var cachedCtorStrings = /* @__PURE__ */ new WeakMap();
function isPlainObject(value) {
	if (!value || !isObjectish(value)) return false;
	const proto = getPrototypeOf(value);
	if (proto === null || proto === O[PROTOTYPE]) return true;
	const Ctor = O.hasOwnProperty.call(proto, CONSTRUCTOR) && proto[CONSTRUCTOR];
	if (Ctor === Object) return true;
	if (!isFunction$1(Ctor)) return false;
	let ctorString = cachedCtorStrings.get(Ctor);
	if (ctorString === void 0) {
		ctorString = Function.toString.call(Ctor);
		cachedCtorStrings.set(Ctor, ctorString);
	}
	return ctorString === objectCtorString;
}
function each(obj, iter, strict = true) {
	if (getArchtype(obj) === 0) (strict ? Reflect.ownKeys(obj) : O.keys(obj)).forEach((key) => {
		iter(key, obj[key], obj);
	});
	else obj.forEach((entry, index) => iter(index, entry, obj));
}
function getArchtype(thing) {
	const state = thing[DRAFT_STATE];
	return state ? state.type_ : isArray(thing) ? 1 : isMap(thing) ? 2 : isSet(thing) ? 3 : 0;
}
var has = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.has(prop) : O[PROTOTYPE].hasOwnProperty.call(thing, prop);
var get = (thing, prop, type = getArchtype(thing)) => type === 2 ? thing.get(prop) : thing[prop];
var set = (thing, propOrOldValue, value, type = getArchtype(thing)) => {
	if (type === 2) thing.set(propOrOldValue, value);
	else if (type === 3) thing.add(value);
	else thing[propOrOldValue] = value;
};
function is(x, y) {
	if (x === y) return x !== 0 || 1 / x === 1 / y;
	else return x !== x && y !== y;
}
var isArray = Array.isArray;
var isMap = (target) => target instanceof Map;
var isSet = (target) => target instanceof Set;
var isObjectish = (target) => typeof target === "object";
var isFunction$1 = (target) => typeof target === "function";
var isBoolean$1 = (target) => typeof target === "boolean";
function isArrayIndex(value) {
	const n = +value;
	return Number.isInteger(n) && String(n) === value;
}
var latest = (state) => state.copy_ || state.base_;
var getFinalValue = (state) => state.modified_ ? state.copy_ : state.base_;
function shallowCopy(base, strict) {
	if (isMap(base)) return new Map(base);
	if (isSet(base)) return new Set(base);
	if (isArray(base)) return Array[PROTOTYPE].slice.call(base);
	const isPlain = isPlainObject(base);
	if (strict === true || strict === "class_only" && !isPlain) {
		const descriptors = O.getOwnPropertyDescriptors(base);
		delete descriptors[DRAFT_STATE];
		let keys = Reflect.ownKeys(descriptors);
		for (let i = 0; i < keys.length; i++) {
			const key = keys[i];
			const desc = descriptors[key];
			if (desc[WRITABLE] === false) {
				desc[WRITABLE] = true;
				desc[CONFIGURABLE] = true;
			}
			if (desc.get || desc.set) descriptors[key] = {
				[CONFIGURABLE]: true,
				[WRITABLE]: true,
				[ENUMERABLE]: desc[ENUMERABLE],
				[VALUE]: base[key]
			};
		}
		return O.create(getPrototypeOf(base), descriptors);
	} else {
		const proto = getPrototypeOf(base);
		if (proto !== null && isPlain) return { ...base };
		const obj = O.create(proto);
		return O.assign(obj, base);
	}
}
function freeze(obj, deep = false) {
	if (isFrozen(obj) || isDraft(obj) || !isDraftable(obj)) return obj;
	if (getArchtype(obj) > 1) O.defineProperties(obj, {
		set: dontMutateMethodOverride,
		add: dontMutateMethodOverride,
		clear: dontMutateMethodOverride,
		delete: dontMutateMethodOverride
	});
	O.freeze(obj);
	if (deep) each(obj, (_key, value) => {
		freeze(value, true);
	}, false);
	return obj;
}
function dontMutateFrozenCollections() {
	die(2);
}
var dontMutateMethodOverride = { [VALUE]: dontMutateFrozenCollections };
function isFrozen(obj) {
	if (obj === null || !isObjectish(obj)) return true;
	return O.isFrozen(obj);
}
var PluginMapSet = "MapSet";
var PluginPatches = "Patches";
var PluginArrayMethods = "ArrayMethods";
var plugins = {};
function getPlugin(pluginKey) {
	const plugin = plugins[pluginKey];
	if (!plugin) die(0, pluginKey);
	return plugin;
}
var isPluginLoaded = (pluginKey) => !!plugins[pluginKey];
var currentScope;
var getCurrentScope = () => currentScope;
var createScope = (parent_, immer_) => ({
	drafts_: [],
	parent_,
	immer_,
	canAutoFreeze_: true,
	unfinalizedDrafts_: 0,
	handledSet_: /* @__PURE__ */ new Set(),
	processedForPatches_: /* @__PURE__ */ new Set(),
	mapSetPlugin_: isPluginLoaded(PluginMapSet) ? getPlugin(PluginMapSet) : void 0,
	arrayMethodsPlugin_: isPluginLoaded(PluginArrayMethods) ? getPlugin(PluginArrayMethods) : void 0
});
function usePatchesInScope(scope, patchListener) {
	if (patchListener) {
		scope.patchPlugin_ = getPlugin(PluginPatches);
		scope.patches_ = [];
		scope.inversePatches_ = [];
		scope.patchListener_ = patchListener;
	}
}
function revokeScope(scope) {
	leaveScope(scope);
	scope.drafts_.forEach(revokeDraft);
	scope.drafts_ = null;
}
function leaveScope(scope) {
	if (scope === currentScope) currentScope = scope.parent_;
}
var enterScope = (immer2) => currentScope = createScope(currentScope, immer2);
function revokeDraft(draft) {
	const state = draft[DRAFT_STATE];
	if (state.type_ === 0 || state.type_ === 1) state.revoke_();
	else state.revoked_ = true;
}
function processResult(result, scope) {
	scope.unfinalizedDrafts_ = scope.drafts_.length;
	const baseDraft = scope.drafts_[0];
	if (result !== void 0 && result !== baseDraft) {
		if (baseDraft[DRAFT_STATE].modified_) {
			revokeScope(scope);
			die(4);
		}
		if (isDraftable(result)) result = finalize(scope, result);
		const { patchPlugin_ } = scope;
		if (patchPlugin_) patchPlugin_.generateReplacementPatches_(baseDraft[DRAFT_STATE].base_, result, scope);
	} else result = finalize(scope, baseDraft);
	maybeFreeze(scope, result, true);
	revokeScope(scope);
	if (scope.patches_) scope.patchListener_(scope.patches_, scope.inversePatches_);
	return result !== NOTHING ? result : void 0;
}
function finalize(rootScope, value) {
	if (isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	if (!state) return handleValue(value, rootScope.handledSet_, rootScope);
	if (!isSameScope(state, rootScope)) return value;
	if (!state.modified_) return state.base_;
	if (!state.finalized_) {
		const { callbacks_ } = state;
		if (callbacks_) while (callbacks_.length > 0) callbacks_.pop()(rootScope);
		generatePatchesAndFinalize(state, rootScope);
	}
	return state.copy_;
}
function maybeFreeze(scope, value, deep = false) {
	if (!scope.parent_ && scope.immer_.autoFreeze_ && scope.canAutoFreeze_) freeze(value, deep);
}
function markStateFinalized(state) {
	state.finalized_ = true;
	state.scope_.unfinalizedDrafts_--;
}
var isSameScope = (state, rootScope) => state.scope_ === rootScope;
var EMPTY_LOCATIONS_RESULT = [];
function updateDraftInParent(parent, draftValue, finalizedValue, originalKey) {
	const parentCopy = latest(parent);
	const parentType = parent.type_;
	if (originalKey !== void 0) {
		if (get(parentCopy, originalKey, parentType) === draftValue) {
			set(parentCopy, originalKey, finalizedValue, parentType);
			return;
		}
	}
	if (!parent.draftLocations_) {
		const draftLocations = parent.draftLocations_ = /* @__PURE__ */ new Map();
		each(parentCopy, (key, value) => {
			if (isDraft(value)) {
				const keys = draftLocations.get(value) || [];
				keys.push(key);
				draftLocations.set(value, keys);
			}
		});
	}
	const locations = parent.draftLocations_.get(draftValue) ?? EMPTY_LOCATIONS_RESULT;
	for (const location of locations) set(parentCopy, location, finalizedValue, parentType);
}
function registerChildFinalizationCallback(parent, child, key) {
	parent.callbacks_.push(function childCleanup(rootScope) {
		const state = child;
		if (!state || !isSameScope(state, rootScope)) return;
		rootScope.mapSetPlugin_?.fixSetContents(state);
		const finalizedValue = getFinalValue(state);
		updateDraftInParent(parent, state.draft_ ?? state, finalizedValue, key);
		generatePatchesAndFinalize(state, rootScope);
	});
}
function generatePatchesAndFinalize(state, rootScope) {
	if (state.modified_ && !state.finalized_ && (state.type_ === 3 || state.type_ === 1 && state.allIndicesReassigned_ || (state.assigned_?.size ?? 0) > 0)) {
		const { patchPlugin_ } = rootScope;
		if (patchPlugin_) {
			const basePath = patchPlugin_.getPath(state);
			if (basePath) patchPlugin_.generatePatches_(state, basePath, rootScope);
		}
		markStateFinalized(state);
	}
}
function handleCrossReference(target, key, value) {
	const { scope_ } = target;
	if (isDraft(value)) {
		const state = value[DRAFT_STATE];
		if (isSameScope(state, scope_)) state.callbacks_.push(function crossReferenceCleanup() {
			prepareCopy(target);
			updateDraftInParent(target, value, getFinalValue(state), key);
		});
	} else if (isDraftable(value)) target.callbacks_.push(function nestedDraftCleanup() {
		const targetCopy = latest(target);
		if (target.type_ === 3) {
			if (targetCopy.has(value)) handleValue(value, scope_.handledSet_, scope_);
		} else if (get(targetCopy, key, target.type_) === value) {
			if (scope_.drafts_.length > 1 && (target.assigned_.get(key) ?? false) === true && target.copy_) handleValue(get(target.copy_, key, target.type_), scope_.handledSet_, scope_);
		}
	});
}
function handleValue(target, handledSet, rootScope) {
	if (!rootScope.immer_.autoFreeze_ && rootScope.unfinalizedDrafts_ < 1) return target;
	if (isDraft(target) || handledSet.has(target) || !isDraftable(target) || isFrozen(target)) return target;
	handledSet.add(target);
	each(target, (key, value) => {
		if (isDraft(value)) {
			const state = value[DRAFT_STATE];
			if (isSameScope(state, rootScope)) {
				set(target, key, getFinalValue(state), target.type_);
				markStateFinalized(state);
			}
		} else if (isDraftable(value)) handleValue(value, handledSet, rootScope);
	});
	return target;
}
function createProxyProxy(base, parent) {
	const baseIsArray = isArray(base);
	const state = {
		type_: baseIsArray ? 1 : 0,
		scope_: parent ? parent.scope_ : getCurrentScope(),
		modified_: false,
		finalized_: false,
		assigned_: void 0,
		parent_: parent,
		base_: base,
		draft_: null,
		copy_: null,
		revoke_: null,
		isManual_: false,
		callbacks_: void 0
	};
	let target = state;
	let traps = objectTraps;
	if (baseIsArray) {
		target = [state];
		traps = arrayTraps;
	}
	const { revoke, proxy } = Proxy.revocable(target, traps);
	state.draft_ = proxy;
	state.revoke_ = revoke;
	return [proxy, state];
}
var objectTraps = {
	get(state, prop) {
		if (prop === DRAFT_STATE) return state;
		let arrayPlugin = state.scope_.arrayMethodsPlugin_;
		const isArrayWithStringProp = state.type_ === 1 && typeof prop === "string";
		if (isArrayWithStringProp) {
			if (arrayPlugin?.isArrayOperationMethod(prop)) return arrayPlugin.createMethodInterceptor(state, prop);
		}
		const source = latest(state);
		if (!has(source, prop, state.type_)) return readPropFromProto(state, source, prop);
		const value = source[prop];
		if (state.finalized_ || !isDraftable(value)) return value;
		if (isArrayWithStringProp && state.operationMethod && arrayPlugin?.isMutatingArrayMethod(state.operationMethod) && isArrayIndex(prop)) return value;
		if (value === peek(state.base_, prop) || isRelocatedBaseRef(state, prop, value)) {
			prepareCopy(state);
			const childKey = state.type_ === 1 ? +prop : prop;
			const childDraft = createProxy(state.scope_, value, state, childKey);
			return state.copy_[childKey] = childDraft;
		}
		return value;
	},
	has(state, prop) {
		return prop in latest(state);
	},
	ownKeys(state) {
		return Reflect.ownKeys(latest(state));
	},
	set(state, prop, value) {
		const desc = getDescriptorFromProto(latest(state), prop);
		if (desc?.set) {
			desc.set.call(state.draft_, value);
			return true;
		}
		if (!state.modified_) {
			const current2 = peek(latest(state), prop);
			const currentState = current2?.[DRAFT_STATE];
			if (currentState && currentState.base_ === value) {
				state.copy_[prop] = value;
				state.assigned_.set(prop, false);
				return true;
			}
			if (is(value, current2) && (value !== void 0 || has(state.base_, prop, state.type_))) return true;
			prepareCopy(state);
			markChanged(state);
		}
		if (state.copy_[prop] === value && (value !== void 0 || has(state.copy_, prop, state.type_)) || Number.isNaN(value) && Number.isNaN(state.copy_[prop])) return true;
		state.copy_[prop] = value;
		state.assigned_.set(prop, true);
		handleCrossReference(state, prop, value);
		return true;
	},
	deleteProperty(state, prop) {
		prepareCopy(state);
		if (peek(state.base_, prop) !== void 0 || prop in state.base_) {
			state.assigned_.set(prop, false);
			markChanged(state);
		} else state.assigned_.delete(prop);
		if (state.copy_) delete state.copy_[prop];
		return true;
	},
	getOwnPropertyDescriptor(state, prop) {
		const owner = latest(state);
		const desc = Reflect.getOwnPropertyDescriptor(owner, prop);
		if (!desc) return desc;
		return {
			[WRITABLE]: true,
			[CONFIGURABLE]: state.type_ !== 1 || prop !== "length",
			[ENUMERABLE]: desc[ENUMERABLE],
			[VALUE]: owner[prop]
		};
	},
	defineProperty() {
		die(11);
	},
	getPrototypeOf(state) {
		return getPrototypeOf(state.base_);
	},
	setPrototypeOf() {
		die(12);
	}
};
var arrayTraps = {};
for (let key in objectTraps) {
	let fn = objectTraps[key];
	arrayTraps[key] = function() {
		const args = arguments;
		args[0] = args[0][0];
		return fn.apply(this, args);
	};
}
arrayTraps.deleteProperty = function(state, prop) {
	return arrayTraps.set.call(this, state, prop, void 0);
};
arrayTraps.set = function(state, prop, value) {
	return objectTraps.set.call(this, state[0], prop, value, state[0]);
};
function peek(draft, prop) {
	const state = draft[DRAFT_STATE];
	return (state ? latest(state) : draft)[prop];
}
function isRelocatedBaseRef(state, prop, value) {
	if (state.type_ !== 1 || !state.allIndicesReassigned_ || state.assigned_?.get(prop) || !isDraftable(value) || value[DRAFT_STATE]) return false;
	return state.baseRefs_.has(value);
}
function readPropFromProto(state, source, prop) {
	const desc = getDescriptorFromProto(source, prop);
	return desc ? VALUE in desc ? desc[VALUE] : desc.get?.call(state.draft_) : void 0;
}
function getDescriptorFromProto(source, prop) {
	if (!(prop in source)) return void 0;
	let proto = getPrototypeOf(source);
	while (proto) {
		const desc = Object.getOwnPropertyDescriptor(proto, prop);
		if (desc) return desc;
		proto = getPrototypeOf(proto);
	}
}
function markChanged(state) {
	if (!state.modified_) {
		state.modified_ = true;
		if (state.parent_) markChanged(state.parent_);
	}
}
function prepareCopy(state) {
	if (!state.copy_) {
		state.assigned_ = /* @__PURE__ */ new Map();
		state.copy_ = shallowCopy(state.base_, state.scope_.immer_.useStrictShallowCopy_);
	}
}
var Immer2 = class {
	constructor(config) {
		this.autoFreeze_ = true;
		this.useStrictShallowCopy_ = false;
		this.useStrictIteration_ = false;
		/**
		* The `produce` function takes a value and a "recipe function" (whose
		* return value often depends on the base state). The recipe function is
		* free to mutate its first argument however it wants. All mutations are
		* only ever applied to a __copy__ of the base state.
		*
		* Pass only a function to create a "curried producer" which relieves you
		* from passing the recipe function every time.
		*
		* Only plain objects and arrays are made mutable. All other objects are
		* considered uncopyable.
		*
		* Note: This function is __bound__ to its `Immer` instance.
		*
		* @param {any} base - the initial state
		* @param {Function} recipe - function that receives a proxy of the base state as first argument and which can be freely modified
		* @param {Function} patchListener - optional function that will be called with all the patches produced here
		* @returns {any} a new state, or the initial state if nothing was modified
		*/
		this.produce = (base, recipe, patchListener) => {
			if (isFunction$1(base) && !isFunction$1(recipe)) {
				const defaultBase = recipe;
				recipe = base;
				const self = this;
				return function curriedProduce(base2 = defaultBase, ...args) {
					return self.produce(base2, (draft) => recipe.call(this, draft, ...args));
				};
			}
			if (!isFunction$1(recipe)) die(6);
			if (patchListener !== void 0 && !isFunction$1(patchListener)) die(7);
			let result;
			if (isDraftable(base)) {
				const scope = enterScope(this);
				const proxy = createProxy(scope, base, void 0);
				let hasError = true;
				try {
					result = recipe(proxy);
					hasError = false;
				} finally {
					if (hasError) revokeScope(scope);
					else leaveScope(scope);
				}
				usePatchesInScope(scope, patchListener);
				return processResult(result, scope);
			} else if (!base || !isObjectish(base)) {
				result = recipe(base);
				if (result === void 0) result = base;
				if (result === NOTHING) result = void 0;
				if (this.autoFreeze_) freeze(result, true);
				if (patchListener) {
					const p = [];
					const ip = [];
					getPlugin(PluginPatches).generateReplacementPatches_(base, result, {
						patches_: p,
						inversePatches_: ip
					});
					patchListener(p, ip);
				}
				return result;
			} else die(1, base);
		};
		this.produceWithPatches = (base, recipe) => {
			if (isFunction$1(base)) return (state, ...args) => this.produceWithPatches(state, (draft) => base(draft, ...args));
			let patches, inversePatches;
			return [
				this.produce(base, recipe, (p, ip) => {
					patches = p;
					inversePatches = ip;
				}),
				patches,
				inversePatches
			];
		};
		if (isBoolean$1(config?.autoFreeze)) this.setAutoFreeze(config.autoFreeze);
		if (isBoolean$1(config?.useStrictShallowCopy)) this.setUseStrictShallowCopy(config.useStrictShallowCopy);
		if (isBoolean$1(config?.useStrictIteration)) this.setUseStrictIteration(config.useStrictIteration);
	}
	createDraft(base) {
		if (!isDraftable(base)) die(8);
		if (isDraft(base)) base = current(base);
		const scope = enterScope(this);
		const proxy = createProxy(scope, base, void 0);
		proxy[DRAFT_STATE].isManual_ = true;
		leaveScope(scope);
		return proxy;
	}
	finishDraft(draft, patchListener) {
		const state = draft && draft[DRAFT_STATE];
		if (!state || !state.isManual_) die(9);
		const { scope_: scope } = state;
		usePatchesInScope(scope, patchListener);
		return processResult(void 0, scope);
	}
	/**
	* Pass true to automatically freeze all copies created by Immer.
	*
	* By default, auto-freezing is enabled.
	*/
	setAutoFreeze(value) {
		this.autoFreeze_ = value;
	}
	/**
	* Pass true to enable strict shallow copy.
	*
	* By default, immer does not copy the object descriptors such as getter, setter and non-enumrable properties.
	*/
	setUseStrictShallowCopy(value) {
		this.useStrictShallowCopy_ = value;
	}
	/**
	* Pass false to use faster iteration that skips non-enumerable properties
	* but still handles symbols for compatibility.
	*
	* By default, strict iteration is enabled (includes all own properties).
	*/
	setUseStrictIteration(value) {
		this.useStrictIteration_ = value;
	}
	shouldUseStrictIteration() {
		return this.useStrictIteration_;
	}
	applyPatches(base, patches) {
		let i;
		for (i = patches.length - 1; i >= 0; i--) {
			const patch = patches[i];
			if (patch.path.length === 0 && patch.op === "replace") {
				base = patch.value;
				break;
			}
		}
		if (i > -1) patches = patches.slice(i + 1);
		const applyPatchesImpl = getPlugin(PluginPatches).applyPatches_;
		if (isDraft(base)) return applyPatchesImpl(base, patches);
		return this.produce(base, (draft) => applyPatchesImpl(draft, patches));
	}
};
function createProxy(rootScope, value, parent, key) {
	const [draft, state] = isMap(value) ? getPlugin(PluginMapSet).proxyMap_(value, parent) : isSet(value) ? getPlugin(PluginMapSet).proxySet_(value, parent) : createProxyProxy(value, parent);
	(parent?.scope_ ?? getCurrentScope()).drafts_.push(draft);
	state.callbacks_ = parent?.callbacks_ ?? [];
	state.key_ = key;
	if (parent && key !== void 0) registerChildFinalizationCallback(parent, state, key);
	else state.callbacks_.push(function rootDraftCleanup(rootScope2) {
		rootScope2.mapSetPlugin_?.fixSetContents(state);
		const { patchPlugin_ } = rootScope2;
		if (state.modified_ && patchPlugin_) patchPlugin_.generatePatches_(state, [], rootScope2);
	});
	return draft;
}
function current(value) {
	if (!isDraft(value)) die(10, value);
	return currentImpl(value);
}
function currentImpl(value) {
	if (!isDraftable(value) || isFrozen(value)) return value;
	const state = value[DRAFT_STATE];
	let copy;
	let strict = true;
	if (state) {
		if (!state.modified_) return state.base_;
		state.finalized_ = true;
		copy = shallowCopy(value, state.scope_.immer_.useStrictShallowCopy_);
		strict = state.scope_.immer_.shouldUseStrictIteration();
	} else copy = shallowCopy(value, true);
	each(copy, (key, childValue) => {
		set(copy, key, currentImpl(childValue));
	}, strict);
	if (state) state.finalized_ = false;
	return copy;
}
var produce = new Immer2().produce;
//#endregion
//#region ../../node_modules/.pnpm/redux-thunk@3.1.0_redux@5.0.1/node_modules/redux-thunk/dist/redux-thunk.mjs
function createThunkMiddleware(extraArgument) {
	const middleware = ({ dispatch, getState }) => (next) => (action) => {
		if (typeof action === "function") return action(dispatch, getState, extraArgument);
		return next(action);
	};
	return middleware;
}
var thunk = createThunkMiddleware();
var withExtraArgument = createThunkMiddleware;
//#endregion
//#region ../../node_modules/.pnpm/@reduxjs+toolkit@2.12.0_rea_0d808cfcaa6f3b14b0b35cc07df8513b/node_modules/@reduxjs/toolkit/dist/redux-toolkit.modern.mjs
var composeWithDevTools = typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : function() {
	if (arguments.length === 0) return void 0;
	if (typeof arguments[0] === "object") return compose;
	return compose.apply(null, arguments);
};
typeof window !== "undefined" && window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__;
function createAction(type, prepareAction) {
	function actionCreator(...args) {
		if (prepareAction) {
			let prepared = prepareAction(...args);
			if (!prepared) throw new Error(formatProdErrorMessage(0));
			return {
				type,
				payload: prepared.payload,
				..."meta" in prepared && { meta: prepared.meta },
				..."error" in prepared && { error: prepared.error }
			};
		}
		return {
			type,
			payload: args[0]
		};
	}
	actionCreator.toString = () => `${type}`;
	actionCreator.type = type;
	actionCreator.match = (action) => isAction(action) && action.type === type;
	return actionCreator;
}
var Tuple = class _Tuple extends Array {
	constructor(...items) {
		super(...items);
		Object.setPrototypeOf(this, _Tuple.prototype);
	}
	static get [Symbol.species]() {
		return _Tuple;
	}
	concat(...arr) {
		return super.concat.apply(this, arr);
	}
	prepend(...arr) {
		if (arr.length === 1 && Array.isArray(arr[0])) return new _Tuple(...arr[0].concat(this));
		return new _Tuple(...arr.concat(this));
	}
};
function freezeDraftable(val) {
	return isDraftable(val) ? produce(val, () => {}) : val;
}
function getOrInsertComputed(map, key, compute) {
	if (map.has(key)) return map.get(key);
	return map.set(key, compute(key)).get(key);
}
function isBoolean(x) {
	return typeof x === "boolean";
}
var buildGetDefaultMiddleware = () => function getDefaultMiddleware(options) {
	const { thunk: thunk$1 = true, immutableCheck = true, serializableCheck = true, actionCreatorCheck = true } = options ?? {};
	let middlewareArray = new Tuple();
	if (thunk$1) if (isBoolean(thunk$1)) middlewareArray.push(thunk);
	else middlewareArray.push(withExtraArgument(thunk$1.extraArgument));
	return middlewareArray;
};
var SHOULD_AUTOBATCH = "RTK_autoBatch";
var createQueueWithTimer = (timeout) => {
	return (notify) => {
		setTimeout(notify, timeout);
	};
};
var createRafWithFallbackTimer = (raf, timeout) => {
	return (notify) => {
		let called = false;
		const callback = () => {
			if (called) return;
			called = true;
			cancelAnimationFrame(rafId);
			clearTimeout(timerId);
			notify();
		};
		const rafId = raf(callback);
		const timerId = setTimeout(callback, timeout);
	};
};
var autoBatchEnhancer = (options = { type: "raf" }) => (next) => (...args) => {
	const store = next(...args);
	let notifying = true;
	let shouldNotifyAtEndOfTick = false;
	let notificationQueued = false;
	const listeners = /* @__PURE__ */ new Set();
	const queueCallback = options.type === "tick" ? queueMicrotask : options.type === "raf" ? typeof window !== "undefined" && window.requestAnimationFrame ? createRafWithFallbackTimer(window.requestAnimationFrame, 100) : createQueueWithTimer(10) : options.type === "callback" ? options.queueNotification : createQueueWithTimer(options.timeout);
	const notifyListeners = () => {
		notificationQueued = false;
		if (shouldNotifyAtEndOfTick) {
			shouldNotifyAtEndOfTick = false;
			listeners.forEach((l) => l());
		}
	};
	return Object.assign({}, store, {
		subscribe(listener2) {
			const wrappedListener = () => notifying && listener2();
			const unsubscribe = store.subscribe(wrappedListener);
			listeners.add(listener2);
			return () => {
				unsubscribe();
				listeners.delete(listener2);
			};
		},
		dispatch(action) {
			try {
				notifying = !action?.meta?.[SHOULD_AUTOBATCH];
				shouldNotifyAtEndOfTick = !notifying;
				if (shouldNotifyAtEndOfTick) {
					if (!notificationQueued) {
						notificationQueued = true;
						queueCallback(notifyListeners);
					}
				}
				return store.dispatch(action);
			} finally {
				notifying = true;
			}
		}
	});
};
var buildGetDefaultEnhancers = (middlewareEnhancer) => function getDefaultEnhancers(options) {
	const { autoBatch = true } = options ?? {};
	let enhancerArray = new Tuple(middlewareEnhancer);
	if (autoBatch) enhancerArray.push(autoBatchEnhancer(typeof autoBatch === "object" ? autoBatch : void 0));
	return enhancerArray;
};
function configureStore(options) {
	const getDefaultMiddleware = buildGetDefaultMiddleware();
	const { reducer = void 0, middleware, devTools = true, duplicateMiddlewareCheck = true, preloadedState = void 0, enhancers = void 0 } = options || {};
	let rootReducer;
	if (typeof reducer === "function") rootReducer = reducer;
	else if (isPlainObject$1(reducer)) rootReducer = combineReducers(reducer);
	else throw new Error(formatProdErrorMessage(1));
	let finalMiddleware;
	if (typeof middleware === "function") finalMiddleware = middleware(getDefaultMiddleware);
	else finalMiddleware = getDefaultMiddleware();
	let finalCompose = compose;
	if (devTools) finalCompose = composeWithDevTools({
		trace: false,
		...typeof devTools === "object" && devTools
	});
	const getDefaultEnhancers = buildGetDefaultEnhancers(applyMiddleware(...finalMiddleware));
	let storeEnhancers = typeof enhancers === "function" ? enhancers(getDefaultEnhancers) : getDefaultEnhancers();
	const composedEnhancer = finalCompose(...storeEnhancers);
	return createStore$1(rootReducer, preloadedState, composedEnhancer);
}
function executeReducerBuilderCallback(builderCallback) {
	const actionsMap = {};
	const actionMatchers = [];
	let defaultCaseReducer;
	const builder = {
		addCase(typeOrActionCreator, reducer) {
			const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
			if (!type) throw new Error(formatProdErrorMessage(28));
			if (type in actionsMap) throw new Error(formatProdErrorMessage(29));
			actionsMap[type] = reducer;
			return builder;
		},
		addAsyncThunk(asyncThunk, reducers) {
			if (reducers.pending) actionsMap[asyncThunk.pending.type] = reducers.pending;
			if (reducers.rejected) actionsMap[asyncThunk.rejected.type] = reducers.rejected;
			if (reducers.fulfilled) actionsMap[asyncThunk.fulfilled.type] = reducers.fulfilled;
			if (reducers.settled) actionMatchers.push({
				matcher: asyncThunk.settled,
				reducer: reducers.settled
			});
			return builder;
		},
		addMatcher(matcher, reducer) {
			actionMatchers.push({
				matcher,
				reducer
			});
			return builder;
		},
		addDefaultCase(reducer) {
			defaultCaseReducer = reducer;
			return builder;
		}
	};
	builderCallback(builder);
	return [
		actionsMap,
		actionMatchers,
		defaultCaseReducer
	];
}
function isStateFunction(x) {
	return typeof x === "function";
}
function createReducer(initialState, mapOrBuilderCallback) {
	let [actionsMap, finalActionMatchers, finalDefaultCaseReducer] = executeReducerBuilderCallback(mapOrBuilderCallback);
	let getInitialState;
	if (isStateFunction(initialState)) getInitialState = () => freezeDraftable(initialState());
	else {
		const frozenInitialState = freezeDraftable(initialState);
		getInitialState = () => frozenInitialState;
	}
	function reducer(state = getInitialState(), action) {
		let caseReducers = [actionsMap[action.type], ...finalActionMatchers.filter(({ matcher }) => matcher(action)).map(({ reducer: reducer2 }) => reducer2)];
		if (caseReducers.filter((cr) => !!cr).length === 0) caseReducers = [finalDefaultCaseReducer];
		return caseReducers.reduce((previousState, caseReducer) => {
			if (caseReducer) if (isDraft(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) return previousState;
				return result;
			} else if (!isDraftable(previousState)) {
				const result = caseReducer(previousState, action);
				if (result === void 0) {
					if (previousState === null) return previousState;
					throw Error("A case reducer on a non-draftable value must not return undefined");
				}
				return result;
			} else return produce(previousState, (draft) => {
				return caseReducer(draft, action);
			});
			return previousState;
		}, state);
	}
	reducer.getInitialState = getInitialState;
	return reducer;
}
var asyncThunkSymbol = /* @__PURE__ */ Symbol.for("rtk-slice-createasyncthunk");
function getType(slice, actionKey) {
	return `${slice}/${actionKey}`;
}
function buildCreateSlice({ creators } = {}) {
	const cAT = creators?.asyncThunk?.[asyncThunkSymbol];
	return function createSlice2(options) {
		const { name, reducerPath = name } = options;
		if (!name) throw new Error(formatProdErrorMessage(11));
		const reducers = (typeof options.reducers === "function" ? options.reducers(buildReducerCreators()) : options.reducers) || {};
		const reducerNames = Object.keys(reducers);
		const context = {
			sliceCaseReducersByName: {},
			sliceCaseReducersByType: {},
			actionCreators: {},
			sliceMatchers: []
		};
		const contextMethods = {
			addCase(typeOrActionCreator, reducer2) {
				const type = typeof typeOrActionCreator === "string" ? typeOrActionCreator : typeOrActionCreator.type;
				if (!type) throw new Error(formatProdErrorMessage(12));
				if (type in context.sliceCaseReducersByType) throw new Error(formatProdErrorMessage(13));
				context.sliceCaseReducersByType[type] = reducer2;
				return contextMethods;
			},
			addMatcher(matcher, reducer2) {
				context.sliceMatchers.push({
					matcher,
					reducer: reducer2
				});
				return contextMethods;
			},
			exposeAction(name2, actionCreator) {
				context.actionCreators[name2] = actionCreator;
				return contextMethods;
			},
			exposeCaseReducer(name2, reducer2) {
				context.sliceCaseReducersByName[name2] = reducer2;
				return contextMethods;
			}
		};
		reducerNames.forEach((reducerName) => {
			const reducerDefinition = reducers[reducerName];
			const reducerDetails = {
				reducerName,
				type: getType(name, reducerName),
				createNotation: typeof options.reducers === "function"
			};
			if (isAsyncThunkSliceReducerDefinition(reducerDefinition)) handleThunkCaseReducerDefinition(reducerDetails, reducerDefinition, contextMethods, cAT);
			else handleNormalReducerDefinition(reducerDetails, reducerDefinition, contextMethods);
		});
		function buildReducer() {
			const [extraReducers = {}, actionMatchers = [], defaultCaseReducer = void 0] = typeof options.extraReducers === "function" ? executeReducerBuilderCallback(options.extraReducers) : [options.extraReducers];
			const finalCaseReducers = {
				...extraReducers,
				...context.sliceCaseReducersByType
			};
			return createReducer(options.initialState, (builder) => {
				for (let key in finalCaseReducers) builder.addCase(key, finalCaseReducers[key]);
				for (let sM of context.sliceMatchers) builder.addMatcher(sM.matcher, sM.reducer);
				for (let m of actionMatchers) builder.addMatcher(m.matcher, m.reducer);
				if (defaultCaseReducer) builder.addDefaultCase(defaultCaseReducer);
			});
		}
		const selectSelf = (state) => state;
		const injectedSelectorCache = /* @__PURE__ */ new Map();
		const injectedStateCache = /* @__PURE__ */ new WeakMap();
		let _reducer;
		function reducer(state, action) {
			if (!_reducer) _reducer = buildReducer();
			return _reducer(state, action);
		}
		function getInitialState() {
			if (!_reducer) _reducer = buildReducer();
			return _reducer.getInitialState();
		}
		function makeSelectorProps(reducerPath2, injected = false) {
			function selectSlice(state) {
				let sliceState = state[reducerPath2];
				if (typeof sliceState === "undefined") {
					if (injected) sliceState = getOrInsertComputed(injectedStateCache, selectSlice, getInitialState);
				}
				return sliceState;
			}
			function getSelectors(selectState = selectSelf) {
				return getOrInsertComputed(getOrInsertComputed(injectedSelectorCache, injected, () => /* @__PURE__ */ new WeakMap()), selectState, () => {
					const map = {};
					for (const [name2, selector] of Object.entries(options.selectors ?? {})) map[name2] = wrapSelector(selector, selectState, () => getOrInsertComputed(injectedStateCache, selectState, getInitialState), injected);
					return map;
				});
			}
			return {
				reducerPath: reducerPath2,
				getSelectors,
				get selectors() {
					return getSelectors(selectSlice);
				},
				selectSlice
			};
		}
		const slice = {
			name,
			reducer,
			actions: context.actionCreators,
			caseReducers: context.sliceCaseReducersByName,
			getInitialState,
			...makeSelectorProps(reducerPath),
			injectInto(injectable, { reducerPath: pathOpt, ...config } = {}) {
				const newReducerPath = pathOpt ?? reducerPath;
				injectable.inject({
					reducerPath: newReducerPath,
					reducer
				}, config);
				return {
					...slice,
					...makeSelectorProps(newReducerPath, true)
				};
			}
		};
		return slice;
	};
}
function wrapSelector(selector, selectState, getInitialState, injected) {
	function wrapper(rootState, ...args) {
		let sliceState = selectState(rootState);
		if (typeof sliceState === "undefined") {
			if (injected) sliceState = getInitialState();
		}
		return selector(sliceState, ...args);
	}
	wrapper.unwrapped = selector;
	return wrapper;
}
var createSlice = /* @__PURE__ */ buildCreateSlice();
function buildReducerCreators() {
	function asyncThunk(payloadCreator, config) {
		return {
			_reducerDefinitionType: "asyncThunk",
			payloadCreator,
			...config
		};
	}
	asyncThunk.withTypes = () => asyncThunk;
	return {
		reducer(caseReducer) {
			return Object.assign({ [caseReducer.name](...args) {
				return caseReducer(...args);
			} }[caseReducer.name], { _reducerDefinitionType: "reducer" });
		},
		preparedReducer(prepare, reducer) {
			return {
				_reducerDefinitionType: "reducerWithPrepare",
				prepare,
				reducer
			};
		},
		asyncThunk
	};
}
function handleNormalReducerDefinition({ type, reducerName, createNotation }, maybeReducerWithPrepare, context) {
	let caseReducer;
	let prepareCallback;
	if ("reducer" in maybeReducerWithPrepare) {
		if (createNotation && !isCaseReducerWithPrepareDefinition(maybeReducerWithPrepare)) throw new Error(formatProdErrorMessage(17));
		caseReducer = maybeReducerWithPrepare.reducer;
		prepareCallback = maybeReducerWithPrepare.prepare;
	} else caseReducer = maybeReducerWithPrepare;
	context.addCase(type, caseReducer).exposeCaseReducer(reducerName, caseReducer).exposeAction(reducerName, prepareCallback ? createAction(type, prepareCallback) : createAction(type));
}
function isAsyncThunkSliceReducerDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "asyncThunk";
}
function isCaseReducerWithPrepareDefinition(reducerDefinition) {
	return reducerDefinition._reducerDefinitionType === "reducerWithPrepare";
}
function handleThunkCaseReducerDefinition({ type, reducerName }, reducerDefinition, context, cAT) {
	if (!cAT) throw new Error(formatProdErrorMessage(18));
	const { payloadCreator, fulfilled, pending, rejected, settled, options } = reducerDefinition;
	const thunk = cAT(type, payloadCreator, options);
	context.exposeAction(reducerName, thunk);
	if (fulfilled) context.addCase(thunk.fulfilled, fulfilled);
	if (pending) context.addCase(thunk.pending, pending);
	if (rejected) context.addCase(thunk.rejected, rejected);
	if (settled) context.addMatcher(thunk.settled, settled);
	context.exposeCaseReducer(reducerName, {
		fulfilled: fulfilled || noop$1,
		pending: pending || noop$1,
		rejected: rejected || noop$1,
		settled: settled || noop$1
	});
}
function noop$1() {}
var listener = "listener";
var completed = "completed";
var cancelled = "cancelled";
`${cancelled}`;
`${completed}`;
`${listener}${cancelled}`;
`${listener}${completed}`;
var { assign } = Object;
var alm = "listenerMiddleware";
var addListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/add`), { withTypes: () => addListener });
`${alm}`;
var removeListener = /* @__PURE__ */ assign(/* @__PURE__ */ createAction(`${alm}/remove`), { withTypes: () => removeListener });
function formatProdErrorMessage(code) {
	return `Minified Redux Toolkit error #${code}; visit https://redux-toolkit.js.org/Errors?code=${code} for the full message or use the non-minified dev environment for full errors. `;
}
//#endregion
//#region ../../node_modules/.pnpm/tslib@2.8.1/node_modules/tslib/tslib.es6.mjs
/******************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var extendStatics = function(d, b) {
	extendStatics = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(d, b) {
		d.__proto__ = b;
	} || function(d, b) {
		for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p];
	};
	return extendStatics(d, b);
};
function __extends(d, b) {
	if (typeof b !== "function" && b !== null) throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
	extendStatics(d, b);
	function __() {
		this.constructor = d;
	}
	d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}
function __awaiter(thisArg, _arguments, P, generator) {
	function adopt(value) {
		return value instanceof P ? value : new P(function(resolve) {
			resolve(value);
		});
	}
	return new (P || (P = Promise))(function(resolve, reject) {
		function fulfilled(value) {
			try {
				step(generator.next(value));
			} catch (e) {
				reject(e);
			}
		}
		function rejected(value) {
			try {
				step(generator["throw"](value));
			} catch (e) {
				reject(e);
			}
		}
		function step(result) {
			result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
		}
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
}
function __generator(thisArg, body) {
	var _ = {
		label: 0,
		sent: function() {
			if (t[0] & 1) throw t[1];
			return t[1];
		},
		trys: [],
		ops: []
	}, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
	return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() {
		return this;
	}), g;
	function verb(n) {
		return function(v) {
			return step([n, v]);
		};
	}
	function step(op) {
		if (f) throw new TypeError("Generator is already executing.");
		while (g && (g = 0, op[0] && (_ = 0)), _) try {
			if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
			if (y = 0, t) op = [op[0] & 2, t.value];
			switch (op[0]) {
				case 0:
				case 1:
					t = op;
					break;
				case 4:
					_.label++;
					return {
						value: op[1],
						done: false
					};
				case 5:
					_.label++;
					y = op[1];
					op = [0];
					continue;
				case 7:
					op = _.ops.pop();
					_.trys.pop();
					continue;
				default:
					if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
						_ = 0;
						continue;
					}
					if (op[0] === 3 && (!t || op[1] > t[0] && op[1] < t[3])) {
						_.label = op[1];
						break;
					}
					if (op[0] === 6 && _.label < t[1]) {
						_.label = t[1];
						t = op;
						break;
					}
					if (t && _.label < t[2]) {
						_.label = t[2];
						_.ops.push(op);
						break;
					}
					if (t[2]) _.ops.pop();
					_.trys.pop();
					continue;
			}
			op = body.call(thisArg, _);
		} catch (e) {
			op = [6, e];
			y = 0;
		} finally {
			f = t = 0;
		}
		if (op[0] & 5) throw op[1];
		return {
			value: op[0] ? op[1] : void 0,
			done: true
		};
	}
}
function __values(o) {
	var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
	if (m) return m.call(o);
	if (o && typeof o.length === "number") return { next: function() {
		if (o && i >= o.length) o = void 0;
		return {
			value: o && o[i++],
			done: !o
		};
	} };
	throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
}
function __read(o, n) {
	var m = typeof Symbol === "function" && o[Symbol.iterator];
	if (!m) return o;
	var i = m.call(o), r, ar = [], e;
	try {
		while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
	} catch (error) {
		e = { error };
	} finally {
		try {
			if (r && !r.done && (m = i["return"])) m.call(i);
		} finally {
			if (e) throw e.error;
		}
	}
	return ar;
}
function __spreadArray(to, from, pack) {
	if (pack || arguments.length === 2) {
		for (var i = 0, l = from.length, ar; i < l; i++) if (ar || !(i in from)) {
			if (!ar) ar = Array.prototype.slice.call(from, 0, i);
			ar[i] = from[i];
		}
	}
	return to.concat(ar || Array.prototype.slice.call(from));
}
function __await(v) {
	return this instanceof __await ? (this.v = v, this) : new __await(v);
}
function __asyncGenerator(thisArg, _arguments, generator) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var g = generator.apply(thisArg, _arguments || []), i, q = [];
	return i = Object.create((typeof AsyncIterator === "function" ? AsyncIterator : Object).prototype), verb("next"), verb("throw"), verb("return", awaitReturn), i[Symbol.asyncIterator] = function() {
		return this;
	}, i;
	function awaitReturn(f) {
		return function(v) {
			return Promise.resolve(v).then(f, reject);
		};
	}
	function verb(n, f) {
		if (g[n]) {
			i[n] = function(v) {
				return new Promise(function(a, b) {
					q.push([
						n,
						v,
						a,
						b
					]) > 1 || resume(n, v);
				});
			};
			if (f) i[n] = f(i[n]);
		}
	}
	function resume(n, v) {
		try {
			step(g[n](v));
		} catch (e) {
			settle(q[0][3], e);
		}
	}
	function step(r) {
		r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r);
	}
	function fulfill(value) {
		resume("next", value);
	}
	function reject(value) {
		resume("throw", value);
	}
	function settle(f, v) {
		if (f(v), q.shift(), q.length) resume(q[0][0], q[0][1]);
	}
}
function __asyncValues(o) {
	if (!Symbol.asyncIterator) throw new TypeError("Symbol.asyncIterator is not defined.");
	var m = o[Symbol.asyncIterator], i;
	return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function() {
		return this;
	}, i);
	function verb(n) {
		i[n] = o[n] && function(v) {
			return new Promise(function(resolve, reject) {
				v = o[n](v), settle(resolve, reject, v.done, v.value);
			});
		};
	}
	function settle(resolve, reject, d, v) {
		Promise.resolve(v).then(function(v) {
			resolve({
				value: v,
				done: d
			});
		}, reject);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isFunction.js
function isFunction(value) {
	return typeof value === "function";
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/createErrorClass.js
function createErrorClass(createImpl) {
	var _super = function(instance) {
		Error.call(instance);
		instance.stack = (/* @__PURE__ */ new Error()).stack;
	};
	var ctorFunc = createImpl(_super);
	ctorFunc.prototype = Object.create(Error.prototype);
	ctorFunc.prototype.constructor = ctorFunc;
	return ctorFunc;
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/UnsubscriptionError.js
var UnsubscriptionError = createErrorClass(function(_super) {
	return function UnsubscriptionErrorImpl(errors) {
		_super(this);
		this.message = errors ? errors.length + " errors occurred during unsubscription:\n" + errors.map(function(err, i) {
			return i + 1 + ") " + err.toString();
		}).join("\n  ") : "";
		this.name = "UnsubscriptionError";
		this.errors = errors;
	};
});
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/arrRemove.js
function arrRemove(arr, item) {
	if (arr) {
		var index = arr.indexOf(item);
		0 <= index && arr.splice(index, 1);
	}
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscription.js
var Subscription = function() {
	function Subscription(initialTeardown) {
		this.initialTeardown = initialTeardown;
		this.closed = false;
		this._parentage = null;
		this._finalizers = null;
	}
	Subscription.prototype.unsubscribe = function() {
		var e_1, _a, e_2, _b;
		var errors;
		if (!this.closed) {
			this.closed = true;
			var _parentage = this._parentage;
			if (_parentage) {
				this._parentage = null;
				if (Array.isArray(_parentage)) try {
					for (var _parentage_1 = __values(_parentage), _parentage_1_1 = _parentage_1.next(); !_parentage_1_1.done; _parentage_1_1 = _parentage_1.next()) _parentage_1_1.value.remove(this);
				} catch (e_1_1) {
					e_1 = { error: e_1_1 };
				} finally {
					try {
						if (_parentage_1_1 && !_parentage_1_1.done && (_a = _parentage_1.return)) _a.call(_parentage_1);
					} finally {
						if (e_1) throw e_1.error;
					}
				}
				else _parentage.remove(this);
			}
			var initialFinalizer = this.initialTeardown;
			if (isFunction(initialFinalizer)) try {
				initialFinalizer();
			} catch (e) {
				errors = e instanceof UnsubscriptionError ? e.errors : [e];
			}
			var _finalizers = this._finalizers;
			if (_finalizers) {
				this._finalizers = null;
				try {
					for (var _finalizers_1 = __values(_finalizers), _finalizers_1_1 = _finalizers_1.next(); !_finalizers_1_1.done; _finalizers_1_1 = _finalizers_1.next()) {
						var finalizer = _finalizers_1_1.value;
						try {
							execFinalizer(finalizer);
						} catch (err) {
							errors = errors !== null && errors !== void 0 ? errors : [];
							if (err instanceof UnsubscriptionError) errors = __spreadArray(__spreadArray([], __read(errors)), __read(err.errors));
							else errors.push(err);
						}
					}
				} catch (e_2_1) {
					e_2 = { error: e_2_1 };
				} finally {
					try {
						if (_finalizers_1_1 && !_finalizers_1_1.done && (_b = _finalizers_1.return)) _b.call(_finalizers_1);
					} finally {
						if (e_2) throw e_2.error;
					}
				}
			}
			if (errors) throw new UnsubscriptionError(errors);
		}
	};
	Subscription.prototype.add = function(teardown) {
		var _a;
		if (teardown && teardown !== this) if (this.closed) execFinalizer(teardown);
		else {
			if (teardown instanceof Subscription) {
				if (teardown.closed || teardown._hasParent(this)) return;
				teardown._addParent(this);
			}
			(this._finalizers = (_a = this._finalizers) !== null && _a !== void 0 ? _a : []).push(teardown);
		}
	};
	Subscription.prototype._hasParent = function(parent) {
		var _parentage = this._parentage;
		return _parentage === parent || Array.isArray(_parentage) && _parentage.includes(parent);
	};
	Subscription.prototype._addParent = function(parent) {
		var _parentage = this._parentage;
		this._parentage = Array.isArray(_parentage) ? (_parentage.push(parent), _parentage) : _parentage ? [_parentage, parent] : parent;
	};
	Subscription.prototype._removeParent = function(parent) {
		var _parentage = this._parentage;
		if (_parentage === parent) this._parentage = null;
		else if (Array.isArray(_parentage)) arrRemove(_parentage, parent);
	};
	Subscription.prototype.remove = function(teardown) {
		var _finalizers = this._finalizers;
		_finalizers && arrRemove(_finalizers, teardown);
		if (teardown instanceof Subscription) teardown._removeParent(this);
	};
	Subscription.EMPTY = (function() {
		var empty = new Subscription();
		empty.closed = true;
		return empty;
	})();
	return Subscription;
}();
var EMPTY_SUBSCRIPTION = Subscription.EMPTY;
function isSubscription(value) {
	return value instanceof Subscription || value && "closed" in value && isFunction(value.remove) && isFunction(value.add) && isFunction(value.unsubscribe);
}
function execFinalizer(finalizer) {
	if (isFunction(finalizer)) finalizer();
	else finalizer.unsubscribe();
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/config.js
var config = {
	onUnhandledError: null,
	onStoppedNotification: null,
	Promise: void 0,
	useDeprecatedSynchronousErrorHandling: false,
	useDeprecatedNextContext: false
};
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/timeoutProvider.js
var timeoutProvider = {
	setTimeout: function(handler, timeout) {
		var args = [];
		for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
		var delegate = timeoutProvider.delegate;
		if (delegate === null || delegate === void 0 ? void 0 : delegate.setTimeout) return delegate.setTimeout.apply(delegate, __spreadArray([handler, timeout], __read(args)));
		return setTimeout.apply(void 0, __spreadArray([handler, timeout], __read(args)));
	},
	clearTimeout: function(handle) {
		var delegate = timeoutProvider.delegate;
		return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearTimeout) || clearTimeout)(handle);
	},
	delegate: void 0
};
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/reportUnhandledError.js
function reportUnhandledError(err) {
	timeoutProvider.setTimeout(function() {
		var onUnhandledError = config.onUnhandledError;
		if (onUnhandledError) onUnhandledError(err);
		else throw err;
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/noop.js
function noop() {}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/NotificationFactories.js
var COMPLETE_NOTIFICATION = (function() {
	return createNotification("C", void 0, void 0);
})();
function errorNotification(error) {
	return createNotification("E", void 0, error);
}
function nextNotification(value) {
	return createNotification("N", value, void 0);
}
function createNotification(kind, value, error) {
	return {
		kind,
		value,
		error
	};
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/errorContext.js
var context = null;
function errorContext(cb) {
	if (config.useDeprecatedSynchronousErrorHandling) {
		var isRoot = !context;
		if (isRoot) context = {
			errorThrown: false,
			error: null
		};
		cb();
		if (isRoot) {
			var _a = context, errorThrown = _a.errorThrown, error = _a.error;
			context = null;
			if (errorThrown) throw error;
		}
	} else cb();
}
function captureError(err) {
	if (config.useDeprecatedSynchronousErrorHandling && context) {
		context.errorThrown = true;
		context.error = err;
	}
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subscriber.js
var Subscriber = function(_super) {
	__extends(Subscriber, _super);
	function Subscriber(destination) {
		var _this = _super.call(this) || this;
		_this.isStopped = false;
		if (destination) {
			_this.destination = destination;
			if (isSubscription(destination)) destination.add(_this);
		} else _this.destination = EMPTY_OBSERVER;
		return _this;
	}
	Subscriber.create = function(next, error, complete) {
		return new SafeSubscriber(next, error, complete);
	};
	Subscriber.prototype.next = function(value) {
		if (this.isStopped) handleStoppedNotification(nextNotification(value), this);
		else this._next(value);
	};
	Subscriber.prototype.error = function(err) {
		if (this.isStopped) handleStoppedNotification(errorNotification(err), this);
		else {
			this.isStopped = true;
			this._error(err);
		}
	};
	Subscriber.prototype.complete = function() {
		if (this.isStopped) handleStoppedNotification(COMPLETE_NOTIFICATION, this);
		else {
			this.isStopped = true;
			this._complete();
		}
	};
	Subscriber.prototype.unsubscribe = function() {
		if (!this.closed) {
			this.isStopped = true;
			_super.prototype.unsubscribe.call(this);
			this.destination = null;
		}
	};
	Subscriber.prototype._next = function(value) {
		this.destination.next(value);
	};
	Subscriber.prototype._error = function(err) {
		try {
			this.destination.error(err);
		} finally {
			this.unsubscribe();
		}
	};
	Subscriber.prototype._complete = function() {
		try {
			this.destination.complete();
		} finally {
			this.unsubscribe();
		}
	};
	return Subscriber;
}(Subscription);
var _bind = Function.prototype.bind;
function bind(fn, thisArg) {
	return _bind.call(fn, thisArg);
}
var ConsumerObserver = function() {
	function ConsumerObserver(partialObserver) {
		this.partialObserver = partialObserver;
	}
	ConsumerObserver.prototype.next = function(value) {
		var partialObserver = this.partialObserver;
		if (partialObserver.next) try {
			partialObserver.next(value);
		} catch (error) {
			handleUnhandledError(error);
		}
	};
	ConsumerObserver.prototype.error = function(err) {
		var partialObserver = this.partialObserver;
		if (partialObserver.error) try {
			partialObserver.error(err);
		} catch (error) {
			handleUnhandledError(error);
		}
		else handleUnhandledError(err);
	};
	ConsumerObserver.prototype.complete = function() {
		var partialObserver = this.partialObserver;
		if (partialObserver.complete) try {
			partialObserver.complete();
		} catch (error) {
			handleUnhandledError(error);
		}
	};
	return ConsumerObserver;
}();
var SafeSubscriber = function(_super) {
	__extends(SafeSubscriber, _super);
	function SafeSubscriber(observerOrNext, error, complete) {
		var _this = _super.call(this) || this;
		var partialObserver;
		if (isFunction(observerOrNext) || !observerOrNext) partialObserver = {
			next: observerOrNext !== null && observerOrNext !== void 0 ? observerOrNext : void 0,
			error: error !== null && error !== void 0 ? error : void 0,
			complete: complete !== null && complete !== void 0 ? complete : void 0
		};
		else {
			var context_1;
			if (_this && config.useDeprecatedNextContext) {
				context_1 = Object.create(observerOrNext);
				context_1.unsubscribe = function() {
					return _this.unsubscribe();
				};
				partialObserver = {
					next: observerOrNext.next && bind(observerOrNext.next, context_1),
					error: observerOrNext.error && bind(observerOrNext.error, context_1),
					complete: observerOrNext.complete && bind(observerOrNext.complete, context_1)
				};
			} else partialObserver = observerOrNext;
		}
		_this.destination = new ConsumerObserver(partialObserver);
		return _this;
	}
	return SafeSubscriber;
}(Subscriber);
function handleUnhandledError(error) {
	if (config.useDeprecatedSynchronousErrorHandling) captureError(error);
	else reportUnhandledError(error);
}
function defaultErrorHandler(err) {
	throw err;
}
function handleStoppedNotification(notification, subscriber) {
	var onStoppedNotification = config.onStoppedNotification;
	onStoppedNotification && timeoutProvider.setTimeout(function() {
		return onStoppedNotification(notification, subscriber);
	});
}
var EMPTY_OBSERVER = {
	closed: true,
	next: noop,
	error: defaultErrorHandler,
	complete: noop
};
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/symbol/observable.js
var observable = (function() {
	return typeof Symbol === "function" && Symbol.observable || "@@observable";
})();
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/identity.js
function identity(x) {
	return x;
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/pipe.js
function pipeFromArray(fns) {
	if (fns.length === 0) return identity;
	if (fns.length === 1) return fns[0];
	return function piped(input) {
		return fns.reduce(function(prev, fn) {
			return fn(prev);
		}, input);
	};
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Observable.js
var Observable = function() {
	function Observable(subscribe) {
		if (subscribe) this._subscribe = subscribe;
	}
	Observable.prototype.lift = function(operator) {
		var observable = new Observable();
		observable.source = this;
		observable.operator = operator;
		return observable;
	};
	Observable.prototype.subscribe = function(observerOrNext, error, complete) {
		var _this = this;
		var subscriber = isSubscriber(observerOrNext) ? observerOrNext : new SafeSubscriber(observerOrNext, error, complete);
		errorContext(function() {
			var _a = _this, operator = _a.operator, source = _a.source;
			subscriber.add(operator ? operator.call(subscriber, source) : source ? _this._subscribe(subscriber) : _this._trySubscribe(subscriber));
		});
		return subscriber;
	};
	Observable.prototype._trySubscribe = function(sink) {
		try {
			return this._subscribe(sink);
		} catch (err) {
			sink.error(err);
		}
	};
	Observable.prototype.forEach = function(next, promiseCtor) {
		var _this = this;
		promiseCtor = getPromiseCtor(promiseCtor);
		return new promiseCtor(function(resolve, reject) {
			var subscriber = new SafeSubscriber({
				next: function(value) {
					try {
						next(value);
					} catch (err) {
						reject(err);
						subscriber.unsubscribe();
					}
				},
				error: reject,
				complete: resolve
			});
			_this.subscribe(subscriber);
		});
	};
	Observable.prototype._subscribe = function(subscriber) {
		var _a;
		return (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber);
	};
	Observable.prototype[observable] = function() {
		return this;
	};
	Observable.prototype.pipe = function() {
		var operations = [];
		for (var _i = 0; _i < arguments.length; _i++) operations[_i] = arguments[_i];
		return pipeFromArray(operations)(this);
	};
	Observable.prototype.toPromise = function(promiseCtor) {
		var _this = this;
		promiseCtor = getPromiseCtor(promiseCtor);
		return new promiseCtor(function(resolve, reject) {
			var value;
			_this.subscribe(function(x) {
				return value = x;
			}, function(err) {
				return reject(err);
			}, function() {
				return resolve(value);
			});
		});
	};
	Observable.create = function(subscribe) {
		return new Observable(subscribe);
	};
	return Observable;
}();
function getPromiseCtor(promiseCtor) {
	var _a;
	return (_a = promiseCtor !== null && promiseCtor !== void 0 ? promiseCtor : config.Promise) !== null && _a !== void 0 ? _a : Promise;
}
function isObserver(value) {
	return value && isFunction(value.next) && isFunction(value.error) && isFunction(value.complete);
}
function isSubscriber(value) {
	return value && value instanceof Subscriber || isObserver(value) && isSubscription(value);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/lift.js
function hasLift(source) {
	return isFunction(source === null || source === void 0 ? void 0 : source.lift);
}
function operate(init) {
	return function(source) {
		if (hasLift(source)) return source.lift(function(liftedSource) {
			try {
				return init(liftedSource, this);
			} catch (err) {
				this.error(err);
			}
		});
		throw new TypeError("Unable to lift unknown Observable type");
	};
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/OperatorSubscriber.js
function createOperatorSubscriber(destination, onNext, onComplete, onError, onFinalize) {
	return new OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize);
}
var OperatorSubscriber = function(_super) {
	__extends(OperatorSubscriber, _super);
	function OperatorSubscriber(destination, onNext, onComplete, onError, onFinalize, shouldUnsubscribe) {
		var _this = _super.call(this, destination) || this;
		_this.onFinalize = onFinalize;
		_this.shouldUnsubscribe = shouldUnsubscribe;
		_this._next = onNext ? function(value) {
			try {
				onNext(value);
			} catch (err) {
				destination.error(err);
			}
		} : _super.prototype._next;
		_this._error = onError ? function(err) {
			try {
				onError(err);
			} catch (err) {
				destination.error(err);
			} finally {
				this.unsubscribe();
			}
		} : _super.prototype._error;
		_this._complete = onComplete ? function() {
			try {
				onComplete();
			} catch (err) {
				destination.error(err);
			} finally {
				this.unsubscribe();
			}
		} : _super.prototype._complete;
		return _this;
	}
	OperatorSubscriber.prototype.unsubscribe = function() {
		var _a;
		if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
			var closed_1 = this.closed;
			_super.prototype.unsubscribe.call(this);
			!closed_1 && ((_a = this.onFinalize) === null || _a === void 0 || _a.call(this));
		}
	};
	return OperatorSubscriber;
}(Subscriber);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/ObjectUnsubscribedError.js
var ObjectUnsubscribedError = createErrorClass(function(_super) {
	return function ObjectUnsubscribedErrorImpl() {
		_super(this);
		this.name = "ObjectUnsubscribedError";
		this.message = "object unsubscribed";
	};
});
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Subject.js
var Subject = function(_super) {
	__extends(Subject, _super);
	function Subject() {
		var _this = _super.call(this) || this;
		_this.closed = false;
		_this.currentObservers = null;
		_this.observers = [];
		_this.isStopped = false;
		_this.hasError = false;
		_this.thrownError = null;
		return _this;
	}
	Subject.prototype.lift = function(operator) {
		var subject = new AnonymousSubject(this, this);
		subject.operator = operator;
		return subject;
	};
	Subject.prototype._throwIfClosed = function() {
		if (this.closed) throw new ObjectUnsubscribedError();
	};
	Subject.prototype.next = function(value) {
		var _this = this;
		errorContext(function() {
			var e_1, _a;
			_this._throwIfClosed();
			if (!_this.isStopped) {
				if (!_this.currentObservers) _this.currentObservers = Array.from(_this.observers);
				try {
					for (var _b = __values(_this.currentObservers), _c = _b.next(); !_c.done; _c = _b.next()) _c.value.next(value);
				} catch (e_1_1) {
					e_1 = { error: e_1_1 };
				} finally {
					try {
						if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
					} finally {
						if (e_1) throw e_1.error;
					}
				}
			}
		});
	};
	Subject.prototype.error = function(err) {
		var _this = this;
		errorContext(function() {
			_this._throwIfClosed();
			if (!_this.isStopped) {
				_this.hasError = _this.isStopped = true;
				_this.thrownError = err;
				var observers = _this.observers;
				while (observers.length) observers.shift().error(err);
			}
		});
	};
	Subject.prototype.complete = function() {
		var _this = this;
		errorContext(function() {
			_this._throwIfClosed();
			if (!_this.isStopped) {
				_this.isStopped = true;
				var observers = _this.observers;
				while (observers.length) observers.shift().complete();
			}
		});
	};
	Subject.prototype.unsubscribe = function() {
		this.isStopped = this.closed = true;
		this.observers = this.currentObservers = null;
	};
	Object.defineProperty(Subject.prototype, "observed", {
		get: function() {
			var _a;
			return ((_a = this.observers) === null || _a === void 0 ? void 0 : _a.length) > 0;
		},
		enumerable: false,
		configurable: true
	});
	Subject.prototype._trySubscribe = function(subscriber) {
		this._throwIfClosed();
		return _super.prototype._trySubscribe.call(this, subscriber);
	};
	Subject.prototype._subscribe = function(subscriber) {
		this._throwIfClosed();
		this._checkFinalizedStatuses(subscriber);
		return this._innerSubscribe(subscriber);
	};
	Subject.prototype._innerSubscribe = function(subscriber) {
		var _this = this;
		var _a = this, hasError = _a.hasError, isStopped = _a.isStopped, observers = _a.observers;
		if (hasError || isStopped) return EMPTY_SUBSCRIPTION;
		this.currentObservers = null;
		observers.push(subscriber);
		return new Subscription(function() {
			_this.currentObservers = null;
			arrRemove(observers, subscriber);
		});
	};
	Subject.prototype._checkFinalizedStatuses = function(subscriber) {
		var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, isStopped = _a.isStopped;
		if (hasError) subscriber.error(thrownError);
		else if (isStopped) subscriber.complete();
	};
	Subject.prototype.asObservable = function() {
		var observable = new Observable();
		observable.source = this;
		return observable;
	};
	Subject.create = function(destination, source) {
		return new AnonymousSubject(destination, source);
	};
	return Subject;
}(Observable);
var AnonymousSubject = function(_super) {
	__extends(AnonymousSubject, _super);
	function AnonymousSubject(destination, source) {
		var _this = _super.call(this) || this;
		_this.destination = destination;
		_this.source = source;
		return _this;
	}
	AnonymousSubject.prototype.next = function(value) {
		var _a, _b;
		(_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.next) === null || _b === void 0 || _b.call(_a, value);
	};
	AnonymousSubject.prototype.error = function(err) {
		var _a, _b;
		(_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.error) === null || _b === void 0 || _b.call(_a, err);
	};
	AnonymousSubject.prototype.complete = function() {
		var _a, _b;
		(_b = (_a = this.destination) === null || _a === void 0 ? void 0 : _a.complete) === null || _b === void 0 || _b.call(_a);
	};
	AnonymousSubject.prototype._subscribe = function(subscriber) {
		var _a, _b;
		return (_b = (_a = this.source) === null || _a === void 0 ? void 0 : _a.subscribe(subscriber)) !== null && _b !== void 0 ? _b : EMPTY_SUBSCRIPTION;
	};
	return AnonymousSubject;
}(Subject);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/BehaviorSubject.js
var BehaviorSubject = function(_super) {
	__extends(BehaviorSubject, _super);
	function BehaviorSubject(_value) {
		var _this = _super.call(this) || this;
		_this._value = _value;
		return _this;
	}
	Object.defineProperty(BehaviorSubject.prototype, "value", {
		get: function() {
			return this.getValue();
		},
		enumerable: false,
		configurable: true
	});
	BehaviorSubject.prototype._subscribe = function(subscriber) {
		var subscription = _super.prototype._subscribe.call(this, subscriber);
		!subscription.closed && subscriber.next(this._value);
		return subscription;
	};
	BehaviorSubject.prototype.getValue = function() {
		var _a = this, hasError = _a.hasError, thrownError = _a.thrownError, _value = _a._value;
		if (hasError) throw thrownError;
		this._throwIfClosed();
		return _value;
	};
	BehaviorSubject.prototype.next = function(value) {
		_super.prototype.next.call(this, this._value = value);
	};
	return BehaviorSubject;
}(Subject);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/dateTimestampProvider.js
var dateTimestampProvider = {
	now: function() {
		return (dateTimestampProvider.delegate || Date).now();
	},
	delegate: void 0
};
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/Action.js
var Action = function(_super) {
	__extends(Action, _super);
	function Action(scheduler, work) {
		return _super.call(this) || this;
	}
	Action.prototype.schedule = function(state, delay) {
		if (delay === void 0) delay = 0;
		return this;
	};
	return Action;
}(Subscription);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/intervalProvider.js
var intervalProvider = {
	setInterval: function(handler, timeout) {
		var args = [];
		for (var _i = 2; _i < arguments.length; _i++) args[_i - 2] = arguments[_i];
		var delegate = intervalProvider.delegate;
		if (delegate === null || delegate === void 0 ? void 0 : delegate.setInterval) return delegate.setInterval.apply(delegate, __spreadArray([handler, timeout], __read(args)));
		return setInterval.apply(void 0, __spreadArray([handler, timeout], __read(args)));
	},
	clearInterval: function(handle) {
		var delegate = intervalProvider.delegate;
		return ((delegate === null || delegate === void 0 ? void 0 : delegate.clearInterval) || clearInterval)(handle);
	},
	delegate: void 0
};
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncAction.js
var AsyncAction = function(_super) {
	__extends(AsyncAction, _super);
	function AsyncAction(scheduler, work) {
		var _this = _super.call(this, scheduler, work) || this;
		_this.scheduler = scheduler;
		_this.work = work;
		_this.pending = false;
		return _this;
	}
	AsyncAction.prototype.schedule = function(state, delay) {
		var _a;
		if (delay === void 0) delay = 0;
		if (this.closed) return this;
		this.state = state;
		var id = this.id;
		var scheduler = this.scheduler;
		if (id != null) this.id = this.recycleAsyncId(scheduler, id, delay);
		this.pending = true;
		this.delay = delay;
		this.id = (_a = this.id) !== null && _a !== void 0 ? _a : this.requestAsyncId(scheduler, this.id, delay);
		return this;
	};
	AsyncAction.prototype.requestAsyncId = function(scheduler, _id, delay) {
		if (delay === void 0) delay = 0;
		return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
	};
	AsyncAction.prototype.recycleAsyncId = function(_scheduler, id, delay) {
		if (delay === void 0) delay = 0;
		if (delay != null && this.delay === delay && this.pending === false) return id;
		if (id != null) intervalProvider.clearInterval(id);
	};
	AsyncAction.prototype.execute = function(state, delay) {
		if (this.closed) return /* @__PURE__ */ new Error("executing a cancelled action");
		this.pending = false;
		var error = this._execute(state, delay);
		if (error) return error;
		else if (this.pending === false && this.id != null) this.id = this.recycleAsyncId(this.scheduler, this.id, null);
	};
	AsyncAction.prototype._execute = function(state, _delay) {
		var errored = false;
		var errorValue;
		try {
			this.work(state);
		} catch (e) {
			errored = true;
			errorValue = e ? e : /* @__PURE__ */ new Error("Scheduled action threw falsy error");
		}
		if (errored) {
			this.unsubscribe();
			return errorValue;
		}
	};
	AsyncAction.prototype.unsubscribe = function() {
		if (!this.closed) {
			var _a = this, id = _a.id, scheduler = _a.scheduler;
			var actions = scheduler.actions;
			this.work = this.state = this.scheduler = null;
			this.pending = false;
			arrRemove(actions, this);
			if (id != null) this.id = this.recycleAsyncId(scheduler, id, null);
			this.delay = null;
			_super.prototype.unsubscribe.call(this);
		}
	};
	return AsyncAction;
}(Action);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/Scheduler.js
var Scheduler = function() {
	function Scheduler(schedulerActionCtor, now) {
		if (now === void 0) now = Scheduler.now;
		this.schedulerActionCtor = schedulerActionCtor;
		this.now = now;
	}
	Scheduler.prototype.schedule = function(work, delay, state) {
		if (delay === void 0) delay = 0;
		return new this.schedulerActionCtor(this, work).schedule(state, delay);
	};
	Scheduler.now = dateTimestampProvider.now;
	return Scheduler;
}();
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/AsyncScheduler.js
var AsyncScheduler = function(_super) {
	__extends(AsyncScheduler, _super);
	function AsyncScheduler(SchedulerAction, now) {
		if (now === void 0) now = Scheduler.now;
		var _this = _super.call(this, SchedulerAction, now) || this;
		_this.actions = [];
		_this._active = false;
		return _this;
	}
	AsyncScheduler.prototype.flush = function(action) {
		var actions = this.actions;
		if (this._active) {
			actions.push(action);
			return;
		}
		var error;
		this._active = true;
		do
			if (error = action.execute(action.state, action.delay)) break;
		while (action = actions.shift());
		this._active = false;
		if (error) {
			while (action = actions.shift()) action.unsubscribe();
			throw error;
		}
	};
	return AsyncScheduler;
}(Scheduler);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/async.js
var asyncScheduler = new AsyncScheduler(AsyncAction);
var async = asyncScheduler;
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/QueueAction.js
var QueueAction = function(_super) {
	__extends(QueueAction, _super);
	function QueueAction(scheduler, work) {
		var _this = _super.call(this, scheduler, work) || this;
		_this.scheduler = scheduler;
		_this.work = work;
		return _this;
	}
	QueueAction.prototype.schedule = function(state, delay) {
		if (delay === void 0) delay = 0;
		if (delay > 0) return _super.prototype.schedule.call(this, state, delay);
		this.delay = delay;
		this.state = state;
		this.scheduler.flush(this);
		return this;
	};
	QueueAction.prototype.execute = function(state, delay) {
		return delay > 0 || this.closed ? _super.prototype.execute.call(this, state, delay) : this._execute(state, delay);
	};
	QueueAction.prototype.requestAsyncId = function(scheduler, id, delay) {
		if (delay === void 0) delay = 0;
		if (delay != null && delay > 0 || delay == null && this.delay > 0) return _super.prototype.requestAsyncId.call(this, scheduler, id, delay);
		scheduler.flush(this);
		return 0;
	};
	return QueueAction;
}(AsyncAction);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduler/queue.js
var queueScheduler = new (function(_super) {
	__extends(QueueScheduler, _super);
	function QueueScheduler() {
		return _super !== null && _super.apply(this, arguments) || this;
	}
	return QueueScheduler;
}(AsyncScheduler))(QueueAction);
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/empty.js
var EMPTY = new Observable(function(subscriber) {
	return subscriber.complete();
});
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isScheduler.js
function isScheduler(value) {
	return value && isFunction(value.schedule);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/args.js
function last(arr) {
	return arr[arr.length - 1];
}
function popScheduler(args) {
	return isScheduler(last(args)) ? args.pop() : void 0;
}
function popNumber(args, defaultValue) {
	return typeof last(args) === "number" ? args.pop() : defaultValue;
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isArrayLike.js
var isArrayLike = (function(x) {
	return x && typeof x.length === "number" && typeof x !== "function";
});
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isPromise.js
function isPromise(value) {
	return isFunction(value === null || value === void 0 ? void 0 : value.then);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isInteropObservable.js
function isInteropObservable(input) {
	return isFunction(input[observable]);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isAsyncIterable.js
function isAsyncIterable(obj) {
	return Symbol.asyncIterator && isFunction(obj === null || obj === void 0 ? void 0 : obj[Symbol.asyncIterator]);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/throwUnobservableError.js
function createInvalidObservableTypeError(input) {
	return /* @__PURE__ */ new TypeError("You provided " + (input !== null && typeof input === "object" ? "an invalid object" : "'" + input + "'") + " where a stream was expected. You can provide an Observable, Promise, ReadableStream, Array, AsyncIterable, or Iterable.");
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/symbol/iterator.js
function getSymbolIterator() {
	if (typeof Symbol !== "function" || !Symbol.iterator) return "@@iterator";
	return Symbol.iterator;
}
var iterator = getSymbolIterator();
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isIterable.js
function isIterable(input) {
	return isFunction(input === null || input === void 0 ? void 0 : input[iterator]);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isReadableStreamLike.js
function readableStreamLikeToAsyncGenerator(readableStream) {
	return __asyncGenerator(this, arguments, function readableStreamLikeToAsyncGenerator_1() {
		var reader, _a, value, done;
		return __generator(this, function(_b) {
			switch (_b.label) {
				case 0:
					reader = readableStream.getReader();
					_b.label = 1;
				case 1:
					_b.trys.push([
						1,
						,
						9,
						10
					]);
					_b.label = 2;
				case 2: return [4, __await(reader.read())];
				case 3:
					_a = _b.sent(), value = _a.value, done = _a.done;
					if (!done) return [3, 5];
					return [4, __await(void 0)];
				case 4: return [2, _b.sent()];
				case 5: return [4, __await(value)];
				case 6: return [4, _b.sent()];
				case 7:
					_b.sent();
					return [3, 2];
				case 8: return [3, 10];
				case 9:
					reader.releaseLock();
					return [7];
				case 10: return [2];
			}
		});
	});
}
function isReadableStreamLike(obj) {
	return isFunction(obj === null || obj === void 0 ? void 0 : obj.getReader);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/innerFrom.js
function innerFrom(input) {
	if (input instanceof Observable) return input;
	if (input != null) {
		if (isInteropObservable(input)) return fromInteropObservable(input);
		if (isArrayLike(input)) return fromArrayLike(input);
		if (isPromise(input)) return fromPromise(input);
		if (isAsyncIterable(input)) return fromAsyncIterable(input);
		if (isIterable(input)) return fromIterable(input);
		if (isReadableStreamLike(input)) return fromReadableStreamLike(input);
	}
	throw createInvalidObservableTypeError(input);
}
function fromInteropObservable(obj) {
	return new Observable(function(subscriber) {
		var obs = obj[observable]();
		if (isFunction(obs.subscribe)) return obs.subscribe(subscriber);
		throw new TypeError("Provided object does not correctly implement Symbol.observable");
	});
}
function fromArrayLike(array) {
	return new Observable(function(subscriber) {
		for (var i = 0; i < array.length && !subscriber.closed; i++) subscriber.next(array[i]);
		subscriber.complete();
	});
}
function fromPromise(promise) {
	return new Observable(function(subscriber) {
		promise.then(function(value) {
			if (!subscriber.closed) {
				subscriber.next(value);
				subscriber.complete();
			}
		}, function(err) {
			return subscriber.error(err);
		}).then(null, reportUnhandledError);
	});
}
function fromIterable(iterable) {
	return new Observable(function(subscriber) {
		var e_1, _a;
		try {
			for (var iterable_1 = __values(iterable), iterable_1_1 = iterable_1.next(); !iterable_1_1.done; iterable_1_1 = iterable_1.next()) {
				var value = iterable_1_1.value;
				subscriber.next(value);
				if (subscriber.closed) return;
			}
		} catch (e_1_1) {
			e_1 = { error: e_1_1 };
		} finally {
			try {
				if (iterable_1_1 && !iterable_1_1.done && (_a = iterable_1.return)) _a.call(iterable_1);
			} finally {
				if (e_1) throw e_1.error;
			}
		}
		subscriber.complete();
	});
}
function fromAsyncIterable(asyncIterable) {
	return new Observable(function(subscriber) {
		process(asyncIterable, subscriber).catch(function(err) {
			return subscriber.error(err);
		});
	});
}
function fromReadableStreamLike(readableStream) {
	return fromAsyncIterable(readableStreamLikeToAsyncGenerator(readableStream));
}
function process(asyncIterable, subscriber) {
	var asyncIterable_1, asyncIterable_1_1;
	var e_2, _a;
	return __awaiter(this, void 0, void 0, function() {
		var value, e_2_1;
		return __generator(this, function(_b) {
			switch (_b.label) {
				case 0:
					_b.trys.push([
						0,
						5,
						6,
						11
					]);
					asyncIterable_1 = __asyncValues(asyncIterable);
					_b.label = 1;
				case 1: return [4, asyncIterable_1.next()];
				case 2:
					if (!(asyncIterable_1_1 = _b.sent(), !asyncIterable_1_1.done)) return [3, 4];
					value = asyncIterable_1_1.value;
					subscriber.next(value);
					if (subscriber.closed) return [2];
					_b.label = 3;
				case 3: return [3, 1];
				case 4: return [3, 11];
				case 5:
					e_2_1 = _b.sent();
					e_2 = { error: e_2_1 };
					return [3, 11];
				case 6:
					_b.trys.push([
						6,
						,
						9,
						10
					]);
					if (!(asyncIterable_1_1 && !asyncIterable_1_1.done && (_a = asyncIterable_1.return))) return [3, 8];
					return [4, _a.call(asyncIterable_1)];
				case 7:
					_b.sent();
					_b.label = 8;
				case 8: return [3, 10];
				case 9:
					if (e_2) throw e_2.error;
					return [7];
				case 10: return [7];
				case 11:
					subscriber.complete();
					return [2];
			}
		});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/executeSchedule.js
function executeSchedule(parentSubscription, scheduler, work, delay, repeat) {
	if (delay === void 0) delay = 0;
	if (repeat === void 0) repeat = false;
	var scheduleSubscription = scheduler.schedule(function() {
		work();
		if (repeat) parentSubscription.add(this.schedule(null, delay));
		else this.unsubscribe();
	}, delay);
	parentSubscription.add(scheduleSubscription);
	if (!repeat) return scheduleSubscription;
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/observeOn.js
function observeOn(scheduler, delay) {
	if (delay === void 0) delay = 0;
	return operate(function(source, subscriber) {
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			return executeSchedule(subscriber, scheduler, function() {
				return subscriber.next(value);
			}, delay);
		}, function() {
			return executeSchedule(subscriber, scheduler, function() {
				return subscriber.complete();
			}, delay);
		}, function(err) {
			return executeSchedule(subscriber, scheduler, function() {
				return subscriber.error(err);
			}, delay);
		}));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/subscribeOn.js
function subscribeOn(scheduler, delay) {
	if (delay === void 0) delay = 0;
	return operate(function(source, subscriber) {
		subscriber.add(scheduler.schedule(function() {
			return source.subscribe(subscriber);
		}, delay));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleObservable.js
function scheduleObservable(input, scheduler) {
	return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/schedulePromise.js
function schedulePromise(input, scheduler) {
	return innerFrom(input).pipe(subscribeOn(scheduler), observeOn(scheduler));
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleArray.js
function scheduleArray(input, scheduler) {
	return new Observable(function(subscriber) {
		var i = 0;
		return scheduler.schedule(function() {
			if (i === input.length) subscriber.complete();
			else {
				subscriber.next(input[i++]);
				if (!subscriber.closed) this.schedule();
			}
		});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleIterable.js
function scheduleIterable(input, scheduler) {
	return new Observable(function(subscriber) {
		var iterator$1;
		executeSchedule(subscriber, scheduler, function() {
			iterator$1 = input[iterator]();
			executeSchedule(subscriber, scheduler, function() {
				var _a;
				var value;
				var done;
				try {
					_a = iterator$1.next(), value = _a.value, done = _a.done;
				} catch (err) {
					subscriber.error(err);
					return;
				}
				if (done) subscriber.complete();
				else subscriber.next(value);
			}, 0, true);
		});
		return function() {
			return isFunction(iterator$1 === null || iterator$1 === void 0 ? void 0 : iterator$1.return) && iterator$1.return();
		};
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleAsyncIterable.js
function scheduleAsyncIterable(input, scheduler) {
	if (!input) throw new Error("Iterable cannot be null");
	return new Observable(function(subscriber) {
		executeSchedule(subscriber, scheduler, function() {
			var iterator = input[Symbol.asyncIterator]();
			executeSchedule(subscriber, scheduler, function() {
				iterator.next().then(function(result) {
					if (result.done) subscriber.complete();
					else subscriber.next(result.value);
				});
			}, 0, true);
		});
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduleReadableStreamLike.js
function scheduleReadableStreamLike(input, scheduler) {
	return scheduleAsyncIterable(readableStreamLikeToAsyncGenerator(input), scheduler);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/scheduled/scheduled.js
function scheduled(input, scheduler) {
	if (input != null) {
		if (isInteropObservable(input)) return scheduleObservable(input, scheduler);
		if (isArrayLike(input)) return scheduleArray(input, scheduler);
		if (isPromise(input)) return schedulePromise(input, scheduler);
		if (isAsyncIterable(input)) return scheduleAsyncIterable(input, scheduler);
		if (isIterable(input)) return scheduleIterable(input, scheduler);
		if (isReadableStreamLike(input)) return scheduleReadableStreamLike(input, scheduler);
	}
	throw createInvalidObservableTypeError(input);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/from.js
function from(input, scheduler) {
	return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/of.js
function of() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	return from(args, popScheduler(args));
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/util/isDate.js
function isValidDate(value) {
	return value instanceof Date && !isNaN(value);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/map.js
function map(project, thisArg) {
	return operate(function(source, subscriber) {
		var index = 0;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			subscriber.next(project.call(thisArg, value, index++));
		}));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/mergeInternals.js
function mergeInternals(source, subscriber, project, concurrent, onBeforeNext, expand, innerSubScheduler, additionalFinalizer) {
	var buffer = [];
	var active = 0;
	var index = 0;
	var isComplete = false;
	var checkComplete = function() {
		if (isComplete && !buffer.length && !active) subscriber.complete();
	};
	var outerNext = function(value) {
		return active < concurrent ? doInnerSub(value) : buffer.push(value);
	};
	var doInnerSub = function(value) {
		expand && subscriber.next(value);
		active++;
		var innerComplete = false;
		innerFrom(project(value, index++)).subscribe(createOperatorSubscriber(subscriber, function(innerValue) {
			onBeforeNext === null || onBeforeNext === void 0 || onBeforeNext(innerValue);
			if (expand) outerNext(innerValue);
			else subscriber.next(innerValue);
		}, function() {
			innerComplete = true;
		}, void 0, function() {
			if (innerComplete) try {
				active--;
				var _loop_1 = function() {
					var bufferedValue = buffer.shift();
					if (innerSubScheduler) executeSchedule(subscriber, innerSubScheduler, function() {
						return doInnerSub(bufferedValue);
					});
					else doInnerSub(bufferedValue);
				};
				while (buffer.length && active < concurrent) _loop_1();
				checkComplete();
			} catch (err) {
				subscriber.error(err);
			}
		}));
	};
	source.subscribe(createOperatorSubscriber(subscriber, outerNext, function() {
		isComplete = true;
		checkComplete();
	}));
	return function() {
		additionalFinalizer === null || additionalFinalizer === void 0 || additionalFinalizer();
	};
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/mergeMap.js
function mergeMap(project, resultSelector, concurrent) {
	if (concurrent === void 0) concurrent = Infinity;
	if (isFunction(resultSelector)) return mergeMap(function(a, i) {
		return map(function(b, ii) {
			return resultSelector(a, b, i, ii);
		})(innerFrom(project(a, i)));
	}, concurrent);
	else if (typeof resultSelector === "number") concurrent = resultSelector;
	return operate(function(source, subscriber) {
		return mergeInternals(source, subscriber, project, concurrent);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/mergeAll.js
function mergeAll(concurrent) {
	if (concurrent === void 0) concurrent = Infinity;
	return mergeMap(identity, concurrent);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/concatAll.js
function concatAll() {
	return mergeAll(1);
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/concat.js
function concat() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	return concatAll()(from(args, popScheduler(args)));
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/timer.js
function timer(dueTime, intervalOrScheduler, scheduler) {
	if (dueTime === void 0) dueTime = 0;
	if (scheduler === void 0) scheduler = async;
	var intervalDuration = -1;
	if (intervalOrScheduler != null) if (isScheduler(intervalOrScheduler)) scheduler = intervalOrScheduler;
	else intervalDuration = intervalOrScheduler;
	return new Observable(function(subscriber) {
		var due = isValidDate(dueTime) ? +dueTime - scheduler.now() : dueTime;
		if (due < 0) due = 0;
		var n = 0;
		return scheduler.schedule(function() {
			if (!subscriber.closed) {
				subscriber.next(n++);
				if (0 <= intervalDuration) this.schedule(void 0, intervalDuration);
				else subscriber.complete();
			}
		}, due);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/observable/merge.js
function merge() {
	var args = [];
	for (var _i = 0; _i < arguments.length; _i++) args[_i] = arguments[_i];
	var scheduler = popScheduler(args);
	var concurrent = popNumber(args, Infinity);
	var sources = args;
	return !sources.length ? EMPTY : sources.length === 1 ? innerFrom(sources[0]) : mergeAll(concurrent)(from(sources, scheduler));
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/filter.js
function filter(predicate, thisArg) {
	return operate(function(source, subscriber) {
		var index = 0;
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			return predicate.call(thisArg, value, index++) && subscriber.next(value);
		}));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/catchError.js
function catchError(selector) {
	return operate(function(source, subscriber) {
		var innerSub = null;
		var syncUnsub = false;
		var handledResult;
		innerSub = source.subscribe(createOperatorSubscriber(subscriber, void 0, void 0, function(err) {
			handledResult = innerFrom(selector(err, catchError(selector)(source)));
			if (innerSub) {
				innerSub.unsubscribe();
				innerSub = null;
				handledResult.subscribe(subscriber);
			} else syncUnsub = true;
		}));
		if (syncUnsub) {
			innerSub.unsubscribe();
			innerSub = null;
			handledResult.subscribe(subscriber);
		}
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/takeUntil.js
function takeUntil(notifier) {
	return operate(function(source, subscriber) {
		innerFrom(notifier).subscribe(createOperatorSubscriber(subscriber, function() {
			return subscriber.complete();
		}, noop));
		!subscriber.closed && source.subscribe(subscriber);
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/throttle.js
function throttle(durationSelector, config) {
	return operate(function(source, subscriber) {
		var _a = config !== null && config !== void 0 ? config : {}, _b = _a.leading, leading = _b === void 0 ? true : _b, _c = _a.trailing, trailing = _c === void 0 ? false : _c;
		var hasValue = false;
		var sendValue = null;
		var throttled = null;
		var isComplete = false;
		var endThrottling = function() {
			throttled === null || throttled === void 0 || throttled.unsubscribe();
			throttled = null;
			if (trailing) {
				send();
				isComplete && subscriber.complete();
			}
		};
		var cleanupThrottling = function() {
			throttled = null;
			isComplete && subscriber.complete();
		};
		var startThrottle = function(value) {
			return throttled = innerFrom(durationSelector(value)).subscribe(createOperatorSubscriber(subscriber, endThrottling, cleanupThrottling));
		};
		var send = function() {
			if (hasValue) {
				hasValue = false;
				var value = sendValue;
				sendValue = null;
				subscriber.next(value);
				!isComplete && startThrottle(value);
			}
		};
		source.subscribe(createOperatorSubscriber(subscriber, function(value) {
			hasValue = true;
			sendValue = value;
			!(throttled && !throttled.closed) && (leading ? send() : startThrottle(value));
		}, function() {
			isComplete = true;
			!(trailing && hasValue && throttled && !throttled.closed) && subscriber.complete();
		}));
	});
}
//#endregion
//#region ../../node_modules/.pnpm/rxjs@7.8.2/node_modules/rxjs/dist/esm5/internal/operators/throttleTime.js
function throttleTime(duration, scheduler, config) {
	if (scheduler === void 0) scheduler = asyncScheduler;
	var duration$ = timer(duration, scheduler);
	return throttle(function() {
		return duration$;
	}, config);
}
//#endregion
//#region ../../node_modules/.pnpm/redux-observable@3.0.0-rc.3_redux@5.0.1_rxjs@7.8.2/node_modules/redux-observable/dist/redux-observable.mjs
var StateObservable = class extends Observable {
	value;
	__notifier = new Subject();
	constructor(input$, initialState) {
		super((subscriber) => {
			const subscription = this.__notifier.subscribe(subscriber);
			if (subscription && !subscription.closed) subscriber.next(this.value);
			return subscription;
		});
		this.value = initialState;
		input$.subscribe((value) => {
			if (value !== this.value) {
				this.value = value;
				this.__notifier.next(value);
			}
		});
	}
};
function combineEpics(...epics) {
	const merger = (...args) => merge(...epics.map((epic) => {
		const output$ = epic(...args);
		if (!output$) throw new TypeError(`combineEpics: one of the provided Epics "${epic.name || "<anonymous>"}" does not return a stream. Double check you're not missing a return statement!`);
		return output$;
	}));
	try {
		Object.defineProperty(merger, "name", { value: `combineEpics(${epics.map((epic) => epic.name || "<anonymous>").join(", ")})` });
	} catch (e) {}
	return merger;
}
function createEpicMiddleware(options = {}) {
	const QueueScheduler = queueScheduler.constructor;
	const uniqueQueueScheduler = new QueueScheduler(queueScheduler.schedulerActionCtor);
	const epic$ = new Subject();
	let store;
	const epicMiddleware = (_store) => {
		store = _store;
		const actionSubject$ = new Subject();
		const stateSubject$ = new Subject();
		const action$ = actionSubject$.asObservable().pipe(observeOn(uniqueQueueScheduler));
		const state$ = new StateObservable(stateSubject$.pipe(observeOn(uniqueQueueScheduler)), store.getState());
		epic$.pipe(map((epic) => {
			const output$ = epic(action$, state$, options.dependencies);
			if (!output$) throw new TypeError(`Your root Epic "${epic.name || "<anonymous>"}" does not return a stream. Double check you're not missing a return statement!`);
			return output$;
		}), mergeMap((output$) => from(output$).pipe(subscribeOn(uniqueQueueScheduler), observeOn(uniqueQueueScheduler)))).subscribe(store.dispatch);
		return (next) => {
			return (action) => {
				const result = next(action);
				stateSubject$.next(store.getState());
				actionSubject$.next(action);
				return result;
			};
		};
	};
	epicMiddleware.run = (rootEpic) => {
		epic$.next(rootEpic);
	};
	return epicMiddleware;
}
function ofType(...types) {
	const len = types.length;
	return filter(len === 1 ? (action) => isAction(action) && action.type === types[0] : (action) => {
		if (isAction(action)) {
			for (let i = 0; i < len; i++) if (action.type === types[i]) return true;
		}
		return false;
	});
}
//#endregion
//#region ../core/lib/store/slices/levels-slice.js
var initialLevelsState = {
	levels: {},
	durations: {}
};
var levelsSlice = createSlice({
	name: "levels",
	initialState: initialLevelsState,
	reducers: {
		download(_state, _action) {},
		add(state, action) {
			const { levels } = action.payload;
			levels.forEach((level) => {
				state.levels[level.id] = level;
			});
		},
		clear(state) {
			state.levels = initialLevelsState.levels;
			state.durations = initialLevelsState.durations;
		},
		removePlaylistLevels(state, action) {
			const { playlistID } = action.payload;
			for (const id in state.levels) if (state.levels.hasOwnProperty(id)) {
				if (state.levels[id]?.playlistID === playlistID) {
					delete state.levels[id];
					delete state.durations[id];
				}
			}
		},
		setDuration(state, action) {
			state.durations[action.payload.levelId] = action.payload.durationSec;
		}
	}
});
//#endregion
//#region ../core/lib/store/slices/playlists-slice.js
var initialPlaylistsState = {
	playlistsStatus: {},
	playlists: {}
};
var playlistsSlice = createSlice({
	name: "playlists",
	initialState: initialPlaylistsState,
	reducers: {
		clearPlaylists(state) {
			state.playlists = initialPlaylistsState.playlists;
			state.playlistsStatus = initialPlaylistsState.playlistsStatus;
		},
		addPlaylist(state, action) {
			const playlist = action.payload;
			state.playlistsStatus[playlist.id] = { status: "init" };
			state.playlists[playlist.id] = playlist;
		},
		removePlaylist(state, action) {
			const playlistID = action.payload.playlistID;
			delete state.playlistsStatus[playlistID];
			delete state.playlists[playlistID];
		},
		setPlaylistTitle(state, action) {
			const { tabId, pageTitle } = action.payload;
			for (const playlist of Object.values(state.playlists)) if (playlist && playlist.tabId === tabId) playlist.pageTitle = pageTitle;
		},
		fetchPlaylistLevels(state, action) {
			const { playlistID } = action.payload;
			state.playlistsStatus[playlistID].status = "fetching";
		},
		fetchPlaylistLevelsSuccess(state, action) {
			const { playlistID } = action.payload;
			state.playlistsStatus[playlistID].status = "ready";
		},
		fetchPlaylistLevelsFailed(state, action) {
			const { playlistID } = action.payload;
			state.playlistsStatus[playlistID].status = "error";
		}
	}
});
//#endregion
//#region ../core/lib/store/slices/config-slice.js
var initialConfigState$1 = {
	concurrency: 2,
	saveDialog: false,
	fetchAttempts: 100,
	preferredAudioLanguage: null,
	preferredSubtitleLanguage: null,
	maxActiveDownloads: 0,
	autoDeleteAfterSave: false,
	outputContainer: "mp4"
};
var configSlice = createSlice({
	name: "config",
	initialState: initialConfigState$1,
	reducers: {
		setConcurrency(state, action) {
			state.concurrency = action.payload.concurrency;
		},
		setSaveDialog(state, action) {
			state.saveDialog = action.payload.saveDialog;
		},
		setFetchAttempts(state, action) {
			state.fetchAttempts = action.payload.fetchAttempts;
		},
		setPreferredAudioLanguage(state, action) {
			state.preferredAudioLanguage = action.payload.preferredAudioLanguage;
		},
		setPreferredSubtitleLanguage(state, action) {
			state.preferredSubtitleLanguage = action.payload.preferredSubtitleLanguage;
		},
		setMaxActiveDownloads(state, action) {
			state.maxActiveDownloads = action.payload.maxActiveDownloads;
		},
		setAutoDeleteAfterSave(state, action) {
			state.autoDeleteAfterSave = action.payload.autoDeleteAfterSave;
		},
		setOutputContainer(state, action) {
			state.outputContainer = action.payload.outputContainer;
		}
	}
});
var tabsSlice = createSlice({
	name: "tabs",
	initialState: { current: { id: -1 } },
	reducers: { setTab(state, action) {
		state.current = action.payload.tab;
	} }
});
//#endregion
//#region ../core/lib/store/slices/jobs-slice.js
var initialJobsState = {
	jobsStatus: {},
	jobs: {}
};
var jobsSlice = createSlice({
	name: "jobs",
	initialState: initialJobsState,
	reducers: {
		download(state, action) {
			const { jobId } = action.payload;
			const job = state.jobs[jobId];
			if (!job) return;
			const total = job.videoFragments.length + job.audioFragments.length;
			state.jobsStatus[jobId] = {
				...state.jobsStatus[jobId] ?? { total },
				status: "downloading",
				total,
				done: 0,
				saveProgress: 0,
				saveMessage: void 0,
				errorMessage: void 0
			};
		},
		clear(state) {
			state.jobs = initialJobsState.jobs;
			state.jobsStatus = initialJobsState.jobsStatus;
		},
		add(state, action) {
			const { job } = action.payload;
			state.jobs[job.id] = job;
			state.jobsStatus[job.id] = {
				done: 0,
				total: job.videoFragments.length + job.audioFragments.length,
				status: "queued",
				saveProgress: 0
			};
		},
		queue(state, action) {
			const { jobId } = action.payload;
			const job = state.jobs[jobId];
			if (!job) return;
			const total = job.videoFragments.length + job.audioFragments.length;
			state.jobsStatus[jobId] = {
				...state.jobsStatus[jobId] ?? { total },
				status: "queued",
				total,
				done: 0,
				saveProgress: 0,
				saveMessage: void 0,
				errorMessage: void 0
			};
		},
		cancel(_state, _action) {},
		delete(_state, _action) {},
		deleteSuccess(state, action) {
			const { jobId } = action.payload;
			delete state.jobs[jobId];
			delete state.jobsStatus[jobId];
		},
		finishDownload(state, action) {
			const { jobId } = action.payload;
			const jobStatus = state.jobsStatus[jobId];
			if (!jobStatus) return;
			jobStatus.done = jobStatus.total;
			jobStatus.status = "ready";
		},
		downloadFailed(state, action) {
			const { jobId, message } = action.payload;
			const jobStatus = state.jobsStatus[jobId] || (state.jobsStatus[jobId] = {
				status: "error",
				total: 0,
				done: 0,
				saveProgress: 0
			});
			jobStatus.status = "error";
			jobStatus.errorMessage = message;
		},
		incDownloadStatus(state, action) {
			const { jobId } = action.payload;
			const jobStatus = state.jobsStatus[jobId];
			if (!jobStatus) return;
			jobStatus.done++;
		},
		saveAs(state, action) {
			const { jobId } = action.payload;
			const jobStatus = state.jobsStatus[jobId];
			if (!jobStatus) return;
			jobStatus.status = "saving";
		},
		saveAsSuccess(state, action) {
			const { jobId } = action.payload;
			const job = state.jobs[jobId];
			const jobStatus = state.jobsStatus[jobId];
			if (!job || !jobStatus) return;
			jobStatus.status = "done";
		},
		setSaveProgress(state, action) {
			const { jobId, progress, message } = action.payload;
			const jobStatus = state.jobsStatus[jobId];
			if (!jobStatus) return;
			jobStatus.saveProgress = progress;
			jobStatus.saveMessage = message;
		}
	}
});
//#endregion
//#region ../core/lib/store/slices/subtitles-slice.js
var initialSubtitlesState = { subtitles: {} };
var subtitlesSlice = createSlice({
	name: "subtitles",
	initialState: initialSubtitlesState,
	reducers: {
		download(state, action) {
			const { levelID } = action.payload;
			state.subtitles[levelID] = { status: "downloading" };
		},
		downloadSuccess(state, action) {
			const { levelID, filename } = action.payload;
			state.subtitles[levelID] = {
				status: "done",
				filename
			};
		},
		downloadFailed(state, action) {
			const { levelID, message } = action.payload;
			state.subtitles[levelID] = {
				status: "error",
				message
			};
		},
		clear(state) {
			state.subtitles = initialSubtitlesState.subtitles;
		}
	}
});
//#endregion
//#region ../core/lib/store/slices/level-inspections-slice.js
var initialState$1 = {
	inspections: {},
	status: {},
	errors: {}
};
var levelInspectionsSlice = createSlice({
	name: "levelInspections",
	initialState: initialState$1,
	reducers: {
		inspect(state, action) {
			const { levelId } = action.payload;
			state.status[levelId] = "pending";
			state.errors[levelId] = null;
		},
		inspectSuccess(state, action) {
			const inspection = action.payload.inspection;
			state.inspections[inspection.levelId] = inspection;
			state.status[inspection.levelId] = "ready";
			state.errors[inspection.levelId] = null;
		},
		inspectFailed(state, action) {
			const { levelId, message } = action.payload;
			state.status[levelId] = "error";
			state.errors[levelId] = message;
		},
		clear(state) {
			state.inspections = initialState$1.inspections;
			state.status = initialState$1.status;
			state.errors = initialState$1.errors;
		},
		removePlaylistInspections(state, action) {
			const { playlistID } = action.payload;
			for (const id in state.inspections) if (state.inspections.hasOwnProperty(id)) {
				if (state.inspections[id]?.playlistId === playlistID) {
					delete state.inspections[id];
					delete state.status[id];
					delete state.errors[id];
				}
			}
		}
	}
});
//#endregion
//#region ../core/lib/store/slices/playlist-preferences-slice.js
var initialState = {
	audioSelections: {},
	subtitleSelections: {}
};
var playlistPreferencesSlice = createSlice({
	name: "playlistPreferences",
	initialState,
	reducers: {
		setAudioSelection(state, action) {
			const { playlistID, levelID } = action.payload;
			state.audioSelections[playlistID] = levelID;
		},
		setSubtitleSelection(state, action) {
			const { playlistID, levelID } = action.payload;
			state.subtitleSelections[playlistID] = levelID;
		},
		clear(state) {
			state.audioSelections = initialState.audioSelections;
			state.subtitleSelections = initialState.subtitleSelections;
		},
		removePlaylistPreferences(state, action) {
			const { playlistID } = action.payload;
			delete state.audioSelections[playlistID];
			delete state.subtitleSelections[playlistID];
		}
	}
});
var storageSlice = createSlice({
	name: "storage",
	initialState: {
		loading: false,
		buckets: {},
		totalUsedBytes: 0,
		quotaExempt: false,
		quotaIsAdvisory: false,
		estimateSource: "unknown",
		nearQuota: false,
		cleanupStatus: "idle"
	},
	reducers: {
		refresh(state) {
			state.loading = true;
			state.error = void 0;
		},
		refreshSuccess(state, action) {
			state.loading = false;
			state.error = void 0;
			state.lastUpdated = Date.now();
			state.availableBytes = action.payload.availableBytes;
			state.quotaBytes = action.payload.quotaBytes;
			state.persisted = action.payload.persisted;
			state.quotaExempt = action.payload.quotaExempt;
			state.quotaIsAdvisory = action.payload.quotaIsAdvisory;
			state.estimateSource = action.payload.estimateSource;
			state.nearQuota = action.payload.nearQuota;
			state.totalUsedBytes = action.payload.totalUsedBytes;
			state.subtitlesBytes = action.payload.subtitlesBytes;
			state.buckets = action.payload.buckets.reduce((acc, bucket) => {
				acc[bucket.id] = bucket;
				return acc;
			}, {});
		},
		refreshFailure(state, action) {
			state.loading = false;
			state.error = action.payload.error;
		},
		startCleanup(state) {
			state.cleanupStatus = "running";
			state.cleanupError = void 0;
		},
		cleanupSuccess(state) {
			state.cleanupStatus = "success";
			state.cleanupError = void 0;
			state.loading = false;
			state.lastUpdated = Date.now();
			state.totalUsedBytes = 0;
			state.availableBytes = void 0;
			state.nearQuota = false;
			state.buckets = {};
		},
		cleanupFailure(state, action) {
			state.cleanupStatus = "error";
			state.cleanupError = action.payload.error;
			state.loading = false;
		},
		resetCleanupState(state) {
			state.cleanupStatus = "idle";
			state.cleanupError = void 0;
		}
	}
});
//#endregion
//#region ../core/lib/use-cases/create-bucket.js
var createBucketFactory = (fs) => {
	const run = async (bucketID, videoLength, audioLength) => {
		await fs.createBucket(bucketID, videoLength, audioLength);
	};
	return run;
};
//#endregion
//#region ../core/lib/utils/fetch.js
async function fetchWithFallback(primaryUri, fallbackUri, attempts, fetcher) {
	try {
		return {
			uri: primaryUri,
			data: await fetcher(primaryUri, attempts)
		};
	} catch (error) {
		if (fallbackUri && fallbackUri !== primaryUri) return {
			uri: fallbackUri,
			data: await fetcher(fallbackUri, attempts)
		};
		throw error;
	}
}
//#endregion
//#region ../core/lib/use-cases/decrypt-single-fragment.js
var decryptSingleFragmentFactory = (loader, decryptor) => {
	const run = async (key, data, fetchAttempts) => {
		if (!key.uri || !key.iv) return data;
		const { data: keyArrayBuffer } = await fetchWithFallback(key.uri, key.fallbackUri, fetchAttempts, loader.fetchArrayBuffer);
		return await decryptor.decrypt(data, keyArrayBuffer, key.iv);
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/download-single-fragment.js
var downloadSingleFactory = (loader) => {
	const run = async (fragment, fetchAttempts) => {
		const fetcher = (uri, attempts) => fragment.byteRange ? loader.fetchArrayBuffer(uri, attempts, fragment.byteRange) : loader.fetchArrayBuffer(uri, attempts);
		const { data } = await fetchWithFallback(fragment.uri, fragment.fallbackUri, fetchAttempts, fetcher);
		return data;
	};
	return run;
};
//#endregion
//#region ../core/lib/entities/fragment.js
var Fragment = class {
	key;
	uri;
	index;
	fallbackUri;
	byteRange;
	constructor(key, uri, index, fallbackUri, byteRange) {
		this.key = key;
		this.uri = uri;
		this.index = index;
		this.fallbackUri = fallbackUri;
		this.byteRange = byteRange;
	}
};
//#endregion
//#region ../core/lib/entities/key.js
var Key = class {
	uri;
	iv;
	fallbackUri;
	constructor(uri, iv, fallbackUri) {
		this.uri = uri;
		this.iv = iv;
		this.fallbackUri = fallbackUri;
	}
};
//#endregion
//#region ../core/lib/utils/url.js
function appendQueryParams(sourceUrl, targetUrl) {
	try {
		const source = new URL(sourceUrl, targetUrl);
		const target = new URL(targetUrl, source);
		if (!source.search || source.search === "?") return target.toString();
		const sourceParams = new URLSearchParams(source.search);
		const targetParams = new URLSearchParams(target.search);
		let changed = false;
		sourceParams.forEach((value, key) => {
			if (!targetParams.has(key)) {
				targetParams.append(key, value);
				changed = true;
			}
		});
		if (!changed) return target.toString();
		target.search = targetParams.toString();
		return target.toString();
	} catch (_e) {
		return targetUrl;
	}
}
//#endregion
//#region ../core/lib/use-cases/get-fragments-details.js
var getFragmentsDetailsFactory = (loader, parser) => {
	const run = async (playlist, fetchAttempts, options = {}) => {
		const baseUri = options.baseUri ?? playlist.playlistID ?? playlist.uri;
		const primaryPlaylistUri = appendQueryParams(baseUri, playlist.uri);
		const { uri: usedPlaylistUri, data: levelPlaylistText } = await fetchWithFallback(primaryPlaylistUri, primaryPlaylistUri !== playlist.uri ? playlist.uri : null, fetchAttempts, loader.fetchText);
		return parser.parseLevelPlaylist(levelPlaylistText, usedPlaylistUri).map((fragment) => {
			const primaryUri = appendQueryParams(baseUri, fragment.uri);
			const fallbackUri = primaryUri !== fragment.uri ? fragment.uri : null;
			const keyPrimaryUri = fragment.key.uri ? appendQueryParams(baseUri, fragment.key.uri) : fragment.key.uri;
			const keyFallbackUri = fragment.key.uri && keyPrimaryUri !== fragment.key.uri ? fragment.key.uri : null;
			return new Fragment(new Key(keyPrimaryUri, fragment.key.iv, keyFallbackUri), primaryUri, fragment.index, fallbackUri, fragment.byteRange);
		});
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/get-levels.js
var JW_MANIFEST_RE = /^https?:\/\/[^/]*(?:jwplatform|jwplayer|jwpsrv)\.com\/(?:v2\/)?manifests\/([A-Za-z0-9]+)\.m3u8/i;
var DIRECT_SUBTITLE_RE = /(?:\.(?:srt|vtt|ttml|dfxp)(?:\?|$)|(?:jwplatform|jwplayer|jwpsrv)\.com\/tracks\/)/i;
var isDirectSubtitleUri = (uri) => DIRECT_SUBTITLE_RE.test(uri || "");
var vttToSrt = (text) => {
	const blocks = String(text).replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").trim().split(/\n{2,}/);
	let n = 0;
	const out = [];
	for (const block of blocks) {
		const lines = block.split("\n");
		const i = lines.findIndex((l) => l.includes("-->"));
		if (i < 0) continue;
		const time = lines[i].replace(/(\d{1,2}:)?(\d{2}):(\d{2})\.(\d{3})/g, (_m, h, mm, ss, ms) => (h ? h.padStart(3, "0") : "00:") + mm + ":" + ss + "," + ms).replace(/\s+(align|position|line|size|vertical):\S+/g, "");
		out.push(++n + "\n" + time + "\n" + lines.slice(i + 1).join("\n"));
	}
	return out.join("\n\n") + "\n";
};
var toWebVtt = (text) => {
	const clean = String(text).replace(/^\uFEFF/, "").replace(/\r\n?/g, "\n").trim();
	if (/^WEBVTT/.test(clean)) return clean;
	return "WEBVTT\n\n" + clean.replace(/(\d{2}:\d{2}:\d{2}),(\d{3})/g, "$1.$2");
};
async function addJwPlayerCaptions(masterText, masterUri, loader) {
	const match = JW_MANIFEST_RE.exec(masterUri);
	if (!match || /TYPE=SUBTITLES/.test(masterText)) return masterText;
	try {
		const json = JSON.parse(await loader.fetchText("https://cdn.jwplayer.com/v2/media/" + match[1], 1));
		const tracks = (json.playlist && json.playlist[0] && json.playlist[0].tracks || []).filter((t) => t && t.file && (t.kind === "captions" || t.kind === "subtitles"));
		const q = (v) => String(v).replace(/"/g, "'");
		const lines = tracks.map((t, i) => '#EXT-X-MEDIA:TYPE=SUBTITLES,GROUP-ID="jw-subs",NAME="' + q(t.label || t.language || "track" + (i + 1)) + '",LANGUAGE="' + q(t.language || "und") + '",DEFAULT=NO,AUTOSELECT=NO,URI="' + q(t.file) + '"');
		if (!lines.length) return masterText;
		return masterText.replace(/\r?\n/, "\n" + lines.join("\n") + "\n");
	} catch (_e) {
		return masterText;
	}
}
var getLevelsFactory = (loader, parser) => {
	const run = async (masterPlaylistURI, fetchAttempts) => {
		try {
			let masterPlaylistText = await loader.fetchText(masterPlaylistURI, fetchAttempts);
			masterPlaylistText = await addJwPlayerCaptions(masterPlaylistText, masterPlaylistURI, loader);
			return parser.parseMasterPlaylist(masterPlaylistText, masterPlaylistURI);
		} catch (error) {
			throw Error("LevelManifest");
		}
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/prepare-download-bucket.js
var prepareDownloadBucketFactory = (fs) => {
	const run = async (bucketID, onProgress, options) => {
		const bucket = await fs.getBucket(bucketID);
		if (!bucket) throw new Error(`Download data for ${bucketID} was not found`);
		return await bucket.prepareDownload(onProgress, options);
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/write-to-bucket.js
var writeToBucketFactory = (fs) => {
	const run = async (bucketID, index, data) => {
		const bucket = await fs.getBucket(bucketID);
		if (!bucket) throw new Error(`Download data for ${bucketID} was not found`);
		await bucket.write(index, data);
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/write-to-file.js
var saveAsFactory = (fs) => {
	const run = async (path, download, options) => {
		return await fs.saveAs(path, download, options);
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/sanitize-filename.js
function sanitizeFilename(name) {
	return name.replace(/[<>:"/\\|?*]/g, "_").replace(/\s+/g, " ").trim();
}
//#endregion
//#region ../core/lib/use-cases/generate-file-name.js
var isUsableTitle = (title) => {
	const trimmed = title?.trim() ?? "";
	if (trimmed.length === 0) return false;
	if (/^[a-z]+:\/\//i.test(trimmed)) return false;
	return !/^(loading|untitled)\b/i.test(trimmed);
};
var isUsableBasename = (name) => {
	if (name.length === 0 || name.length > 40) return false;
	if (/^[0-9a-f]{8,}$/i.test(name)) return false;
	if (/^[0-9]+$/.test(name)) return false;
	return /[a-z]/i.test(name);
};
var qualityLabel = (level) => {
	if (level.height) return `${level.height}p`;
	if (level.bitrate) return `${Math.round(level.bitrate / 1e3)}kbps`;
};
var generateFileName = () => {
	const run = (playlist, level, options) => {
		const chunks = playlist.uri.split("?")[0].split("/");
		const basename = chunks[chunks.length - 1].split(".m3u8")[0];
		const container = options?.container ?? "mp4";
		const title = isUsableTitle(playlist.pageTitle) ? sanitizeFilename(playlist.pageTitle) : void 0;
		if (title) {
			const quality = qualityLabel(level);
			return `${quality ? `${title}-${quality}` : title}.${container}`.normalize("NFC");
		}
		return `${isUsableBasename(basename) ? sanitizeFilename(basename) : "stream"}.${container}`.normalize("NFC");
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/generate-subtitle-file-name.js
var generateSubtitleFileName = () => {
	const run = (playlist, level) => {
		return `${playlist.pageTitle && playlist.pageTitle.trim().length > 0 ? sanitizeFilename(playlist.pageTitle) : "subtitle"}-${`${level.language || level.name || level.id || "track"}`.replace(/\s+/g, "-")}.vtt`.normalize("NFC");
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/delete-bucket.js
var deleteBucketFactory = (fs) => {
	const run = async (bucketID) => {
		await fs.deleteBucket(bucketID);
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/fs-cleanup.js
var fsCleanupFactory = (fs) => {
	const run = async () => {
		await fs.cleanup();
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/download-subtitle-track.js
var downloadSubtitleTrackFactory = (loader, parser, fs) => {
	const run = async (level, playlist, fetchAttempts, dialog, options = {}) => {
		const baseUri = options.baseUri ?? playlist.uri;
		const fragments = isDirectSubtitleUri(level.uri) ? [] : await getFragmentsDetailsFactory(loader, parser)(level, fetchAttempts, { baseUri });
		const hasFragments = fragments.length > 0;
		const textParts = [];
		if (hasFragments) for (const fragment of fragments) {
			const { data: fragmentText } = await fetchWithFallback(fragment.uri, fragment.fallbackUri, fetchAttempts, loader.fetchText);
			textParts.push(fragmentText.trim());
		}
		else {
			const { data: subtitleText } = await fetchWithFallback(appendQueryParams(baseUri, level.uri), level.uri, fetchAttempts, loader.fetchText);
			textParts.push(subtitleText.trim());
		}
		let fileName = generateSubtitleFileName()(playlist, level);
		const subtitleBody = textParts.join("\n\n");
		const isVtt = /^\uFEFF?\s*WEBVTT/.test(subtitleBody);
		if (!isVtt) fileName = fileName.replace(/\.vtt$/, ".srt");
		const download = await fs.prepareTextDownload(subtitleBody, isVtt ? "text/vtt" : "application/x-subrip");
		await fs.saveAs(fileName, download, { dialog });
		return fileName;
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/get-subtitle-text.js
var getSubtitleTextFactory = (loader, parser) => {
	const run = async (level, fetchAttempts, options = {}) => {
		const baseUri = options.baseUri ?? level.playlistID ?? level.uri;
		const fragments = isDirectSubtitleUri(level.uri) ? [] : await getFragmentsDetailsFactory(loader, parser)(level, fetchAttempts, { baseUri });
		const parts = [];
		if (fragments.length > 0) for (const fragment of fragments) {
			const { data: fragmentText } = await fetchWithFallback(fragment.uri, fragment.fallbackUri, fetchAttempts, loader.fetchText);
			parts.push(fragmentText.trim());
		}
		else {
			const primaryUri = appendQueryParams(baseUri, level.uri);
			const { data: text } = await fetchWithFallback(primaryUri, primaryUri !== level.uri ? level.uri : options.baseUri ?? null, fetchAttempts, loader.fetchText);
			parts.push(text.trim());
		}
		return isDirectSubtitleUri(level.uri) ? toWebVtt(parts.join("\n\n")) : parts.join("\n\n");
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/store-subtitle-text.js
var storeSubtitleTextFactory = (fs) => {
	const run = async (bucketId, level, playlist, text) => {
		console.log("[subtitle] store-subtitle-text", {
			bucketId,
			levelId: level.id,
			hasText: text !== void 0 && text !== null,
			textLength: text?.length ?? 0
		});
		const language = level.language;
		const name = level.name || language || playlist.pageTitle || playlist.uri.split("/").pop() || "subtitle";
		try {
			await fs.setSubtitleText(bucketId, {
				text,
				language,
				name
			});
		} catch (error) {
			console.error("[subtitle] setSubtitleText failed", error);
			throw error;
		}
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/inspect-level-encryption.js
var SUPPORTED_METHODS = ["AES-128"];
var inspectLevelEncryptionFactory = (loader, parser) => {
	const run = async (level, fetchAttempts, options = {}) => {
		const baseUri = options.baseUri ?? level.playlistID ?? level.uri;
		const { data: playlistText, uri: usedUri } = await fetchWithFallback(appendQueryParams(baseUri, level.uri), level.uri, fetchAttempts, loader.fetchText);
		const { methods, keyUris, iv } = parser.inspectLevelEncryption(playlistText, usedUri);
		const method = methods.length > 0 ? methods[0] : null;
		const supported = method === null || SUPPORTED_METHODS.includes(method);
		const normalizedKeyUris = keyUris.map((uri) => appendQueryParams(baseUri, uri));
		return {
			levelId: level.id,
			playlistId: level.playlistID,
			method,
			keyUris: normalizedKeyUris,
			iv: iv ?? null,
			supported,
			message: supported ? void 0 : method ? `Unsupported encryption method: ${method}` : "Unsupported encryption method detected"
		};
	};
	return run;
};
var getStorageStatsFactory = (fs, options) => {
	const run = async () => {
		const snapshot = await fs.getStorageStats();
		const buckets = snapshot.buckets.map((bucket) => {
			const totalFragments = Math.max(0, (bucket.videoLength ?? 0) + (bucket.audioLength ?? 0));
			const averageChunkBytes = bucket.storedChunks > 0 ? bucket.storedBytes / bucket.storedChunks : void 0;
			const expectedBytes = averageChunkBytes !== void 0 && totalFragments > 0 ? averageChunkBytes * totalFragments : void 0;
			return {
				id: bucket.id,
				storedBytes: bucket.storedBytes,
				storedChunks: bucket.storedChunks,
				totalFragments,
				averageChunkBytes,
				expectedBytes,
				videoLength: bucket.videoLength,
				audioLength: bucket.audioLength,
				updatedAt: bucket.updatedAt
			};
		});
		const fragmentBytes = buckets.reduce((sum, bucket) => sum + bucket.storedBytes, 0);
		const subtitlesBytes = snapshot.subtitlesBytes ?? 0;
		const totalUsedBytes = fragmentBytes + subtitlesBytes;
		const usageForAvailable = snapshot.estimate?.usage ?? totalUsedBytes;
		const quotaBytes = snapshot.estimate?.quota;
		const availableBytes = snapshot.estimate?.available ?? (quotaBytes !== void 0 && usageForAvailable !== void 0 ? Math.max(0, quotaBytes - usageForAvailable) : void 0);
		const warningRatio = options?.warningRatio ?? .9;
		const minAvailableBytes = options?.minAvailableBytes ?? 209715200;
		const quotaIsAdvisory = snapshot.estimate?.quotaIsAdvisory ?? false;
		const nearQuota = !quotaIsAdvisory && (quotaBytes !== void 0 && usageForAvailable !== void 0 && quotaBytes > 0 && usageForAvailable / quotaBytes >= warningRatio || availableBytes !== void 0 && availableBytes <= minAvailableBytes);
		return {
			buckets,
			totalUsedBytes,
			quotaBytes,
			availableBytes,
			persisted: snapshot.estimate?.persisted,
			quotaExempt: snapshot.estimate?.quotaExempt ?? false,
			quotaIsAdvisory,
			estimateSource: snapshot.estimate?.source ?? "unknown",
			nearQuota,
			subtitlesBytes
		};
	};
	return run;
};
//#endregion
//#region ../core/lib/use-cases/get-playlist-duration.js
/**
* Fetch a level playlist and sum EXTINF durations (seconds).
*/
var getPlaylistDurationFactory = (loader) => {
	const run = async (uri, fallbackUri, fetchAttempts) => {
		const { data } = await fetchWithFallback(uri, fallbackUri, fetchAttempts, loader.fetchText);
		const duration = data.split("\n").filter((line) => line.startsWith("#EXTINF:")).map((line) => {
			const value = line.slice(8).split(",")[0];
			const parsed = parseFloat(value);
			return Number.isFinite(parsed) ? parsed : 0;
		}).reduce((sum, val) => sum + val, 0);
		return duration > 0 ? duration : null;
	};
	return run;
};
//#endregion
//#region ../core/lib/controllers/download-job-epic.js
var downloadJobEpic = (action$, store$, { fs, loader, decryptor }) => action$.pipe(filter(jobsSlice.actions.download.match), map((action) => action.payload.jobId), mergeMap((jobId) => {
	const job = store$.value.jobs.jobs[jobId];
	if (!job) return EMPTY;
	const { videoFragments, audioFragments } = job;
	const fragments = videoFragments.concat(audioFragments.map((fragment) => ({
		...fragment,
		index: fragment.index + videoFragments.length
	})));
	return from(createBucketFactory(fs)(jobId, videoFragments.length, audioFragments.length).then(() => ({
		fragments,
		jobId
	}))).pipe(catchError((error) => {
		console.warn("[hls-debug] createBucket failed", jobId, error);
		return of({
			fragments: [],
			jobId,
			error
		});
	}));
}), mergeMap(({ fragments, jobId, error }) => error ? of(jobsSlice.actions.downloadFailed({
	jobId,
	message: error?.message || "Failed to create download storage"
})) : from(fragments).pipe(mergeMap((fragment) => from(downloadSingleFactory(loader)(fragment, store$.value.config.fetchAttempts).then((data) => ({
	fragment,
	data,
	jobId
}))), store$.value.config.concurrency), mergeMap(({ data, fragment, jobId }) => decryptSingleFragmentFactory(loader, decryptor)(fragment.key, data, store$.value.config.fetchAttempts).then((data) => ({
	fragment,
	data,
	jobId
}))), mergeMap(({ data, jobId, fragment }) => writeToBucketFactory(fs)(jobId, fragment.index, data).then(() => ({ jobId }))), mergeMap(({ jobId }) => of(jobsSlice.actions.incDownloadStatus({ jobId }))), takeUntil(action$.pipe(filter(jobsSlice.actions.cancel.match)).pipe(filter((action) => action.payload.jobId === jobId))), catchError((error) => of(jobsSlice.actions.downloadFailed({
	jobId,
	message: error?.message || "Download failed during fragment processing"
}))))));
//#endregion
//#region ../core/lib/controllers/add-download-job-epic.js
var withTimeout = (promise, ms, message) => new Promise((resolve, reject) => {
	const timer = setTimeout(() => reject(new Error(message)), ms);
	promise.then((value) => {
		clearTimeout(timer);
		resolve(value);
	}, (error) => {
		clearTimeout(timer);
		reject(error);
	});
});
var failedDownloadJobActions = (jobId, playlist, videoLevel, message) => {
	console.warn("[hls-debug] add-download-job failed", {
		jobId,
		message
	});
	return of(jobsSlice.actions.add({ job: {
		id: jobId,
		playlistId: playlist?.id ?? videoLevel?.playlistID ?? "",
		videoFragments: [],
		audioFragments: [],
		filename: playlist && videoLevel ? generateFileName()(playlist, videoLevel) : "download",
		createdAt: Date.now(),
		prepareFailed: true
	} }), jobsSlice.actions.downloadFailed({
		jobId,
		message: `${message} (press Start download again)`
	}));
};
var addDownloadJobEpic = (action$, store$, { loader, parser, fs }) => action$.pipe(filter(levelsSlice.actions.download.match), map((action) => action.payload), mergeMap(({ levelID, audioLevelID, subtitleLevelID }) => {
	const jobId = crypto?.randomUUID?.() ?? `job-${Date.now()}-${Math.floor(Math.random() * 1e6)}`;
	const videoLevel = store$.value.levels.levels[levelID];
	const audioLevel = audioLevelID ? store$.value.levels.levels[audioLevelID] : void 0;
	const subtitleLevel = subtitleLevelID ? store$.value.levels.levels[subtitleLevelID] : void 0;
	const playlist = videoLevel ? store$.value.playlists.playlists[videoLevel.playlistID] : null;
	console.log("[hls-debug] levels/download received", {
		jobId,
		levelID,
		audioLevelID,
		subtitleLevelID,
		hasVideoLevel: Boolean(videoLevel),
		hasAudioLevel: Boolean(audioLevel),
		hasSubtitleLevel: Boolean(subtitleLevel),
		hasPlaylist: Boolean(playlist)
	});
	if (!videoLevel || !playlist) return failedDownloadJobActions(jobId, playlist, videoLevel, "Unable to start download: playlist not found (the page may need a reload)");
	const baseUri = videoLevel.playlistID;
	const fetchAttempts = store$.value.config.fetchAttempts;
	const keepAlive = setInterval(() => {
		import_browser_polyfill.runtime.getPlatformInfo().catch(() => void 0);
	}, 2e4);
	return from(withTimeout((async () => {
		const [videoFragments, audioFragments, subtitleText] = await Promise.all([
			getFragmentsDetailsFactory(loader, parser)(videoLevel, fetchAttempts, { baseUri }).then((fragments) => {
				console.log("[hls-debug] video fragments", fragments.length);
				return fragments;
			}),
			audioLevel ? getFragmentsDetailsFactory(loader, parser)(audioLevel, fetchAttempts, { baseUri }).then((fragments) => {
				console.log("[hls-debug] audio fragments", fragments.length);
				return fragments;
			}) : Promise.resolve([]),
			subtitleLevel ? withTimeout(getSubtitleTextFactory(loader, parser)(subtitleLevel, Math.min(fetchAttempts, 3), { baseUri }), 2e4, "Subtitle fetch timed out").then((text) => {
				console.log("[hls-debug] subtitle text", text?.length ?? 0);
				return text;
			}).catch((error) => {
				console.warn("[add-download-job] subtitle skipped:", error?.message);
				return null;
			}) : Promise.resolve(null)
		]);
		const configuredContainer = store$.value.config.outputContainer ?? "mp4";
		const container = subtitleLevel && subtitleText !== null && subtitleText !== void 0 ? "mkv" : configuredContainer;
		const actions = [jobsSlice.actions.add({ job: {
			id: jobId,
			playlistId: playlist.id,
			videoFragments,
			audioFragments,
			filename: generateFileName()(playlist, videoLevel, { container }),
			outputContainer: container,
			createdAt: Date.now(),
			bitrate: videoLevel.bitrate,
			width: videoLevel.width,
			height: videoLevel.height,
			subtitleText: subtitleText !== void 0 && subtitleText !== null ? subtitleText : void 0,
			subtitleLanguage: subtitleLevel?.language,
			subtitleName: subtitleLevel?.name
		} })];
		if (subtitleLevel && subtitleLevel.type === "subtitle" && subtitleText !== void 0 && subtitleText !== null) {
			console.log("[add-download-job] storing subtitle text", {
				jobId,
				subtitleLevelId: subtitleLevel.id,
				subtitleLength: subtitleText.length
			});
			await withTimeout(storeSubtitleTextFactory(fs)(jobId, subtitleLevel, playlist, subtitleText), 1e4, "Storing subtitle text timed out").catch((error) => {
				console.warn("[hls-debug] subtitle store skipped (re-tried before save):", error?.message);
			});
		}
		if (videoFragments.length === 0) throw new Error("The selected stream has no segments");
		console.log("[hls-debug] job ready", {
			jobId,
			videoFragments: videoFragments.length,
			audioFragments: audioFragments.length,
			container
		});
		return actions;
	})(), 6e4, "Timed out preparing the download").finally(() => clearInterval(keepAlive))).pipe(mergeMap((acts) => of(...acts)), catchError((error) => failedDownloadJobActions(jobId, playlist, videoLevel, error?.message ?? "Failed to prepare download")));
}));
//#endregion
//#region ../core/lib/controllers/save-as-job-epic.js
var saveAsJobEpic = (action$, store$, { fs }) => action$.pipe(filter(jobsSlice.actions.saveAs.match), map((action) => action.payload.jobId), mergeMap((jobId) => {
	const job = store$.value.jobs.jobs[jobId];
	if (!job) return EMPTY;
	const dialog = store$.value.config.saveDialog;
	const container = job.outputContainer ?? (job.filename.toLowerCase().endsWith(".mkv") ? "mkv" : "mp4");
	console.log("[hls-debug] saveAs start", {
		jobId,
		container,
		hasSubtitle: job.subtitleText !== void 0 && job.subtitleText !== null
	});
	return (job?.subtitleText !== void 0 && job.subtitleText !== null ? from(withTimeout(fs.setSubtitleText(jobId, {
		text: job.subtitleText,
		language: job.subtitleLanguage,
		name: job.subtitleName
	}), 1e4, "Storing subtitle text timed out").then(() => true, (error) => {
		console.warn("[hls-debug] subtitle re-store before save failed:", error?.message);
		return false;
	})).pipe(map((stored) => {
		console.log("[subtitle] re-stored before save", {
			jobId,
			hasText: stored,
			language: job.subtitleLanguage
		});
		return null;
	})) : of(null)).pipe(mergeMap(() => from(prepareDownloadBucketFactory(fs)(jobId, (progress, message) => jobsSlice.actions.setSaveProgress({
		jobId,
		progress,
		message
	}), { container }))), mergeMap((download) => from((async () => {
		await saveAsFactory(fs)(job.filename, download, { dialog });
		if (job.subtitleText !== void 0 && job.subtitleText !== null) try {
			const srtName = job.filename.replace(/\.[a-z0-9]+$/i, "") + ".srt";
			const srtDownload = await fs.prepareTextDownload(vttToSrt(job.subtitleText), "application/x-subrip");
			await fs.saveAs(srtName, srtDownload, { dialog });
		} catch (srtError) {
			console.error("[subtitle] separate .srt save failed", srtError);
		}
	})()).pipe(map(() => jobsSlice.actions.saveAsSuccess({ jobId: job.id })), catchError((error) => of(jobsSlice.actions.downloadFailed({
		jobId,
		message: error?.message || "Failed to finalize download (mux or save)"
	}))))), catchError((error) => of(jobsSlice.actions.downloadFailed({
		jobId,
		message: error?.message || "Failed to prepare download (mux or save)"
	}))));
}));
//#endregion
//#region ../core/lib/controllers/inc-download-status-epic.js
var incDownloadStatusEpic = (action$, store$) => action$.pipe(filter(jobsSlice.actions.incDownloadStatus.match), map((action) => action.payload.jobId), map((id) => ({
	id,
	status: store$.value.jobs.jobsStatus[id]
})), filter(({ status }) => Boolean(status)), filter(({ status }) => status.done === status.total), mergeMap(({ id }) => {
	return of(jobsSlice.actions.finishDownload({ jobId: id }), jobsSlice.actions.saveAs({ jobId: id }));
}));
//#endregion
//#region ../core/lib/controllers/download-queue-epic.js
var shouldSchedule = (action) => jobsSlice.actions.add.match(action) || jobsSlice.actions.queue.match(action) || jobsSlice.actions.finishDownload.match(action) || jobsSlice.actions.downloadFailed.match(action) || jobsSlice.actions.deleteSuccess.match(action) || jobsSlice.actions.cancel.match(action) || configSlice.actions.setMaxActiveDownloads.match(action);
var downloadQueueEpic = (action$, store$) => action$.pipe(filter(shouldSchedule), mergeMap(() => {
	const state = store$.value;
	const limit = state.config.maxActiveDownloads ?? 0;
	const jobs = state.jobs.jobs;
	const jobsStatus = state.jobs.jobsStatus;
	const queued = Object.keys(jobsStatus).filter((id) => jobsStatus[id]?.status === "queued" && !jobs[id]?.prepareFailed).sort((a, b) => (jobs[a]?.createdAt ?? Number.MAX_SAFE_INTEGER) - (jobs[b]?.createdAt ?? Number.MAX_SAFE_INTEGER));
	const activeCount = Object.values(jobsStatus).filter((status) => status?.status === "downloading").length;
	const available = limit <= 0 ? queued.length : Math.max(0, limit - activeCount);
	if (available <= 0) return EMPTY;
	const toStart = queued.slice(0, available).map((jobId) => jobsSlice.actions.download({ jobId }));
	return toStart.length ? of(...toStart) : EMPTY;
}));
//#endregion
//#region ../core/lib/controllers/fetch-playlist-levels-epic.js
var fetchPlaylistLevelsEpic = (action$, store$, { loader, parser }) => action$.pipe(filter(playlistsSlice.actions.fetchPlaylistLevels.match), map((action) => action.payload.playlistID), map((playlistID) => store$.value.playlists.playlists[playlistID]), mergeMap(({ uri, id }) => from(getLevelsFactory(loader, parser)(uri, store$.value.config.fetchAttempts)).pipe(map((levels) => ({
	levels,
	playlistID: id,
	ok: true
})), catchError(() => of({
	playlistID: id,
	levels: [],
	ok: false
})))), mergeMap(({ playlistID, levels, ok }) => {
	if (!ok || levels.length === 0) return of(playlistsSlice.actions.fetchPlaylistLevelsFailed({ playlistID }));
	return of(playlistsSlice.actions.fetchPlaylistLevelsSuccess({ playlistID }), levelsSlice.actions.add({ levels }));
}));
//#endregion
//#region ../core/lib/controllers/add-playlist-epic.js
var addPlaylistEpic = (action$, state$) => action$.pipe(filter(playlistsSlice.actions.addPlaylist.match), map((action) => action.payload), filter(({ id }) => Boolean(state$.value.playlists.playlists[id])), mergeMap(({ id }) => of(playlistsSlice.actions.fetchPlaylistLevels({ playlistID: id }))));
//#endregion
//#region ../core/lib/controllers/delete-job-epic.js
var deleteJobEpic = (action$, _store$, { fs }) => action$.pipe(filter(jobsSlice.actions.delete.match), map((action) => action.payload.jobId), mergeMap((jobId) => from(deleteBucketFactory(fs)(jobId)).pipe(catchError(() => of(null)), map(() => jobId))), mergeMap((jobId) => of(jobsSlice.actions.deleteSuccess({ jobId }))));
//#endregion
//#region ../core/lib/controllers/on-init.js
var fsCleanupOnInitEpic = (action$, _store$, { fs }) => action$.pipe(ofType("init/start"), mergeMap(() => from(withTimeout(fsCleanupFactory(fs)(), 3e4, "Storage cleanup timed out")).pipe(catchError((error) => {
	console.warn("[hls-debug] init cleanup failed", error?.message ?? error);
	return of(null);
}))), mergeMap(() => of(createAction("init/done")())));
//#endregion
//#region ../core/lib/controllers/cancel-job-delete-job-epic.js
var cancelJobdeleteJobEpic = (action$, _store$, { fs }) => action$.pipe(filter(jobsSlice.actions.cancel.match), mergeMap(({ payload: { jobId } }) => of(jobsSlice.actions.delete({ jobId }))));
//#endregion
//#region ../core/lib/controllers/download-subtitle-epic.js
var downloadSubtitleEpic = (action$, store$, { loader, parser, fs }) => action$.pipe(filter(subtitlesSlice.actions.download.match), mergeMap(({ payload: { levelID, playlistID } }) => {
	const level = store$.value.levels.levels[levelID];
	const playlist = store$.value.playlists.playlists[playlistID];
	if (!level || level.type !== "subtitle" || !playlist) return of(subtitlesSlice.actions.downloadFailed({
		levelID,
		message: "Subtitle track not found"
	}));
	const baseUri = level.playlistID;
	return from(downloadSubtitleTrackFactory(loader, parser, fs)(level, playlist, store$.value.config.fetchAttempts, store$.value.config.saveDialog, { baseUri })).pipe(mergeMap((filename) => of(subtitlesSlice.actions.downloadSuccess({
		levelID,
		filename
	}))), catchError((error) => of(subtitlesSlice.actions.downloadFailed({
		levelID,
		message: error?.message ?? "Subtitle download failed"
	}))));
}));
//#endregion
//#region ../core/lib/controllers/inspect-level-epic.js
var inspectLevelEpic = (action$, state$, { loader, parser }) => action$.pipe(filter(levelInspectionsSlice.actions.inspect.match), map((action) => action.payload.levelId), mergeMap((levelId) => {
	const level = state$.value.levels.levels[levelId];
	if (!level) return of(levelInspectionsSlice.actions.inspectFailed({
		levelId,
		message: "Level not found"
	}));
	return from(inspectLevelEncryptionFactory(loader, parser)(level, state$.value.config.fetchAttempts, { baseUri: level.playlistID })).pipe(map((inspection) => levelInspectionsSlice.actions.inspectSuccess({ inspection })), catchError((error) => of(levelInspectionsSlice.actions.inspectFailed({
		levelId,
		message: error?.message || "Unable to inspect encryption for level"
	}))));
}));
//#endregion
//#region ../core/lib/controllers/remove-playlist-epic.js
var removePlaylistEpic = (action$) => action$.pipe(filter(playlistsSlice.actions.removePlaylist.match), mergeMap((action) => {
	const playlistID = action.payload.playlistID;
	return of(levelsSlice.actions.removePlaylistLevels({ playlistID }), levelInspectionsSlice.actions.removePlaylistInspections({ playlistID }), playlistPreferencesSlice.actions.removePlaylistPreferences({ playlistID }));
}));
//#endregion
//#region ../core/lib/controllers/storage-epics.js
var fetchStorageStatsEpic = (action$, _store$, { fs }) => action$.pipe(filter(storageSlice.actions.refresh.match), mergeMap(() => from(getStorageStatsFactory(fs)()).pipe(map((stats) => storageSlice.actions.refreshSuccess(stats)), catchError((error) => of(storageSlice.actions.refreshFailure({ error: error?.message ?? "Failed to read storage information" }))))));
var STORAGE_TRIGGER_ACTIONS = [
	jobsSlice.actions.incDownloadStatus.match,
	jobsSlice.actions.finishDownload.match,
	jobsSlice.actions.downloadFailed.match,
	jobsSlice.actions.deleteSuccess.match,
	jobsSlice.actions.queue.match,
	storageSlice.actions.cleanupSuccess.match,
	storageSlice.actions.cleanupFailure.match,
	(_action) => _action.type === "init/done"
];
var autoRefreshStorageStatsEpic = (action$) => action$.pipe(filter((action) => STORAGE_TRIGGER_ACTIONS.some((match) => match(action))), throttleTime(700, void 0, {
	leading: true,
	trailing: true
}), map(() => storageSlice.actions.refresh()));
var cleanupStorageEpic = (action$, state$, { fs }) => action$.pipe(filter(storageSlice.actions.startCleanup.match), mergeMap(() => {
	const jobsState = state$.value.jobs.jobsStatus;
	const cancelActions = Object.keys(jobsState).filter((jobId) => {
		const status = jobsState[jobId];
		if (!status) return false;
		return [
			"downloading",
			"queued",
			"saving",
			"ready"
		].includes(status.status);
	}).map((jobId) => jobsSlice.actions.cancel({ jobId }));
	return concat(cancelActions.length ? of(...cancelActions) : EMPTY, from(fsCleanupFactory(fs)()).pipe(mergeMap(() => of(storageSlice.actions.cleanupSuccess(), jobsSlice.actions.clear(), storageSlice.actions.refresh())), catchError((error) => of(storageSlice.actions.cleanupFailure({ error: error?.message ?? "Failed to clean browser storage" })))));
}));
//#endregion
//#region ../core/lib/controllers/fetch-level-duration-epic.js
var fetchLevelDurationEpic = (action$, state$, { loader }) => action$.pipe(filter(levelsSlice.actions.add.match), mergeMap((action) => {
	const fetchAttempts = state$.value.config.fetchAttempts;
	const addedLevels = action.payload.levels;
	if (!addedLevels?.length) return EMPTY;
	const toFetch = addedLevels.filter((level) => state$.value.levels.durations[level.id] === void 0);
	if (!toFetch.length) return EMPTY;
	const run = getPlaylistDurationFactory(loader);
	return from(toFetch).pipe(mergeMap((level) => from(run(level.uri, null, fetchAttempts)).pipe(mergeMap((durationSec) => of(levelsSlice.actions.setDuration({
		levelId: level.id,
		durationSec
	}))), catchError(() => of(levelsSlice.actions.setDuration({
		levelId: level.id,
		durationSec: null
	})))), 4));
}));
//#endregion
//#region ../core/lib/controllers/auto-delete-after-save-epic.js
var autoDeleteAfterSaveEpic = (action$, store$) => action$.pipe(filter(jobsSlice.actions.saveAsSuccess.match), filter(() => store$.value.config.autoDeleteAfterSave), map((action) => jobsSlice.actions.delete({ jobId: action.payload.jobId })));
//#endregion
//#region ../core/lib/controllers/index.js
var controllers_exports = /* @__PURE__ */ __exportAll({
	addDownloadJobEpic: () => addDownloadJobEpic,
	addPlaylistEpic: () => addPlaylistEpic,
	autoDeleteAfterSaveEpic: () => autoDeleteAfterSaveEpic,
	autoRefreshStorageStatsEpic: () => autoRefreshStorageStatsEpic,
	cancelJobdeleteJobEpic: () => cancelJobdeleteJobEpic,
	cleanupStorageEpic: () => cleanupStorageEpic,
	deleteJobEpic: () => deleteJobEpic,
	downloadJobEpic: () => downloadJobEpic,
	downloadQueueEpic: () => downloadQueueEpic,
	downloadSubtitleEpic: () => downloadSubtitleEpic,
	fetchLevelDurationEpic: () => fetchLevelDurationEpic,
	fetchPlaylistLevelsEpic: () => fetchPlaylistLevelsEpic,
	fetchStorageStatsEpic: () => fetchStorageStatsEpic,
	fsCleanupOnInitEpic: () => fsCleanupOnInitEpic,
	incDownloadStatusEpic: () => incDownloadStatusEpic,
	inspectLevelEpic: () => inspectLevelEpic,
	removePlaylistEpic: () => removePlaylistEpic,
	saveAsJobEpic: () => saveAsJobEpic
});
//#endregion
//#region ../core/lib/controllers/root-epic.js
function createRootEpic() {
	const epic$ = new BehaviorSubject(combineEpics(...Object.values({ ...controllers_exports })));
	const rootEpic = (action$, state$, deps) => epic$.pipe(mergeMap((epic) => epic(action$, state$, deps)));
	return rootEpic;
}
//#endregion
//#region ../core/lib/store/root-reducer.js
var rootReducer = combineReducers({
	playlists: playlistsSlice.reducer,
	levels: levelsSlice.reducer,
	config: configSlice.reducer,
	tabs: tabsSlice.reducer,
	jobs: jobsSlice.reducer,
	subtitles: subtitlesSlice.reducer,
	levelInspections: levelInspectionsSlice.reducer,
	playlistPreferences: playlistPreferencesSlice.reducer,
	storage: storageSlice.reducer
});
//#endregion
//#region ../core/lib/store/configure-store.js
var import_redux_logger = (/* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(e, t) {
		"object" == typeof exports && "undefined" != typeof module ? t(exports) : "function" == typeof define && define.amd ? define(["exports"], t) : t(e.reduxLogger = e.reduxLogger || {});
	})(exports, function(e) {
		"use strict";
		function t(e, t) {
			e.super_ = t, e.prototype = Object.create(t.prototype, { constructor: {
				value: e,
				enumerable: !1,
				writable: !0,
				configurable: !0
			} });
		}
		function r(e, t) {
			Object.defineProperty(this, "kind", {
				value: e,
				enumerable: !0
			}), t && t.length && Object.defineProperty(this, "path", {
				value: t,
				enumerable: !0
			});
		}
		function n(e, t, r) {
			n.super_.call(this, "E", e), Object.defineProperty(this, "lhs", {
				value: t,
				enumerable: !0
			}), Object.defineProperty(this, "rhs", {
				value: r,
				enumerable: !0
			});
		}
		function o(e, t) {
			o.super_.call(this, "N", e), Object.defineProperty(this, "rhs", {
				value: t,
				enumerable: !0
			});
		}
		function i(e, t) {
			i.super_.call(this, "D", e), Object.defineProperty(this, "lhs", {
				value: t,
				enumerable: !0
			});
		}
		function a(e, t, r) {
			a.super_.call(this, "A", e), Object.defineProperty(this, "index", {
				value: t,
				enumerable: !0
			}), Object.defineProperty(this, "item", {
				value: r,
				enumerable: !0
			});
		}
		function f(e, t, r) {
			var n = e.slice((r || t) + 1 || e.length);
			return e.length = t < 0 ? e.length + t : t, e.push.apply(e, n), e;
		}
		function u(e) {
			var t = "undefined" == typeof e ? "undefined" : N(e);
			return "object" !== t ? t : e === Math ? "math" : null === e ? "null" : Array.isArray(e) ? "array" : "[object Date]" === Object.prototype.toString.call(e) ? "date" : "function" == typeof e.toString && /^\/.*\//.test(e.toString()) ? "regexp" : "object";
		}
		function l(e, t, r, c, s, d, p) {
			s = s || [], p = p || [];
			var g = s.slice(0);
			if ("undefined" != typeof d) {
				if (c) {
					if ("function" == typeof c && c(g, d)) return;
					if ("object" === ("undefined" == typeof c ? "undefined" : N(c))) {
						if (c.prefilter && c.prefilter(g, d)) return;
						if (c.normalize) {
							var h = c.normalize(g, d, e, t);
							h && (e = h[0], t = h[1]);
						}
					}
				}
				g.push(d);
			}
			"regexp" === u(e) && "regexp" === u(t) && (e = e.toString(), t = t.toString());
			var y = "undefined" == typeof e ? "undefined" : N(e), v = "undefined" == typeof t ? "undefined" : N(t), b = "undefined" !== y || p && p[p.length - 1].lhs && p[p.length - 1].lhs.hasOwnProperty(d), m = "undefined" !== v || p && p[p.length - 1].rhs && p[p.length - 1].rhs.hasOwnProperty(d);
			if (!b && m) r(new o(g, t));
			else if (!m && b) r(new i(g, e));
			else if (u(e) !== u(t)) r(new n(g, e, t));
			else if ("date" === u(e) && e - t !== 0) r(new n(g, e, t));
			else if ("object" === y && null !== e && null !== t) if (p.filter(function(t) {
				return t.lhs === e;
			}).length) e !== t && r(new n(g, e, t));
			else {
				if (p.push({
					lhs: e,
					rhs: t
				}), Array.isArray(e)) {
					var w;
					e.length;
					for (w = 0; w < e.length; w++) w >= t.length ? r(new a(g, w, new i(void 0, e[w]))) : l(e[w], t[w], r, c, g, w, p);
					for (; w < t.length;) r(new a(g, w, new o(void 0, t[w++])));
				} else {
					var x = Object.keys(e), S = Object.keys(t);
					x.forEach(function(n, o) {
						var i = S.indexOf(n);
						i >= 0 ? (l(e[n], t[n], r, c, g, n, p), S = f(S, i)) : l(e[n], void 0, r, c, g, n, p);
					}), S.forEach(function(e) {
						l(void 0, t[e], r, c, g, e, p);
					});
				}
				p.length = p.length - 1;
			}
			else e !== t && ("number" === y && isNaN(e) && isNaN(t) || r(new n(g, e, t)));
		}
		function c(e, t, r, n) {
			return n = n || [], l(e, t, function(e) {
				e && n.push(e);
			}, r), n.length ? n : void 0;
		}
		function s(e, t, r) {
			if (r.path && r.path.length) {
				var n, o = e[t], i = r.path.length - 1;
				for (n = 0; n < i; n++) o = o[r.path[n]];
				switch (r.kind) {
					case "A":
						s(o[r.path[n]], r.index, r.item);
						break;
					case "D":
						delete o[r.path[n]];
						break;
					case "E":
					case "N": o[r.path[n]] = r.rhs;
				}
			} else switch (r.kind) {
				case "A":
					s(e[t], r.index, r.item);
					break;
				case "D":
					e = f(e, t);
					break;
				case "E":
				case "N": e[t] = r.rhs;
			}
			return e;
		}
		function d(e, t, r) {
			if (e && t && r && r.kind) {
				for (var n = e, o = -1, i = r.path ? r.path.length - 1 : 0; ++o < i;) "undefined" == typeof n[r.path[o]] && (n[r.path[o]] = "number" == typeof r.path[o] ? [] : {}), n = n[r.path[o]];
				switch (r.kind) {
					case "A":
						s(r.path ? n[r.path[o]] : n, r.index, r.item);
						break;
					case "D":
						delete n[r.path[o]];
						break;
					case "E":
					case "N": n[r.path[o]] = r.rhs;
				}
			}
		}
		function p(e, t, r) {
			if (r.path && r.path.length) {
				var n, o = e[t], i = r.path.length - 1;
				for (n = 0; n < i; n++) o = o[r.path[n]];
				switch (r.kind) {
					case "A":
						p(o[r.path[n]], r.index, r.item);
						break;
					case "D":
						o[r.path[n]] = r.lhs;
						break;
					case "E":
						o[r.path[n]] = r.lhs;
						break;
					case "N": delete o[r.path[n]];
				}
			} else switch (r.kind) {
				case "A":
					p(e[t], r.index, r.item);
					break;
				case "D":
					e[t] = r.lhs;
					break;
				case "E":
					e[t] = r.lhs;
					break;
				case "N": e = f(e, t);
			}
			return e;
		}
		function g(e, t, r) {
			if (e && t && r && r.kind) {
				var n, o, i = e;
				for (o = r.path.length - 1, n = 0; n < o; n++) "undefined" == typeof i[r.path[n]] && (i[r.path[n]] = {}), i = i[r.path[n]];
				switch (r.kind) {
					case "A":
						p(i[r.path[n]], r.index, r.item);
						break;
					case "D":
						i[r.path[n]] = r.lhs;
						break;
					case "E":
						i[r.path[n]] = r.lhs;
						break;
					case "N": delete i[r.path[n]];
				}
			}
		}
		function h(e, t, r) {
			if (e && t) {
				var n = function(n) {
					r && !r(e, t, n) || d(e, t, n);
				};
				l(e, t, n);
			}
		}
		function y(e) {
			return "color: " + F[e].color + "; font-weight: bold";
		}
		function v(e) {
			var t = e.kind, r = e.path, n = e.lhs, o = e.rhs, i = e.index, a = e.item;
			switch (t) {
				case "E": return [
					r.join("."),
					n,
					"→",
					o
				];
				case "N": return [r.join("."), o];
				case "D": return [r.join(".")];
				case "A": return [r.join(".") + "[" + i + "]", a];
				default: return [];
			}
		}
		function b(e, t, r, n) {
			var o = c(e, t);
			try {
				n ? r.groupCollapsed("diff") : r.group("diff");
			} catch (e) {
				r.log("diff");
			}
			o ? o.forEach(function(e) {
				var t = e.kind, n = v(e);
				r.log.apply(r, ["%c " + F[t].text, y(t)].concat(P(n)));
			}) : r.log("—— no diff ——");
			try {
				r.groupEnd();
			} catch (e) {
				r.log("—— diff end —— ");
			}
		}
		function m(e, t, r, n) {
			switch ("undefined" == typeof e ? "undefined" : N(e)) {
				case "object": return "function" == typeof e[n] ? e[n].apply(e, P(r)) : e[n];
				case "function": return e(t);
				default: return e;
			}
		}
		function w(e) {
			var t = e.timestamp, r = e.duration;
			return function(e, n, o) {
				var i = ["action"];
				return i.push("%c" + String(e.type)), t && i.push("%c@ " + n), r && i.push("%c(in " + o.toFixed(2) + " ms)"), i.join(" ");
			};
		}
		function x(e, t) {
			var r = t.logger, n = t.actionTransformer, o = t.titleFormatter, i = void 0 === o ? w(t) : o, a = t.collapsed, f = t.colors, u = t.level, l = t.diff, c = "undefined" == typeof t.titleFormatter;
			e.forEach(function(o, s) {
				var d = o.started, p = o.startedTime, g = o.action, h = o.prevState, y = o.error, v = o.took, w = o.nextState, x = e[s + 1];
				x && (w = x.prevState, v = x.started - d);
				var S = n(g), k = "function" == typeof a ? a(function() {
					return w;
				}, g, o) : a, j = D(p), E = f.title ? "color: " + f.title(S) + ";" : "", A = ["color: gray; font-weight: lighter;"];
				A.push(E), t.timestamp && A.push("color: gray; font-weight: lighter;"), t.duration && A.push("color: gray; font-weight: lighter;");
				var O = i(S, j, v);
				try {
					k ? f.title && c ? r.groupCollapsed.apply(r, ["%c " + O].concat(A)) : r.groupCollapsed(O) : f.title && c ? r.group.apply(r, ["%c " + O].concat(A)) : r.group(O);
				} catch (e) {
					r.log(O);
				}
				var N = m(u, S, [h], "prevState"), P = m(u, S, [S], "action"), C = m(u, S, [y, h], "error"), F = m(u, S, [w], "nextState");
				if (N) if (f.prevState) {
					var L = "color: " + f.prevState(h) + "; font-weight: bold";
					r[N]("%c prev state", L, h);
				} else r[N]("prev state", h);
				if (P) if (f.action) {
					var T = "color: " + f.action(S) + "; font-weight: bold";
					r[P]("%c action    ", T, S);
				} else r[P]("action    ", S);
				if (y && C) if (f.error) {
					var M = "color: " + f.error(y, h) + "; font-weight: bold;";
					r[C]("%c error     ", M, y);
				} else r[C]("error     ", y);
				if (F) if (f.nextState) {
					var _ = "color: " + f.nextState(w) + "; font-weight: bold";
					r[F]("%c next state", _, w);
				} else r[F]("next state", w);
				l && b(h, w, r, k);
				try {
					r.groupEnd();
				} catch (e) {
					r.log("—— log end ——");
				}
			});
		}
		function S() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = Object.assign({}, L, e), r = t.logger, n = t.stateTransformer, o = t.errorTransformer, i = t.predicate, a = t.logErrors, f = t.diffPredicate;
			if ("undefined" == typeof r) return function() {
				return function(e) {
					return function(t) {
						return e(t);
					};
				};
			};
			if (e.getState && e.dispatch) return console.error("[redux-logger] redux-logger not installed. Make sure to pass logger instance as middleware:\n// Logger with default options\nimport { logger } from 'redux-logger'\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n// Or you can create your own logger with custom options http://bit.ly/redux-logger-options\nimport createLogger from 'redux-logger'\nconst logger = createLogger({\n  // ...options\n});\nconst store = createStore(\n  reducer,\n  applyMiddleware(logger)\n)\n"), function() {
				return function(e) {
					return function(t) {
						return e(t);
					};
				};
			};
			var u = [];
			return function(e) {
				var r = e.getState;
				return function(e) {
					return function(l) {
						if ("function" == typeof i && !i(r, l)) return e(l);
						var c = {};
						u.push(c), c.started = O.now(), c.startedTime = /* @__PURE__ */ new Date(), c.prevState = n(r()), c.action = l;
						var s = void 0;
						if (a) try {
							s = e(l);
						} catch (e) {
							c.error = o(e);
						}
						else s = e(l);
						c.took = O.now() - c.started, c.nextState = n(r());
						var d = t.diff && "function" == typeof f ? f(r, l) : t.diff;
						if (x(u, Object.assign({}, t, { diff: d })), u.length = 0, c.error) throw c.error;
						return s;
					};
				};
			};
		}
		var k, j, E = function(e, t) {
			return new Array(t + 1).join(e);
		}, A = function(e, t) {
			return E("0", t - e.toString().length) + e;
		}, D = function(e) {
			return A(e.getHours(), 2) + ":" + A(e.getMinutes(), 2) + ":" + A(e.getSeconds(), 2) + "." + A(e.getMilliseconds(), 3);
		}, O = "undefined" != typeof performance && null !== performance && "function" == typeof performance.now ? performance : Date, N = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(e) {
			return typeof e;
		} : function(e) {
			return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e;
		}, P = function(e) {
			if (Array.isArray(e)) {
				for (var t = 0, r = Array(e.length); t < e.length; t++) r[t] = e[t];
				return r;
			}
			return Array.from(e);
		}, C = [];
		k = "object" === ("undefined" == typeof global ? "undefined" : N(global)) && global ? global : "undefined" != typeof window ? window : {}, j = k.DeepDiff, j && C.push(function() {
			"undefined" != typeof j && k.DeepDiff === c && (k.DeepDiff = j, j = void 0);
		}), t(n, r), t(o, r), t(i, r), t(a, r), Object.defineProperties(c, {
			diff: {
				value: c,
				enumerable: !0
			},
			observableDiff: {
				value: l,
				enumerable: !0
			},
			applyDiff: {
				value: h,
				enumerable: !0
			},
			applyChange: {
				value: d,
				enumerable: !0
			},
			revertChange: {
				value: g,
				enumerable: !0
			},
			isConflict: {
				value: function() {
					return "undefined" != typeof j;
				},
				enumerable: !0
			},
			noConflict: {
				value: function() {
					return C && (C.forEach(function(e) {
						e();
					}), C = null), c;
				},
				enumerable: !0
			}
		});
		var F = {
			E: {
				color: "#2196F3",
				text: "CHANGED:"
			},
			N: {
				color: "#4CAF50",
				text: "ADDED:"
			},
			D: {
				color: "#F44336",
				text: "DELETED:"
			},
			A: {
				color: "#2196F3",
				text: "ARRAY:"
			}
		}, L = {
			level: "log",
			logger: console,
			logErrors: !0,
			collapsed: void 0,
			predicate: void 0,
			duration: !1,
			timestamp: !0,
			stateTransformer: function(e) {
				return e;
			},
			actionTransformer: function(e) {
				return e;
			},
			errorTransformer: function(e) {
				return e;
			},
			colors: {
				title: function() {
					return "inherit";
				},
				prevState: function() {
					return "#9E9E9E";
				},
				action: function() {
					return "#03A9F4";
				},
				nextState: function() {
					return "#4CAF50";
				},
				error: function() {
					return "#F20404";
				}
			},
			diff: !1,
			diffPredicate: void 0,
			transformer: void 0
		}, T = function() {
			var e = arguments.length > 0 && void 0 !== arguments[0] ? arguments[0] : {}, t = e.dispatch, r = e.getState;
			return "function" == typeof t || "function" == typeof r ? S()({
				dispatch: t,
				getState: r
			}) : void console.error("\n[redux-logger v3] BREAKING CHANGE\n[redux-logger v3] Since 3.0.0 redux-logger exports by default logger with default settings.\n[redux-logger v3] Change\n[redux-logger v3] import createLogger from 'redux-logger'\n[redux-logger v3] to\n[redux-logger v3] import { createLogger } from 'redux-logger'\n");
		};
		e.defaults = L, e.createLogger = S, e.logger = T, e.default = T, Object.defineProperty(e, "__esModule", { value: !0 });
	});
})))();
function createStore(dependencies, preloadedState) {
	const epicMiddleware = createEpicMiddleware({ dependencies });
	const rootEpic = createRootEpic();
	const store = configureStore({
		reducer: rootReducer,
		middleware: () => new Tuple(import_redux_logger.logger, epicMiddleware),
		preloadedState
	});
	epicMiddleware.run(rootEpic);
	store.dispatch({ type: "init/start" });
	return store;
}
//#endregion
//#region ../../node_modules/.pnpm/lodash.assignin@4.2.0/node_modules/lodash.assignin/index.js
var require_lodash_assignin = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	/**
	* lodash (Custom Build) <https://lodash.com/>
	* Build: `lodash modularize exports="npm" -o ./`
	* Copyright jQuery Foundation and other contributors <https://jquery.org/>
	* Released under MIT license <https://lodash.com/license>
	* Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
	* Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
	*/
	/** Used as references for various `Number` constants. */
	var MAX_SAFE_INTEGER = 9007199254740991;
	/** `Object#toString` result references. */
	var argsTag = "[object Arguments]";
	var funcTag = "[object Function]";
	var genTag = "[object GeneratorFunction]";
	/** Used to detect unsigned integer values. */
	var reIsUint = /^(?:0|[1-9]\d*)$/;
	/**
	* A faster alternative to `Function#apply`, this function invokes `func`
	* with the `this` binding of `thisArg` and the arguments of `args`.
	*
	* @private
	* @param {Function} func The function to invoke.
	* @param {*} thisArg The `this` binding of `func`.
	* @param {Array} args The arguments to invoke `func` with.
	* @returns {*} Returns the result of `func`.
	*/
	function apply(func, thisArg, args) {
		switch (args.length) {
			case 0: return func.call(thisArg);
			case 1: return func.call(thisArg, args[0]);
			case 2: return func.call(thisArg, args[0], args[1]);
			case 3: return func.call(thisArg, args[0], args[1], args[2]);
		}
		return func.apply(thisArg, args);
	}
	/**
	* The base implementation of `_.times` without support for iteratee shorthands
	* or max array length checks.
	*
	* @private
	* @param {number} n The number of times to invoke `iteratee`.
	* @param {Function} iteratee The function invoked per iteration.
	* @returns {Array} Returns the array of results.
	*/
	function baseTimes(n, iteratee) {
		var index = -1, result = Array(n);
		while (++index < n) result[index] = iteratee(index);
		return result;
	}
	/** Used for built-in method references. */
	var objectProto = Object.prototype;
	/** Used to check objects for own properties. */
	var hasOwnProperty = objectProto.hasOwnProperty;
	/**
	* Used to resolve the
	* [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
	* of values.
	*/
	var objectToString = objectProto.toString;
	/** Built-in value references. */
	var propertyIsEnumerable = objectProto.propertyIsEnumerable;
	var nativeMax = Math.max;
	/**
	* Creates an array of the enumerable property names of the array-like `value`.
	*
	* @private
	* @param {*} value The value to query.
	* @param {boolean} inherited Specify returning inherited property names.
	* @returns {Array} Returns the array of property names.
	*/
	function arrayLikeKeys(value, inherited) {
		var result = isArray(value) || isArguments(value) ? baseTimes(value.length, String) : [];
		var length = result.length, skipIndexes = !!length;
		for (var key in value) if ((inherited || hasOwnProperty.call(value, key)) && !(skipIndexes && (key == "length" || isIndex(key, length)))) result.push(key);
		return result;
	}
	/**
	* Assigns `value` to `key` of `object` if the existing value is not equivalent
	* using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* for equality comparisons.
	*
	* @private
	* @param {Object} object The object to modify.
	* @param {string} key The key of the property to assign.
	* @param {*} value The value to assign.
	*/
	function assignValue(object, key, value) {
		var objValue = object[key];
		if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) || value === void 0 && !(key in object)) object[key] = value;
	}
	/**
	* The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function baseKeysIn(object) {
		if (!isObject(object)) return nativeKeysIn(object);
		var isProto = isPrototype(object), result = [];
		for (var key in object) if (!(key == "constructor" && (isProto || !hasOwnProperty.call(object, key)))) result.push(key);
		return result;
	}
	/**
	* The base implementation of `_.rest` which doesn't validate or coerce arguments.
	*
	* @private
	* @param {Function} func The function to apply a rest parameter to.
	* @param {number} [start=func.length-1] The start position of the rest parameter.
	* @returns {Function} Returns the new function.
	*/
	function baseRest(func, start) {
		start = nativeMax(start === void 0 ? func.length - 1 : start, 0);
		return function() {
			var args = arguments, index = -1, length = nativeMax(args.length - start, 0), array = Array(length);
			while (++index < length) array[index] = args[start + index];
			index = -1;
			var otherArgs = Array(start + 1);
			while (++index < start) otherArgs[index] = args[index];
			otherArgs[start] = array;
			return apply(func, this, otherArgs);
		};
	}
	/**
	* Copies properties of `source` to `object`.
	*
	* @private
	* @param {Object} source The object to copy properties from.
	* @param {Array} props The property identifiers to copy.
	* @param {Object} [object={}] The object to copy properties to.
	* @param {Function} [customizer] The function to customize copied values.
	* @returns {Object} Returns `object`.
	*/
	function copyObject(source, props, object, customizer) {
		object || (object = {});
		var index = -1, length = props.length;
		while (++index < length) {
			var key = props[index];
			var newValue = customizer ? customizer(object[key], source[key], key, object, source) : void 0;
			assignValue(object, key, newValue === void 0 ? source[key] : newValue);
		}
		return object;
	}
	/**
	* Creates a function like `_.assign`.
	*
	* @private
	* @param {Function} assigner The function to assign values.
	* @returns {Function} Returns the new assigner function.
	*/
	function createAssigner(assigner) {
		return baseRest(function(object, sources) {
			var index = -1, length = sources.length, customizer = length > 1 ? sources[length - 1] : void 0, guard = length > 2 ? sources[2] : void 0;
			customizer = assigner.length > 3 && typeof customizer == "function" ? (length--, customizer) : void 0;
			if (guard && isIterateeCall(sources[0], sources[1], guard)) {
				customizer = length < 3 ? void 0 : customizer;
				length = 1;
			}
			object = Object(object);
			while (++index < length) {
				var source = sources[index];
				if (source) assigner(object, source, index, customizer);
			}
			return object;
		});
	}
	/**
	* Checks if `value` is a valid array-like index.
	*
	* @private
	* @param {*} value The value to check.
	* @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
	* @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
	*/
	function isIndex(value, length) {
		length = length == null ? MAX_SAFE_INTEGER : length;
		return !!length && (typeof value == "number" || reIsUint.test(value)) && value > -1 && value % 1 == 0 && value < length;
	}
	/**
	* Checks if the given arguments are from an iteratee call.
	*
	* @private
	* @param {*} value The potential iteratee value argument.
	* @param {*} index The potential iteratee index or key argument.
	* @param {*} object The potential iteratee object argument.
	* @returns {boolean} Returns `true` if the arguments are from an iteratee call,
	*  else `false`.
	*/
	function isIterateeCall(value, index, object) {
		if (!isObject(object)) return false;
		var type = typeof index;
		if (type == "number" ? isArrayLike(object) && isIndex(index, object.length) : type == "string" && index in object) return eq(object[index], value);
		return false;
	}
	/**
	* Checks if `value` is likely a prototype object.
	*
	* @private
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
	*/
	function isPrototype(value) {
		var Ctor = value && value.constructor;
		return value === (typeof Ctor == "function" && Ctor.prototype || objectProto);
	}
	/**
	* This function is like
	* [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
	* except that it includes inherited enumerable properties.
	*
	* @private
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	*/
	function nativeKeysIn(object) {
		var result = [];
		if (object != null) for (var key in Object(object)) result.push(key);
		return result;
	}
	/**
	* Performs a
	* [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
	* comparison between two values to determine if they are equivalent.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to compare.
	* @param {*} other The other value to compare.
	* @returns {boolean} Returns `true` if the values are equivalent, else `false`.
	* @example
	*
	* var object = { 'a': 1 };
	* var other = { 'a': 1 };
	*
	* _.eq(object, object);
	* // => true
	*
	* _.eq(object, other);
	* // => false
	*
	* _.eq('a', 'a');
	* // => true
	*
	* _.eq('a', Object('a'));
	* // => false
	*
	* _.eq(NaN, NaN);
	* // => true
	*/
	function eq(value, other) {
		return value === other || value !== value && other !== other;
	}
	/**
	* Checks if `value` is likely an `arguments` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an `arguments` object,
	*  else `false`.
	* @example
	*
	* _.isArguments(function() { return arguments; }());
	* // => true
	*
	* _.isArguments([1, 2, 3]);
	* // => false
	*/
	function isArguments(value) {
		return isArrayLikeObject(value) && hasOwnProperty.call(value, "callee") && (!propertyIsEnumerable.call(value, "callee") || objectToString.call(value) == argsTag);
	}
	/**
	* Checks if `value` is classified as an `Array` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array, else `false`.
	* @example
	*
	* _.isArray([1, 2, 3]);
	* // => true
	*
	* _.isArray(document.body.children);
	* // => false
	*
	* _.isArray('abc');
	* // => false
	*
	* _.isArray(_.noop);
	* // => false
	*/
	var isArray = Array.isArray;
	/**
	* Checks if `value` is array-like. A value is considered array-like if it's
	* not a function and has a `value.length` that's an integer greater than or
	* equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is array-like, else `false`.
	* @example
	*
	* _.isArrayLike([1, 2, 3]);
	* // => true
	*
	* _.isArrayLike(document.body.children);
	* // => true
	*
	* _.isArrayLike('abc');
	* // => true
	*
	* _.isArrayLike(_.noop);
	* // => false
	*/
	function isArrayLike(value) {
		return value != null && isLength(value.length) && !isFunction(value);
	}
	/**
	* This method is like `_.isArrayLike` except that it also checks if `value`
	* is an object.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an array-like object,
	*  else `false`.
	* @example
	*
	* _.isArrayLikeObject([1, 2, 3]);
	* // => true
	*
	* _.isArrayLikeObject(document.body.children);
	* // => true
	*
	* _.isArrayLikeObject('abc');
	* // => false
	*
	* _.isArrayLikeObject(_.noop);
	* // => false
	*/
	function isArrayLikeObject(value) {
		return isObjectLike(value) && isArrayLike(value);
	}
	/**
	* Checks if `value` is classified as a `Function` object.
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a function, else `false`.
	* @example
	*
	* _.isFunction(_);
	* // => true
	*
	* _.isFunction(/abc/);
	* // => false
	*/
	function isFunction(value) {
		var tag = isObject(value) ? objectToString.call(value) : "";
		return tag == funcTag || tag == genTag;
	}
	/**
	* Checks if `value` is a valid array-like length.
	*
	* **Note:** This method is loosely based on
	* [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
	* @example
	*
	* _.isLength(3);
	* // => true
	*
	* _.isLength(Number.MIN_VALUE);
	* // => false
	*
	* _.isLength(Infinity);
	* // => false
	*
	* _.isLength('3');
	* // => false
	*/
	function isLength(value) {
		return typeof value == "number" && value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
	}
	/**
	* Checks if `value` is the
	* [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
	* of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
	*
	* @static
	* @memberOf _
	* @since 0.1.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is an object, else `false`.
	* @example
	*
	* _.isObject({});
	* // => true
	*
	* _.isObject([1, 2, 3]);
	* // => true
	*
	* _.isObject(_.noop);
	* // => true
	*
	* _.isObject(null);
	* // => false
	*/
	function isObject(value) {
		var type = typeof value;
		return !!value && (type == "object" || type == "function");
	}
	/**
	* Checks if `value` is object-like. A value is object-like if it's not `null`
	* and has a `typeof` result of "object".
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @category Lang
	* @param {*} value The value to check.
	* @returns {boolean} Returns `true` if `value` is object-like, else `false`.
	* @example
	*
	* _.isObjectLike({});
	* // => true
	*
	* _.isObjectLike([1, 2, 3]);
	* // => true
	*
	* _.isObjectLike(_.noop);
	* // => false
	*
	* _.isObjectLike(null);
	* // => false
	*/
	function isObjectLike(value) {
		return !!value && typeof value == "object";
	}
	/**
	* This method is like `_.assign` except that it iterates over own and
	* inherited source properties.
	*
	* **Note:** This method mutates `object`.
	*
	* @static
	* @memberOf _
	* @since 4.0.0
	* @alias extend
	* @category Object
	* @param {Object} object The destination object.
	* @param {...Object} [sources] The source objects.
	* @returns {Object} Returns `object`.
	* @see _.assign
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	* }
	*
	* function Bar() {
	*   this.c = 3;
	* }
	*
	* Foo.prototype.b = 2;
	* Bar.prototype.d = 4;
	*
	* _.assignIn({ 'a': 0 }, new Foo, new Bar);
	* // => { 'a': 1, 'b': 2, 'c': 3, 'd': 4 }
	*/
	var assignIn = createAssigner(function(object, source) {
		copyObject(source, keysIn(source), object);
	});
	/**
	* Creates an array of the own and inherited enumerable property names of `object`.
	*
	* **Note:** Non-object values are coerced to objects.
	*
	* @static
	* @memberOf _
	* @since 3.0.0
	* @category Object
	* @param {Object} object The object to query.
	* @returns {Array} Returns the array of property names.
	* @example
	*
	* function Foo() {
	*   this.a = 1;
	*   this.b = 2;
	* }
	*
	* Foo.prototype.c = 3;
	*
	* _.keysIn(new Foo);
	* // => ['a', 'b', 'c'] (iteration order is not guaranteed)
	*/
	function keysIn(object) {
		return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
	}
	module.exports = assignIn;
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/constants/index.js
var require_constants$1 = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.STATE_TYPE = exports.PATCH_STATE_TYPE = exports.FETCH_STATE_TYPE = exports.DISPATCH_TYPE = exports.DEFAULT_CHANNEL_NAME = void 0;
	exports.DISPATCH_TYPE = "webext.dispatch";
	exports.FETCH_STATE_TYPE = "webext.fetch_state";
	exports.STATE_TYPE = "webext.state";
	exports.PATCH_STATE_TYPE = "webext.patch_state";
	exports.DEFAULT_CHANNEL_NAME = "webext.channel";
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/serialization.js
var require_serialization = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.withSerializer = exports.withDeserializer = exports.noop = void 0;
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function ownKeys(e, r) {
		var t = Object.keys(e);
		if (Object.getOwnPropertySymbols) {
			var o = Object.getOwnPropertySymbols(e);
			r && (o = o.filter(function(r) {
				return Object.getOwnPropertyDescriptor(e, r).enumerable;
			})), t.push.apply(t, o);
		}
		return t;
	}
	function _objectSpread(e) {
		for (var r = 1; r < arguments.length; r++) {
			var t = null != arguments[r] ? arguments[r] : {};
			r % 2 ? ownKeys(Object(t), !0).forEach(function(r) {
				_defineProperty(e, r, t[r]);
			}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function(r) {
				Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r));
			});
		}
		return e;
	}
	function _defineProperty(e, r, t) {
		return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, {
			value: t,
			enumerable: !0,
			configurable: !0,
			writable: !0
		}) : e[r] = t, e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var noop = exports.noop = function noop(payload) {
		return payload;
	};
	var transformPayload = function transformPayload(message) {
		var transformer = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
		return _objectSpread(_objectSpread({}, message), message.payload ? { payload: transformer(message.payload) } : {});
	};
	var deserializeListener = function deserializeListener(listener) {
		var deserializer = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : noop;
		var shouldDeserialize = arguments.length > 2 ? arguments[2] : void 0;
		if (shouldDeserialize) return function(message) {
			for (var _len = arguments.length, args = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) args[_key - 1] = arguments[_key];
			if (shouldDeserialize.apply(void 0, [message].concat(args))) return listener.apply(void 0, [transformPayload(message, deserializer)].concat(args));
			return listener.apply(void 0, [message].concat(args));
		};
		return function(message) {
			for (var _len2 = arguments.length, args = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) args[_key2 - 1] = arguments[_key2];
			return listener.apply(void 0, [transformPayload(message, deserializer)].concat(args));
		};
	};
	exports.withDeserializer = function withDeserializer() {
		var deserializer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
		return function(addListenerFn) {
			return function(listener, shouldDeserialize) {
				return addListenerFn(deserializeListener(listener, deserializer, shouldDeserialize));
			};
		};
	};
	exports.withSerializer = function withSerializer() {
		var serializer = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : noop;
		return function(sendMessageFn) {
			var messageArgIndex = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
			return function() {
				for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) args[_key3] = arguments[_key3];
				if (args.length <= messageArgIndex) throw new Error("Message in request could not be serialized. " + "Expected message in position ".concat(messageArgIndex, " but only received ").concat(args.length, " args."));
				args[messageArgIndex] = transformPayload(args[messageArgIndex], serializer);
				return sendMessageFn.apply(void 0, args);
			};
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/strategies/constants.js
var require_constants = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.DIFF_STATUS_UPDATED = exports.DIFF_STATUS_REMOVED = exports.DIFF_STATUS_KEYS_UPDATED = exports.DIFF_STATUS_ARRAY_UPDATED = void 0;
	exports.DIFF_STATUS_UPDATED = "updated";
	exports.DIFF_STATUS_REMOVED = "removed";
	exports.DIFF_STATUS_KEYS_UPDATED = "updated_keys";
	exports.DIFF_STATUS_ARRAY_UPDATED = "updated_array";
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/strategies/shallowDiff/patch.js
var require_patch = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = _default;
	var _constants = require_constants();
	function _default(obj, difference) {
		var newObj = Object.assign({}, obj);
		difference.forEach(function(_ref) {
			var change = _ref.change, key = _ref.key, value = _ref.value;
			switch (change) {
				case _constants.DIFF_STATUS_UPDATED:
					newObj[key] = value;
					break;
				case _constants.DIFF_STATUS_REMOVED:
					Reflect.deleteProperty(newObj, key);
					break;
				default:
			}
		});
		return newObj;
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/util.js
var require_util = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.getBrowserAPI = getBrowserAPI;
	/**
	* Looks for a global browser api, first checking the chrome namespace and then
	* checking the browser namespace. If no appropriate namespace is present, this
	* function will throw an error.
	*/
	function getBrowserAPI() {
		var api;
		try {
			api = self.chrome || self.browser || browser;
		} catch (error) {
			api = browser;
		}
		if (!api) throw new Error("Browser API is not present");
		return api;
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/store/Store.js
var require_Store = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = void 0;
	var _lodash = _interopRequireDefault(require_lodash_assignin());
	var _constants = require_constants$1();
	var _serialization = require_serialization();
	var _patch = _interopRequireDefault(require_patch());
	var _util = require_util();
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { "default": e };
	}
	function _typeof(o) {
		"@babel/helpers - typeof";
		return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(o) {
			return typeof o;
		} : function(o) {
			return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o;
		}, _typeof(o);
	}
	function _classCallCheck(a, n) {
		if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function");
	}
	function _defineProperties(e, r) {
		for (var t = 0; t < r.length; t++) {
			var o = r[t];
			o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o);
		}
	}
	function _createClass(e, r, t) {
		return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e;
	}
	function _toPropertyKey(t) {
		var i = _toPrimitive(t, "string");
		return "symbol" == _typeof(i) ? i : i + "";
	}
	function _toPrimitive(t, r) {
		if ("object" != _typeof(t) || !t) return t;
		var e = t[Symbol.toPrimitive];
		if (void 0 !== e) {
			var i = e.call(t, r || "default");
			if ("object" != _typeof(i)) return i;
			throw new TypeError("@@toPrimitive must return a primitive value.");
		}
		return ("string" === r ? String : Number)(t);
	}
	var backgroundErrPrefix = "\nLooks like there is an error in the background page. You might want to inspect your background page for more details.\n";
	var defaultOpts = {
		channelName: _constants.DEFAULT_CHANNEL_NAME,
		state: {},
		serializer: _serialization.noop,
		deserializer: _serialization.noop,
		patchStrategy: _patch["default"]
	};
	exports["default"] = /* @__PURE__ */ function() {
		/**
		* Creates a new Proxy store
		* @param  {object} options
		* @param {string} options.channelName The name of the channel for this store.
		* @param {object} options.state The initial state of the store (default
		* `{}`).
		* @param {function} options.serializer A function to serialize outgoing
		* messages (default is passthrough).
		* @param {function} options.deserializer A function to deserialize incoming
		* messages (default is passthrough).
		* @param {function} options.patchStrategy A function to patch the state with
		* incoming messages. Use one of the included patching strategies or a custom
		* patching function. (default is shallow diff).
		*/
		function Store() {
			var _this = this;
			var _ref = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultOpts, _ref$channelName = _ref.channelName, channelName = _ref$channelName === void 0 ? defaultOpts.channelName : _ref$channelName, _ref$state = _ref.state, state = _ref$state === void 0 ? defaultOpts.state : _ref$state, _ref$serializer = _ref.serializer, serializer = _ref$serializer === void 0 ? defaultOpts.serializer : _ref$serializer, _ref$deserializer = _ref.deserializer, deserializer = _ref$deserializer === void 0 ? defaultOpts.deserializer : _ref$deserializer, _ref$patchStrategy = _ref.patchStrategy, patchStrategy = _ref$patchStrategy === void 0 ? defaultOpts.patchStrategy : _ref$patchStrategy;
			_classCallCheck(this, Store);
			if (!channelName) throw new Error("channelName is required in options");
			if (typeof serializer !== "function") throw new Error("serializer must be a function");
			if (typeof deserializer !== "function") throw new Error("deserializer must be a function");
			if (typeof patchStrategy !== "function") throw new Error("patchStrategy must be one of the included patching strategies or a custom patching function");
			this.channelName = channelName;
			this.readyResolved = false;
			this.readyPromise = new Promise(function(resolve) {
				return _this.readyResolve = resolve;
			});
			this.browserAPI = (0, _util.getBrowserAPI)();
			this.initializeStore = this.initializeStore.bind(this);
			this.browserAPI.runtime.sendMessage({
				type: _constants.FETCH_STATE_TYPE,
				channelName
			}, void 0, this.initializeStore);
			this.deserializer = deserializer;
			this.serializedPortListener = (0, _serialization.withDeserializer)(deserializer)(function() {
				var _this$browserAPI$runt;
				return (_this$browserAPI$runt = _this.browserAPI.runtime.onMessage).addListener.apply(_this$browserAPI$runt, arguments);
			});
			this.serializedMessageSender = (0, _serialization.withSerializer)(serializer)(function() {
				var _this$browserAPI$runt2;
				return (_this$browserAPI$runt2 = _this.browserAPI.runtime).sendMessage.apply(_this$browserAPI$runt2, arguments);
			});
			this.listeners = [];
			this.state = state;
			this.patchStrategy = patchStrategy;
			this.serializedPortListener(function(message) {
				if (!message || message.channelName !== _this.channelName) return;
				switch (message.type) {
					case _constants.STATE_TYPE:
						_this.replaceState(message.payload);
						if (!_this.readyResolved) {
							_this.readyResolved = true;
							_this.readyResolve();
						}
						break;
					case _constants.PATCH_STATE_TYPE:
						_this.patchState(message.payload);
						break;
					default:
				}
			}, function shouldDeserialize(message) {
				return Boolean(message) && typeof message.type === "string" && message.channelName === _this.channelName;
			});
			this.dispatch = this.dispatch.bind(this);
			this.getState = this.getState.bind(this);
			this.subscribe = this.subscribe.bind(this);
		}
		/**
		* Returns a promise that resolves when the store is ready. Optionally a callback may be passed in instead.
		* @param [function] callback An optional callback that may be passed in and will fire when the store is ready.
		* @return {object} promise A promise that resolves when the store has established a connection with the background page.
		*/
		return _createClass(Store, [
			{
				key: "ready",
				value: function ready() {
					var cb = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : null;
					if (cb !== null) return this.readyPromise.then(cb);
					return this.readyPromise;
				}
			},
			{
				key: "subscribe",
				value: function subscribe(listener) {
					var _this2 = this;
					this.listeners.push(listener);
					return function() {
						_this2.listeners = _this2.listeners.filter(function(l) {
							return l !== listener;
						});
					};
				}
			},
			{
				key: "patchState",
				value: function patchState(difference) {
					this.state = this.patchStrategy(this.state, difference);
					this.listeners.forEach(function(l) {
						return l();
					});
				}
			},
			{
				key: "replaceState",
				value: function replaceState(state) {
					this.state = state;
					this.listeners.forEach(function(l) {
						return l();
					});
				}
			},
			{
				key: "getState",
				value: function getState() {
					return this.state;
				}
			},
			{
				key: "replaceReducer",
				value: function replaceReducer() {}
			},
			{
				key: "dispatch",
				value: function dispatch(data) {
					var _this3 = this;
					return new Promise(function(resolve, reject) {
						_this3.serializedMessageSender({
							type: _constants.DISPATCH_TYPE,
							channelName: _this3.channelName,
							payload: data
						}, null, function(resp) {
							if (!resp) {
								var _error = _this3.browserAPI.runtime.lastError;
								var bgErr = new Error("".concat(backgroundErrPrefix).concat(_error));
								reject((0, _lodash["default"])(bgErr, _error));
								return;
							}
							var error = resp.error, value = resp.value;
							if (error) {
								var _bgErr = new Error("".concat(backgroundErrPrefix).concat(error));
								reject((0, _lodash["default"])(_bgErr, error));
							} else resolve(value && value.payload);
						});
					});
				}
			},
			{
				key: "initializeStore",
				value: function initializeStore(message) {
					if (message && message.type === _constants.FETCH_STATE_TYPE) {
						this.replaceState(message.payload);
						if (!this.readyResolved) {
							this.readyResolved = true;
							this.readyResolve();
						}
					}
				}
			}
		]);
	}();
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/store/applyMiddleware.js
var require_applyMiddleware = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = applyMiddleware;
	function _toConsumableArray(r) {
		return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread();
	}
	function _nonIterableSpread() {
		throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray(r, a);
			var t = {}.toString.call(r).slice(8, -1);
			return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
		}
	}
	function _iterableToArray(r) {
		if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r);
	}
	function _arrayWithoutHoles(r) {
		if (Array.isArray(r)) return _arrayLikeToArray(r);
	}
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	function compose() {
		for (var _len = arguments.length, funcs = new Array(_len), _key = 0; _key < _len; _key++) funcs[_key] = arguments[_key];
		if (funcs.length === 0) return function(arg) {
			return arg;
		};
		if (funcs.length === 1) return funcs[0];
		return funcs.reduce(function(a, b) {
			return function() {
				return a(b.apply(void 0, arguments));
			};
		});
	}
	function applyMiddleware(store) {
		for (var _len2 = arguments.length, middlewares = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) middlewares[_key2 - 1] = arguments[_key2];
		var _dispatch = function dispatch() {
			throw new Error("Dispatching while constructing your middleware is not allowed. Other middleware would not be applied to this dispatch.");
		};
		var middlewareAPI = {
			getState: store.getState.bind(store),
			dispatch: function dispatch() {
				return _dispatch.apply(void 0, arguments);
			}
		};
		middlewares = (middlewares || []).map(function(middleware) {
			return middleware(middlewareAPI);
		});
		_dispatch = compose.apply(void 0, _toConsumableArray(middlewares))(store.dispatch);
		store.dispatch = _dispatch;
		return store;
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/strategies/shallowDiff/diff.js
var require_diff = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = shallowDiff;
	var _constants = require_constants();
	/**
	* Returns a new Object containing only the fields in `new` that differ from `old`
	*
	* @param {Object} old
	* @param {Object} new
	* @return {Array} An array of changes. The changes have a `key`, `value`, and `change`.
	*   The change is either `updated`, which is if the value has changed or been added,
	*   or `removed`.
	*/
	function shallowDiff(oldObj, newObj) {
		var difference = [];
		Object.keys(newObj).forEach(function(key) {
			if (oldObj[key] !== newObj[key]) difference.push({
				key,
				value: newObj[key],
				change: _constants.DIFF_STATUS_UPDATED
			});
		});
		Object.keys(oldObj).forEach(function(key) {
			if (!newObj.hasOwnProperty(key)) difference.push({
				key,
				change: _constants.DIFF_STATUS_REMOVED
			});
		});
		return difference;
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/listener.js
var require_listener = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.createDeferredListener = void 0;
	exports.createDeferredListener = function createDeferredListener(filter) {
		var resolve = function resolve() {};
		var fnPromise = new Promise(function(resolve_) {
			return resolve = resolve_;
		});
		return {
			setListener: resolve,
			listener: function listener(message, sender, sendResponse) {
				if (!filter(message, sender, sendResponse)) return;
				fnPromise.then(function(fn) {
					fn(message, sender, sendResponse);
				});
				return true;
			}
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/wrap-store/wrapStore.js
var require_wrapStore = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = void 0;
	var _constants = require_constants$1();
	var _serialization = require_serialization();
	var _util = require_util();
	var _diff = _interopRequireDefault(require_diff());
	var _listener = require_listener();
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { "default": e };
	}
	function _createForOfIteratorHelper(r, e) {
		var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"];
		if (!t) {
			if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) {
				t && (r = t);
				var _n = 0, F = function F() {};
				return {
					s: F,
					n: function n() {
						return _n >= r.length ? { done: !0 } : {
							done: !1,
							value: r[_n++]
						};
					},
					e: function e(r) {
						throw r;
					},
					f: F
				};
			}
			throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
		}
		var o, a = !0, u = !1;
		return {
			s: function s() {
				t = t.call(r);
			},
			n: function n() {
				var r = t.next();
				return a = r.done, r;
			},
			e: function e(r) {
				u = !0, o = r;
			},
			f: function f() {
				try {
					a || null == t["return"] || t["return"]();
				} finally {
					if (u) throw o;
				}
			}
		};
	}
	function _unsupportedIterableToArray(r, a) {
		if (r) {
			if ("string" == typeof r) return _arrayLikeToArray(r, a);
			var t = {}.toString.call(r).slice(8, -1);
			return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0;
		}
	}
	function _arrayLikeToArray(r, a) {
		(null == a || a > r.length) && (a = r.length);
		for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e];
		return n;
	}
	var defaultOpts = {
		channelName: _constants.DEFAULT_CHANNEL_NAME,
		dispatchResponder: function promiseResponder(dispatchResult, send) {
			Promise.resolve(dispatchResult).then(function(res) {
				send({
					error: null,
					value: res
				});
			})["catch"](function(err) {
				console.error("error dispatching result:", err);
				send({
					error: err.message,
					value: null
				});
			});
		},
		serializer: _serialization.noop,
		deserializer: _serialization.noop,
		diffStrategy: _diff["default"]
	};
	exports["default"] = function _default() {
		var _ref$channelName = (arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : defaultOpts).channelName, channelName = _ref$channelName === void 0 ? defaultOpts.channelName : _ref$channelName;
		var browserAPI = (0, _util.getBrowserAPI)();
		var filterStateMessages = function filterStateMessages(message) {
			return message.type === _constants.FETCH_STATE_TYPE && message.channelName === channelName;
		};
		var filterActionMessages = function filterActionMessages(message) {
			return message.type === _constants.DISPATCH_TYPE && message.channelName === channelName;
		};
		var stateProviderListener = (0, _listener.createDeferredListener)(filterStateMessages);
		var actionListener = (0, _listener.createDeferredListener)(filterActionMessages);
		browserAPI.runtime.onMessage.addListener(stateProviderListener.listener);
		browserAPI.runtime.onMessage.addListener(actionListener.listener);
		return function(store) {
			var _ref2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : defaultOpts, _ref2$dispatchRespond = _ref2.dispatchResponder, dispatchResponder = _ref2$dispatchRespond === void 0 ? defaultOpts.dispatchResponder : _ref2$dispatchRespond, _ref2$serializer = _ref2.serializer, serializer = _ref2$serializer === void 0 ? defaultOpts.serializer : _ref2$serializer, _ref2$deserializer = _ref2.deserializer, deserializer = _ref2$deserializer === void 0 ? defaultOpts.deserializer : _ref2$deserializer, _ref2$diffStrategy = _ref2.diffStrategy, diffStrategy = _ref2$diffStrategy === void 0 ? defaultOpts.diffStrategy : _ref2$diffStrategy;
			if (typeof serializer !== "function") throw new Error("serializer must be a function");
			if (typeof deserializer !== "function") throw new Error("deserializer must be a function");
			if (typeof diffStrategy !== "function") throw new Error("diffStrategy must be one of the included diffing strategies or a custom diff function");
			/**
			* Respond to dispatches from UI components
			*/
			var dispatchResponse = function dispatchResponse(request, sender, sendResponse) {
				var action = Object.assign({}, request.payload, { _sender: sender });
				var dispatchResult = null;
				try {
					dispatchResult = store.dispatch(action);
				} catch (e) {
					dispatchResult = Promise.reject(e.message);
					console.error(e);
				}
				dispatchResponder(dispatchResult, sendResponse);
			};
			/**
			* Setup for state updates
			*/
			var serializedMessagePoster = (0, _serialization.withSerializer)(serializer)(function() {
				var _browserAPI$runtime;
				for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) args[_key] = arguments[_key];
				var onErrorCallback = function onErrorCallback() {
					if (browserAPI.runtime.lastError) {}
				};
				(_browserAPI$runtime = browserAPI.runtime).sendMessage.apply(_browserAPI$runtime, args.concat([onErrorCallback]));
				return browserAPI.tabs.query({}, function(tabs) {
					var _iterator = _createForOfIteratorHelper(tabs), _step;
					try {
						for (_iterator.s(); !(_step = _iterator.n()).done;) {
							var _browserAPI$tabs;
							var tab = _step.value;
							(_browserAPI$tabs = browserAPI.tabs).sendMessage.apply(_browserAPI$tabs, [tab.id].concat(args, [onErrorCallback]));
						}
					} catch (err) {
						_iterator.e(err);
					} finally {
						_iterator.f();
					}
				});
			});
			var currentState = store.getState();
			store.subscribe(function patchState() {
				var newState = store.getState();
				var diff = diffStrategy(currentState, newState);
				if (diff.length) {
					currentState = newState;
					serializedMessagePoster({
						type: _constants.PATCH_STATE_TYPE,
						payload: diff,
						channelName
					});
				}
			});
			serializedMessagePoster({
				type: _constants.STATE_TYPE,
				payload: currentState,
				channelName
			});
			/**
			* State provider for content-script initialization
			*/
			stateProviderListener.setListener(function(request, sender, sendResponse) {
				var state = store.getState();
				sendResponse({
					type: _constants.FETCH_STATE_TYPE,
					payload: state
				});
			});
			(0, _serialization.withDeserializer)(deserializer)(actionListener.setListener)(dispatchResponse, filterActionMessages);
		};
	};
}));
//#endregion
//#region ../../node_modules/.pnpm/webext-redux@4.0.0_redux@5.0.1/node_modules/webext-redux/lib/alias/alias.js
var require_alias = /* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	exports["default"] = void 0;
	exports["default"] = function _default(aliases) {
		return function() {
			return function(next) {
				return function(action) {
					var alias = aliases[action.type];
					if (alias) return next(alias(action));
					return next(action);
				};
			};
		};
	};
}));
//#endregion
//#region src/config.ts
var import_lib = (/* @__PURE__ */ __commonJSMin(((exports) => {
	Object.defineProperty(exports, "__esModule", { value: true });
	Object.defineProperty(exports, "Store", {
		enumerable: true,
		get: function get() {
			return _Store["default"];
		}
	});
	Object.defineProperty(exports, "alias", {
		enumerable: true,
		get: function get() {
			return _alias["default"];
		}
	});
	Object.defineProperty(exports, "applyMiddleware", {
		enumerable: true,
		get: function get() {
			return _applyMiddleware["default"];
		}
	});
	Object.defineProperty(exports, "createWrapStore", {
		enumerable: true,
		get: function get() {
			return _wrapStore["default"];
		}
	});
	var _Store = _interopRequireDefault(require_Store());
	var _applyMiddleware = _interopRequireDefault(require_applyMiddleware());
	var _wrapStore = _interopRequireDefault(require_wrapStore());
	var _alias = _interopRequireDefault(require_alias());
	function _interopRequireDefault(e) {
		return e && e.__esModule ? e : { "default": e };
	}
})))();
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
function isBlocklistDisabled() {
	return false;
}
//#endregion
//#region src/blocklist.ts
var BLOCKED_DOMAINS = ["tiktok.com", "douyin.com"];
function isBlocked(url) {
	if (isBlocklistDisabled()) return false;
	try {
		const hostname = new URL(url).hostname.toLowerCase();
		return BLOCKED_DOMAINS.some((domain) => {
			return hostname === domain || hostname.endsWith("." + domain);
		});
	} catch (e) {
		return false;
	}
}
//#endregion
//#region src/listeners/addPlaylistListener.ts
function addPlaylistListener(store) {
	import_browser_polyfill.webRequest.onCompleted.addListener(async (details) => {
		if (details.tabId < 0) return;
		if (details.initiator && isBlocked(details.initiator)) return;
		const contentType = (details.responseHeaders?.find((h) => h.name.toLowerCase() === "content-type"))?.value?.toLowerCase() || "";
		if (!contentType.includes("application/vnd.apple.mpegurl") && !contentType.includes("application/x-mpegurl")) return;
		if (details.statusCode && (details.statusCode < 200 || details.statusCode >= 300)) return;
		if (!!store.getState().playlists.playlists[details.url]) return;
		const tab = await import_browser_polyfill.tabs.get(details.tabId);
		store.dispatch(playlistsSlice.actions.addPlaylist({
			id: details.url,
			uri: details.url,
			initiator: tab.url,
			pageTitle: tab.title,
			tabId: details.tabId,
			createdAt: Date.now()
		}));
		const unsubscribe = store.subscribe(() => {
			const status = store.getState().playlists.playlistsStatus[details.url]?.status;
			if (status === "ready") {
				(import_browser_polyfill.browserAction || import_browser_polyfill.action).setIcon({
					tabId: tab.id,
					path: {
						"16": "assets/icons/16-new.png",
						"48": "assets/icons/48-new.png",
						"128": "assets/icons/128-new.png",
						"256": "assets/icons/256-new.png"
					}
				});
				unsubscribe();
			} else if (status === "error") unsubscribe();
		});
	}, {
		types: ["xmlhttprequest"],
		urls: [
			"http://*/*.m3u8",
			"https://*/*.m3u8",
			"http://*/*.m3u8?*",
			"https://*/*.m3u8?*"
		]
	}, ["responseHeaders"]);
}
//#endregion
//#region src/listeners/setTabListener.ts
function setTabListener(store) {
	import_browser_polyfill.tabs.onActivated.addListener(async (details) => {
		store.dispatch(tabsSlice.actions.setTab({ tab: { id: details.tabId } }));
	});
}
//#endregion
//#region src/listeners/setPlaylistTitleListener.ts
function setPlaylistTitleListener(store) {
	import_browser_polyfill.tabs.onUpdated.addListener((tabId, changeInfo) => {
		const pageTitle = changeInfo.title?.trim();
		if (!pageTitle) return;
		store.dispatch(playlistsSlice.actions.setPlaylistTitle({
			tabId,
			pageTitle
		}));
	});
}
//#endregion
//#region src/listeners/index.ts
function subscribeListeners(store) {
	setTabListener(store);
	setPlaylistTitleListener(store);
	addPlaylistListener(store);
}
//#endregion
//#region src/persistState.ts
async function saveState(state) {
	if (!state) return;
	await import_browser_polyfill.storage.local.set({ state });
}
async function getState() {
	const state = (await import_browser_polyfill.storage.local.get(["state"])).state;
	if (!state || !state.config) return;
	const maxActiveDownloads = state.config.maxActiveDownloads ?? initialConfigState$1.maxActiveDownloads;
	const preferredAudioLanguage = state.config.preferredAudioLanguage ?? state.config.preferredAudioLanguages?.[0] ?? state.config.preferredAudioLanguages;
	const persistedState = { config: preferredAudioLanguage === void 0 ? {
		...initialConfigState$1,
		...state.config,
		maxActiveDownloads
	} : {
		...initialConfigState$1,
		...state.config,
		maxActiveDownloads,
		preferredAudioLanguage: typeof preferredAudioLanguage === "string" ? preferredAudioLanguage : null
	} };
	if (state.playlistPreferences) persistedState.playlistPreferences = state.playlistPreferences;
	return persistedState;
}
//#endregion
//#region src/services/crypto-decryptor.ts
async function decrypt(data, keyData, iv) {
	const decryptIv = new Uint8Array(iv.byteLength);
	decryptIv.set(iv);
	const rawKey = await crypto.subtle.importKey("raw", keyData, "aes-cbc", false, ["decrypt"]);
	return await crypto.subtle.decrypt({
		name: "aes-cbc",
		iv: decryptIv
	}, rawKey, data);
}
var CryptoDecryptor = { decrypt };
//#endregion
//#region src/services/fetch-loader.ts
var HttpError = class extends Error {
	constructor(status) {
		super(`HTTP ${status}`);
		this.status = status;
		this.name = "HttpError";
	}
};
function isHttpError(error) {
	return typeof error?.status === "number";
}
async function fetchWithRetry(fetchFn, attempts = 1) {
	if (attempts < 1) throw new Error("Attempts less then 1");
	let countdown = attempts;
	let retryTime = 100;
	let lastError;
	while (countdown--) try {
		return await fetchFn();
	} catch (e) {
		lastError = e;
		if (isHttpError(e)) throw e;
		if (countdown > 0) {
			await new Promise((resolve) => setTimeout(resolve, retryTime));
			retryTime = Math.min(retryTime * 1.15, 3e3);
		}
	}
	if (lastError instanceof Error) throw lastError;
	throw new Error("Fetch error");
}
async function fetchText(url, attempts = 1) {
	const fetchFn = () => {
		const controller = new AbortController();
		const timer = setTimeout(() => controller.abort(), 2e4);
		return fetch(url, { signal: controller.signal }).then((res) => {
			if (!res.ok) throw new HttpError(res.status);
			return res.text();
		}).finally(() => clearTimeout(timer));
	};
	return fetchWithRetry(fetchFn, attempts);
}
async function fetchArrayBuffer(url, attempts = 1, byteRange) {
	const fetchFn = () => {
		return (byteRange ? fetch(url, { headers: { Range: `bytes=${byteRange.offset}-${byteRange.offset + byteRange.length - 1}` } }) : fetch(url)).then(async (res) => {
			if (!res.ok) throw new HttpError(res.status);
			const buffer = await res.arrayBuffer();
			if (byteRange && res.status !== 206 && buffer.byteLength !== byteRange.length) return buffer.slice(byteRange.offset, byteRange.offset + byteRange.length);
			return buffer;
		});
	};
	return fetchWithRetry(fetchFn, attempts);
}
var FetchLoader = {
	fetchText,
	fetchArrayBuffer
};
//#endregion
//#region ../../node_modules/.pnpm/@videojs+vhs-utils@4.1.2/node_modules/@videojs/vhs-utils/es/stream.js
/**
* @file stream.js
*/
/**
* A lightweight readable stream implemention that handles event dispatching.
*
* @class Stream
*/
var Stream = /*#__PURE__*/ function() {
	function Stream() {
		this.listeners = {};
	}
	/**
	* Add a listener for a specified event type.
	*
	* @param {string} type the event name
	* @param {Function} listener the callback to be invoked when an event of
	* the specified type occurs
	*/
	var _proto = Stream.prototype;
	_proto.on = function on(type, listener) {
		if (!this.listeners[type]) this.listeners[type] = [];
		this.listeners[type].push(listener);
	};
	_proto.off = function off(type, listener) {
		if (!this.listeners[type]) return false;
		var index = this.listeners[type].indexOf(listener);
		this.listeners[type] = this.listeners[type].slice(0);
		this.listeners[type].splice(index, 1);
		return index > -1;
	};
	_proto.trigger = function trigger(type) {
		var callbacks = this.listeners[type];
		if (!callbacks) return;
		if (arguments.length === 2) {
			var length = callbacks.length;
			for (var i = 0; i < length; ++i) callbacks[i].call(this, arguments[1]);
		} else {
			var args = Array.prototype.slice.call(arguments, 1);
			var _length = callbacks.length;
			for (var _i = 0; _i < _length; ++_i) callbacks[_i].apply(this, args);
		}
	};
	_proto.dispose = function dispose() {
		this.listeners = {};
	};
	_proto.pipe = function pipe(destination) {
		this.on("data", function(data) {
			destination.push(data);
		});
	};
	return Stream;
}();
//#endregion
//#region ../../node_modules/.pnpm/@babel+runtime@7.29.7/node_modules/@babel/runtime/helpers/esm/extends.js
function _extends() {
	return _extends = Object.assign ? Object.assign.bind() : function(n) {
		for (var e = 1; e < arguments.length; e++) {
			var t = arguments[e];
			for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]);
		}
		return n;
	}, _extends.apply(null, arguments);
}
//#endregion
//#region ../../node_modules/.pnpm/@videojs+vhs-utils@4.1.2/node_modules/@videojs/vhs-utils/es/decode-b64-to-uint8-array.js
var import_window = /* @__PURE__ */ __toESM((/* @__PURE__ */ __commonJSMin(((exports, module) => {
	var win;
	if (typeof window !== "undefined") win = window;
	else if (typeof global !== "undefined") win = global;
	else if (typeof self !== "undefined") win = self;
	else win = {};
	module.exports = win;
})))());
var atob = function atob(s) {
	return import_window.default.atob ? import_window.default.atob(s) : Buffer.from(s, "base64").toString("binary");
};
function decodeB64ToUint8Array(b64Text) {
	var decodedString = atob(b64Text);
	var array = new Uint8Array(decodedString.length);
	for (var i = 0; i < decodedString.length; i++) array[i] = decodedString.charCodeAt(i);
	return array;
}
//#endregion
//#region ../../node_modules/.pnpm/m3u8-parser@7.2.0/node_modules/m3u8-parser/dist/m3u8-parser.es.js
/*! @name m3u8-parser @version 7.2.0 @license Apache-2.0 */
/**
* @file m3u8/line-stream.js
*/
/**
* A stream that buffers string input and generates a `data` event for each
* line.
*
* @class LineStream
* @extends Stream
*/
var LineStream = class extends Stream {
	constructor() {
		super();
		this.buffer = "";
	}
	/**
	* Add new data to be parsed.
	*
	* @param {string} data the text to process
	*/
	push(data) {
		let nextNewline;
		this.buffer += data;
		nextNewline = this.buffer.indexOf("\n");
		for (; nextNewline > -1; nextNewline = this.buffer.indexOf("\n")) {
			this.trigger("data", this.buffer.substring(0, nextNewline));
			this.buffer = this.buffer.substring(nextNewline + 1);
		}
	}
};
var TAB = String.fromCharCode(9);
var parseByterange = function(byterangeString) {
	const match = /([0-9.]*)?@?([0-9.]*)?/.exec(byterangeString || "");
	const result = {};
	if (match[1]) result.length = parseInt(match[1], 10);
	if (match[2]) result.offset = parseInt(match[2], 10);
	return result;
};
/**
* "forgiving" attribute list psuedo-grammar:
* attributes -> keyvalue (',' keyvalue)*
* keyvalue   -> key '=' value
* key        -> [^=]*
* value      -> '"' [^"]* '"' | [^,]*
*/
var attributeSeparator = function() {
	return /* @__PURE__ */ new RegExp("(?:^|,)((?:[^=]*)=(?:\"[^\"]*\"|[^,]*))");
};
/**
* Parse attributes from a line given the separator
*
* @param {string} attributes the attribute line to parse
*/
var parseAttributes = function(attributes) {
	const result = {};
	if (!attributes) return result;
	const attrs = attributes.split(attributeSeparator());
	let i = attrs.length;
	let attr;
	while (i--) {
		if (attrs[i] === "") continue;
		attr = /([^=]*)=(.*)/.exec(attrs[i]).slice(1);
		attr[0] = attr[0].replace(/^\s+|\s+$/g, "");
		attr[1] = attr[1].replace(/^\s+|\s+$/g, "");
		attr[1] = attr[1].replace(/^['"](.*)['"]$/g, "$1");
		result[attr[0]] = attr[1];
	}
	return result;
};
/**
* Converts a string into a resolution object
*
* @param {string} resolution a string such as 3840x2160
*
* @return {Object} An object representing the resolution
*
*/
var parseResolution = (resolution) => {
	const split = resolution.split("x");
	const result = {};
	if (split[0]) result.width = parseInt(split[0], 10);
	if (split[1]) result.height = parseInt(split[1], 10);
	return result;
};
/**
* A line-level M3U8 parser event stream. It expects to receive input one
* line at a time and performs a context-free parse of its contents. A stream
* interpretation of a manifest can be useful if the manifest is expected to
* be too large to fit comfortably into memory or the entirety of the input
* is not immediately available. Otherwise, it's probably much easier to work
* with a regular `Parser` object.
*
* Produces `data` events with an object that captures the parser's
* interpretation of the input. That object has a property `tag` that is one
* of `uri`, `comment`, or `tag`. URIs only have a single additional
* property, `line`, which captures the entirety of the input without
* interpretation. Comments similarly have a single additional property
* `text` which is the input without the leading `#`.
*
* Tags always have a property `tagType` which is the lower-cased version of
* the M3U8 directive without the `#EXT` or `#EXT-X-` prefix. For instance,
* `#EXT-X-MEDIA-SEQUENCE` becomes `media-sequence` when parsed. Unrecognized
* tags are given the tag type `unknown` and a single additional property
* `data` with the remainder of the input.
*
* @class ParseStream
* @extends Stream
*/
var ParseStream = class extends Stream {
	constructor() {
		super();
		this.customParsers = [];
		this.tagMappers = [];
	}
	/**
	* Parses an additional line of input.
	*
	* @param {string} line a single line of an M3U8 file to parse
	*/
	push(line) {
		let match;
		let event;
		line = line.trim();
		if (line.length === 0) return;
		if (line[0] !== "#") {
			this.trigger("data", {
				type: "uri",
				uri: line
			});
			return;
		}
		this.tagMappers.reduce((acc, mapper) => {
			const mappedLine = mapper(line);
			if (mappedLine === line) return acc;
			return acc.concat([mappedLine]);
		}, [line]).forEach((newLine) => {
			for (let i = 0; i < this.customParsers.length; i++) if (this.customParsers[i].call(this, newLine)) return;
			if (newLine.indexOf("#EXT") !== 0) {
				this.trigger("data", {
					type: "comment",
					text: newLine.slice(1)
				});
				return;
			}
			newLine = newLine.replace("\r", "");
			match = /^#EXTM3U/.exec(newLine);
			if (match) {
				this.trigger("data", {
					type: "tag",
					tagType: "m3u"
				});
				return;
			}
			match = /^#EXTINF:([0-9\.]*)?,?(.*)?$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "inf"
				};
				if (match[1]) event.duration = parseFloat(match[1]);
				if (match[2]) event.title = match[2];
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-TARGETDURATION:([0-9.]*)?/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "targetduration"
				};
				if (match[1]) event.duration = parseInt(match[1], 10);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-VERSION:([0-9.]*)?/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "version"
				};
				if (match[1]) event.version = parseInt(match[1], 10);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-MEDIA-SEQUENCE:(\-?[0-9.]*)?/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "media-sequence"
				};
				if (match[1]) event.number = parseInt(match[1], 10);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-DISCONTINUITY-SEQUENCE:(\-?[0-9.]*)?/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "discontinuity-sequence"
				};
				if (match[1]) event.number = parseInt(match[1], 10);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-PLAYLIST-TYPE:(.*)?$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "playlist-type"
				};
				if (match[1]) event.playlistType = match[1];
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-BYTERANGE:(.*)?$/.exec(newLine);
			if (match) {
				event = _extends(parseByterange(match[1]), {
					type: "tag",
					tagType: "byterange"
				});
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-ALLOW-CACHE:(YES|NO)?/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "allow-cache"
				};
				if (match[1]) event.allowed = !/NO/.test(match[1]);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-MAP:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "map"
				};
				if (match[1]) {
					const attributes = parseAttributes(match[1]);
					if (attributes.URI) event.uri = attributes.URI;
					if (attributes.BYTERANGE) event.byterange = parseByterange(attributes.BYTERANGE);
				}
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-STREAM-INF:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "stream-inf"
				};
				if (match[1]) {
					event.attributes = parseAttributes(match[1]);
					if (event.attributes.RESOLUTION) event.attributes.RESOLUTION = parseResolution(event.attributes.RESOLUTION);
					if (event.attributes.BANDWIDTH) event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
					if (event.attributes["FRAME-RATE"]) event.attributes["FRAME-RATE"] = parseFloat(event.attributes["FRAME-RATE"]);
					if (event.attributes["PROGRAM-ID"]) event.attributes["PROGRAM-ID"] = parseInt(event.attributes["PROGRAM-ID"], 10);
				}
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-MEDIA:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "media"
				};
				if (match[1]) event.attributes = parseAttributes(match[1]);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-ENDLIST/.exec(newLine);
			if (match) {
				this.trigger("data", {
					type: "tag",
					tagType: "endlist"
				});
				return;
			}
			match = /^#EXT-X-DISCONTINUITY/.exec(newLine);
			if (match) {
				this.trigger("data", {
					type: "tag",
					tagType: "discontinuity"
				});
				return;
			}
			match = /^#EXT-X-PROGRAM-DATE-TIME:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "program-date-time"
				};
				if (match[1]) {
					event.dateTimeString = match[1];
					event.dateTimeObject = new Date(match[1]);
				}
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-KEY:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "key"
				};
				if (match[1]) {
					event.attributes = parseAttributes(match[1]);
					if (event.attributes.IV) {
						if (event.attributes.IV.substring(0, 2).toLowerCase() === "0x") event.attributes.IV = event.attributes.IV.substring(2);
						event.attributes.IV = event.attributes.IV.match(/.{8}/g);
						event.attributes.IV[0] = parseInt(event.attributes.IV[0], 16);
						event.attributes.IV[1] = parseInt(event.attributes.IV[1], 16);
						event.attributes.IV[2] = parseInt(event.attributes.IV[2], 16);
						event.attributes.IV[3] = parseInt(event.attributes.IV[3], 16);
						event.attributes.IV = new Uint32Array(event.attributes.IV);
					}
				}
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-START:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "start"
				};
				if (match[1]) {
					event.attributes = parseAttributes(match[1]);
					event.attributes["TIME-OFFSET"] = parseFloat(event.attributes["TIME-OFFSET"]);
					event.attributes.PRECISE = /YES/.test(event.attributes.PRECISE);
				}
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-CUE-OUT-CONT:(.*)?$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "cue-out-cont"
				};
				if (match[1]) event.data = match[1];
				else event.data = "";
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-CUE-OUT:(.*)?$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "cue-out"
				};
				if (match[1]) event.data = match[1];
				else event.data = "";
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-CUE-IN:?(.*)?$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "cue-in"
				};
				if (match[1]) event.data = match[1];
				else event.data = "";
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-SKIP:(.*)$/.exec(newLine);
			if (match && match[1]) {
				event = {
					type: "tag",
					tagType: "skip"
				};
				event.attributes = parseAttributes(match[1]);
				if (event.attributes.hasOwnProperty("SKIPPED-SEGMENTS")) event.attributes["SKIPPED-SEGMENTS"] = parseInt(event.attributes["SKIPPED-SEGMENTS"], 10);
				if (event.attributes.hasOwnProperty("RECENTLY-REMOVED-DATERANGES")) event.attributes["RECENTLY-REMOVED-DATERANGES"] = event.attributes["RECENTLY-REMOVED-DATERANGES"].split(TAB);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-PART:(.*)$/.exec(newLine);
			if (match && match[1]) {
				event = {
					type: "tag",
					tagType: "part"
				};
				event.attributes = parseAttributes(match[1]);
				["DURATION"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = parseFloat(event.attributes[key]);
				});
				["INDEPENDENT", "GAP"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = /YES/.test(event.attributes[key]);
				});
				if (event.attributes.hasOwnProperty("BYTERANGE")) event.attributes.byterange = parseByterange(event.attributes.BYTERANGE);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-SERVER-CONTROL:(.*)$/.exec(newLine);
			if (match && match[1]) {
				event = {
					type: "tag",
					tagType: "server-control"
				};
				event.attributes = parseAttributes(match[1]);
				[
					"CAN-SKIP-UNTIL",
					"PART-HOLD-BACK",
					"HOLD-BACK"
				].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = parseFloat(event.attributes[key]);
				});
				["CAN-SKIP-DATERANGES", "CAN-BLOCK-RELOAD"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = /YES/.test(event.attributes[key]);
				});
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-PART-INF:(.*)$/.exec(newLine);
			if (match && match[1]) {
				event = {
					type: "tag",
					tagType: "part-inf"
				};
				event.attributes = parseAttributes(match[1]);
				["PART-TARGET"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = parseFloat(event.attributes[key]);
				});
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-PRELOAD-HINT:(.*)$/.exec(newLine);
			if (match && match[1]) {
				event = {
					type: "tag",
					tagType: "preload-hint"
				};
				event.attributes = parseAttributes(match[1]);
				["BYTERANGE-START", "BYTERANGE-LENGTH"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) {
						event.attributes[key] = parseInt(event.attributes[key], 10);
						const subkey = key === "BYTERANGE-LENGTH" ? "length" : "offset";
						event.attributes.byterange = event.attributes.byterange || {};
						event.attributes.byterange[subkey] = event.attributes[key];
						delete event.attributes[key];
					}
				});
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-RENDITION-REPORT:(.*)$/.exec(newLine);
			if (match && match[1]) {
				event = {
					type: "tag",
					tagType: "rendition-report"
				};
				event.attributes = parseAttributes(match[1]);
				["LAST-MSN", "LAST-PART"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = parseInt(event.attributes[key], 10);
				});
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-DATERANGE:(.*)$/.exec(newLine);
			if (match && match[1]) {
				event = {
					type: "tag",
					tagType: "daterange"
				};
				event.attributes = parseAttributes(match[1]);
				["ID", "CLASS"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = String(event.attributes[key]);
				});
				["START-DATE", "END-DATE"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = new Date(event.attributes[key]);
				});
				["DURATION", "PLANNED-DURATION"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = parseFloat(event.attributes[key]);
				});
				["END-ON-NEXT"].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = /YES/i.test(event.attributes[key]);
				});
				[
					"SCTE35-CMD",
					" SCTE35-OUT",
					"SCTE35-IN"
				].forEach(function(key) {
					if (event.attributes.hasOwnProperty(key)) event.attributes[key] = event.attributes[key].toString(16);
				});
				const clientAttributePattern = /^X-([A-Z]+-)+[A-Z]+$/;
				for (const key in event.attributes) {
					if (!clientAttributePattern.test(key)) continue;
					const isHexaDecimal = /[0-9A-Fa-f]{6}/g.test(event.attributes[key]);
					const isDecimalFloating = /^\d+(\.\d+)?$/.test(event.attributes[key]);
					event.attributes[key] = isHexaDecimal ? event.attributes[key].toString(16) : isDecimalFloating ? parseFloat(event.attributes[key]) : String(event.attributes[key]);
				}
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-INDEPENDENT-SEGMENTS/.exec(newLine);
			if (match) {
				this.trigger("data", {
					type: "tag",
					tagType: "independent-segments"
				});
				return;
			}
			match = /^#EXT-X-I-FRAMES-ONLY/.exec(newLine);
			if (match) {
				this.trigger("data", {
					type: "tag",
					tagType: "i-frames-only"
				});
				return;
			}
			match = /^#EXT-X-CONTENT-STEERING:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "content-steering"
				};
				event.attributes = parseAttributes(match[1]);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-I-FRAME-STREAM-INF:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "i-frame-playlist"
				};
				event.attributes = parseAttributes(match[1]);
				if (event.attributes.URI) event.uri = event.attributes.URI;
				if (event.attributes.BANDWIDTH) event.attributes.BANDWIDTH = parseInt(event.attributes.BANDWIDTH, 10);
				if (event.attributes.RESOLUTION) event.attributes.RESOLUTION = parseResolution(event.attributes.RESOLUTION);
				if (event.attributes["AVERAGE-BANDWIDTH"]) event.attributes["AVERAGE-BANDWIDTH"] = parseInt(event.attributes["AVERAGE-BANDWIDTH"], 10);
				if (event.attributes["FRAME-RATE"]) event.attributes["FRAME-RATE"] = parseFloat(event.attributes["FRAME-RATE"]);
				this.trigger("data", event);
				return;
			}
			match = /^#EXT-X-DEFINE:(.*)$/.exec(newLine);
			if (match) {
				event = {
					type: "tag",
					tagType: "define"
				};
				event.attributes = parseAttributes(match[1]);
				this.trigger("data", event);
				return;
			}
			this.trigger("data", {
				type: "tag",
				data: newLine.slice(4)
			});
		});
	}
	/**
	* Add a parser for custom headers
	*
	* @param {Object}   options              a map of options for the added parser
	* @param {RegExp}   options.expression   a regular expression to match the custom header
	* @param {string}   options.customType   the custom type to register to the output
	* @param {Function} [options.dataParser] function to parse the line into an object
	* @param {boolean}  [options.segment]    should tag data be attached to the segment object
	*/
	addParser({ expression, customType, dataParser, segment }) {
		if (typeof dataParser !== "function") dataParser = (line) => line;
		this.customParsers.push((line) => {
			if (expression.exec(line)) {
				this.trigger("data", {
					type: "custom",
					data: dataParser(line),
					customType,
					segment
				});
				return true;
			}
		});
	}
	/**
	* Add a custom header mapper
	*
	* @param {Object}   options
	* @param {RegExp}   options.expression   a regular expression to match the custom header
	* @param {Function} options.map          function to translate tag into a different tag
	*/
	addTagMapper({ expression, map }) {
		const mapFn = (line) => {
			if (expression.test(line)) return map(line);
			return line;
		};
		this.tagMappers.push(mapFn);
	}
};
var camelCase = (str) => str.toLowerCase().replace(/-(\w)/g, (a) => a[1].toUpperCase());
var camelCaseKeys = function(attributes) {
	const result = {};
	Object.keys(attributes).forEach(function(key) {
		result[camelCase(key)] = attributes[key];
	});
	return result;
};
var setHoldBack = function(manifest) {
	const { serverControl, targetDuration, partTargetDuration } = manifest;
	if (!serverControl) return;
	const tag = "#EXT-X-SERVER-CONTROL";
	const hb = "holdBack";
	const phb = "partHoldBack";
	const minTargetDuration = targetDuration && targetDuration * 3;
	const minPartDuration = partTargetDuration && partTargetDuration * 2;
	if (targetDuration && !serverControl.hasOwnProperty(hb)) {
		serverControl[hb] = minTargetDuration;
		this.trigger("info", { message: `${tag} defaulting HOLD-BACK to targetDuration * 3 (${minTargetDuration}).` });
	}
	if (minTargetDuration && serverControl[hb] < minTargetDuration) {
		this.trigger("warn", { message: `${tag} clamping HOLD-BACK (${serverControl[hb]}) to targetDuration * 3 (${minTargetDuration})` });
		serverControl[hb] = minTargetDuration;
	}
	if (partTargetDuration && !serverControl.hasOwnProperty(phb)) {
		serverControl[phb] = partTargetDuration * 3;
		this.trigger("info", { message: `${tag} defaulting PART-HOLD-BACK to partTargetDuration * 3 (${serverControl[phb]}).` });
	}
	if (partTargetDuration && serverControl[phb] < minPartDuration) {
		this.trigger("warn", { message: `${tag} clamping PART-HOLD-BACK (${serverControl[phb]}) to partTargetDuration * 2 (${minPartDuration}).` });
		serverControl[phb] = minPartDuration;
	}
};
/**
* A parser for M3U8 files. The current interpretation of the input is
* exposed as a property `manifest` on parser objects. It's just two lines to
* create and parse a manifest once you have the contents available as a string:
*
* ```js
* var parser = new m3u8.Parser();
* parser.push(xhr.responseText);
* ```
*
* New input can later be applied to update the manifest object by calling
* `push` again.
*
* The parser attempts to create a usable manifest object even if the
* underlying input is somewhat nonsensical. It emits `info` and `warning`
* events during the parse if it encounters input that seems invalid or
* requires some property of the manifest object to be defaulted.
*
* @class Parser
* @param {Object} [opts] Options for the constructor, needed for substitutions
* @param {string} [opts.uri] URL to check for query params
* @param {Object} [opts.mainDefinitions] Definitions on main playlist that can be imported
* @extends Stream
*/
var Parser = class extends Stream {
	constructor(opts = {}) {
		super();
		this.lineStream = new LineStream();
		this.parseStream = new ParseStream();
		this.lineStream.pipe(this.parseStream);
		this.mainDefinitions = opts.mainDefinitions || {};
		this.params = new URL(opts.uri, "https://a.com").searchParams;
		this.lastProgramDateTime = null;
		const self = this;
		const uris = [];
		let currentUri = {};
		let currentMap;
		let key;
		let hasParts = false;
		const noop = function() {};
		const defaultMediaGroups = {
			"AUDIO": {},
			"VIDEO": {},
			"CLOSED-CAPTIONS": {},
			"SUBTITLES": {}
		};
		const widevineUuid = "urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed";
		let currentTimeline = 0;
		this.manifest = {
			allowCache: true,
			discontinuityStarts: [],
			dateRanges: [],
			iFramePlaylists: [],
			segments: []
		};
		let lastByterangeEnd = 0;
		let lastPartByterangeEnd = 0;
		const dateRangeTags = {};
		this.on("end", () => {
			if (currentUri.uri || !currentUri.parts && !currentUri.preloadHints) return;
			if (!currentUri.map && currentMap) currentUri.map = currentMap;
			if (!currentUri.key && key) currentUri.key = key;
			if (!currentUri.timeline && typeof currentTimeline === "number") currentUri.timeline = currentTimeline;
			this.manifest.preloadSegment = currentUri;
		});
		this.parseStream.on("data", function(entry) {
			let mediaGroup;
			let rendition;
			if (self.manifest.definitions) for (const def in self.manifest.definitions) {
				if (entry.uri) entry.uri = entry.uri.replace(`{$${def}}`, self.manifest.definitions[def]);
				if (entry.attributes) {
					for (const attr in entry.attributes) if (typeof entry.attributes[attr] === "string") entry.attributes[attr] = entry.attributes[attr].replace(`{$${def}}`, self.manifest.definitions[def]);
				}
			}
			({
				tag() {
					({
						version() {
							if (entry.version) this.manifest.version = entry.version;
						},
						"allow-cache"() {
							this.manifest.allowCache = entry.allowed;
							if (!("allowed" in entry)) {
								this.trigger("info", { message: "defaulting allowCache to YES" });
								this.manifest.allowCache = true;
							}
						},
						byterange() {
							const byterange = {};
							if ("length" in entry) {
								currentUri.byterange = byterange;
								byterange.length = entry.length;
								if (!("offset" in entry)) entry.offset = lastByterangeEnd;
							}
							if ("offset" in entry) {
								currentUri.byterange = byterange;
								byterange.offset = entry.offset;
							}
							lastByterangeEnd = byterange.offset + byterange.length;
						},
						endlist() {
							this.manifest.endList = true;
						},
						inf() {
							if (!("mediaSequence" in this.manifest)) {
								this.manifest.mediaSequence = 0;
								this.trigger("info", { message: "defaulting media sequence to zero" });
							}
							if (!("discontinuitySequence" in this.manifest)) {
								this.manifest.discontinuitySequence = 0;
								this.trigger("info", { message: "defaulting discontinuity sequence to zero" });
							}
							if (entry.title) currentUri.title = entry.title;
							if (entry.duration > 0) currentUri.duration = entry.duration;
							if (entry.duration === 0) {
								currentUri.duration = .01;
								this.trigger("info", { message: "updating zero segment duration to a small value" });
							}
							this.manifest.segments = uris;
						},
						key() {
							if (!entry.attributes) {
								this.trigger("warn", { message: "ignoring key declaration without attribute list" });
								return;
							}
							if (entry.attributes.METHOD === "NONE") {
								key = null;
								return;
							}
							if (!entry.attributes.URI) {
								this.trigger("warn", { message: "ignoring key declaration without URI" });
								return;
							}
							if (entry.attributes.KEYFORMAT === "com.apple.streamingkeydelivery") {
								this.manifest.contentProtection = this.manifest.contentProtection || {};
								this.manifest.contentProtection["com.apple.fps.1_0"] = { attributes: entry.attributes };
								return;
							}
							if (entry.attributes.KEYFORMAT === "com.microsoft.playready") {
								this.manifest.contentProtection = this.manifest.contentProtection || {};
								this.manifest.contentProtection["com.microsoft.playready"] = { uri: entry.attributes.URI };
								return;
							}
							if (entry.attributes.KEYFORMAT === widevineUuid) {
								if ([
									"SAMPLE-AES",
									"SAMPLE-AES-CTR",
									"SAMPLE-AES-CENC"
								].indexOf(entry.attributes.METHOD) === -1) {
									this.trigger("warn", { message: "invalid key method provided for Widevine" });
									return;
								}
								if (entry.attributes.METHOD === "SAMPLE-AES-CENC") this.trigger("warn", { message: "SAMPLE-AES-CENC is deprecated, please use SAMPLE-AES-CTR instead" });
								if (entry.attributes.URI.substring(0, 23) !== "data:text/plain;base64,") {
									this.trigger("warn", { message: "invalid key URI provided for Widevine" });
									return;
								}
								if (!(entry.attributes.KEYID && entry.attributes.KEYID.substring(0, 2) === "0x")) {
									this.trigger("warn", { message: "invalid key ID provided for Widevine" });
									return;
								}
								this.manifest.contentProtection = this.manifest.contentProtection || {};
								this.manifest.contentProtection["com.widevine.alpha"] = {
									attributes: {
										schemeIdUri: entry.attributes.KEYFORMAT,
										keyId: entry.attributes.KEYID.substring(2)
									},
									pssh: decodeB64ToUint8Array(entry.attributes.URI.split(",")[1])
								};
								return;
							}
							if (!entry.attributes.METHOD) this.trigger("warn", { message: "defaulting key method to AES-128" });
							key = {
								method: entry.attributes.METHOD || "AES-128",
								uri: entry.attributes.URI
							};
							if (typeof entry.attributes.IV !== "undefined") key.iv = entry.attributes.IV;
						},
						"media-sequence"() {
							if (!isFinite(entry.number)) {
								this.trigger("warn", { message: "ignoring invalid media sequence: " + entry.number });
								return;
							}
							this.manifest.mediaSequence = entry.number;
						},
						"discontinuity-sequence"() {
							if (!isFinite(entry.number)) {
								this.trigger("warn", { message: "ignoring invalid discontinuity sequence: " + entry.number });
								return;
							}
							this.manifest.discontinuitySequence = entry.number;
							currentTimeline = entry.number;
						},
						"playlist-type"() {
							if (!/VOD|EVENT/.test(entry.playlistType)) {
								this.trigger("warn", { message: "ignoring unknown playlist type: " + entry.playlist });
								return;
							}
							this.manifest.playlistType = entry.playlistType;
						},
						map() {
							currentMap = {};
							if (entry.uri) currentMap.uri = entry.uri;
							if (entry.byterange) currentMap.byterange = entry.byterange;
							if (key) currentMap.key = key;
						},
						"stream-inf"() {
							this.manifest.playlists = uris;
							this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
							if (!entry.attributes) {
								this.trigger("warn", { message: "ignoring empty stream-inf attributes" });
								return;
							}
							if (!currentUri.attributes) currentUri.attributes = {};
							_extends(currentUri.attributes, entry.attributes);
						},
						media() {
							this.manifest.mediaGroups = this.manifest.mediaGroups || defaultMediaGroups;
							if (!(entry.attributes && entry.attributes.TYPE && entry.attributes["GROUP-ID"] && entry.attributes.NAME)) {
								this.trigger("warn", { message: "ignoring incomplete or missing media group" });
								return;
							}
							const mediaGroupType = this.manifest.mediaGroups[entry.attributes.TYPE];
							mediaGroupType[entry.attributes["GROUP-ID"]] = mediaGroupType[entry.attributes["GROUP-ID"]] || {};
							mediaGroup = mediaGroupType[entry.attributes["GROUP-ID"]];
							rendition = { default: /yes/i.test(entry.attributes.DEFAULT) };
							if (rendition.default) rendition.autoselect = true;
							else rendition.autoselect = /yes/i.test(entry.attributes.AUTOSELECT);
							if (entry.attributes.LANGUAGE) rendition.language = entry.attributes.LANGUAGE;
							if (entry.attributes.URI) rendition.uri = entry.attributes.URI;
							if (entry.attributes["INSTREAM-ID"]) rendition.instreamId = entry.attributes["INSTREAM-ID"];
							if (entry.attributes.CHARACTERISTICS) rendition.characteristics = entry.attributes.CHARACTERISTICS;
							if (entry.attributes.FORCED) rendition.forced = /yes/i.test(entry.attributes.FORCED);
							mediaGroup[entry.attributes.NAME] = rendition;
						},
						discontinuity() {
							currentTimeline += 1;
							currentUri.discontinuity = true;
							this.manifest.discontinuityStarts.push(uris.length);
						},
						"program-date-time"() {
							if (typeof this.manifest.dateTimeString === "undefined") {
								this.manifest.dateTimeString = entry.dateTimeString;
								this.manifest.dateTimeObject = entry.dateTimeObject;
							}
							currentUri.dateTimeString = entry.dateTimeString;
							currentUri.dateTimeObject = entry.dateTimeObject;
							const { lastProgramDateTime } = this;
							this.lastProgramDateTime = new Date(entry.dateTimeString).getTime();
							if (lastProgramDateTime === null) this.manifest.segments.reduceRight((programDateTime, segment) => {
								segment.programDateTime = programDateTime - segment.duration * 1e3;
								return segment.programDateTime;
							}, this.lastProgramDateTime);
						},
						targetduration() {
							if (!isFinite(entry.duration) || entry.duration < 0) {
								this.trigger("warn", { message: "ignoring invalid target duration: " + entry.duration });
								return;
							}
							this.manifest.targetDuration = entry.duration;
							setHoldBack.call(this, this.manifest);
						},
						start() {
							if (!entry.attributes || isNaN(entry.attributes["TIME-OFFSET"])) {
								this.trigger("warn", { message: "ignoring start declaration without appropriate attribute list" });
								return;
							}
							this.manifest.start = {
								timeOffset: entry.attributes["TIME-OFFSET"],
								precise: entry.attributes.PRECISE
							};
						},
						"cue-out"() {
							currentUri.cueOut = entry.data;
						},
						"cue-out-cont"() {
							currentUri.cueOutCont = entry.data;
						},
						"cue-in"() {
							currentUri.cueIn = entry.data;
						},
						"skip"() {
							this.manifest.skip = camelCaseKeys(entry.attributes);
							this.warnOnMissingAttributes_("#EXT-X-SKIP", entry.attributes, ["SKIPPED-SEGMENTS"]);
						},
						"part"() {
							hasParts = true;
							const segmentIndex = this.manifest.segments.length;
							const part = camelCaseKeys(entry.attributes);
							currentUri.parts = currentUri.parts || [];
							currentUri.parts.push(part);
							if (part.byterange) {
								if (!part.byterange.hasOwnProperty("offset")) part.byterange.offset = lastPartByterangeEnd;
								lastPartByterangeEnd = part.byterange.offset + part.byterange.length;
							}
							const partIndex = currentUri.parts.length - 1;
							this.warnOnMissingAttributes_(`#EXT-X-PART #${partIndex} for segment #${segmentIndex}`, entry.attributes, ["URI", "DURATION"]);
							if (this.manifest.renditionReports) this.manifest.renditionReports.forEach((r, i) => {
								if (!r.hasOwnProperty("lastPart")) this.trigger("warn", { message: `#EXT-X-RENDITION-REPORT #${i} lacks required attribute(s): LAST-PART` });
							});
						},
						"server-control"() {
							const attrs = this.manifest.serverControl = camelCaseKeys(entry.attributes);
							if (!attrs.hasOwnProperty("canBlockReload")) {
								attrs.canBlockReload = false;
								this.trigger("info", { message: "#EXT-X-SERVER-CONTROL defaulting CAN-BLOCK-RELOAD to false" });
							}
							setHoldBack.call(this, this.manifest);
							if (attrs.canSkipDateranges && !attrs.hasOwnProperty("canSkipUntil")) this.trigger("warn", { message: "#EXT-X-SERVER-CONTROL lacks required attribute CAN-SKIP-UNTIL which is required when CAN-SKIP-DATERANGES is set" });
						},
						"preload-hint"() {
							const segmentIndex = this.manifest.segments.length;
							const hint = camelCaseKeys(entry.attributes);
							const isPart = hint.type && hint.type === "PART";
							currentUri.preloadHints = currentUri.preloadHints || [];
							currentUri.preloadHints.push(hint);
							if (hint.byterange) {
								if (!hint.byterange.hasOwnProperty("offset")) {
									hint.byterange.offset = isPart ? lastPartByterangeEnd : 0;
									if (isPart) lastPartByterangeEnd = hint.byterange.offset + hint.byterange.length;
								}
							}
							const index = currentUri.preloadHints.length - 1;
							this.warnOnMissingAttributes_(`#EXT-X-PRELOAD-HINT #${index} for segment #${segmentIndex}`, entry.attributes, ["TYPE", "URI"]);
							if (!hint.type) return;
							for (let i = 0; i < currentUri.preloadHints.length - 1; i++) {
								const otherHint = currentUri.preloadHints[i];
								if (!otherHint.type) continue;
								if (otherHint.type === hint.type) this.trigger("warn", { message: `#EXT-X-PRELOAD-HINT #${index} for segment #${segmentIndex} has the same TYPE ${hint.type} as preload hint #${i}` });
							}
						},
						"rendition-report"() {
							const report = camelCaseKeys(entry.attributes);
							this.manifest.renditionReports = this.manifest.renditionReports || [];
							this.manifest.renditionReports.push(report);
							const index = this.manifest.renditionReports.length - 1;
							const required = ["LAST-MSN", "URI"];
							if (hasParts) required.push("LAST-PART");
							this.warnOnMissingAttributes_(`#EXT-X-RENDITION-REPORT #${index}`, entry.attributes, required);
						},
						"part-inf"() {
							this.manifest.partInf = camelCaseKeys(entry.attributes);
							this.warnOnMissingAttributes_("#EXT-X-PART-INF", entry.attributes, ["PART-TARGET"]);
							if (this.manifest.partInf.partTarget) this.manifest.partTargetDuration = this.manifest.partInf.partTarget;
							setHoldBack.call(this, this.manifest);
						},
						"daterange"() {
							this.manifest.dateRanges.push(camelCaseKeys(entry.attributes));
							const index = this.manifest.dateRanges.length - 1;
							this.warnOnMissingAttributes_(`#EXT-X-DATERANGE #${index}`, entry.attributes, ["ID", "START-DATE"]);
							const dateRange = this.manifest.dateRanges[index];
							if (dateRange.endDate && dateRange.startDate && new Date(dateRange.endDate) < new Date(dateRange.startDate)) this.trigger("warn", { message: "EXT-X-DATERANGE END-DATE must be equal to or later than the value of the START-DATE" });
							if (dateRange.duration && dateRange.duration < 0) this.trigger("warn", { message: "EXT-X-DATERANGE DURATION must not be negative" });
							if (dateRange.plannedDuration && dateRange.plannedDuration < 0) this.trigger("warn", { message: "EXT-X-DATERANGE PLANNED-DURATION must not be negative" });
							const endOnNextYes = !!dateRange.endOnNext;
							if (endOnNextYes && !dateRange.class) this.trigger("warn", { message: "EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must have a CLASS attribute" });
							if (endOnNextYes && (dateRange.duration || dateRange.endDate)) this.trigger("warn", { message: "EXT-X-DATERANGE with an END-ON-NEXT=YES attribute must not contain DURATION or END-DATE attributes" });
							if (dateRange.duration && dateRange.endDate) {
								const newDateInSeconds = dateRange.startDate.getTime() + dateRange.duration * 1e3;
								this.manifest.dateRanges[index].endDate = new Date(newDateInSeconds);
							}
							if (!dateRangeTags[dateRange.id]) dateRangeTags[dateRange.id] = dateRange;
							else {
								for (const attribute in dateRangeTags[dateRange.id]) if (!!dateRange[attribute] && JSON.stringify(dateRangeTags[dateRange.id][attribute]) !== JSON.stringify(dateRange[attribute])) {
									this.trigger("warn", { message: "EXT-X-DATERANGE tags with the same ID in a playlist must have the same attributes values" });
									break;
								}
								const dateRangeWithSameId = this.manifest.dateRanges.findIndex((dateRangeToFind) => dateRangeToFind.id === dateRange.id);
								this.manifest.dateRanges[dateRangeWithSameId] = _extends(this.manifest.dateRanges[dateRangeWithSameId], dateRange);
								dateRangeTags[dateRange.id] = _extends(dateRangeTags[dateRange.id], dateRange);
								this.manifest.dateRanges.pop();
							}
						},
						"independent-segments"() {
							this.manifest.independentSegments = true;
						},
						"i-frames-only"() {
							this.manifest.iFramesOnly = true;
							this.requiredCompatibilityversion(this.manifest.version, 4);
						},
						"content-steering"() {
							this.manifest.contentSteering = camelCaseKeys(entry.attributes);
							this.warnOnMissingAttributes_("#EXT-X-CONTENT-STEERING", entry.attributes, ["SERVER-URI"]);
						},
						/** @this {Parser} */
						define() {
							this.manifest.definitions = this.manifest.definitions || {};
							const addDef = (n, v) => {
								if (n in this.manifest.definitions) {
									this.trigger("error", { message: `EXT-X-DEFINE: Duplicate name ${n}` });
									return;
								}
								this.manifest.definitions[n] = v;
							};
							if ("QUERYPARAM" in entry.attributes) {
								if ("NAME" in entry.attributes || "IMPORT" in entry.attributes) {
									this.trigger("error", { message: "EXT-X-DEFINE: Invalid attributes" });
									return;
								}
								const val = this.params.get(entry.attributes.QUERYPARAM);
								if (!val) {
									this.trigger("error", { message: `EXT-X-DEFINE: No query param ${entry.attributes.QUERYPARAM}` });
									return;
								}
								addDef(entry.attributes.QUERYPARAM, decodeURIComponent(val));
								return;
							}
							if ("NAME" in entry.attributes) {
								if ("IMPORT" in entry.attributes) {
									this.trigger("error", { message: "EXT-X-DEFINE: Invalid attributes" });
									return;
								}
								if (!("VALUE" in entry.attributes) || typeof entry.attributes.VALUE !== "string") {
									this.trigger("error", { message: `EXT-X-DEFINE: No value for ${entry.attributes.NAME}` });
									return;
								}
								addDef(entry.attributes.NAME, entry.attributes.VALUE);
								return;
							}
							if ("IMPORT" in entry.attributes) {
								if (!this.mainDefinitions[entry.attributes.IMPORT]) {
									this.trigger("error", { message: `EXT-X-DEFINE: No value ${entry.attributes.IMPORT} to import, or IMPORT used on main playlist` });
									return;
								}
								addDef(entry.attributes.IMPORT, this.mainDefinitions[entry.attributes.IMPORT]);
								return;
							}
							this.trigger("error", { message: "EXT-X-DEFINE: No attribute" });
						},
						"i-frame-playlist"() {
							this.manifest.iFramePlaylists.push({
								attributes: entry.attributes,
								uri: entry.uri,
								timeline: currentTimeline
							});
							this.warnOnMissingAttributes_("#EXT-X-I-FRAME-STREAM-INF", entry.attributes, ["BANDWIDTH", "URI"]);
						}
					}[entry.tagType] || noop).call(self);
				},
				uri() {
					currentUri.uri = entry.uri;
					uris.push(currentUri);
					if (this.manifest.targetDuration && !("duration" in currentUri)) {
						this.trigger("warn", { message: "defaulting segment duration to the target duration" });
						currentUri.duration = this.manifest.targetDuration;
					}
					if (key) currentUri.key = key;
					currentUri.timeline = currentTimeline;
					if (currentMap) currentUri.map = currentMap;
					lastPartByterangeEnd = 0;
					if (this.lastProgramDateTime !== null) {
						currentUri.programDateTime = this.lastProgramDateTime;
						this.lastProgramDateTime += currentUri.duration * 1e3;
					}
					currentUri = {};
				},
				comment() {},
				custom() {
					if (entry.segment) {
						currentUri.custom = currentUri.custom || {};
						currentUri.custom[entry.customType] = entry.data;
					} else {
						this.manifest.custom = this.manifest.custom || {};
						this.manifest.custom[entry.customType] = entry.data;
					}
				}
			})[entry.type].call(self);
		});
	}
	requiredCompatibilityversion(currentVersion, targetVersion) {
		if (currentVersion < targetVersion || !currentVersion) this.trigger("warn", { message: `manifest must be at least version ${targetVersion}` });
	}
	warnOnMissingAttributes_(identifier, attributes, required) {
		const missing = [];
		required.forEach(function(key) {
			if (!attributes.hasOwnProperty(key)) missing.push(key);
		});
		if (missing.length) this.trigger("warn", { message: `${identifier} lacks required attribute(s): ${missing.join(", ")}` });
	}
	/**
	* Parse the input string and update the manifest object.
	*
	* @param {string} chunk a potentially incomplete portion of the manifest
	*/
	push(chunk) {
		this.lineStream.push(chunk);
	}
	/**
	* Flush any remaining input. This can be handy if the last line of an M3U8
	* manifest did not contain a trailing newline but the file has been
	* completely received.
	*/
	end() {
		this.lineStream.push("\n");
		if (this.manifest.dateRanges.length && this.lastProgramDateTime === null) this.trigger("warn", { message: "A playlist with EXT-X-DATERANGE tag must contain atleast one EXT-X-PROGRAM-DATE-TIME tag" });
		this.lastProgramDateTime = null;
		this.trigger("end");
	}
	/**
	* Add an additional parser for non-standard tags
	*
	* @param {Object}   options              a map of options for the added parser
	* @param {RegExp}   options.expression   a regular expression to match the custom header
	* @param {string}   options.customType   the custom type to register to the output
	* @param {Function} [options.dataParser] function to parse the line into an object
	* @param {boolean}  [options.segment]    should tag data be attached to the segment object
	*/
	addParser(options) {
		this.parseStream.addParser(options);
	}
	/**
	* Add a custom header mapper
	*
	* @param {Object}   options
	* @param {RegExp}   options.expression   a regular expression to match the custom header
	* @param {Function} options.map          function to translate tag into a different tag
	*/
	addTagMapper(options) {
		this.parseStream.addTagMapper(options);
	}
};
//#endregion
//#region ../../node_modules/.pnpm/url-toolkit@2.2.5/node_modules/url-toolkit/src/url-toolkit.js
var require_url_toolkit = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(root) {
		var URL_REGEX = /^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/;
		var FIRST_SEGMENT_REGEX = /^(?=([^\/?#]*))\1([^]*)$/;
		var SLASH_DOT_REGEX = /(?:\/|^)\.(?=\/)/g;
		var SLASH_DOT_DOT_REGEX = /(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g;
		var URLToolkit = {
			buildAbsoluteURL: function(baseURL, relativeURL, opts) {
				opts = opts || {};
				baseURL = baseURL.trim();
				relativeURL = relativeURL.trim();
				if (!relativeURL) {
					if (!opts.alwaysNormalize) return baseURL;
					var basePartsForNormalise = URLToolkit.parseURL(baseURL);
					if (!basePartsForNormalise) throw new Error("Error trying to parse base URL.");
					basePartsForNormalise.path = URLToolkit.normalizePath(basePartsForNormalise.path);
					return URLToolkit.buildURLFromParts(basePartsForNormalise);
				}
				var relativeParts = URLToolkit.parseURL(relativeURL);
				if (!relativeParts) throw new Error("Error trying to parse relative URL.");
				if (relativeParts.scheme) {
					if (!opts.alwaysNormalize) return relativeURL;
					relativeParts.path = URLToolkit.normalizePath(relativeParts.path);
					return URLToolkit.buildURLFromParts(relativeParts);
				}
				var baseParts = URLToolkit.parseURL(baseURL);
				if (!baseParts) throw new Error("Error trying to parse base URL.");
				if (!baseParts.netLoc && baseParts.path && baseParts.path[0] !== "/") {
					var pathParts = FIRST_SEGMENT_REGEX.exec(baseParts.path);
					baseParts.netLoc = pathParts[1];
					baseParts.path = pathParts[2];
				}
				if (baseParts.netLoc && !baseParts.path) baseParts.path = "/";
				var builtParts = {
					scheme: baseParts.scheme,
					netLoc: relativeParts.netLoc,
					path: null,
					params: relativeParts.params,
					query: relativeParts.query,
					fragment: relativeParts.fragment
				};
				if (!relativeParts.netLoc) {
					builtParts.netLoc = baseParts.netLoc;
					if (relativeParts.path[0] !== "/") if (!relativeParts.path) {
						builtParts.path = baseParts.path;
						if (!relativeParts.params) {
							builtParts.params = baseParts.params;
							if (!relativeParts.query) builtParts.query = baseParts.query;
						}
					} else {
						var baseURLPath = baseParts.path;
						var newPath = baseURLPath.substring(0, baseURLPath.lastIndexOf("/") + 1) + relativeParts.path;
						builtParts.path = URLToolkit.normalizePath(newPath);
					}
				}
				if (builtParts.path === null) builtParts.path = opts.alwaysNormalize ? URLToolkit.normalizePath(relativeParts.path) : relativeParts.path;
				return URLToolkit.buildURLFromParts(builtParts);
			},
			parseURL: function(url) {
				var parts = URL_REGEX.exec(url);
				if (!parts) return null;
				return {
					scheme: parts[1] || "",
					netLoc: parts[2] || "",
					path: parts[3] || "",
					params: parts[4] || "",
					query: parts[5] || "",
					fragment: parts[6] || ""
				};
			},
			normalizePath: function(path) {
				path = path.split("").reverse().join("").replace(SLASH_DOT_REGEX, "");
				while (path.length !== (path = path.replace(SLASH_DOT_DOT_REGEX, "")).length);
				return path.split("").reverse().join("");
			},
			buildURLFromParts: function(parts) {
				return parts.scheme + parts.netLoc + parts.path + parts.params + parts.query + parts.fragment;
			}
		};
		if (typeof exports === "object" && typeof module === "object") module.exports = URLToolkit;
		else if (typeof define === "function" && define.amd) define([], function() {
			return URLToolkit;
		});
		else if (typeof exports === "object") exports["URLToolkit"] = URLToolkit;
		else root["URLToolkit"] = URLToolkit;
	})(exports);
}));
//#endregion
//#region ../../node_modules/.pnpm/uuid@14.0.1/node_modules/uuid/dist/stringify.js
var byteToHex = [];
for (let i = 0; i < 256; ++i) byteToHex.push((i + 256).toString(16).slice(1));
function unsafeStringify(arr, offset = 0) {
	return (byteToHex[arr[offset + 0]] + byteToHex[arr[offset + 1]] + byteToHex[arr[offset + 2]] + byteToHex[arr[offset + 3]] + "-" + byteToHex[arr[offset + 4]] + byteToHex[arr[offset + 5]] + "-" + byteToHex[arr[offset + 6]] + byteToHex[arr[offset + 7]] + "-" + byteToHex[arr[offset + 8]] + byteToHex[arr[offset + 9]] + "-" + byteToHex[arr[offset + 10]] + byteToHex[arr[offset + 11]] + byteToHex[arr[offset + 12]] + byteToHex[arr[offset + 13]] + byteToHex[arr[offset + 14]] + byteToHex[arr[offset + 15]]).toLowerCase();
}
//#endregion
//#region ../../node_modules/.pnpm/uuid@14.0.1/node_modules/uuid/dist/rng.js
var rnds8 = /* @__PURE__ */ new Uint8Array(16);
function rng() {
	return crypto.getRandomValues(rnds8);
}
//#endregion
//#region ../../node_modules/.pnpm/uuid@14.0.1/node_modules/uuid/dist/v4.js
function v4(options, buf, offset) {
	if (!buf && !options && crypto.randomUUID) return crypto.randomUUID();
	return _v4(options, buf, offset);
}
function _v4(options, buf, offset) {
	options = options || {};
	const rnds = options.random ?? options.rng?.() ?? rng();
	if (rnds.length < 16) throw new Error("Random bytes length must be >= 16");
	rnds[6] = rnds[6] & 15 | 64;
	rnds[8] = rnds[8] & 63 | 128;
	if (buf) {
		offset = offset || 0;
		if (offset < 0 || offset + 16 > buf.length) throw new RangeError(`UUID byte range ${offset}:${offset + 15} is out of buffer bounds`);
		for (let i = 0; i < 16; ++i) buf[offset + i] = rnds[i];
		return buf;
	}
	return unsafeStringify(rnds);
}
//#endregion
//#region src/services/m3u8-parser.ts
var import_url_toolkit = require_url_toolkit();
function toIvBytes(iv) {
	if (!iv) return null;
	const bytes = new Uint8Array(iv.length * Uint32Array.BYTES_PER_ELEMENT);
	const view = new DataView(bytes.buffer);
	iv.forEach((word, index) => {
		view.setUint32(index * Uint32Array.BYTES_PER_ELEMENT, word, false);
	});
	return bytes;
}
var M3u8Parser = {
	parseLevelPlaylist(string, baseurl) {
		const parser = new Parser();
		parser.push(string);
		parser.end();
		const segments = parser.manifest.segments;
		const fragments = [];
		let index = 0;
		let currentMapUri = null;
		let currentMapByteRange = null;
		segments.forEach((segment) => {
			if (segment.map && segment.map.uri) {
				const mapUri = (0, import_url_toolkit.buildAbsoluteURL)(baseurl, segment.map.uri);
				const mapByteRange = segment.map.byterange ? `${segment.map.byterange.offset}:${segment.map.byterange.length}` : null;
				if (mapUri !== currentMapUri || mapByteRange !== currentMapByteRange) {
					fragments.push({
						index,
						key: segment.key && segment.key.uri ? {
							iv: toIvBytes(segment.key.iv),
							uri: (0, import_url_toolkit.buildAbsoluteURL)(baseurl, segment.key.uri)
						} : {
							iv: null,
							uri: null
						},
						uri: mapUri,
						byteRange: segment.map.byterange ? {
							offset: segment.map.byterange.offset,
							length: segment.map.byterange.length
						} : null
					});
					index++;
					currentMapUri = mapUri;
					currentMapByteRange = mapByteRange;
				}
			}
			fragments.push({
				index,
				key: segment.key && segment.key.uri ? {
					iv: toIvBytes(segment.key.iv),
					uri: (0, import_url_toolkit.buildAbsoluteURL)(baseurl, segment.key.uri)
				} : {
					iv: null,
					uri: null
				},
				uri: (0, import_url_toolkit.buildAbsoluteURL)(baseurl, segment.uri),
				byteRange: segment.byterange ? {
					offset: segment.byterange.offset,
					length: segment.byterange.length
				} : null
			});
			index++;
		});
		return fragments;
	},
	parseMasterPlaylist(manifestText, baseurl) {
		const parser = new Parser();
		parser.push(manifestText);
		parser.end();
		const playlists = parser.manifest?.playlists ?? [];
		const mediaGroups = parser.manifest?.mediaGroups ?? {};
		const audioPlaylists = mediaGroups.AUDIO ?? {};
		const subtitlePlaylists = mediaGroups.SUBTITLES ?? {};
		const closedCaptions = mediaGroups["CLOSED-CAPTIONS"] ?? {};
		const parseAttributes = (line) => {
			const attributes = {};
			const regex = /([A-Z0-9-]+)=("[^"]*"|[^,]*)/g;
			let match;
			while ((match = regex.exec(line)) !== null) {
				const key = match[1];
				const rawValue = match[2];
				attributes[key] = rawValue && rawValue.startsWith("\"") && rawValue.endsWith("\"") ? rawValue.slice(1, -1) : rawValue;
			}
			return attributes;
		};
		const audioAttributes = {};
		const subtitleAttributes = {};
		manifestText.split("\n").filter((line) => line.startsWith("#EXT-X-MEDIA:TYPE=AUDIO")).forEach((line) => {
			const attrs = parseAttributes(line);
			const groupId = attrs["GROUP-ID"];
			const name = attrs["NAME"];
			if (!groupId || !name) return;
			audioAttributes[groupId] = audioAttributes[groupId] ?? {};
			audioAttributes[groupId][name] = {
				channels: attrs["CHANNELS"],
				characteristics: attrs["CHARACTERISTICS"]
			};
		});
		manifestText.split("\n").filter((line) => line.startsWith("#EXT-X-MEDIA:TYPE=SUBTITLES")).forEach((line) => {
			const attrs = parseAttributes(line);
			const groupId = attrs["GROUP-ID"];
			const name = attrs["NAME"];
			if (!groupId || !name) return;
			subtitleAttributes[groupId] = subtitleAttributes[groupId] ?? {};
			subtitleAttributes[groupId][name] = {
				forced: attrs["FORCED"] === "YES",
				characteristics: attrs["CHARACTERISTICS"]
			};
		});
		const results = playlists.map((playlist) => ({
			type: "stream",
			id: v4(),
			playlistID: baseurl,
			uri: (0, import_url_toolkit.buildAbsoluteURL)(baseurl, playlist.uri),
			bitrate: playlist.attributes.BANDWIDTH,
			fps: playlist.attributes["FRAME-RATE"],
			height: playlist.attributes.RESOLUTION?.height,
			width: playlist.attributes.RESOLUTION?.width,
			audioGroupId: playlist.attributes.AUDIO
		}));
		const audioResults = Object.entries(audioPlaylists).flatMap(([key, entries]) => {
			return Object.entries(entries).flatMap(([label, entry]) => {
				const extraAttributes = audioAttributes[key]?.[label];
				if (!entry.uri) return [];
				return [{
					type: "audio",
					id: `${label}-${key}`,
					playlistID: baseurl,
					uri: (0, import_url_toolkit.buildAbsoluteURL)(baseurl, entry.uri),
					bitrate: void 0,
					fps: void 0,
					width: void 0,
					height: void 0,
					language: entry.language,
					name: label,
					characteristics: entry.characteristics ?? extraAttributes?.characteristics,
					channels: extraAttributes?.channels,
					isDefault: entry.default,
					autoSelect: entry.autoselect,
					groupId: key
				}];
			});
		});
		const subtitleResults = Object.entries(subtitlePlaylists).flatMap(([groupId, entries]) => {
			return Object.entries(entries).flatMap(([label, entry]) => {
				const extraAttributes = subtitleAttributes[groupId]?.[label];
				if (!entry.uri) return [];
				return [{
					type: "subtitle",
					id: `${label}-${groupId}`,
					playlistID: baseurl,
					uri: (0, import_url_toolkit.buildAbsoluteURL)(baseurl, entry.uri),
					language: entry.language,
					name: label,
					characteristics: entry.characteristics ?? extraAttributes?.characteristics,
					isDefault: entry.default,
					autoSelect: entry.autoselect,
					forced: entry.forced ?? extraAttributes?.forced,
					groupId
				}];
			});
		});
		const closedCaptionResults = Object.entries(closedCaptions).flatMap(([groupId, entries]) => {
			return Object.entries(entries).flatMap(([label, entry]) => {
				if (!entry.uri) return [];
				return [{
					type: "subtitle",
					id: `${label}-${groupId}-cc`,
					playlistID: baseurl,
					uri: (0, import_url_toolkit.buildAbsoluteURL)(baseurl, entry.uri),
					language: entry.language,
					name: label,
					characteristics: entry.characteristics,
					instreamId: entry.instreamId,
					isDefault: entry.default,
					autoSelect: entry.autoselect,
					groupId
				}];
			});
		});
		return [
			...results,
			...audioResults,
			...subtitleResults,
			...closedCaptionResults
		];
	},
	inspectLevelEncryption(string, baseurl) {
		const parser = new Parser();
		parser.push(string);
		parser.end();
		const segments = parser.manifest.segments ?? [];
		const methods = /* @__PURE__ */ new Set();
		const keyUris = /* @__PURE__ */ new Set();
		let iv = null;
		function normalizeMethod(method) {
			return method ? method.toUpperCase() : null;
		}
		function collectKey(key) {
			const method = normalizeMethod(key?.method);
			if (method && method !== "NONE") methods.add(method);
			if (key?.uri) keyUris.add((0, import_url_toolkit.buildAbsoluteURL)(baseurl, key.uri));
			if (key?.iv && !iv) {
				if (typeof key.iv === "string") iv = key.iv;
				else if (ArrayBuffer.isView(key.iv)) {
					if (key.iv instanceof Uint32Array) {
						iv = `0x${Array.from(key.iv).map((word) => word.toString(16).padStart(8, "0")).join("")}`;
						return;
					}
					const view = key.iv instanceof Uint8Array ? key.iv : new Uint8Array(key.iv.buffer, key.iv.byteOffset, key.iv.byteLength);
					iv = `0x${Array.from(view).map((byte) => byte.toString(16).padStart(2, "0")).join("")}`;
				}
			}
		}
		segments.forEach((segment) => {
			collectKey(segment.key);
		});
		const sessionKeys = parser.manifest?.sessionKeys ?? parser.manifest?.sessionKey ?? [];
		(Array.isArray(sessionKeys) ? sessionKeys : [sessionKeys]).forEach((key) => {
			collectKey(key);
		});
		return {
			methods: Array.from(methods),
			keyUris: Array.from(keyUris),
			iv
		};
	}
};
//#endregion
//#region src/index.ts
var wrapStore = (0, import_lib.createWrapStore)();
(async () => {
	try {
		await initializeDownloadTracking();
	} catch (error) {
		console.warn("[downloads] failed to restore artifact tracking", error);
	}
	const state = await getState();
	const store = createStore({
		decryptor: CryptoDecryptor,
		fs: DiskBackedFS,
		loader: FetchLoader,
		parser: M3u8Parser
	}, state);
	wrapStore(store);
	store.subscribe(() => {
		saveState(store.getState());
	});
	subscribeListeners(store);
})();
//#endregion

//# sourceMappingURL=background.js.map