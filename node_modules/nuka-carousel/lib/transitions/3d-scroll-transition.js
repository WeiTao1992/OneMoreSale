"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _propTypes = _interopRequireDefault(require("prop-types"));

var _styleUtilities = require("../utilities/style-utilities");

var _utilities = require("../utilities/utilities");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

var MIN_ZOOM_SCALE = 0;
var MAX_ZOOM_SCALE = 1;

var ScrollTransition3D = /*#__PURE__*/function (_React$Component) {
  _inherits(ScrollTransition3D, _React$Component);

  var _super = _createSuper(ScrollTransition3D);

  function ScrollTransition3D(props) {
    var _this;

    _classCallCheck(this, ScrollTransition3D);

    _this = _super.call(this, props);
    _this.getListStyles = _this.getListStyles.bind(_assertThisInitialized(_this));
    return _this;
  }
  /* eslint-disable complexity */


  _createClass(ScrollTransition3D, [{
    key: "getSlideTargetPosition",
    value: function getSlideTargetPosition(index) {
      var targetPosition = 0;
      var offset = 0;

      if (index !== this.props.currentSlide) {
        var relativeDistanceToCurrentSlide = this.getRelativeDistanceToCurrentSlide(index);
        targetPosition = (this.props.slideWidth + this.props.cellSpacing) * relativeDistanceToCurrentSlide - this.getZoomOffsetFor(relativeDistanceToCurrentSlide);
        offset = 0;

        if (this.props.animation === 'zoom' && (this.props.currentSlide === index + 1 || this.props.currentSlide === 0 && index === this.props.children.length - 1)) {
          offset = this.props.slideOffset;
        } else if (this.props.animation === 'zoom' && (this.props.currentSlide === index - 1 || this.props.currentSlide === this.props.children.length - 1 && index === 0)) {
          offset = -this.props.slideOffset;
        }
      }

      return targetPosition + offset;
    }
    /* eslint-enable complexity */

  }, {
    key: "formatChildren",
    value: function formatChildren(children) {
      var _this2 = this;

      var _this$props = this.props,
          top = _this$props.top,
          left = _this$props.left,
          currentSlide = _this$props.currentSlide,
          slidesToShow = _this$props.slidesToShow,
          vertical = _this$props.vertical;
      var positionValue = vertical ? top : left;
      return _react["default"].Children.map(children, function (child, index) {
        var visible = _this2.getDistanceToCurrentSlide(index) <= slidesToShow / 2;
        var current = currentSlide === index;
        return /*#__PURE__*/_react["default"].createElement("li", {
          className: "slider-slide".concat(visible ? ' slide-visible' : '').concat(current ? ' slide-current' : ''),
          style: _this2.getSlideStyles(index, positionValue),
          key: index,
          onClick: _utilities.handleSelfFocus,
          tabIndex: -1
        }, child);
      });
    }
  }, {
    key: "getZoomOffsetFor",
    value: function getZoomOffsetFor(relativeDistanceToCurrent) {
      if (relativeDistanceToCurrent === 0) {
        return 0;
      }

      var marginGeneratedByZoom = (1 - Math.pow(this.props.zoomScale, Math.abs(relativeDistanceToCurrent))) * this.props.slideWidth;
      var direction = relativeDistanceToCurrent < 0 ? -1 : 1;
      var result = marginGeneratedByZoom * direction + this.getZoomOffsetFor(relativeDistanceToCurrent < 0 ? relativeDistanceToCurrent + 1 : relativeDistanceToCurrent - 1);
      return result;
    }
  }, {
    key: "getDistance",
    value: function getDistance(index, referenceIndex) {
      return Math.abs(index - referenceIndex);
    }
  }, {
    key: "getDistanceToCurrentSlide",
    value: function getDistanceToCurrentSlide(index) {
      var _this$props2 = this.props,
          wrapAround = _this$props2.wrapAround,
          currentSlide = _this$props2.currentSlide,
          slideCount = _this$props2.slideCount;
      return wrapAround ? Math.min(Math.min(this.getDistance(index, 0) + this.getDistance(currentSlide, slideCount), this.getDistance(index, slideCount) + this.getDistance(currentSlide, 0)), this.getDistance(index, currentSlide)) : this.getDistance(index, currentSlide);
    }
  }, {
    key: "getRelativeDistanceToCurrentSlide",
    value: function getRelativeDistanceToCurrentSlide(index) {
      var _this$props3 = this.props,
          wrapAround = _this$props3.wrapAround,
          currentSlide = _this$props3.currentSlide,
          slideCount = _this$props3.slideCount;

      if (wrapAround) {
        var distanceByLeftEge = this.getDistance(index, 0) + this.getDistance(currentSlide, slideCount);
        var distanceByRightEdge = this.getDistance(index, slideCount) + this.getDistance(currentSlide, 0);
        var absoluteDirectDistance = this.getDistance(index, currentSlide);
        var minimumDistance = Math.min(Math.min(distanceByLeftEge, distanceByRightEdge), absoluteDirectDistance);

        switch (minimumDistance) {
          case absoluteDirectDistance:
            return index - currentSlide;

          case distanceByLeftEge:
            return distanceByLeftEge;

          case distanceByRightEdge:
            return -distanceByRightEdge;

          default:
            return 0;
        }
      } else {
        return index - currentSlide;
      }
    }
  }, {
    key: "getTransformScale",
    value: function getTransformScale(index) {
      return this.props.currentSlide !== index ? Math.max(Math.min(Math.pow(this.props.zoomScale, this.getDistanceToCurrentSlide(index)), MAX_ZOOM_SCALE), MIN_ZOOM_SCALE) : 1.0;
    }
  }, {
    key: "getOpacityScale",
    value: function getOpacityScale(index) {
      return this.props.currentSlide !== index ? Math.max(Math.min(Math.pow(this.props.opacityScale, this.getDistanceToCurrentSlide(index)), MAX_ZOOM_SCALE), MIN_ZOOM_SCALE) : 1.0;
    }
  }, {
    key: "getSlideStyles",
    value: function getSlideStyles(index, positionValue) {
      var _this$props4 = this.props,
          vertical = _this$props4.vertical,
          slideCount = _this$props4.slideCount,
          cellSpacing = _this$props4.cellSpacing,
          slideWidth = _this$props4.slideWidth;
      var targetPosition = this.getSlideTargetPosition(index, positionValue);
      var transformScale = this.getTransformScale(index);
      return {
        boxSizing: 'border-box',
        display: vertical ? 'block' : 'inline-block',
        height: (0, _styleUtilities.getSlideHeight)(this.props),
        left: vertical ? 0 : targetPosition,
        listStyleType: 'none',
        marginBottom: vertical ? cellSpacing / 2 : 'auto',
        marginLeft: vertical ? 'auto' : cellSpacing / 2,
        marginRight: vertical ? 'auto' : cellSpacing / 2,
        marginTop: vertical ? cellSpacing / 2 : 'auto',
        MozBoxSizing: 'border-box',
        opacity: this.getOpacityScale(index),
        position: 'absolute',
        top: vertical ? targetPosition : 0,
        transform: "scale(".concat(transformScale, ")"),
        transition: 'left 0.4s ease-out, transform 0.4s ease-out, opacity 0.4s ease-out',
        verticalAlign: 'top',
        width: vertical ? '100%' : slideWidth,
        zIndex: slideCount - this.getDistanceToCurrentSlide(index)
      };
    }
  }, {
    key: "getListStyles",
    value: function getListStyles() {
      var listWidth = this.props.slideWidth * _react["default"].Children.count(this.props.children);

      var spacingOffset = this.props.cellSpacing * _react["default"].Children.count(this.props.children);

      return {
        boxSizing: 'border-box',
        cursor: this.props.dragging === true ? 'pointer' : 'inherit',
        height: this.props.vertical ? listWidth + spacingOffset : this.props.slideHeight,
        left: "calc(50% - (".concat(this.props.slideWidth, "px / 2))"),
        margin: this.props.vertical ? "".concat(this.props.cellSpacing / 2 * -1, "px 0px") : "".concat(this.props.slideListMargin, "px ").concat(this.props.cellSpacing / 2 * -1, "px"),
        MozBoxSizing: 'border-box',
        padding: 0,
        position: 'relative',
        touchAction: "pinch-zoom ".concat(this.props.vertical ? 'pan-x' : 'pan-y'),
        width: this.props.vertical ? 'auto' : '100%'
      };
    }
  }, {
    key: "render",
    value: function render() {
      var children = this.formatChildren(this.props.children);
      return /*#__PURE__*/_react["default"].createElement("ul", {
        className: "slider-list",
        style: this.getListStyles()
      }, children);
    }
  }]);

  return ScrollTransition3D;
}(_react["default"].Component);

exports["default"] = ScrollTransition3D;
ScrollTransition3D.propTypes = {
  cellSpacing: _propTypes["default"].number,
  currentSlide: _propTypes["default"].number,
  dragging: _propTypes["default"].bool,
  heightMode: _propTypes["default"].oneOf(['first', 'current', 'max']),
  isWrappingAround: _propTypes["default"].bool,
  left: _propTypes["default"].number,
  opacityScale: _propTypes["default"].number,
  slideCount: _propTypes["default"].number,
  slideHeight: _propTypes["default"].number,
  slideListMargin: _propTypes["default"].number,
  slideOffset: _propTypes["default"].number,
  slidesToShow: _propTypes["default"].number,
  slideWidth: _propTypes["default"].number,
  top: _propTypes["default"].number,
  vertical: _propTypes["default"].bool,
  wrapAround: _propTypes["default"].bool,
  zoomScale: _propTypes["default"].number
};
ScrollTransition3D.defaultProps = {
  cellSpacing: 0,
  currentSlide: 0,
  dragging: false,
  heightMode: 'max',
  isWrappingAround: false,
  left: 0,
  opacityScale: 0.65,
  slideCount: 0,
  slideHeight: 0,
  slideListMargin: 0,
  slidesToShow: 3,
  slideWidth: 0,
  top: 0,
  vertical: false,
  wrapAround: true,
  zoomScale: 0.75
};