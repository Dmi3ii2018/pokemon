import React, { useRef } from "react";
import Form from "react-bootstrap/Form";

interface IForm {
  searchValue: string;
  queryHandler: (evt: React.ChangeEvent<HTMLInputElement>) => void;
}


const Input: React.FC<IForm> = (prop) => {
  const { searchValue, queryHandler } = prop;

  return (
    <Form>
      <Form.Group controlId="exampleForm.ControlSelect1">
        <Form.Label>Search by name</Form.Label>
        <Form.Control value={searchValue} onChange={queryHandler} type="text" />
      </Form.Group>
    </Form>
  );
};

export default React.memo(Input);
