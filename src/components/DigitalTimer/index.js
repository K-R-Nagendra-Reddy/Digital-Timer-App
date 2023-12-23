// Write your code here
import {Component} from 'react'
import './index.css'

class DigitalTimer extends Component {
  state = {
    startButtonClicked: false,
    initialCountDown: 1500,
    operatedCountdown: 25,
  }

  ontoggleBtn = () => {
    const {startButtonClicked} = this.state
    if (startButtonClicked === false) {
      this.timerId = setInterval(this.slowdown, 1000)
      this.setState({startButtonClicked: true})
    } else {
      clearInterval(this.timerId)
      this.setState({startButtonClicked: false})
    }
  }

  slowdown = () => {
    const {initialCountDown} = this.state
    if (initialCountDown === 0) {
      this.setState({startButtonClicked: false})
    } else {
      this.setState(prevState => ({
        initialCountDown: prevState.initialCountDown - 1,
      }))
    }
  }

  decreaseInitialCountDown = () => {
    const {startButtonClicked} = this.state
    if (startButtonClicked === false) {
      this.setState(prevState => ({
        initialCountDown: prevState.initialCountDown - 60,
        operatedCountdown: prevState.operatedCountdown - 1,
      }))
    } else {
      this.setState(prevState => ({
        initialCountDown: prevState.initialCountDown,
        operatedCountdown: prevState.operatedCountdown,
      }))
    }
  }

  increaseInitialCountDown = () => {
    const {startButtonClicked} = this.state
    if (startButtonClicked === false) {
      this.setState(prevState => ({
        initialCountDown: prevState.initialCountDown + 60,
        operatedCountdown: prevState.operatedCountdown + 1,
      }))
    } else {
      this.setState(prevState => ({
        initialCountDown: prevState.initialCountDown,
        operatedCountdown: prevState.operatedCountdown,
      }))
    }
  }

  onResetBtn = () => {
    const {startButtonClicked} = this.state
    if (startButtonClicked === true) {
      clearInterval(this.timerId)
      this.setState(prevState => ({
        initialCountDown: 1500,
        operatedCountdown: 25,
        startButtonClicked: false,
      }))
    }
  }

  render() {
    const {startButtonClicked, initialCountDown, operatedCountdown} = this.state

    const Minutes = Math.floor(initialCountDown / 60)
    const Seconds = Math.floor(initialCountDown % 60)
    const wantedMinutes = Minutes >= 10 ? `${Minutes}` : `0${Minutes}`
    const wantedSeconds = Seconds >= 10 ? `${Seconds}` : `0${Seconds}`
    const startPassButtonImg = startButtonClicked
      ? 'https://assets.ccbp.in/frontend/react-js/pause-icon-img.png'
      : 'https://assets.ccbp.in/frontend/react-js/play-icon-img.png'
    const altOfStartPassBtn = startButtonClicked ? ' pause icon' : ' play icon'
    const resetImg =
      'https://assets.ccbp.in/frontend/react-js/reset-icon-img.png'
    const constAlt = 'reset icon'
    return (
      <div className="bg-container">
        <h1>Digital Timer</h1>
        <div className="total-container">
          <div className="image-container">
            <div className="output">
              <h1>
                {wantedMinutes}:{wantedSeconds}
              </h1>
              <p>{startButtonClicked ? 'Running' : 'Paused'}</p>
            </div>
          </div>
          <div className="buttons-container">
            <div>
              <button
                type="button"
                onClick={this.ontoggleBtn}
                className="button"
              >
                <div className="start-reset-style">
                  <img
                    src={startPassButtonImg}
                    alt={altOfStartPassBtn}
                    className="image"
                  />
                  <p>{startButtonClicked ? 'Pause' : 'Start'}</p>
                </div>
              </button>
              <button
                type="button"
                onClick={this.onResetBtn}
                className="button"
              >
                <div className="start-reset-style">
                  <img src={resetImg} alt={constAlt} className="image" />
                  <p>Reset</p>
                </div>
              </button>
              <p>Set Timer limit</p>
              <div className="operating-btns">
                <button
                  className="operator"
                  type="button"
                  onClick={this.decreaseInitialCountDown}
                >
                  -
                </button>
                <p className="present-count">{operatedCountdown}</p>
                <button
                  className="operator"
                  type="button"
                  onClick={this.increaseInitialCountDown}
                >
                  +
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
