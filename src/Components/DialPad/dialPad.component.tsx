import React from "react";
import Holdable from '../holdable/holdable';
import {
  Panel,
  PanelBody,
  TeamsThemeContext,
  Input,
} from "msteams-ui-components-react";
import {
  MSTeamsIcon,
  MSTeamsIconType,
  MSTeamsIconWeight
} from "msteams-ui-icons-react";
import './dialPad.styles.scss';
interface Props { }
interface State {
  data: string[],
  buttonLetter: string[],
  value: string,
}

class DialPad extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
      buttonLetter: ["", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ", "", "+", ""],
      value: '',
    };
  }

  onHold = (index: number) => {
    if (this.state.data[index] === '0')
      this.setState((prevState) => ({
        value: prevState.value + '+',
      }))
  }

  onValueChanged = (event: any) => {
    this.setState({
      value: event.target.value,
    });
  }

  handleButtonClick = (index: number) => {
    this.setState((prevState) => ({
      value: prevState.value + this.state.data[index],
    }))
  }

  handleRemove = () => {
    this.setState({
      value: this.state.value.substring(0, this.state.value.length - 1),
    })
  }

  deleteAll = () => {
    this.setState({
      value: '',
    })
  }

  deleteMouseOver = () => {
    const myinput: any = document.getElementById('input1');
    myinput.classList.add("mystyle");
  }
  render() {
    const {data, buttonLetter, value} = this.state;
    return (
      <TeamsThemeContext.Consumer>
        {context => {
          const { rem, font } = context;
          const { sizes, weights } = font;
          const styles = {
            header: { ...sizes.title, ...weights.semibold },
            section: {
              ...sizes.title2,
              marginTop: rem(1.4),
              marginBottom: rem(1.4)
            },
            button: {
              background: 'blue',
              '&:hover': {
                background: 'red !important',
              }
            },
            input: {
              padding: rem(0),       
            },
          }
          return (
                <div className='top-container'>
                <div className='input-contanier' >
                  <Input
                    id='input1'
                    className='my-input'
                    value={value}
                    onChange={this.onValueChanged}
                    required />
                  {
                    value && (<Holdable
                      onHold={this.deleteAll}
                      onClick={this.handleRemove}
                      id='44455'
                    >
                      <MSTeamsIcon
                        onMouseOver={this.deleteMouseOver}
                        className='remove-icon'
                        iconWeight={MSTeamsIconWeight.Regular}
                        iconType={MSTeamsIconType.Backspace}
                      />
                    </Holdable>)
                  }
                </div>
               
                  <div className='button-container'>
                    {
                      data.map((number, index) => (
                        <Holdable
                          onHold={() => this.onHold(index)}
                          onClick={() => this.handleButtonClick(index)}
                          id='76'
                        >
                          <div className='my-button' key={index}>
                            <span className='button__number'> {number} </span>
                            {buttonLetter[index] && <span className='buttonLetter'>{buttonLetter[index]}</span>}
                          </div>
                        </Holdable>
                      ))
                    }
                  </div>
                  <div className='dial-icon-container'>
                  <div className='dial-icon-div'>
                      <MSTeamsIcon
                        className='dial-icon'
                        iconWeight={MSTeamsIconWeight.Regular}
                        iconType={
                          MSTeamsIconType.CallStartBig} />
                    </div>
                    </div>
                </div>
          )
        }}
      </TeamsThemeContext.Consumer>
    );
  }
}
export default DialPad;
