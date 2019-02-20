// React
import React, { Component } from "react";

import { Row, Col } from "react-bootstrap";

// Redux actions
import { connect } from "react-redux";

// Application Logic
import {
  handleActiveTenant,
  handleLoadTenants,
  handleLoadResources,
  setActiveResourceAndToggleModal,
  handleToggleSaveResourceModal,
  handleAuthorizationKeyChanged,
  handleResourceNameChanged,
  handleResourceUrlChanged,
  handleSaveResource
} from "../../actions/environmentActionCreator";

// CSS for this screen and logo
import "./ResourcesEditorScreen.css";
import Logo from "../restQL-logo.svg";

// Application components
import ResourcesNavbar from "./ResourcesNavbar";
import ResourcesMenu from "./ResourcesMenu";
import ResourcesEditor from "./ResourcesEditor";
import { handleNewQuery } from "../../actions/queryActionCreator";

class ResourcesEditorScreen extends Component {
  constructor(props) {
    super(props);

    if (this.props.tenants.length === 0) handleLoadTenants();
    if (this.props.resources.length === 0) handleLoadResources();
  }

  sortFn = (a, b) => a.name > b.name;

  render() {
    return (
      <div>
        <ResourcesNavbar logo={Logo} queryEditorLink={""} newQuery={handleNewQuery} />

        <Row>
          <Col xs={4} md={2}>
            <ResourcesMenu
              className="resourcesMenu"
              handleActiveTenant={handleActiveTenant}
              activeTenant={this.props.activeTenant}
              tenants={this.props.tenants}
              tenant={this.props.tenant}
              resources={this.props.resources.sort(this.sortFn)}
            />
          </Col>

          <Col xs={8} md={10}>
            <ResourcesEditor
              tenant={this.props.tenant}
              resources={this.props.resources}
              activeResource={this.props.activeResource}
              showSaveResourceModal={this.props.showSaveResourceModal}
              authorizationKey={this.props.authorizationKey}
              resourceUpdated={this.props.resourceUpdated}
              updateMessage={this.props.updateMessage}
              setActiveResourceAndToggleModal={setActiveResourceAndToggleModal}
              handleToggleSaveResourceModal={handleToggleSaveResourceModal}
              handleAuthorizationKeyChanged={handleAuthorizationKeyChanged}
              handleResourceNameChanged={handleResourceNameChanged}
              handleResourceUrlChanged={handleResourceUrlChanged}
              handleSaveResource={handleSaveResource}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  // Env configurations
  tenants: state.environmentReducer.tenants,
  tenant: state.environmentReducer.tenant,
  activeTenant: state.environmentReducer.activeTenant,
  resources: state.environmentReducer.resources,
  activeResource: state.environmentReducer.activeResource,
  showSaveResourceModal: state.environmentReducer.showSaveResourceModal,

  authorizationKey: state.environmentReducer.authorizationKey,
  updateMessage: state.environmentReducer.updateMessage,
  resourceUpdated: state.environmentReducer.resourceUpdated
});

export default connect(mapStateToProps, null)(ResourcesEditorScreen);
