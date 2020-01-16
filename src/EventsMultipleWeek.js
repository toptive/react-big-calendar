/* eslint-disable react/prop-types */
import React, { Component, Fragment } from 'react'
import * as dates from './utils/dates'
import * as TimeSlotUtils from './utils/TimeSlots'
import Popup from './Popup'
import Overlay from 'react-overlays/Overlay'
import { notify } from './utils/helpers'
import getPosition from 'dom-helpers/position'
import { findDOMNode } from 'react-dom'
import { views } from './utils/constants'

class EventsMultipleWeek extends Component {
  constructor(props) {
    super(props)

    this.state = {
      label: '',
      continuesEarlier: '',
      continuesLater: '',
      showModalEvents: false,
    }

    this.slotMetrics = TimeSlotUtils.getSlotMetrics(this.props)
  }

  componentDidMount() {
    const { accessors, events, localizer } = this.props
    const { messages } = localizer

    if (events.length > 0) {
      let end = accessors.end(events[0])
      let start = accessors.start(events[0])
      let format = 'eventTimeRangeFormat'

      const startsBeforeDay = this.slotMetrics.startsBeforeDay(start)
      const startsAfterDay = this.slotMetrics.startsAfterDay(end)

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
          label: localizer.format({ start, end }, format),
        })
      }

      this.setState({
        continuesEarlier:
          startsBeforeDay || this.slotMetrics.startsBefore(start),
        continuesLater: startsAfterDay || this.slotMetrics.startsAfter(end),
      })
    }
  }

  clearSelection() {
    clearTimeout(this._selectTimer)
    this._pendingSelection = []
  }

  handleShowMore = event => {
    const { target } = event
    const { popup, onDrillDown, getDrilldownView, events, date } = this.props
    //cancel any pending selections so only the event click goes through.
    this.clearSelection()

    if (popup) {
      let position = getPosition(target, findDOMNode(this))

      this.setState({
        overlay: { date, events, position, target },
      })
    } else {
      notify(onDrillDown, [date, getDrilldownView(date) || views.DAY])
    }

    // notify(onShowMore, [events, date, slot])
  }

  renderOverlay() {
    const {
      localizer,
      accessors,
      components,
      getters,
      events,
      popupClassname,
      view,
    } = this.props
    let overlay = (this.state && this.state.overlay) || {}

    return (
      <Overlay
        rootClose
        placement="bottom"
        show={!!overlay.position}
        onHide={() => this.setState({ overlay: null })}
        target={() => overlay.target}
      >
        {({ props }) => (
          <Popup
            {...props}
            view={view}
            accessors={accessors}
            components={components}
            getters={getters}
            localizer={localizer}
            events={events}
            position={overlay.position}
            popupClassname={popupClassname}
          />
        )}
      </Overlay>
    )
  }

  render() {
    const { events, style } = this.props
    return (
      <Fragment>
        {this.renderOverlay()}

        <a
          className="rbc-show-more week"
          style={{ top: `${style.top}%`, position: 'absolute' }}
          onClick={this.handleShowMore}
        >{`Show ${events.length} events`}</a>
      </Fragment>
    )
  }
}

export default EventsMultipleWeek
