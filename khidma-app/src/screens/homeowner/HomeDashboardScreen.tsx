import React, { useMemo, useState } from "react";
import {
  FlatList,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Colors } from "../../theme/colors";

type Category = {
  id: string;
  title: "Plumbing" | "Electrical" | "Carpentry";
  icon: string;
};

type ProCard = {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  isVerified: boolean;
  eta: string;
};

const CATEGORIES: Category[] = [
  { id: "1", title: "Plumbing", icon: "🔧" },
  { id: "2", title: "Electrical", icon: "⚡" },
  { id: "3", title: "Carpentry", icon: "🪚" }
];

const AVAILABLE_PROS: ProCard[] = [
  { id: "1", name: "Mohamed Adel", specialty: "Plumber", rating: 4.9, isVerified: true, eta: "Available today" },
  { id: "2", name: "Youssef Omar", specialty: "Electrician", rating: 4.7, isVerified: true, eta: "Available in 2 hrs" },
  { id: "3", name: "Karim Samir", specialty: "Carpenter", rating: 4.6, isVerified: false, eta: "Available tomorrow" }
];

const CATEGORY_TO_SPECIALTY: Record<Category["title"], string> = {
  Plumbing: "plumber",
  Electrical: "electrician",
  Carpentry: "carpenter"
};

export default function HomeDashboardScreen(): React.JSX.Element {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category["title"] | null>(null);

  const filteredPros = useMemo(() => {
    return AVAILABLE_PROS.filter((pro) => {
      const bySearch = pro.name.toLowerCase().includes(search.toLowerCase()) || pro.specialty.toLowerCase().includes(search.toLowerCase());
      if (!selectedCategory) {
        return bySearch;
      }
      return bySearch && pro.specialty.toLowerCase().includes(CATEGORY_TO_SPECIALTY[selectedCategory]);
    });
  }, [search, selectedCategory]);

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        ListHeaderComponent={
          <View style={styles.headerSection}>
            <Text style={styles.title}>Welcome to khidma</Text>
            <Text style={styles.subtitle}>Book trusted professionals in a few taps.</Text>

            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Search by pro name or service"
              placeholderTextColor={Colors.textSecondary}
              style={styles.searchInput}
            />

            <Text style={styles.sectionTitle}>Service Categories</Text>
            <View style={styles.categoriesRow}>
              {CATEGORIES.map((category) => (
                <Pressable
                  key={category.id}
                  onPress={() => setSelectedCategory((prev) => (prev === category.title ? null : category.title))}
                  style={[
                    styles.categoryChip,
                    selectedCategory === category.title && styles.categoryChipSelected
                  ]}
                >
                  <Text style={styles.categoryText}>{category.icon} {category.title}</Text>
                </Pressable>
              ))}
            </View>

            <View style={styles.quickActionsRow}>
              <Pressable style={styles.actionButton}>
                <Text style={styles.actionButtonText}>Request Quote</Text>
              </Pressable>
              <Pressable style={[styles.actionButton, styles.actionButtonGhost]}>
                <Text style={[styles.actionButtonText, styles.actionButtonGhostText]}>Book a Slot</Text>
              </Pressable>
            </View>

            <Text style={styles.sectionTitle}>Available Professionals</Text>
          </View>
        }
        data={filteredPros}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.contentContainer}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardName}>{item.name}</Text>
              {item.isVerified ? (
                <View style={styles.verifiedBadge}>
                  <Text style={styles.verifiedBadgeText}>Verified</Text>
                </View>
              ) : null}
            </View>
            <Text style={styles.cardMeta}>{item.specialty} • ⭐ {item.rating}</Text>
            <Text style={styles.cardEta}>{item.eta}</Text>
            <Pressable style={styles.viewButton}>
              <Text style={styles.viewButtonText}>View Profile</Text>
            </Pressable>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No professionals match your current filter.</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  contentContainer: {
    padding: 16,
    gap: 12
  },
  headerSection: {
    gap: 12,
    marginBottom: 8
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary
  },
  subtitle: {
    color: Colors.textSecondary
  },
  searchInput: {
    backgroundColor: Colors.surface,
    borderColor: Colors.border,
    borderWidth: 1,
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    color: Colors.textPrimary
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.textPrimary
  },
  categoriesRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  categoryChip: {
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  categoryChipSelected: {
    borderColor: Colors.primary,
    backgroundColor: "#E5F1FA"
  },
  categoryText: {
    color: Colors.textPrimary,
    fontWeight: "500"
  },
  quickActionsRow: {
    flexDirection: "row",
    gap: 10
  },
  actionButton: {
    flex: 1,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  actionButtonGhost: {
    backgroundColor: Colors.surface,
    borderColor: Colors.primary,
    borderWidth: 1
  },
  actionButtonText: {
    color: Colors.surface,
    fontWeight: "600"
  },
  actionButtonGhostText: {
    color: Colors.primary
  },
  card: {
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderColor: Colors.border,
    borderWidth: 1,
    padding: 14,
    gap: 8
  },
  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center"
  },
  cardName: {
    color: Colors.textPrimary,
    fontSize: 16,
    fontWeight: "700"
  },
  verifiedBadge: {
    backgroundColor: "#E7F7EE",
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4
  },
  verifiedBadgeText: {
    color: Colors.verified,
    fontWeight: "600",
    fontSize: 12
  },
  cardMeta: {
    color: Colors.textSecondary
  },
  cardEta: {
    color: Colors.textPrimary
  },
  viewButton: {
    alignSelf: "flex-start",
    borderColor: Colors.primary,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  viewButtonText: {
    color: Colors.primary,
    fontWeight: "600"
  },
  emptyText: {
    textAlign: "center",
    color: Colors.textSecondary,
    marginTop: 24
  }
});
