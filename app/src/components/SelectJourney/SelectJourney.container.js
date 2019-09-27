import { connect } from 'react-redux';

import SelectJourney from './SelectJourney.component';
import { changeRoute } from '../../actions';


const dispatchToProps = {
    changeRoute
};

export default connect(null,dispatchToProps)(SelectJourney);