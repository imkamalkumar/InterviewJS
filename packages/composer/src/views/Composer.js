import React from "react";
import css from "styled-components";
import { arrayOf, func, object, shape, string } from "prop-types";

import {
  Action,
  Container,
  Icon,
  PageTitle,
  Separator,
  breakpoint,
  color,
  setSpace
} from "interviewjs-styleguide";

import {
  DetailsModal,
  IntervieweePane,
  MobileRedirect,
  PublishStoryModal,
  StoryPane,
  UserPane
} from "../partials";

const Page = css.div`
  align-content: stretch;
  align-items: stretch;
  display: none;
  flex-direction: column;
  height: 100%;
  justify-content: space-between;
  margin-left: auto;
  margin-right: auto;
  max-width: 1400px;
  ${breakpoint.tablet} {
    display: flex;
  }
`;

const PageHead = css.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  flex: 1 0 auto;
  ${PageTitle} {
    color: ${color.blueBlk};
  }
`;

const PageBody = css.div`
  ${setSpace("pbm")};
  ${setSpace("phm")};
  align-content: stretch;
  align-items: stretch;
  display: flex;
  flex-direction: row;
  flex: 0 1 100%;
  & > *:first-child {
    ${setSpace("mrs")};
  }
  & > *:nth-child(2) {
    ${setSpace("mhs")};
  }
  & > *:last-child {
    ${setSpace("mls")};
  }
`;

export default class ComposerView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentBubble: null,
      currentInterviewee: 0,
      detailsModal: "",
      publishModal: false
    };
    this.deleteInterviewee = this.deleteInterviewee.bind(this);
    this.switchInterviewee = this.switchInterviewee.bind(this);
    this.toggleBubbleEdit = this.toggleBubbleEdit.bind(this);
    this.toggleDetailsModal = this.toggleDetailsModal.bind(this);
    this.togglePublishModal = this.togglePublishModal.bind(this);
    this.updateStory = this.updateStory.bind(this);
  }
  switchInterviewee(interviewee) {
    this.setState({ currentInterviewee: interviewee });
  }
  deleteInterviewee(story, interviewee) {
    this.setState({ currentInterviewee: 0 });
    this.props.deleteInterviewee(story, interviewee);
  }
  toggleDetailsModal(tab) {
    return tab
      ? this.setState({ detailsModal: tab })
      : this.setState({ detailsModal: "" });
  }
  togglePublishModal() {
    this.setState({ publishModal: !this.state.publishModal });
  }
  toggleBubbleEdit(target) {
    console.log("toggleBubbleEdit :", target);
    this.setState({ currentBubble: target });
  }
  updateStory(data) {
    const { storyId } = this.props.params;
    const i = this.props.stories.findIndex((story) => story.id === storyId);
    this.props.updateStory(data, i);
  }
  render() {
    const { storyId } = this.props.params;
    const storyIndex = this.props.stories.findIndex(
      (story) => story.id === storyId
    );
    const story = this.props.stories[storyIndex];

    if (!story) return null;

    return [
      <Page key="Page">
        <PageHead>
          <Container flex={[1, 1, `${100 / 3}%`]} padded>
            <Action onClick={() => this.props.router.push(`/my/stories`)}>
              <Icon name="arrow-left" size="x" /> Story overview
            </Action>
            <Separator dir="v" size="m" />
            <Action onClick={() => this.toggleDetailsModal("meta")}>
              <Icon
                name="info2"
                size="s"
                style={{ position: "relative", top: "1px", marginRight: "2px" }}
              />
              {` `}Story elements
            </Action>
          </Container>
          <Container flex={[1, 1, `${100 / 3}%`]} align="center">
            <PageTitle typo="h2">{story.title}</PageTitle>
          </Container>
          <Container flex={[1, 1, `${100 / 3}%`]} align="right" padded>
            <Action primary onClick={this.togglePublishModal}>
              Publish Story
            </Action>
          </Container>
        </PageHead>
        <PageBody>
          <Container flex={[1, 1, `${100 / 3}%`]}>
            <IntervieweePane
              {...this.props}
              currentBubble={this.state.currentBubble}
              currentInterviewee={this.state.currentInterviewee}
              story={story}
              storyIndex={storyIndex}
            />
          </Container>
          <Container flex={[1, 1, `${100 / 3}%`]}>
            <StoryPane
              {...this.props}
              currentInterviewee={this.state.currentInterviewee}
              story={story}
              storyIndex={storyIndex}
              switchInterviewee={this.switchInterviewee}
              toggleBubbleEdit={this.toggleBubbleEdit}
              toggleDetailsModal={() => this.toggleDetailsModal("interviewees")}
            />
          </Container>
          <Container flex={[1, 1, `${100 / 3}%`]}>
            <UserPane
              {...this.props}
              currentBubble={this.state.currentBubble}
              currentInterviewee={this.state.currentInterviewee}
              story={story}
              storyIndex={storyIndex}
            />
          </Container>
        </PageBody>
      </Page>,
      <MobileRedirect {...this.props} key="MobileRedirect" />,
      this.state.detailsModal !== "" ? (
        <DetailsModal
          {...this.props}
          deleteInterviewee={this.deleteInterviewee}
          handleClose={() => this.toggleDetailsModal()}
          isOpen
          key="DetailsModal"
          story={story}
          storyIndex={storyIndex}
          tab={this.state.detailsModal}
          updateStory={this.updateStory}
        />
      ) : null,
      this.state.publishModal ? (
        <PublishStoryModal
          {...this.props}
          handleClose={() => this.togglePublishModal()}
          isOpen
          key="PublishModal"
          story={story}
          storyIndex={storyIndex}
          tab={this.state.detailsModal}
          updateStory={this.updateStory}
        />
      ) : null
    ];
  }
}

ComposerView.propTypes = {
  deleteInterviewee: func,
  params: shape({ storyId: string.isRequired }).isRequired,
  router: object.isRequired /* eslint react/forbid-prop-types: 0 */,
  stories: arrayOf(object),
  updateStory: func
};

ComposerView.defaultProps = {
  deleteInterviewee: null,
  stories: [],
  updateStory: null
};
