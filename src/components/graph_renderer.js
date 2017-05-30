import React, { Component } from 'react';
import Checkbox from "material-ui/Checkbox";
import { EdgeShapes, ForceAtlas2, RandomizeNodePositions, Sigma } from "react-sigma";

class GraphRenderer extends Component {
  isFirstRender = true;

  constructor(props) {
    super(props);

    this.state = {
      showNodes: true,
      showEdges: true,
      showEdgeLabels: true
    };
  }

  render() {
    let graph = {
      nodes: [
        {id:"n1", label:"Alice", color:"#FF9994"},
        {id:"n2", label:"Rabbit", color:"#FFC65A"},
        {id:"n3", label:"Cat", color:"#666"},
        {id:"n4", label:"Bird", color:"#22FF44"}
      ], edges: [
        {id:"e1",source:"n1",target:"n2",label:"SEES",type:"tapered"},
        {id:"e2",source:"n2",target:"n1",label:"SEES",type:"arrow"},
        {id:"e3",source:"n3",target:"n2",label:"PREYS_ON",type:"curve",color:"#F00"},
        {id:"e4",source:"n3",target:"n4",label:"PREYS_ON",type:"curve",color:"#F00"},
        {id:"e5",source:"n3",target:"n1",label:"HIDES_FROM",type:"parallel"},
        {id:"e6",source:"n4",target:"n1",label:"FLIES_ABOVE",type:"arrow"},
        {id:"e7",source:"n4",target:"n2",label:"FLIES_ABOVE",type:"dotted"},
        {id:"e8",source:"n4",target:"n3",label:"FLIES_ABOVE",type:"arrow"},
        {id:"e9",source:"n4",target:"n4",label:"FLIES_ABOVE",type:"dotted"}
      ]};

    if(this.isFirstRender) {
      this.isFirstRender = false;
    } else {
      graph = {nodes:[], edges:[]};
    }

    // TODO try to move this object into the state and see if if updates correctly
    let settings = {
      defaultEdgeColor: "#eee",
      defaultNodeColor: "#eebb11",
      labelColor: "node", // or default ?
      defaultLabelColor: "#eee", // not used with node as labelColor
      labelSize: "proportional", // or fixed
      borderSize: 1, // def. 0
      defaultNodeBorderColor: "#eee",
      edgeHoverColor: "default", // or edge
      defaultHoverColor: "#eee",
      edgeHoverSizeRatio: 2, // or 1
      edgeHoverExtremities: true, // or false
      drawEdgeLabels: this.state.showEdgeLabels,
      drawNodes: this.state.showNodes,
      drawEdges: this.state.showEdges
    };

    return (
      <div>
        <div style={{float: 'right'}}>
          <Checkbox label="Nodes" defaultChecked={true} value={this.state.showNodes}
                    onCheck={(event, isInputChecked) => this.setState({ showNodes: isInputChecked })} />
          <Checkbox label="Edges" defaultChecked={true} value={this.state.showEdges}
                    onCheck={(event, isInputChecked) => this.setState({ showEdges: isInputChecked })} />
          <Checkbox label="Labels" defaultChecked={true} value={this.state.showEdgeLabels}
                    onCheck={(event, isInputChecked) => this.setState({ showEdgeLabels: isInputChecked })} />
        </div>
        <Sigma renderer="canvas" graph={graph} settings={settings}>
          <EdgeShapes default="curvedArrow" />
          <RandomizeNodePositions />
          <ForceAtlas2
            worker
            barnesHutOptimize
            linLogMode
            barnesHutTheta={0.7}
            iterationsPerRender={100}
            timeout={400} />
        </Sigma>
      </div>
    );
  }
}

export default GraphRenderer;
