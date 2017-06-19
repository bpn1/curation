import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/content_card';
import VersionList from '../components/version_list';

class VersionCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    return (
      <ContentCard>
        <VersionList height={this.props.size.height - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

VersionCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(VersionCard);
