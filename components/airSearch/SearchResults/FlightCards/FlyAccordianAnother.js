import React from "react";

const FlyAccordianAnother = (params) => {
  return (
    <div>
      <Row>
        <Col md={3}></Col>

        <Col md={9}>
          <div className="content">
            <Row>
              <div className="col-lg-12">
                {/** short card item Strat */}

                {availableFlights &&
                  availableFlights.map((availavleFlight, idx) => {
                    return (
                      <React.Fragment key={`rs-${idx}`}>
                        <ShortInfCard
                          oneWay={false}
                          elementKey={`dep-${idx}`}
                          airSegments={airSegmentList}
                          fareInfList={fareInfoList}
                          flightDetailsList={flightDetailsList}
                          brands={brandList}
                          routes={routeList.route}
                          availableFlight={availavleFlight}
                          legs={leg}
                          preSetOption={this.state.preSetOption}
                          getSelectedFlyOption={(item, ids) => {
                            this.setBookingAction(item, ids);
                          }}
                          removeFlyOptionAction={(
                            item,
                            flyIndex,
                            bookIdx,
                            optionIndex,
                            elKey
                          ) => {
                            this.bookInfoRemoveAction(
                              item,
                              flyIndex,
                              bookIdx,
                              optionIndex,
                              elKey
                            );
                          }}
                        />
                      </React.Fragment>
                    );
                  })}
                {/** short card item End */}
              </div>
            </Row>
            {/* /.row */}
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default FlyAccordianAnother;
