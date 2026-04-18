import React, { useState } from "react";
import {
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from "react-native";
import { Colors } from "../../theme/colors";

const SKILLS = ["Plumbing", "Electrical", "Carpentry", "Painting", "AC Repair"];

export default function ProfessionalOnboardingScreen(): React.JSX.Element {
  const [fullName, setFullName] = useState("");
  const [bio, setBio] = useState("");
  const [experience, setExperience] = useState("");
  const [hourlyRate, setHourlyRate] = useState("");
  const [selectedSkills, setSelectedSkills] = useState<string[]>([]);

  const toggleSkill = (skill: string) => {
    setSelectedSkills((prev) => {
      if (prev.includes(skill)) {
        return prev.filter((item) => item !== skill);
      }
      return [...prev, skill];
    });
  };

  const isValid = fullName.trim().length > 2 && selectedSkills.length > 0;

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.contentContainer}>
        <Text style={styles.title}>Professional Onboarding</Text>
        <Text style={styles.subtitle}>Complete your profile to start receiving job requests.</Text>

        <View style={styles.card}>
          <Text style={styles.label}>Full Name</Text>
          <TextInput
            value={fullName}
            onChangeText={setFullName}
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>Bio</Text>
          <TextInput
            value={bio}
            onChangeText={setBio}
            style={[styles.input, styles.multilineInput]}
            multiline
            numberOfLines={4}
            placeholder="Tell homeowners about your experience"
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>Years of Experience</Text>
          <TextInput
            value={experience}
            onChangeText={setExperience}
            keyboardType="number-pad"
            style={styles.input}
            placeholder="e.g. 8"
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>Hourly Rate (EGP)</Text>
          <TextInput
            value={hourlyRate}
            onChangeText={setHourlyRate}
            keyboardType="number-pad"
            style={styles.input}
            placeholder="e.g. 250"
            placeholderTextColor={Colors.textSecondary}
          />

          <Text style={styles.label}>Skills</Text>
          <View style={styles.skillsWrap}>
            {SKILLS.map((skill) => (
              <Pressable
                key={skill}
                onPress={() => toggleSkill(skill)}
                style={[
                  styles.skillChip,
                  selectedSkills.includes(skill) && styles.skillChipSelected
                ]}
              >
                <Text
                  style={[
                    styles.skillText,
                    selectedSkills.includes(skill) && styles.skillTextSelected
                  ]}
                >
                  {skill}
                </Text>
              </Pressable>
            ))}
          </View>

          <Text style={styles.label}>Identity Verification</Text>
          <Pressable style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload National ID</Text>
          </Pressable>
          <Pressable style={styles.uploadButton}>
            <Text style={styles.uploadButtonText}>Upload Certifications</Text>
          </Pressable>
          <Text style={styles.verificationHint}>
            Your profile gets a Verified badge after document review.
          </Text>

          <Pressable style={[styles.submitButton, !isValid && styles.submitButtonDisabled]} disabled={!isValid}>
            <Text style={styles.submitText}>Submit for Verification</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  contentContainer: {
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: "700",
    color: Colors.primary
  },
  subtitle: {
    marginTop: 6,
    color: Colors.textSecondary
  },
  card: {
    marginTop: 16,
    backgroundColor: Colors.surface,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14
  },
  label: {
    marginTop: 10,
    marginBottom: 6,
    color: Colors.textPrimary,
    fontWeight: "600"
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    color: Colors.textPrimary
  },
  multilineInput: {
    minHeight: 90,
    textAlignVertical: "top"
  },
  skillsWrap: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8
  },
  skillChip: {
    borderWidth: 1,
    borderColor: Colors.border,
    borderRadius: 999,
    paddingHorizontal: 12,
    paddingVertical: 8
  },
  skillChipSelected: {
    backgroundColor: "#E5F1FA",
    borderColor: Colors.primary
  },
  skillText: {
    color: Colors.textPrimary
  },
  skillTextSelected: {
    color: Colors.primary,
    fontWeight: "600"
  },
  uploadButton: {
    marginTop: 8,
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 10,
    alignItems: "center"
  },
  uploadButtonText: {
    color: Colors.primary,
    fontWeight: "600"
  },
  verificationHint: {
    marginTop: 8,
    color: Colors.textSecondary
  },
  submitButton: {
    marginTop: 18,
    backgroundColor: Colors.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center"
  },
  submitButtonDisabled: {
    opacity: 0.5
  },
  submitText: {
    color: Colors.surface,
    fontWeight: "700"
  }
});
