import React from 'react';

import FormInput from '../form-input/form-input.component';
import CustomButton from '../custom-button/custom-button.component';

import { events } from '../../utils/event/event.component';

import MutationCreateEvent from "../../graphql/mutationRegisterEvent";

import { graphql, compose } from 'react-apollo';

import './event.styles.scss';

class Event extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
       name: '',
       email: '',
       mobile: ''
    }
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { name, email, mobile } = this.state;

    try {
      const input = {
        createeventinput: this.state
      }

      //await events.register(name, email, mobile);
      this.props.onAdd(input);

      this.setState({
        name: '',
        email: '',
        mobile: ''
      });

    } catch (error) {
      console.error(error)
    }
  };

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({ [name]: value });
  }

  render() {
    const { name, email, mobile } = this.state;
    return(
      <div className='event'>
        <h2 className='title'>TOSS EVENT!!!!</h2>
        <span>Win a free iPhone 11 Pro, AirPod Pro, etc</span>
        <form className='event-form' onSubmit={this.handleSubmit}>
          <FormInput type='text' name='name' value={name} onChange={this.handleChange} label='Name' required />
          <FormInput type='email' name='email' value={email} onChange={this.handleChange} label='Email' required />
          <FormInput type='tel' name='mobile' value={mobile} onChange={this.handleChange} label='Mobile' required />
          <CustomButton type='submit'>Submit</CustomButton>
        </form>
      </div>
    )
  }
}


export default compose(
  graphql(MutationCreateEvent, {
    props: props => ({
      onAdd: event => props.mutate({
        variables: event
      })
    })
  })
)(Event);
