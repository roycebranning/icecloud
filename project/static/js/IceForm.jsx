// IceForm.jsx
import React from 'react';
import FRC, { Form, Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } from 'formsy-react-components'
import request from 'superagent';

const Ice = ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
        <fieldset>
            <legend>Request</legend>
            <Input name="lastname" id="lastname" label="lastname" type="text" placeholder="lastname" required />
            <Input name="firstname" id="firstname" label="firstname" type="text" placeholder="firstname" required />
            <Input name="ndID" id="ndID" label="ndID" type="text" placeholder="ndID" required />
            <Input name="DOB" id="DOB" label="DOB" type="text" placeholder="DOB" required />
        </fieldset>
        <fieldset>
            <Row>
                <input className="btn btn-primary" type="submit" defaultValue="Submit" />
            </Row>
        </fieldset>
    </Form>
);

export default class IceForm extends React.Component {
 
    onSubmit({ lastname, password }) {
        const ice_info = {
            'lastname' : lastname,
            'password' : password,
        }
 
        request.post(window.location.href).send(ice_info).end( (err, res) => {
            if (err) return
 
            console.log(res.body)            

        })
    }
 
    render() {
      return (
        <div className="row">
          <div className="col-xs-6 offset-xs-3">
              <Ice onSubmit={this.onSubmit} />
          </div>
        </div>
      )
    }
}