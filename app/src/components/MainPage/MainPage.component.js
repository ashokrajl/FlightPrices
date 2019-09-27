import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

import MyCalendar from '../Calendar/Calendar.component';
import SelectJourney from '../SelectJourney/SelectJourney.container';

const styles = {
    loaderWrapper: {
        position: 'absolute',
        top: '40%',
        left: '50%'
    },
    selectStyle: {
        display: 'flex',      
        justifyContent: 'center',
        paddingBottom: '30px'
    }
}
export default class MainPage extends React.Component<MainPageProps, MainPageState> {

    constructor(props) {
        super(props);
        this.loading = true;
    }

    componentDidMount() {
        this.props.getAPIKey();
    }

    render() {
        const { prices = [] } = this.props;
        let pricesArray = [];
        if(prices && prices.length > 0){
            pricesArray = prices.map((data, i) => {
                const eventObj = {};
                if (data && data.OutboundLeg) {
                    eventObj['id'] = i;
                    eventObj['title'] = data.MinPrice;
                    eventObj['start'] = new Date(data.OutboundLeg.DepartureDate);
                    eventObj['end'] = new Date(data.OutboundLeg.DepartureDate);
                }
                return eventObj;
            });
        }


        return (
            <div className="app">
                <div style={styles.selectStyle} >
                    <SelectJourney />
                </div>
                <MyCalendar events={pricesArray} />
                <div style={styles.loaderWrapper}>
                    <FadeLoader
                        sizeUnit={"px"}
                        size={150}
                        color={'#03a9f4c7'}
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }

}
