import React from "react";
import { StyleSheet, Image, Platform, Pressable } from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";

export default function EmojiList({ onSelect, onCloseModal }) {
    // const [emoji] = useState([
    //     require('../assets/images/emoji1.png'),
    //     require('../assets/images/emoji2.png'),
    //     require('../assets/images/emoji3.png'),
    //     require('../assets/images/emoji4.png'),
    //     require('../assets/images/emoji5.png'),
    //     require('../assets/images/emoji6.png'),
    // ]);

    return (
        <EmojiSelector
      horizontal
      showsHorizontalScrollIndicator={Platform.OS === 'web'}
      category={Categories.symbols}
      showSearchBar={false}
      onEmojiSelected={emoji => {
        onSelect(emoji);
        onCloseModal();
      }}
      contentContainerStyle={styles.listContainer}
      renderItem={({ categories, index }) => {
        return (
          <Pressable
            onPress={() => {
              onEmojiSelected(categories);
            }}>
            <Image source={categories} key={index} style={styles.image} />
          </Pressable>
        );
      }}
    />
  );
}

const styles = StyleSheet.create({
    listContainer: {
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      paddingHorizontal: 20,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    image: {
      width: 100,
      height: 100,
      marginRight: 20,
    },
  });