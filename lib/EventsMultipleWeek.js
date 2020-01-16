'use strict'

var _interopRequireWildcard = require('@babel/runtime/helpers/interopRequireWildcard')

var _interopRequireDefault = require('@babel/runtime/helpers/interopRequireDefault')

exports.__esModule = true
exports.default = void 0

var _extends2 = _interopRequireDefault(
  require('@babel/runtime/helpers/extends')
)

var _assertThisInitialized2 = _interopRequireDefault(
  require('@babel/runtime/helpers/assertThisInitialized')
)

var _inheritsLoose2 = _interopRequireDefault(
  require('@babel/runtime/helpers/inheritsLoose')
)

var _react = _interopRequireWildcard(require('react'))

var dates = _interopRequireWildcard(require('./utils/dates'))

var TimeSlotUtils = _interopRequireWildcard(require('./utils/TimeSlots'))

var _Popup = _interopRequireDefault(require('./Popup'))

var _Overlay = _interopRequireDefault(require('react-overlays/Overlay'))

var _helpers = require('./utils/helpers')

var _position = _interopRequireDefault(require('dom-helpers/position'))

var _reactDom = require('react-dom')

var _constants = require('./utils/constants')

/* eslint-disable react/prop-types */
var EventsMultipleWeek =
  /*#__PURE__*/
  (function(_Component) {
    ;(0, _inheritsLoose2.default)(EventsMultipleWeek, _Component)

    function EventsMultipleWeek(props) {
      var _this

      _this = _Component.call(this, props) || this

      _this.handleShowMore = function(event) {
        // event.stopPropagation();
        var target = event.target
        var _this$props = _this.props,
          popup = _this$props.popup,
          onDrillDown = _this$props.onDrillDown,
          getDrilldownView = _this$props.getDrilldownView,
          events = _this$props.events,
          date = _this$props.date //cancel any pending selections so only the event click goes through.

        _this.clearSelection()

        if (popup) {
          var position = (0, _position.default)(
            target,
            (0, _reactDom.findDOMNode)(
              (0, _assertThisInitialized2.default)(_this)
            )
          )

          _this.setState({
            overlay: {
              date: date,
              events: events,
              position: position,
              target: target,
            },
          })
        } else {
          ;(0, _helpers.notify)(onDrillDown, [
            date,
            getDrilldownView(date) || _constants.views.DAY,
          ])
        } // notify(onShowMore, [events, date, slot])
      }

      _this.state = {
        label: '',
        continuesEarlier: '',
        continuesLater: '',
        showModalEvents: false,
      }
      _this.slotMetrics = TimeSlotUtils.getSlotMetrics(_this.props)
      return _this
    }

    var _proto = EventsMultipleWeek.prototype

    _proto.componentDidMount = function componentDidMount() {
      var _this$props2 = this.props,
        accessors = _this$props2.accessors,
        events = _this$props2.events,
        localizer = _this$props2.localizer
      var messages = localizer.messages

      if (events.length > 0) {
        var end = accessors.end(events[0])
        var start = accessors.start(events[0])
        var format = 'eventTimeRangeFormat'
        var startsBeforeDay = this.slotMetrics.startsBeforeDay(start)
        var startsAfterDay = this.slotMetrics.startsAfterDay(end)
        if (startsBeforeDay) format = 'eventTimeRangeEndFormat'
        else if (startsAfterDay) format = 'eventTimeRangeStartFormat'

        if (startsBeforeDay && startsAfterDay) {
          this.setState({
            label: messages.allDay,
          })
        } else if (
          (dates.eq(start, end, 'hours') && dates.eq(start, end, 'minutes')) ||
          !events[0].SHOW_END_DATE
        ) {
          this.setState({
            label: localizer.format(start, 'agendaTimeFormat'),
          })
        } else {
          this.setState({
            label: localizer.format(
              {
                start: start,
                end: end,
              },
              format
            ),
          })
        }

        this.setState({
          continuesEarlier:
            startsBeforeDay || this.slotMetrics.startsBefore(start),
          continuesLater: startsAfterDay || this.slotMetrics.startsAfter(end),
        })
      }
    }

    _proto.clearSelection = function clearSelection() {
      clearTimeout(this._selectTimer)
      this._pendingSelection = []
    }

    _proto.renderOverlay = function renderOverlay() {
      var _this2 = this

      var _this$props3 = this.props,
        localizer = _this$props3.localizer,
        accessors = _this$props3.accessors,
        components = _this$props3.components,
        getters = _this$props3.getters,
        events = _this$props3.events,
        popupClassname = _this$props3.popupClassname,
        view = _this$props3.view
      var overlay = (this.state && this.state.overlay) || {}
      return _react.default.createElement(
        _Overlay.default,
        {
          rootClose: true,
          placement: 'bottom',
          show: !!overlay.position,
          onHide: function onHide() {
            return _this2.setState({
              overlay: null,
            })
          },
          target: function target() {
            return overlay.target
          },
        },
        function(_ref) {
          var props = _ref.props
          return _react.default.createElement(
            _Popup.default,
            (0, _extends2.default)({}, props, {
              view: view,
              accessors: accessors,
              components: components,
              getters: getters,
              localizer: localizer,
              events: events,
              position: overlay.position,
              popupClassname: popupClassname,
            })
          )
        }
      )
    }

    _proto.render = function render() {
      var _this$props4 = this.props,
        events = _this$props4.events,
        style = _this$props4.style
      return _react.default.createElement(
        _react.Fragment,
        null,
        this.renderOverlay(),
        _react.default.createElement(
          'a',
          {
            className: 'rbc-show-more week',
            style: {
              top: style.top + '%',
              position: 'absolute',
            },
            onClick: this.handleShowMore,
          },
          'Show ' + events.length + ' events'
        )
      )
    }

    return EventsMultipleWeek
  })(_react.Component)

var _default = EventsMultipleWeek
exports.default = _default
module.exports = exports['default']
