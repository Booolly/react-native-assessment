import { Pressable, ScrollView, StyleSheet, Text } from 'react-native';

interface CategoryFilterProps {
  categories: string[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export const ALL_CATEGORIES = 'All';

export default function CategoryFilter({
  categories,
  selectedCategory,
  onSelectCategory,
}: CategoryFilterProps) {
  const options = [ALL_CATEGORIES, ...categories];

  return (
    <ScrollView
      horizontal
      contentContainerStyle={styles.content}
      showsHorizontalScrollIndicator={false}
    >
      {options.map((category) => {
        const isSelected = selectedCategory === category;

        return (
          <Pressable
            accessibilityRole="button"
            key={category}
            onPress={() => onSelectCategory(category)}
            style={({ pressed }) => [
              styles.option,
              isSelected && styles.selectedOption,
              pressed && styles.pressedOption,
            ]}
          >
            <Text style={[styles.optionText, isSelected && styles.selectedText]}>
              {category}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  option: {
    backgroundColor: '#ffffff',
    borderColor: '#d1d5db',
    borderRadius: 999,
    borderWidth: 1,
    marginRight: 8,
    paddingHorizontal: 14,
    paddingVertical: 9,
  },
  selectedOption: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  pressedOption: {
    opacity: 0.75,
  },
  optionText: {
    color: '#374151',
    fontSize: 14,
    fontWeight: '700',
    textTransform: 'capitalize',
  },
  selectedText: {
    color: '#ffffff',
  },
});
