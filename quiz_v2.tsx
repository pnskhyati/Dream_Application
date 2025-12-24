
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import React, { useState } from 'react';
import { Type } from "@google/genai";
import { ai } from './common';

/* ===========================
   Question Banks
   =========================== */

/**
 * Aptitude Test (100 items)
 * Logical reasoning, arithmetic, analogies, series, syllogisms, data interpretation.
 * Note: Ensure each entry has exactly 4 options.
 */
const aptitudeBank100 = [
  { question: "Find the next number: 3, 8, 15, 24, 35, ...", options: ["48", "49", "50", "52"] },
  { question: "Which is the odd one out?", options: ["Triangle", "Square", "Pentagon", "Sphere"] },
  { question: "If A=1, B=2, ... Z=26, then CAT equals:", options: ["27", "24", "46", "43"] },
  { question: "A train 200m long crosses a pole in 10s. Speed is:", options: ["54 km/h", "60 km/h", "72 km/h", "36 km/h"] },
  { question: "Doctor : Hospital :: Chef : ?", options: ["Kitchen", "Restaurant", "Menu", "Recipe"] },
  { question: "Sequence: 2, 6, 12, 20, 30, ...", options: ["40", "42", "44", "46"] },
  { question: "All roses are flowers. Some flowers fade quickly. Therefore some roses may fade quickly.", options: ["True", "False", "Cannot say", "Always true"] },
  { question: "15% of 240 =", options: ["24", "30", "32", "36"] },
  { question: "Which option best completes the pattern?", options: ["A", "B", "C", "D"] },
  { question: "A can finish in 12 days, B in 8 days. Together they need:", options: ["4.8 days", "5 days", "6 days", "20 days"] },
  { question: "Simplify: (48 ÷ 6) × (5 + 1) =", options: ["48", "36", "60", "54"] },
  { question: "Odd one out:", options: ["Paris", "London", "Rome", "July"] },
  { question: "Number series: 1, 4, 9, 16, 25, ...", options: ["30", "32", "36", "49"] },
  { question: "If some A are B, and all B are C, then:", options: ["Some A are C", "All A are C", "No A are C", "Cannot say"] },
  { question: "Ratio: If A:B = 2:3 and B:C = 4:5, then A:C =", options: ["8:15", "2:5", "3:5", "4:9"] },
  { question: "Time-Speed: If 60 km in 1.5 h, speed is:", options: ["30 km/h", "40 km/h", "45 km/h", "50 km/h"] },
  { question: "Work: If A is twice as fast as B. Together finish in 12 days. A alone in:", options: ["18", "24", "20", "16"] },
  { question: "Calendar: If Jan 1 is Friday, Jan 8 is:", options: ["Friday", "Saturday", "Sunday", "Thursday"] },
  { question: "Direction: Turn right, right, left from North. Final direction:", options: ["East", "West", "South", "North"] },
  { question: "Permutation: Number of ways to arrange ABCD =", options: ["12", "24", "6", "8"] },
  // 20
  { question: "Combination: Choose 2 from 5 distinct items:", options: ["10", "20", "5", "8"] },
  { question: "Probability: Fair die, P(even) =", options: ["1/2", "1/3", "2/3", "1/6"] },
  { question: "Simplify: 3/4 of 2/3 =", options: ["1/2", "1/4", "2/3", "3/8"] },
  { question: "Series: 5, 10, 20, 40, ...", options: ["60", "70", "80", "100"] },
  { question: "Analogy: Finger : Hand :: Leaf : ?", options: ["Tree", "Branch", "Root", "Flower"] },
  { question: "LCM of 8 and 12 =", options: ["12", "16", "24", "48"] },
  { question: "HCF of 18 and 24 =", options: ["3", "6", "12", "9"] },
  { question: "Simple interest on 1000 at 10% for 2 years:", options: ["100", "150", "200", "250"] },
  { question: "Train problem: Relative speed addition applies for:", options: ["Same direction", "Opposite direction", "Stationary", "Perpendicular"] },
  { question: "Odd one out:", options: ["Copper", "Iron", "Plastic", "Aluminum"] },
  // 30
  { question: "Coding: If CAT → DBU, then MAT →", options: ["NBU", "NAT", "NBT", "LBU"] },
  { question: "Blood relation: Father's sister is:", options: ["Aunt", "Niece", "Cousin", "Grandmother"] },
  { question: "Venn: Animals, Mammals, Dogs. Dogs subset of:", options: ["Mammals", "Animals", "Both", "Neither"] },
  { question: "Series: 11, 13, 17, 19, ...", options: ["21", "23", "25", "27"] },
  { question: "Statement: No cats are dogs. Some dogs are pets. Then:", options: ["Some pets are cats", "No pets are cats", "Cannot say", "All pets are cats"] },
  { question: "Average of 4, 8, 10, 12 =", options: ["8", "9", "10", "11"] },
  { question: "Mixture: 2L water added to 8L juice; water % =", options: ["20%", "25%", "30%", "40%"] },
  { question: "Clock: Angle at 3:00 between hands:", options: ["0°", "90°", "180°", "270°"] },
  { question: "Counting: How many 90° angles in a rectangle:", options: ["1", "2", "3", "4"] },
  { question: "Cube faces count:", options: ["4", "5", "6", "8"] },
  // 40
  { question: "If 7x = 63 then x =", options: ["7", "8", "9", "6"] },
  { question: "Simplify: 2^3 × 2^4 =", options: ["2^7", "2^12", "2^1", "16"] },
  { question: "Sequence: 1, 1, 2, 3, 5, 8, ...", options: ["8", "13", "21", "34"] },
  { question: "Percentage change: 80 → 100 is:", options: ["20%", "25%", "30%", "40%"] },
  { question: "Distance=Speed×Time. If D fixed, speed up implies time:", options: ["Up", "Down", "Same", "None"] },
  { question: "Area of rectangle 5×6:", options: ["11", "25", "30", "60"] },
  { question: "Median of [1,2,9,10,11]:", options: ["2", "9", "10", "11"] },
  { question: "Mode of [2,3,3,4]:", options: ["2", "3", "4", "None"] },
  { question: "Mean of [2,3,3,4]:", options: ["2.5", "3", "3.5", "4"] },
  { question: "If 20% of x is 30, x =", options: ["100", "120", "130", "150"] },
  // 50
  { question: "Speed units: 36 km/h equals m/s:", options: ["10", "9", "8", "12"] },
  { question: "Work: If 3 workers = 6 days, 6 workers need:", options: ["2", "3", "4", "5"] },
  { question: "Series: 4, 7, 12, 19, 28, ...", options: ["37", "38", "39", "40"] },
  { question: "Odd one out:", options: ["Mercury", "Venus", "Mars", "Sirius"] },
  { question: "Analogy: Book : Reading :: Knife : ?", options: ["Cutting", "Eating", "Cooking", "Writing"] },
  { question: "Syllogism: All squares are rectangles. Some rectangles are red. Then:", options: ["Some squares may be red", "All squares are red", "No square is red", "Cannot say"] },
  { question: "Profit: CP=80, SP=100. Profit % =", options: ["20%", "25%", "30%", "40%"] },
  { question: "Discount: Marked 200, 10% discount. Price =", options: ["160", "170", "180", "190"] },
  { question: "Angles in triangle sum to:", options: ["90°", "120°", "180°", "360°"] },
  { question: "If x=5, value of x^2+2x+1:", options: ["25", "36", "49", "16"] },
  // 60
  { question: "If 3x-4=11 then x =", options: ["5", "6", "7", "8"] },
  { question: "Prime test: 29 is:", options: ["Prime", "Composite", "Neither", "Even"] },
  { question: "LCM(6,9) =", options: ["9", "12", "18", "27"] },
  { question: "HCF(14,21) =", options: ["3", "7", "14", "21"] },
  { question: "Sequence: 10, 13, 18, 25, 34, ...", options: ["43", "44", "45", "46"] },
  { question: "Mean of first five natural numbers:", options: ["3", "3.5", "2.5", "4"] },
  { question: "Probability: coin toss P(heads) =", options: ["1", "1/2", "1/3", "1/4"] },
  { question: "Odd one out:", options: ["Hydrogen", "Oxygen", "Nitrogen", "Water"] },
  { question: "Which is larger?", options: ["0.5", "1/3", "0.25", "0.2"] },
  { question: "Square of 15:", options: ["215", "220", "225", "230"] },
  // 70
  { question: "Cube of 3:", options: ["9", "18", "27", "36"] },
  { question: "Sequence: 2, 3, 5, 7, 11, ...", options: ["12", "13", "14", "15"] },
  { question: "Angles: Complementary sum:", options: ["45°", "60°", "90°", "180°"] },
  { question: "Angles: Supplementary sum:", options: ["90°", "120°", "180°", "270°"] },
  { question: "If 25% of y is 10, y =", options: ["20", "30", "40", "50"] },
  { question: "If perimeter of square is 40, side =", options: ["4", "8", "10", "12"] },
  { question: "Area of circle with r=7 (use 22/7):", options: ["77", "132", "154", "308"] },
  { question: "Time zone: If IST is UTC+5:30, UTC noon is IST:", options: ["5:30 pm", "5:30 am", "11:30 am", "12:30 pm"] },
  { question: "Series: 1, 2, 4, 8, 16, ...", options: ["20", "24", "30", "32"] },
  { question: "Odd one out:", options: ["Dog", "Cat", "Cow", "Sparrow"] },
  // 80
  { question: "Analogy: Ear : Hear :: Eye :", options: ["See", "Watch", "Look", "View"] },
  { question: "If x:y=3:5 and y=20, x =", options: ["10", "12", "15", "18"] },
  { question: "If SP=120 and profit 20%, CP =", options: ["80", "90", "95", "100"] },
  { question: "Speed: 90 km in 2 h, speed =", options: ["40", "45", "50", "60"] },
  { question: "Mixture: 3 parts A to 2 parts B. % of A =", options: ["40%", "50%", "60%", "70%"] },
  { question: "Syllogism: No pens are pencils. All pencils are tools. Then:", options: ["No pens are tools", "Some tools are pens", "No conclusion", "All tools are pens"] },
  { question: "Series: 6, 11, 18, 27, ...", options: ["36", "37", "38", "39"] },
  { question: "Average of 12 and 18:", options: ["12", "14", "15", "16"] },
  { question: "If 2x+3=11 then x =", options: ["3", "4", "5", "6"] },
  { question: "Which fraction is largest?", options: ["1/2", "2/3", "3/5", "4/9"] },
  // 90
  { question: "Square root of 81:", options: ["7", "8", "9", "10"] },
  { question: "90% of 200 =", options: ["160", "170", "180", "190"] },
  { question: "Opposite of 'ascend':", options: ["Rise", "Grow", "Climb", "Descend"] },
  { question: "Synonym of 'rapid':", options: ["Fast", "Slow", "Calm", "Weak"] },
  { question: "Antonym of 'transparent':", options: ["Clear", "Opaque", "Lucid", "Crystal"] },
  { question: "Series: 9, 7, 8, 6, 7, 5, ...", options: ["4", "5", "6", "7"] },
  { question: "Work: If 4 men do it in 12 days, 6 men need:", options: ["6", "7", "8", "9"] },
  { question: "If 0.2 × x = 10, x =", options: ["20", "30", "40", "50"] },
  { question: "If perimeter of rectangle 2(l+w)=30 and l=10, w =", options: ["3", "4", "5", "6"] },
  { question: "Which is a prime?", options: ["21", "27", "31", "33"] },
  // 100
];

/**
 * Personality Test (100 items)
 * Likert-style. 4-point scale to avoid central tendency.
 */
const personalityBank100 = [
  { question: "I feel energized after social gatherings.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer planning before acting.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy abstract, theoretical discussions.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Deadlines motivate me to perform better.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I make decisions primarily using logic over feelings.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I adapt quickly when plans change unexpectedly.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I notice small details others often miss.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I am comfortable taking the lead in groups.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer hands-on tasks to reading manuals first.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I reflect deeply before sharing my opinion.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I value harmony over winning arguments.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy solving puzzles and logic problems.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "New ideas excite me more than routines.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer a clear, predictable daily structure.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I stay calm under pressure.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I like brainstorming without constraints first.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Helping others motivates my work.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I question assumptions before accepting them.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer working alone to working in large teams.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Feedback helps me improve quickly.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 20
  { question: "I like to document my work meticulously.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Ambiguity is exciting rather than stressful.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer facts and data over stories and metaphors.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Networking feels natural to me.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I generate many ideas rapidly.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I follow checklists to ensure quality.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I’m comfortable with constructive conflict to reach truth.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Beauty and aesthetics matter in my work.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I learn fastest by doing, not by reading.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I set personal performance metrics for myself.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 30
  { question: "I can easily explain complex ideas simply.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I need quiet time to recharge.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer objective truth over consensus.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I naturally organize people and tasks.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I am drawn to future possibilities more than present constraints.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Precision and accuracy are central to my work.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer direct, blunt feedback.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy mentoring others.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Visualizing systems helps me understand them.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I like to experiment before committing to a plan.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 40
  { question: "I track progress with dashboards or lists.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Empathy guides many of my decisions.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy competitive environments.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I value tradition and proven methods.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I challenge rules when they hinder outcomes.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Patterns in data stand out to me quickly.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer clear ownership over shared accountability.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Ambitious goals energize me.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I map long-term plans before execution.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Storytelling is a strength for me.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 50
  { question: "I prefer measurable outcomes over open-ended exploration.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I derive energy from helping groups collaborate.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Rapid prototyping suits my style.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I’m comfortable saying no to protect priorities.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Ethics are a key lens in my choices.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy negotiating to find win-win outcomes.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Quantitative evidence convinces me most.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I like to fine-tune systems for efficiency.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I’m drawn to novel, untested ideas.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer clear rules and SOPs at work.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 60
  { question: "I can set aside personal feelings to decide fairly.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I like to keep options open until the last responsible moment.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I value recognition for excellent work.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I’m energized by teaching or knowledge sharing.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer concrete facts to speculation.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy creative expression in my projects.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I work best with autonomy and trust.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I tend to be cautious about risks.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I thrive in fast-paced environments.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I like decoding complex systems step by step.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 70
  { question: "I maintain tidy, organized workspaces.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Ambitious visions inspire me to act.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I’m comfortable with public speaking.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer step-by-step instructions over open briefs.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I’m curious about how things work internally.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I look for evidence before changing my mind.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy visual design and aesthetics.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Clear KPIs make me more effective.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer to collaborate than compete.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I readily take initiative without being asked.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 80
  { question: "I often connect ideas across different fields.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I keep learning notes, journals, or bookmarks.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I value speed over perfection when needed.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I defer to experts when decisions are high-stakes.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I find it easy to empathize with different viewpoints.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I enjoy mapping processes and workflows.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prefer producing tangible outcomes daily.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Creative ambiguity feels productive to me.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Deep focus sessions are essential for my work.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I often volunteer for responsibility in teams.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 90
  { question: "I analyze trade-offs before deciding.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Aesthetic polish improves perceived value.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I’m comfortable changing direction with new data.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I keep long-term commitments reliably.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I separate people from problems in conflict.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I rely on structured frameworks to think.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Humor helps me navigate stress.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I value independent, uninterrupted work time.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "Curiosity drives my learning choices.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  { question: "I prioritize impact over effort.", options: ["Strongly agree", "Agree", "Disagree", "Strongly disagree"] },
  // 100
];

/**
 * General Personalized Quiz (50 items)
 */
const generalBank = [
  { question: "When starting a new project, what's your first move?", options: ["Jump right in", "Plan and schedule", "Brainstorm with team", "Research first"] },
  { question: "Which work environment suits you best?", options: ["Dynamic startup", "Organized corporate", "Creative studio", "Quiet research lab"] },
  { question: "Preferred problem-solving approach?", options: ["Trial and error", "Break into steps", "Discuss perspectives", "Analyze data fully"] },
  { question: "Free afternoon choice?", options: ["Build/code", "Organize plans", "Visit gallery/write", "Read/watch documentary"] },
  { question: "Natural group role?", options: ["Driver", "Organizer", "Idea generator", "Analyst"] },
  { question: "Task you enjoy most?", options: ["Fix/make things", "Manage timeline", "Design/brainstorm", "Experiment/analyze"] },
  { question: "View on rules?", options: ["Bend when needed", "Essential for order", "Limit creativity", "Base on evidence"] },
  { question: "Job priority?", options: ["Tangible results", "Clear expectations", "Creative freedom", "Learning opportunity"] },
  { question: "Reaction to setbacks?", options: ["Try new approach", "Analyze and prevent", "Find creative solution", "Gather more data"] },
  { question: "Favorite subject?", options: ["Shop/CS/labs", "Math/Econ", "Art/Music/Lit", "Physics/Chem/History"] },
  { question: "Most effective when you can:", options: ["See results", "Follow structure", "Inspire ideas", "Analyze deeply"] },
  { question: "Perfect day at work involves:", options: ["Building/creating", "Organizing efficiently", "Collaborating on innovation", "Solving complex puzzles"] },
  { question: "Preferred info format:", options: ["Case studies", "Charts/outlines", "Visual stories", "Detailed reports"] },
  { question: "Feedback you value most:", options: ["Functionality", "Process adherence", "Originality", "Accuracy/depth"] },
  { question: "Learning a new skill:", options: ["Learn by doing", "Structured course", "Explore connections", "Understand theory"] },
  { question: "Movie genre preference:", options: ["Action/Sci-Fi", "Drama/Historical", "Fantasy/Comedy", "Mystery/Documentary"] },
  { question: "Most satisfying moment:", options: ["Finish hard task", "Bring order", "Unique idea", "Understand concept"] },
  { question: "Ideal manager:", options: ["Sets goals, autonomy", "Clear instructions", "Encourages experiments", "Expert mentor"] },
  { question: "Drawn to careers that involve:", options: ["Technology/trades", "Management/finance", "Arts/design", "Science/data"] },
  { question: "Work ultimately should be:", options: ["Practical", "Reliable", "Innovative", "Insightful"] },
  { question: "Preferred collaboration style:", options: ["Short syncs", "Detailed plans", "Open ideation", "Async research"] },
  { question: "On deadlines you:", options: ["Sprint late", "Pace early", "Iterate creatively", "Sequence by data"] },
  { question: "Motivation driver:", options: ["Impact", "Recognition", "Expression", "Mastery"] },
  { question: "Typical meeting role:", options: ["Decision pusher", "Note taker", "Idea catalyst", "Data reviewer"] },
  { question: "Tooling preference:", options: ["Build scripts", "Templates/PM tools", "Design tools", "Notebooks/BI"] },
  { question: "How you learn fastest:", options: ["Practice", "Syllabus", "Examples", "Theory"] },
  { question: "Comfort with ambiguity:", options: ["High", "Medium", "Low", "Very low"] },
  { question: "Preferred impact scope:", options: ["Local tangible", "Team systems", "Audience inspiration", "Deep insights"] },
  { question: "Communication style:", options: ["Direct", "Structured", "Story-driven", "Evidence-based"] },
  { question: "Preferred deliverables:", options: ["Prototypes", "Plans/roadmaps", "Campaigns", "Analyses/reports"] },
  { question: "Energy pattern:", options: ["Short bursts", "Steady pace", "Creative waves", "Deep focus blocks"] },
  { question: "Context switching:", options: ["Comfortable", "Manageable", "Distracting", "Avoid if possible"] },
  { question: "Task selection:", options: ["Hardest first", "Quick wins", "Most creative", "Most analytical"] },
  { question: "Peer feedback bias:", options: ["Outcome", "Process", "Originality", "Rigor"] },
  { question: "Preferred research source:", options: ["Tutorials", "Docs", "Case studies", "Papers"] },
  { question: "Decision criterion:", options: ["Speed", "Predictability", "Novelty", "Accuracy"] },
  { question: "Team size preference:", options: ["Small", "Medium", "Large", "Solo"] },
  { question: "Conflict approach:", options: ["Direct", "Mediation", "Reframe creatively", "Root-cause analysis"] },
  { question: "Recognition preference:", options: ["Public", "Private", "Portfolio", "Citation"] },
  { question: "Remote vs onsite:", options: ["Remote", "Hybrid", "Onsite", "No preference"] },
  { question: "Career value priority:", options: ["Compensation", "Stability", "Impact", "Autonomy"] },
  { question: "Time management style:", options: ["Timebox", "Calendar-first", "Flexible blocks", "Task queues"] },
  { question: "Documentation habit:", options: ["Minimal", "Structured", "Visual", "Detailed"] },
  { question: "Skill development plan:", options: ["Projects", "Courses", "Mentorship", "Reading"] },
  { question: "Stress management:", options: ["Exercise", "Planning", "Creative outlet", "Reflection"] },
  { question: "Preferred planning horizon:", options: ["Weekly", "Monthly", "Quarterly", "Yearly+"] },
  { question: "Risk appetite:", options: ["High", "Moderate", "Selective", "Low"] },
  { question: "Preferred evaluation metric:", options: ["Output", "On-time", "Originality index", "Accuracy score"] },
  { question: "Inspiration source:", options: ["Builders", "Operators", "Artists", "Scientists"] },
  { question: "Problem framing:", options: ["Act first", "Structure first", "Reimagine first", "Model first"] },
];

/**
 * Academics-Based Quiz (50 items)
 */
const academicsBank = [
  { question: "Favorite subject group?", options: ["STEM", "Humanities", "Arts", "Business"] },
  { question: "Study preference:", options: ["Hands-on", "Reading", "Group discussion", "Lectures"] },
  { question: "Best assignment type:", options: ["Math/logic", "Research writing", "Presentation/art", "Lab/report"] },
  { question: "Focus while studying:", options: ["Theory", "Applications", "History/context", "Creative interpretation"] },
  { question: "Preferred extracurricular:", options: ["Robotics/coding", "Debate/newspaper", "Band/drama", "Science Olympiad/mathletes"] },
  { question: "Major project preference:", options: ["Solo technical", "Lead a team", "Creative collaboration", "Independent research"] },
  { question: "Academic strength:", options: ["Numbers/systems", "Writing/communication", "Artistic skill", "Curiosity/research"] },
  { question: "Important class aspect:", options: ["Practical skills", "Challenging theory", "Express ideas", "New knowledge"] },
  { question: "Book topic choice:", options: ["AI breakthroughs", "Leader biography", "Poetry collection", "Animal behavior study"] },
  { question: "Ideal job mirrors:", options: ["Math/Physics", "English/Art", "History/Biology", "Psychology/Sociology"] },
  { question: "Preferred lab role:", options: ["Experiment lead", "Documenter", "Visualizer", "Analyst"] },
  { question: "Exam prep style:", options: ["Practice problems", "Summaries", "Group Q&A", "Concept maps"] },
  { question: "Preferred evaluation:", options: ["Quant tests", "Essays", "Portfolios", "Oral vivas"] },
  { question: "Project timeframe comfort:", options: ["Short sprints", "Planned milestones", "Flexible timeline", "Long research"] },
  { question: "Software comfort:", options: ["Coding tools", "Office suite", "Design tools", "Scientific tools"] },
  { question: "Reading difficulty tolerance:", options: ["High density ok", "Moderate", "Prefer light", "Audio/video"] },
  { question: "Group dynamics:", options: ["Lead", "Organize", "Ideate", "Specialist"] },
  { question: "Note-taking style:", options: ["Equations/problems", "Outlines", "Sketches", "Detailed prose"] },
  { question: "Math comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Statistics comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Programming comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Writing comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Design comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Lab work comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Field work interest:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Research method preference:", options: ["Quantitative", "Mixed", "Qualitative", "Historical"] },
  { question: "Project type preference:", options: ["Capstone", "Case study", "Creative project", "Thesis"] },
  { question: "Presentation comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Peer review attitude:", options: ["Welcome it", "Neutral", "Selective", "Avoid"] },
  { question: "Library usage:", options: ["Often", "Sometimes", "Rarely", "Never"] },
  { question: "Preferred assessment weight:", options: ["Exams", "Assignments", "Projects", "Presentations"] },
  { question: "Time management style:", options: ["Early starter", "Balanced", "Last-minute", "Chunking"] },
  { question: "Interdisciplinary interest:", options: ["High", "Moderate", "Some", "Low"] },
  { question: "Seminar interest:", options: ["High", "Moderate", "Some", "Low"] },
  { question: "Internships interest:", options: ["High", "Moderate", "Some", "Low"] },
  { question: "Preferred mentor type:", options: ["Technical expert", "Organizer", "Creative coach", "Scholar"] },
  { question: "Career goal clarity:", options: ["Very clear", "Somewhat clear", "Exploring", "Unsure"] },
  { question: "Preferred institution type:", options: ["Public", "Private", "Research focused", "Teaching focused"] },
  { question: "Thesis vs coursework:", options: ["Thesis", "Mixed", "Coursework", "Undecided"] },
  { question: "Elective choice style:", options: ["Depth", "Breadth", "Balanced", "Guide-driven"] },
  { question: "Preferred reading material:", options: ["Textbooks", "Articles", "Blogs", "Papers"] },
  { question: "Note revision frequency:", options: ["Daily", "Weekly", "Before exams", "Rarely"] },
  { question: "Lab safety discipline:", options: ["Strict", "Moderate", "Basic", "Needs improvement"] },
  { question: "Group conflict handling:", options: ["Direct", "Facilitated", "Creative reframing", "Evidence-driven"] },
  { question: "Visualization tools:", options: ["Charts", "Diagrams", "Slides", "Reports"] },
  { question: "Data handling comfort:", options: ["High", "Good", "Basic", "Minimal"] },
  { question: "Field of advanced study:", options: ["Core STEM", "Social sciences", "Arts/design", "Management"] },
  { question: "Career-aligned projects:", options: ["Often", "Sometimes", "Rarely", "Never"] },
  { question: "Exam anxiety level:", options: ["Low", "Moderate", "High", "Very high"] },
  { question: "Peer collaboration value:", options: ["High", "Moderate", "Some", "Low"] },
];

/* ===========================
   Utilities
   =========================== */

/**
 * Fisher–Yates shuffle then sample K without replacement.
 */
function sampleQuestions(bank, k) {
  const arr = bank.slice();
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr.slice(0, k);
}

/* ===========================
   Component
   =========================== */

export const QuizPage = ({ navigateTo }) => {
  const [quizStage, setQuizStage] = useState('landing'); // 'landing', 'psychometricOptions', 'taking', 'loading', 'results'
  const [activeQuiz, setActiveQuiz] = useState(null); // { type, title }
  const [activeQuestions, setActiveQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [quizResults, setQuizResults] = useState(null);
  const [quizAnalysis, setQuizAnalysis] = useState(null);
  const [error, setError] = useState('');

  const resetQuizState = () => {
    setQuizStage('landing');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizResults(null);
    setQuizAnalysis(null);
    setError('');
    setActiveQuiz(null);
    setActiveQuestions([]);
  };

  const handleBack = () => {
    if (quizStage === 'landing') {
      navigateTo('dashboard');
    } else if (quizStage === 'psychometricOptions') {
      setQuizStage('landing');
    } else {
      resetQuizState();
    }
  };

  /**
   * Start a quiz with random 20 questions.
   */
  const startQuiz = (quizType) => {
    let bank;
    let quizTitle;

    switch (quizType) {
      case 'aptitude':
        bank = aptitudeBank100;
        quizTitle = 'Aptitude Test';
        break;
      case 'personality':
        bank = personalityBank100;
        quizTitle = 'Personality Test';
        break;
      case 'general':
        bank = generalBank;
        quizTitle = 'General Personalized Quiz';
        break;
      case 'academics':
        bank = academicsBank;
        quizTitle = 'Academics-Based Quiz';
        break;
      default:
        bank = generalBank;
        quizTitle = 'General Personalized Quiz';
        break;
    }

    const selected = sampleQuestions(bank, 20);

    setActiveQuiz({ type: quizType, title: quizTitle });
    setActiveQuestions(selected);
    setQuizStage('taking');
    setCurrentQuestionIndex(0);
    setAnswers([]);
    setQuizResults(null);
    setQuizAnalysis(null);
    setError('');
  };

  const handleAnswerSelect = (answer) => {
    const q = activeQuestions[currentQuestionIndex];
    const newAnswers = [...answers, { question: q.question, answer }];
    setAnswers(newAnswers);

    if (currentQuestionIndex < activeQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      getCareerSuggestions(newAnswers);
    }
  };

  /**
   * Call Gemini API directly for recommendations AND analysis.
   */
  const getCareerSuggestions = async (finalAnswers) => {
    setQuizStage('loading');
    setError('');

    const prompt = `You are an expert career counselor. A user has taken a "${activeQuiz?.title}" to get career suggestions. 
    
    Analyze their answers to understand their strengths, personality, and preferences.
    First, provide a brief "analysis" summary of their profile (e.g., what drives them, their work style).
    Second, suggest 3 to 5 career paths ("recommendations") that would be a great fit.
    For each recommendation, provide a "matchScore" (0-100) indicating how strong the fit is based on the answers.

    Here are the user's answers:
    ${finalAnswers.map((item, index) => `Q: ${item.question}\nA: ${item.answer}`).join('\n\n')}
    `;

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                responseSchema: {
                    type: Type.OBJECT,
                    properties: {
                        analysis: { 
                            type: Type.STRING, 
                            description: "A concise analysis of the user's personality, strengths, and work style based on their answers. (2-3 sentences)" 
                        },
                        recommendations: {
                            type: Type.ARRAY,
                            items: {
                                type: Type.OBJECT,
                                properties: {
                                    careerName: { type: Type.STRING },
                                    reason: { type: Type.STRING, description: "Why this specific career fits the user." },
                                    matchScore: { type: Type.NUMBER, description: "Fit score from 0 to 100." }
                                }
                            }
                        }
                    },
                    required: ["analysis", "recommendations"]
                }
            }
        });

        const data = JSON.parse(response.text);
        
        if (data && Array.isArray(data.recommendations)) {
            setQuizResults(data.recommendations);
            setQuizAnalysis(data.analysis);
            setQuizStage('results');
        } else {
            throw new Error("Invalid response format from AI");
        }

    } catch (err) {
      console.error('Quiz analyze call failed', err);
      setError('Sorry, we could not generate your career suggestions. Please try the quiz again.');
      setQuizResults(null);
      setQuizAnalysis(null);
      setQuizStage('results');
    }
  };

  const progress = activeQuestions.length > 0 ? ((currentQuestionIndex + 1) / activeQuestions.length) * 100 : 0;

  return (
    <div className="quiz-page-container">
      <button onClick={handleBack} className="quiz-back-button" aria-label="Go back">← Back</button>

      {quizStage === 'landing' && (
        <div className="quiz-landing-view">
          <h1 className="quiz-landing-title">Choose a Quiz to Begin</h1>
          <div className="quiz-options-grid">
            <div className="quiz-option-card quiz-card-1" onClick={() => setQuizStage('psychometricOptions')}>
              <h3>Psychometric Test</h3>
              <p>Assess your core personality traits and cognitive abilities to find careers that match your natural strengths.</p>
            </div>
            <div className="quiz-option-card quiz-card-2" onClick={() => startQuiz('general')}>
              <h3>General Personalized Quiz</h3>
              <p>Answer tailored questions about your strengths and interests to get career suggestions uniquely aligned with who you are.</p>
            </div>
            <div className="quiz-option-card quiz-card-3" onClick={() => startQuiz('academics')}>
              <h3>Academics-Based Quiz</h3>
              <p>Get career recommendations based on your favorite subjects and learning style to see which paths fit your academic profile.</p>
            </div>
          </div>
        </div>
      )}

      {quizStage === 'psychometricOptions' && (
        <div className="quiz-landing-view">
          <h1 className="quiz-landing-title">Psychometric Tests</h1>
          <div className="quiz-sub-options-grid">
            <div className="quiz-option-card quiz-card-4" onClick={() => startQuiz('aptitude')}>
              <h3>Aptitude Test</h3>
              <p>Test your logical reasoning, problem-solving, and critical thinking skills with a series of challenging questions.</p>
            </div>
            <div className="quiz-option-card quiz-card-1" onClick={() => startQuiz('personality')}>
              <h3>Personality Test</h3>
              <p>Discover your personality type and match your traits to the most suitable career paths for you.</p>
            </div>
          </div>
        </div>
      )}

      {quizStage === 'taking' && (
        <div className="quiz-taking-view">
          <div className="quiz-progress-container">
            <p className="quiz-progress-text">Question {currentQuestionIndex + 1} of {activeQuestions.length}</p>
            <div className="quiz-progress-bar-background">
              <div className="quiz-progress-bar-foreground" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
          <p className="quiz-question-text">{activeQuestions[currentQuestionIndex].question}</p>
          <div className="quiz-answer-options">
            {activeQuestions[currentQuestionIndex].options.map((option, index) => (
              <button key={index} className="quiz-answer-btn" onClick={() => handleAnswerSelect(option)}>
                {option}
              </button>
            ))}
          </div>
        </div>
      )}

      {quizStage === 'loading' && <div className="loader"></div>}

      {quizStage === 'results' && (
        <div className="quiz-results-view">
          <h2 className="quiz-results-title">Your Career Profile</h2>
          
          {error && <div className="error-message">{error}</div>}

          {quizAnalysis && (
            <div className="analysis-summary-card" style={{
                background: 'white',
                padding: '2rem',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                marginBottom: '2rem',
                textAlign: 'left',
                borderLeft: '6px solid #6A5ACD',
                maxWidth: '900px',
                margin: '0 auto 2rem auto'
            }}>
                <h3 style={{marginTop: 0, color: '#1f2937', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.4rem'}}>
                    <span>📊</span> Analysis
                </h3>
                <p style={{fontSize: '1.1rem', lineHeight: '1.6', color: '#4b5563', margin: '1rem 0 0 0'}}>{quizAnalysis}</p>
            </div>
          )}

          <h3 className="quiz-results-subtitle" style={{marginBottom: '1.5rem', color: '#4b5563'}}>Recommended Careers</h3>

          {quizResults && (
            <div className="quiz-results-grid">
              {quizResults.map((result, index) => (
                <div key={index} className="quiz-result-card">
                  <div style={{display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom: '0.5rem'}}>
                      <h4 style={{margin:0}}>{result.careerName}</h4>
                      <span className="match-badge">{result.matchScore}% Match</span>
                  </div>
                  <div className="match-bar-container">
                      <div className="match-bar-fill" style={{width: `${result.matchScore}%`}}></div>
                  </div>
                  <p>{result.reason}</p>
                </div>
              ))}
            </div>
          )}
          <button onClick={() => startQuiz(activeQuiz?.type || 'general')} className="retake-quiz-btn">Take Quiz Again</button>
        </div>
      )}
    </div>
  );
};
