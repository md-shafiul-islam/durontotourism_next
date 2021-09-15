export const initScrollPositionCount = (sticky, callBack) => {
  const { stickyNavStatus, topSectionStatus } = sticky;
  const returnObj = { stickyNavStatus, topSectionStatus };

  window.addEventListener("scroll", (e) => {
    console.log(
      "Window scroll Event Fire, ",
      e.target.documentElement.scrollTop
    );

    let cPosition = e.target.documentElement.scrollTop;

    if (!returnObj.stickyNavStatus) {
      if (cPosition >= 90) {
        returnObj.stickyNavStatus = true;
        returnObj.topSectionStatus = false;
        console.log(
          "First IF Block !!",
          returnObj.stickyNavStatus,
          " T ",
          returnObj.topSectionStatus
        );
        callBack({ stickyNavStatus: returnObj.stickyNavStatus, topSectionStatus: returnObj.stickyNavStatus });
      }
    }

    if (!returnObj.topSectionStatus) {
        console.log("To Section Status: ", returnObj.topSectionStatus);
      if (169 >= cPosition || 90 >= cPosition) {
        returnObj.stickyNavStatus = false;
        returnObj.topSectionStatus = true;
        console.log(
          "2nd IF Block !!",
          returnObj.stickyNavStatus,
          " T ",
          returnObj.topSectionStatus
        );
        callBack();
        callBack({ stickyNavStatus: returnObj.stickyNavStatus, topSectionStatus: returnObj.stickyNavStatus });

      }
    }
  });

  return returnObj;
};
