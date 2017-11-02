// IceForm.jsx
import React from 'react';
import FRC, { Form, Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } from 'formsy-react-components'
import request from 'superagent';

const yearOptions = [
    {value: 'freshman', label: 'Freshman'},
    {value: 'sophomore', label: 'Sophomore'},
    {value: 'junior', label: 'Junior'},
    {value: 'senior', label: 'Senior'},
];

const liveWithOptions = [
    {value: 'both', label: 'Both Parents'},
    {value: 'mother', label: 'Mother'},
    {value: 'father', label: 'Father'},
    {value: 'other', label: 'Other'},
];

const maritalStatusOptions = [
    {value: 'single', label: 'Single'},
    {value: 'married', label: 'Married'},
    {value: 'widowed', label: 'Widowed'},
    {value: 'separated', label: 'Separated'},
    {value: 'divorced', label: 'Divorced'},
    {value: 'remarried', label: 'Remarried'},
    {value: 'deceased', label: 'Deceased'},

];

const Ice = ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
        <fieldset>
            <legend>Basic Information</legend>
            <Input name="lastname" id="lastname" label="First Name" type="text" placeholder="Last Name" required />
            <Input name="firstname" id="firstname" label="First Name" type="text" placeholder="First Name" required />
            <Input name="ndID" id="ndID" label="ndID" type="text" placeholder="ndID" required />
            //<Input name="DOB" id="DOB" label="DOB" type="text" placeholder="DOB" required />
            <Input name="date[0]" value="" label="Date fo Birth" type="date" placeholder="This is a date input."required/>
            <RadioGroup name="yearRadioGrp" type="inline" label="Level" options={yearRadioOptions} required />
            <Input name="religion" id="religion" label="Religion" type="text" placeholder="Religion" required />
            <Input name="hall" id="hall" label="Hall" type="text" placeholder="Hall" required />
            <Input name="roomnum" id="roomnum" label="Room #" type="text" placeholder="Room #" required />
            <Input name="cellphonenum" id="cellphonenum" label="Cell Phone #" type="text" placeholder="Cell Phone #" required />
        </fieldset>
        <fieldset>
            <legend>Home Information</legend>
            <Input name="address" id="address" label="Address" type="text" placeholder="Address" required />
            <Input name="citystatezip" id="citystatezip" label="City, State, Zip" type="text" placeholder="City, State, Zip" required />
            <Input name="country" id="country" label="Country" type="text" placeholder="country" required />
            <Input name="primaryphone" id="primaryphone" label="Primary Phone" type="text" placeholder="Primary Phone" required />
            <Input name="secondaryphone" id="secondaryphone" label="Secondary Phone" type="text" help="optional" placeholder="Secondary Phone"/>
            <RadioGroup name="liveWithRadioGrp" type="inline" label="I live with" options={liveWithOptions} required />
            <fieldset>
                <legend>"Father's Information"</legend>
                <Input name="fathername" id="fathername" label="Father's Name" type="text" placeholder="Father's Name" required />
                <RadioGroup name="fatherMaritalStatusRadioGrp" type="inline" label="Select one" options={maritalStatusOptions} required />
                <Input name="fatheremail" id="fatheremail" label="Father's Email" type="text" placeholder="Father's Email" required />
                <Input name="fatheremployment" id="fatheremployment" label="Father's Place of Employment" type="text" placeholder="Father's Place of Employment" required />
            </fieldset>
            <fieldset>
                <legend>"Mother's Information"</legend>
                <Input name="mothername" id="mothername" label="Mother's Name" type="text" placeholder="Mother's Name" required />
                <RadioGroup name="motherMaritalStatusRadioGrp" type="inline" label="Select one" options={maritalStatusOptions} required />
                <Input name="motheremail" id="motheremail" label="Mother's Email" type="text" placeholder="Mother's Email" required />
                <Input name="motheremployment" id="motheremployment" label="Mother's Place of Employment" type="text" placeholder="Mother's Place of Employment" required />
            </fieldset>
            <Input name="insurance" id="insurance" label="Medical Insurance Coverave" type="text" placeholder="Insurance Provider" required />
        </fieldset>
        /*TODO ADD SIBLINGS*/
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