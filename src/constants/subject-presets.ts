export interface SubjectPreset {
  name: string;
  icon: string;
  color: string;
}

export const SUBJECT_PRESETS: SubjectPreset[] = [
  // Core & Major Subjects
  { name: "Chemistry", icon: "FlaskConical", color: "sky" },
  { name: "Physics", icon: "Atom", color: "blue" },
  { name: "Mathematics", icon: "Calculator", color: "indigo" },
  { name: "English", icon: "Coffee", color: "amber" },
  { name: "Chinese Language", icon: "Book", color: "orange" },
  { name: "Physical Education", icon: "Dumbbell", color: "rose" },
  { name: "Psychology", icon: "Leaf", color: "lime" },
  { name: "Politics", icon: "Scale", color: "red" },
  { name: "Military Training", icon: "Hourglass", color: "slate" },

  // General Elective Modules
  { name: "Art Aesthetics & Cultural Reflection", icon: "Palette", color: "pink" },
  { name: "World Civilizations & Global Vision", icon: "Earth", color: "teal" },
  { name: "Gongneng Quality & Serving China", icon: "Scroll", color: "purple" },
  { name: "Engineering Literacy & Future Technology", icon: "Terminal", color: "cyan" },
  { name: "Social Development & National Governance", icon: "Briefcase", color: "yellow" },
  { name: "Scientific Spirit & Healthy Living", icon: "Check", color: "green" },
];
