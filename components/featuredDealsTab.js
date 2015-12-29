import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import _ from 'lodash';
import Combinator from './combinator'
import Deals from './deals'
import {getFeaturedDeals} from '../model'
import {getQuery} from '../intent/getQuery';
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  View, 
} = React;


export default class FeaturedDealsTab extends React.Component{
	componentWillMount() {
		getQuery([
			['featuredDeals',{from:0,to:10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, 'text'],
			['featuredDeals',{from:0,to:10}, ['title','conditions','id','image','discount']],
			['featuredDeals',{from:0,to:10},'business',['name','image']],
			['featuredDeals',{from:0,to:10},'likes','sort:createdAt=desc','count']
		])
	}

	getMoreData(){
		getQuery([
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10},'tags','sort:createdAt=desc', 'edges', {from: 0, to: 6}, 'text'],
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10}, ['title','conditions','id','image','discount']],
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10},'business',['name','image']],
			['featuredDeals',{from:this.deals.length,to:this.deals.length+10},'likes','sort:createdAt=desc','count']
		])
	}
	render(){
		// this.props.featuredDeals$.map(deals => console.log(deals) || deals)
		return (
			<Combinator>
				<View style={{flex:1}}>
					{this.props.deals$.map(deals => {
							this.deals=_.values(deals).filter(deal => deal && deal.title)
							// console.log(this.deals)
							return <Deals getMoreData={this.getMoreData.bind(this)}  data={_.values(deals).filter(deal => deal && deal.title)} />
						}
					)}
				</View>
			</Combinator>
		)

	}
}

Object.assign(FeaturedDealsTab.prototype, TimerMixin);
