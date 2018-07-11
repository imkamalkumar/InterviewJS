import { func, shape, string } from "prop-types";
import React, { Component } from "react";

import {
  Container,
  FormItem,
  Label,
  Legend,
  Separator,
  TextInput
} from "interviewjs-styleguide";
// import { GLOBALS, USER_ACTIONS } from "../../../../options";

export default class LinkTab extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange = (e) => {
    const { name, value } = e.target;
    const draft = {
      ...this.props.draft,
      [name]: value
    };
    this.props.updateDraft("link", draft);
  };
  render() {
    const { value, title } = this.props.draft;
    return (
      <Container padded>
        <FormItem>
          <Label>Link URL</Label>
          <TextInput
            input
            name="value"
            onChange={(e) => this.handleChange(e)}
            placeholder="Select and paste URL e.g. http://… or www.…"
            required
            type="url"
            value={value}
          />
          <Legend tip="Select and paste URL e.g. http:// ... or www. ... ">
            i
          </Legend>
        </FormItem>
        <Separator silent />
        <FormItem>
          <Label>Display text (optional)</Label>
          <TextInput
            input
            name="title"
            onChange={(e) => this.handleChange(e)}
            placeholder="Type the text to be hyperlinked"
            value={title}
          />
          <Legend tip="Type the text to be hyperlinked">i</Legend>
        </FormItem>
      </Container>
    );
  }
}

LinkTab.propTypes = {
  updateDraft: func.isRequired
};

LinkTab.defaultProps = {};
