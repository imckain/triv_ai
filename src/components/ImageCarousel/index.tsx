/* eslint-disable react-native/no-inline-styles */
import React, { useCallback, useEffect, useState } from 'react';
import { Image, Animated, Pressable, View, Text, TextInput } from 'react-native';
import { styles } from './styles';

interface Props {
  result: resultObj,
  guesses: number,
  checkAnswer: (value: string) => true | false,
  ref: React.RefObject<TextInput>
}

type resultObj = {
  id: number,
  type: string,
  artist: string,
  album: string,
  genre: string,
  song: string,
  keywords: string[],
  correctResponse: (string | null)[],
  urls: string[],
};

export const ImageCarousel: React.FC<{ result: resultObj, guesses: number, checkAnswer: (value: string) => true | false, ref: React.RefObject<TextInput> }> = (props: Props) => {
  const [imageUrls, setImageUrls] = useState<string[]>([props.result.urls[0].toString()]);
  const [imageToShow, setImageToShow] = useState(0);

  const imageRef = React.createRef<View>();

  const fadeIn = new Animated.Value(0);
  const fadeOut = new Animated.Value(1);

  const imageChangeIn = () => {
    Animated.timing(
      fadeIn,
      {
        toValue: 1,
        duration: 1000,
        useNativeDriver: false,
      }
    ).start();
  };

  const imageChangeOut = () => {
    Animated.timing(
      fadeOut,
      {
        toValue: 0,
        duration: 1500,
        useNativeDriver: false,
      }
    ).start();
  };

  const getUrls = (obj: resultObj) => {
    if (obj !== undefined) {
      if (obj.urls[0] !== undefined && props.guesses === 0) {
        setImageUrls([obj.urls[0].toString()]);
      }
      if (obj.urls[props.guesses] !== undefined && props.guesses > 0) {
        setImageUrls([...imageUrls, obj.urls[props.guesses].toString()]);
      } else {
        return;
      }
    } else {
      return;
    }
  };

  const showImage = useCallback((index: number, uris: string[]) => {
    if (props.guesses === 0) {
      return (
        <View>
          <Image style={[styles.image]} source={{ width: 300, height: 300, uri: uris[index] }} />
        </View>
      );
    }
    if (props.guesses >= 1) {
      if (imageToShow === 0) {
        return (
          <View>
            <Animated.Image style={[styles.image, { position: 'absolute', alignSelf: 'center', opacity: fadeOut }]} source={{ width: 300, height: 300, uri: uris[uris.length - 1] }} />
            <Animated.Image style={[styles.image, { opacity: fadeIn }]} source={{ width: 300, height: 300, uri: uris[index] }} />
          </View>
        );
      } else {
        return (
          <View>
            <Animated.Image style={[styles.image, { position: 'absolute', alignSelf: 'center', opacity: fadeOut }]} source={{ width: 300, height: 300, uri: uris[index - 1] }} />
            <Animated.Image style={[styles.image, { opacity: fadeIn }]} source={{ width: 300, height: 300, uri: uris[index] }} />
          </View>
        );
      }
    } else {
      return (
        <View>
          <Animated.Image style={[styles.image, { position: 'absolute', alignSelf: 'center', opacity: fadeOut }]} source={{ width: 300, height: 300, uri: uris[index - 1] }} />
          <Animated.Image style={[styles.image, { opacity: fadeIn }]} source={{ width: 300, height: 300, uri: uris[index] }} />
        </View>
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageToShow]);

  const showImageIndex = useCallback((imageIndex: number) => {
    console.log(imageIndex);
    const toDisplay = imageUrls.map((_value, index) => {
      return index === imageIndex
        ? <Text style={{ fontSize: 32, color: '#ffffff' }} key={index}>◉</Text>
        : <Text style={{ fontSize: 26, color: '#9c9c9c41' }} key={index}>○</Text>;
    });

    return toDisplay;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageToShow]);

  useEffect(() => {
    getUrls(props.result);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.result, props.guesses]);

  useEffect(() => {
    imageChangeOut();
    imageChangeIn();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageToShow]);

  useEffect(() => {
    imageUrls.length >= imageToShow && imageUrls.length !== imageToShow + 1
      ? setImageToShow(imageToShow + 1)
      : setImageToShow(0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageUrls]);

  useEffect(() => {
    props.ref?.current?.focus();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageToShow]);

  return (
    <View>
      <Pressable
        ref={imageRef}
        style={styles.imageContainer}
        onPress={() => {
          if (imageUrls.length >= 1) {
            imageUrls.length >= imageToShow + 1 && imageUrls.length !== imageToShow + 1
              ? setImageToShow(imageToShow + 1)
              : setImageToShow(0);
          }
          imageRef.current?.blur();
          props.ref?.current?.focus();
        }}>
        {showImage(imageToShow, imageUrls)}
      </Pressable>
      <View style={styles.imageIndex}>
        {showImageIndex(imageToShow)}
      </View>
    </View>
  );
};
