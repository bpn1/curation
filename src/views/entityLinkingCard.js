import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/contentCard';
import EntityLinkingRenderer from '../components/entityLinkingRenderer';

class EntityLinkingCard extends Component {
  render() {
    const topAndBottomPadding = 2 * 16;
    return (
      <ContentCard>
        <EntityLinkingRenderer height={this.props.size.height - topAndBottomPadding} />
      </ContentCard>
    );
  }
}

EntityLinkingCard.propTypes = {
  size: PropTypes.shape({
    height: PropTypes.number.isRequired,
    width: PropTypes.number.isRequired,
  }).isRequired
};

export default sizeMe({ monitorHeight: true })(EntityLinkingCard);
