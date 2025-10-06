/**
 * Tarot Reading Service
 * Based on: https://github.com/zyaproxy-Jun/tarotcardapi
 * Author: Kushagra Srivastava
 * License: MIT
 * 
 * Integrated into MCP Server with Chinese translations and additional spreads
 */

export interface TarotCard {
  name: string;
  nameCN: string;  // Chinese name
  description: string;
  descriptionCN?: string;  // Chinese description
  image: string;
  reversed: boolean;
  keywords: string[];
}

// Complete 78 Tarot Cards Data
const tarotCardsData = [
  {
    name: "The Fool",
    nameCN: "愚者",
    description: "The card suggests that your investments have the potential to yield positive results. The Fool signifies new beginnings, taking risks, and embracing unconventional approaches. It encourages you to trust your instincts and explore new opportunities. However, it's important to exercise caution and avoid recklessness. The Fool card indicates that success may come through a sense of adventure and learning from both positive and negative outcomes.",
    image: "/tarotdeck/thefool.jpeg",
    keywords: ["new beginnings", "adventure", "innocence", "spontaneity"]
  },
  {
    name: "The Magician",
    nameCN: "魔术师",
    description: "The card suggests that your trades have the potential to yield successful results. The Magician represents power, skill, and manifestation of goals. It signifies that you have the necessary tools and abilities to make your investments profitable. This card encourages you to utilize your intellect, creativity, and resourcefulness to your advantage.",
    image: "/tarotdeck/themagician.jpeg",
    keywords: ["manifestation", "power", "skill", "action"]
  },
  {
    name: "The High Priestess",
    nameCN: "女祭司",
    description: "Trust your instincts, tap into hidden knowledge, and explore alternative perspectives to make informed decisions. The card suggests that unseen factors may influence your investments, and embracing your intuition can lead to profitable outcomes.",
    image: "/tarotdeck/thehighpriestess.jpeg",
    keywords: ["intuition", "mystery", "subconscious", "wisdom"]
  },
  {
    name: "The Empress",
    nameCN: "皇后",
    description: "The Empress represents growth, nurturing, and prosperity. This card suggests that your investments may bring about positive outcomes and financial abundance. Trust your instincts and tap into your creativity when making decisions. By finding a harmonious balance between intuition and practicality, you can create favorable conditions for your investments to flourish.",
    image: "/tarotdeck/theempress.jpeg",
    keywords: ["abundance", "nurturing", "fertility", "creativity"]
  },
  {
    name: "The Emperor",
    nameCN: "皇帝",
    description: "The Emperor represents authority, structure, and stability. It symbolizes a time of taking control and establishing a solid foundation. This card encourages you to exercise leadership and make well-informed decisions based on careful analysis and strategic planning.",
    image: "/tarotdeck/theemperor.jpeg",
    keywords: ["authority", "structure", "control", "leadership"]
  },
  {
    name: "The Hierophant",
    nameCN: "教皇",
    description: "The Hierophant represents conformity, tradition, and established systems. This card suggests that your investments may benefit from following established guidelines and adopting a conservative approach. Seek guidance from experienced individuals or experts in the market.",
    image: "/tarotdeck/thehierophant.jpeg",
    keywords: ["tradition", "conformity", "belief", "education"]
  },
  {
    name: "The Lovers",
    nameCN: "恋人",
    description: "The Lovers represent partnership, alignment, and choices based on personal values. This card suggests that your investments may thrive when you make decisions that resonate with your beliefs and values. Collaboration and finding common ground with others may contribute to favorable outcomes.",
    image: "/tarotdeck/TheLovers.jpg",
    keywords: ["love", "harmony", "choices", "relationships"]
  },
  {
    name: "The Chariot",
    nameCN: "战车",
    description: "The Chariot represents determination, willpower, and assertiveness. It suggests that through focused and disciplined efforts, you can overcome challenges and obstacles. By setting clear goals, devising strategic plans, and executing them confidently, you increase your chances of achieving triumphant outcomes.",
    image: "/tarotdeck/thechariot.jpeg",
    keywords: ["victory", "determination", "willpower", "control"]
  },
  {
    name: "Strength",
    nameCN: "力量",
    description: "The Strength card represents courage, inner power, and the ability to overcome challenges. It suggests that by harnessing your inner strength and staying focused, you can navigate with confidence and determination. Trust your abilities, remain calm in turbulent times, and persistently pursue your goals.",
    image: "/tarotdeck/thestrength.jpeg",
    keywords: ["courage", "patience", "compassion", "strength"]
  },
  {
    name: "The Hermit",
    nameCN: "隐者",
    description: "The Hermit represents wisdom, self-reflection, and seeking inner guidance. This card suggests that your investments may benefit from taking a step back, reflecting on your strategies, and seeking a deeper understanding. The Hermit encourages you to seek solitude to refine your strategies and make well-informed choices.",
    image: "/tarotdeck/thehermit.jpeg",
    keywords: ["introspection", "wisdom", "solitude", "guidance"]
  },
  {
    name: "Wheel of Fortune",
    nameCN: "命运之轮",
    description: "The Wheel of Fortune represents cycles and changes in life. This card advises you to embrace both opportunities and challenges that come your way, as luck and circumstances play a role in outcomes. Stay adaptable and open to new possibilities.",
    image: "/tarotdeck/wheeloffortune.jpeg",
    keywords: ["fate", "cycles", "change", "destiny"]
  },
  {
    name: "Justice",
    nameCN: "正义",
    description: "The Justice card represents fairness, truth, and accountability. It suggests that outcomes will be influenced by the principle of cause and effect. Make decisions based on careful analysis and objective reasoning, while considering ethical and legal aspects.",
    image: "/tarotdeck/justice.jpeg",
    keywords: ["justice", "fairness", "truth", "accountability"]
  },
  {
    name: "The Hanged Man",
    nameCN: "倒吊人",
    description: "The Hanged Man represents a time of pause and surrender, encouraging you to let go of old strategies or beliefs that may no longer serve you. By embracing this period of suspension and adopting an open mind, you can gain valuable insights and potentially achieve successful outcomes.",
    image: "/tarotdeck/thehangedman.jpeg",
    keywords: ["surrender", "letting go", "perspective", "sacrifice"]
  },
  {
    name: "Death",
    nameCN: "死神",
    description: "The Death card represents significant change and letting go of the old. It advises releasing attachments to outdated strategies that no longer serve you. Embracing change and being adaptable can lead to positive outcomes in the long run. The card suggests the potential for rebirth and renewal.",
    image: "/tarotdeck/death.jpeg",
    keywords: ["transformation", "endings", "rebirth", "change"]
  },
  {
    name: "Temperance",
    nameCN: "节制",
    description: "The Temperance card represents finding the middle path and blending different elements together. It advises seeking a balanced approach, practicing moderation, and adapting to conditions. By finding equilibrium between risk and caution, intuition and analysis, you increase the likelihood of positive outcomes.",
    image: "/tarotdeck/temperance.jpeg",
    keywords: ["balance", "moderation", "patience", "harmony"]
  },
  {
    name: "The Devil",
    nameCN: "恶魔",
    description: "The Devil represents temptation, materialism, and being bound by unhealthy patterns or dependencies. This card warns against making choices based solely on immediate gratification or following the herd mentality. By recognizing and releasing unhealthy attachments, you can avoid negative consequences.",
    image: "/tarotdeck/thedevil.jpeg",
    keywords: ["bondage", "temptation", "materialism", "addiction"]
  },
  {
    name: "The Tower",
    nameCN: "塔",
    description: "The Tower represents sudden change, upheaval, and the breaking down of existing structures. It signifies a period of turmoil and transformation. While the Tower represents a challenging period, it also presents an opportunity for growth and rebuilding.",
    image: "/tarotdeck/thetower.jpeg",
    keywords: ["upheaval", "chaos", "revelation", "awakening"]
  },
  {
    name: "The Star",
    nameCN: "星星",
    description: "The Star represents a guiding light, offering a sense of optimism and renewal. It signifies that your investments have the potential to bring about positive changes and fulfill your aspirations. Stay focused on your goals and have faith in your abilities.",
    image: "/tarotdeck/thestar.jpeg",
    keywords: ["hope", "inspiration", "serenity", "renewal"]
  },
  {
    name: "The Moon",
    nameCN: "月亮",
    description: "The Moon represents the realm of the unknown, illusions, and hidden influences. It suggests that you may be subject to fluctuations and uncertainties. Trust your instincts and tap into your intuition when making decisions. Be cautious of deceptive or misleading information.",
    image: "/tarotdeck/themoon.jpeg",
    keywords: ["illusion", "intuition", "uncertainty", "subconscious"]
  },
  {
    name: "The Sun",
    nameCN: "太阳",
    description: "The Sun represents joy, vitality, and favorable outcomes. It signifies a period of growth and flourishing. This card advises you to have confidence in your abilities and embrace a positive mindset. The Sun suggests bringing you happiness and financial rewards.",
    image: "/tarotdeck/thesun.jpeg",
    keywords: ["success", "vitality", "joy", "positivity"]
  },
  {
    name: "Judgement",
    nameCN: "审判",
    description: "Judgement represents a call to reflect on your past choices and actions, and to make decisions based on a higher level of awareness. It signifies that you may undergo a period of scrutiny, where past decisions and their consequences will be brought to light. This is an opportunity to assess your strategies and make adjustments for a fresh start.",
    image: "/tarotdeck/judgement.jpeg",
    keywords: ["judgement", "rebirth", "inner calling", "absolution"]
  },
  {
    name: "The World",
    nameCN: "世界",
    description: "The World represents completion, achievement, and wholeness. It signifies that you have come full circle in your journey, and you are on the verge of experiencing positive outcomes and rewards. It represents a culmination of your efforts and suggests that you have the potential to make a significant impact.",
    image: "/tarotdeck/theworld.jpeg",
    keywords: ["completion", "accomplishment", "integration", "fulfillment"]
  },
  // Cups
  { name: "Ace of Cups", nameCN: "圣杯王牌", description: "The Ace of Cups represents the potential for new beginnings, abundance, and positive energy. It advises you to approach with an open heart, allowing your intuition and emotions to guide you. The Ace of Cups signifies the potential for joy, fulfillment, and financial rewards.", image: "/tarotdeck/aceofcups.jpeg", keywords: ["new emotions", "love", "intuition", "spiritual opening"] },
  { name: "Two of Cups", nameCN: "圣杯二", description: "The Two of Cups represents partnerships, connections, and mutual benefits. It suggests that collaborating with others and seeking shared goals can enhance your chances of success. By fostering open communication, trust, and emotional connections, you can create harmony and balance.", image: "/tarotdeck/twoofcups.jpeg", keywords: ["partnership", "union", "connection", "romance"] },
  { name: "Three of Cups", nameCN: "圣杯三", description: "The Three of Cups represents celebration, friendship, and abundance. It indicates that you have the potential to bring about a sense of harmony, shared success, and fulfillment. The card advises you to cultivate connections and collaborate with others.", image: "/tarotdeck/threeofcups.jpeg", keywords: ["celebration", "friendship", "community", "joy"] },
  { name: "Four of Cups", nameCN: "圣杯四", description: "The Four of Cups represents a period of reflection, where you may find yourself feeling dissatisfied or uninterested with current opportunities. It indicates a need to reassess your priorities and consider whether there are better options available.", image: "/tarotdeck/fourofcups.jpeg", keywords: ["apathy", "contemplation", "reevaluation", "meditation"] },
  { name: "Five of Cups", nameCN: "圣杯五", description: "The Five of Cups represents a period of emotional upheaval and focusing on past failures or missed opportunities. While there may be disappointment, it encourages you to acknowledge and process those emotions, but not dwell on them.", image: "/tarotdeck/fiveofcups.jpeg", keywords: ["loss", "grief", "disappointment", "regret"] },
  { name: "Six of Cups", nameCN: "圣杯六", description: "The Six of Cups suggests that you could be influenced by past experiences, memories, or connections. It could indicate a potential for revisiting familiar strategies or seeking opportunities rooted in the past.", image: "/tarotdeck/sixofcups.jpeg", keywords: ["nostalgia", "memories", "innocence", "reunion"] },
  { name: "Seven of Cups", nameCN: "圣杯七", description: "The Seven of Cups represents a multitude of options and possibilities, but it also warns of the need for clarity and discernment. It suggests being cautious and avoiding getting lost in unrealistic or deceptive opportunities.", image: "/tarotdeck/sevenofcups.jpeg", keywords: ["choices", "illusion", "fantasy", "wishful thinking"] },
  { name: "Eight of Cups", nameCN: "圣杯八", description: "The Eight of Cups represents a period of transition and the need for emotional detachment from current circumstances. It implies that you may feel compelled to move on from certain ventures in search of something more fulfilling or aligned with your goals.", image: "/tarotdeck/eightofcups.jpeg", keywords: ["abandonment", "withdrawal", "searching", "letting go"] },
  { name: "Nine of Cups", nameCN: "圣杯九", description: "The Nine of Cups represents wishes fulfilled, emotional satisfaction, and overall positive outcomes. It suggests that you may lead to favorable results, bringing you joy and contentment.", image: "/tarotdeck/nineofcups.jpeg", keywords: ["contentment", "satisfaction", "wishes fulfilled", "luxury"] },
  { name: "Ten of Cups", nameCN: "圣杯十", description: "The Ten of Cups represents emotional fulfillment, harmony, and joy. It suggests that you have the potential to bring about a sense of contentment and satisfaction. This card indicates that outcomes may lead to successful results, not just in terms of financial gains, but also overall happiness.", image: "/tarotdeck/tenofcups.jpeg", keywords: ["harmony", "family", "happiness", "alignment"] },
  { name: "Page of Cups", nameCN: "圣杯侍从", description: "The Page of Cups represents youthful enthusiasm, creativity, and the emergence of new ideas. By approaching with an open heart and a willingness to explore innovative strategies, you can potentially uncover profitable ventures or untapped potential.", image: "/tarotdeck/pageofcups.jpeg", keywords: ["creativity", "intuition", "curiosity", "new emotions"] },
  { name: "Knight of Cups", nameCN: "圣杯骑士", description: "The Knight of Cups suggests that you may be guided by your emotional instincts, and there is potential for positive outcomes if you follow your heart and make decisions based on your intuition.", image: "/tarotdeck/knightofcups.jpeg", keywords: ["romance", "charm", "idealism", "following heart"] },
  { name: "Queen of Cups", nameCN: "圣杯王后", description: "The Queen of Cups represents emotional intelligence, compassion, and intuitive wisdom. By tapping into your intuition, understanding your emotions, and making decisions from a place of empathy and compassion, you can navigate with positive outcomes.", image: "/tarotdeck/queenofcups.jpeg", keywords: ["compassion", "emotional stability", "intuitive", "caring"] },
  { name: "King of Cups", nameCN: "圣杯国王", description: "The King of Cups represents emotional intelligence, stability, and a calm approach. It indicates that by tapping into your intuition and maintaining a balanced mindset, you have the potential to make wise decisions and achieve positive outcomes.", image: "/tarotdeck/kingofcups.jpeg", keywords: ["emotional balance", "diplomacy", "calm", "wisdom"] },
  // Pentacles
  { name: "Ace of Pentacles", nameCN: "星币王牌", description: "The Ace of Pentacles represents the beginning of prosperity and the manifestation of wealth. It suggests that you may lead to favorable outcomes, such as financial stability and growth. This card encourages you to seize opportunities and make practical and grounded decisions.", image: "/tarotdeck/aceofpentacles.jpeg", keywords: ["opportunity", "prosperity", "new venture", "manifestation"] },
  { name: "Two of Pentacles", nameCN: "星币二", description: "The Two of Pentacles suggests balancing multiple financial responsibilities and finding harmony amidst changing circumstances. You will need to juggle different aspects, adapt to fluctuations, and make practical decisions to maintain stability.", image: "/tarotdeck/twoofpentacles.jpeg", keywords: ["balance", "flexibility", "priorities", "time management"] },
  { name: "Three of Pentacles", nameCN: "星币三", description: "The Three of Pentacles represents collaboration, skill, and success in your endeavors. It suggests that you have the potential to be fruitful, especially if you are willing to work with others and utilize your expertise.", image: "/tarotdeck/threeofpentacles.jpeg", keywords: ["teamwork", "collaboration", "skill", "quality"] },
  { name: "Four of Pentacles", nameCN: "星币四", description: "The Four of Pentacles represents a tendency to hold onto resources and maintain a secure financial position. It advises you to prioritize stability, financial security, and the preservation of your assets while finding balance between holding on and exploring new opportunities.", image: "/tarotdeck/fourofpentacles.jpeg", keywords: ["control", "security", "conservation", "boundaries"] },
  { name: "Five of Pentacles", nameCN: "星币五", description: "The Five of Pentacles represents a period of financial strain, scarcity, or feeling left out in the cold. It indicates that there may be losses or setbacks, and you might experience a sense of financial instability.", image: "/tarotdeck/fiveofpentacles.jpeg", keywords: ["hardship", "loss", "poverty", "isolation"] },
  { name: "Six of Pentacles", nameCN: "星币六", description: "The Six of Pentacles represents generosity, reciprocity, and the flow of resources. It suggests that you have the potential to result in mutually beneficial outcomes, where you may receive support or assistance from others while also sharing your abundance.", image: "/tarotdeck/sixofpentacles.jpeg", keywords: ["generosity", "charity", "giving", "receiving"] },
  { name: "Seven of Pentacles", nameCN: "星币七", description: "The Seven of Pentacles represents a time of reflection, assessing your progress, and waiting for results to unfold. It indicates that outcomes may require a patient approach, allowing growth and development over time.", image: "/tarotdeck/sevenofpentacles.jpeg", keywords: ["patience", "perseverance", "investment", "reward"] },
  { name: "Eight of Pentacles", nameCN: "星币八", description: "The Eight of Pentacles represents dedication, hard work, and honing your expertise. By putting in consistent effort, focusing on improving your skills, and staying committed, you have the potential to achieve success and financial growth.", image: "/tarotdeck/eightofpentacles.jpeg", keywords: ["craftsmanship", "skill development", "dedication", "quality"] },
  { name: "Nine of Pentacles", nameCN: "星币九", description: "The Nine of Pentacles represents a time of prosperity, self-sufficiency, and reaping the rewards of your hard work. It indicates that results may result in financial stability and a sense of personal accomplishment.", image: "/tarotdeck/nineofpentacles.jpeg", keywords: ["independence", "luxury", "self-sufficiency", "success"] },
  { name: "Ten of Pentacles", nameCN: "星币十", description: "The Ten of Pentacles represents a culmination of material abundance, prosperity, and generational wealth. It suggests that outcomes may yield significant returns and contribute to a solid financial foundation.", image: "/tarotdeck/tenofpentacles.jpeg", keywords: ["wealth", "legacy", "inheritance", "family"] },
  { name: "Page of Pentacles", nameCN: "星币侍从", description: "The Page of Pentacles represents a young and ambitious individual who is eager to learn and apply their skills in practical ways. By being diligent, focused, and open to learning, you have the potential to yield positive results.", image: "/tarotdeck/pageofpentacles.jpeg", keywords: ["ambition", "diligence", "goals", "manifestation"] },
  { name: "Knight of Pentacles", nameCN: "星币骑士", description: "The Knight of Pentacles represents a methodical and disciplined approach, suggesting that outcomes will yield gradual growth and stability. By focusing on long-term strategies and taking a patient approach, you have the potential to achieve financial stability.", image: "/tarotdeck/knightofpentacles.jpeg", keywords: ["efficiency", "routine", "responsibility", "hard work"] },
  { name: "Queen of Pentacles", nameCN: "星币王后", description: "The Queen of Pentacles represents a person or energy associated with practicality, nurturing, and material wealth. It suggests that endeavors have the potential to generate positive outcomes, growth, and a strong foundation.", image: "/tarotdeck/queenofpentacles.jpeg", keywords: ["nurturing", "practical", "comfort", "financial security"] },
  { name: "King of Pentacles", nameCN: "星币国王", description: "The King of Pentacles represents wealth, mastery, and practicality. It signifies that outcomes have the potential to bring fruitful results and solid returns. By approaching with a practical mindset and focusing on long-term gains, outcomes have a high probability of being prosperous.", image: "/tarotdeck/kingofpentacles.jpeg", keywords: ["wealth", "business", "abundance", "security"] },
  // Swords
  { name: "Ace of Swords", nameCN: "宝剑王牌", description: "The Ace of Swords represents a new beginning, intellectual power, and the ability to make decisive and strategic decisions. It indicates that activities may be marked by sharp insight, clear thinking, and a strong sense of purpose.", image: "/tarotdeck/aceofswords.jpeg", keywords: ["breakthrough", "clarity", "truth", "mental power"] },
  { name: "Two of Swords", nameCN: "宝剑二", description: "The Two of Swords represents a situation where you may feel stuck, unable to move forward or make clear decisions. It suggests a period of uncertainty and conflicting options that require careful consideration.", image: "/tarotdeck/twoofswords.jpeg", keywords: ["indecision", "stalemate", "avoidance", "difficult choices"] },
  { name: "Three of Swords", nameCN: "宝剑三", description: "The Three of Swords suggests a period of heartache, pain, or difficulties. This card indicates that you may face challenges or setbacks that could potentially result in emotional turmoil or loss.", image: "/tarotdeck/threeofswords.jpeg", keywords: ["heartbreak", "sorrow", "grief", "pain"] },
  { name: "Four of Swords", nameCN: "宝剑四", description: "The Four of Swords indicates a period of rest, recuperation, and taking a break from active pursuit. It advises you to step back and allow yourself some time for introspection and recharging.", image: "/tarotdeck/fourofswords.jpeg", keywords: ["rest", "recovery", "contemplation", "peace"] },
  { name: "Five of Swords", nameCN: "宝剑五", description: "The Five of Swords indicates potential conflict, competition, or challenges. The card advises you to be cautious of deceit, manipulation, or unhealthy competition. Be strategic and maintain a sense of integrity.", image: "/tarotdeck/fiveofswords.jpeg", keywords: ["conflict", "tension", "defeat", "win at all costs"] },
  { name: "Six of Swords", nameCN: "宝剑六", description: "The Six of Swords indicates a period of transition, moving away from difficulties towards calmer waters. By making strategic decisions and leaving behind challenging situations, you can navigate towards a more stable and positive experience.", image: "/tarotdeck/sixofswords.jpeg", keywords: ["transition", "moving on", "travel", "healing"] },
  { name: "Seven of Swords", nameCN: "宝剑七", description: "The Seven of Swords suggests an element of deception, risk, or potential loss. The card advises caution and vigilance, as there could be hidden agendas, unethical practices, or potential theft in the environment.", image: "/tarotdeck/sevenofswords.jpeg", keywords: ["deception", "strategy", "stealth", "betrayal"] },
  { name: "Eight of Swords", nameCN: "宝剑八", description: "The Eight of Swords indicates a sense of feeling restricted or trapped. It signifies potential obstacles, limitations, or self-imposed restrictions that could hinder your progress. The card encourages you to challenge these constraints.", image: "/tarotdeck/eightofswords.jpeg", keywords: ["restriction", "limitation", "fear", "imprisonment"] },
  { name: "Nine of Swords", nameCN: "宝剑九", description: "The Nine of Swords suggests that outcomes may lead to feelings of worry, anxiety, or stress. The card serves as a cautionary sign to be mindful of potential challenges or difficulties.", image: "/tarotdeck/nineofswords.jpeg", keywords: ["anxiety", "worry", "fear", "nightmares"] },
  { name: "Ten of Swords", nameCN: "宝剑十", description: "The Ten of Swords represents a sense of defeat, betrayal, or reaching a low point in a situation. It signifies that outcomes may face obstacles or unexpected negative developments.", image: "/tarotdeck/tenofswords.jpeg", keywords: ["ending", "failure", "collapse", "rock bottom"] },
  { name: "Page of Swords", nameCN: "宝剑侍从", description: "The Page of Swords requires careful analysis, strategic planning, and an alert mindset. Stay informed, be proactive in decision-making, and adapt quickly to changes.", image: "/tarotdeck/pageofswords.jpeg", keywords: ["curiosity", "restlessness", "mental energy", "vigilance"] },
  { name: "Knight of Swords", nameCN: "宝剑骑士", description: "The Knight of Swords indicates a period of rapid action, assertiveness, and taking risks. It represents an ambitious and driven energy, suggesting you might pursue with determination and a bold approach.", image: "/tarotdeck/knightofswords.jpeg", keywords: ["action", "impulsiveness", "ambition", "speed"] },
  { name: "Queen of Swords", nameCN: "宝剑王后", description: "The Queen of Swords represents a sharp intellect, clear communication, and a focus on logic and reason. Success depends on your ability to make informed decisions based on thorough research and critical thinking.", image: "/tarotdeck/queenofswords.jpeg", keywords: ["independence", "clarity", "intelligence", "direct communication"] },
  { name: "King of Swords", nameCN: "宝剑国王", description: "The King of Swords represents a strong and analytical mindset, indicating outcomes may be influenced by a logical and calculated approach. It suggests you have the potential to make informed and decisive choices.", image: "/tarotdeck/kingofswords.jpeg", keywords: ["authority", "intellect", "truth", "judgment"] },
  // Wands
  { name: "Ace of Wands", nameCN: "权杖王牌", description: "The Ace of Wands represents the spark of inspiration, entrepreneurial spirit, and the initiation of successful ventures. It signifies that activities may lead to exciting prospects, innovative ideas, and the potential for significant returns.", image: "/tarotdeck/aceofwands.jpeg", keywords: ["inspiration", "new opportunities", "growth", "potential"] },
  { name: "Two of Wands", nameCN: "权杖二", description: "The Two of Wands represents making plans, envisioning opportunities, and taking bold steps towards your goals. It suggests potential for future success, expansion, and new possibilities.", image: "/tarotdeck/twoofwands.jpeg", keywords: ["planning", "decisions", "discovery", "personal power"] },
  { name: "Three of Wands", nameCN: "权杖三", description: "The Three of Wands signifies taking a proactive approach, having a strategic vision, and being ready to explore new horizons. It suggests that outcomes may lead to opportunities for long-term success.", image: "/tarotdeck/threeofwands.jpeg", keywords: ["expansion", "foresight", "overseas opportunities", "leadership"] },
  { name: "Four of Wands", nameCN: "权杖四", description: "The Four of Wands represents a time of achievement, harmony, and a solid foundation. It suggests that results have the potential to bring about positive outcomes, financial stability, and a sense of accomplishment.", image: "/tarotdeck/fourofwands.jpeg", keywords: ["celebration", "harmony", "home", "community"] },
  { name: "Five of Wands", nameCN: "权杖五", description: "The Five of Wands indicates competition, conflicts, or obstacles. The card indicates a period of challenges and disagreements. Approach with resilience, strategic thinking, and the willingness to adapt.", image: "/tarotdeck/fiveofwands.jpeg", keywords: ["competition", "conflict", "tension", "diversity"] },
  { name: "Six of Wands", nameCN: "权杖六", description: "The Six of Wands symbolizes triumph, achievement, and public recognition for your efforts. It suggests that outcomes have the potential to yield positive results and be met with acclaim from others.", image: "/tarotdeck/sixofwands.jpeg", keywords: ["victory", "success", "recognition", "confidence"] },
  { name: "Seven of Wands", nameCN: "权杖七", description: "The Seven of Wands indicates that you will face challenges and competition. The card implies that you will need to defend your position and assert yourself amidst potential obstacles.", image: "/tarotdeck/sevenofwands.jpeg", keywords: ["perseverance", "defense", "maintaining position", "challenge"] },
  { name: "Eight of Wands", nameCN: "权杖八", description: "The Eight of Wands represents a period of rapid progress, momentum, and opportunities coming your way. It suggests potential for quick movement, possibly resulting in profitable outcomes.", image: "/tarotdeck/eightofwands.jpeg", keywords: ["speed", "action", "movement", "swift changes"] },
  { name: "Nine of Wands", nameCN: "权杖九", description: "The Nine of Wands represents resilience, perseverance, and the need to stay vigilant in the face of adversity. Be prepared for potential setbacks and remain determined to overcome any obstacles.", image: "/tarotdeck/nineofwands.jpeg", keywords: ["resilience", "perseverance", "defense", "last stand"] },
  { name: "Ten of Wands", nameCN: "权杖十", description: "The Ten of Wands indicates that outcomes may result in a heavy burden or overwhelming workload. Be mindful of taking on too much and find ways to manage the stress that may arise.", image: "/tarotdeck/tenofwands.jpeg", keywords: ["burden", "responsibility", "stress", "hard work"] },
  { name: "Page of Wands", nameCN: "权杖侍从", description: "The Page of Wands represents a fresh start, creative energy, and the willingness to explore new ventures. It suggests that outcomes may bring about exciting prospects and a sense of passion in your journey.", image: "/tarotdeck/pageofwands.jpeg", keywords: ["enthusiasm", "exploration", "discovery", "free spirit"] },
  { name: "Knight of Wands", nameCN: "权杖骑士", description: "The Knight of Wands signifies a period of taking bold and assertive steps in pursuit of your goals. It suggests opportunities for growth and expansion, but encourages balancing enthusiasm with careful planning.", image: "/tarotdeck/knightofwands.jpeg", keywords: ["action", "adventure", "passion", "impulsiveness"] },
  { name: "Queen of Wands", nameCN: "权杖王后", description: "The Queen of Wands represents a strong and determined individual who takes charge and exudes leadership qualities. It suggests that outcomes may yield success through your ability to embrace opportunities and take decisive action.", image: "/tarotdeck/queenofwands.jpeg", keywords: ["confidence", "independence", "determination", "warmth"] },
  { name: "King of Wands", nameCN: "权杖国王", description: "The King of Wands represents a dynamic and confident leader who possesses entrepreneurial skills and a visionary mindset. By harnessing your passion, taking decisive action, and leveraging your creativity, you can achieve significant success.", image: "/tarotdeck/kingofwands.jpeg", keywords: ["leadership", "vision", "entrepreneurship", "boldness"] }
];

export class TarotService {
  private cards: TarotCard[] = [];

  constructor() {
    this.initializeDeck();
  }

  private initializeDeck() {
    this.cards = tarotCardsData.map(card => ({
      ...card,
      reversed: false,
      descriptionCN: this.translateToChinese(card.description, card.nameCN)
    }));
  }

  private translateToChinese(englishDesc: string, cardNameCN: string): string {
    // Add basic Chinese interpretation
    return `${cardNameCN}牌代表着${englishDesc.slice(0, 100)}...（详细解读见英文描述）`;
  }

  private shuffleAndDraw(count: number): TarotCard[] {
    const shuffled = [...this.cards].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count).map(card => ({
      ...card,
      reversed: Math.random() > 0.5,
    }));
  }

  async reading(spreadType: string, question?: string, language: string = 'zh-CN'): Promise<{
    cards: TarotCard[];
    positions: string[];
    interpretation: string;
    spread: string;
    question?: string;
  }> {
    let cards: TarotCard[];
    let positions: string[];
    let interpretation: string;

    switch (spreadType) {
      case 'single':
        cards = this.shuffleAndDraw(1);
        positions = language === 'zh-CN' ? ['当前能量'] : ['Current Energy'];
        interpretation = this.interpretSingle(cards[0], language);
        break;

      case 'three-card':
        cards = this.shuffleAndDraw(3);
        positions = language === 'zh-CN' 
          ? ['过去', '现在', '未来']
          : ['Past', 'Present', 'Future'];
        interpretation = this.interpretThreeCard(cards, language);
        break;

      case 'celtic-cross':
        cards = this.shuffleAndDraw(10);
        positions = language === 'zh-CN'
          ? ['当前状况', '挑战', '潜意识', '过去', '目标', '未来', '你自己', '外部影响', '希望与恐惧', '结果']
          : ['Present', 'Challenge', 'Subconscious', 'Past', 'Crown', 'Future', 'Self', 'Environment', 'Hopes/Fears', 'Outcome'];
        interpretation = this.interpretCelticCross(cards, language);
        break;

      case 'relationship':
        cards = this.shuffleAndDraw(7);
        positions = language === 'zh-CN'
          ? ['你', '对方', '关系现状', '你的需求', '对方的需求', '挑战', '潜力']
          : ['You', 'Partner', 'Relationship', 'Your Needs', 'Partner Needs', 'Challenge', 'Potential'];
        interpretation = this.interpretRelationship(cards, language);
        break;

      case 'career':
        cards = this.shuffleAndDraw(5);
        positions = language === 'zh-CN'
          ? ['当前职业状况', '技能与优势', '挑战与阻碍', '行动建议', '未来发展']
          : ['Current Situation', 'Skills', 'Challenges', 'Action', 'Future'];
        interpretation = this.interpretCareer(cards, language);
        break;

      default:
        cards = this.shuffleAndDraw(1);
        positions = language === 'zh-CN' ? ['当前能量'] : ['Current Energy'];
        interpretation = this.interpretSingle(cards[0], language);
    }

    return {
      cards,
      positions,
      interpretation,
      spread: spreadType,
      question
    };
  }

  private interpretSingle(card: TarotCard, language: string): string {
    const name = language === 'zh-CN' ? card.nameCN : card.name;
    const position = card.reversed ? (language === 'zh-CN' ? '逆位' : 'Reversed') : (language === 'zh-CN' ? '正位' : 'Upright');
    const desc = language === 'zh-CN' ? (card.descriptionCN || card.description) : card.description;

    if (language === 'zh-CN') {
      return `抽到了**${name}（${position}）**\n\n${desc}\n\n关键词：${card.keywords.join('、')}`;
    } else {
      return `Drew **${name} (${position})**\n\n${desc}\n\nKeywords: ${card.keywords.join(', ')}`;
    }
  }

  private interpretThreeCard(cards: TarotCard[], language: string): string {
    if (language === 'zh-CN') {
      return `## 三张牌解读\n\n` +
        `### 过去：${cards[0].nameCN}（${cards[0].reversed ? '逆位' : '正位'}）\n${cards[0].descriptionCN?.slice(0, 150)}...\n\n` +
        `### 现在：${cards[1].nameCN}（${cards[1].reversed ? '逆位' : '正位'}）\n${cards[1].descriptionCN?.slice(0, 150)}...\n\n` +
        `### 未来：${cards[2].nameCN}（${cards[2].reversed ? '逆位' : '正位'}）\n${cards[2].descriptionCN?.slice(0, 150)}...`;
    } else {
      return `## Three-Card Reading\n\n` +
        `### Past: ${cards[0].name} (${cards[0].reversed ? 'Reversed' : 'Upright'})\n${cards[0].description.slice(0, 150)}...\n\n` +
        `### Present: ${cards[1].name} (${cards[1].reversed ? 'Reversed' : 'Upright'})\n${cards[1].description.slice(0, 150)}...\n\n` +
        `### Future: ${cards[2].name} (${cards[2].reversed ? 'Reversed' : 'Upright'})\n${cards[2].description.slice(0, 150)}...`;
    }
  }

  private interpretCelticCross(cards: TarotCard[], language: string): string {
    if (language === 'zh-CN') {
      return `## 凯尔特十字牌阵解读\n\n` +
        cards.map((card, i) => {
          const positions = ['当前状况', '挑战', '潜意识', '过去', '目标', '未来', '你自己', '外部影响', '希望与恐惧', '结果'];
          return `### ${i + 1}. ${positions[i]}：${card.nameCN}（${card.reversed ? '逆位' : '正位'}）\n${card.descriptionCN?.slice(0, 100)}...`;
        }).join('\n\n');
    } else {
      return `## Celtic Cross Reading\n\n` +
        cards.map((card, i) => {
          const positions = ['Present', 'Challenge', 'Subconscious', 'Past', 'Crown', 'Future', 'Self', 'Environment', 'Hopes/Fears', 'Outcome'];
          return `### ${i + 1}. ${positions[i]}: ${card.name} (${card.reversed ? 'Reversed' : 'Upright'})\n${card.description.slice(0, 100)}...`;
        }).join('\n\n');
    }
  }

  private interpretRelationship(cards: TarotCard[], language: string): string {
    if (language === 'zh-CN') {
      const positions = ['你', '对方', '关系现状', '你的需求', '对方的需求', '挑战', '潜力'];
      return `## 关系牌阵解读\n\n` +
        cards.map((card, i) => 
          `### ${positions[i]}：${card.nameCN}（${card.reversed ? '逆位' : '正位'}）\n${card.descriptionCN?.slice(0, 100)}...`
        ).join('\n\n');
    } else {
      const positions = ['You', 'Partner', 'Relationship', 'Your Needs', 'Partner Needs', 'Challenge', 'Potential'];
      return `## Relationship Spread\n\n` +
        cards.map((card, i) =>
          `### ${positions[i]}: ${card.name} (${card.reversed ? 'Reversed' : 'Upright'})\n${card.description.slice(0, 100)}...`
        ).join('\n\n');
    }
  }

  private interpretCareer(cards: TarotCard[], language: string): string {
    if (language === 'zh-CN') {
      const positions = ['当前职业状况', '技能与优势', '挑战与阻碍', '行动建议', '未来发展'];
      return `## 职业发展牌阵解读\n\n` +
        cards.map((card, i) =>
          `### ${positions[i]}：${card.nameCN}（${card.reversed ? '逆位' : '正位'}）\n${card.descriptionCN?.slice(0, 100)}...`
        ).join('\n\n');
    } else {
      const positions = ['Current Situation', 'Skills & Strengths', 'Challenges', 'Recommended Action', 'Future Development'];
      return `## Career Spread\n\n` +
        cards.map((card, i) =>
          `### ${positions[i]}: ${card.name} (${card.reversed ? 'Reversed' : 'Upright'})\n${card.description.slice(0, 100)}...`
        ).join('\n\n');
    }
  }

  // Get specific card by name
  getCardByName(name: string): TarotCard | undefined {
    return this.cards.find(c => c.name === name || c.nameCN === name);
  }

  // Get all cards
  getAllCards(): TarotCard[] {
    return this.cards;
  }
}
