import React from "react";
import {
  Panel,
  PanelBody,
  PanelFooter,
  PanelHeader,
  TeamsThemeContext,
  Dropdown,
  IconButton
} from "msteams-ui-components-react";
import { Table, TBody, Tr, Th, Td } from "msteams-ui-components-react";
import {
  MSTeamsIcon,
  MSTeamsIconType,
  MSTeamsIconWeight
} from "msteams-ui-icons-react";
import "./table.styles.scss";
interface Props { }

interface State {
  data: {
    avatar: string;
    name: string;
    type: string;
    Duration: string;
    Date: string;
  }[];
}

class TableExample extends React.Component<Props, State> {
  constructor(props: any) {
    super(props);
    this.state = {
      data: [
        {
          avatar: "https://ui-avatars.com/api/?rounded=true",
          name: "Juilen Herrero",
          type: "Incoming",
          Duration: "45sec",
          Date: "29/11 11:43",
        },
        {
          avatar: "https://ui-avatars.com/api/?rounded=true",
          name: "Juilen Herrero",
          type: "Missed call",
          Duration: "20sec",
          Date: "22/10 11:43",

        },
        {
          avatar: "https://ui-avatars.com/api/?rounded=true",
          name: "Juilen Herrero",
          type: "Incoming",
          Duration: "10sec",
          Date: "11/11 11:43",
        },
        {
          avatar: "https://ui-avatars.com/api/?rounded=true",
          name: "Juilen Herrero",
          type: "Outgoing",
          Duration: "33sec",
          Date: "25/12 11:43",
        }
      ],

    };
  }

  getCallIcon = (type: string) => {
    switch (type) {
      case "Incoming":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MSTeamsIcon
              iconType={MSTeamsIconType.CallIn}
              iconWeight={MSTeamsIconWeight.Light}
            />
            <span>Incoming</span>
          </div>
        );
        break;
      case "Outgoing":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MSTeamsIcon
              iconType={MSTeamsIconType.CallOut}
              iconWeight={MSTeamsIconWeight.Light}
            />
            <span>Outgoing</span>
          </div>
        );
        break;
      case "Missed call":
        return (
          <div style={{ display: "flex", justifyContent: "center" }}>
            <MSTeamsIcon
              style={{ color: "red" }}
              iconType={MSTeamsIconType.CallMissed}
              iconWeight={MSTeamsIconWeight.Light}
            />
            <span>Missed call</span>
          </div>
        );
    }
    return <MSTeamsIcon />;
  };

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
            }
          };
          return (
            <Panel  className='panel' style={{maxWidth:'50vw',height:'400px'}} >
              <PanelHeader>
                <div style={{ textAlign: 'left', fontWeight: 'bold' }}>Call History </div>
              </PanelHeader>
              <PanelBody >
                <Table className="calls-table" style={{ minWidth:'40vw',position:'relative'}}>
                  <TBody>
                    <Tr style={{minWidth:'600px'}}>
                      <Td>Name</Td>
                      <Td >Type</Td>
                      <Td>Duration</Td>
                      <Td>Date</Td>
                    </Tr>
                    {this.state.data.map((item, index) => (
                      <Tr style={{minWidth:'600px'}}>
                        <Td>
                          <img
                            src="https://ui-avatars.com/api/?rounded=true"
                            alt="Avatar"
                            className="avatar"
                          />
                          &nbsp; <span>{item.name} </span>
                        </Td>
                        <Td>
                          {this.getCallIcon(item.type)}
                        </Td>
                        <Td>{item.Duration}</Td>
                        
                        <Td >
                          <span>{item.Date}</span>
                          <IconButton
                            iconWeight={MSTeamsIconWeight.Regular}
                            className='table-call-icon'
                            style={{
                              background: "white",
                              color: "#BEBBB8",
                              borderRadius: "50%",
                              marginLeft: "1.2vw",
                              width: "35px",
                              height: "35px"
                            }}
                            iconType={MSTeamsIconType.CallStartBig}
                          />
                          <Dropdown
                            className='dropDown'
                            autoFocus
                            mainButtonText=""
                            items={[
                              {
                                render: () => (
                                  <div className="dropdown-Content" >
                                    <MSTeamsIcon
                                      iconWeight={MSTeamsIconWeight.Light}
                                      iconType={
                                        MSTeamsIconType.IllustrationMonkey
                                      }
                                    />
                                    <span>Add to speed dial</span>
                                  </div>
                                ),
                                onClick: () => console.log("hello")
                              },
                              {
                                render: () => (
                                  <div className="dropdown-Content">
                                    <MSTeamsIcon
                                      iconWeight={MSTeamsIconWeight.Light}
                                      iconType={MSTeamsIconType.Delete}
                                    />
                                    <span>Delete</span>
                                  </div>
                                ),
                                onClick: () => console.log("hello")
                              }
                            ]}
                          />
                        </Td>
                      </Tr>
                    ))}
                  </TBody>
                </Table>
             
              </PanelBody>
              <PanelFooter></PanelFooter>
            </Panel>
          );
        }}
      </TeamsThemeContext.Consumer>
    );
  }
}

export default TableExample;
