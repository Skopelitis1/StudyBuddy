// All the data of the mockup lives here.
// Nothing is calculated: the match scores were written by hand
// to show what the recommender system would return.

// The student who is using the app.
export const currentUser = {
  name: 'Δημήτρης Αντωνίου',
  firstName: 'Δημήτρη', // vocative, used in "Γεια σου, Δημήτρη"
  initials: 'ΔΑ',
  avatarColor: 'bg-indigo-500',
  department: 'Πληροφορική',
  year: '3ο έτος',
  studyTime: 'Βράδια',
  gradeGoal: '8.5+',
  // level is a percentage from 0 to 100
  skills: [
    { name: 'Python', level: 90 },
    { name: 'Machine Learning', level: 75 },
    { name: 'SQL', level: 60 },
    { name: 'Git', level: 50 },
  ],
  // Skills the user does NOT have and wants a partner for.
  lookingFor: ['UI Design', 'React', 'Στατιστική', 'Java'],
  courses: [
    'Τεχνολογία Λογισμικού',
    'Μηχανική Μάθηση',
    'Βάσεις Δεδομένων',
    'Αλληλεπίδραση Ανθρώπου-Υπολογιστή',
  ],
}

// What the recommender system suggests, best match first.
// breakdown: similarity per category. The match score is their average.
export const recommendedStudents = [
  {
    id: 1,
    name: 'Αλέξης Παπαδόπουλος',
    vocative: 'Αλέξη',
    initials: 'ΑΠ',
    avatarColor: 'bg-rose-500',
    department: 'Διοικητική Επιστήμη & Τεχνολογία',
    year: '3ο έτος',
    matchScore: 96,
    skills: ['UI Design', 'React', 'Figma', 'HTML/CSS'],
    lookingFor: ['Python'],
    sharedCourses: ['Τεχνολογία Λογισμικού', 'Αλληλεπίδραση Ανθρώπου-Υπολογιστή'],
    studyTime: 'Βράδια',
    gradeGoal: '8.5+',
    explanation:
      'Συμπληρωματικές δεξιότητες για το μάθημα Τεχνολογία Λογισμικού. Εσύ ξέρεις Python, ο Αλέξης ξέρει UI Design και React.',
    breakdown: { skills: 98, courses: 95, schedule: 94, goal: 97 },
    suggestedCourse: 'Τεχνολογία Λογισμικού',
    suggestedMessage:
      'Γεια σου Αλέξη! Είδα ότι ξέρεις UI Design και React. Ψάχνω συνεργάτη για το project της Τεχνολογίας Λογισμικού. Εγώ μπορώ να αναλάβω το backend σε Python. Κάνουμε ομάδα;',
    autoReply:
      'Γεια σου Δημήτρη! Πολύ ωραία, έψαχνα κάποιον για το backend σε Python. Πότε σε βολεύει να μιλήσουμε στο Discord για να χωρίσουμε τα κομμάτια;',
  },
  {
    id: 2,
    name: 'Μαρία Κωνσταντίνου',
    vocative: 'Μαρία',
    initials: 'ΜΚ',
    avatarColor: 'bg-emerald-500',
    department: 'Στατιστική',
    year: '4ο έτος',
    matchScore: 88,
    skills: ['Στατιστική', 'R', 'Data Visualization', 'Excel'],
    lookingFor: ['Machine Learning'],
    sharedCourses: ['Μηχανική Μάθηση', 'Βάσεις Δεδομένων'],
    studyTime: 'Απογεύματα & Σαββατοκύριακα',
    gradeGoal: '9+',
    explanation:
      'Ταιριάζετε για το project της Μηχανικής Μάθησης. Εσύ φτιάχνεις τα μοντέλα, η Μαρία ξέρει Στατιστική και R για την ανάλυση των δεδομένων.',
    breakdown: { skills: 92, courses: 90, schedule: 78, goal: 92 },
    suggestedCourse: 'Μηχανική Μάθηση',
    suggestedMessage:
      'Γεια σου Μαρία! Ψάχνω συνεργάτη για το project της Μηχανικής Μάθησης. Εγώ ξέρω Python και Machine Learning, εσύ Στατιστική και R. Θα ήθελες να το κάνουμε μαζί;',
    autoReply:
      'Καλησπέρα Δημήτρη! Φυσικά, τέλειος συνδυασμός. Έχω ήδη κατεβάσει το dataset του μαθήματος, σου το στέλνω να το δούμε!',
  },
  {
    id: 3,
    name: 'Νίκος Γεωργίου',
    vocative: 'Νίκο',
    initials: 'ΝΓ',
    avatarColor: 'bg-amber-500',
    department: 'Πληροφορική',
    year: '2ο έτος',
    matchScore: 74,
    skills: ['Java', 'Spring Boot', 'Docker', 'Git'],
    lookingFor: ['Python', 'SQL'],
    sharedCourses: ['Τεχνολογία Λογισμικού', 'Βάσεις Δεδομένων'],
    studyTime: 'Πρωινά',
    gradeGoal: '8+',
    explanation:
      'Καλή επιλογή για το backend της Τεχνολογίας Λογισμικού, ξέρει Java και Spring Boot. Το ποσοστό είναι χαμηλότερο γιατί ο Νίκος διαβάζει πρωί και εσύ βράδυ.',
    breakdown: { skills: 70, courses: 85, schedule: 55, goal: 86 },
    suggestedCourse: 'Τεχνολογία Λογισμικού',
    suggestedMessage:
      'Γεια σου Νίκο! Ψάχνω κάποιον με Java για το project της Τεχνολογίας Λογισμικού. Εγώ ξέρω Python και SQL. Μπορούμε να βρούμε κοινές ώρες για να δουλέψουμε;',
    autoReply:
      'Γεια σου Δημήτρη! Ναι, μπορούμε να δουλεύουμε ασύγχρονα στο GitHub και να βρισκόμαστε απογεύματα. Μέσα!',
  },
]

// Requests that other students sent to the user.
export const incomingRequests = [
  {
    id: 101,
    name: 'Ελένη Μαρκοπούλου',
    vocative: 'Ελένη',
    initials: 'ΕΜ',
    avatarColor: 'bg-sky-500',
    department: 'Διοικητική Επιστήμη & Τεχνολογία',
    year: '3ο έτος',
    matchScore: 91,
    course: 'Τεχνολογία Λογισμικού',
    skills: ['React', 'TypeScript', 'Node.js'],
    timeAgo: 'πριν από 2 ώρες',
    message:
      'Γεια! Βγήκαμε 91% ταίριασμα. Χρειάζομαι κάποιον με Python για το backend στο project της Τεχνολογίας Λογισμικού. Ενδιαφέρεσαι;',
    autoReply:
      'Τέλεια! Χαίρομαι πολύ που δέχτηκες. Έφτιαξα ήδη ένα κοινό repo στο GitHub, πότε θες να κάνουμε ένα γρήγορο call;',
  },
  {
    id: 102,
    name: 'Γιάννης Σταθόπουλος',
    vocative: 'Γιάννη',
    initials: 'ΓΣ',
    avatarColor: 'bg-violet-500',
    department: 'Πληροφορική',
    year: '2ο έτος',
    matchScore: 82,
    course: 'Βάσεις Δεδομένων',
    skills: ['SQL', 'PostgreSQL', 'Java'],
    timeAgo: 'πριν από 5 ώρες',
    message:
      'Καλησπέρα! Ψάχνω ομάδα για την εργασία στις Βάσεις Δεδομένων. Έχω καλή εμπειρία σε SQL, μπορούμε να μοιράσουμε τα ερωτήματα.',
    autoReply:
      'Ωραία! Λέω να ξεκινήσουμε με το διάγραμμα ER αυτή την εβδομάδα. Σε βολεύει να βρεθούμε στη βιβλιοθήκη;',
  },
  {
    id: 103,
    name: 'Κατερίνα Λαμπρίδου',
    vocative: 'Κατερίνα',
    initials: 'ΚΛ',
    avatarColor: 'bg-teal-500',
    department: 'Στατιστική',
    year: '4ο έτος',
    matchScore: 79,
    course: 'Μηχανική Μάθηση',
    skills: ['R', 'Pandas', 'Στατιστική'],
    timeAgo: 'χθες',
    message:
      'Γεια σου! Θέλω συνεργάτη για το project της Μηχανικής Μάθησης. Εγώ αναλαμβάνω την ανάλυση των δεδομένων, εσύ τα μοντέλα;',
    autoReply:
      'Ευχαριστώ για την αποδοχή! Έχω ετοιμάσει τα γραφήματα της εξερευνητικής ανάλυσης, σου τα στέλνω αμέσως.',
  },
]

// Study preferences on the Profile tab. The ids in activePreferences start switched on.
export const studyPreferences = [
  { id: 'night-owl', label: 'Νυχτερινό διάβασμα' },
  { id: 'early-bird', label: 'Πρωινό διάβασμα' },
  { id: 'weekend', label: 'Σαββατοκύριακα' },
  { id: 'online', label: 'Online συναντήσεις' },
  { id: 'library', label: 'Στη βιβλιοθήκη' },
]

export const activePreferences = ['night-owl', 'online']

// Options for interactive editing in the Profile tab.
export const studyTimeOptions = ['Πρωινά', 'Απογεύματα', 'Βράδια', 'Σαββατοκύριακα']
export const gradeGoalOptions = ['7+', '8+', '8.5+', '9+']
export const extraSkillsPool = ['UI Design', 'React', 'Στατιστική', 'Java', 'TypeScript', 'Docker', 'Figma', 'R', 'C++']
export const extraCoursesPool = [
  'Τεχνολογία Λογισμικού',
  'Μηχανική Μάθηση',
  'Βάσεις Δεδομένων',
  'Αλληλεπίδραση Ανθρώπου-Υπολογιστή',
  'Αναλυτική Διαδικτύου',
  'Τεχνητή Νοημοσύνη',
]
