import React, { useState, useEffect } from "react";
import Autosuggest from "react-autosuggest";
import AutosuggestHighlightMatch from "autosuggest-highlight/match";
import AutosuggestHighlightParse from "autosuggest-highlight/parse";
import Axios from "axios";
import { REQUEST_HEADER_GET } from "../../redux/types";

/**
 * Auto Complete Search Box
 * @param {autoSugestMainClass, codeClass, options, fName, fId } props
 * options Data List
 */

const AutoCompleteSearch = (props) => {
  const [searchKey, setSearchKey] = useState("");
  const [localSugegestions, setLocalSugegestions] = useState([]);
  const sugOptions = [];
  const [selectedValue, setSelectedValue] = useState("");

  const [rqSugs, setRqSugs] = useState([]);

  useEffect(() => {

    if(props.options !== undefined){
      setLocalSugegestions(props.options);
    }else{
      setLocalSugegestions([]);
    }
    
  }, []);

  const getSugestionViaReq = async (recValue)=>{

    console.log("Search Query: ", recValue);
    let url = `http://localhost:8050/airports-query/${recValue}`;
    await Axios.get(url, {headers:REQUEST_HEADER_GET})
    .then((res)=>{
      console.log("RES: ", res.data.message);
      res.data.ports && setLocalSugegestions(res.data.ports);
    }).catch((res)=>{
      console.log("Error: ", JSON.stringify(res, null, 2));
    });

  }

  const searchSuggesionUsinKey = (value) => {
    localSugegestions && localSugegestions.filter(({ name, iataCode }) =>
          name.toLowerCase().indexOf(searchKey.toLowerCase()) > -1 ||
          iataCode.indexOf(searchKey) > -1
      )
      .map((item, i) => {
        sugOptions.push(item);
      });

    return sugOptions;
  };

  const renderSuggestion = (suggestion, { query }) => {

    const suggestionText = `${suggestion.name}, `;
    const matches = AutosuggestHighlightMatch(suggestionText, query);
    const parts = AutosuggestHighlightParse(suggestionText, matches);

    return (
      <span className={"suggestion-content "}>
        <span className="name">
          {parts.map((part, index) => {
            const className = part.highlight ? "highlight" : null;

            return (
              <span className={className} key={index}>
                {part.text}
              </span>
            );
          })}
          <span className={props.codeClass}>{` ${suggestion.iataCode}`}</span>
        </span>
      </span>
    );
  };

  return (
    <React.Fragment>
      <div className={props.autoSugestMainClass}>
        <Autosuggest
          inputProps={{
            placeholder: `${props.pHolder}`,
            autoComplete: "4298248",
            name: `${props.fName}`,
            id: `${props.fId}`,
            value: searchKey,
            onChange: (e, { newValue }) => {
              setSearchKey(newValue);
            },
          }}
          suggestions={localSugegestions}
          onSuggestionsFetchRequested={({ value }) => {

            console.log("Search value, ", value);
            if (value !== undefined && value !== null) {
              
              getSugestionViaReq(value);
              
            }else{
              setLocalSugegestions(searchSuggesionUsinKey(value));
            }
            return;
          }}
          onSuggestionsClearRequested={() => {
            setLocalSugegestions([]);
          }}
          getSuggestionValue={(suggestion) => suggestion.name}
          renderSuggestion={renderSuggestion}
          onSuggestionSelected={(e, { suggestion, method }) => {
            if (method === "enter") {
              e.preventDefault();
            }

            setSelectedValue(suggestion);
            props.getSelectedItem(suggestion);
          }}
        />
      </div>
    </React.Fragment>
  );
};

export default AutoCompleteSearch;
