import React, { Component } from 'react'
import { connect } from 'react-redux';
import { PropTypes } from "prop-types";
import { getAirSearchRequest } from "../../actions/airSearchAction"

class SendRequestAirSearch extends Component {

    constructor(props) {
        super(props);

        this.submitAction = this.submitAction.bind(this);
    }

    UNSAFE_componentWillReceiveProps(nextPorps) {

        console.log("After Recive Response Search: ", nextPorps.airSearch);
        console.log("After Recive Response Search Error: ", nextPorps.errors);

    }

    submitAction = () => {

        let requestData = {
            "CatalogOfferingsRequestAir": {
                "offersPerPage": 1,
                "PassengerCriteria": [
                    {
                        "value": "ADT",
                        "number": 1
                    }
                ],
                "SearchCriteriaFlight": [
                    {
                        "@type": "SearchCriteriaFlight",
                        "departureDate": "2020-08-08",
                        "From":
                        {
                            "value": "DAC"
                        },
                        "To":
                        {
                            "value": "SHA"
                        }
                    }
                ],
                "SearchModifiersAir":
                {
                    "@type": "SearchModifiersAir",
                    "CarrierPreference":
                    {
                        "@type": "CarrierPreference",
                        "type": "Prohibited",
                        "carriers": ["WN"]
                    }
                }
            }
        }

        this.props.getAirSearchRequest(requestData);
    }

    render() {

        let { airSearchResponse } = this.props.airSearch;
        return (
            <React.Fragment>
                <button onClick={this.submitAction}>
                    Get Search Result
                </button>

                <pre>
                    {airSearchResponse && JSON.stringify(airSearchResponse, null, 2)}
                </pre>
            </React.Fragment>
        )
    }
}

SendRequestAirSearch.prototypes = {
    getAirSearchRequest: PropTypes.func.isRequired,

    airSearch: PropTypes.object.isRequired,

    errors: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
    airSearch: state.airSearch,
    errors: state.errors,
});

export default connect(mapStateToProps, { getAirSearchRequest })(SendRequestAirSearch);