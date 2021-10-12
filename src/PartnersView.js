import axios from "axios";
import React, { useEffect, useReducer } from "react";
import { Input, Table, Button, Dropdown, Form } from "semantic-ui-react";
import { reducer } from "./reducer";

const PartnersView = () => {
  const fetchPartners = () => {
    axios
      .get(
        "https://mindfuleducation-cdn.s3.eu-west-1.amazonaws.com/misc/data.json"
      )
      .then(response => {
        dispatch({
          type: "FETCH_PARTNERS",
          payload: response.data.getColleges,
        });
      })
      .catch(error => console.log({ error }));
  };

  useEffect(() => {
    fetchPartners();
  }, []);

  const [state, dispatch] = useReducer(reducer, {
    column: null,
    data: [],
    direction: null,
    inputName: "",
    inputPrefix: "",
    selectedOfstedRating: [],
  });

  const {
    column,
    data,
    direction,
    inputName,
    inputPrefix,
    selectedOfstedRating,
  } = state;

  let options = [];
  data.map(partner => {
    if (!options.find(option => option.text === partner.ofstedRating)) {
      options.push({
        key: partner.name,
        text: partner.ofstedRating,
        value: partner.ofstedRating,
      });
    }
  });

  const handleName = e => {
    dispatch({
      type: "INPUT_NAME",
      payload: e.target.value,
    });
  };

  const onSubmitForm = e => {
    apply();
  };

  const handlePrefix = e => {
    dispatch({
      type: "INPUT_PREFIX",
      payload: e.target.value,
    });
  };

  const handleDropDownSelect = (event, data) => {
    dispatch({
      type: "SELECTED_OFSTED_RATING",
      payload: data.value,
    });
  };

  const apply = () => {
    if (inputName) {
      dispatch({
        type: "NAME_FILTER",
        payload: inputName,
      });
    } else if (inputPrefix) {
      dispatch({
        type: "PREFIX_FILTER",
        payload: inputPrefix,
      });
    } else if (selectedOfstedRating.length !== 0) {
      dispatch({
        type: "OFSTED_RATING_FILTER",
        payload: selectedOfstedRating,
      });
    } else {
      fetchPartners();
    }
  };

  return (
    <div>
      <Form className="ui form" onSubmit={() => onSubmitForm()}>
        <div style={{ display: "flex", flexDirection: "row" }}>
          <div className="fields">
            <div className="field">
              <label>Name:</label>
              <Input type="text" onChange={e => handleName(e)} />
            </div>
            <div className="field">
              <label>Prefix:</label>
              <Input type="text" onChange={e => handlePrefix(e)} />
            </div>
            <div className="field">
              <label>Ofsted Rating:</label>
              <Dropdown
                placeholder="Ofsted Rating..."
                fluid
                multiple
                selection
                options={options}
                onChange={handleDropDownSelect}
              />
            </div>
          </div>
          <div style={{ padding: "23px 0 0 10px" }}>
            <Button className="ui button" onClick={() => apply()}>
              Apply
            </Button>
          </div>
        </div>
      </Form>

      <Table sortable celled fixed>
        <Table.Header>
          <Table.Row>
            <Table.HeaderCell
              sorted={column === "name" ? direction : null}
              onClick={() => dispatch({ type: "CHANGE_SORT", column: "name" })}
            >
              Partner
            </Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "groupPrefix" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "groupPrefix" })
              }
            >
              Prefix
            </Table.HeaderCell>
            <Table.HeaderCell>Logo/Preroll</Table.HeaderCell>
            <Table.HeaderCell
              sorted={column === "ofstedRating" ? direction : null}
              onClick={() =>
                dispatch({ type: "CHANGE_SORT", column: "ofstedRating" })
              }
            >
              Ofsted Rating
            </Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {data.map(({ name, groupPrefix, logo, ofstedRating }) => (
            <Table.Row key={name}>
              <Table.Cell>{name}</Table.Cell>
              <Table.Cell>{groupPrefix}</Table.Cell>
              <Table.Cell>
                <img style={{ width: "70px" }} src={logo} alt="" />
              </Table.Cell>
              <Table.Cell>{ofstedRating}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
};

export default PartnersView;
