import React, { Component } from "react";
import { PropTypes } from "prop-types";
import { Col } from "react-bootstrap";
import { connect } from "react-redux";
import AirLinesFilter from "../../airSearch/SearchResults/AirFiltersCards/airLinesFilter";
import FlightCatelogFilter from "../../airSearch/SearchResults/AirFiltersCards/flightCatelogFilter";
import PopulerFilter from "../../airSearch/SearchResults/AirFiltersCards/populerFilter";
import { filterSelectStopsAction, setTravelTimeFilterItems } from "../../../redux/actions/filterAction";

class Sidebar extends Component {

  returnCatalogueAction = (item, type=0)=>{
    
    let airTims = {departureTimes:[], arrivalTimes:[]};

    let deptureItems = [];
        
    let arrivalItems = [];

    if(this.props.returnAirTimes !== undefined && item !== undefined && type > 0){    
    
      if(type === 1){
        
        if(Array.isArray(this.props.returnAirTimes.departureTimes)){
          let hasItem = this.props.returnAirTimes.departureTimes.includes(item);

          this.props.returnAirTimes.departureTimes.forEach((time, idx)=>{
            if(item !== time){
              deptureItems.push(time);
            }
          })
          if(!hasItem){
            deptureItems.push(item);
          }
          
        }else{
          deptureItems.push(item);
        }  
        airTims.departureTimes = deptureItems;
        airTims.arrivalTimes = this.props.returnAirTimes.arrivalTimes; 
      }

      if(type === 2){
        if(Array.isArray(this.props.returnAirTimes.arrivalTimes)){
          let hasItem = this.props.returnAirTimes.arrivalTimes.includes(item);

          this.props.returnAirTimes.arrivalTimes.forEach((time, idx)=>{
            if(item !== time){
              arrivalItems.push(time);
            }
          })
          if(!hasItem){
            arrivalItems.push(item);
          }
          
        }else{
          arrivalItems.push(item);
        }
        airTims.arrivalTimes = arrivalItems;
        airTims.departureTimes = this.props.returnAirTimes.departureTimes;
      }
    }

    this.props.setTravelTimeFilterItems(airTims, 1);
    return;
  }
  
  departureCatalogueAction = (item, type=0)=>{
    
    let airTims = {departureTimes:[], arrivalTimes:[]};

    let deptureItems = [];
        
    let arrivalItems = [];

    if(this.props.departureAirTimes !== undefined && item !== undefined && type > 0){    
    
      if(type === 1){
        
        if(Array.isArray(this.props.departureAirTimes.departureTimes)){
          let hasItem = this.props.departureAirTimes.departureTimes.includes(item);

          this.props.departureAirTimes.departureTimes.forEach((time, idx)=>{
            if(item !== time){
              deptureItems.push(time);
            }
          })
          if(!hasItem){
            deptureItems.push(item);
          }
          
        }else{
          deptureItems.push(item);
        }  
        airTims.departureTimes = deptureItems;
        airTims.arrivalTimes = this.props.departureAirTimes.arrivalTimes; 
      }

      if(type === 2){
        if(Array.isArray(this.props.departureAirTimes.arrivalTimes)){
          let hasItem = this.props.departureAirTimes.arrivalTimes.includes(item);

          this.props.departureAirTimes.arrivalTimes.forEach((time, idx)=>{
            if(item !== time){
              arrivalItems.push(time);
            }
          })
          if(!hasItem){
            arrivalItems.push(item);
          }
          
        }else{
          arrivalItems.push(item);
        }
        airTims.arrivalTimes = arrivalItems;
        airTims.departureTimes = this.props.departureAirTimes.departureTimes;
      }
    }

    this.props.setTravelTimeFilterItems(airTims, 0);
    return;
  }

  stopsAction = (stop, type = 0)=>{

    const stops = [];

    if(type === 1){
      if(this.props.airDepStops){
        if(Array.isArray(this.props.airDepStops)){
          this.props.airDepStops.forEach((item, idx)=>{
            if(stop !== item){
              stops.push(item);
            }
          })
  
          if(!this.props.airDepStops.includes(stop)){
            stops.push(stop);      
          }
        }else{
          stops.push(stop);
        }
  
      }else{
        stops.push(stop);
      }      
      
      }else if(type === 2){
        if(this.props.airRetStops){
          if(Array.isArray(this.props.airRetStops)){
            this.props.airRetStops.forEach((item, idx)=>{
              if(stop !== item){
                stops.push(item);
              }
            })
    
            if(!this.props.airRetStops.includes(stop)){
              stops.push(stop);      
            }
          }else{
            stops.push(stop);
          }
    
        }else{
          stops.push(stop);
        }
      }
      console.log("Air Stops Selected Action Send Befor, ", stops);
      
      this.props.filterSelectStopsAction(stops, type);
  }
    

  render() {
    return (
      <React.Fragment>
        {console.log("this.props.airStops, ", this.props.airStops)}
        <Col sm={12}>
          <PopulerFilter />
          <FlightCatelogFilter 
            title="Onward Journey"
            name="departure"
            options={this.props.onwardFilterOptions} 
            preSelectAirStops={this.props.airDepStops}
            preSelectItems={this.props.departureAirTimes}

            getSelcetdDeparture={(item)=>{
              console.log("Sidebar Catelogfilter Departure Item, ", item);
              this.departureCatalogueAction(item.value, 1);
            }}
            getSelcetdArrival={(item)=>{
              console.log("Sidebar Catelogfilter Arrival Item, ", item);
              this.departureCatalogueAction(item.value, 2);

            }}
            
            getStopAction={(stop)=>{
              this.stopsAction(stop, 1)
            }}

            />

            <FlightCatelogFilter 
            title="Return Journey" 
            name="return"
            options={this.props.returnFilterOptions} 
            preSelectItems={this.props.returnAirTimes}
            preSelectAirStops={this.props.airRetStops}

            getSelcetdDeparture={(item)=>{
              console.log("Sidebar Catelogfilter Departure Item, ", item);
              this.returnCatalogueAction(item.value, 1);
            }}
            getSelcetdArrival={(item)=>{
              console.log("Sidebar Catelogfilter Arrival Item, ", item);
              this.returnCatalogueAction(item.value, 2);

            }}

            getStopAction={(stop)=>{
              this.stopsAction(stop, 2)
            }}
            
            />
          <AirLinesFilter />
        </Col>
      </React.Fragment>
    );
  }
}

Sidebar.prototypes = {
  setTravelTimeFilterItems: PropTypes.func.isRequired,
  filterSelectStopsAction: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

const stateMapToProps = (state)=>({
  errors: state.errors,
  onwardFilterOptions: state.airFilters.onwardFilterOptions,
  returnFilterOptions: state.airFilters.returnFilterOptions,
  departureAirTimes: state.airFilters.departureAirTimes,
  returnAirTimes: state.airFilters.returnAirTimes,
  airDepStops:state.airFilters.stopsDepFlights,
  airRetStops:state.airFilters.stopsRetFlights

})

export default connect(stateMapToProps, {setTravelTimeFilterItems, filterSelectStopsAction})(Sidebar);
