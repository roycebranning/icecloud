// LoginForm.jsx
import React from 'react';
//import { Form, Input, FormGroup, Col, FormControl, Checkbox, ControlLabel, Button } from "react-bootstrap";
import FRC, { Form, Checkbox, CheckboxGroup, Input, RadioGroup, Row, Select, File, Textarea } from 'formsy-react-components'
import request from 'superagent';

const Request = ({ onSubmit }) => (
    <Form onSubmit={onSubmit}>
        <fieldset>
            <legend>Login</legend>
            <Input name="username" id="username" label="username" type="text" placeholder="username" required />
            <Input name="password" id="password" label="password" type="text" placeholder="password" required />
        </fieldset>
        <fieldset>
            <Row>
                <input className="btn btn-primary" type="submit" defaultValue="Submit" />
            </Row>
        </fieldset>
    </Form>
);

/*const Request = (
    <Form>
        <fieldset>
            <legend>Request</legend>
            <Input name="username" id="username" label="username" type="text" placeholder="username" required />
            <Input name="password" id="password" label="password" type="text" placeholder="password" required />
        </fieldset>
        <fieldset>
            <Row>
                <input className="btn btn-primary" type="submit" defaultValue="Submit" />
            </Row>
        </fieldset>
    </Form>
);*/

export default class LoginForm extends React.Component {
    /*constructor(props) {
      super(props)

      this.state = { results: {}, pending: {} }
 
    }*/
 
    /*poll(id) {
        return () => {
            request.get(new URL(id, rootUrl)).end( (err, res) => {
                if (err) return
 
                const { result } = res.body
                if (!result) return
 
                const { results, pending } = this.state
 
                clearInterval(pending[id])
                delete pending[id]
 
                this.setState({ results: { ...results, [id]: result } })
            })
        }
    }*/
 
    onSubmit({ username, password }) {
        const credentials = {
            'username' : username,
            'password' : password,
        }
 
        request.post(window.location.href).send(credentials).end( (err, res) => {
            if (err) return
 
            console.log(res.body)            
            //const { results, pending } = this.state
            //console.log(res.body)
            //const { result: id } = res.body
            //const timers = {[id]:  setInterval(this.poll(id),  500)}
 
            //this.setState({ pending: {...pending, ...timers} })
        })
    }
 
    render() {
        //const { results, pending } = this.state
      return (
        <div className="row">
          <div className="col-xs-6 offset-xs-3">
              <Request onSubmit={this.onSubmit} />
          </div>
        </div>
      )
    }
}
