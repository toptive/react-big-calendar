'use strict'

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends3 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _clsx = _interopRequireDefault(require('clsx'))

var _react = _interopRequireDefault(require('react'))

var dates = _interopRequireWildcard(require('./utils/dates'))

function _getRequireWildcardCache(nodeInterop) {
  if (typeof WeakMap !== 'function') return null
  var cacheBabelInterop = new WeakMap()
  var cacheNodeInterop = new WeakMap()
  return (_getRequireWildcardCache = function _getRequireWildcardCache(
    nodeInterop
  ) {
    return nodeInterop ? cacheNodeInterop : cacheBabelInterop
  })(nodeInterop)
}

function _interopRequireWildcard(obj, nodeInterop) {
  if (!nodeInterop && obj && obj.__esModule) {
    return obj
  }
  if (obj === null || (typeof obj !== 'object' && typeof obj !== 'function')) {
    return { default: obj }
  }
  var cache = _getRequireWildcardCache(nodeInterop)
  if (cache && cache.has(obj)) {
    return cache.get(obj)
  }
  var newObj = {}
  var hasPropertyDescriptor =
    Object.defineProperty && Object.getOwnPropertyDescriptor
  for (var key in obj) {
    if (key !== 'default' && Object.prototype.hasOwnProperty.call(obj, key)) {
      var desc = hasPropertyDescriptor
        ? Object.getOwnPropertyDescriptor(obj, key)
        : null
      if (desc && (desc.get || desc.set)) {
        Object.defineProperty(newObj, key, desc)
      } else {
        newObj[key] = obj[key]
      }
    }
  }
  newObj.default = obj
  if (cache) {
    cache.set(obj, newObj)
  }
  return newObj
}

function stringifyPercent(v) {
  return typeof v === 'string' ? v : v + '%'
}
/* eslint-disable react/prop-types */

function TimeGridEvent(props) {
  var _extends2

  var style = props.style,
    className = props.className,
    event = props.event,
    accessors = props.accessors,
    rtl = props.rtl,
    selected = props.selected,
    label = props.label,
    continuesEarlier = props.continuesEarlier,
    continuesLater = props.continuesLater,
    getters = props.getters,
    onClick = props.onClick,
    onDoubleClick = props.onDoubleClick,
    _props$components = props.components,
    Event = _props$components.event,
    EventWrapper = _props$components.eventWrapper
  var title = accessors.title(event)
  var tooltip = accessors.tooltip(event)
  var end = accessors.end(event)
  var start = accessors.start(event)
  var userProps = getters.eventProp(event, start, end, selected)
  var height = style.height,
    top = style.top,
    width = style.width,
    xOffset = style.xOffset
  var isShortEvent =
    dates.diff(end, start, 'minutes') < 31 &&
    dates.diff(end, start, 'minutes') > 0
  var inner = [
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        key: '1',
        className: (0, _clsx.default)('rbc-event-label', {
          shortEvent: isShortEvent,
          hide: event.HIDE_TIME,
        }),
      },
      label
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        key: '2',
        className: 'rbc-event-content',
      },
      Event
        ? /*#__PURE__*/ _react.default.createElement(Event, {
            event: event,
            title: title,
          })
        : title
    ),
  ]
  return /*#__PURE__*/ _react.default.createElement(
    EventWrapper,
    (0, _extends3.default)(
      {
        type: 'time',
      },
      props
    ),
    /*#__PURE__*/ _react.default.createElement(
      'div',
      {
        onClick: onClick,
        onDoubleClick: onDoubleClick,
        style: (0, _extends3.default)(
          {},
          userProps.style,
          ((_extends2 = {
            top: stringifyPercent(top),
          }),
          (_extends2[rtl ? 'right' : 'left'] = stringifyPercent(xOffset)),
          (_extends2.width = stringifyPercent(width)),
          (_extends2.height = stringifyPercent(height)),
          _extends2)
        ),
        title: tooltip
          ? (typeof label === 'string' ? label + ': ' : '') + tooltip
          : undefined,
        className: (0, _clsx.default)(
          'rbc-event',
          className,
          userProps.className,
          {
            'rbc-selected': selected,
            'rbc-event-continues-earlier': continuesEarlier,
            'rbc-event-continues-later': continuesLater,
          }
        ),
      },
      inner
    )
  )
}

var _default = TimeGridEvent
exports.default = _default
module.exports = exports.default
