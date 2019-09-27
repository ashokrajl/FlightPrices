import React from 'react';
import RingLoader from 'react-spinners/RingLoader';

import MyCalendar from '../Calendar/Calendar.component';
import SelectJourney from '../SelectJourney/SelectJourney.container';

const styles = {
    loaderWrapper: {
        position: 'absolute',
        top: '40%',
        left: '45%'
    },
    selectStyle: {
        display: 'flex',      
        justifyContent: 'center',
        paddingBottom: '30px'
    },
    error: {
        color: 'red',
        fontSize: '20px',
        paddingLeft: '30%',
        paddingBottom: '2%'
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
        const { prices = [], error } = this.props;
        
        let pricesArray = [];
        if(prices && prices.length > 0){
            pricesArray = prices.map((data, i) => {
                const eventObj = {};
                if (data && data.OutboundLeg) {
                    eventObj['id'] = i;
                    eventObj['title'] = `$${data.MinPrice}`;
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
            {error && <div style={styles.error}> Some Error Occured! Please check API</div>}
                <MyCalendar events={pricesArray} />
                <div style={styles.loaderWrapper}>
                    <RingLoader
                        size={150}
                        color={'#4A90E2'}
                        loading={this.props.loading}
                    />
                </div>
            </div>
        );
    }

}
