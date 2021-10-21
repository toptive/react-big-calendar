import React from 'react'
import PropTypes from 'prop-types'

class EventTooltip extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    //const { FIELD_DEFS } = this.props.event
    const { event } = this.props
    const { FIELD_DEFS } = event
    return (
      <div className="rbc-overlay" style={{ position: 'absolute' }}>
        {FIELD_DEFS.map((e, i) => (
          <div key={i}>
            <input type={e.TYPE} value={e.TITLE} style={e.STYLE} />
          </div>
        ))}
      </div>
    )
  }
}

EventTooltip.propTypes = {
  FIELD_DEFS: PropTypes.object,
  event: PropTypes.object,
}

export default EventTooltip
