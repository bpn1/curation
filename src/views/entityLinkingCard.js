import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { sizeMe } from 'react-sizeme';

import ContentCard from '../components/content_card';
import EntityLinkingRenderer from '../components/entity_linking_renderer';

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
