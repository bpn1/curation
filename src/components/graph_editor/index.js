import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';

import GraphView from 'react-digraph';
import Checkbox from 'material-ui/Checkbox';
import AutoComplete from 'material-ui/AutoComplete';
import SearchIcon from 'material-ui/svg-icons/action/search';

import { openDetailBar, closeDetailBar } from '../../actions/index';
import { subjects } from '../../ducks/subjectDuck';
import GraphConfig from './graph_config';

import {
  dataSources, validCategories, NONE_TYPE, SPECIAL_TYPE, EMPTY_TYPE, NODE_KEY, EMPTY_EDGE_TYPE, SPECIAL_EDGE_TYPE,
  SUBTYPE_POSTFIX, MULTIPLE_EDGE_TYPE, MANY_EDGE_TYPE, EMPTY_SUBTYPE
} from './constants';

const centerPointOffset = { x: 650, y: 650 };
const clusterRadius = 225;
const clusterColumnCount = 3;

const defaultLoadKeys = [
  'c9f222a1-64d6-488e-9c15-a12d5abae400',
  '21a9baad-2c0a-474e-b3a7-c3ea31be7e3c',
  '08391b72-d43b-4ed0-a0aa-9a18a97dce4a',
  '95465e29-1049-4a47-9d1f-3aa135485667'
];

class GraphEditor extends Component {

  constructor(props) {
    super(props);

    const graph = { nodes: [], edges: [] };

    let loadKeys = window.location.hash.indexOf('?') === -1 ? [] :
      window.location.hash
        .split('?')[1]
        .split('&')
        .map(str => str.split('='))
        .filter(param => param[0] === 'nodes' && param.length > 1 && param[1] !== '')
        .map(param => param[1].split(',').map(key => key.trim()));
    loadKeys = loadKeys.length > 0 && loadKeys[0].length > 0 ? loadKeys[0] : defaultLoadKeys;

    this.state = {
      graph: graph,
      selected: {},
      centerKeys: [],
      editorDrawerOpen: false,
      showDataSources: true,
      showAllEdges: true,
      edgeFilter: this.filters.allEdges,
      dataSourceVisibility: {},
      searchInput: '',
      loadKeys: loadKeys,
      centerSubjects: [],
      neighborSubjects: [],
      isLoadingCenters: false,
      isLoadingNeighbors: false,
      disableEditing: props.disableEditing
    };

    this.loadGraph = this.loadGraph.bind(this);
    this.updateGraph = this.updateGraph.bind(this);
    this.getViewNode = this.getViewNode.bind(this);
    this.onSelectNode = this.onSelectNode.bind(this);
    this.onCreateNode = this.onCreateNode.bind(this);
    this.onUpdateNode = this.onUpdateNode.bind(this);
    this.onDeleteNode = this.onDeleteNode.bind(this);
    this.canDeleteEdge = this.canDeleteEdge.bind(this);
    this.onSelectEdge = this.onSelectEdge.bind(this);
    this.onCreateEdge = this.onCreateEdge.bind(this);
    this.onSwapEdge = this.onSwapEdge.bind(this);
    this.onDeleteEdge = this.onDeleteEdge.bind(this);
    this.canDeleteEdge = this.canDeleteEdge.bind(this);
    this.handleDataSourceChecked = this.handleDataSourceChecked.bind(this);
    this.isDataSourceShown = this.isDataSourceShown.bind(this);
    this.getFilteredGraph = this.getFilteredGraph.bind(this);
    this.getNodeNames = this.getNodeNames.bind(this);
  }

  componentDidMount() {
    this.loadGraph(this.state.loadKeys);
  }

  loadGraph(centerNodes) {
    this.props.actions.subject.getSome(centerNodes);
    this.setState({ isLoadingCenters: true });
  }

  updateGraph(centerSubjects, neighborSubjects) {
    const allSubjects = [].concat(neighborSubjects).concat(centerSubjects);
    const edges = this.extractEdges(allSubjects);
    const centerKeys = [];
    let clusterIndex = 0;
    let nodes = [];

    centerSubjects.forEach((centerSubject) => {
      const centerNode = this.extractNode(centerSubject);

      // filter out neighbors of current node that haven't been added to the graph yet
      const neighborNodes = neighborSubjects
        .filter(subject => this.filters.subjectsByNeighbor(subject, centerSubject))
        .filter(subject => nodes.filter(node => node[NODE_KEY] === subject.id).length === 0)
        .map(this.extractNode);

      const centerPoint = {
        x: (clusterIndex % clusterColumnCount) * centerPointOffset.x,
        y: Math.floor(clusterIndex / clusterColumnCount) * centerPointOffset.y
      };

      // only move centerPoint if this cluster contained nodes
      const centerNodeIsDuplicate = nodes.filter(node => node[NODE_KEY] === centerNode.id).length !== 0;
      if (!centerNodeIsDuplicate || neighborNodes.length > 0) clusterIndex += 1;

      const positionedNodes = this.calculateNodePositions(centerNode, neighborNodes, centerPoint, clusterRadius);
      centerKeys.push(positionedNodes[0][NODE_KEY]);
      nodes = nodes.concat(positionedNodes);
    });

    this.setState({
      graph: { nodes, edges },
      selected: {},
      centerKeys
    });

    setTimeout(this.graphView.handleZoomToFit, 0);
  }

  extractNode(subject) {
    // extract data source from name history
    // TODO do this using given data source later
    let dataSource = subject.name_history && subject.name_history.length > 0
      ? subject.name_history[0].datasources[0]
      : 'empty';

    dataSource = dataSource.split('_')[0] + SUBTYPE_POSTFIX;

    if (dataSources.filter(source => source.type === dataSource).length === 0) {
      console.error('Data source ' + dataSource + ' not found!');
      dataSource = EMPTY_SUBTYPE;
    }

    const category = subject.category && validCategories.indexOf(subject.category) > -1 ? subject.category : NONE_TYPE;

    return {
      id: subject.id,
      title: subject.name,
      type: category,
      subtype: dataSource
    };
  }

  extractEdges(sourceSubjects) {
    const edges = sourceSubjects.map((subject) => {
      if (!subject.relations) return [];
      return Object.keys(subject.relations).map(target => ({
        source: subject.id,
        target: target
      }));
    });

    const mergedEdges = [].concat(...edges); // merge arrays

    const deduplicatedEdges = mergedEdges.reduce((acc, edge) => {
      if (!acc.hasOwnProperty(edge.source)) acc[edge.source] = {};
      if (!acc[edge.source].hasOwnProperty(edge.target)) acc[edge.source][edge.target] = 0;

      acc[edge.source][edge.target] += 1;

      return acc;
    }, {});

    const countedEdges = mergedEdges.map((edge) => {
      let edgeCount = deduplicatedEdges[edge.source][edge.target];

      // if reverse edge exists, add its value as well
      if (deduplicatedEdges.hasOwnProperty(edge.target) && deduplicatedEdges[edge.target].hasOwnProperty(edge.source)) {
        edgeCount += deduplicatedEdges[edge.target][edge.source];
      }

      // const edgeCount = 10;
      let relationType = EMPTY_EDGE_TYPE;
      if (edgeCount >= 2) relationType = MULTIPLE_EDGE_TYPE;
      if (edgeCount >= 10) relationType = MANY_EDGE_TYPE;

      return {
        source: edge.source,
        target: edge.target,
        type: relationType,
        count: edgeCount
      };
    });

    return countedEdges;
  }

  extractNeighbors(sourceSubjects) {
    const idLists = sourceSubjects.map(subject => Object.keys(subject.relations));
    return [].concat(...idLists); // merge arrays
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.fetchedSubjects && this.state.isLoadingCenters) {
      const centerSubjects = nextProps.fetchedSubjects;
      const centerIDs = this.extractNeighbors(centerSubjects);
      this.props.actions.subject.getSome(centerIDs);

      this.setState({
        centerSubjects,
        isLoadingCenters: false,
        isLoadingNeighbors: true
      });
    }

    if (nextProps.fetchedSubjects && this.state.isLoadingNeighbors) {
      const neighborSubjects = nextProps.fetchedSubjects;
      this.updateGraph(this.state.centerSubjects, neighborSubjects);

      this.setState({
        neighborSubjects,
        isLoadingNeighbors: false
      });
    }
  }

  componentWillUnmount() {
    // make sure DetailBar is hidden when changing the view
    this.props.actions.detailBar.closeDetailBar();
  }

  /*
   * Handlers/Interaction
   */

  // Called by 'drag' handler, etc..
  // to sync updates from D3 with the graph
  onUpdateNode(viewNode) {
    const graph = this.state.graph;
    const i = this.getNodeIndex(viewNode);

    graph.nodes[i] = viewNode;
    this.setState({ graph: graph });
  }

  // Node 'mouseUp' handler
  onSelectNode(viewNode) {
    // Deselect events will send Null viewNode
    if (viewNode) {
      this.setState({ selected: viewNode });

      if (!this.state.disableEditing) {
        this.props.actions.detailBar.openDetailBar('subject', viewNode[NODE_KEY]);
      }
    } else {
      this.setState({ selected: {} });
      this.props.actions.detailBar.closeDetailBar();
    }
  }

  // Edge 'mouseUp' handler
  onSelectEdge(viewEdge) {
    this.setState({ selected: viewEdge });

    if (!this.state.disableEditing) {
      this.props.actions.detailBar.openDetailBar('relation', viewEdge);
    }
  }

  // Updates the graph with a new node
  onCreateNode(x, y) {
    /* const graph = this.state.graph;

    const viewNode = {
      id: this.state.graph.nodes.length + 1,
      title: '',
      type: type,
      x: x,
      y: y
    };

    graph.nodes.push(viewNode);
    this.setState({ graph: graph }); */
  }

  // Deletes a node from the graph
  onDeleteNode(viewNode) {
    const graph = this.state.graph;
    const nodeIndex = this.getNodeIndex(viewNode);
    graph.nodes.splice(nodeIndex, 1);

    // Delete any connected edges
    graph.edges = graph.edges.filter(edge =>
      edge.source !== viewNode[NODE_KEY] && edge.target !== viewNode[NODE_KEY]);

    this.setState({ graph: graph, selected: {} });
  }

  canDeleteNode(node) {
    return !this.props.disableDeletions;
  }

  // Creates a new node between two edges
  onCreateEdge(sourceViewNode, targetViewNode) {
    const graph = this.state.graph;

    // This is just an example - any sort of logic
    // could be used here to determine edge type
    const type = sourceViewNode.type === SPECIAL_TYPE ? SPECIAL_EDGE_TYPE : EMPTY_EDGE_TYPE;

    const viewEdge = {
      source: sourceViewNode[NODE_KEY],
      target: targetViewNode[NODE_KEY],
      type: type
    };
    graph.edges.push(viewEdge);
    this.setState({ graph: graph });
  }

  // Called when an edge is reattached to a different target.
  onSwapEdge(sourceViewNode, targetViewNode, viewEdge) {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    const edge = JSON.parse(JSON.stringify(graph.edges[i]));

    edge.source = sourceViewNode[NODE_KEY];
    edge.target = targetViewNode[NODE_KEY];
    graph.edges[i] = edge;

    this.setState({ graph: graph });
  }

  // Called when an edge is deleted
  onDeleteEdge(viewEdge) {
    const graph = this.state.graph;
    const i = this.getEdgeIndex(viewEdge);
    graph.edges.splice(i, 1);
    this.setState({ graph: graph, selected: {} });
  }

  canDeleteEdge(viewEdge) {
    return !this.props.disableDeletions;
  }

  // Helper functions //

  // Helper to find the index of a given node
  getNodeIndex(searchNode) {
    return this.state.graph.nodes.findIndex(node => node[NODE_KEY] === searchNode[NODE_KEY]);
  }

  // Helper to find the index of a given edge
  getEdgeIndex(searchEdge) {
    return this.state.graph.edges.findIndex(edge => edge.source === searchEdge.source &&
    edge.target === searchEdge.target);
  }

  // Given a nodeKey, return the corresponding node
  getViewNode(nodeKey) {
    const searchNode = {};
    searchNode[NODE_KEY] = nodeKey;
    const i = this.getNodeIndex(searchNode);
    return this.state.graph.nodes[i];
  }

  handleDataSourceChecked(dataSource, isChecked) {
    const dataSourceVisibility = this.state.dataSourceVisibility;
    dataSourceVisibility[dataSource] = !isChecked;
    this.setState({ dataSourceVisibility });
  }

  isDataSourceShown(dataSource) {
    return (
      !this.state.dataSourceVisibility.hasOwnProperty(dataSource) ||
      !this.state.dataSourceVisibility[dataSource]
    );
  }

  // position otherNodes in circle around centerNode
  calculateNodePositions(centerNode, otherNodes, centerPoint, radius) {
    const surroundingNodeCount = otherNodes.length;
    const anglePerNode = (2 * Math.PI) / surroundingNodeCount;
    let currentAngle = 0;

    const newCenterNode = Object.assign({}, centerNode);
    newCenterNode.x = centerPoint.x;
    newCenterNode.y = centerPoint.y;

    const newNodes = otherNodes.map((originalNode) => {
      const node = Object.assign({}, originalNode);
      node.x = centerPoint.x + (Math.sin(currentAngle) * radius);
      node.y = centerPoint.y + (Math.cos(currentAngle) * radius);

      currentAngle += anglePerNode;
      return node;
    });

    newNodes.unshift(newCenterNode); // add center node as first node
    return newNodes;
  }

  // edge or node filter lambdas (must return bool)
  filters = {
    allEdges: () => true,
    edgesByCenterNodes: (edge) => {
      const centerKeys = this.state.centerKeys;
      return centerKeys.indexOf(edge.source) >= 0 || centerKeys.indexOf(edge.target) >= 0;
    },
    nodesByDataSource: node => this.isDataSourceShown(node.subtype),
    nodesByKey: (node, key) => node[NODE_KEY] === key,
    subjectsByNeighbor: (subject, neighborSubject) => {
      if (!neighborSubject.relations) return false;
      return (Object.keys(neighborSubject.relations).filter(target => target === subject.id).length > 0);
    },
    edgesByDataSource: (edge, nodes) => {
      const sourceNodes = nodes.filter(node => this.filters.nodesByKey(node, edge.source));
      const targetNodes = nodes.filter(node => this.filters.nodesByKey(node, edge.target));

      return (
        sourceNodes.length !== 0 && targetNodes.length !== 0 &&
        sourceNodes[0] && targetNodes[0] &&
        this.isDataSourceShown(sourceNodes[0].subtype) &&
        this.isDataSourceShown(targetNodes[0].subtype)
      );
    }
  };

  // filter a copy of the current graph by data source and user-selected filters
  getFilteredGraph() {
    let nodes = this.state.graph.nodes.slice();
    const edges = this.state.graph.edges.slice()
      .filter(edge => (
        this.filters.edgesByDataSource(edge, nodes) && this.state.edgeFilter(edge)
      ));

    nodes = nodes.filter(this.filters.nodesByDataSource);

    if (!this.state.showDataSources) {
      nodes = nodes.map((node) => {
        const newNode = Object.assign({}, node);
        delete newNode.subtype;
        return newNode;
      });
    }

    return { nodes, edges };
  }

  getNodeNames() {
    return this.state.graph.nodes.map(node => ({
      name: node.title,
      key: node[NODE_KEY]
    }));
  }

  listeners = {
    handleNeighborEdgesCheck: (event, isInputChecked) => this.setState({
      showAllEdges: isInputChecked,
      edgeFilter: isInputChecked ? this.filters.allEdges : this.filters.edgesByCenterNodes
    }),
    handleEditorsCheck: (event, isInputChecked) => this.setState({
      disableEditing: !isInputChecked
    }),
    handleSearchRequest: (searchInput, index) => {
      // disable enter to search feature => must select from list
      if (index < 0 || !searchInput.hasOwnProperty('key')) return;

      // select the first found node
      const selectedNodes = this.state.graph.nodes
        .filter(node => this.filters.nodesByKey(node, searchInput.key));
      if (selectedNodes.length > 0) {
        this.setState({ selected: selectedNodes[0] });
      }
    },
    handleSearchUpdate: (searchInput) => {
      this.setState({ searchInput });
    },
    handleSearchFocus: () => {
      // clear search field when clicked
      this.setState({ searchInput: '' });
    }
  };

  // main render method
  render() {
    const { nodes, edges } = this.getFilteredGraph();
    const nodeNames = this.getNodeNames();

    const selected = this.state.selected;

    const NodeTypes = GraphConfig.NodeTypes;
    const NodeSubtypes = GraphConfig.NodeSubtypes;
    const EdgeTypes = GraphConfig.EdgeTypes;

    const componentHeight = (window.innerHeight * (3 / 4)).toString() + 'px';
    const graphStyle = {
      height: componentHeight,
      background: '#303030'
    };

    const legendEntryStyle = (color, subtype) => ({
      backgroundColor: 'rgba(' + color + ', ' + (this.isDataSourceShown(subtype) ? 0.5 : 0.2) + ')',
      borderRadius: 5,
      paddingLeft: 5,
      display: 'inline'
    });
    const controlsStyle = {
      position: 'fixed',
      backgroundColor: 'rgba(33, 33, 33, 0.5)',
      border: '1px solid #333',
      borderRadius: 15,
      padding: 10
    };
    const containerStyle = { height: '100%', width: '100%' };

    return (
      <div id="graph" style={containerStyle}>
        <div id="controls" style={controlsStyle}>
          <SearchIcon
            color="#666"
            style={{ position: 'relative', top: 7 }}
          />
          <AutoComplete
            onFocus={this.listeners.handleSearchFocus}
            onUpdateInput={this.listeners.handleSearchUpdate}
            searchText={this.state.searchInput}
            hintText="Search..."
            filter={AutoComplete.caseInsensitiveFilter}
            openOnFocus
            onNewRequest={this.listeners.handleSearchRequest}
            dataSource={nodeNames}
            dataSourceConfig={{
              text: 'name',
              value: 'key'
            }}
            maxSearchResults={15}
          />
          <Checkbox
            label="Neighbor edges"
            defaultChecked
            value={this.state.showAllEdges}
            style={{ padding: 5 }}
            onCheck={this.listeners.handleNeighborEdgesCheck}
          />
          <Checkbox
            label="Open Editors"
            defaultChecked
            value={!this.state.disableEditing}
            style={{ padding: 5 }}
            onCheck={this.listeners.handleEditorsCheck}
          />
          <Checkbox
            label="Data sources"
            defaultChecked
            value={this.state.showDataSources}
            style={{ padding: 5 }}
            onCheck={(event, isInputChecked) => this.setState({ showDataSources: isInputChecked })}
          />
          { this.state.showDataSources && <hr style={{ borderColor: '#777' }} /> }
          { this.state.showDataSources && dataSources.map(source => (
            <Checkbox
              key={source.type}
              label={source.name}
              labelStyle={legendEntryStyle(source.color, source.type)}
              style={{ padding: 5 }}
              defaultChecked
              value={this.state.dataSourceVisibility[source.type]}
              onCheck={(event, isInputChecked) => this.handleDataSourceChecked(source.type, isInputChecked)}
            />
          )) }
        </div>
        <GraphView
          ref={g => this.graphView = g}
          style={graphStyle}
          primary="#777"
          light="#fff"
          dark="#000"
          nodeKey={NODE_KEY}
          emptyType={EMPTY_TYPE}
          nodes={nodes}
          edges={edges}
          selected={selected}
          nodeTypes={NodeTypes}
          nodeSubtypes={NodeSubtypes}
          edgeTypes={EdgeTypes}
          getViewNode={this.getViewNode}
          onSelectNode={this.onSelectNode}
          onCreateNode={this.onCreateNode}
          onUpdateNode={this.onUpdateNode}
          onDeleteNode={this.onDeleteNode}
          onSelectEdge={this.onSelectEdge}
          onCreateEdge={this.onCreateEdge}
          onSwapEdge={this.onSwapEdge}
          onDeleteEdge={this.onDeleteEdge}
          canDeleteNode={this.canDeleteNode}
          canDeleteEdge={this.canDeleteEdge}
          maxTitleChars={14}
        />
      </div>
    );
  }
}

GraphEditor.propTypes = {
  fetchedSubjects: PropTypes.array,
  disableEditing: PropTypes.bool,
  disableDeletions: PropTypes.bool,
  actions: PropTypes.shape({
    detailBar: PropTypes.object,
    subject: PropTypes.object
  }).isRequired
};

GraphEditor.defaultProps = {
  disableEditing: false,
  disableDeletions: true,
  fetchedSubjects: []
};

function mapStateToProps(state) {
  return {
    fetchedSubjects: state.subject.entities
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      detailBar: bindActionCreators({ openDetailBar, closeDetailBar }, dispatch),
      subject: bindActionCreators(subjects.creators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(GraphEditor);
