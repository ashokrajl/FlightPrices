import { connect } from 'react-redux';

import MainPageComponent from './MainPage.component';
import { getAPIKey } from '../../actions';


const stateToProps = state => {
    return state};

const dispatchToProps = {
    getAPIKey
};


export default connect(stateToProps,dispatchToProps)(MainPageComponent);