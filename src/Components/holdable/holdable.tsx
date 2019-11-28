import React from 'react'
const holdTime = 500 // ms
const holdDistance = 3 ** 2 // pixels squared
type Props = {
  id: any,
  onClick: any,
  onHold: any,
  children: any,
}
type State = {
  timer: number | null,
  pos: any,
}

export default class Holdable extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      timer: null,
      pos: [0, 0],
    }

  }

  onPointerDown = (evt: any) => {
    this.setState({
      pos: [evt.clientX, evt.clientY],
    })
    const event = { ...evt } // convert synthetic event to real object
    const timeoutId: any = window.setTimeout(this.timesup.bind(null, event), holdTime);
    this.setState({
      timer: timeoutId
    });
  }

  onPointerUp = (evt: any) => {
    if (this.state.timer) {
      window.clearTimeout(this.state.timer)
      this.setState({
        timer: null,
      })
      this.props.onClick(evt)
    }
  }

  onPointerMove = (evt: any) => {
    // cancel hold operation if moved too much
    if (this.state.timer) {
      const d = (evt.clientX - this.state.pos[0]) ** 2 + (evt.clientY - this.state.pos[1]) ** 2
      if (d > holdDistance) {
        this.setState({
          timer: null,
        })
        window.clearTimeout(this.state.timer)
      }
    }
  }

  timesup = (evt: any) => {
    this.setState({
      timer: null,
    })
    this.props.onHold(evt)
  }
  render() {
    return (
      <div
        onPointerDown={this.onPointerDown}
        onPointerUp={this.onPointerUp}
        onPointerMove={this.onPointerMove}
      >
        {this.props.children}
      </div>
    )
  }

}