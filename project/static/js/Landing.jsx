import React, { Component } from "react";
import { Button, FormGroup, FormControl, ControlLabel } from "react-bootstrap";
import Autosuggest from 'react-autosuggest';
import AutosuggestHighlightMatch from 'autosuggest-highlight/umd/match';
import AutosuggestHighlightParse from 'autosuggest-highlight/umd/parse';
import request from 'superagent';
import "./Home.css"
import "./Search.css"

var people = [
  {
    first: 'Charlie',
    last: 'Brown',
    twitter: 'dancounsell',
	netid: 'cbrown'
  },
  {
    first: 'Charlotte',
    last: 'White',
    twitter: 'mtnmissy',
	netid: 'cwhite'
  },
  {
    first: 'Chloe',
    last: 'Jones',
    twitter: 'ladylexy',
	netid: 'cjones'
  },
  {
    first: 'Cooper',
    last: 'King',
    twitter: 'steveodom',
	netid: 'cking'
  }
];

var ppl_id = {}

// https://developer.mozilla.org/en/docs/Web/JavaScript/Guide/Regular_Expressions#Using_Special_Characters
function escapeRegexCharacters(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getSuggestions(value) {
  const escapedValue = escapeRegexCharacters(value.trim());
  
  if (escapedValue === '') {
    return [];
  }

  const regex = new RegExp('\\b' + escapedValue, 'i');
  
  return people.filter(person => regex.test(getSuggestionValue(person)));
}

function getSuggestionValue(suggestion) {
  return `${suggestion.first} ${suggestion.last}`;
}

function renderSuggestion(suggestion, { query }) {
  const suggestionText = `${suggestion.first} ${suggestion.last}`;
  const matches = AutosuggestHighlightMatch(suggestionText, query);
  const parts = AutosuggestHighlightParse(suggestionText, matches);

  return (
    <span className={'suggestion-content ' + suggestion.twitter}>
      <span className="name">
        {
          parts.map((part, index) => {
            const className = part.highlight ? 'highlight' : null;

            return (
              <span className={className} key={index}>{part.text}</span>
            );
          })
        }
      </span>
    </span>
  );
}

export default class Example extends Component {
  constructor(props) {
    super(props);

	request.get('/api/iceform/get_residents').end( (err, res) => {
			if (err) return

			console.log(res.body)
			var users = res.body['data']
			people = []
			for( var i = 0; i < users.length; i++){
				console.log('name #' + i + ': ' + users[i])
				people.push({first:users[i][0],last:users[i][1], twitter:'null', netid:users[i][2]})
				ppl_id[users[i][0]+' '+users[i][1]] = users[i][2]	
			}
	})


	this.handleSubmit = event => {
		event.preventDefault();
		this.props.addUsername(ppl_id[this.state.value])
		this.props.history.push("/info")
	}

    this.state = {
      value: '',
      suggestions: []
    };    
  }

  onChange = (event, { newValue, method }) => {
    this.setState({
      value: newValue
    });
  };
  
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };

  render() {
    const { value, suggestions } = this.state;
    const inputProps = {
      value,
      onChange: this.onChange
    };

	if (!this.props.isAuthenticated) {
		this.props.history.push("/login");
	}
	else if (this.props.accessGroup != 2) {
		return (<h3>Not Authorized</h3>)
	}

    return (
      <div className="Home">
        <div className="lander">
          <h1>Welcome to IceCloud</h1>
          <p>To search for a resident enter information below.</p>
		  <form onSubmit={this.handleSubmit}>
			<FormGroup controlId="res_ndid" bsSize="large">
				<br></br>
				<ControlLabel>Resident Name</ControlLabel>
				<Autosuggest
				suggestions={suggestions}
				onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
				onSuggestionsClearRequested={this.onSuggestionsClearRequested}
				getSuggestionValue={getSuggestionValue}
				renderSuggestion={renderSuggestion}
				inputProps={inputProps}
				highlightFirstSuggestion={true}/>
				<br></br>
			</FormGroup>
			<Button block bsSize="large" type="submit">Search</Button>
		  </form>
        </div>
      </div>
          );
  }
}

