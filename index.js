// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    timerlimit: 25,
    istimerunning: false,
    timeelapsed: 0,
    isdisable: false,
  }

  clearTimerInterval = () => clearInterval(this.intervalId)

  startpausetimer = () => {
    this.setState(prevstate => ({
      istimerunning: !prevstate.istimerunning,
      isdisable: true,
    }))
  }

  decreasetimer = () => {
    const {timerlimit} = this.state
    if (timerlimit > 1) {
      this.setState({timerlimit: timerlimit - 1})
    }
  }

  increasetimer = () => {
    const {timerlimit} = this.state
    this.setState({timerlimit: timerlimit + 1})
  }

  reset = () => {
    this.setState({
      timerlimit: 25,
      isdisable: false,
      istimerunning: false,
      timeelapsed: 0,
    })
  }

  increaseelapsedtime = () => {
    const {timerlimit, timeelapsed} = this.state
    const istimecompleted = timerlimit * 60 - timeelapsed
    if (istimecompleted) {
      this.clearTimerInterval()
      this.reset()
    } else {
      this.setState(prevState => ({
        timeelapsed: prevState.timeelapsed + 1,
      }))
    }
  }

  gettimer = () => {
    const {timerlimit, timeelapsed} = this.state
    let minutes = Math.floor((timerlimit * 60 - timeelapsed) / 60)
    let seconds = Math.ceil((timerlimit * 60 - timeelapsed) % 60)
    minutes = minutes > 9 ? minutes : `0${minutes}`
    seconds = seconds > 9 ? seconds : `0${seconds}`

    return `${minutes}:${seconds}`
  }

  render() {
    const {timerlimit, istimerunning, isdisable} = this.state
    const imgurl = istimerunning
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altimg = istimerunning ? 'pause icon' : 'play icon'
    const timerstatus = istimerunning ? 'Running' : 'Paused'
    const showtimerstatus = istimerunning ? 'Pause' : 'Start'

    return (
      <div className="container">
        <h1 className="heading">Digital Timer</h1>
        <div className="timercontrolcontainer">
          <div className="backgroundimgcontainer">
            <div className="whitebgcontainer">
              <h1 className="counter">{this.gettimer()}</h1>
              <p className="counterpara">{timerstatus}</p>
            </div>
          </div>
          <div className="controlscontainer">
            <div className="startresetcontaienr">
              <div className="startcontainer">
                <img
                  src={imgurl}
                  alt={altimg}
                  className="startpauseimg"
                  onClick={this.startpausetimer}
                />
                <h2 className="startpausepara">{showtimerstatus}</h2>
              </div>
              <div className="resetcontainer">
                <img
                  src="https://assets.ccbp.in/frontend/react-js/reset-icon-img.png "
                  alt="reset icon"
                  className="resetimg"
                  onClick={this.reset}
                />
                <h2 className="resetpara">Reset</h2>
              </div>
            </div>
            <div className="addminutescontainer">
              <p className="settimepara">Set Timer Limit</p>
              <div className="plusminuscontainer">
                <button
                  type="button"
                  className="button"
                  onClick={this.decreasetimer}
                  disabled={isdisable}
                >
                  <p className="minuspara">-</p>
                </button>
                <div className="minutesdiv">
                  <p className="minutespara">{timerlimit}</p>
                </div>
                <button
                  type="button"
                  className="button"
                  onClick={this.increasetimer}
                  disabled={isdisable}
                >
                  <p className="pluspara">+</p>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default DigitalTimer
