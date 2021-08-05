import React, { useState, useEffect } from "react";
import SearchOption from "./searchOption";
import AutoCompleteSearch from "./autoCompleteSearch";

/**
 * @author MD. Shafiul Islam
 * @param {String title, suggestions[suggestion], @function getSelectedData, FieldName name, FieldID id} props
 */
const AutoSearchSuggestionList = (props) => {
  const [selectedItem, setSelectedItem] = useState(undefined);

  useEffect(() => {
    setSelectedItem(props.preSetItem);
    props.getSelectedData(props.preSetItem);
    console.log("Auto props: Pre Set Item: ", props, " : ", props.preSetItem);
  }, []);

  return (
    <React.Fragment>
      <SearchOption
        title={props.title}
        populateItem={selectedItem}
        cardClass="card-hover"
      >
        <AutoCompleteSearch
          pHolder={props.title}
          options={props.suggestions}
          getSelectedItem={(value) => {
            props.getSelectedData(value);
            setSelectedItem(value);
            console.log("Auto Selected Value: ", value);
          }}
          fName={props.name}
          fId={props.id}
        />
      </SearchOption>
    </React.Fragment>
  );
};

export default AutoSearchSuggestionList;
