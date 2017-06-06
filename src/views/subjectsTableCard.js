import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import SubjectTable from '../components/subject_table';
import ContentCard from '../components/content_card';

class SubjectsTableCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    return (
      <ContentCard>
        <SubjectTable height={this.props.size.height - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

SubjectsTableCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};
export default sizeMe({ monitorHeight: true })(SubjectsTableCard);
