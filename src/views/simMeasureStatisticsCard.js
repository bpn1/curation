import React, { Component } from 'react';
import ContentCard from '../components/content_card';
import SimilarityHistogram from '../components/similarityHistogram';

class StatisticsCard extends Component {
  render() {
    return (
      <ContentCard>
        <h1>Similarity Measure Statistics</h1>
        <SimilarityHistogram />
      </ContentCard>
    );
  }
}

export default StatisticsCard;
