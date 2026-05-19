import { PrismaClient, Category, Urgency } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting to seed dummy posts...');

  // 1. Fetch all users to assign as authors
  const users = await prisma.user.findMany();
  if (users.length === 0) {
    throw new Error('No users found in the database. Please run the user seed script first.');
  }

  // 2. Define the 15 dummy posts
  const dummyPosts = [
    { title: 'Google STEP 2026 Opening', category: Category.RECRUITMENT_PIPELINE, branchTag: 'CSE', urgency: Urgency.CRITICAL, description: 'Applications for Google STEP 2026 open next week. Have your resume ready and updated. Referrals might not work for this specific program.' },
    { title: 'OS Lab Viva Questions', category: Category.FACULTY_PREFERENCE, branchTag: 'IT', urgency: Urgency.MEDIUM, description: 'Dr. Sharma usually asks about deadlocks, paging algorithms, and practical implementations of semaphores. Be prepared for trick questions on virtual memory.' },
    { title: 'Reliance Foundation Deadline', category: Category.SCHOLARSHIP_DEADLINE, branchTag: 'ALL', urgency: Urgency.CRITICAL, description: 'The deadline has been extended by 3 days. Make sure to upload your income certificates clearly. The portal might crash on the last day.' },
    { title: 'New Grading Policy 3rd Yr', category: Category.ACADEMIC_NORM, branchTag: 'ECE', urgency: Urgency.MEDIUM, description: 'Midterms will now carry 30% weightage instead of 25%. Internal assessment is reduced to 20%. Plan your studies accordingly.' },
    { title: 'Microsoft Engage Referrals', category: Category.RECRUITMENT_PIPELINE, branchTag: 'CSE', urgency: Urgency.CRITICAL, description: 'Alumni from the 2023 batch are offering referrals. Fill out the Google form shared in the unofficial groups by tomorrow evening.' },
    { title: 'Dr. Gupta\'s Project Topics', category: Category.FACULTY_PREFERENCE, branchTag: 'CSE', urgency: Urgency.LOW, description: 'If you want Dr. Gupta as your mentor, pitch projects related to Machine Learning, Computer Vision, or NLP. He usually rejects web-dev only projects.' },
    { title: 'NSP Scholarship Portal Open', category: Category.SCHOLARSHIP_DEADLINE, branchTag: 'ALL', urgency: Urgency.CRITICAL, description: 'The National Scholarship Portal is now open for fresh and renewal applications. Get your bonafide certificates signed ASAP.' },
    { title: 'Minor Project Guidelines', category: Category.ACADEMIC_NORM, branchTag: 'IT', urgency: Urgency.MEDIUM, description: 'Reports must follow the IEEE format exactly. The font size for headings should be 14pt, and 12pt for text. Plagiarism check is mandatory.' },
    { title: 'Amazon WOW Registration', category: Category.RECRUITMENT_PIPELINE, branchTag: 'CSE', urgency: Urgency.CRITICAL, description: 'Exclusive hiring drive for women in tech. Registration is open until Friday. Expected topics: Trees, Graphs, and DP.' },
    { title: 'DSA Expected Theory Qs', category: Category.ACADEMIC_NORM, branchTag: 'ECE', urgency: Urgency.MEDIUM, description: 'For the upcoming end-sems, focus heavily on graph traversal algorithms (BFS/DFS) and dynamic programming concepts.' },
    { title: 'TCS Ninja Off-Campus', category: Category.RECRUITMENT_PIPELINE, branchTag: 'ALL', urgency: Urgency.MEDIUM, description: 'Registration links are out for the TCS Ninja off-campus drive next month. It is open to all branches with >60% aggregate.' },
    { title: 'How to get LOR from HOD', category: Category.ACADEMIC_NORM, branchTag: 'ALL', urgency: Urgency.LOW, description: 'You need a minimum of 8.5 CGPA and a drafted letter before approaching the HOD for a Letter of Recommendation. Don\'t go empty-handed.' },
    { title: 'PMSS Document Verification', category: Category.SCHOLARSHIP_DEADLINE, branchTag: 'ALL', urgency: Urgency.CRITICAL, description: 'Physical verification of documents for PMSS is scheduled for next Monday at the admin block. Bring originals and 2 photocopies.' },
    { title: 'Dr. Singh\'s Attendance Rule', category: Category.FACULTY_PREFERENCE, branchTag: 'ECE', urgency: Urgency.LOW, description: 'Dr. Singh is very strict about the 75% rule. He generally does not accept medical certificates at the end of the semester.' },
    { title: 'Accenture Drive Confirmed', category: Category.RECRUITMENT_PIPELINE, branchTag: 'IT', urgency: Urgency.CRITICAL, description: 'On-campus drive confirmed for next Friday. Prepare for the cognitive and technical assessments.' },
  ];

  let createdCount = 0;

  for (const postData of dummyPosts) {
    // Randomly select an author
    const randomUser = users[Math.floor(Math.random() * users.length)];

    await prisma.intelPost.create({
      data: {
        title: postData.title,
        description: postData.description,
        category: postData.category,
        branchTag: postData.branchTag,
        urgency: postData.urgency,
        collegeId: 'USICT', // Hardcoded as requested
        authorId: randomUser.id,
      },
    });
    createdCount++;
    console.log(`Created post: "${postData.title}" (Author: ${randomUser.name})`);
  }

  console.log(`Successfully seeded ${createdCount} dummy posts!`);
}

main()
  .catch((e) => {
    console.error('Error seeding data:', e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
