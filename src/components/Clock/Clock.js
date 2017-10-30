import React, { Component } from 'react';

class Clock extends Component {
  constructor(props) {
    super(props);
    const [date, time] = this.getCurrentTime();
    this.state = { time, date };
  }

  componentDidMount() {
    setInterval(() => {
      const [date, time] = this.getCurrentTime();
      this.setState({ time, date });
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    const differentTime = this.state.time !== nextState.time;
    const differentDate = this.state.date !== nextState.date;
    return differentTime || differentDate;
  }

  getCurrentTime = () => {
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const currentDate = new Date();
    const hours = (`0${currentDate.getHours()}`).slice(-2);
    const minutes = (`0${currentDate.getMinutes()}`).slice(-2);
    const monthName = monthNames[currentDate.getMonth()];
    return [`${currentDate.getDate()} ${monthName}`, `${hours}:${minutes}`];
  }

  render() {
    return (
      <div className="time">
        <span id="time" className="time-count">{this.state.time}</span>
        <span id="date" className="time-day">{this.state.date}</span>
      </div>
    );
  }
}

export default Clock;
