import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/contentCard';
import DiffTable from '../components/diffTable';

class VersionDiffCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    return (
      <ContentCard>
        <DiffTable height={this.props.size.height - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

VersionDiffCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(VersionDiffCard);
