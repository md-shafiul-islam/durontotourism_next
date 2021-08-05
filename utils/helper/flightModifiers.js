import { esHelperGetFilterOption, esHelperGetTime } from "./esFnc";
import { helperIsEmpty } from "./helperAction";

class FlightModifiers {
  getRoundTripFlights = (flightsRes, type, callBack) => {
    console.log("Current Flight Response, Using ", type, ", ", flightsRes);
    if (!helperIsEmpty(flightsRes)) {
      let flights = [];
      let changePenaltiesList = new Map();
      let cancelPenaltiesList = new Map();

      if (helperIsEmpty(flightsRes.response)) return;
      let { airSegments, airPricePoints, fareInfos } = flightsRes.response;

      airPricePoints &&
        airPricePoints.forEach((airPrice, apIdx) => {
          console.log("Flight Modifier PricePoint, ", airPrice);
          let {
            //Air Price Point Destacture
            approximateFees,
            approximateTaxes,
            approximateTotalPrice,
            basePrice,
            taxes,
            totalPrice,
            approximateBasePrice,
          } = airPrice;

          let priceInfos = {
            // Create Air Price Infos
            approximateFees,
            approximateTaxes,
            approximateTotalPrice,
            basePrice,
            taxes,
            totalPrice,
            approximateBasePrice,
          };

          let cancelPenalties = [];
          let changePenalties = [];
          airPrice &&
            airPrice.airPricingInfo &&
            airPrice.airPricingInfo.forEach((pricingInfo, piIdx) => {
              console.log(
                "Flight Modifier PricePoint -> Price Info, ",
                pricingInfo
              );
              let {
                cancelPenalty,
                changePenalty,
                passengerType,
                platingCarrier,
              } = pricingInfo;

              cancelPenalties.push({
                key: passengerType[0].code,
                group: apIdx,
                penalty: cancelPenalty,
              });
              changePenalties.push({
                key: passengerType[0].code,
                group: apIdx,
                penalty: changePenalty,
              });

              if (passengerType[0].code === "ADT" && piIdx === 0) {
                //console.log("pricingInfo Each One: ", pricingInfo);

                let eachPrices = {
                  eachTotalPrice: pricingInfo && pricingInfo.totalPrice,
                  eachApxBasePrice:
                    pricingInfo && pricingInfo.approximateBasePrice,
                  eachBasePrice: pricingInfo && pricingInfo.basePrice,
                  eachEqBasePrice:
                    pricingInfo && pricingInfo.equivalentBasePrice,
                  eachTotalTax: pricingInfo && pricingInfo.taxes,
                };
                pricingInfo &&
                  pricingInfo.flightOptionsList &&
                  pricingInfo.flightOptionsList.flightOption &&
                  pricingInfo.flightOptionsList.flightOption.forEach(
                    (flightOpt) => {
                      console.log("Flight Options RND", flightOpt);
                      let { origin, destination } = flightOpt;

                      flightOpt &&
                        flightOpt.option &&
                        flightOpt.option.forEach((option) => {
                          flights.push({
                            group: apIdx,
                            priceInfos,
                            origin,
                            destination,
                            option: this.initOptionFormat(
                              option,
                              origin,
                              destination,
                              airSegments,
                              fareInfos
                            ),
                            platingCarrier,
                            eachPrices,
                          });
                        });
                    }
                  );
              }
            });

          cancelPenaltiesList.set(apIdx, cancelPenalties);
          changePenaltiesList.set(apIdx, changePenalties);
        });

      console.log(
        "ModifiFlight, ",
        flights,
        " Cancel, ",
        cancelPenaltiesList,
        " Change, ",
        changePenaltiesList
      );
      callBack(true);
      return this.initFlightFormat(
        flights,
        cancelPenaltiesList,
        changePenaltiesList
      );
    }

    callBack(false);
  };

  initOptionFormat = (
    option,
    pOrigin,
    pDestination,
    airSegments,
    fareInfos
  ) => {
    if (
      !helperIsEmpty(option) &&
      !helperIsEmpty(pOrigin) &&
      !helperIsEmpty(pDestination) &&
      !helperIsEmpty(airSegments) &&
      !helperIsEmpty(fareInfos)
    ) {
      if (option !== null && option !== undefined) {
        let departureDateTime = "",
          arrivalDateTime = "",
          filterOpts = {departure:"", arrival:""};
        let carriers = [];
        let flightNums = [];
        let stops = [];
        let { bookingInfo, connection, travelTime, key } = option;

        let bookingInfos = [];
        let bookInfSize = bookingInfo && bookingInfo.length - 1;

        bookingInfo &&
          bookingInfo.forEach((book, idx) => {
            let {
              bookingCode,
              bookingCount,
              cabinClass,
              fareInfoRef,
              segmentRef,
            } = book;
            let segment = airSegments[segmentRef];
            let fareInf = fareInfos[fareInfoRef];

            if (segment !== null && segment !== undefined) {
              let {
                origin,
                flightNumber,
                destination,
                departureTime,
                carrier,
                arrivalTime,
              } = segment;
              connection &&
                connection.map((conn, cIdx) => {
                  if (conn.segmentIndex === idx) {
                    segment.connection = conn;
                  }
                });

              arrivalDateTime = arrivalTime;

              if (idx === 0) {
                departureDateTime = departureTime;
              }

              if (pOrigin !== origin) {
                stops.push(origin);
              }

              if (!carriers.includes(carrier)) {
                carriers.push(carrier);
              }

              let flNum = `${carrier}-${flightNumber}`;

              if (!flightNums.includes(flNum)) {
                flightNums.push(flNum);
              }
            }

            bookingInfos.push({
              bookingCode,
              bookingCount,
              cabinClass,
              segment,
              fareInf,
            });
          });
        
        filterOpts.departure = esHelperGetFilterOption(esHelperGetTime(departureDateTime));
        filterOpts.arrival = esHelperGetFilterOption(esHelperGetTime(arrivalDateTime));
        return {
          travelTime,
          bookingInfos,
          flightNums,
          carriers,
          stops,
          departureDateTime,
          arrivalDateTime,
          filterTimeOpts:filterOpts
        };
      }
    }
  };

  initFlightFormat = (flights, cancelPenaltiesList, changePenaltiesList) => {
    return (
      flights &&
      flights.map((flight, idx) => {
        let {
          destination,
          origin,
          option,
          priceInfos,
          group,
          platingCarrier,
          eachPrices,
        } = flight;       

        return {
          group,
          destination,
          origin,
          option,
          priceInfos,
          cancelPenalties: cancelPenaltiesList.get(group),
          changePenalties: changePenaltiesList.get(group),
          platingCarrier,
          eachPrices,
        };
      })
    );
  };

  prevProssesFunc = () => {
    // if (helperIsEmpty(this.state.response)) return;
    // console.log("After State Response if, ");
    // let {
    //   airSegments,
    //   airPricePoints,
    //   fareInfos
    // } = this.state.response; //nProps.searchResponse.response;
    // if (helperIsEmpty(routeList)) return;
    // if (helperIsEmpty(routeList.route)) return;
    // if (helperIsEmpty(routeList.route[0])) return;
    // // console.log("Route List, ", routeList);
    // let { leg } = (routeList && routeList.route && routeList.route[0]) || [];
    // let departureLeg = {};
    // let returnLeg = {};
    // leg.forEach((lg, idx) => {
    //   if (lg.group === 0) {
    //     departureLeg = lg;
    //   }
    //   if (lg.group === 1) {
    //     returnLeg = lg;
    //   }
    // });
    // let departureFlights = [];
    // let returnFlights = [];
    // let changePenaltiesList = new Map();
    // let cancelPenaltiesList = new Map();
    // airPricePoints &&
    //   airPricePoints.forEach((airPrice, apIdx) => {
    //     console.log("Air Price Prosseing, ", airPrice);
    //     let {
    //       approximateFees,
    //       approximateTaxes,
    //       approximateTotalPrice,
    //       basePrice,
    //       taxes,
    //       totalPrice,
    //       approximateBasePrice,
    //     } = airPrice;
    //     let priceInfos = {
    //       approximateFees,
    //       approximateTaxes,
    //       approximateTotalPrice,
    //       basePrice,
    //       taxes,
    //       totalPrice,
    //       approximateBasePrice,
    //     };
    //     let cancelPenalties = [];
    //     let changePenalties = [];
    //     airPrice &&
    //       airPrice.airPricingInfo &&
    //       airPrice.airPricingInfo.forEach((pricingInfo, piIdx) => {
    //         console.log("RTFR pricingInfo, ", pricingInfo);
    //         let {
    //           cancelPenalty,
    //           changePenalty,
    //           passengerType,
    //           platingCarrier,
    //         } = pricingInfo;
    //         cancelPenalties.push({
    //           key: passengerType[0].code,
    //           group: apIdx,
    //           penalty: cancelPenalty,
    //         });
    //         changePenalties.push({
    //           key: passengerType[0].code,
    //           group: apIdx,
    //           penalty: changePenalty,
    //         });
    //         if (passengerType[0].code === "ADT" && piIdx === 0) {
    //           //console.log("pricingInfo Each One: ", pricingInfo);
    //           let eachPrices = {
    //             eachTotalPrice: pricingInfo && pricingInfo.totalPrice,
    //             eachApxBasePrice:
    //               pricingInfo && pricingInfo.approximateBasePrice,
    //             eachBasePrice: pricingInfo && pricingInfo.basePrice,
    //             eachEqBasePrice: pricingInfo && pricingInfo.equivalentBasePrice,
    //             eachTotalTax: pricingInfo && pricingInfo.taxes,
    //           };
    //           pricingInfo &&
    //             pricingInfo.flightOptionsList &&
    //             pricingInfo.flightOptionsList.flightOption &&
    //             pricingInfo.flightOptionsList.flightOption.forEach(
    //               (flightOpt) => {
    //                 console.log("Flight Options RND", flightOpt);
    //                 let { origin, destination, legRef } = flightOpt;
    //                 if (legRef === departureLeg.key) {
    //                   flightOpt &&
    //                     flightOpt.option &&
    //                     flightOpt.option.forEach((option) => {
    //                       departureFlights.push({
    //                         group: apIdx,
    //                         priceInfos,
    //                         origin,
    //                         destination,
    //                         option: this.getOptionFormat(
    //                           option,
    //                           origin,
    //                           destination
    //                         ),
    //                         platingCarrier,
    //                         eachPrices,
    //                       });
    //                     });
    //                 }
    //                 if (legRef === returnLeg.key) {
    //                   flightOpt &&
    //                     flightOpt.option &&
    //                     flightOpt.option.forEach((option) => {
    //                       // console.log("Air Option: ", option);
    //                       returnFlights.push({
    //                         group: apIdx,
    //                         priceInfos,
    //                         origin,
    //                         destination,
    //                         option: this.getOptionFormat(
    //                           option,
    //                           origin,
    //                           destination
    //                         ),
    //                         platingCarrier,
    //                         eachPrices,
    //                       });
    //                     });
    //                 }
    //               }
    //             );
    //         }
    //       });
    //     cancelPenaltiesList.set(apIdx, cancelPenalties);
    //     changePenaltiesList.set(apIdx, changePenalties);
    //   });
    // // console.log("Departure Flights, ", departureFlights);
    // // console.log("Return Flights, ", returnFlights);
    // departureFlights = this.getFlightFormat(
    //   departureFlights,
    //   cancelPenaltiesList,
    //   changePenaltiesList
    // );
    // returnFlights = this.getFlightFormat(
    //   returnFlights,
    //   cancelPenaltiesList,
    //   changePenaltiesList
    // );
    // // console.log("After Departure Flights, ", departureFlights);
    // // console.log("After Return Flights, ", returnFlights);
    // this.setState({
    //   departureFlights,
    //   retFlights: returnFlights,
    //   prePerdStatus: false,
    // });
    // // console.log("After Init ...");
  };
}

export const flightModifiers = new FlightModifiers();
