import { View } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  useAnimatedGestureHandler,
  withSpring,
} from 'react-native-reanimated';
import {  PanGestureHandler, TapGestureHandler} from "react-native-gesture-handler";

const AnimatedView = Animated.createAnimatedComponent(View);

export default function EmojiSticker({ imageSize, stickerSource }) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const scaleImage = useSharedValue(imageSize);

  const onDoubleTap = useAnimatedGestureHandler({
    onActive: () => {
      if (scaleImage.value !== imageSize * 2) {
        scaleImage.value = scaleImage.value * 2;
      } else {
        scaleImage.value = scaleImage.value / 2;
      }
    },
  });

  const imageStyle = useAnimatedStyle(() => {
    return {
      fontSize: withSpring(scaleImage.value),
    };
  });

  const onDrag = useAnimatedGestureHandler({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      const newX = event.translationX + context.translateX;
      const newY = event.translationY + context.translateY;

      const imageWidth = 320;
      const imageHeight = 440;

      const maxX = imageWidth;
      const minX = 0;
      const maxY = imageHeight;
      const minY = -imageHeight / 2;

      const clampedX = Math.min(Math.max(newX, minX), maxX);
      const clampedY = Math.min(Math.max(newY, minY), maxY);

      translateX.value = clampedX;
      translateY.value = clampedY;

    },
  });

  const containerStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <PanGestureHandler onGestureEvent={onDrag}>
      <AnimatedView style={[containerStyle, {top: -350 }]}>
      <TapGestureHandler onGestureEvent={onDoubleTap} numberOfTaps={2}>
        <Animated.Text
          style={[imageStyle, { fontSize: imageSize }]}
        >{stickerSource}</Animated.Text>
      </TapGestureHandler>
    </AnimatedView>
    </PanGestureHandler>
  );
}
