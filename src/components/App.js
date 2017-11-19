import React, { Component } from 'react';
import styled, { css } from 'styled-components';
import ShareButtons from './social/ShareButtons';
import States from './States'
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import BonnImage from '../assets/bonn.jpg';
import ProtestImage from '../assets/climate-protest.jpg';
import {MdOpenInNew, MdAdjust} from 'react-icons/lib/md';

const STATES = require('../data/states');

class App extends Component {
  state = {
    selectedState: null,
    stateData: null,
    showOpportunities: false
  }
  openPetition(url) {
    window.location.href = url;
  }
  handleChange(selState) {
    const reducer = (obj, g) => {
      if(g.state === selState) {
        obj = g
      }
      return obj
    }
    const data = STATES['GradeSheet'].reduce(reducer, {});
    const showOpps = data.not_adopted_total === 0 ? false : true;
    this.setState({
      selectedState: selState,
      stateData: data,
      showOpportunities: showOpps
    })
  }
  render() {
    const options = STATES['US'];
    const gradesheet = STATES['GradeSheet'];
    const currentGrade = gradesheet.filter(grade => grade.state === this.state.selectedState)
    return (
      <div>
        <Cover>
          <ContentContainer>
            <Title className="App-title">Stand Up For Climate Action</Title>
          </ContentContainer>
        </Cover>
        <ContentContainer>
          <FlexRows>
            <Lede>
              <p>The Trump administration’s plans to withdraw from the Paris Climate Accord would make the U.S. the only country in the world not part of an agreement to coordinate efforts to address climate change.</p>
              <p>We’re already seeing the effects of climate change across the globe. We can’t afford to wait for this administration to come around and do something — <b>So we’re taking the fight to our state governors</b>.</p>
              <p>The constitution grants states broad authority to regulate their energy sources and emissions. Select your state from the dropdown to see what it could be doing better — <b>And then sign the petition to your governor asking them to take action.</b></p>
            </Lede>
            <StatePanel>
              <PanelHeader>
                <h3>Select your state</h3>
                <Select
                  id="state-select"
                  ref="stateSelect"
                  autoFocus
                  options={options}
                  simpleValue
                  name="selected-state"
                  value={this.state.selectedState}
                  onChange={(s) => this.handleChange(s)}
                  searchable={true}
                />
              </PanelHeader>
              {(this.state.selectedState &&
                <GradeSheet>
                  <GradeHeader>
                    <h1>{this.state.stateData.name}</h1>
                    <Grade>{this.state.stateData.grade}</Grade>
                  </GradeHeader>
                  <p>
                    <b>Opportunities</b><br/>
                    <small>{this.state.stateData.name} has adopted <b>{this.state.stateData.score} of 30</b> climate-friendly policies studied at the state level.</small>
                    {( this.state.showOpportunities &&
                      <small> They could adopt more climate-friendly policies in the following areas:</small>
                    )}
                  </p>
                  {( this.state.showOpportunities &&
                    <OppList>
                      {this.state.stateData.not_adopted.map((area) => {
                        return (
                          <li key={area}><MdAdjust size={14} style={{marginTop: '-4px'}}/> {area}</li>
                        )
                      })}
                    </OppList>
                  )}
                  <p>{this.state.stateData.report}</p>
                  <button onClick={() => this.openPetition(this.state.stateData.petition)}>
                    Sign {this.state.stateData.name} Petition
                    &nbsp;<MdOpenInNew size={16} style={{marginTop: '-4px'}}/>
                  </button>
                </GradeSheet>
              )}
            </StatePanel>
          </FlexRows>
        </ContentContainer>
        <Footer>
          <ContentContainer>
            <ShareButtons/>
          </ContentContainer>
        </Footer>
      </div>
    );
  }
}

const sizes = {
  huge: 2000,
  desktopwide: 1170,
  desktop: 992,
  tablet: 768,
  phone: 376
}

const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16
  accumulator[label] = (...args) => css`
    @media (max-width: ${emSize}em) {
      ${css(...args)}
    }
  `
  return accumulator
}, {})

const Title = styled.h1`
  margin-top: 0;
  padding-top: 2em;
  font-family: 'Roboto Condensed', Helvetica, sans-serif;
  font-size: 4em;
  line-height: 1.15;
  color: tomato;
  max-width: 55%;
 	${media.phone`
    max-width: 90%;
    font-size: 2em;
    padding-top: 1em;
  `}
  ${media.tablet`
    max-width: 90%;
    font-size: 2em;
  `}
`
const Cover = styled.div`
  background: linear-gradient(to top, rgba(255,250,249,1) 0%, rgba(255,250,249,0.8) 50%, rgba(255,250,249,0.8) 100%), url('${ProtestImage}');
  background-position: center center, center center;
  background-repeat: no-repeat, no-repeat;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  background-size: cover;
  width: 100%;
  height: 100%;
`
const ContentContainer = styled.div`
  font-family: 'PT Serif', serif;
  font-size: 1em;
  & p {
    line-height: 1.45;
  }
  & b {
    color: tomato;
  }
  color: dimgrey;
  margin: 0 auto;
  max-width: 960px;
  padding: 0 40px;
  ${media.huge`
    max-width: 960px;
    padding: 0 40px;
  `}
 	${media.desktop`
    max-width: 700px;
  `}
 	${media.tablet`
    max-width: 700px;
  `}
 	${media.phone`
    max-width: 340px;
    padding: 0 20px;
  `}
`
const FlexRows = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  ${media.tablet`
    flex-direction: column;
  `}
 	${media.phone`
    flex-direction: column;
  `}
`
const Lede = styled.div`
  font-size: 1.2em;
  max-width: 500px;
  padding-right: 30px;
  width: 60%;
  ${media.tablet`
    width: 80%;
  `}
 	${media.phone`
    width: 90%;
    font-size: 1em;
  `}
`
const StatePanel = styled.div`
  width: 25em;
  max-width: 25em;
  padding: 0px;
  background-color: tomato;
  height: 100%;
  min-height: 130px;
  border-radius: 7px;
  margin-top: 28px;
  -webkit-box-shadow: 0px 22px 64px -2px rgba(196,196,196,1);
  -moz-box-shadow: 0px 22px 64px -2px rgba(196,196,196,1);
  box-shadow: 0px 22px 64px -2px rgba(196,196,196,1);
  ${media.tablet`
    width: 80%;
  `}
 	${media.phone`
    width: 100%;
    margin: 0 auto;
  `}
`
const GradeSheet = styled.div`
  color: tomato;
  background-color: white;
  padding: 0px 30px;
  & button {
    font-size: 1em;
    font-family: 'Roboto Condensed', Helvetica, sans-serif;
    text-transform: uppercase;
    letter-spacing: 1px;
    padding: 12px 12px;
    margin-bottom: 30px;
    border-radius: 5px;
    background-color: tomato;
    width: 100%;
    color: white;
    border: none;
    cursor: pointer;
    text-decoration: none;
    transition: background-color 0.2s;
  }
  & button:hover {
    background-color: #C73217;
  }
  & small {
    color: grey;
  }
`
const Footer = styled.div`
  margin: 0 auto;
  margin-top: 60px;
  text-align: center;
  font-size: 1em;
  width: 100%;
  padding-top: 3em;
  padding-bottom: 3em;
  background-color: white;
  border-top: 2px solid tomato;
  ${media.tablet`
    margin: 60px 0 0 0;
    text-align: left;
    font-size: 0.7em;
  `}
 	${media.phone`
    margin: 60px auto 0px auto;
    font-size: 0.7em;
    text-align: center;
  `}
`
const PanelHeader = styled.div`
  border-top-right-radius: 7px;
  border-top-left-radius: 7px;
  padding: 20px 30px;
  width: auto;
  height: auto;
  background-color: tomato;
  & h3 {
    color: white;
    margin-top: 0;
    font-family: 'Roboto Condensed', Helvetica, sans-serif;
    letter-spacing: 1px;
    text-transform: uppercase;
  }
`
const GradeHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding-top: 20px;
  & h1 {
    margin-top: 2px;
  }
`
const Grade = styled.div`
  font-family: 'Roboto Condensed', Helvetica, sans-serif;
  font-size: 2em;
  line-height: 1.5em;
  text-align: center;
  color: white;
  background-color: #222;
  width: 50px;
  height: 50px;
  border-radius: 50%;
`
const OppList = styled.ul`
  list-style: none;
  margin: 0;
  padding: 0;
  color: tomato;
`
export default App;
