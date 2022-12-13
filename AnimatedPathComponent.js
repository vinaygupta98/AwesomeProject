import * as React from "react";
import { Animated, Easing } from "react-native";
import { Path } from "react-native-svg";
import { svgPathProperties } from "svg-path-properties";
const AnimatedPath = Animated.createAnimatedComponent(Path);
// const PATH =
//   'M 703.551 934.737 C 702.833 923.503 702.777 912.221 702.627 900.961 C 702.485 890.44 702.584 879.915 702.618 869.389 A 89.441 89.441 0 0 1 705.424 847.328 C 708.354 835.956 715.666 827.686 725.332 821.857 Q 753.861 804.657 783.055 788.57';
// const svgProperties = new svgPathProperties(PATH);
// const totalLength = svgProperties.getTotalLength();

const Point1 = "M 703.551 934.737";
const Point2 = "C 702.833 923.503 702.777 912.221 702.627 900.961";
const Point3 = "C 702.485 890.44 702.584 879.915 702.618 869.389";
const Point4 = "A 89.441 89.441 0 0 1 705.424 847.328";
const Point5 = "C 708.354 835.956 715.666 827.686 725.332 821.857";
const Point6 = "Q 753.861 804.657 783.055 788.57";

const AnimatedPathComponent = ({
  strokeWidth,
  PATH,
  strokeDasharray = 10,
  duration = 3000,
  reverse = false,
  DIFF = 0,
  ...props
}) => {
  const svgProperties = new svgPathProperties(PATH);
  const totalLength = svgProperties.getTotalLength();
  const animated = React.useRef(
    new Animated.Value(reverse ? totalLength : 0)
  ).current;
  const PathRef = React.useRef(null);
  const animation = (toValue) => {
    let Animation = [];
    if (reverse) {
      Animation.push(
        Animated.timing(animated, {
          duration: duration,
          toValue: DIFF,
          useNativeDriver: true,
          easing: Easing.linear,
        })
      );
    } else {
      Animation.push(
        Animated.timing(animated, {
          duration: duration,
          toValue: toValue - DIFF,
          useNativeDriver: true,
          delay: 0,
          easing: Easing.linear,
        })
      );
    }
    return Animated.loop(Animated.sequence(Animation));
  };

  React.useEffect(() => {
    animation(totalLength).start();
    return () => {
      animation(totalLength).stop();
    };
  });
  return (
    <AnimatedPath
      ref={PathRef}
      d={PATH}
      fill="transparent"
      stroke="#FFCC05"
      // strokeMiterlimit={10}
      strokeWidth={strokeWidth}
      strokeDasharray={strokeDasharray}
      strokeDashoffset={animated}
      {...props}
      // strokeOpacity={0.5}
    />
  );
};

export default AnimatedPathComponent;
