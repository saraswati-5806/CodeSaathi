const User = require("../models/User.model");
const XP = require("../models/XP.model");
const Notification = require("../models/Notification.model");

const awardXP = async ({ studentId, event, xpEarned, reference = "" }) => {
  const user = await User.findById(studentId);

  if (!user) {
    throw new Error("User not found");
  }

  await XP.create({
    student: studentId,
    event,
    xpEarned,
    reference,
  });

  user.xp.total += xpEarned;

  if (event === "code_submit") user.xp.codeXP += xpEarned;
  if (event === "quiz_pass") user.xp.quizXP += xpEarned;
  if (event === "vault_add") user.xp.studyXP += xpEarned;
  if (event === "ai_use") user.xp.aiXP += xpEarned;
  if (event === "study_workspace") user.xp.studyXP += xpEarned;

  const badgeNames = user.badges.map((badge) => badge.name);

  if (user.xp.total >= 50 && !badgeNames.includes("First XP")) {
    user.badges.push({ name: "First XP" });
  }

  if (user.xp.total >= 100 && !badgeNames.includes("Active Learner")) {
    user.badges.push({ name: "Active Learner" });
  }

  if (user.xp.codeXP >= 50 && !badgeNames.includes("Code Ninja")) {
    user.badges.push({ name: "Code Ninja" });
  }

  if (user.xp.quizXP >= 50 && !badgeNames.includes("Quiz Champion")) {
    user.badges.push({ name: "Quiz Champion" });
  }

  await user.save();

  await Notification.create({
    user: studentId,
    title: "XP Earned",
    message: `You earned ${xpEarned} XP for ${event}.`,
    type: "xp",
  });

  return user;
};

module.exports = {
  awardXP,
};