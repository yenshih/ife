webpackJsonp([1],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(31);

	var _reactRedux = __webpack_require__(161);

	var _App = __webpack_require__(185);

	var _App2 = _interopRequireDefault(_App);

	var _configureStore = __webpack_require__(198);

	var _configureStore2 = _interopRequireDefault(_configureStore);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var store = (0, _configureStore2.default)();

	(0, _reactDom.render)(_react2.default.createElement(
	    _reactRedux.Provider,
	    { store: store },
	    _react2.default.createElement(_App2.default, null)
	), document.getElementById("root"));

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "index.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 185:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactRedux = __webpack_require__(161);

	var _redux = __webpack_require__(168);

	var _Dialog = __webpack_require__(186);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	var _dialog = __webpack_require__(192);

	var _dialog2 = _interopRequireDefault(_dialog);

	var _App = __webpack_require__(194);

	var _App2 = _interopRequireDefault(_App);

	__webpack_require__(196);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var App = function (_Component) {
	    _inherits(App, _Component);

	    function App(props) {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this, props));

	        _this.handleClick = _this.handleClick.bind(_this);
	        return _this;
	    }

	    _createClass(App, [{
	        key: "handleClick",
	        value: function handleClick() {
	            document.body.style["overflow-y"] = "hidden";
	            this.props.actions.alertDialog();
	        }
	    }, {
	        key: "renderDialog",
	        value: function renderDialog(dialog, actions) {
	            if (dialog.visible) {
	                return _react2.default.createElement(_Dialog2.default, _extends({}, dialog, {
	                    hideDialog: actions.hideDialog,
	                    initDialog: actions.initDialog,
	                    title: "Dialog",
	                    hint: "this is a dialog",
	                    confirm: "confirm",
	                    cancel: "cancel",
	                    width: 600,
	                    height: 300,
	                    srcTop: 50,
	                    srcLeft: 50
	                }));
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _props = this.props;
	            var dialog = _props.dialog;
	            var actions = _props.actions;

	            return _react2.default.createElement(
	                "div",
	                null,
	                _react2.default.createElement("input", { type: "button", value: "click", className: _App2.default.btn, onClick: this.handleClick }),
	                _react2.default.createElement(
	                    "p",
	                    { className: _App2.default.paragraph },
	                    "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sit voluptate, molestias tempora veniam. Praesentium perferendis labore inventore necessitatibus ullam non quasi! Obcaecati blanditiis, nisi sunt iste. Officiis deserunt necessitatibus placeat animi optio fugit quam nostrum, maxime est magnam facere facilis dolores tempora doloribus repellendus, doloremque ea accusamus odio modi, aliquid voluptatibus sed sint esse aspernatur. Ad vel magnam quasi eos assumenda blanditiis optio, aspernatur dolorem mollitia tempora aliquam. Commodi necessitatibus, provident! Voluptatem delectus, libero blanditiis vero accusantium assumenda quo enim error nulla omnis qui quasi quis. Sit soluta autem qui, veniam, aliquid mollitia dolor praesentium recusandae ipsam, voluptatem harum nihil rerum libero vitae, nulla aliquam facilis ut dolorem itaque sed deleniti quod! Accusantium quasi corporis assumenda fugiat rerum, quia explicabo deleniti sunt labore? Ut consectetur inventore velit eos amet minima sapiente. Qui, beatae ratione magni dolorum excepturi et ut non eveniet, eius nam similique dolor temporibus tempore id commodi consequatur incidunt praesentium dignissimos? Perspiciatis aspernatur vitae ipsum alias delectus fugit repudiandae nulla, quisquam laborum hic, obcaecati consequatur dolorum corrupti commodi nisi eius quam quaerat veritatis laboriosam consequuntur cupiditate dolores! Officiis at perferendis aspernatur distinctio ut sapiente, consequatur quasi enim recusandae ea voluptates magnam eligendi impedit necessitatibus, tenetur rem quo quos laboriosam voluptas, tempore possimus sed tempora. Quaerat officia totam doloremque dicta quia fugit maiores ea. Facilis, nihil nulla minus repudiandae fuga sunt? Perferendis commodi, necessitatibus dolorum adipisci ipsa iste explicabo veritatis odio, omnis aliquam id similique quod velit saepe consequuntur illo, facere at dignissimos consequatur temporibus fugiat inventore. Necessitatibus nam odio, est provident laborum non nesciunt veniam eius beatae quibusdam repellat, impedit doloremque, unde veritatis amet tenetur perspiciatis quas! Nesciunt odio esse et quia unde tempore, corporis minus, eaque iste explicabo libero est dolores, nulla nihil quo temporibus praesentium exercitationem placeat. Similique atque quia quis molestiae blanditiis cum tempore eius aliquid, suscipit, vitae rerum ducimus. Eos illum, temporibus. Dignissimos ipsa beatae impedit quod doloribus hic aspernatur expedita esse fuga iure eaque ipsum eius quas, necessitatibus dolor. Vitae rem perferendis aliquid optio. Fugit sunt eligendi, similique, dolor aperiam, quae laudantium tempora labore earum, esse ipsam omnis praesentium odit. Eaque eligendi minus impedit sint sit fugit, iste voluptate molestias qui repudiandae animi nostrum consectetur. Deleniti commodi saepe, dolorum officia voluptatem quas magni. Tempora provident id assumenda, eveniet quibusdam porro reprehenderit illo excepturi ut eius ullam commodi, velit numquam. Quaerat voluptate debitis, labore ullam ut at praesentium minima vel, sunt, est nesciunt, molestiae!"
	                ),
	                this.renderDialog(dialog, actions)
	            );
	        }
	    }]);

	    return App;
	}(_react.Component);

	App.propTypes = {
	    dialog: _react.PropTypes.object.isRequired,
	    actions: _react.PropTypes.object.isRequired
	};


	var mapStateToProps = function mapStateToProps(state) {
	    return {
	        dialog: state.dialog
	    };
	};

	var mapDispatchToProps = function mapDispatchToProps(dispatch) {
	    return {
	        actions: (0, _redux.bindActionCreators)(_dialog2.default, dispatch)
	    };
	};

	exports.default = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(App);

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "App.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 186:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _classnames = __webpack_require__(187);

	var _classnames2 = _interopRequireDefault(_classnames);

	var _Dialog = __webpack_require__(188);

	var _Dialog2 = _interopRequireDefault(_Dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dialog = function (_Component) {
	    _inherits(Dialog, _Component);

	    function Dialog(props) {
	        _classCallCheck(this, Dialog);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Dialog).call(this, props));

	        _this.handleClick = _this.handleClick.bind(_this);
	        _this.handleAnimationEnd = _this.handleAnimationEnd.bind(_this);
	        return _this;
	    }

	    _createClass(Dialog, [{
	        key: "handleClick",
	        value: function handleClick() {
	            var _props = this.props;
	            var visible = _props.visible;
	            var hideDialog = _props.hideDialog;
	            var initDialog = _props.initDialog;

	            hideDialog();
	            document.body.style["overflow-y"] = "scroll";
	            setTimeout(function () {
	                if (visible) {
	                    initDialog();
	                }
	            }, 516);
	        }
	    }, {
	        key: "handleAnimationEnd",
	        value: function handleAnimationEnd(event) {
	            if (event.animationName.includes("zoom-out")) {
	                this.props.initDialog();
	            }
	        }
	    }, {
	        key: "render",
	        value: function render() {
	            var _classNames, _classNames2;

	            var _props2 = this.props;
	            var enter = _props2.enter;
	            var visible = _props2.visible;
	            var leave = _props2.leave;
	            var title = _props2.title;
	            var hint = _props2.hint;
	            var confirm = _props2.confirm;
	            var cancel = _props2.cancel;
	            var width = _props2.width;
	            var height = _props2.height;
	            var srcTop = _props2.srcTop;
	            var srcLeft = _props2.srcLeft;
	            var top = window.innerHeight / 2 - srcTop;
	            var left = window.innerWidth / 2 - srcLeft;

	            return _react2.default.createElement(
	                "div",
	                { className: _Dialog2.default["wrap"] },
	                _react2.default.createElement("div", {
	                    className: (0, _classnames2.default)((_classNames = {}, _defineProperty(_classNames, _Dialog2.default.mask, true), _defineProperty(_classNames, _Dialog2.default.appear, enter), _defineProperty(_classNames, _Dialog2.default.disappear, leave), _classNames)),
	                    onClick: this.handleClick
	                }),
	                _react2.default.createElement(
	                    "div",
	                    {
	                        style: {
	                            width: width,
	                            height: height,
	                            top: srcTop,
	                            left: srcLeft,
	                            transform: "translate(" + left + "px, " + top + "px) translate(-50%, -50%)"
	                        },
	                        className: (0, _classnames2.default)((_classNames2 = {}, _defineProperty(_classNames2, _Dialog2.default.dialog, true), _defineProperty(_classNames2, _Dialog2.default.enter, enter), _defineProperty(_classNames2, _Dialog2.default.leave, leave), _classNames2)),
	                        onAnimationEnd: this.handleAnimationEnd
	                    },
	                    _react2.default.createElement(
	                        "h3",
	                        { className: _Dialog2.default.title },
	                        title
	                    ),
	                    _react2.default.createElement(
	                        "p",
	                        { className: _Dialog2.default.hint },
	                        hint
	                    ),
	                    _react2.default.createElement("input", {
	                        type: "button",
	                        value: confirm,
	                        className: (0, _classnames2.default)(_Dialog2.default.btn, _Dialog2.default.confirm),
	                        onClick: this.handleClick
	                    }),
	                    _react2.default.createElement("input", {
	                        type: "button",
	                        value: cancel,
	                        className: (0, _classnames2.default)(_Dialog2.default.btn, _Dialog2.default.cancel),
	                        onClick: this.handleClick
	                    })
	                )
	            );
	        }
	    }]);

	    return Dialog;
	}(_react.Component);

	Dialog.propTypes = {
	    enter: _react.PropTypes.bool.isRequired,
	    visible: _react.PropTypes.bool.isRequired,
	    leave: _react.PropTypes.bool.isRequired,
	    hideDialog: _react.PropTypes.func.isRequired,
	    initDialog: _react.PropTypes.func.isRequired,
	    title: _react.PropTypes.string.isRequired,
	    hint: _react.PropTypes.string.isRequired,
	    confirm: _react.PropTypes.string.isRequired,
	    cancel: _react.PropTypes.string.isRequired,
	    width: _react.PropTypes.number.isRequired,
	    height: _react.PropTypes.number.isRequired,
	    srcTop: _react.PropTypes.number.isRequired,
	    srcLeft: _react.PropTypes.number.isRequired
	};
	exports.default = Dialog;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "Dialog.jsx" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	  Copyright (c) 2016 Jed Watson.
	  Licensed under the MIT License (MIT), see
	  http://jedwatson.github.io/classnames
	*/
	/* global define */

	(function () {
		'use strict';

		var hasOwn = {}.hasOwnProperty;

		function classNames () {
			var classes = [];

			for (var i = 0; i < arguments.length; i++) {
				var arg = arguments[i];
				if (!arg) continue;

				var argType = typeof arg;

				if (argType === 'string' || argType === 'number') {
					classes.push(arg);
				} else if (Array.isArray(arg)) {
					classes.push(classNames.apply(null, arg));
				} else if (argType === 'object') {
					for (var key in arg) {
						if (hasOwn.call(arg, key) && arg[key]) {
							classes.push(key);
						}
					}
				}
			}

			return classes.join(' ');
		}

		if (typeof module !== 'undefined' && module.exports) {
			module.exports = classNames;
		} else if (true) {
			// register as 'classnames', consistent with npm package name
			!(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
				return classNames;
			}.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
		} else {
			window.classNames = classNames;
		}
	}());


/***/ },

/***/ 188:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(189);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(191)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./Dialog.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./Dialog.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 189:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(190)();
	// imports


	// module
	exports.push([module.id, "@-webkit-keyframes Dialog__fade-in___3Y08v {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: .5;\r\n    }\r\n}\r\n@keyframes Dialog__fade-in___3Y08v {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: .5;\r\n    }\r\n}\r\n@-webkit-keyframes Dialog__fade-out___1EWz8 {\r\n    from {\r\n        opacity: .5;\r\n    }\r\n    to {\r\n        opacity: 0;\r\n    }\r\n}\r\n@keyframes Dialog__fade-out___1EWz8 {\r\n    from {\r\n        opacity: .5;\r\n    }\r\n    to {\r\n        opacity: 0;\r\n    }\r\n}\r\n.Dialog__mask___w7n5g {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #000;\r\n    opacity: .5;\r\n}\r\n.Dialog__appear___3C1PP {\r\n    -webkit-animation: Dialog__fade-in___3Y08v .5s;\r\n            animation: Dialog__fade-in___3Y08v .5s;\r\n}\r\n.Dialog__disappear___1Tnl- {\r\n    -webkit-animation: Dialog__fade-out___1EWz8 .5s;\r\n            animation: Dialog__fade-out___1EWz8 .5s;\r\n}\r\n@-webkit-keyframes Dialog__zoom-in___1g70U {\r\n    from {\r\n        -webkit-transform: scale3d(.05, .05, 1);\r\n                transform: scale3d(.05, .05, 1);\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n@keyframes Dialog__zoom-in___1g70U {\r\n    from {\r\n        -webkit-transform: scale3d(.05, .05, 1);\r\n                transform: scale3d(.05, .05, 1);\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n@-webkit-keyframes Dialog__zoom-out___3nbHW {\r\n    from {\r\n        opacity: 1;\r\n    }\r\n    to {\r\n        -webkit-transform: scale3d(.05, .05, 1);\r\n                transform: scale3d(.05, .05, 1);\r\n        opacity: 0;\r\n    }\r\n}\r\n@keyframes Dialog__zoom-out___3nbHW {\r\n    from {\r\n        opacity: 1;\r\n    }\r\n    to {\r\n        -webkit-transform: scale3d(.05, .05, 1);\r\n                transform: scale3d(.05, .05, 1);\r\n        opacity: 0;\r\n    }\r\n}\r\n.Dialog__dialog___V_VYW {\r\n    position: absolute;\r\n    border: 1px solid #999;\r\n    border-radius: 5px;\r\n    -webkit-transform-origin: 0 0;\r\n            transform-origin: 0 0;\r\n    background: #fff;\r\n    opacity: 1;\r\n}\r\n.Dialog__enter___33rJp {\r\n    -webkit-animation: Dialog__zoom-in___1g70U .5s;\r\n            animation: Dialog__zoom-in___1g70U .5s;\r\n}\r\n.Dialog__leave___1WhWw {\r\n    -webkit-animation: Dialog__zoom-out___3nbHW .5s;\r\n            animation: Dialog__zoom-out___3nbHW .5s;\r\n}\r\n.Dialog__title___dTFZA {\r\n    padding: 16px;\r\n    font: 20px/1 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5B8B\\4F53\", sans-serif;\r\n    border-bottom: 1px solid #eee;\r\n}\r\n.Dialog__hint___1yc5n {\r\n    margin: 16px;\r\n    font: 16px/1.5 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5B8B\\4F53\", sans-serif;\r\n}\r\n.Dialog__btn___1pNCh {\r\n    position: absolute;\r\n    width: 80px;\r\n    height: 40px;\r\n    border: 1px solid #357ebd;\r\n    border-radius: 3px;\r\n    font: 16px/1 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5B8B\\4F53\", sans-serif;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #4a8bca;\r\n}\r\n.Dialog__btn___1pNCh:hover {\r\n    cursor: pointer;\r\n    background: #3276b1;\r\n}\r\n.Dialog__confirm___2Nm8o {\r\n    right: 104px;\r\n    bottom: 16px;\r\n}\r\n.Dialog__cancel___kivYO {\r\n    right: 16px;\r\n    bottom: 16px;\r\n}", "", {"version":3,"sources":["/./components/Dialog.css"],"names":[],"mappings":"AAAA;IACI;QACI,WAAW;KACd;IACD;QACI,YAAY;KACf;CACJ;AAPD;IACI;QACI,WAAW;KACd;IACD;QACI,YAAY;KACf;CACJ;AACD;IACI;QACI,YAAY;KACf;IACD;QACI,WAAW;KACd;CACJ;AAPD;IACI;QACI,YAAY;KACf;IACD;QACI,WAAW;KACd;CACJ;AACD;IACI,mBAAmB;IACnB,OAAO;IACP,QAAQ;IACR,YAAY;IACZ,aAAa;IACb,iBAAiB;IACjB,YAAY;CACf;AACD;IACI,+CAAuB;YAAvB,uCAAuB;CAC1B;AACD;IACI,gDAAwB;YAAxB,wCAAwB;CAC3B;AACD;IACI;QACI,wCAAgC;gBAAhC,gCAAgC;QAChC,WAAW;KACd;IACD;QACI,WAAW;KACd;CACJ;AARD;IACI;QACI,wCAAgC;gBAAhC,gCAAgC;QAChC,WAAW;KACd;IACD;QACI,WAAW;KACd;CACJ;AACD;IACI;QACI,WAAW;KACd;IACD;QACI,wCAAgC;gBAAhC,gCAAgC;QAChC,WAAW;KACd;CACJ;AARD;IACI;QACI,WAAW;KACd;IACD;QACI,wCAAgC;gBAAhC,gCAAgC;QAChC,WAAW;KACd;CACJ;AACD;IACI,mBAAmB;IACnB,uBAAuB;IACvB,mBAAmB;IACnB,8BAAsB;YAAtB,sBAAsB;IACtB,iBAAiB;IACjB,WAAW;CACd;AACD;IACI,+CAAuB;YAAvB,uCAAuB;CAC1B;AACD;IACI,gDAAwB;YAAxB,wCAAwB;CAC3B;AACD;IACI,cAAc;IACd,mFAAmF;IACnF,8BAA8B;CACjC;AACD;IACI,aAAa;IACb,qFAAqF;CACxF;AACD;IACI,mBAAmB;IACnB,YAAY;IACZ,aAAa;IACb,0BAA0B;IAC1B,mBAAmB;IACnB,mFAAmF;IACnF,mBAAmB;IACnB,YAAY;IACZ,oBAAoB;CACvB;AACD;IACI,gBAAgB;IAChB,oBAAoB;CACvB;AACD;IACI,aAAa;IACb,aAAa;CAChB;AACD;IACI,YAAY;IACZ,aAAa;CAChB","file":"Dialog.css","sourcesContent":["@keyframes fade-in {\r\n    from {\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: .5;\r\n    }\r\n}\r\n@keyframes fade-out {\r\n    from {\r\n        opacity: .5;\r\n    }\r\n    to {\r\n        opacity: 0;\r\n    }\r\n}\r\n.mask {\r\n    position: absolute;\r\n    top: 0;\r\n    left: 0;\r\n    width: 100%;\r\n    height: 100%;\r\n    background: #000;\r\n    opacity: .5;\r\n}\r\n.appear {\r\n    animation: fade-in .5s;\r\n}\r\n.disappear {\r\n    animation: fade-out .5s;\r\n}\r\n@keyframes zoom-in {\r\n    from {\r\n        transform: scale3d(.05, .05, 1);\r\n        opacity: 0;\r\n    }\r\n    to {\r\n        opacity: 1;\r\n    }\r\n}\r\n@keyframes zoom-out {\r\n    from {\r\n        opacity: 1;\r\n    }\r\n    to {\r\n        transform: scale3d(.05, .05, 1);\r\n        opacity: 0;\r\n    }\r\n}\r\n.dialog {\r\n    position: absolute;\r\n    border: 1px solid #999;\r\n    border-radius: 5px;\r\n    transform-origin: 0 0;\r\n    background: #fff;\r\n    opacity: 1;\r\n}\r\n.enter {\r\n    animation: zoom-in .5s;\r\n}\r\n.leave {\r\n    animation: zoom-out .5s;\r\n}\r\n.title {\r\n    padding: 16px;\r\n    font: 20px/1 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5b8b\\4f53\", sans-serif;\r\n    border-bottom: 1px solid #eee;\r\n}\r\n.hint {\r\n    margin: 16px;\r\n    font: 16px/1.5 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5b8b\\4f53\", sans-serif;\r\n}\r\n.btn {\r\n    position: absolute;\r\n    width: 80px;\r\n    height: 40px;\r\n    border: 1px solid #357ebd;\r\n    border-radius: 3px;\r\n    font: 16px/1 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5b8b\\4f53\", sans-serif;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #4a8bca;\r\n}\r\n.btn:hover {\r\n    cursor: pointer;\r\n    background: #3276b1;\r\n}\r\n.confirm {\r\n    right: 104px;\r\n    bottom: 16px;\r\n}\r\n.cancel {\r\n    right: 16px;\r\n    bottom: 16px;\r\n}"],"sourceRoot":"webpack://"}]);

	// exports
	exports.locals = {
		"mask": "Dialog__mask___w7n5g",
		"appear": "Dialog__appear___3C1PP",
		"fade-in": "Dialog__fade-in___3Y08v",
		"disappear": "Dialog__disappear___1Tnl-",
		"fade-out": "Dialog__fade-out___1EWz8",
		"dialog": "Dialog__dialog___V_VYW",
		"enter": "Dialog__enter___33rJp",
		"zoom-in": "Dialog__zoom-in___1g70U",
		"leave": "Dialog__leave___1WhWw",
		"zoom-out": "Dialog__zoom-out___3nbHW",
		"title": "Dialog__title___dTFZA",
		"hint": "Dialog__hint___1yc5n",
		"btn": "Dialog__btn___1pNCh",
		"confirm": "Dialog__confirm___2Nm8o",
		"cancel": "Dialog__cancel___kivYO"
	};

/***/ },

/***/ 190:
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },

/***/ 191:
/***/ function(module, exports, __webpack_require__) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	var stylesInDom = {},
		memoize = function(fn) {
			var memo;
			return function () {
				if (typeof memo === "undefined") memo = fn.apply(this, arguments);
				return memo;
			};
		},
		isOldIE = memoize(function() {
			return /msie [6-9]\b/.test(window.navigator.userAgent.toLowerCase());
		}),
		getHeadElement = memoize(function () {
			return document.head || document.getElementsByTagName("head")[0];
		}),
		singletonElement = null,
		singletonCounter = 0,
		styleElementsInsertedAtTop = [];

	module.exports = function(list, options) {
		if(false) {
			if(typeof document !== "object") throw new Error("The style-loader cannot be used in a non-browser environment");
		}

		options = options || {};
		// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
		// tags it will allow on a page
		if (typeof options.singleton === "undefined") options.singleton = isOldIE();

		// By default, add <style> tags to the bottom of <head>.
		if (typeof options.insertAt === "undefined") options.insertAt = "bottom";

		var styles = listToStyles(list);
		addStylesToDom(styles, options);

		return function update(newList) {
			var mayRemove = [];
			for(var i = 0; i < styles.length; i++) {
				var item = styles[i];
				var domStyle = stylesInDom[item.id];
				domStyle.refs--;
				mayRemove.push(domStyle);
			}
			if(newList) {
				var newStyles = listToStyles(newList);
				addStylesToDom(newStyles, options);
			}
			for(var i = 0; i < mayRemove.length; i++) {
				var domStyle = mayRemove[i];
				if(domStyle.refs === 0) {
					for(var j = 0; j < domStyle.parts.length; j++)
						domStyle.parts[j]();
					delete stylesInDom[domStyle.id];
				}
			}
		};
	}

	function addStylesToDom(styles, options) {
		for(var i = 0; i < styles.length; i++) {
			var item = styles[i];
			var domStyle = stylesInDom[item.id];
			if(domStyle) {
				domStyle.refs++;
				for(var j = 0; j < domStyle.parts.length; j++) {
					domStyle.parts[j](item.parts[j]);
				}
				for(; j < item.parts.length; j++) {
					domStyle.parts.push(addStyle(item.parts[j], options));
				}
			} else {
				var parts = [];
				for(var j = 0; j < item.parts.length; j++) {
					parts.push(addStyle(item.parts[j], options));
				}
				stylesInDom[item.id] = {id: item.id, refs: 1, parts: parts};
			}
		}
	}

	function listToStyles(list) {
		var styles = [];
		var newStyles = {};
		for(var i = 0; i < list.length; i++) {
			var item = list[i];
			var id = item[0];
			var css = item[1];
			var media = item[2];
			var sourceMap = item[3];
			var part = {css: css, media: media, sourceMap: sourceMap};
			if(!newStyles[id])
				styles.push(newStyles[id] = {id: id, parts: [part]});
			else
				newStyles[id].parts.push(part);
		}
		return styles;
	}

	function insertStyleElement(options, styleElement) {
		var head = getHeadElement();
		var lastStyleElementInsertedAtTop = styleElementsInsertedAtTop[styleElementsInsertedAtTop.length - 1];
		if (options.insertAt === "top") {
			if(!lastStyleElementInsertedAtTop) {
				head.insertBefore(styleElement, head.firstChild);
			} else if(lastStyleElementInsertedAtTop.nextSibling) {
				head.insertBefore(styleElement, lastStyleElementInsertedAtTop.nextSibling);
			} else {
				head.appendChild(styleElement);
			}
			styleElementsInsertedAtTop.push(styleElement);
		} else if (options.insertAt === "bottom") {
			head.appendChild(styleElement);
		} else {
			throw new Error("Invalid value for parameter 'insertAt'. Must be 'top' or 'bottom'.");
		}
	}

	function removeStyleElement(styleElement) {
		styleElement.parentNode.removeChild(styleElement);
		var idx = styleElementsInsertedAtTop.indexOf(styleElement);
		if(idx >= 0) {
			styleElementsInsertedAtTop.splice(idx, 1);
		}
	}

	function createStyleElement(options) {
		var styleElement = document.createElement("style");
		styleElement.type = "text/css";
		insertStyleElement(options, styleElement);
		return styleElement;
	}

	function createLinkElement(options) {
		var linkElement = document.createElement("link");
		linkElement.rel = "stylesheet";
		insertStyleElement(options, linkElement);
		return linkElement;
	}

	function addStyle(obj, options) {
		var styleElement, update, remove;

		if (options.singleton) {
			var styleIndex = singletonCounter++;
			styleElement = singletonElement || (singletonElement = createStyleElement(options));
			update = applyToSingletonTag.bind(null, styleElement, styleIndex, false);
			remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true);
		} else if(obj.sourceMap &&
			typeof URL === "function" &&
			typeof URL.createObjectURL === "function" &&
			typeof URL.revokeObjectURL === "function" &&
			typeof Blob === "function" &&
			typeof btoa === "function") {
			styleElement = createLinkElement(options);
			update = updateLink.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
				if(styleElement.href)
					URL.revokeObjectURL(styleElement.href);
			};
		} else {
			styleElement = createStyleElement(options);
			update = applyToTag.bind(null, styleElement);
			remove = function() {
				removeStyleElement(styleElement);
			};
		}

		update(obj);

		return function updateStyle(newObj) {
			if(newObj) {
				if(newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap)
					return;
				update(obj = newObj);
			} else {
				remove();
			}
		};
	}

	var replaceText = (function () {
		var textStore = [];

		return function (index, replacement) {
			textStore[index] = replacement;
			return textStore.filter(Boolean).join('\n');
		};
	})();

	function applyToSingletonTag(styleElement, index, remove, obj) {
		var css = remove ? "" : obj.css;

		if (styleElement.styleSheet) {
			styleElement.styleSheet.cssText = replaceText(index, css);
		} else {
			var cssNode = document.createTextNode(css);
			var childNodes = styleElement.childNodes;
			if (childNodes[index]) styleElement.removeChild(childNodes[index]);
			if (childNodes.length) {
				styleElement.insertBefore(cssNode, childNodes[index]);
			} else {
				styleElement.appendChild(cssNode);
			}
		}
	}

	function applyToTag(styleElement, obj) {
		var css = obj.css;
		var media = obj.media;

		if(media) {
			styleElement.setAttribute("media", media)
		}

		if(styleElement.styleSheet) {
			styleElement.styleSheet.cssText = css;
		} else {
			while(styleElement.firstChild) {
				styleElement.removeChild(styleElement.firstChild);
			}
			styleElement.appendChild(document.createTextNode(css));
		}
	}

	function updateLink(linkElement, obj) {
		var css = obj.css;
		var sourceMap = obj.sourceMap;

		if(sourceMap) {
			// http://stackoverflow.com/a/26603875
			css += "\n/*# sourceMappingURL=data:application/json;base64," + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + " */";
		}

		var blob = new Blob([css], { type: "text/css" });

		var oldSrc = linkElement.href;

		linkElement.href = URL.createObjectURL(blob);

		if(oldSrc)
			URL.revokeObjectURL(oldSrc);
	}


/***/ },

/***/ 192:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _DialogActionTypes = __webpack_require__(193);

	var types = _interopRequireWildcard(_DialogActionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var DialogActions = {
	    alertDialog: function alertDialog() {
	        return { type: types.ALERT_DIALOG };
	    },
	    hideDialog: function hideDialog() {
	        return { type: types.HIDE_DIALOG };
	    },
	    initDialog: function initDialog() {
	        return { type: types.INIT_DIALOG };
	    }
	};

	exports.default = DialogActions;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "dialog.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 193:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	var ALERT_DIALOG = exports.ALERT_DIALOG = "ALERT_DIALOG";
	var HIDE_DIALOG = exports.HIDE_DIALOG = "HIDE_DIALOG";
	var INIT_DIALOG = exports.INIT_DIALOG = "INIT_DIALOG";

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "DialogActionTypes.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 194:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(195);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(191)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../../node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./App.css", function() {
				var newContent = require("!!./../../node_modules/css-loader/index.js?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!./../../node_modules/postcss-loader/index.js!./App.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 195:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(190)();
	// imports


	// module
	exports.push([module.id, ".App__btn___j7b2V {\r\n    width: 80px;\r\n    height: 40px;\r\n    margin: 50px;\r\n    border: 1px solid #357ebd;\r\n    border-radius: 3px;\r\n    font: 16px/1 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5B8B\\4F53\", sans-serif;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #4a8bca;\r\n}\r\n.App__btn___j7b2V:hover {\r\n    cursor: pointer;\r\n    background: #3276b1;\r\n}\r\n.App__paragraph___2Hhio {\r\n    width: 640px;\r\n    margin-left: 50px;\r\n    font: 14px/1.5 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5B8B\\4F53\", sans-serif;\r\n}", "", {"version":3,"sources":["/./containers/App.css"],"names":[],"mappings":"AAAA;IACI,YAAY;IACZ,aAAa;IACb,aAAa;IACb,0BAA0B;IAC1B,mBAAmB;IACnB,mFAAmF;IACnF,mBAAmB;IACnB,YAAY;IACZ,oBAAoB;CACvB;AACD;IACI,gBAAgB;IAChB,oBAAoB;CACvB;AACD;IACI,aAAa;IACb,kBAAkB;IAClB,qFAAqF;CACxF","file":"App.css","sourcesContent":[".btn {\r\n    width: 80px;\r\n    height: 40px;\r\n    margin: 50px;\r\n    border: 1px solid #357ebd;\r\n    border-radius: 3px;\r\n    font: 16px/1 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5b8b\\4f53\", sans-serif;\r\n    text-align: center;\r\n    color: #fff;\r\n    background: #4a8bca;\r\n}\r\n.btn:hover {\r\n    cursor: pointer;\r\n    background: #3276b1;\r\n}\r\n.paragraph {\r\n    width: 640px;\r\n    margin-left: 50px;\r\n    font: 14px/1.5 \"Microsoft YaHei\", Tahoma, Helvetica, Arial, \"\\5b8b\\4f53\", sans-serif;\r\n}"],"sourceRoot":"webpack://"}]);

	// exports
	exports.locals = {
		"btn": "App__btn___j7b2V",
		"paragraph": "App__paragraph___2Hhio"
	};

/***/ },

/***/ 196:
/***/ function(module, exports, __webpack_require__) {

	// style-loader: Adds some css to the DOM by adding a <style> tag

	// load the styles
	var content = __webpack_require__(197);
	if(typeof content === 'string') content = [[module.id, content, '']];
	// add the styles to the DOM
	var update = __webpack_require__(191)(content, {});
	if(content.locals) module.exports = content.locals;
	// Hot Module Replacement
	if(false) {
		// When the styles change, update the <style> tags
		if(!content.locals) {
			module.hot.accept("!!./../node_modules/css-loader/index.js!./reset.css", function() {
				var newContent = require("!!./../node_modules/css-loader/index.js!./reset.css");
				if(typeof newContent === 'string') newContent = [[module.id, newContent, '']];
				update(newContent);
			});
		}
		// When the module is disposed, remove the <style> tags
		module.hot.dispose(function() { update(); });
	}

/***/ },

/***/ 197:
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(190)();
	// imports


	// module
	exports.push([module.id, "fieldset,hr,img{border:none}blockquote,body,button,dd,dl,dt,fieldset,figure,h1,h2,h3,h4,h5,h6,hr,input,legend,li,ol,p,pre,td,textarea,th,ul{margin:0;padding:0}body,button,input,select,textarea{font:12px/1 Tahoma,Helvetica,Arial,\"\\5B8B\\4F53\",sans-serif}h1{font-size:18px}h2{font-size:16px}h3{font-size:14px}button,h4,h5,h6,input,select,textarea{font-size:100%}address,cite,dfn,em,var{font-style:normal}code,kbd,pre,samp,tt{font-family:\"Courier New\",Courier,monospace}small{font-size:12px}ol,ul{list-style:none}a{text-decoration:none}a:hover{text-decoration:underline}abbr[title],acronym[title]{border-bottom:1px dotted;cursor:help}q:after,q:before{content:''}legend{color:#000}table{border-collapse:collapse;border-spacing:0}hr{height:1px}", ""]);

	// exports


/***/ },

/***/ 198:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _redux = __webpack_require__(168);

	var _reducers = __webpack_require__(199);

	var _reducers2 = _interopRequireDefault(_reducers);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var configureStore = function configureStore(initialState) {
	    var store = (0, _redux.createStore)(_reducers2.default, initialState, window.devToolsExtension ? window.devToolsExtension() : undefined);
	    if (false) {
	        module.hot.accept('../reducers', function () {
	            var nextReducer = require("../reducers");
	            store.replaceReducer(nextReducer);
	        });
	    }
	    return store;
	};

	exports.default = configureStore;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "configureStore.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 199:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _redux = __webpack_require__(168);

	var _dialog = __webpack_require__(200);

	var _dialog2 = _interopRequireDefault(_dialog);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	var rootReducer = (0, _redux.combineReducers)({ dialog: _dialog2.default });

	exports.default = rootReducer;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "index.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ },

/***/ 200:
/***/ function(module, exports, __webpack_require__) {

	/* REACT HOT LOADER */ if (false) { (function () { var ReactHotAPI = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-api\\modules\\index.js"), RootInstanceProvider = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\RootInstanceProvider.js"), ReactMount = require("react/lib/ReactMount"), React = require("react"); module.makeHot = module.hot.data ? module.hot.data.makeHot : ReactHotAPI(function () { return RootInstanceProvider.getRootInstances(ReactMount); }, React); })(); } try { (function () {

	"use strict";

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _DialogActionTypes = __webpack_require__(193);

	var types = _interopRequireWildcard(_DialogActionTypes);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	var initialState = { enter: false, visible: false, leave: false };

	var dialog = function dialog() {
	    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
	    var action = arguments[1];

	    switch (action.type) {
	        case types.ALERT_DIALOG:
	            return { enter: true, visible: true, leave: false };
	        case types.HIDE_DIALOG:
	            return { enter: false, visible: true, leave: true };
	        case types.INIT_DIALOG:
	            return initialState;
	        default:
	            return state;
	    }
	};

	exports.default = dialog;

	/* REACT HOT LOADER */ }).call(this); } finally { if (false) { (function () { var foundReactClasses = module.hot.data && module.hot.data.foundReactClasses || false; if (module.exports && module.makeHot) { var makeExportsHot = require("G:\\fe\\ife\\2016_spring\\task3-1\\node_modules\\react-hot-loader\\makeExportsHot.js"); if (makeExportsHot(module, require("react"))) { foundReactClasses = true; } var shouldAcceptModule = true && foundReactClasses; if (shouldAcceptModule) { module.hot.accept(function (err) { if (err) { console.error("Cannot not apply hot update to " + "dialog.js" + ": " + err.message); } }); } } module.hot.dispose(function (data) { data.makeHot = module.makeHot; data.foundReactClasses = foundReactClasses; }); })(); } }

/***/ }

});