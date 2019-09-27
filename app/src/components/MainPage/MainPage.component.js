import React from 'react';
import FadeLoader from 'react-spinners/FadeLoader';

import MyCalendar from '../Calendar/Calendar.component';

const loaderWrapper = {
    position : 'absolute',
    top: '40%',
    left: '50%'
}
export default class MainPage extends React.Component<MainPageProps, MainPageState> {

    constructor(props) {
        super(props);
        this.loading = true;
      }

    componentDidMount(){
        this.props.getAPIKey();
    }

    render() {
        const { prices =[] } = this.props;
        const pricesArray = prices.map((data, i)=>{
            const eventObj = {};
            if(data && data.OutboundLeg){
                eventObj['id'] = i;
                eventObj['title'] = data.MinPrice;
                eventObj['start'] = new Date(data.OutboundLeg.DepartureDate);
                eventObj['end'] = new Date(data.OutboundLeg.DepartureDate);
            }
            return eventObj;
        });       
        
        return (
            <div className="app">
            <MyCalendar events={pricesArray}/>
             <div style={loaderWrapper}>
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
