import React, { Component } from "react";
import { Card } from "react-bootstrap";
import { PropTypes } from "prop-types";
import Axios from "axios";
import { connect } from "react-redux";
import { AIR_SEARCH_URL, REQUEST_HEADER } from "../../redux/types";

class InputTextAutoSuggestion extends Component {
  constructor() {
    super();
    this.handleChange = this.handleChange.bind(this);
  }

  state = {
    text: "",
    activeCode: "",    
    refItem: null, 
  };
  

  UNSAFE_componentWillReceiveProps(nextProps){
    // console.log("Com Will Receive Props, ", nextProps);
    if(nextProps){
      if(nextProps.activeStatus){
        setTimeout(() => {
          this.refItem.focus();
        }, 200);
      }
    }
  }

  handleChange = (e) => {
    if (!e) return;
    if (!e.target) return;
    console.log("Change Event Auto Suggestions, ", e.target.value);
    this.setState({ text: e.target.value });
    let url = `${AIR_SEARCH_URL}/airports-query/${e.target.value}`;

    
    if (e.target.value.length > 0) {
      
      const staus = true// false;
      if(staus){ //this.props.asyncStatus
        Axios.get(url, { headers: REQUEST_HEADER })
        .then((res) => {
          // console.log("Auto Suggestion Response, ", res.data);
          if (res.data) {
            if (res.data.status) {
              this.createAutoSuggestionsList(res.data.ports);
            }
          }
        })
        .catch((err) => {
          // console.log("AutoSuggestions Error, ", err);
        });
      }else{

        this.createAutoSuggestionsList(this.filteredAirPorts(e.target.value));
      }
      
    } else {
      let suggsElm = document.querySelector(`#sa-${this.props.id} #suggestions-${this.props.id}`);
      suggsElm.innerHTML = "";
    }
  };

  createAutoSuggestionsList = (suggestionsList) => {
    let suggestions = "";
    if (suggestionsList) {
      suggestionsList.forEach((item, idx) => {
        suggestions += `
          <li class="list-group-item sugestion">
              <div class="row">
                  <div class="col-md-12 text">
                      <span class="port-name">${item.name}</span>
                      <span class="port-location">${item.location}</span>
                  </div>
                  <div class="col-md-12 code">
                      <span class="port-code">${item.iataCode}</span>
                  </div>
              </div>
          </li>`;
      });
    }

    let suggsElm = document.querySelector(`#sa-${this.props.id} #suggestions-${this.props.id}`);
    // console.log("inject Element, ", suggsElm);
    if (suggsElm) {
      suggsElm.innerHTML = suggestions;
    }

    this.initKeyAction();
  };

  filteredAirPorts = (text)=>{
    if(this.props.airPorts){
      
      const regEx = new RegExp(`${text}`, "i");
      const regExCode = new RegExp(`^${text}`, "i");
      
      return this.props.airPorts.filter((port)=>{

        return regExCode.test(port.iataCode) || regEx.test(port.location) || regEx.test(port.name);
      })
    }
  }
  initKeyAction = () => {
    // console.log("Init Action Run ... ");
    window.onkeyup = (e) => {
      this.focusMoveAction(e.keyCode, e.which);
    };

    this.initClickAction();
  };

  initClickAction = ()=>{
    const suggestions = document.querySelectorAll(`#sa-${this.props.id} .list-group-item.sugestion`);
    suggestions && suggestions.forEach((suggestion, idx)=>{
      suggestion.addEventListener("click", (e)=>{
        // console.log("Click Item, ", e.target);

        if(e.target){
          if(e.target.classList){
            let code = "";
            let text = "";
            let parentElm = null;

            if(e.target.classList.contains("port-name") || e.target.classList.contains("port-location")){
              parentElm = e.target.parentElement.parentElement;
              code = parentElm.querySelector(".port-code").innerHTML;
              text = parentElm.querySelector(".port-name").innerHTML;
            }

            if(e.target.classList.contains("port-code")){
              code = e.target.innerHTML;
              parentElm = e.target.parentElement.parentElement;
              // console.log("Port Code Parent Elm, ", parentElm);
              text = parentElm.querySelector(".port-name").innerHTML;
            }

            if(e.target.classList.contains("code")){
              code = e.target.querySelector(".port-code").innerHTML;
              parentElm = e.target.parentElement;
              // console.log("Code Parent Elm, ", parentElm);
              if(parentElm){
                text = parentElm.querySelector(".port-name").innerHTML;
              }
            }

            if(e.target.classList.contains("list-group-item") && e.target.classList.contains("sugestion")){
              this.removeActin(suggestions);
              text = e.target.querySelector(".port-name").innerHTML;
              code = e.target.querySelector(".port-code").innerHTML;
              e.target.classList.add("active-item");
            }
            
            if(parentElm){
              this.removeActin(suggestions);
              parentElm = parentElm.parentElement;

              parentElm.classList.add("active-item");
            }

            this.setState({activeCode:code, text});
            this.props.getSelectedCode(code);
          }
        }
        
        
      })
    })
  }

  focusMoveAction = (keyCode, whc) => {
    
    if (keyCode) {
      const currentElm = document.querySelector(
        `#sa-${this.props.id} .list-group-item.sugestion.active-item`
      );
      const items = document.querySelectorAll(`#sa-${this.props.id}  .list-group-item.sugestion`);

      let activeCode = "";
      // console.log("items, ", items);

      if (keyCode === 40 || keyCode === 38 || whc === 40 || whc === 38)
        this.removeActin(items);

      //ArrowDown Action Start
      if (keyCode === 40 || whc === 40) {
        if (
          currentElm !== undefined &&
          currentElm !== null &&
          items.length > 0
        ) {
          // this.removeActin(items);

          let nextItem = currentElm.nextElementSibling;
          if (nextItem !== null) {
            nextItem.classList.add("active-item");
          } else {
            items[0].classList.add("active-item");
          }
        } else {
          items[0].classList.add("active-item");
        }
      }
      //ArrowDown Action End \

      //ArrowUp Action Start
      if (keyCode === 38 || whc === 38) {

        if (currentElm !== null && items.length > 0) {
          // this.removeActin(items);
          let prevItem = currentElm.previousElementSibling;

          if (prevItem !== null) {
            prevItem.classList.add("active-item");
          } else {
            items[items.length - 1].classList.add("active-item");
          }
        } else {
          // console.log("Last Item, ", items[items.length - 1]);
          items[items.length - 1].classList.add("active-item");
        }
      }
      //ArrowUp Action End

      // Preview Action input Area Start
      const cElm = document.querySelector(
        `#sa-${this.props.id}  .list-group-item.sugestion.active-item`
      );
      if (cElm !== null) {
        activeCode = cElm.querySelector(".port-code").innerHTML;
        let name = cElm.querySelector(".port-location");
        // console.log("Current Code, ", activeCode);

        let searchElm = document.querySelector(`#${this.props.id}`);
        if (searchElm !== null && name !== null)
          searchElm.value = name.innerHTML;

        //Preview -> Select Action Start
        if ((keyCode === 13 || whc === 13) && name !== null) {
          this.setState({ activeCode, text: name.innerHTML });
          this.props.getSelectedCode(activeCode);
        }
        //Preview -> Select Action End
      }
      // Preview Action input Area End
    }
  };

  removeActin = (items) => {
    if (items) {
      items.forEach((item, idx) => {
        item.classList.remove("active-item");
      });
    }
  };

  render() {
    return (
      <React.Fragment>
        
        <Card>
          <Card.Body>
            <div className="search-area" id={`sa-${this.props.id}`}>
              <ul className="suggestions">
                <li className="list-item-parent">
                  <div className="input-area">
                    <label htmlFor={this.props.id} className="search-icon">
                      <i className="fas fa-search-location"></i>
                    </label>
                    <input
                      ref={(inpt)=>{this.refItem = inpt}}
                      onChange={this.handleChange}
                      type="text"
                      name={this.props.name}
                      id={this.props.id}
                      value={this.state.text}
                      className="form-control"
                      autoComplete="off"
                      placeholder={this.props.label}
                      
                    />
                  </div>
                  <ul
                    className="list-group"
                    id={`suggestions-${this.props.id}`}
                  ></ul>
                </li>
              </ul>
            </div>
          </Card.Body>
        </Card>
      </React.Fragment>
    );
  }
}

InputTextAutoSuggestion.prototypes = {
  errors: PropTypes.object.isRequired,
  airPorts: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  errors: state.errors,
  airPorts: state.airSearch.airPortsArr,
});

export default connect(mapStateToProps, null)(InputTextAutoSuggestion);

