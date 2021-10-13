import React from "react";
import "./StickyHeader.css";

export default class StickyHeader extends React.Component {
  static defaultProps = {
    stickyHeaderTop: -1,
    // stickyScrollTop: new Animated.Value(0),
  };

  constructor(props) {
    super(props);
    this.state = {
      stickyLayoutTop: 0,
    };
  }

  _onLayout = (event) => {
    this.setState({
      stickyLayoutTop: event.nativeEvent.layout.y,
    });
  };

  render() {
    // const { stickyHeaderTop, stickyScrollTop, children, style } = this.props;
    // const { stickyLayoutTop } = this.state;
    // let top = stickyHeaderTop !== -1 ? stickyHeaderTop : stickyLayoutTop;
    // const translateTop = stickyScrollTop.interpolate({
    //   inputRange: [-1, 0, y, y + 1],
    //   outputRange: [0, 0, 0, 1],
    // });

    return <div className="StickyHeader">{this.props.children}</div>;
  }
}

// const styles = StyleSheet.create({
//   container: {
//     zIndex: 100,
//   },
// });
