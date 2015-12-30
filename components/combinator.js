import React from 'react-native';
import _ from 'lodash';
import combineTemplate from './combineTemplate';
let {LayoutAnimation}=React
class Combinator extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Keep track of whether the component has mounted
    this.componentHasMounted = false;
    // Subscribe to child prop changes so we know when to re-render
    this.subscription = combineTemplate(props.children).subscribe(
      children =>{
        // LayoutAnimation.easeInEaseOut()
        !this.componentHasMounted
          ? this.state = children
          : this.setState(children)
      }
    );
  }
  shouldComponentUpdate(nextProps, nextState) {
    return !_.isEqual(nextState, this.state)
  }
  componentDidMount() {
    this.componentHasMounted = true;
  }
  componentWillUnmount() {
    // Clean-up subscription before un-mounting
    this.subscription.dispose();
  }
  render() {
    // console.log('combinator is in the house',this.props.me)
    return this.state;
  }
}

export default Combinator;