import React, { Component } from 'react';
import { Router, Scene, ActionConst } from 'react-native-router-flux';

import Main from '../screens/Main/main';
import Help from '../screens/Menu/Help/help';
import Privacy from '../screens/Menu/Privacy/privacy';
import About from '../screens/Menu/About/about';
import Configure from '../screens/Menu/Config/config';
import Search from '../screens/Menu/Search/search';
import Profile from '../screens/Menu/Profile/profile';
import Login from '../screens/Login/login';
import Register from '../screens/Register/register';
import Web from '../screens/Login/web';
import AddParking from '../screens/AddMarker/AddParking/addParking';
import AddBuild from '../screens/AddMarker/AddBuild/addBuild';
import AddSidewalk from '../screens/AddMarker/AddSidewalk/addSidewalk';
import AddPublicSpace from '../screens/AddMarker/AddPublicSpace/addPublicSpace';
import EditParking from '../screens/Edit/EditParking/editParking';
import ParkingDetail from '../screens/Detail/parkingDetail/parkingDetail';
import BuildDetail from '../screens/Detail/buildDetail/buildDetail';
import PublicSpaceDetail from '../screens/Detail/publicSpaceDetail/publicSpaceDetail';
import SidewalkDetail from '../screens/Detail/sidewalkDetail/sidewalkDetail';
import EditBuild from '../screens/Edit/EditBuild/editBuild';
import EditProfile from '../screens/Edit/EditProfile/editProfile';
import EditPublicSpace from '../screens/Edit/EditPublicSpace/editPublicSpace';
import EditSidewalk from '../screens/Edit/EditSidewalk/editSidewalk';
import PointsDetail from '../screens/Detail/pointsDetail/pointsDetail';
import Comments from '../screens/Comments/comments';
import Evals from '../screens/Evals/evals';
import EvalDetail from '../screens/Evals/evalDetail';
import AlterEvalsBuild from '../screens/AlterEvals/alterEvalsBuild';
import AlterEvalsPublic from '../screens/AlterEvals/alterEvalsPublic';
import AlterEvalsSidewalk from '../screens/AlterEvals/alterEvalsSidewalk';
import AlterEvalsCross from '../screens/AlterEvals/alterEvalsCross';

class AppNavigator extends Component {

	constructor(props) {
    	super(props);
	}

	render() {
		return (
			<Router>
				<Scene key="root">
					<Scene key="Main" initial component={Main} hideNavBar={true} direction="vertical" type={ActionConst.RESET}/>
					<Scene key="Help" component={Help} direction="leftToRight" />
					<Scene key="Privacy" component={Privacy} direction="leftToRight" />
					<Scene key="About" component={About} direction="leftToRight" />
					<Scene key="Configure" component={Configure} direction="leftToRight" />
					<Scene key="Search" component={Search} direction="leftToRight" />
					<Scene key="Profile" component={Profile} direction="leftToRight" />
					<Scene key="PointsDetail" component={PointsDetail} direction="horizontal"/>
					<Scene key="Login" component={Login} hideNavBar={true} direction="vertical"/>
					<Scene key="Register" component={Register} hideNavBar={true} direction="leftToRight"/>
					<Scene key="Web" component={Web} hideNavBar={true} direction="leftToRight"/>
					<Scene key="AddParking" component={AddParking} direction="horizontal"/>
					<Scene key="EditParking" component={EditParking} direction="horizontal"/>
					<Scene key="ParkingDetail" component={ParkingDetail} direction="horizontal"/>
					<Scene key="AddBuild" component={AddBuild} direction="horizontal"/>
					<Scene key="AddSidewalk" component={AddSidewalk} direction="horizontal"/>
					<Scene key="BuildDetail" component={BuildDetail} direction="horizontal"/>
					<Scene key="EditBuild" component={EditBuild} direction="horizontal"/>
					<Scene key="EditProfile" component={EditProfile} direction="horizontal"/>
					<Scene key="EditSidewalk" component={EditSidewalk} direction="horizontal"/>
					<Scene key="EditPublicSpace" component={EditPublicSpace} direction="horizontal"/>
					<Scene key="AddPublicSpace" component={AddPublicSpace} direction="horizontal"/>
					<Scene key="PublicSpaceDetail" component={PublicSpaceDetail} direction="horizontal"/>
					<Scene key="SidewalkDetail" component={SidewalkDetail} direction="horizontal"/>
					<Scene key="Register" component={Register} direction="horizontal" />
					<Scene key="Comments" component={Comments} direction="horizontal" />
					<Scene key="Evals" component={Evals} direction="horizontal" />
					<Scene key="EvalDetail" component={EvalDetail} direction="horizontal" />
					<Scene key="AlterEvalsBuild" component={AlterEvalsBuild} direction="horizontal" />
					<Scene key="AlterEvalsPublic" component={AlterEvalsPublic} direction="horizontal" />
					<Scene key="AlterEvalsSidewalk" component={AlterEvalsSidewalk} direction="horizontal" />
					<Scene key="AlterEvalsCross" component={AlterEvalsCross} direction="horizontal" />
				</Scene>
			</Router>
		);
	}
}

export default AppNavigator;