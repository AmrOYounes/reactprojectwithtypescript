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
import { number } from "prop-types";

interface Props { }
interface State {
  data: string[],
  letter: string[],
  value: string,
}

class DialPad extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'],
      letter: ["", "ABC", "DEF", "GHI", "JKL", "MNO", "PQRS", "TUV", "WXYZ", "", "+", ""],
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
    this.setState(Object.assign({}, this.state, { value: event.target.value }));
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
            <Panel>
              <PanelBody>
                <div className='topContainer'>

               
                <div className='input-contanier' >
                  <Input
                    id='input1'
                    className='my-input'
                    value={this.state.value}
                    onChange={this.onValueChanged}
                    required />
                  {
                    this.state.value && (<Holdable
                      onHold={this.deleteAll}
                      onClick={this.handleRemove}
                      id='44455'
                    >
                      <MSTeamsIcon
                        onMouseOver={this.deleteMouseOver}
                        className='remove-icon'
                        // style={{ position: 'absolute', top: '12px', right: '30%', fontSize: '200%', color: '#C8C6C4' }}
                        iconWeight={MSTeamsIconWeight.Regular}
                        iconType={MSTeamsIconType.Backspace}
                      />
                    </Holdable>)
                  }
                </div>
               
                  <div className='buttonContainer'>
                    {
                      this.state.data.map((number, index) => (
                        <Holdable
                          onHold={() => this.onHold(index)}
                          onClick={() => this.handleButtonClick(index)}
                          id='76'
                        >
                          <div className='mybutton'    >
                            <span className='buttonNumber'> {number} </span>
                            {this.state.letter[index] && <span className='letter'>{this.state.letter[index]}</span>}
                          </div>
                        </Holdable>
                      ))
                    }
                  </div>
                  <div className='callDial'>
                  <div className='dialIcon-container'>
                      <MSTeamsIcon
                        className='dialIcon'
                        iconWeight={MSTeamsIconWeight.Regular}
                        iconType={
                          MSTeamsIconType.CallStartBig} />
                    </div>
                    </div>
                </div>
              </PanelBody>
            </Panel>
          )
        }}
      </TeamsThemeContext.Consumer>
    );
  }
}
export default DialPad;
