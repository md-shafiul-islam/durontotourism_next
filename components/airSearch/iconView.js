import React, {useEffect} from "react";

 const slAir = ["UK", "AI", "G8*", "6E*", "H1"]; 

 /**
  * 
  * @param {@ String iconSizeClass className: icon-view-area-small, icon-view-area-medium, icon-view-area-big @ [] selectedAirs } params 
  * @returns 
  */
const IconView = (params) => {
  

  const getBgImageUrl = (cUrlCode) => {
    //get objectList item obj By pOb obj["APU"]);
    let airImageUrl = "";
    if(params.airlinseList !== undefined){

      let selectedAir = params.airlinseList[cUrlCode];
      
      
      if(selectedAir !== undefined){
        airImageUrl = selectedAir.imageUrl;
    
        return `/assets/images/air_logo/${airImageUrl}`;
      }

    }

    
    return `/assets/images/air_logo/unavailable.png`;

  };

  return (
    <React.Fragment>
      <div className={`${params.iconSizeClass}`}>
      {/*params.selectedAirs*/}
      { params.selectedAirs &&
        params.selectedAirs.map((code, cIdx) => {
          return (
            
            <div
              className={`icon-view ${params.selectedAirs.length} ${cIdx >= 1 ? " mgt-10 " : ""}`}
              style={{ backgroundImage: `url(${getBgImageUrl(code)})` }}
            ></div>
            
          );
        })}
        </div>
    </React.Fragment>
  );
};

export default IconView;
