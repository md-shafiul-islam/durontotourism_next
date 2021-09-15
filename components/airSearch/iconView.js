import React, {useEffect} from "react";

 const slAir = ["UK", "AI", "G8*", "6E*", "H1"]; 

 /**
  * 
  * @param {@ String iconSizeClass className: icon-view-area-small, icon-view-area-medium, icon-view-area-big @ [] selectedAirs } params 
  * @returns 
  */
const IconView = (params) => {
  
  console.log("IconView Params !! ", params);

  const getBgImageUrl = (cUrlCode) => {
    //get objectList item obj By pOb obj["APU"]);
    let airImageUrl = "";
    if(params.airlinseList !== undefined){

      let selectedAir = params.airlinseList[cUrlCode];
      
      console.log("Icon Url code ", cUrlCode)
      if(selectedAir !== undefined){
        airImageUrl = selectedAir.imageUrl;
    
        return `/assets/images/air_logo/${airImageUrl}`;
      }

    }

    
    return `/assets/images/air_logo/unavailable.png`;

  };

  return (
    <React.Fragment>
      <div className={params.iconSizeClass ? params.iconSizeClass : params.selectedAirs&&params.selectedAirs.length > 1 ? `icon-view-area-small` : `icon-view-area-medium`}>
      {/*params.selectedAirs*/}
      { params.selectedAirs &&
        params.selectedAirs.map((code, cIdx) => {
          console.log("Selected Air Icon View, ", code);

          return (
            
            <div key={`icon-carr-${cIdx}`}
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
