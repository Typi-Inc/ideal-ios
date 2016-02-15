import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
import {openAnimation} from './animations'
import Navbar from './navbar'
import Certificate from './certificate'
import Loading from './loading'
import {getQuery} from '../intent/getQuery'
import Combinator from './combinator'
import _ from 'lodash'
import Spinner from 'react-native-spinkit'
let UIManager = require('NativeModules').UIManager;
let {
  Text,
  TouchableOpacity,
  LayoutAnimation,
  ScrollView,
  InteractionManager,
  Animated,
  Image,
  View,
} = React;
export default class Info extends React.Component{
	state={loading:false,open:true,open1:false,totalBuyCount:0}
	componentDidMount(){
	}
	componentWillMount(){
		getQuery([
			['dealsById',this.props.deal.get('id'),'certificates','sort:createdAt=desc', 'edges', {from: 0, to: 20}, ['title','oldPrice','newPrice','id']],
		])
	}
	static contextTypes={
    	state$: React.PropTypes.any
  	}
  	componentWillUnmount(){
  	}
  	totalBuyCount(val,type){
  		this.setState({totalBuyCount:this.state.totalBuyCount+val})
  	}
	render(){
		// if(this.state.loading){
		// 	return <View style={{height:500*k}}></View>
		// }
		this.anim=this.anim || new Animated.Value(0)
		this.anim1=this.anim1 || new Animated.Value(0)
		let certificates = this.props.deal.getIn(['certificates', 'sort:createdAt=desc', 'edges'])
		return (
			<View style={{marginBottom:70*k}}>
				
				{
					certificates ? certificates.toArray().map((certificate,i) => (
						<View key={`${certificate.get('id')}${this.props.deal.get('id')}`} >
							<Certificate count={this.props.count} index={i} totalBuyCount={this.totalBuyCount.bind(this)} certificate={certificate}/>
							<View style={{...separator}}/>
						</View>
					)) : (
						<View  style={{...center}}>
  							<Spinner style={{marginTop:15*k}} isVisible size={30} type={'WanderingCubes'} color={'0679a2'}/>       
						</View>
					)
				}
			</View>		
 		)
		
	}
}
Object.assign(Info.prototype, TimerMixin);


