import React, { Component } from 'react';
import PropTypes from 'prop-types';
import bindActionCreators from 'redux/es/bindActionCreators';
import connect from 'react-redux/es/connect/connect';

import AutoComplete from 'material-ui/AutoComplete';
import FlatButton from 'material-ui/FlatButton';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import SearchIcon from 'material-ui/svg-icons/action/search';
import WebIcon from 'material-ui/svg-icons/action/open-in-new';
import LocalIcon from 'material-ui/svg-icons/action/find-in-page';

import HtmlToReact, { Parser } from 'html-to-react';

import linkedArticlesDuck from '../ducks/linkedArticlesDuck';

class EntityLinkingRenderer extends Component {
  constructor(props) {
    super(props);
    this.parser = new Parser();
    this.titleFilter = AutoComplete.fuzzyFilter;

    this.state = {
      pageContent: this.renderHtml(this.parser, props.pageContent),
      activeArticle: '',
      searchText: '',
      pageTitles: props.pageTitles,
      autoCompleteError: null,
      isLoadingTitles: false,
      popOverAnchor: null,
      popOverOpen: false,
      popOverElements: [],
      height: props.height
    };

    this.handleFocusSearch = this.handleFocusSearch.bind(this);
    this.handleSelection = this.handleSelection.bind(this);
    this.handleUpdateSearch = this.handleUpdateSearch.bind(this);
    this.openPopOver = this.openPopOver.bind(this);
    this.closePopOver = this.closePopOver.bind(this);
    this.handleLinkClick = this.handleLinkClick.bind(this);
    this.loadArticle = this.loadArticle.bind(this);
  }

  componentWillMount() {
    this.props.actions.linkedArticles.getTitles();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.pageContent) {
      const pageContent = this.renderHtml(this.parser, nextProps.pageContent);
      this.setState({ pageContent });
    }

    if (nextProps.pageTitles) this.setState({ pageTitles: nextProps.pageTitles });
    if (nextProps.height) this.setState({ height: nextProps.height });
  }

  handleSelection(chosenRequest, dataSourceIndex) {
    let articleTitle = chosenRequest;

    if (dataSourceIndex === -1) {
      const filteredTitles = this.state.pageTitles.filter(title => this.titleFilter(chosenRequest, title));

      if (filteredTitles.length >= 1) {
        articleTitle = filteredTitles[0];
      } else {
        console.error('Title for search', chosenRequest, 'not found!');
        return;
      }
    }

    this.loadArticle(articleTitle);
  }

  loadArticle(articleTitle) {
    this.props.actions.linkedArticles.getContent(articleTitle);
    this.setState({ activeArticle: articleTitle, searchText: articleTitle });
  }

  handleUpdateSearch(searchText, dataSource, params) {
    this.setState({ searchText });
  }

  handleFocusSearch() {
    this.setState({ searchText: '' });
  }

  handleLinkClick(event, title, href, linkChildren) {
    // This prevents ghost click.
    event.preventDefault();

    const elements = title.split('\n');
    if (href && href !== '') {
      elements.unshift([linkChildren.toString(), href]);
    }
    this.openPopOver(event.currentTarget, elements);
  }

  openPopOver(anchor, elements) {
    this.setState({
      popOverOpen: true,
      popOverAnchor: anchor,
      popOverElements: elements
    });
  }

  closePopOver() {
    this.setState({ popOverOpen: false });
  }

  processNodeDefinitions = new HtmlToReact.ProcessNodeDefinitions(React);
  htmlProcessingInstructions = [
    { // Link Processor
      shouldProcessNode: node => node.name === 'a',
      processNode: (node, children) => {
        const title = node.attribs.hasOwnProperty('title') ? node.attribs.title : 'No title';
        const href = node.attribs.hasOwnProperty('href') ? node.attribs.href : 'No href';
        return (
          <FlatButton
            onClick={(event) => {
              this.handleLinkClick(event, title, href, children);
            }}
          >
            {children}
          </FlatButton>
        );
      }
    },
    {
      // Anything else
      shouldProcessNode: node => true,
      processNode: this.processNodeDefinitions.processDefaultNode,
    },
  ];

  filterNodes(node) {
    return true;
  }

  renderHtml(parser, html) {
    return parser.parseWithInstructions(html, this.filterNodes, this.htmlProcessingInstructions);
  }

  render() {
    const articleHeight = this.state.height - 40;

    return (
      <div>
        <div>
          <SearchIcon
            color="#666"
            style={{ position: 'relative', top: 7 }}
          />
          <AutoComplete
            hintText="Search..."
            searchText={this.state.searchText}
            errorText={this.state.autoCompleteError}
            onFocus={this.handleFocusSearch}
            onUpdateInput={this.handleUpdateSearch}
            onNewRequest={this.handleSelection}
            filter={this.titleFilter}
            openOnFocus
            dataSource={this.state.pageTitles}
            dataSourceConfig={{
              text: 'title',
              value: 'title'
            }}
            maxSearchResults={20}
          />
        </div>
        { this.state.isLoadingTitles && <p>Loading titles...</p> }
        <div style={{ overflowY: 'auto', height: articleHeight }}>
          { this.state.pageContent }
        </div>
        <Popover
          open={this.state.popOverOpen}
          anchorEl={this.state.popOverAnchor}
          anchorOrigin={{ horizontal: 'middle', vertical: 'bottom' }}
          targetOrigin={{ horizontal: 'middle', vertical: 'top' }}
          onRequestClose={this.closePopOver}
          animation={Popover.PopoverAnimationVertical}
        >
          <Menu>
            {
              this.state.popOverElements && this.state.popOverElements.map((element) => {
                const props =
                  (element instanceof Array && element.length >= 2) ? {
                    leftIcon: <WebIcon />,
                    primaryText: element[0],
                    href: element[1].trim(),
                    target: '_blank',
                    onTouchTap: this.closePopOver
                  } : {
                    leftIcon: <LocalIcon />,
                    primaryText: element,
                    onTouchTap: () => {
                      this.loadArticle(element);
                      this.closePopOver();
                    }
                  };

                return <MenuItem key={element} {...props} />;
              })
            }
          </Menu>
        </Popover>
      </div>
    );
  }
}

EntityLinkingRenderer.propTypes = {
  pageContent: PropTypes.string,
  pageTitles: PropTypes.arrayOf(PropTypes.string),
  actions: PropTypes.shape({
    linkedArticles: PropTypes.object
  }).isRequired,
  height: PropTypes.number
};

EntityLinkingRenderer.defaultProps = {
  pageContent: '',
  pageTitles: [],
  height: 500
};

/* connection to Redux */
function mapStateToProps(state) {
  return {
    isLoadingTitles: state.linkedArticles.isLoadingTitles,
    pageTitles: state.linkedArticles.titles,
    pageContent: state.linkedArticles.content
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      linkedArticles: bindActionCreators(linkedArticlesDuck.creators, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EntityLinkingRenderer);
