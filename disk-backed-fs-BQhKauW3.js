//#region \0rolldown/runtime.js
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJSMin = (cb, mod) => () => (mod || (cb((mod = { exports: {} }).exports, mod), cb = null), mod.exports);
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
var __copyProps = (to, from, except, desc) => {
	if (from && typeof from === "object" || typeof from === "function") for (var keys = __getOwnPropNames(from), i = 0, n = keys.length, key; i < n; i++) {
		key = keys[i];
		if (!__hasOwnProp.call(to, key) && key !== except) __defProp(to, key, {
			get: ((k) => from[k]).bind(null, key),
			enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable
		});
	}
	return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", {
	value: mod,
	enumerable: true
}) : target, mod));
//#endregion
//#region ../../node_modules/.pnpm/webextension-polyfill@0.12.0/node_modules/webextension-polyfill/dist/browser-polyfill.js
var require_browser_polyfill = /* @__PURE__ */ __commonJSMin(((exports, module) => {
	(function(global, factory) {
		if (typeof define === "function" && define.amd) define("webextension-polyfill", ["module"], factory);
		else if (typeof exports !== "undefined") factory(module);
		else {
			var mod = { exports: {} };
			factory(mod);
			global.browser = mod.exports;
		}
	})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : exports, function(module$1) {
		"use strict";
		if (!(globalThis.chrome && globalThis.chrome.runtime && globalThis.chrome.runtime.id)) throw new Error("This script should only be loaded in a browser extension.");
		if (!(globalThis.browser && globalThis.browser.runtime && globalThis.browser.runtime.id)) {
			const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
			const wrapAPIs = (extensionAPIs) => {
				const apiMetadata = {
					"alarms": {
						"clear": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"clearAll": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"get": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"getAll": {
							"minArgs": 0,
							"maxArgs": 0
						}
					},
					"bookmarks": {
						"create": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"get": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getChildren": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getRecent": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getSubTree": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getTree": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"move": {
							"minArgs": 2,
							"maxArgs": 2
						},
						"remove": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeTree": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"search": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"update": {
							"minArgs": 2,
							"maxArgs": 2
						}
					},
					"browserAction": {
						"disable": {
							"minArgs": 0,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"enable": {
							"minArgs": 0,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"getBadgeBackgroundColor": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getBadgeText": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getPopup": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getTitle": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"openPopup": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"setBadgeBackgroundColor": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"setBadgeText": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"setIcon": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"setPopup": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"setTitle": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						}
					},
					"browsingData": {
						"remove": {
							"minArgs": 2,
							"maxArgs": 2
						},
						"removeCache": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeCookies": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeDownloads": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeFormData": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeHistory": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeLocalStorage": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removePasswords": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removePluginData": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"settings": {
							"minArgs": 0,
							"maxArgs": 0
						}
					},
					"commands": { "getAll": {
						"minArgs": 0,
						"maxArgs": 0
					} },
					"contextMenus": {
						"remove": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeAll": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"update": {
							"minArgs": 2,
							"maxArgs": 2
						}
					},
					"cookies": {
						"get": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getAll": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getAllCookieStores": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"remove": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"set": {
							"minArgs": 1,
							"maxArgs": 1
						}
					},
					"devtools": {
						"inspectedWindow": { "eval": {
							"minArgs": 1,
							"maxArgs": 2,
							"singleCallbackArg": false
						} },
						"panels": {
							"create": {
								"minArgs": 3,
								"maxArgs": 3,
								"singleCallbackArg": true
							},
							"elements": { "createSidebarPane": {
								"minArgs": 1,
								"maxArgs": 1
							} }
						}
					},
					"downloads": {
						"cancel": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"download": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"erase": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getFileIcon": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"open": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"pause": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeFile": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"resume": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"search": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"show": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						}
					},
					"extension": {
						"isAllowedFileSchemeAccess": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"isAllowedIncognitoAccess": {
							"minArgs": 0,
							"maxArgs": 0
						}
					},
					"history": {
						"addUrl": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"deleteAll": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"deleteRange": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"deleteUrl": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getVisits": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"search": {
							"minArgs": 1,
							"maxArgs": 1
						}
					},
					"i18n": {
						"detectLanguage": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getAcceptLanguages": {
							"minArgs": 0,
							"maxArgs": 0
						}
					},
					"identity": { "launchWebAuthFlow": {
						"minArgs": 1,
						"maxArgs": 1
					} },
					"idle": { "queryState": {
						"minArgs": 1,
						"maxArgs": 1
					} },
					"management": {
						"get": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getAll": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"getSelf": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"setEnabled": {
							"minArgs": 2,
							"maxArgs": 2
						},
						"uninstallSelf": {
							"minArgs": 0,
							"maxArgs": 1
						}
					},
					"notifications": {
						"clear": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"create": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"getAll": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"getPermissionLevel": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"update": {
							"minArgs": 2,
							"maxArgs": 2
						}
					},
					"pageAction": {
						"getPopup": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getTitle": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"hide": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"setIcon": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"setPopup": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"setTitle": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						},
						"show": {
							"minArgs": 1,
							"maxArgs": 1,
							"fallbackToNoCallback": true
						}
					},
					"permissions": {
						"contains": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getAll": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"remove": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"request": {
							"minArgs": 1,
							"maxArgs": 1
						}
					},
					"runtime": {
						"getBackgroundPage": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"getPlatformInfo": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"openOptionsPage": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"requestUpdateCheck": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"sendMessage": {
							"minArgs": 1,
							"maxArgs": 3
						},
						"sendNativeMessage": {
							"minArgs": 2,
							"maxArgs": 2
						},
						"setUninstallURL": {
							"minArgs": 1,
							"maxArgs": 1
						}
					},
					"sessions": {
						"getDevices": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"getRecentlyClosed": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"restore": {
							"minArgs": 0,
							"maxArgs": 1
						}
					},
					"storage": {
						"local": {
							"clear": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"get": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getBytesInUse": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"set": {
								"minArgs": 1,
								"maxArgs": 1
							}
						},
						"managed": {
							"get": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getBytesInUse": {
								"minArgs": 0,
								"maxArgs": 1
							}
						},
						"sync": {
							"clear": {
								"minArgs": 0,
								"maxArgs": 0
							},
							"get": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"getBytesInUse": {
								"minArgs": 0,
								"maxArgs": 1
							},
							"remove": {
								"minArgs": 1,
								"maxArgs": 1
							},
							"set": {
								"minArgs": 1,
								"maxArgs": 1
							}
						}
					},
					"tabs": {
						"captureVisibleTab": {
							"minArgs": 0,
							"maxArgs": 2
						},
						"create": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"detectLanguage": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"discard": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"duplicate": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"executeScript": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"get": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getCurrent": {
							"minArgs": 0,
							"maxArgs": 0
						},
						"getZoom": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"getZoomSettings": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"goBack": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"goForward": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"highlight": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"insertCSS": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"move": {
							"minArgs": 2,
							"maxArgs": 2
						},
						"query": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"reload": {
							"minArgs": 0,
							"maxArgs": 2
						},
						"remove": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"removeCSS": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"sendMessage": {
							"minArgs": 2,
							"maxArgs": 3
						},
						"setZoom": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"setZoomSettings": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"update": {
							"minArgs": 1,
							"maxArgs": 2
						}
					},
					"topSites": { "get": {
						"minArgs": 0,
						"maxArgs": 0
					} },
					"webNavigation": {
						"getAllFrames": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"getFrame": {
							"minArgs": 1,
							"maxArgs": 1
						}
					},
					"webRequest": { "handlerBehaviorChanged": {
						"minArgs": 0,
						"maxArgs": 0
					} },
					"windows": {
						"create": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"get": {
							"minArgs": 1,
							"maxArgs": 2
						},
						"getAll": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"getCurrent": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"getLastFocused": {
							"minArgs": 0,
							"maxArgs": 1
						},
						"remove": {
							"minArgs": 1,
							"maxArgs": 1
						},
						"update": {
							"minArgs": 2,
							"maxArgs": 2
						}
					}
				};
				if (Object.keys(apiMetadata).length === 0) throw new Error("api-metadata.json has not been included in browser-polyfill");
				/**
				* A WeakMap subclass which creates and stores a value for any key which does
				* not exist when accessed, but behaves exactly as an ordinary WeakMap
				* otherwise.
				*
				* @param {function} createItem
				*        A function which will be called in order to create the value for any
				*        key which does not exist, the first time it is accessed. The
				*        function receives, as its only argument, the key being created.
				*/
				class DefaultWeakMap extends WeakMap {
					constructor(createItem, items = void 0) {
						super(items);
						this.createItem = createItem;
					}
					get(key) {
						if (!this.has(key)) this.set(key, this.createItem(key));
						return super.get(key);
					}
				}
				/**
				* Returns true if the given object is an object with a `then` method, and can
				* therefore be assumed to behave as a Promise.
				*
				* @param {*} value The value to test.
				* @returns {boolean} True if the value is thenable.
				*/
				const isThenable = (value) => {
					return value && typeof value === "object" && typeof value.then === "function";
				};
				/**
				* Creates and returns a function which, when called, will resolve or reject
				* the given promise based on how it is called:
				*
				* - If, when called, `chrome.runtime.lastError` contains a non-null object,
				*   the promise is rejected with that value.
				* - If the function is called with exactly one argument, the promise is
				*   resolved to that value.
				* - Otherwise, the promise is resolved to an array containing all of the
				*   function's arguments.
				*
				* @param {object} promise
				*        An object containing the resolution and rejection functions of a
				*        promise.
				* @param {function} promise.resolve
				*        The promise's resolution function.
				* @param {function} promise.reject
				*        The promise's rejection function.
				* @param {object} metadata
				*        Metadata about the wrapped method which has created the callback.
				* @param {boolean} metadata.singleCallbackArg
				*        Whether or not the promise is resolved with only the first
				*        argument of the callback, alternatively an array of all the
				*        callback arguments is resolved. By default, if the callback
				*        function is invoked with only a single argument, that will be
				*        resolved to the promise, while all arguments will be resolved as
				*        an array if multiple are given.
				*
				* @returns {function}
				*        The generated callback function.
				*/
				const makeCallback = (promise, metadata) => {
					return (...callbackArgs) => {
						if (extensionAPIs.runtime.lastError) promise.reject(new Error(extensionAPIs.runtime.lastError.message));
						else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) promise.resolve(callbackArgs[0]);
						else promise.resolve(callbackArgs);
					};
				};
				const pluralizeArguments = (numArgs) => numArgs == 1 ? "argument" : "arguments";
				/**
				* Creates a wrapper function for a method with the given name and metadata.
				*
				* @param {string} name
				*        The name of the method which is being wrapped.
				* @param {object} metadata
				*        Metadata about the method being wrapped.
				* @param {integer} metadata.minArgs
				*        The minimum number of arguments which must be passed to the
				*        function. If called with fewer than this number of arguments, the
				*        wrapper will raise an exception.
				* @param {integer} metadata.maxArgs
				*        The maximum number of arguments which may be passed to the
				*        function. If called with more than this number of arguments, the
				*        wrapper will raise an exception.
				* @param {boolean} metadata.singleCallbackArg
				*        Whether or not the promise is resolved with only the first
				*        argument of the callback, alternatively an array of all the
				*        callback arguments is resolved. By default, if the callback
				*        function is invoked with only a single argument, that will be
				*        resolved to the promise, while all arguments will be resolved as
				*        an array if multiple are given.
				*
				* @returns {function(object, ...*)}
				*       The generated wrapper function.
				*/
				const wrapAsyncFunction = (name, metadata) => {
					return function asyncFunctionWrapper(target, ...args) {
						if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
						if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
						return new Promise((resolve, reject) => {
							if (metadata.fallbackToNoCallback) try {
								target[name](...args, makeCallback({
									resolve,
									reject
								}, metadata));
							} catch (cbError) {
								console.warn(`${name} API method doesn't seem to support the callback parameter, falling back to call it without a callback: `, cbError);
								target[name](...args);
								metadata.fallbackToNoCallback = false;
								metadata.noCallback = true;
								resolve();
							}
							else if (metadata.noCallback) {
								target[name](...args);
								resolve();
							} else target[name](...args, makeCallback({
								resolve,
								reject
							}, metadata));
						});
					};
				};
				/**
				* Wraps an existing method of the target object, so that calls to it are
				* intercepted by the given wrapper function. The wrapper function receives,
				* as its first argument, the original `target` object, followed by each of
				* the arguments passed to the original method.
				*
				* @param {object} target
				*        The original target object that the wrapped method belongs to.
				* @param {function} method
				*        The method being wrapped. This is used as the target of the Proxy
				*        object which is created to wrap the method.
				* @param {function} wrapper
				*        The wrapper function which is called in place of a direct invocation
				*        of the wrapped method.
				*
				* @returns {Proxy<function>}
				*        A Proxy object for the given method, which invokes the given wrapper
				*        method in its place.
				*/
				const wrapMethod = (target, method, wrapper) => {
					return new Proxy(method, { apply(targetMethod, thisObj, args) {
						return wrapper.call(thisObj, target, ...args);
					} });
				};
				let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
				/**
				* Wraps an object in a Proxy which intercepts and wraps certain methods
				* based on the given `wrappers` and `metadata` objects.
				*
				* @param {object} target
				*        The target object to wrap.
				*
				* @param {object} [wrappers = {}]
				*        An object tree containing wrapper functions for special cases. Any
				*        function present in this object tree is called in place of the
				*        method in the same location in the `target` object tree. These
				*        wrapper methods are invoked as described in {@see wrapMethod}.
				*
				* @param {object} [metadata = {}]
				*        An object tree containing metadata used to automatically generate
				*        Promise-based wrapper functions for asynchronous. Any function in
				*        the `target` object tree which has a corresponding metadata object
				*        in the same location in the `metadata` tree is replaced with an
				*        automatically-generated wrapper function, as described in
				*        {@see wrapAsyncFunction}
				*
				* @returns {Proxy<object>}
				*/
				const wrapObject = (target, wrappers = {}, metadata = {}) => {
					let cache = Object.create(null);
					let handlers = {
						has(proxyTarget, prop) {
							return prop in target || prop in cache;
						},
						get(proxyTarget, prop, receiver) {
							if (prop in cache) return cache[prop];
							if (!(prop in target)) return;
							let value = target[prop];
							if (typeof value === "function") if (typeof wrappers[prop] === "function") value = wrapMethod(target, target[prop], wrappers[prop]);
							else if (hasOwnProperty(metadata, prop)) {
								let wrapper = wrapAsyncFunction(prop, metadata[prop]);
								value = wrapMethod(target, target[prop], wrapper);
							} else value = value.bind(target);
							else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) value = wrapObject(value, wrappers[prop], metadata[prop]);
							else if (hasOwnProperty(metadata, "*")) value = wrapObject(value, wrappers[prop], metadata["*"]);
							else {
								Object.defineProperty(cache, prop, {
									configurable: true,
									enumerable: true,
									get() {
										return target[prop];
									},
									set(value) {
										target[prop] = value;
									}
								});
								return value;
							}
							cache[prop] = value;
							return value;
						},
						set(proxyTarget, prop, value, receiver) {
							if (prop in cache) cache[prop] = value;
							else target[prop] = value;
							return true;
						},
						defineProperty(proxyTarget, prop, desc) {
							return Reflect.defineProperty(cache, prop, desc);
						},
						deleteProperty(proxyTarget, prop) {
							return Reflect.deleteProperty(cache, prop);
						}
					};
					let proxyTarget = Object.create(target);
					return new Proxy(proxyTarget, handlers);
				};
				/**
				* Creates a set of wrapper functions for an event object, which handles
				* wrapping of listener functions that those messages are passed.
				*
				* A single wrapper is created for each listener function, and stored in a
				* map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
				* retrieve the original wrapper, so that  attempts to remove a
				* previously-added listener work as expected.
				*
				* @param {DefaultWeakMap<function, function>} wrapperMap
				*        A DefaultWeakMap object which will create the appropriate wrapper
				*        for a given listener function when one does not exist, and retrieve
				*        an existing one when it does.
				*
				* @returns {object}
				*/
				const wrapEvent = (wrapperMap) => ({
					addListener(target, listener, ...args) {
						target.addListener(wrapperMap.get(listener), ...args);
					},
					hasListener(target, listener) {
						return target.hasListener(wrapperMap.get(listener));
					},
					removeListener(target, listener) {
						target.removeListener(wrapperMap.get(listener));
					}
				});
				const onRequestFinishedWrappers = new DefaultWeakMap((listener) => {
					if (typeof listener !== "function") return listener;
					/**
					* Wraps an onRequestFinished listener function so that it will return a
					* `getContent()` property which returns a `Promise` rather than using a
					* callback API.
					*
					* @param {object} req
					*        The HAR entry object representing the network request.
					*/
					return function onRequestFinished(req) {
						listener(wrapObject(req, {}, { getContent: {
							minArgs: 0,
							maxArgs: 0
						} }));
					};
				});
				const onMessageWrappers = new DefaultWeakMap((listener) => {
					if (typeof listener !== "function") return listener;
					/**
					* Wraps a message listener function so that it may send responses based on
					* its return value, rather than by returning a sentinel value and calling a
					* callback. If the listener function returns a Promise, the response is
					* sent when the promise either resolves or rejects.
					*
					* @param {*} message
					*        The message sent by the other end of the channel.
					* @param {object} sender
					*        Details about the sender of the message.
					* @param {function(*)} sendResponse
					*        A callback which, when called with an arbitrary argument, sends
					*        that value as a response.
					* @returns {boolean}
					*        True if the wrapped listener returned a Promise, which will later
					*        yield a response. False otherwise.
					*/
					return function onMessage(message, sender, sendResponse) {
						let didCallSendResponse = false;
						let wrappedSendResponse;
						let sendResponsePromise = new Promise((resolve) => {
							wrappedSendResponse = function(response) {
								didCallSendResponse = true;
								resolve(response);
							};
						});
						let result;
						try {
							result = listener(message, sender, wrappedSendResponse);
						} catch (err) {
							result = Promise.reject(err);
						}
						const isResultThenable = result !== true && isThenable(result);
						if (result !== true && !isResultThenable && !didCallSendResponse) return false;
						const sendPromisedResult = (promise) => {
							promise.then((msg) => {
								sendResponse(msg);
							}, (error) => {
								let message;
								if (error && (error instanceof Error || typeof error.message === "string")) message = error.message;
								else message = "An unexpected error occurred";
								sendResponse({
									__mozWebExtensionPolyfillReject__: true,
									message
								});
							}).catch((err) => {
								console.error("Failed to send onMessage rejected reply", err);
							});
						};
						if (isResultThenable) sendPromisedResult(result);
						else sendPromisedResult(sendResponsePromise);
						return true;
					};
				});
				const wrappedSendMessageCallback = ({ reject, resolve }, reply) => {
					if (extensionAPIs.runtime.lastError) if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) resolve();
					else reject(new Error(extensionAPIs.runtime.lastError.message));
					else if (reply && reply.__mozWebExtensionPolyfillReject__) reject(new Error(reply.message));
					else resolve(reply);
				};
				const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
					if (args.length < metadata.minArgs) throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
					if (args.length > metadata.maxArgs) throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
					return new Promise((resolve, reject) => {
						const wrappedCb = wrappedSendMessageCallback.bind(null, {
							resolve,
							reject
						});
						args.push(wrappedCb);
						apiNamespaceObj.sendMessage(...args);
					});
				};
				const staticWrappers = {
					devtools: { network: { onRequestFinished: wrapEvent(onRequestFinishedWrappers) } },
					runtime: {
						onMessage: wrapEvent(onMessageWrappers),
						onMessageExternal: wrapEvent(onMessageWrappers),
						sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
							minArgs: 1,
							maxArgs: 3
						})
					},
					tabs: { sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
						minArgs: 2,
						maxArgs: 3
					}) }
				};
				const settingMetadata = {
					clear: {
						minArgs: 1,
						maxArgs: 1
					},
					get: {
						minArgs: 1,
						maxArgs: 1
					},
					set: {
						minArgs: 1,
						maxArgs: 1
					}
				};
				apiMetadata.privacy = {
					network: { "*": settingMetadata },
					services: { "*": settingMetadata },
					websites: { "*": settingMetadata }
				};
				return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
			};
			module$1.exports = wrapAPIs(chrome);
		} else module$1.exports = globalThis.browser;
	});
}));
//#endregion
//#region ../../node_modules/.pnpm/idb@8.0.3/node_modules/idb/build/index.js
var instanceOfAny = (object, constructors) => constructors.some((c) => object instanceof c);
var idbProxyableTypes;
var cursorAdvanceMethods;
function getIdbProxyableTypes() {
	return idbProxyableTypes || (idbProxyableTypes = [
		IDBDatabase,
		IDBObjectStore,
		IDBIndex,
		IDBCursor,
		IDBTransaction
	]);
}
function getCursorAdvanceMethods() {
	return cursorAdvanceMethods || (cursorAdvanceMethods = [
		IDBCursor.prototype.advance,
		IDBCursor.prototype.continue,
		IDBCursor.prototype.continuePrimaryKey
	]);
}
var transactionDoneMap = /* @__PURE__ */ new WeakMap();
var transformCache = /* @__PURE__ */ new WeakMap();
var reverseTransformCache = /* @__PURE__ */ new WeakMap();
function promisifyRequest(request) {
	const promise = new Promise((resolve, reject) => {
		const unlisten = () => {
			request.removeEventListener("success", success);
			request.removeEventListener("error", error);
		};
		const success = () => {
			resolve(wrap(request.result));
			unlisten();
		};
		const error = () => {
			reject(request.error);
			unlisten();
		};
		request.addEventListener("success", success);
		request.addEventListener("error", error);
	});
	reverseTransformCache.set(promise, request);
	return promise;
}
function cacheDonePromiseForTransaction(tx) {
	if (transactionDoneMap.has(tx)) return;
	const done = new Promise((resolve, reject) => {
		const unlisten = () => {
			tx.removeEventListener("complete", complete);
			tx.removeEventListener("error", error);
			tx.removeEventListener("abort", error);
		};
		const complete = () => {
			resolve();
			unlisten();
		};
		const error = () => {
			reject(tx.error || new DOMException("AbortError", "AbortError"));
			unlisten();
		};
		tx.addEventListener("complete", complete);
		tx.addEventListener("error", error);
		tx.addEventListener("abort", error);
	});
	transactionDoneMap.set(tx, done);
}
var idbProxyTraps = {
	get(target, prop, receiver) {
		if (target instanceof IDBTransaction) {
			if (prop === "done") return transactionDoneMap.get(target);
			if (prop === "store") return receiver.objectStoreNames[1] ? void 0 : receiver.objectStore(receiver.objectStoreNames[0]);
		}
		return wrap(target[prop]);
	},
	set(target, prop, value) {
		target[prop] = value;
		return true;
	},
	has(target, prop) {
		if (target instanceof IDBTransaction && (prop === "done" || prop === "store")) return true;
		return prop in target;
	}
};
function replaceTraps(callback) {
	idbProxyTraps = callback(idbProxyTraps);
}
function wrapFunction(func) {
	if (getCursorAdvanceMethods().includes(func)) return function(...args) {
		func.apply(unwrap(this), args);
		return wrap(this.request);
	};
	return function(...args) {
		return wrap(func.apply(unwrap(this), args));
	};
}
function transformCachableValue(value) {
	if (typeof value === "function") return wrapFunction(value);
	if (value instanceof IDBTransaction) cacheDonePromiseForTransaction(value);
	if (instanceOfAny(value, getIdbProxyableTypes())) return new Proxy(value, idbProxyTraps);
	return value;
}
function wrap(value) {
	if (value instanceof IDBRequest) return promisifyRequest(value);
	if (transformCache.has(value)) return transformCache.get(value);
	const newValue = transformCachableValue(value);
	if (newValue !== value) {
		transformCache.set(value, newValue);
		reverseTransformCache.set(newValue, value);
	}
	return newValue;
}
var unwrap = (value) => reverseTransformCache.get(value);
/**
* Open a database.
*
* @param name Name of the database.
* @param version Schema version.
* @param callbacks Additional callbacks.
*/
function openDB(name, version, { blocked, upgrade, blocking, terminated } = {}) {
	const request = indexedDB.open(name, version);
	const openPromise = wrap(request);
	if (upgrade) request.addEventListener("upgradeneeded", (event) => {
		upgrade(wrap(request.result), event.oldVersion, event.newVersion, wrap(request.transaction), event);
	});
	if (blocked) request.addEventListener("blocked", (event) => blocked(event.oldVersion, event.newVersion, event));
	openPromise.then((db) => {
		if (terminated) db.addEventListener("close", () => terminated());
		if (blocking) db.addEventListener("versionchange", (event) => blocking(event.oldVersion, event.newVersion, event));
	}).catch(() => {});
	return openPromise;
}
/**
* Delete a database.
*
* @param name Name of the database.
*/
function deleteDB(name, { blocked } = {}) {
	const request = indexedDB.deleteDatabase(name);
	if (blocked) request.addEventListener("blocked", (event) => blocked(event.oldVersion, event));
	return wrap(request).then(() => void 0);
}
var readMethods = [
	"get",
	"getKey",
	"getAll",
	"getAllKeys",
	"count"
];
var writeMethods = [
	"put",
	"add",
	"delete",
	"clear"
];
var cachedMethods = /* @__PURE__ */ new Map();
function getMethod(target, prop) {
	if (!(target instanceof IDBDatabase && !(prop in target) && typeof prop === "string")) return;
	if (cachedMethods.get(prop)) return cachedMethods.get(prop);
	const targetFuncName = prop.replace(/FromIndex$/, "");
	const useIndex = prop !== targetFuncName;
	const isWrite = writeMethods.includes(targetFuncName);
	if (!(targetFuncName in (useIndex ? IDBIndex : IDBObjectStore).prototype) || !(isWrite || readMethods.includes(targetFuncName))) return;
	const method = async function(storeName, ...args) {
		const tx = this.transaction(storeName, isWrite ? "readwrite" : "readonly");
		let target = tx.store;
		if (useIndex) target = target.index(args.shift());
		return (await Promise.all([target[targetFuncName](...args), isWrite && tx.done]))[0];
	};
	cachedMethods.set(prop, method);
	return method;
}
replaceTraps((oldTraps) => ({
	...oldTraps,
	get: (target, prop, receiver) => getMethod(target, prop) || oldTraps.get(target, prop, receiver),
	has: (target, prop) => !!getMethod(target, prop) || oldTraps.has(target, prop)
}));
var advanceMethodProps = [
	"continue",
	"continuePrimaryKey",
	"advance"
];
var methodMap = {};
var advanceResults = /* @__PURE__ */ new WeakMap();
var ittrProxiedCursorToOriginalProxy = /* @__PURE__ */ new WeakMap();
var cursorIteratorTraps = { get(target, prop) {
	if (!advanceMethodProps.includes(prop)) return target[prop];
	let cachedFunc = methodMap[prop];
	if (!cachedFunc) cachedFunc = methodMap[prop] = function(...args) {
		advanceResults.set(this, ittrProxiedCursorToOriginalProxy.get(this)[prop](...args));
	};
	return cachedFunc;
} };
async function* iterate(...args) {
	let cursor = this;
	if (!(cursor instanceof IDBCursor)) cursor = await cursor.openCursor(...args);
	if (!cursor) return;
	cursor = cursor;
	const proxiedCursor = new Proxy(cursor, cursorIteratorTraps);
	ittrProxiedCursorToOriginalProxy.set(proxiedCursor, cursor);
	reverseTransformCache.set(proxiedCursor, unwrap(cursor));
	while (cursor) {
		yield proxiedCursor;
		cursor = await (advanceResults.get(proxiedCursor) || cursor.continue());
		advanceResults.delete(proxiedCursor);
	}
}
function isIteratorProp(target, prop) {
	return prop === Symbol.asyncIterator && instanceOfAny(target, [
		IDBIndex,
		IDBObjectStore,
		IDBCursor
	]) || prop === "iterate" && instanceOfAny(target, [IDBIndex, IDBObjectStore]);
}
replaceTraps((oldTraps) => ({
	...oldTraps,
	get(target, prop, receiver) {
		if (isIteratorProp(target, prop)) return iterate;
		return oldTraps.get(target, prop, receiver);
	},
	has(target, prop) {
		return isIteratorProp(target, prop) || oldTraps.has(target, prop);
	}
}));
//#endregion
//#region ../../node_modules/.pnpm/filename-reserved-regex@4.0.0/node_modules/filename-reserved-regex/index.js
var import_browser_polyfill = /* @__PURE__ */ __toESM(require_browser_polyfill(), 1);
function filenameReservedRegex() {
	return /[<>:"/\\|?*\u0000-\u001F]|[. ]$/g;
}
function windowsReservedNameRegex() {
	return /^(con|prn|aux|nul|com\d|lpt\d)$/i;
}
//#endregion
//#region ../../node_modules/.pnpm/filenamify@7.0.2/node_modules/filenamify/filenamify.js
var MAX_FILENAME_LENGTH = 100;
var reRelativePath = /^\.+(\\|\/)|^\.+$/;
var reTrailingDotsAndSpaces = /[. ]+$/;
var reControlChars = /[\p{Control}\p{Format}\p{Zl}\p{Zp}\uFFF0-\uFFFF]/gu;
var reControlCharsTest = /[\p{Control}\p{Format}\p{Zl}\p{Zp}\uFFF0-\uFFFF]/u;
var isZeroWidthJoiner = (char) => char === "‍";
var reRepeatedReservedCharacters = /([<>:"/\\|?*\u0000-\u001F]){2,}/g;
var reReplacementReservedCharacters = /[<>:"/\\|?*\u0000-\u001F]/;
var reUnicodeWhitespace = /[\t\n\r\u00A0\u1680\u2000-\u200A\u202F\u205F\u3000]+/g;
var segmenter;
function getSegmenter() {
	segmenter ??= new Intl.Segmenter(void 0, { granularity: "grapheme" });
	return segmenter;
}
function truncateFilename(filename, maxLength) {
	if (filename.length <= maxLength) return filename;
	const extensionIndex = filename.lastIndexOf(".");
	if (extensionIndex === -1) return truncateByGraphemeBudget(filename, maxLength);
	const base = filename.slice(0, extensionIndex);
	const extension = filename.slice(extensionIndex);
	return truncateByGraphemeBudget(base, Math.max(0, maxLength - extension.length)).replace(/ +$/, "") + extension;
}
function ensureNonWindowsReservedName(filename, replacement) {
	const extensionIndex = filename.indexOf(".");
	const base = extensionIndex === -1 ? filename : filename.slice(0, extensionIndex);
	if (!windowsReservedNameRegex().test(base)) return filename;
	return extensionIndex === -1 ? filename + replacement : base + replacement + filename.slice(extensionIndex);
}
function filenamify(string, options = {}) {
	if (typeof string !== "string") throw new TypeError("Expected a string");
	const replacement = options.replacement ?? "!";
	const hasReservedChars = reReplacementReservedCharacters.test(replacement);
	const hasControlChars = [...replacement].some((char) => reControlCharsTest.test(char) && !isZeroWidthJoiner(char));
	if (hasReservedChars || hasControlChars) throw new Error("Replacement string cannot contain reserved filename characters");
	string = string.normalize("NFC");
	string = string.replaceAll(reUnicodeWhitespace, " ");
	if (replacement.length > 0) string = string.replaceAll(reRepeatedReservedCharacters, "$1");
	string = string.replace(reTrailingDotsAndSpaces, "");
	string = string.replace(reRelativePath, replacement);
	string = string.replace(filenameReservedRegex(), replacement);
	string = string.replaceAll(reControlChars, (char) => isZeroWidthJoiner(char) ? char : replacement);
	string = string.replace(reTrailingDotsAndSpaces, "");
	if (string.length === 0) {
		string = replacement.replace(reTrailingDotsAndSpaces, "");
		if (string.length === 0 && replacement.length > 0) string = "!";
	}
	const allowedLength = typeof options.maxLength === "number" ? options.maxLength : MAX_FILENAME_LENGTH;
	string = truncateFilename(string, allowedLength);
	string = string.replace(reTrailingDotsAndSpaces, "");
	string = ensureNonWindowsReservedName(string, replacement);
	return string;
}
function truncateByGraphemeBudget(input, budget) {
	if (input.length <= budget) return input;
	let count = 0;
	let output = "";
	for (const { segment } of getSegmenter().segment(input)) {
		const next = count + segment.length;
		if (next > budget) break;
		output += segment;
		count = next;
	}
	return output;
}
var FFMessageType;
(function(FFMessageType) {
	FFMessageType["LOAD"] = "LOAD";
	FFMessageType["EXEC"] = "EXEC";
	FFMessageType["FFPROBE"] = "FFPROBE";
	FFMessageType["WRITE_FILE"] = "WRITE_FILE";
	FFMessageType["READ_FILE"] = "READ_FILE";
	FFMessageType["DELETE_FILE"] = "DELETE_FILE";
	FFMessageType["RENAME"] = "RENAME";
	FFMessageType["CREATE_DIR"] = "CREATE_DIR";
	FFMessageType["LIST_DIR"] = "LIST_DIR";
	FFMessageType["DELETE_DIR"] = "DELETE_DIR";
	FFMessageType["ERROR"] = "ERROR";
	FFMessageType["DOWNLOAD"] = "DOWNLOAD";
	FFMessageType["PROGRESS"] = "PROGRESS";
	FFMessageType["LOG"] = "LOG";
	FFMessageType["MOUNT"] = "MOUNT";
	FFMessageType["UNMOUNT"] = "UNMOUNT";
})(FFMessageType || (FFMessageType = {}));
//#endregion
//#region ../../node_modules/.pnpm/@ffmpeg+ffmpeg@0.12.15/node_modules/@ffmpeg/ffmpeg/dist/esm/utils.js
/**
* Generate an unique message ID.
*/
var getMessageID = (() => {
	let messageID = 0;
	return () => messageID++;
})();
//#endregion
//#region ../../node_modules/.pnpm/@ffmpeg+ffmpeg@0.12.15/node_modules/@ffmpeg/ffmpeg/dist/esm/errors.js
var ERROR_NOT_LOADED = /* @__PURE__ */ new Error("ffmpeg is not loaded, call `await ffmpeg.load()` first");
var ERROR_TERMINATED = /* @__PURE__ */ new Error("called FFmpeg.terminate()");
//#endregion
//#region ../../node_modules/.pnpm/@ffmpeg+ffmpeg@0.12.15/node_modules/@ffmpeg/ffmpeg/dist/esm/classes.js
/**
* Provides APIs to interact with ffmpeg web worker.
*
* @example
* ```ts
* const ffmpeg = new FFmpeg();
* ```
*/
var FFmpeg = class {
	#worker = null;
	/**
	* #resolves and #rejects tracks Promise resolves and rejects to
	* be called when we receive message from web worker.
	*/
	#resolves = {};
	#rejects = {};
	#logEventCallbacks = [];
	#progressEventCallbacks = [];
	loaded = false;
	/**
	* register worker message event handlers.
	*/
	#registerHandlers = () => {
		if (this.#worker) this.#worker.onmessage = ({ data: { id, type, data } }) => {
			switch (type) {
				case FFMessageType.LOAD:
					this.loaded = true;
					this.#resolves[id](data);
					break;
				case FFMessageType.MOUNT:
				case FFMessageType.UNMOUNT:
				case FFMessageType.EXEC:
				case FFMessageType.FFPROBE:
				case FFMessageType.WRITE_FILE:
				case FFMessageType.READ_FILE:
				case FFMessageType.DELETE_FILE:
				case FFMessageType.RENAME:
				case FFMessageType.CREATE_DIR:
				case FFMessageType.LIST_DIR:
				case FFMessageType.DELETE_DIR:
					this.#resolves[id](data);
					break;
				case FFMessageType.LOG:
					this.#logEventCallbacks.forEach((f) => f(data));
					break;
				case FFMessageType.PROGRESS:
					this.#progressEventCallbacks.forEach((f) => f(data));
					break;
				case FFMessageType.ERROR:
					this.#rejects[id](data);
					break;
			}
			delete this.#resolves[id];
			delete this.#rejects[id];
		};
	};
	/**
	* Generic function to send messages to web worker.
	*/
	#send = ({ type, data }, trans = [], signal) => {
		if (!this.#worker) return Promise.reject(ERROR_NOT_LOADED);
		return new Promise((resolve, reject) => {
			const id = getMessageID();
			this.#worker && this.#worker.postMessage({
				id,
				type,
				data
			}, trans);
			this.#resolves[id] = resolve;
			this.#rejects[id] = reject;
			signal?.addEventListener("abort", () => {
				reject(new DOMException(`Message # ${id} was aborted`, "AbortError"));
			}, { once: true });
		});
	};
	on(event, callback) {
		if (event === "log") this.#logEventCallbacks.push(callback);
		else if (event === "progress") this.#progressEventCallbacks.push(callback);
	}
	off(event, callback) {
		if (event === "log") this.#logEventCallbacks = this.#logEventCallbacks.filter((f) => f !== callback);
		else if (event === "progress") this.#progressEventCallbacks = this.#progressEventCallbacks.filter((f) => f !== callback);
	}
	/**
	* Loads ffmpeg-core inside web worker. It is required to call this method first
	* as it initializes WebAssembly and other essential variables.
	*
	* @category FFmpeg
	* @returns `true` if ffmpeg core is loaded for the first time.
	*/
	load = ({ classWorkerURL, ...config } = {}, { signal } = {}) => {
		if (!this.#worker) {
			this.#worker = classWorkerURL ? new Worker(new URL(classWorkerURL, import.meta.url), { type: "module" }) : new Worker(new URL(
				/* @vite-ignore */
				"/assets/worker-L-9sZWGR.js",
				"" + import.meta.url
			), { type: "module" });
			this.#registerHandlers();
		}
		return this.#send({
			type: FFMessageType.LOAD,
			data: config
		}, void 0, signal);
	};
	/**
	* Execute ffmpeg command.
	*
	* @remarks
	* To avoid common I/O issues, ["-nostdin", "-y"] are prepended to the args
	* by default.
	*
	* @example
	* ```ts
	* const ffmpeg = new FFmpeg();
	* await ffmpeg.load();
	* await ffmpeg.writeFile("video.avi", ...);
	* // ffmpeg -i video.avi video.mp4
	* await ffmpeg.exec(["-i", "video.avi", "video.mp4"]);
	* const data = ffmpeg.readFile("video.mp4");
	* ```
	*
	* @returns `0` if no error, `!= 0` if timeout (1) or error.
	* @category FFmpeg
	*/
	exec = (args, timeout = -1, { signal } = {}) => this.#send({
		type: FFMessageType.EXEC,
		data: {
			args,
			timeout
		}
	}, void 0, signal);
	/**
	* Execute ffprobe command.
	*
	* @example
	* ```ts
	* const ffmpeg = new FFmpeg();
	* await ffmpeg.load();
	* await ffmpeg.writeFile("video.avi", ...);
	* // Getting duration of a video in seconds: ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 video.avi -o output.txt
	* await ffmpeg.ffprobe(["-v", "error", "-show_entries", "format=duration", "-of", "default=noprint_wrappers=1:nokey=1", "video.avi", "-o", "output.txt"]);
	* const data = ffmpeg.readFile("output.txt");
	* ```
	*
	* @returns `0` if no error, `!= 0` if timeout (1) or error.
	* @category FFmpeg
	*/
	ffprobe = (args, timeout = -1, { signal } = {}) => this.#send({
		type: FFMessageType.FFPROBE,
		data: {
			args,
			timeout
		}
	}, void 0, signal);
	/**
	* Terminate all ongoing API calls and terminate web worker.
	* `FFmpeg.load()` must be called again before calling any other APIs.
	*
	* @category FFmpeg
	*/
	terminate = () => {
		const ids = Object.keys(this.#rejects);
		for (const id of ids) {
			this.#rejects[id](ERROR_TERMINATED);
			delete this.#rejects[id];
			delete this.#resolves[id];
		}
		if (this.#worker) {
			this.#worker.terminate();
			this.#worker = null;
			this.loaded = false;
		}
	};
	/**
	* Write data to ffmpeg.wasm.
	*
	* @example
	* ```ts
	* const ffmpeg = new FFmpeg();
	* await ffmpeg.load();
	* await ffmpeg.writeFile("video.avi", await fetchFile("../video.avi"));
	* await ffmpeg.writeFile("text.txt", "hello world");
	* ```
	*
	* @category File System
	*/
	writeFile = (path, data, { signal } = {}) => {
		const trans = [];
		if (data instanceof Uint8Array) trans.push(data.buffer);
		return this.#send({
			type: FFMessageType.WRITE_FILE,
			data: {
				path,
				data
			}
		}, trans, signal);
	};
	mount = (fsType, options, mountPoint) => {
		return this.#send({
			type: FFMessageType.MOUNT,
			data: {
				fsType,
				options,
				mountPoint
			}
		}, []);
	};
	unmount = (mountPoint) => {
		return this.#send({
			type: FFMessageType.UNMOUNT,
			data: { mountPoint }
		}, []);
	};
	/**
	* Read data from ffmpeg.wasm.
	*
	* @example
	* ```ts
	* const ffmpeg = new FFmpeg();
	* await ffmpeg.load();
	* const data = await ffmpeg.readFile("video.mp4");
	* ```
	*
	* @category File System
	*/
	readFile = (path, encoding = "binary", { signal } = {}) => this.#send({
		type: FFMessageType.READ_FILE,
		data: {
			path,
			encoding
		}
	}, void 0, signal);
	/**
	* Delete a file.
	*
	* @category File System
	*/
	deleteFile = (path, { signal } = {}) => this.#send({
		type: FFMessageType.DELETE_FILE,
		data: { path }
	}, void 0, signal);
	/**
	* Rename a file or directory.
	*
	* @category File System
	*/
	rename = (oldPath, newPath, { signal } = {}) => this.#send({
		type: FFMessageType.RENAME,
		data: {
			oldPath,
			newPath
		}
	}, void 0, signal);
	/**
	* Create a directory.
	*
	* @category File System
	*/
	createDir = (path, { signal } = {}) => this.#send({
		type: FFMessageType.CREATE_DIR,
		data: { path }
	}, void 0, signal);
	/**
	* List directory contents.
	*
	* @category File System
	*/
	listDir = (path, { signal } = {}) => this.#send({
		type: FFMessageType.LIST_DIR,
		data: { path }
	}, void 0, signal);
	/**
	* Delete an empty directory.
	*
	* @category File System
	*/
	deleteDir = (path, { signal } = {}) => this.#send({
		type: FFMessageType.DELETE_DIR,
		data: { path }
	}, void 0, signal);
};
//#endregion
//#region ../../node_modules/.pnpm/@ffmpeg+ffmpeg@0.12.15/node_modules/@ffmpeg/ffmpeg/dist/esm/types.js
var FFFSType;
(function(FFFSType) {
	FFFSType["MEMFS"] = "MEMFS";
	FFFSType["NODEFS"] = "NODEFS";
	FFFSType["NODERAWFS"] = "NODERAWFS";
	FFFSType["IDBFS"] = "IDBFS";
	FFFSType["WORKERFS"] = "WORKERFS";
	FFFSType["PROXYFS"] = "PROXYFS";
})(FFFSType || (FFFSType = {}));
//#endregion
//#region ../../node_modules/.pnpm/@ffmpeg+ffmpeg@0.12.15/node_modules/@ffmpeg/ffmpeg/dist/esm/worker.js?worker&url
var worker_default = "/assets/worker-L-9sZWGR.js";
//#endregion
//#region src/services/ffmpeg-muxer.ts
function detectFmp4(data) {
	if (data.length < 8) return false;
	return String.fromCharCode(data[4], data[5], data[6], data[7]) === "ftyp";
}
function isMp4ContainerFile(fileName) {
	return /\.(m4a|m4v|mp4)$/i.test(fileName);
}
function isMp4Container(fileName, container) {
	return container ? container === "mp4" : isMp4ContainerFile(fileName);
}
function getMimeForOutputFile(fileName) {
	return /\.mkv$/i.test(fileName) ? "video/x-matroska" : "video/mp4";
}
async function writeMediaToFFmpegFS(ffmpeg, filename, data) {
	await ffmpeg.writeFile(filename, data);
}
async function writeSubtitles(ffmpeg, subtitleText) {
	if (subtitleText === void 0) return;
	await ffmpeg.writeFile("subtitles.vtt", new TextEncoder().encode(subtitleText));
}
function buildMuxArgs({ outputFileName, hasVideo, hasAudio, videoFileName = "video.ts", audioFileName = "audio.ts", videoContainer, audioContainer, subtitleText, subtitleLanguage, outputFormat }) {
	const includeSubtitles = subtitleText !== void 0;
	if (!hasVideo && !hasAudio) throw new Error("No media to mux");
	const audioNeedsAdtsToAsc = hasAudio && !isMp4Container(audioFileName, audioContainer);
	const args = ["-y"];
	if (hasVideo) args.push("-i", videoFileName);
	if (hasAudio) args.push("-i", audioFileName);
	if (includeSubtitles) args.push("-i", "subtitles.vtt");
	if (hasVideo && hasAudio) {
		args.push("-map", "0:v:0", "-map", "1:a:0?");
		if (includeSubtitles) args.push("-map", "2:s:0");
		args.push("-c:v", "copy", "-c:a", "copy");
		if (audioNeedsAdtsToAsc) args.push("-bsf:a", "aac_adtstoasc");
	} else if (hasVideo) {
		args.push("-map", "0:v", "-map", "0:a?", "-c", "copy");
		if (includeSubtitles) args.push("-map", "1:s:0", "-c:s", "webvtt");
	} else if (hasAudio) {
		args.push("-map", "0:a:0", "-c:a", "aac", "-b:a", "192k", "-af", "aresample=async=1:first_pts=0");
		if (includeSubtitles) args.push("-map", "1:s:0");
	}
	if (includeSubtitles) {
		args.push("-c:s", "webvtt");
		args.push("-metadata:s:s:0", `language=${subtitleLanguage || "und"}`);
	}
	if (hasVideo && hasAudio) args.push("-shortest");
	if (outputFormat) args.push("-f", outputFormat);
	args.push(outputFileName);
	return args;
}
async function muxExec({ ffmpeg, cleanupFileNames = [], ...request }) {
	const { outputFileName, hasVideo, hasAudio, videoFileName = "video.ts", audioFileName = "audio.ts", subtitleText } = request;
	const includeSubtitles = subtitleText !== void 0;
	await writeSubtitles(ffmpeg, subtitleText);
	const args = buildMuxArgs(request);
	try {
		const exitCode = await ffmpeg.exec(args);
		if (exitCode !== 0) throw new Error(`FFmpeg exited with code ${exitCode}`);
		const data = await ffmpeg.readFile(outputFileName);
		const mime = getMimeForOutputFile(outputFileName);
		const source = typeof data === "string" ? new TextEncoder().encode(data) : data;
		const bytes = new Uint8Array(source.byteLength);
		bytes.set(source);
		return {
			blob: new Blob([bytes.buffer], { type: mime }),
			mime
		};
	} finally {
		const cleanupFiles = [
			hasVideo ? videoFileName : null,
			hasAudio ? audioFileName : null,
			includeSubtitles ? "subtitles.vtt" : null,
			outputFileName,
			...cleanupFileNames
		].filter((fileName) => fileName !== null);
		for (const fileName of cleanupFiles) try {
			await ffmpeg.deleteFile(fileName);
		} catch (_e) {}
	}
}
//#endregion
//#region src/workers/disk-mux-worker.ts?worker&url
var disk_mux_worker_default = "/assets/disk-mux-worker-WR13xe1v.js";
//#endregion
//#region src/services/opfs-storage.ts
var OPFS_BACKEND = "opfs-v1";
var LEGACY_BACKEND = "indexeddb-v1";
var ROOT_DIRECTORY = "hls-downloader";
var VERSION_DIRECTORY = "v1";
var JOBS_DIRECTORY = "jobs";
var EXPORTS_DIRECTORY = "exports";
function fragmentFileName(index) {
	return `${String(index).padStart(9, "0")}.part`;
}
function getStorageManager() {
	const storage = globalThis.navigator?.storage;
	if (!storage?.getDirectory) throw new Error("This browser cannot use disk-backed downloads. Upgrade to Firefox 115 or Chromium 109.");
	return storage;
}
async function getVersionDirectory() {
	return await (await (await getStorageManager().getDirectory()).getDirectoryHandle(ROOT_DIRECTORY, { create: true })).getDirectoryHandle(VERSION_DIRECTORY, { create: true });
}
async function getJobsDirectory(create = true) {
	return await (await getVersionDirectory()).getDirectoryHandle(JOBS_DIRECTORY, { create });
}
async function getExportsDirectory(create = true) {
	return await (await getVersionDirectory()).getDirectoryHandle(EXPORTS_DIRECTORY, { create });
}
async function getJobDirectory(storageKey, create = true) {
	return await (await getJobsDirectory(create)).getDirectoryHandle(storageKey, { create });
}
async function getTrackDirectory(storageKey, track, create = true) {
	return await (await getJobDirectory(storageKey, create)).getDirectoryHandle(track, { create });
}
async function initializeJobStorage(storageKey) {
	await Promise.all([getTrackDirectory(storageKey, "video", true), getTrackDirectory(storageKey, "audio", true)]);
}
async function getExistingFileSize(directory, name) {
	try {
		return (await (await directory.getFileHandle(name)).getFile()).size;
	} catch (error) {
		if (error?.name === "NotFoundError") return;
		throw error;
	}
}
async function writeFragmentFile(storageKey, track, index, data) {
	const directory = await getTrackDirectory(storageKey, track, true);
	const name = fragmentFileName(index);
	const previousSize = await getExistingFileSize(directory, name);
	const writable = await (await directory.getFileHandle(name, { create: true })).createWritable();
	try {
		await writable.write(new Uint8Array(data));
		await writable.close();
	} catch (error) {
		try {
			await writable.abort(error);
		} catch (_abortError) {}
		throw error;
	}
	return {
		previousSize,
		size: data.byteLength
	};
}
async function deleteJobStorage(storageKey) {
	try {
		await (await getJobsDirectory(false)).removeEntry(storageKey, { recursive: true });
	} catch (error) {
		if (error?.name !== "NotFoundError") throw error;
	}
}
async function measureJobStorage(storageKey) {
	let storedBytes = 0;
	let storedChunks = 0;
	for (const track of ["video", "audio"]) try {
		const directory = await getTrackDirectory(storageKey, track, false);
		for await (const [_name, handle] of directory.entries()) {
			if (handle.kind !== "file") continue;
			const file = await handle.getFile();
			storedBytes += file.size;
			storedChunks++;
		}
	} catch (error) {
		if (error?.name !== "NotFoundError") throw error;
	}
	return {
		storedBytes,
		storedChunks
	};
}
async function clearAllJobStorage() {
	try {
		await (await getVersionDirectory()).removeEntry(JOBS_DIRECTORY, { recursive: true });
	} catch (error) {
		if (error?.name !== "NotFoundError") throw error;
	}
}
async function getExportHandle(exportId, create = false) {
	return await (await getExportsDirectory(create)).getFileHandle(exportId, { create });
}
async function getExportFile(exportId) {
	return await (await getExportHandle(exportId, false)).getFile();
}
async function deleteExportFile(exportId) {
	try {
		await (await getExportsDirectory(false)).removeEntry(exportId);
	} catch (error) {
		if (error?.name !== "NotFoundError") throw error;
	}
}
async function listExportIds() {
	try {
		const exportsDirectory = await getExportsDirectory(false);
		const ids = [];
		for await (const [name, handle] of exportsDirectory.entries()) if (handle.kind === "file") ids.push(name);
		return ids;
	} catch (error) {
		if (error?.name === "NotFoundError") return [];
		throw error;
	}
}
//#endregion
//#region src/services/disk-mux-client.ts
var inFlight = /* @__PURE__ */ new Map();
var muxQueue = Promise.resolve();
function randomId$1() {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}
function getRuntimeURL(path) {
	const runtime = globalThis.chrome?.runtime ?? globalThis.browser?.runtime;
	if (runtime?.getURL) return runtime.getURL(path);
	return new URL(`/${path}`, globalThis.location?.href ?? "http://localhost").href;
}
function getWorkerURL() {
	if (/^(blob:|data:|https?:|moz-extension:|chrome-extension:)/.test("/assets/disk-mux-worker-WR13xe1v.js")) return disk_mux_worker_default;
	return getRuntimeURL(disk_mux_worker_default.replace(/^\/+/, ""));
}
function hashText(value) {
	if (!value) return "none";
	let hash = 2166136261;
	for (let index = 0; index < value.length; index++) {
		hash ^= value.charCodeAt(index);
		hash = Math.imul(hash, 16777619);
	}
	return (hash >>> 0).toString(16);
}
function muxKey(options) {
	return [
		options.storageKey,
		options.container,
		hashText(options.subtitleText),
		options.subtitleLanguage ?? ""
	].join(":");
}
async function runWorker(options, listeners, signal) {
	if (signal.aborted) throw new DOMException("Finalization was cancelled", "AbortError");
	if (typeof Worker === "undefined") throw new Error("Dedicated workers are unavailable in this browser");
	const requestId = randomId$1();
	const outputContainer = options.subtitleText !== void 0 ? "mkv" : options.container;
	const exportId = `${randomId$1()}.${outputContainer}`;
	const worker = new Worker(getWorkerURL(), {
		type: "module",
		name: "hls-downloader-disk-mux"
	});
	const abort = () => {
		worker.terminate();
	};
	let rejectCancelled = () => void 0;
	let completed = false;
	signal.addEventListener("abort", abort, { once: true });
	try {
		const result = await new Promise((resolve, reject) => {
			rejectCancelled = () => reject(new DOMException("Finalization was cancelled", "AbortError"));
			signal.addEventListener("abort", rejectCancelled, { once: true });
			worker.onerror = (event) => {
				reject(new Error(event.message || "The mux worker crashed"));
			};
			worker.onmessage = ({ data }) => {
				if (!data || data.requestId !== requestId) return;
				if (data.type === "progress") {
					for (const listener of listeners) try {
						listener(data.progress, data.message);
					} catch (error) {
						console.warn("[mux] progress listener failed", error);
					}
					return;
				}
				if (data.type === "failure") {
					reject(new Error(data.message));
					return;
				}
				resolve(data);
			};
			const request = {
				type: "mux",
				requestId,
				coreURL: getRuntimeURL("assets/ffmpeg/ffmpeg-core.js"),
				wasmURL: getRuntimeURL("assets/ffmpeg/ffmpeg-core.wasm"),
				exportId,
				...options
			};
			worker.postMessage(request);
		}).finally(() => {
			signal.removeEventListener("abort", rejectCancelled);
		});
		completed = true;
		return result;
	} finally {
		signal.removeEventListener("abort", abort);
		worker.terminate();
		if (!completed) await deleteExportFile(exportId).catch(() => void 0);
	}
}
function muxDiskBackedMedia(options, onProgress) {
	const key = muxKey(options);
	const existing = inFlight.get(key);
	if (existing) {
		if (onProgress) existing.listeners.add(onProgress);
		return existing.promise;
	}
	const listeners = /* @__PURE__ */ new Set();
	if (onProgress) listeners.add(onProgress);
	const controller = new AbortController();
	let started = false;
	const promise = muxQueue.then(() => {
		if (controller.signal.aborted) throw new DOMException("Finalization was cancelled", "AbortError");
		started = true;
		return runWorker(options, listeners, controller.signal);
	});
	muxQueue = promise.then(() => void 0, () => void 0);
	const active = {
		promise,
		listeners,
		storageKey: options.storageKey,
		controller,
		hasStarted: () => started
	};
	inFlight.set(key, active);
	const cleanup = () => {
		if (inFlight.get(key) === active) inFlight.delete(key);
	};
	promise.then(cleanup, cleanup);
	return promise;
}
async function cancelDiskBackedMux(storageKey) {
	const active = [...inFlight.values()].filter((entry) => entry.storageKey === storageKey);
	for (const entry of active) entry.controller.abort();
	await Promise.allSettled(active.filter((entry) => entry.hasStarted()).map((entry) => entry.promise));
}
//#endregion
//#region src/services/disk-backed-fs.ts
var chromeApi = globalThis.chrome;
var browserApi = import_browser_polyfill.default ?? globalThis.browser ?? chromeApi;
var BUCKET_META_KEY = "bucketMeta";
var DOWNLOAD_LEASES_KEY = "downloadArtifactLeases";
var SUBTITLE_DB_NAME = "subtitles";
var SUBTITLE_STORE_NAME = "subtitles";
var CHUNKS_STORE_NAME = "chunks";
var MINIMUM_FREE_MARGIN = 256 * 1024 * 1024;
var buckets = {};
var fragmentWriteQueues = /* @__PURE__ */ new Map();
var pendingJobWrites = /* @__PURE__ */ new Map();
var deletedStorageKeys = /* @__PURE__ */ new Set();
var artifactUrls = /* @__PURE__ */ new Map();
var bucketMetaCache = null;
var bucketMetaMutationQueue = Promise.resolve();
var subtitlesDbPromise = null;
var leaseCache = null;
var leaseMutationQueue = Promise.resolve();
var downloadListenerInstalled = false;
var pendingDownloadFilenames = /* @__PURE__ */ new Map();
var offscreenCreation = null;
var storagePolicyOwner;
var storagePolicyPromise = null;
function randomId() {
	return globalThis.crypto?.randomUUID?.() ?? `${Date.now()}-${Math.floor(Math.random() * 1e9)}`;
}
function getStorageArea() {
	return browserApi?.storage?.local ?? chromeApi?.storage?.local;
}
function getDownloadsApi() {
	return browserApi?.downloads ?? chromeApi?.downloads;
}
function hasUnlimitedStoragePermission() {
	try {
		return (((browserApi?.runtime ?? chromeApi?.runtime)?.getManifest?.())?.permissions ?? []).includes("unlimitedStorage");
	} catch (_error) {
		return false;
	}
}
function isFirefoxRuntime() {
	return typeof globalThis.browser?.runtime?.getBrowserInfo === "function" || /Firefox\//i.test(globalThis.navigator?.userAgent ?? "");
}
function setStoragePolicyOwner(storage) {
	if (storagePolicyOwner !== storage) {
		storagePolicyOwner = storage;
		storagePolicyPromise = null;
	}
}
function initializeStoragePolicy() {
	const storage = globalThis.navigator?.storage;
	if (!storage) return Promise.resolve(void 0);
	setStoragePolicyOwner(storage);
	if (storagePolicyPromise) return storagePolicyPromise;
	storagePolicyPromise = (async () => {
		let persisted;
		if (typeof storage.persisted === "function") try {
			persisted = await storage.persisted();
		} catch (error) {
			console.warn("[storage] navigator.storage.persisted failed", error);
		}
		if (persisted === true || typeof storage.persist !== "function") return persisted;
		try {
			return await storage.persist();
		} catch (error) {
			console.warn("[storage] navigator.storage.persist failed", error);
			return persisted;
		}
	})();
	return storagePolicyPromise;
}
async function getStoragePersistenceStatus() {
	const storage = globalThis.navigator?.storage;
	if (!storage) return;
	setStoragePolicyOwner(storage);
	if (storagePolicyPromise) return await storagePolicyPromise;
	if (typeof storage.persisted !== "function") return;
	try {
		return await storage.persisted();
	} catch (error) {
		console.warn("[storage] navigator.storage.persisted failed", error);
		return;
	}
}
function getExtensionURL(path) {
	if (/^(blob:|data:|https?:|moz-extension:|chrome-extension:)/.test(path)) return path;
	const runtime = browserApi?.runtime ?? chromeApi?.runtime;
	if (runtime?.getURL) return runtime.getURL(path.replace(/^\/+/, ""));
	return new URL(path, globalThis.location?.href ?? "http://localhost").href;
}
async function loadBucketMetaCache() {
	if (bucketMetaCache) return bucketMetaCache;
	const storageArea = getStorageArea();
	bucketMetaCache = (storageArea ? await storageArea.get(BUCKET_META_KEY) : {})?.[BUCKET_META_KEY] ?? {};
	return bucketMetaCache;
}
async function mutateBucketMeta(mutate) {
	const operation = bucketMetaMutationQueue.then(async () => {
		const cache = { ...await loadBucketMetaCache() };
		mutate(cache);
		bucketMetaCache = cache;
		const storageArea = getStorageArea();
		if (storageArea) await storageArea.set({ [BUCKET_META_KEY]: cache });
	});
	bucketMetaMutationQueue = operation.catch(() => void 0);
	await operation;
}
async function setBucketMeta(id, meta) {
	await mutateBucketMeta((cache) => {
		cache[id] = meta;
	});
}
async function updateBucketUsage(id, bytesDelta, chunksDelta) {
	await mutateBucketMeta((cache) => {
		const current = cache[id];
		if (!current) throw new Error(`Bucket metadata for ${id} was not found`);
		cache[id] = {
			...current,
			bytesWritten: Math.max(0, (current.bytesWritten ?? 0) + bytesDelta),
			storedChunks: Math.max(0, (current.storedChunks ?? 0) + chunksDelta),
			updatedAt: Date.now()
		};
	});
}
async function deleteBucketMeta(id) {
	await mutateBucketMeta((cache) => {
		delete cache[id];
	});
}
async function getBucketMeta(id) {
	return (await loadBucketMetaCache())[id];
}
async function getSubtitlesDb() {
	if (!subtitlesDbPromise) {
		const opening = openDB(SUBTITLE_DB_NAME, 1, {
			upgrade(db) {
				db.createObjectStore(SUBTITLE_STORE_NAME, { keyPath: "id" });
			},
			blocking() {
				opening.then((db) => db.close()).catch(() => void 0);
				if (subtitlesDbPromise === opening) subtitlesDbPromise = null;
			},
			terminated() {
				if (subtitlesDbPromise === opening) subtitlesDbPromise = null;
			}
		});
		subtitlesDbPromise = opening;
		opening.catch(() => {
			if (subtitlesDbPromise === opening) subtitlesDbPromise = null;
		});
	}
	return subtitlesDbPromise;
}
async function deleteSubtitlesDb() {
	await (await getSubtitlesDb()).clear(SUBTITLE_STORE_NAME);
}
async function setSubtitleText(id, subtitle) {
	await (await getSubtitlesDb()).put(SUBTITLE_STORE_NAME, {
		...subtitle,
		id
	});
}
async function getSubtitleText(id) {
	const record = await (await getSubtitlesDb()).get(SUBTITLE_STORE_NAME, id);
	return record ? {
		text: record.text,
		language: record.language,
		name: record.name
	} : void 0;
}
async function deleteSubtitleText(id) {
	await (await getSubtitlesDb()).delete(SUBTITLE_STORE_NAME, id);
}
async function estimateSubtitlesBytes() {
	try {
		const tx = (await getSubtitlesDb()).transaction(SUBTITLE_STORE_NAME, "readonly");
		const encoder = new TextEncoder();
		let total = 0;
		let cursor = await tx.objectStore(SUBTITLE_STORE_NAME).openCursor();
		while (cursor) {
			const record = cursor.value;
			total += encoder.encode(record.text ?? "").byteLength;
			total += encoder.encode(record.language ?? "").byteLength;
			total += encoder.encode(record.name ?? "").byteLength;
			cursor = await cursor.continue();
		}
		await tx.done;
		return total;
	} catch (_error) {
		return 0;
	}
}
async function getStorageEstimate() {
	const storage = globalThis.navigator?.storage;
	const persisted = await getStoragePersistenceStatus();
	const quotaExempt = hasUnlimitedStoragePermission() && !isFirefoxRuntime();
	const policy = {
		persisted,
		quotaExempt,
		quotaIsAdvisory: quotaExempt || persisted === true
	};
	if (storage?.estimate) try {
		const estimate = await storage.estimate();
		const usage = typeof estimate.usage === "number" ? estimate.usage : void 0;
		const quota = typeof estimate.quota === "number" ? estimate.quota : void 0;
		return {
			usage,
			quota,
			available: usage !== void 0 && quota !== void 0 ? Math.max(0, quota - usage) : void 0,
			...policy,
			source: "navigator"
		};
	} catch (error) {
		console.warn("[storage] navigator.storage.estimate failed", error);
	}
	return {
		...policy,
		source: "fallback"
	};
}
async function measureLegacyBucketUsage(id) {
	let db;
	try {
		db = await openDB(id, 1);
		const tx = db.transaction(CHUNKS_STORE_NAME, "readonly");
		let cursor = await tx.objectStore(CHUNKS_STORE_NAME).openCursor();
		let storedBytes = 0;
		let storedChunks = 0;
		while (cursor) {
			storedBytes += cursor.value.data?.byteLength ?? 0;
			storedChunks++;
			cursor = await cursor.continue();
		}
		await tx.done;
		return {
			storedBytes,
			storedChunks
		};
	} catch (_error) {
		return {
			storedBytes: 0,
			storedChunks: 0
		};
	} finally {
		db?.close();
	}
}
var FFmpegSingleton = class FFmpegSingleton {
	static {
		this.instance = null;
	}
	static async getInstance() {
		if (!FFmpegSingleton.instance) {
			const ffmpeg = new FFmpeg();
			await ffmpeg.load({
				coreURL: "/assets/ffmpeg/ffmpeg-core.js",
				wasmURL: "/assets/ffmpeg/ffmpeg-core.wasm",
				classWorkerURL: getExtensionURL(worker_default)
			});
			FFmpegSingleton.instance = ffmpeg;
		}
		return FFmpegSingleton.instance;
	}
	static terminate() {
		FFmpegSingleton.instance?.terminate?.();
		FFmpegSingleton.instance = null;
	}
};
function createObjectURLArtifact(data, exportId, mime) {
	const existingUrl = artifactUrls.get(exportId);
	if (existingUrl) return {
		url: existingUrl,
		exportId,
		mime,
		size: data.size
	};
	if (typeof URL?.createObjectURL !== "function") throw new Error("Object URLs are unavailable in this browser context");
	const url = URL.createObjectURL(data);
	artifactUrls.set(exportId, url);
	return {
		url,
		exportId,
		mime,
		size: data.size
	};
}
async function releaseArtifactLocal(artifact) {
	const url = artifactUrls.get(artifact.exportId) ?? artifact.url;
	if (url.startsWith("blob:") && typeof URL?.revokeObjectURL === "function") URL.revokeObjectURL(url);
	artifactUrls.delete(artifact.exportId);
	if (!artifact.exportId.startsWith("legacy-")) await deleteExportFile(artifact.exportId);
}
var IndexedDBBucket = class {
	constructor(videoLength, audioLength, id) {
		this.videoLength = videoLength;
		this.audioLength = audioLength;
		this.id = id;
		this.backend = LEGACY_BACKEND;
		this.objectStoreName = CHUNKS_STORE_NAME;
		this.isDeleted = false;
		const base = id.endsWith(".mp4") ? id.slice(0, -4) : id;
		this.fileName = (filenamify(base) ?? "file").normalize("NFC");
	}
	async openDB() {
		if (this.isDeleted) throw new Error("Cannot open: bucket was deleted");
		const objectStoreName = this.objectStoreName;
		this.db = await openDB(this.id, 1, { upgrade(db) {
			db.createObjectStore(objectStoreName, {
				keyPath: "id",
				autoIncrement: true
			}).createIndex("index", "index", { unique: true });
		} });
	}
	async ensureDb() {
		if (this.isDeleted) throw new Error("Cannot access: bucket was deleted");
		if (!this.db) await this.openDB();
	}
	async deleteStorage() {
		if (this.db) {
			this.db.close();
			this.db = void 0;
		}
		this.isDeleted = true;
		await deleteDB(this.id);
	}
	async deleteDB() {
		await this.deleteStorage();
	}
	async write(index, data) {
		await this.ensureDb();
		await this.db.add(this.objectStoreName, {
			data: new Uint8Array(data),
			index
		});
		await updateBucketUsage(this.id, data.byteLength, 1);
	}
	async stream() {
		await this.ensureDb();
		let cursor = await this.db.transaction(this.objectStoreName).objectStore(this.objectStoreName).index("index").openCursor();
		let first = true;
		return new ReadableStream({ pull(controller) {
			async function push(current) {
				if (!current) {
					controller.close();
					return;
				}
				controller.enqueue(current.value.data);
				await push(await current.continue());
			}
			if (first) {
				first = false;
				push(cursor);
			}
		} });
	}
	async prepareDownload(onProgress, options = {}) {
		await this.ensureDb();
		const payload = {
			bucketId: this.id,
			backend: LEGACY_BACKEND,
			videoLength: this.videoLength,
			audioLength: this.audioLength,
			container: options.container ?? "mp4"
		};
		if (shouldUseOffscreen()) return await requestPrepareDownloadOffscreen(payload, onProgress);
		return await this.prepareLegacyDownloadLocal(payload.container, onProgress);
	}
	async prepareLegacyDownloadLocal(container, onProgress) {
		onProgress?.(0, "Finalizing a legacy download; re-download if memory is insufficient");
		const blob = await this.streamToMediaBlob(container, onProgress);
		return createObjectURLArtifact(blob, `legacy-${randomId()}`, blob.type || "video/mp4");
	}
	async streamToMediaBlob(container, onProgress) {
		await this.ensureDb();
		const ffmpeg = await FFmpegSingleton.getInstance();
		const subtitle = await getSubtitleText(this.id);
		const outputFileName = `output.${subtitle !== void 0 ? "mkv" : container}`;
		let videoInput;
		let audioInput;
		try {
			if (this.videoLength > 0) videoInput = await this.writeChunksToFFmpegInput(ffmpeg, "video", 0, this.videoLength);
			if (this.audioLength > 0) audioInput = await this.writeChunksToFFmpegInput(ffmpeg, "audio", this.videoLength, this.audioLength);
			const result = await muxExec({
				ffmpeg,
				outputFileName,
				hasVideo: this.videoLength > 0,
				hasAudio: this.audioLength > 0,
				videoFileName: videoInput?.fileName,
				audioFileName: audioInput?.fileName,
				videoContainer: videoInput?.container,
				audioContainer: audioInput?.container,
				cleanupFileNames: [...videoInput?.cleanupFileNames ?? [], ...audioInput?.cleanupFileNames ?? []],
				subtitleText: subtitle?.text,
				subtitleLanguage: subtitle?.language
			});
			onProgress?.(1, "Ready to download");
			return result.blob;
		} catch (error) {
			const detail = error instanceof Error ? error.message : String(error);
			throw new Error(`Legacy muxing failed: ${detail}. Re-download this item with the current extension version.`);
		}
	}
	async readChunkByIndex(chunkIndex) {
		return (await this.db.transaction(this.objectStoreName, "readonly").objectStore(this.objectStoreName).index("index").get(chunkIndex))?.data ?? null;
	}
	async writeChunksToFFmpegInput(ffmpeg, prefix, startIndex, length) {
		const chunkFiles = [];
		let container;
		for (let index = 0; index < length; index++) {
			const chunk = await this.readChunkByIndex(startIndex + index);
			if (!chunk) throw new Error(`Missing ${prefix} fragment ${index}`);
			if (!container) container = detectFmp4(chunk) ? "mp4" : "mpegts";
			const extension = container === "mp4" ? "mp4" : "ts";
			const fileName = length === 1 ? `${prefix}.${extension}` : `${prefix}-${String(index).padStart(6, "0")}.${extension}`;
			await writeMediaToFFmpegFS(ffmpeg, fileName, chunk);
			chunkFiles.push(fileName);
		}
		if (!container || chunkFiles.length === 0) throw new Error(`No ${prefix} fragments are available`);
		if (chunkFiles.length === 1) return {
			fileName: chunkFiles[0],
			container,
			cleanupFileNames: []
		};
		const listFileName = `${prefix}.concat.txt`;
		await ffmpeg.writeFile(listFileName, new TextEncoder().encode(`${chunkFiles.join("\n")}\n`));
		return {
			fileName: `concatf:${listFileName}`,
			container,
			cleanupFileNames: [listFileName, ...chunkFiles]
		};
	}
};
var OPFSBucket = class {
	constructor(videoLength, audioLength, id, storageKey) {
		this.videoLength = videoLength;
		this.audioLength = audioLength;
		this.id = id;
		this.storageKey = storageKey;
		this.backend = OPFS_BACKEND;
		this.isDeleted = false;
	}
	async write(index, data) {
		if (this.isDeleted || deletedStorageKeys.has(this.storageKey)) throw new Error("Cannot write: bucket was deleted");
		if (!Number.isInteger(index) || index < 0) throw new Error(`Invalid fragment index ${index}`);
		if (index >= this.videoLength + this.audioLength) throw new Error(`Fragment index ${index} is outside bucket ${this.id}`);
		const track = index < this.videoLength ? "video" : "audio";
		const localIndex = track === "video" ? index : index - this.videoLength;
		const queueKey = `${this.storageKey}:${track}:${localIndex}`;
		const operation = (fragmentWriteQueues.get(queueKey) ?? Promise.resolve()).then(async () => {
			const result = await writeFragmentFile(this.storageKey, track, localIndex, data);
			await updateBucketUsage(this.id, result.size - (result.previousSize ?? 0), result.previousSize === void 0 ? 1 : 0);
		});
		const queued = operation.catch(() => void 0);
		fragmentWriteQueues.set(queueKey, queued);
		trackJobWrite(this.storageKey, operation);
		try {
			await operation;
		} catch (error) {
			if (error?.name === "QuotaExceededError") throw new Error("Not enough disk space to store this fragment");
			throw error;
		} finally {
			if (fragmentWriteQueues.get(queueKey) === queued) fragmentWriteQueues.delete(queueKey);
		}
	}
	async deleteStorage() {
		this.isDeleted = true;
		await deleteOpfsStorageSafely(this.storageKey);
	}
	async prepareDownload(onProgress, options = {}) {
		if (this.isDeleted || deletedStorageKeys.has(this.storageKey)) throw new Error("Cannot finalize: bucket was deleted");
		const meta = await getBucketMeta(this.id);
		if (!meta) throw new Error(`Cannot finalize: metadata for ${this.id} was not found`);
		const usage = await measureJobStorage(this.storageKey);
		const expectedChunks = this.videoLength + this.audioLength;
		if (usage.storedChunks !== expectedChunks) throw new Error(`Cannot finalize: expected ${expectedChunks} fragments but found ${usage.storedChunks}. Re-download this item.`);
		await setBucketMeta(this.id, {
			...meta,
			bytesWritten: usage.storedBytes,
			storedChunks: usage.storedChunks,
			updatedAt: Date.now()
		});
		const storedBytes = usage.storedBytes;
		const estimate = await getStorageEstimate();
		const required = storedBytes + Math.max(MINIMUM_FREE_MARGIN, Math.ceil(storedBytes * .1));
		if (!estimate.quotaIsAdvisory && estimate.available !== void 0 && estimate.available < required) throw new Error(`Not enough disk space to finalize this download. Free at least ${formatBytes(required - estimate.available)} and try again.`);
		onProgress?.(0, "Checking disk-backed fragments");
		const payload = {
			bucketId: this.id,
			backend: OPFS_BACKEND,
			storageKey: this.storageKey,
			videoLength: this.videoLength,
			audioLength: this.audioLength,
			container: options.container ?? "mp4"
		};
		if (shouldUseOffscreen()) return await requestPrepareDownloadOffscreen(payload, onProgress);
		return await prepareDownloadInCurrentContext(payload, onProgress);
	}
};
function trackJobWrite(storageKey, operation) {
	const writes = pendingJobWrites.get(storageKey) ?? /* @__PURE__ */ new Set();
	writes.add(operation);
	pendingJobWrites.set(storageKey, writes);
	const remove = () => {
		writes.delete(operation);
		if (writes.size === 0) pendingJobWrites.delete(storageKey);
	};
	operation.then(remove, remove);
}
async function deleteOpfsStorageSafely(storageKey) {
	deletedStorageKeys.add(storageKey);
	try {
		await cancelDiskMuxForStorage(storageKey);
		const writes = pendingJobWrites.get(storageKey);
		if (writes?.size) await Promise.allSettled([...writes]);
		await deleteJobStorage(storageKey);
	} finally {
		deletedStorageKeys.delete(storageKey);
	}
}
function formatBytes(bytes) {
	if (bytes < 1024 * 1024 * 1024) return `${Math.ceil(bytes / (1024 * 1024))} MiB`;
	return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GiB`;
}
async function prepareDownloadInCurrentContext(payload, onProgress) {
	if (payload.backend === "indexeddb-v1") return await new IndexedDBBucket(payload.videoLength, payload.audioLength, payload.bucketId).prepareLegacyDownloadLocal(payload.container, onProgress);
	if (!payload.storageKey) throw new Error("Disk-backed bucket metadata is incomplete");
	const subtitle = await getSubtitleText(payload.bucketId);
	const result = await muxDiskBackedMedia({
		storageKey: payload.storageKey,
		videoLength: payload.videoLength,
		audioLength: payload.audioLength,
		container: payload.container,
		subtitleText: subtitle?.text,
		subtitleLanguage: subtitle?.language
	}, onProgress);
	try {
		return createObjectURLArtifact(await getExportFile(result.exportId), result.exportId, result.mime);
	} catch (error) {
		await deleteExportFile(result.exportId).catch(() => void 0);
		throw error;
	}
}
function prepareTextDownloadInCurrentContext(text, mime) {
	return createObjectURLArtifact(new Blob([text], { type: mime }), `legacy-text-${randomId()}`, mime);
}
var cleanup = async () => {
	const meta = await loadBucketMetaCache();
	for (const [id, bucketMeta] of Object.entries(meta)) try {
		if (buckets[id]) await buckets[id].deleteStorage();
		else if (bucketMeta.backend === "opfs-v1" && bucketMeta.storageKey) await deleteOpfsStorageSafely(bucketMeta.storageKey);
		else await deleteDB(id);
	} catch (_error) {}
	await clearAllJobStorage().catch(() => void 0);
	bucketMetaCache = {};
	const storageArea = getStorageArea();
	if (storageArea) await storageArea.set({ [BUCKET_META_KEY]: {} });
	for (const id of Object.keys(buckets)) delete buckets[id];
	FFmpegSingleton.terminate();
	await deleteSubtitlesDb().catch((error) => console.warn("[hls-debug] subtitle store cleanup failed", error));
};
var createBucket = async (id, videoLength, audioLength) => {
	await initializeStoragePolicy();
	const previous = await getBucketMeta(id);
	if (buckets[id]) {
		await buckets[id].deleteStorage().catch(() => void 0);
		delete buckets[id];
	} else if (previous?.backend === "opfs-v1" && previous.storageKey) await deleteOpfsStorageSafely(previous.storageKey).catch(() => void 0);
	else if (previous) await deleteDB(id).catch(() => void 0);
	const storageKey = randomId();
	await initializeJobStorage(storageKey);
	try {
		await setBucketMeta(id, {
			backend: OPFS_BACKEND,
			storageKey,
			videoLength,
			audioLength,
			bytesWritten: 0,
			storedChunks: 0,
			updatedAt: Date.now()
		});
	} catch (error) {
		await deleteJobStorage(storageKey).catch(() => void 0);
		throw error;
	}
	buckets[id] = new OPFSBucket(videoLength, audioLength, id, storageKey);
};
var deleteBucket = async (id) => {
	const meta = await getBucketMeta(id);
	try {
		const bucket = buckets[id];
		if (bucket) await bucket.deleteStorage();
		else if (meta?.backend === "opfs-v1" && meta.storageKey) await deleteOpfsStorageSafely(meta.storageKey);
		else await deleteDB(id);
	} finally {
		delete buckets[id];
		await deleteBucketMeta(id).catch(() => void 0);
		await deleteSubtitleText(id).catch(() => void 0);
	}
};
var getBucket = async (id) => {
	if (buckets[id]) return buckets[id];
	const meta = await getBucketMeta(id);
	if (!meta) return;
	const bucket = meta.backend === "opfs-v1" && meta.storageKey ? new OPFSBucket(meta.videoLength, meta.audioLength, id, meta.storageKey) : new IndexedDBBucket(meta.videoLength, meta.audioLength, id);
	buckets[id] = bucket;
	return bucket;
};
var getStorageStats = async () => {
	const meta = await loadBucketMetaCache();
	const bucketStats = [];
	for (const [id, bucketMeta] of Object.entries(meta)) {
		let storedBytes = bucketMeta.bytesWritten;
		let storedChunks = bucketMeta.storedChunks;
		if (storedBytes === void 0 || storedChunks === void 0) {
			const measured = bucketMeta.backend === "opfs-v1" && bucketMeta.storageKey ? await measureJobStorage(bucketMeta.storageKey) : await measureLegacyBucketUsage(id);
			storedBytes = measured.storedBytes;
			storedChunks = measured.storedChunks;
			await setBucketMeta(id, {
				...bucketMeta,
				bytesWritten: storedBytes,
				storedChunks,
				updatedAt: Date.now()
			});
		}
		bucketStats.push({
			id,
			videoLength: bucketMeta.videoLength,
			audioLength: bucketMeta.audioLength,
			storedBytes,
			storedChunks,
			updatedAt: bucketMeta.updatedAt
		});
	}
	return {
		buckets: bucketStats,
		subtitlesBytes: await estimateSubtitlesBytes(),
		estimate: await getStorageEstimate()
	};
};
async function loadLeaseCache() {
	if (leaseCache) return leaseCache;
	const storageArea = getStorageArea();
	leaseCache = (storageArea ? await storageArea.get(DOWNLOAD_LEASES_KEY) : {})?.[DOWNLOAD_LEASES_KEY] ?? {};
	return leaseCache;
}
async function mutateLeases(mutate) {
	const operation = leaseMutationQueue.then(async () => {
		const cache = { ...await loadLeaseCache() };
		mutate(cache);
		leaseCache = cache;
		const storageArea = getStorageArea();
		if (storageArea) await storageArea.set({ [DOWNLOAD_LEASES_KEY]: cache });
	});
	leaseMutationQueue = operation.catch(() => void 0);
	await operation;
}
async function releaseArtifact(artifact) {
	if (shouldUseOffscreen()) await requestReleaseArtifactOffscreen(artifact);
	else await releaseArtifactLocal(artifact);
}
async function completeLease(downloadId) {
	let artifact;
	let hasOtherLease = false;
	await mutateLeases((cache) => {
		const lease = cache[String(downloadId)];
		if (!lease) return;
		artifact = lease.artifact;
		delete cache[String(downloadId)];
		hasOtherLease = Object.values(cache).some((candidate) => candidate.artifact.exportId === lease.artifact.exportId);
	});
	if (artifact && !hasOtherLease) await releaseArtifact(artifact);
}
function installDownloadListener() {
	if (downloadListenerInstalled) return;
	const downloadsApi = getDownloadsApi();
	if (!downloadsApi?.onChanged?.addListener) return;
	downloadsApi.onChanged.addListener((delta) => {
		const state = delta.state?.current;
		if (state === "complete" || state === "interrupted") completeLease(delta.id).catch((error) => {
			console.warn("[downloads] failed to release artifact", error);
		});
	});
	if (downloadsApi.onDeterminingFilename?.addListener) downloadsApi.onDeterminingFilename.addListener((item, suggest) => {
		const filename = pendingDownloadFilenames.get(item.url);
		if (filename) {
			pendingDownloadFilenames.delete(item.url);
			suggest({
				filename,
				conflictAction: "uniquify"
			});
		} else suggest();
	});
	downloadListenerInstalled = true;
}
var saveAs = async (path, download, { dialog }) => {
	const downloadsApi = getDownloadsApi();
	if (!downloadsApi?.download) {
		await releaseArtifact(download).catch(() => void 0);
		throw new Error("Downloads API unavailable");
	}
	installDownloadListener();
	const filename = filenamify(path ?? "stream.mp4").normalize("NFC");
	pendingDownloadFilenames.set(download.url, filename);
	let downloadId;
	try {
		downloadId = await downloadsApi.download({
			url: download.url,
			saveAs: dialog,
			conflictAction: "uniquify",
			filename
		});
	} catch (error) {
		pendingDownloadFilenames.delete(download.url);
		await releaseArtifact(download).catch(() => void 0);
		throw error;
	}
	await mutateLeases((cache) => {
		cache[String(downloadId)] = {
			downloadId,
			artifact: download,
			createdAt: Date.now()
		};
	});
	if (downloadsApi.search) {
		const state = (await downloadsApi.search({ id: downloadId }))?.[0]?.state;
		if (state === "complete" || state === "interrupted") await completeLease(downloadId);
	}
	return downloadId;
};
var prepareTextDownload = async (text, mime) => {
	if (shouldUseOffscreen()) return await requestPrepareTextDownloadOffscreen(text, mime);
	return prepareTextDownloadInCurrentContext(text, mime);
};
async function initializeDownloadTracking() {
	installDownloadListener();
	const downloadsApi = getDownloadsApi();
	const leases = await loadLeaseCache();
	for (const lease of Object.values(leases)) {
		if (!downloadsApi?.search) continue;
		try {
			const matches = await downloadsApi.search({ id: lease.downloadId });
			const state = matches?.[0]?.state;
			if (!matches?.length || state === "complete" || state === "interrupted") await completeLease(lease.downloadId);
		} catch (_error) {}
	}
	const activeExportIds = new Set(Object.values(await loadLeaseCache()).map((lease) => lease.artifact.exportId));
	for (const exportId of await listExportIds().catch(() => [])) if (!activeExportIds.has(exportId)) await deleteExportFile(exportId).catch(() => void 0);
}
var DiskBackedFS = {
	getBucket,
	createBucket,
	deleteBucket,
	getStorageStats,
	saveAs,
	cleanup,
	setSubtitleText,
	getSubtitleText,
	prepareTextDownload
};
function shouldUseOffscreen() {
	return Boolean(chromeApi?.offscreen?.createDocument && typeof document === "undefined");
}
async function offscreenDocumentExists() {
	const runtime = chromeApi?.runtime;
	const offscreenURL = runtime?.getURL?.("offscreen.html");
	if (runtime?.getContexts) return (await runtime.getContexts({
		contextTypes: ["OFFSCREEN_DOCUMENT"],
		documentUrls: offscreenURL ? [offscreenURL] : void 0
	})).length > 0;
	const workerClients = globalThis.clients;
	if (workerClients?.matchAll && offscreenURL) return (await workerClients.matchAll()).some((client) => client.url === offscreenURL);
	return false;
}
async function ensureOffscreenDocument() {
	if (!chromeApi?.offscreen?.createDocument) throw new Error("Chromium offscreen document support is unavailable");
	if (await offscreenDocumentExists()) return;
	if (!offscreenCreation) {
		const reasons = [chromeApi.offscreen.Reason?.BLOBS ?? "BLOBS"];
		offscreenCreation = chromeApi.offscreen.createDocument({
			url: "offscreen.html",
			reasons,
			justification: "Mux disk-backed media in a worker and create its download URL"
		}).catch((error) => {
			if (!/single offscreen|already exists/i.test(error.message)) throw error;
		}).finally(() => {
			offscreenCreation = null;
		});
	}
	await offscreenCreation;
}
function sendChromeMessage(message) {
	return new Promise((resolve, reject) => {
		chromeApi.runtime.sendMessage(message, (response) => {
			const lastError = chromeApi.runtime.lastError;
			if (lastError) {
				reject(new Error(lastError.message));
				return;
			}
			resolve(response);
		});
	});
}
async function requestPrepareDownloadOffscreen(payload, onProgress) {
	await ensureOffscreenDocument();
	const requestId = randomId();
	const progressListener = (message) => {
		if (message?.target === "background" && message.type === "offscreen-progress" && message.requestId === requestId) onProgress?.(message.progress, message.message);
	};
	chromeApi.runtime.onMessage.addListener(progressListener);
	try {
		const response = await sendChromeMessage({
			target: "offscreen",
			type: "prepare-download",
			requestId,
			payload
		});
		if (!response?.ok) throw new Error(response?.message || "Failed to prepare download");
		return response.download;
	} finally {
		chromeApi.runtime.onMessage.removeListener(progressListener);
	}
}
async function requestPrepareTextDownloadOffscreen(text, mime) {
	await ensureOffscreenDocument();
	const response = await sendChromeMessage({
		target: "offscreen",
		type: "prepare-text-download",
		text,
		mime
	});
	if (!response?.ok) throw new Error(response?.message || "Failed to prepare text download");
	return response.download;
}
async function requestReleaseArtifactOffscreen(artifact) {
	await ensureOffscreenDocument();
	const response = await sendChromeMessage({
		target: "offscreen",
		type: "release-artifact",
		artifact
	});
	if (!response?.ok) throw new Error(response?.message || "Failed to release download artifact");
}
async function cancelDiskMuxForStorage(storageKey) {
	if (shouldUseOffscreen() && await offscreenDocumentExists()) {
		const response = await sendChromeMessage({
			target: "offscreen",
			type: "cancel-mux",
			storageKey
		});
		if (!response?.ok) throw new Error(response?.message || "Failed to cancel finalization");
		return;
	}
	await cancelDiskBackedMux(storageKey);
}
async function releaseArtifactInCurrentContext(artifact) {
	await releaseArtifactLocal(artifact);
}
//#endregion
export { releaseArtifactInCurrentContext as a, __commonJSMin as c, prepareTextDownloadInCurrentContext as i, __exportAll as l, initializeDownloadTracking as n, cancelDiskBackedMux as o, prepareDownloadInCurrentContext as r, require_browser_polyfill as s, DiskBackedFS as t, __toESM as u };

//# sourceMappingURL=disk-backed-fs-BQhKauW3.js.map