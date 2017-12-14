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
            <Input name="lastname" id="lastname" label="Last Name" type="text" placeholder="Last Name" required />
            <Input name="firstname" id="firstname" label="First Name" type="text" placeholder="First Name" required />
            <Input name="ndID" id="ndID" label="ndID" type="text" placeholder="ndID" required />
            //<Input name="DOB" id="DOB" label="DOB" type="text" placeholder="DOB" required />
            <Input name="date[0]" value="" label="Date fo Birth" type="date" placeholder="This is a date input."required/>
            <RadioGroup name="yearRadioGrp" type="inline" label="Level" options={yearOptions} required />
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

const ShortIce = ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
        <fieldset>
            <legend>Basic Information</legend>
            <Input name="firstname" id="firstname" label="First Name" type="text" placeholder="First Name" value="Royce" required />
			<Input name="lastname" id="lastname" label="Last Name" type="text" placeholder="Last Name" value="Branning" required/>
			<Input name="email" id="email" label="Email" type="text" placeholder="joe@joe.com" value="joe@joe.com" required />
            <Input name="date" id="date" value="" label="Date of Birth" type="date" placeholder="This is a date input." />
            <RadioGroup id="yearRadioGrp" name="yearRadioGrp" type="inline" label="Level" options={yearOptions} />
			<Input name="major" id="major" label="Major" type="text" placeholder="Major" value="CS" required />
            <Input name="religion" id="religion" label="Religion" type="text" placeholder="Religion" value="Christian" required />
            <Input name="hall" id="hall" label="Hall" type="text" placeholder="Hall" value="Keenan" required />
            <Input name="roomnum" id="roomnum" label="Room #" type="text" placeholder="Room #" value="111" required />
            <Input name="cellphonenum" id="cellphonenum" label="Cell Phone #" type="text" placeholder="Cell Phone #" value="1231231234" required />
		</fieldset>
		<br></br>
		<fieldset>
            <legend>Home Information</legend>
            <Input name="address" id="address" label="Address" type="text" placeholder="Address" value="111 Bools Ln" required />
            <Input name="city" id="city" label="City" type="text" placeholder="City" value="Menlo Park" required />
            <Input name="state" id="state" label="State" type="text" placeholder="State" value="California" required />
            <Input name="zip" id="zip" label="Zip" type="text" placeholder="Zip" value="11111" required />
            <Input name="country" id="country" label="Country" type="text" placeholder="country" value='USA' required />
		  </fieldset>
		  <br></br>
          <fieldset>
          		<legend>Fathers Information</legend>
                <Input name="fathername" id="fathername" label="Father's Name" type="text" placeholder="Father's Name" value="Rich" required />
                <RadioGroup name="fatherMaritalStatusRadioGrp" type="inline" label="Select one" options={maritalStatusOptions} />
                <Input name="fatheremail" id="fatheremail" label="Father's Email" type="text" placeholder="Father's Email" value="rich@b.com" required />
                <Input name="fatheremployment" id="fatheremployment" label="Father's Place of Employment" type="text" placeholder="Father's Place of Employment" value="company1" required />
        </fieldset>
		<br></br>
		<fieldset>
                <legend>Mothers Information</legend>
                <Input name="mothername" id="mothername" label="Mother's Name" type="text" placeholder="Mother's Name" value="dianna" required />
                <RadioGroup name="motherMaritalStatusRadioGrp" type="inline" label="Select one" options={maritalStatusOptions}  />
                <Input name="motheremail" id="motheremail" label="Mother's Email" type="text" placeholder="Mother's Email" value="m@m.com" required />
                <Input name="motheremployment" id="motheremployment" label="Mother's Place of Employment" type="text" placeholder="Mother's Place of Employment" value="company" required />
        </fieldset>
		<fieldset>
                <legend>Emergency Contact Information</legend>
                <Input name="ec_name" id="ec_name" label="Name" type="text" placeholder="Name" value="rb" required />
                <Input name="ec_relation" id="ec_relation" label="Relation" type="text" placeholder="Ex. Brother, Friend, etc." value="brother" required />
				<Input name="ec_phone" id="ec_phone" label="EC's Phone" type="text" placeholder="phone number" value="123" required />
            	<Input name="insurance" id="insurance" label="Medical Insurance Coverave" type="text" placeholder="Insurance Provider" value="rb insurance corp" required />
        </fieldset>
		<fieldset>
            <Row>
                <input className="btn btn-primary" type="submit" defaultValue="Submit" />
            </Row>
        </fieldset>
	</Form>
);

 

export default class IceForm extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props)
		console.log(this.state)
		this.handleSubmit = event => {
			this.props.history.push("/landing");
		}
		this.onSubmit = ({ lastname, firstname, ndID, netid, date, yearRadioGrp,
			roomnum, email, major, motheremail, mothername, 
			motheremployment, fatheremail, fathername, fatheremployment,
			ec_phone, ec_name, ec_relation, religion, cellphonenum, address,
			city, state, zip, country, insurance}) => {
				console.log("yearRadioGrp")
				console.log(yearRadioGrp)
				const ice_info = {
					'last_name' : lastname,
					'first_name': firstname,
					'ndid' 	    : ndID,
					'netid'     : netid,
					'birthday'  : date,
					'class_level': yearRadioGrp,
					'dorm' 		: '1',
					'room' 		: roomnum,
					'email' 	: email,
					'major' 	: major,
					'religion': religion,
					'mother_email' : motheremail,
					'mother_emp'   : motheremployment,
					'mother_name'  : mothername,
					'father_email' : fatheremail,
					'father_emp'   : fatheremployment,
					'father_name'  : fathername,
					'ec_phone'     : ec_phone,
					'ec_relation'  : ec_relation,
					'ec_name' 	   : ec_name,
					'phone_num'    : cellphonenum,
					'street_addr'  : address,
					'city': city,
					'state': state,
					'zip': zip,
					'country': country,
					'insurance': insurance
				}

				request.post('/api/iceform/update_account').send(ice_info).end( (err, res) => {
					if (err) return

					this.props.history.push("/about"); 
					console.log(res.body)
				})

			}

	}

	render() {
		return (
			<div>
			<div>
			<ShortIce onSubmit={this.onSubmit} />
			</div>
			</div>
		)
	}
}
