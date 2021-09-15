import React, {useState} from "react";
import { shallowEqual, useSelector, useDispatch} from "react-redux";
import { GET_SEL_AIR_FLIGHT_FILTER } from "../../../../redux/types";
import { helperIsEmpty } from "../../../../utils/helper/helperAction";

const AirLinesFilter = (params) => {

  const airLincesFilterOpt = useSelector(state => state.airFilters.onwardFilterOptions.airLinces, shallowEqual);
  const airLincesList = useSelector(state => state.airSearch.airLinesList, shallowEqual);
  const selectedAirLinces = useSelector(state => state.airFilters.selectedAirCodes, shallowEqual);
  const dispatch = useDispatch();
  const getAirLinceName = (code)=>{
    console.log("AirLince Code, ", code);
    console.log("airLincesList, ", airLincesList);
    if(airLincesList){
      return airLincesList&&airLincesList[code]&&airLincesList[code].name;
    }
    return "";
  }

  const getSelectedIcons = (code)=>{

    if(!helperIsEmpty(selectedAirLinces)){
      if(selectedAirLinces.includes(code)){
        return <i className="check-bg fas fa-check-square"></i>;
      }
    }
    return <i className="far fa-square"></i>;
  }

  const filterSelectedAction = (code)=>{
    console.log("Air Code Action, ", code);
    let airs = [];

    if(Array.isArray(selectedAirLinces)){

      selectedAirLinces&&selectedAirLinces.map((airCode, idx)=>{
        if(code !== airCode){
          airs.push(airCode);
        }
      })

      if(!selectedAirLinces.includes(code)){
        airs.push(code);
      }
    }else{
      airs.push(code);
    }
    console.log("Current Air, ", airs);
    dispatch({type:GET_SEL_AIR_FLIGHT_FILTER, payload:airs})

  }
  return (
    <div className="shadow-sm p-3 mb-3 bg-body air-lince-filter">
      <div className="air-filter-title">{`Airlinces`}</div>

      <div className="airlinces-area">
        <ul>
          {airLincesFilterOpt&&airLincesFilterOpt.map((itemCode, idx)=>{            
            return (
                <li className="item" key={`air-lin-filter-${idx}`} onClick={()=>{
                  console.log("Current Code, ", itemCode);
                  filterSelectedAction(itemCode);
                }}>{getSelectedIcons(itemCode)}{` ${getAirLinceName(itemCode)}`}</li>
              );
          })}
          
        </ul>
      </div>
    </div>
  );
};

export default AirLinesFilter;
