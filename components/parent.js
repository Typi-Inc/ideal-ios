import React from 'react-native'
import TimerMixin from 'react-timer-mixin'
let {
  Text,

} = React;
export default class Parent extends React.Component{
 
  
  render(){
   
    
    return (
      <View style={{}}>
    

      </View>
      
        )
  }
}
Object.assign(Parent.prototype, TimerMixin);

        // <Test open={this.state.open} ref={el=>this.test=el}/>



