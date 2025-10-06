/**
 * Complete 64 Hexagrams of I-Ching (Enhanced with English translations)
 * 易经六十四卦完整数据（增强版-含英文翻译）
 * 
 * Chinese text (卦辞/象辞): From I-Ching (Book of Changes) original text
 * English translations: Based on i-ching.el by nik gaffney (FoAM)
 *   Repository: https://github.com/zzkt/i-ching
 *   License: GPL-3.0 (data extracted for educational purposes)
 *   Translations: Wilhelm-Baynes, Legge, Pearson
 *   Source: Wikipedia (CC-BY-SA), Unicode Standard
 * 
 * King Wen sequence (文王后天八卦序)
 */

export interface Hexagram {
  number: number;
  name: string;
  nameEn: string;
  symbol: string;
  trigrams: {
    upper: string;
    lower: string;
  };
  // 中文
  judgement: string;         // 卦辞（周易原文）
  image: string;             // 象辞（周易·象传）
  interpretation: string;    // 中文解读
  // 英文（来自i-ching.el）
  descriptionEn?: string;    // 英文描述
  judgementEn?: string;      // The Judgement (Wilhelm/Legge)
  imageEn?: string;          // The Image (Wilhelm)
  unicodeName?: string;      // Unicode标准名称
  lines?: string[];
}

export const HEXAGRAMS: Hexagram[] = [
  {
  number: number;
  name: string;
  nameEn: string;
  symbol: string;
  trigrams: {
    upper: string;
    lower: string;
  };
  judgement: string;
  image: string;
  interpretation: string;
  lines?: string[];
}

export const HEXAGRAMS: Hexagram[] = [
  // 1-10
  {
    number: 1,
    name: '乾',
    nameEn: 'Qián (The Creative)',
    symbol: '☰',
    trigrams: { upper: '乾(天)', lower: '乾(天)' },
    judgement: '元亨利贞。',
    image: '天行健，君子以自强不息。',
    interpretation: '乾卦象征刚健、强壮、创造。如天道运行不息，君子应效法天道，自强不息。此卦大吉大利，但需要坚持正道。适合开创事业，主动进取，但要避免过于刚猛。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 1 is named 乾 (qián), “Force”. Other variations include “the creative”, “strong action”, “the key”, and “initiating”. Its inner (lower) trigram is ☰ (乾 qián) force = (天) heaven, and its outer (upper) trigram is the same.",
    judgementEn: "THE CREATIVE works sublime success, Furthering through perseverance.",
    imageEn: "The movement of heaven is full of power. Thus, you should become strong and untiring.",
    unicodeName: "HEXAGRAM FOR THE CREATIVE HEAVEN",
  },
  {
    number: 2,
    name: '坤',
    nameEn: 'Kūn (The Receptive)',
    symbol: '☷',
    trigrams: { upper: '坤(地)', lower: '坤(地)' },
    judgement: '元亨，利牝马之贞。君子有攸往，先迷后得主，利西南得朋，东北丧朋。安贞吉。',
    image: '地势坤，君子以厚德载物。',
    interpretation: '坤卦象征柔顺、包容、承载。如大地承载万物，君子应效法大地，厚德载物。此卦吉利，但需要顺应形势，不宜强出头。适合辅佐他人，以柔克刚，厚积薄发。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 2 is named 坤 (kūn), “Field”. Other variations include “the receptive”, “acquiescence”, and “the flow”. Its inner (lower) trigram is ☷ (坤 kūn) field = (地) earth, and its outer (upper) trigram is identical.",
    judgementEn: "THE RECEPTIVE brings about sublime success, Furthering through the perseverance of a mare. If you undertake something and try to lead, things go astray; But if you should follow, you will find guidance. It is favorable to find friends in the west and south, To forego friends in the east and north. Quiet perseverance brings good fortune.",
    imageEn: "The earth's condition is receptive devotion. Thus the person who has breadth of character carries the outer world.",
    unicodeName: "HEXAGRAM FOR THE RECEPTIVE EARTH",
  },
  {
    number: 3,
    name: '屯',
    nameEn: 'Zhūn (Difficulty at Beginning)',
    symbol: '☳☵',
    trigrams: { upper: '坎(水)', lower: '震(雷)' },
    judgement: '元亨利贞，勿用有攸往，利建侯。',
    image: '云雷屯，君子以经纶。',
    interpretation: '屯卦象征万事开头难，如乌云密布，雷声隆隆。此时不宜贸然前进，应当积蓄力量，等待时机。适合打基础，建立根基，不宜急于求成。虽然困难重重，但坚持必有收获。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 3 is named 屯 (zhūn), “Sprouting”. Other variations include “difficulty at the beginning”, “gathering support”, and “hoarding”. Its inner (lower) trigram is ☳ (震 zhèn) shake = (雷) thunder, and its outer (upper) trigram is ☵ (坎 kǎn) gorge = (水) water.",
    judgementEn: "DIFFICULTY AT THE BEGINNING works supreme success, Furthering through perseverance. Nothing should be undertaken. It furthers you to appoint helpers.",
    imageEn: "Clouds and thunder: The image of DIFFICULTY AT THE BEGINNING. Thus, you should bring order out of confusion.",
    unicodeName: "HEXAGRAM FOR DIFFICULTY AT THE BEGINNING",
  },
  {
    number: 4,
    name: '蒙',
    nameEn: 'Méng (Youthful Folly)',
    symbol: '☶☵',
    trigrams: { upper: '艮(山)', lower: '坎(水)' },
    judgement: '亨。匪我求童蒙，童蒙求我。初筮告，再三渎，渎则不告。利贞。',
    image: '山下出泉，蒙；君子以果行育德。',
    interpretation: '蒙卦象征蒙昧、启蒙、教育。如山下涌泉，需要引导。此时应当虚心求教，接受教育和指导。不宜自作聪明，应保持诚心。适合学习新知识，接受培训，寻求指导。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 4 is named 蒙 (méng), “Enveloping”. Other variations include “youthful folly”, “the young shoot”, and “discovering”. Its inner trigram is ☵ (坎 kǎn) gorge = (水) water. Its outer trigram is ☶ (艮 gèn) bound = (山) mountain.",
    judgementEn: "YOUTHFUL FOLLY has success. It is not I who seek the young fool; The young fool seeks me. At the first oracle I inform him. If he asks two or three times, it is importunity. If he importunes, I give him no information. Perseverance furthers.",
    imageEn: "A spring wells up at the foot of the mountain: The image of YOUTH. Thus, you should foster your character by thoroughness in all that you do.",
    unicodeName: "HEXAGRAM FOR YOUTHFUL FOLLY",
  },
  {
    number: 5,
    name: '需',
    nameEn: 'Xū (Waiting)',
    symbol: '☰☵',
    trigrams: { upper: '坎(水)', lower: '乾(天)' },
    judgement: '有孚，光亨，贞吉。利涉大川。',
    image: '云上于天，需；君子以饮食宴乐。',
    interpretation: '需卦象征等待、需求。如云气上升于天，雨水即将降临。此时需要耐心等待，不可急躁。保持信心，时机到来自然成功。适合养精蓄锐，等待良机，不宜强行推进。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 5 is named 需 (xū), “Attending”. Other variations include “waiting”, “moistened”, and “arriving”. Its inner (lower) trigram is ☰ (乾 qián) force = (天) heaven, and its outer (upper) trigram is ☵ (坎 kǎn) gorge = (水) water.",
    judgementEn: "WAITING. If you are sincere, you have light and success. Perseverance brings good fortune. It furthers one to cross the great water.",
    imageEn: "Clouds rise up to heaven: The image of WAITING. Thus, you should eat and drink, be joyous and of good cheer.",
    unicodeName: "HEXAGRAM FOR WAITING",
  },
  {
    number: 6,
    name: '讼',
    nameEn: 'Sòng (Conflict)',
    symbol: '☰☵',
    trigrams: { upper: '乾(天)', lower: '坎(水)' },
    judgement: '有孚，窒惕，中吉，终凶。利见大人，不利涉大川。',
    image: '天与水违行，讼；君子以作事谋始。',
    interpretation: '讼卦象征争讼、冲突。如天水相背，方向相反。此时有争端纠纷，应当谨慎处理。能和解最好和解，不宜硬碰硬。适合寻求调解，避免扩大矛盾。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 6 is named 訟 (sòng), “Arguing”. Other variations include “conflict” and “lawsuit”. Its inner (lower) trigram is ☵ (坎 kǎn) gorge = (水) water, and its outer (upper) trigram is ☰ (乾 qián) force = (天) heaven.",
    judgementEn: "CONFLICT. You are sincere and are being obstructed. A cautious halt halfway brings good fortune. Going through to the end brings misfortune. You should seek advice from someone greater. It will be ineffective to attempt major change.",
    imageEn: "Heaven and water go their opposite ways: The image of CONFLICT. Thus in all your transactions you should carefully consider the beginning.",
    unicodeName: "HEXAGRAM FOR CONFLICT",
  },
  {
    number: 7,
    name: '师',
    nameEn: 'Shī (The Army)',
    symbol: '☷☵',
    trigrams: { upper: '坤(地)', lower: '坎(水)' },
    judgement: '贞，丈人吉，无咎。',
    image: '地中有水，师；君子以容民畜众。',
    interpretation: '师卦象征军队、众人。如地中蕴水，需要统率。此时需要严明纪律，选贤任能。事业上需要团队协作，听从指挥。适合组建团队，统一行动，但要选对领导。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 7 is named 師 (shī), “Leading”. Other variations include “the army” and “the troops”. Its inner (lower) trigram is ☵ (坎 kǎn) gorge = (水) water, and its outer (upper) trigram is ☷ (坤 kūn) field = (地) earth.",
    judgementEn: "THE ARMY needs perseverance and a strong leader. Good fortune without blame.",
    imageEn: "In the middle of the earth is water: The image of THE ARMY. The Leader nourishes and educates the people, and collects from among them a mighty army.",
    unicodeName: "HEXAGRAM FOR THE ARMY",
  },
  {
    number: 8,
    name: '比',
    nameEn: 'Bǐ (Holding Together)',
    symbol: '☵☷',
    trigrams: { upper: '坎(水)', lower: '坤(地)' },
    judgement: '吉。原筮，元永贞，无咎。不宁方来，后夫凶。',
    image: '地上有水，比；先王以建万国，亲诸侯。',
    interpretation: '比卦象征亲近、团结。如水在地上，滋润大地。此时应当亲近贤者，团结众人。选择正确的合作对象很重要。适合建立联盟，寻找伙伴，但要真诚相待。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 8 is named 比 (bì), “Grouping”. Other variations include “holding together” and “alliance”. Its inner (lower) trigram is ☷ (坤 kūn) field = (地) earth, and its outer (upper) trigram is ☵ (坎 kǎn) gorge = (水) water.",
    judgementEn: "HOLDING TOGETHER brings good fortune. Inquire of the oracle once again whether you possess sublimity, constancy, and perseverance; then there is no blame. Those who are uncertain gradually join. Whoever arrive too late meets with misfortune.",
    imageEn: "On the earth is water: The image of HOLDING TOGETHER. Thus the kings of antiquity Bestowed the different states as fiefs and cultivated friendly relations with their feudal lords.",
    unicodeName: "HEXAGRAM FOR HOLDING TOGETHER",
  },
  {
    number: 9,
    name: '小畜',
    nameEn: 'Xiǎo Xù (Small Accumulation)',
    symbol: '☰☴',
    trigrams: { upper: '巽(风)', lower: '乾(天)' },
    judgement: '亨。密云不雨，自我西郊。',
    image: '风行天上，小畜；君子以懿文德。',
    interpretation: '小畜卦象征小有积蓄，力量不足。如密云不雨，蓄势待发。此时不宜大举行动，应当继续积累。适合储备资源，提升能力，等待更好的时机。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 9 is named 小畜 (xiǎo xù), “Small Accumulating”. Other variations include “the taming power of the small” and “small harvest”. Its inner (lower) trigram is ☰ (乾 qián) force = (天) heaven, and its outer (upper) trigram is ☴ (巽 xùn) ground = (風) wind.",
    judgementEn: "THE TAMING POWER OF THE SMALL Has success. Dense clouds, no rain from our western region.",
    imageEn: "The wind drives across heaven: The image of THE TAMING POWER OF THE SMALL. Thus refine the outward aspect of your nature.",
    unicodeName: "HEXAGRAM FOR SMALL TAMING",
  },
  {
    number: 10,
    name: '履',
    nameEn: 'Lǚ (Treading)',
    symbol: '☰☱',
    trigrams: { upper: '乾(天)', lower: '兑(泽)' },
    judgement: '履虎尾，不咥人，亨。',
    image: '上天下泽，履；君子以辨上下，定民志。',
    interpretation: '履卦象征行走、践履。如履虎尾而虎不咬人，因为行为得当。此时要小心谨慎，遵守规则。适合按部就班，循规蹈矩，不可冒险妄动。',
  },

  // 11-20
  {
    number: 11,
    name: '泰',
    nameEn: 'Tài (Peace)',
    symbol: '☷☰',
    trigrams: { upper: '乾(天)', lower: '坤(地)' },
    judgement: '小往大来，吉亨。',
    image: '天地交，泰；后以财成天地之道，辅相天地之宜，以左右民。',
    interpretation: '泰卦象征通泰、和平。天地交合，阴阳调和。此为大吉之卦，事事顺利。适合大展宏图，推进计划。但盛极必衰，要居安思危。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 10 is named 履 (lǚ), “Treading”. Other variations include “treading (conduct)” and “continuing”. Its inner (lower) trigram is ☱ (兌 duì) open = (澤) swamp, and its outer (upper) trigram is ☰ (乾 qián) force = (天) heaven.",
    judgementEn: "TREADING. Treading upon the tail of the tiger. It does not bite. Success.",
    imageEn: "The image of the sky above, and below it the waters of a marsh. Cautious Advance. You should, accordingly, determine what is high and low, and give settlement to the aims of the people.",
    unicodeName: "HEXAGRAM FOR TREADING",
  },
  {
    number: 12,
    name: '否',
    nameEn: 'Pǐ (Standstill)',
    symbol: '☰☷',
    trigrams: { upper: '坤(地)', lower: '乾(天)' },
    judgement: '否之匪人，不利君子贞，大往小来。',
    image: '天地不交，否；君子以俭德辟难，不可荣以禄。',
    interpretation: '否卦象征阻塞、不通。天地不交，小人当道。此时运势不佳，应当退守待时。不宜进取，应当韬光养晦，保存实力。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 12 is named 否 (pǐ), “Obstruction”. Other variations include “standstill (stagnation)” and “selfish persons”. Its inner (lower) trigram is ☷ (坤 kūn) field = (地) earth, and its outer (upper) trigram is ☰ (乾 qián) force = (天) heaven.",
    judgementEn: "STANDSTILL. Evil people do not further your perseverance. The great departs; the small approaches.",
    imageEn: "Heaven and earth do not unite: The image of STANDSTILL. Thus, you should fall back upon your inner worth to escape the difficulties, withdrawing from evil, and refusing both honor and wealth.",
    unicodeName: "HEXAGRAM FOR STANDSTILL",
  },
  {
    number: 13,
    name: '同人',
    nameEn: 'Tóng Rén (Fellowship)',
    symbol: '☰☲',
    trigrams: { upper: '乾(天)', lower: '离(火)' },
    judgement: '同人于野，亨。利涉大川，利君子贞。',
    image: '天与火，同人；君子以类族辨物。',
    interpretation: '同人卦象征团结同心。如天火相合，志同道合。此时适合团结协作，共同进退。寻找志同道合的伙伴，可成大事。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 13 is named 同人 (tóng rén), “Concording People”. Other variations include “fellowship with men” and “gathering men”. Its inner (lower) trigram is ☲ (離 lí) radiance = (火) fire, and its outer (upper) trigram is ☰ (乾 qián) force = (天) heaven.",
    judgementEn: "FELLOWSHIP in the open. Success. It will be advantageous to cross the great river. It will be advantageous to maintain firm correctness.",
    imageEn: "Heaven together with fire: The image of FELLOWSHIP. Thus, you should distinguish things according to their kinds and classes, and make distinctions between things.",
    unicodeName: "HEXAGRAM FOR FELLOWSHIP",
  },
  {
    number: 14,
    name: '大有',
    nameEn: 'Dà Yǒu (Great Possession)',
    symbol: '☲☰',
    trigrams: { upper: '离(火)', lower: '乾(天)' },
    judgement: '元亨。',
    image: '火在天上，大有；君子以遏恶扬善，顺天休命。',
    interpretation: '大有卦象征大丰收、大成就。如火照天空，光明显耀。此时运势极佳，收获丰硕。应当行善积德，谦虚待人，避免骄傲自满。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 14 is named 大有 (dà yǒu), “Great Possessing”. Other variations include “possession in great measure” and “the great possession”. Its inner (lower) trigram is ☰ (乾 qián) force = (天) heaven, and its outer (upper) trigram is ☲ (離 lí) radiance = (火) fire.",
    judgementEn: "POSSESSION IN GREAT MEASURE. Supreme success.",
    imageEn: "Fire in heaven above: the image of POSSESSION IN GREAT MEASURE. Thus, you should suppress evil and nurture virtue in accordance with the benevolent will of heaven.",
    unicodeName: "HEXAGRAM FOR GREAT POSSESSION",
  },
  {
    number: 15,
    name: '谦',
    nameEn: 'Qiān (Modesty)',
    symbol: '☷☶',
    trigrams: { upper: '坤(地)', lower: '艮(山)' },
    judgement: '亨，君子有终。',
    image: '地中有山，谦；君子以裒多益寡，称物平施。',
    interpretation: '谦卦象征谦虚、谦逊。如高山藏于地下，不显露锋芒。此卦大吉，谦受益，满招损。应当保持谦虚，不骄不躁，终有善果。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 15 is named 謙 (qiān), “Humbling”. Other variations include “modesty”. Its inner (lower) trigram is ☶ (艮 gèn) bound = (山) mountain and its outer (upper) trigram is ☷ (坤 kūn) field = (地) earth.",
    judgementEn: "MODESTY creates success. You should follow things through.",
    imageEn: "Within the earth, a mountain: The image of MODESTY. Thus, you should reduce that which is too much, and augment that which is too little. Weigh things and make them equal.",
    unicodeName: "HEXAGRAM FOR MODESTY",
  },
  {
    number: 16,
    name: '豫',
    nameEn: 'Yù (Enthusiasm)',
    symbol: '☳☷',
    trigrams: { upper: '坤(地)', lower: '震(雷)' },
    judgement: '利建侯行师。',
    image: '雷出地奋，豫；先王以作乐崇德，殷荐之上帝，以配祖考。',
    interpretation: '豫卦象征欢乐、愉悦。如雷出地奋，万物欣欣向荣。此时心情愉快，做事顺利。但不可过于安逸，要居安思危。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 16 is named 豫 (yù), “Providing-For”. Other variations include “enthusiasm” and “excess”. Its inner (lower) trigram is ☷ (坤 kūn) field = (地) earth, and its outer (upper) trigram is ☳ (震 zhèn) shake = (雷) thunder.",
    judgementEn: "ENTHUSIASM. It furthers one to install helpers and to set armies marching.",
    imageEn: "Thunder comes resounding out of the earth: The image of ENTHUSIASM. Thus the ancient kings made music in order to honour virtue, and offered it with splendour to the Supreme Deity, inviting their ancestors to be present.",
    unicodeName: "HEXAGRAM FOR ENTHUSIASM",
  },
  {
    number: 17,
    name: '随',
    nameEn: 'Suí (Following)',
    symbol: '☱☳',
    trigrams: { upper: '震(雷)', lower: '兑(泽)' },
    judgement: '元亨利贞，无咎。',
    image: '泽中有雷，随；君子以向晦入宴息。',
    interpretation: '随卦象征跟随、顺从。如雷入泽中，随物而动。此时应当顺应时势，跟随贤者。不宜逆势而为，应当灵活应变。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 17 is named 隨 (suí), “Following”. Its inner (lower) trigram is ☳ (震 zhèn) shake = (雷) thunder, and its outer (upper) trigram is ☱ (兌 duì) open = (澤) swamp.",
    judgementEn: "FOLLOWING has supreme success. Perseverance furthers. No blame.",
    imageEn: "Thunder in the middle of the lake: The image of FOLLOWING. Thus, you should go indoors at nightfall to rest.",
    unicodeName: "HEXAGRAM FOR FOLLOWING",
  },
  {
    number: 18,
    name: '蛊',
    nameEn: 'Gǔ (Work on the Decayed)',
    symbol: '☶☴',
    trigrams: { upper: '巽(风)', lower: '艮(山)' },
    judgement: '元亨，利涉大川。先甲三日，后甲三日。',
    image: '山下有风，蛊；君子以振民育德。',
    interpretation: '蛊卦象征腐败、弊端。如山下有风，蛀虫滋生。此时需要整顿改革，去除弊端。适合清理旧事，革新改造，但要谨慎行事。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 18 is named 蠱 (gǔ), “Repair”. Other variations include “work on what has been spoiled (decay)”, Correcting, misdeeds, decaying and “branch”.[1] Its inner (lower) trigram is ☴ (巽 xùn) ground = (風) wind, and its outer (upper) trigram is ☶ (艮 gèn) bound = (山) mountain. Gu is the name of a venom-based poison traditionally used in Chinese witchcraft.",
    judgementEn: "Successful progress is indicated for those who properly repair what has been spoiled. It is advantageous to cross the great river. You should consider carefully the events three days before the turning point and the tasks remaining for three days afterwards.",
    imageEn: "The wind blows low on the mountain: The image of DECAY. Thus, you should encourage people and strengthen their spirit.",
    unicodeName: "HEXAGRAM FOR WORK ON THE DECAYED",
  },
  {
    number: 19,
    name: '临',
    nameEn: 'Lín (Approach)',
    symbol: '☷☱',
    trigrams: { upper: '坤(地)', lower: '兑(泽)' },
    judgement: '元亨利贞。至于八月有凶。',
    image: '泽上有地，临；君子以教思无穷，容保民无疆。',
    interpretation: '临卦象征临近、到来。如泽水即将溢出，需要管理。此时运势上升，机会来临。应当积极把握，但要未雨绸缪。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 19 is named 臨 (lín), “Nearing”. Other variations include “approach” and “the forest”. Its inner (lower) trigram is ☱ (兌 duì) open = (澤) swamp, and its outer (upper) trigram is ☷ (坤 kūn) field = (地) earth.",
    judgementEn: "APPROACH has supreme success. Perseverance. In the Eighth month, there will be misfortune.",
    imageEn: "The earth above the lake: The image of APPROACH. Thus become inexhaustible in your instruction and unflagging in your nourishing support of people.",
    unicodeName: "HEXAGRAM FOR APPROACH",
  },
  {
    number: 20,
    name: '观',
    nameEn: 'Guān (Contemplation)',
    symbol: '☴☷',
    trigrams: { upper: '坤(地)', lower: '巽(风)' },
    judgement: '盥而不荐，有孚颙若。',
    image: '风行地上，观；先王以省方观民设教。',
    interpretation: '观卦象征观察、审视。如风行地上，观察万物。此时应当静观其变，审时度势。不宜妄动，应多观察思考。',
  },

  // 21-30
  {
    number: 21,
    name: '噬嗑',
    nameEn: 'Shì Kè (Biting Through)',
    symbol: '☲☳',
    trigrams: { upper: '离(火)', lower: '震(雷)' },
    judgement: '亨。利用狱。',
    image: '雷电噬嗑；先王以明罚敕法。',
    interpretation: '噬嗑卦象征咬合、清除障碍。如雷电齐发，除恶务尽。此时遇到阻碍需要果断处理。适合解决纠纷，清除障碍，但要公正严明。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 20 is named 觀 (guān), “Viewing”. Other variations include “contemplation (view)” and “looking up”. Its inner (lower) trigram is ☷ (坤 kūn) field = (地) earth, and its outer (upper) trigram is ☴ (巽 xùn) ground = (風) wind.",
    judgementEn: "CONTEMPLATION. The ablution has been made, but not yet the offering. Full of trust they look up to him.",
    imageEn: "The wind blows over the earth: The image of CONTEMPLATION. Thus the kings of old visited the regions of the world, contemplated the people, and gave them instruction.",
    unicodeName: "HEXAGRAM FOR CONTEMPLATION",
  },
  {
    number: 22,
    name: '贲',
    nameEn: 'Bì (Grace)',
    symbol: '☶☲',
    trigrams: { upper: '离(火)', lower: '艮(山)' },
    judgement: '亨。小利有攸往。',
    image: '山下有火，贲；君子以明庶政，无敢折狱。',
    interpretation: '贲卦象征装饰、文饰。如山下有火，外表华丽。此时宜注重形式和外表，但不可华而不实。适合包装美化，提升形象。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 22 is named 賁 (bì), “Adorning”. Other variations include “grace” and “luxuriance”. Its inner (lower) trigram is ☲ (離 lí) radiance = (火) fire, and its outer (upper) trigram is ☶ (艮 gèn) bound = (山) mountain. [3]",
    judgementEn: "GRACE has success. In small matters It is favorable to undertake something.",
    imageEn: "Fire at the foot of the mountain: The image of GRACE. Thus, you should proceed with clearing up current affairs. But do not decide controversial issues in this way.",
    unicodeName: "HEXAGRAM FOR GRACE",
  },
  {
    number: 23,
    name: '剥',
    nameEn: 'Bō (Splitting Apart)',
    symbol: '☶☷',
    trigrams: { upper: '坤(地)', lower: '艮(山)' },
    judgement: '不利有攸往。',
    image: '山附于地，剥；上以厚下安宅。',
    interpretation: '剥卦象征剥落、衰败。如山附于地，逐渐崩落。此时运势下降，不宜行动。应当保守退守，等待转机。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 23 is named 剝 (bō), “Stripping”. Other variations include “splitting apart” and “flaying”. Its inner trigram is ☷ (坤 kūn) field = (地) earth, and its outer trigram is ☶ (艮 gèn) bound = (山) mountain.",
    judgementEn: "SPLITTING APART. IT does not further one to go anywhere.",
    imageEn: "The mountain rests on the earth: The image of SPLITTING APART. Thus those above can ensure their position only by giving generously to those below.",
    unicodeName: "HEXAGRAM FOR SPLITTING APART",
  },
  {
    number: 24,
    name: '复',
    nameEn: 'Fù (Return)',
    symbol: '☷☳',
    trigrams: { upper: '震(雷)', lower: '坤(地)' },
    judgement: '亨。出入无疾，朋来无咎。反复其道，七日来复，利有攸往。',
    image: '雷在地中，复；先王以至日闭关，商旅不行，后不省方。',
    interpretation: '复卦象征返回、复苏。如春雷震动，万物复苏。此时否极泰来，运势回升。适合重新开始，卷土重来。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 24 is named 復 (fù), “Returning”. Other variations include “return (the turning point)”. Its inner trigram is ☳ (震 zhèn) shake = (雷) thunder, and its outer trigram is ☷ (坤 kūn) field = (地) earth.",
    judgementEn: "RETURN. Success. Going out and coming in without error. Friends come without blame. To and fro goes the way. On the seventh day comes return. It furthers one to have somewhere to go.",
    imageEn: "Thunder within the earth: The image of THE TURNING POINT. Thus the kings of antiquity closed the passes at the time of solstice. Merchants and strangers did not go about, and the ruler did not travel through the provinces.",
    unicodeName: "HEXAGRAM FOR RETURN",
  },
  {
    number: 25,
    name: '无妄',
    nameEn: 'Wú Wàng (Innocence)',
    symbol: '☰☳',
    trigrams: { upper: '震(雷)', lower: '乾(天)' },
    judgement: '元亨利贞。其匪正有眚，不利有攸往。',
    image: '天下雷行，物与无妄；先王以茂对时育万物。',
    interpretation: '无妄卦象征真诚、正直。如天雷震动，不虚假造作。此时应当真诚待人，不可投机取巧。顺应自然，持守正道。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 25 is named 無妄 (wú wàng), “Without Embroiling”. Other variations include “innocence (the unexpected)” and “pestilence”. Its inner trigram is ☳ (震 zhèn) shake = (雷) thunder, and its outer trigram is ☰ (乾 qián) force = (天) heaven.",
    judgementEn: "INNOCENCE. Supreme success. Perseverance furthers. If someone is not as he should be, He has misfortune, And it does not further him To undertake anything.",
    imageEn: "Under heaven thunder rolls: All things attain the natural state of innocence. Thus the kings of old, rich in virtue and in harmony with the time, fostered and nourished all beings.",
    unicodeName: "HEXAGRAM FOR INNOCENCE",
  },
  {
    number: 26,
    name: '大畜',
    nameEn: 'Dà Xù (Great Accumulation)',
    symbol: '☶☰',
    trigrams: { upper: '乾(天)', lower: '艮(山)' },
    judgement: '利贞，不家食吉，利涉大川。',
    image: '天在山中，大畜；君子以多识前言往行，以畜其德。',
    interpretation: '大畜卦象征大量积蓄。如天藏于山中，蓄势待发。此时应当积累力量，储备资源。适合学习充电，积累经验。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 26 is named 大畜 (dà xù), “Great Accumulating”. Other variations include “the taming power of the great”, “great storage”, and “potential energy”. Its inner trigram is ☰ (乾 qián) force = (天) heaven, and its outer trigram is ☶ (艮 gèn) bound = (山) mountain.",
    judgementEn: "THE TAMING POWER OF THE GREAT. Perseverance furthers. Not eating at home brings good fortune. It furthers one to cross the great water.",
    imageEn: "Heaven within the mountain: The image of THE TAMING POWER OF THE GREAT. Thus, you should acquaint yourself with the sayings of antiquity and many deeds of the past in order to strengthen your character.",
    unicodeName: "HEXAGRAM FOR GREAT TAMING",
  },
  {
    number: 27,
    name: '颐',
    nameEn: 'Yí (Nourishment)',
    symbol: '☶☳',
    trigrams: { upper: '震(雷)', lower: '艮(山)' },
    judgement: '贞吉。观颐，自求口实。',
    image: '山下有雷，颐；君子以慎言语，节饮食。',
    interpretation: '颐卦象征颐养、养育。如山雷相伴，滋养生息。此时应当注重修养，调养身心。适合休养生息，自我提升。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 27 is named 頤 (yí), “Swallowing”. Other variations include “the corners of the mouth (providing nourishment)”, “jaws” and “comfort/security”. Its inner trigram is ☳ (震 zhèn) shake = (雷) thunder, and its outer trigram is ☶ (艮 gèn) bound = (山) mountain.",
    judgementEn: "THE CORNERS OF THE MOUTH. Perseverance brings good fortune. Pay heed to the providing of nourishment And to what a man seeks To fill his own mouth with.",
    imageEn: "At the foot of the mountain, thunder: The image of PROVIDING NOURISHMENT. Thus, you should be careful of your words and temperate in eating and drinking.",
    unicodeName: "HEXAGRAM FOR MOUTH CORNERS",
  },
  {
    number: 28,
    name: '大过',
    nameEn: 'Dà Guò (Great Exceeding)',
    symbol: '☱☴',
    trigrams: { upper: '巽(风)', lower: '兑(泽)' },
    judgement: '栋桡，利有攸往，亨。',
    image: '泽灭木，大过；君子以独立不惧，遁世无闷。',
    interpretation: '大过卦象征过度、过分。如泽水淹没树木，负担过重。此时压力很大，需要减负。应当量力而行，不可勉强。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 28 is named 大過 (dà guò), “Great Exceeding”. Other variations include “preponderance of the great”, “great surpassing” and “critical mass”. Its inner trigram is ☴ (巽 xùn) ground = (風) wind, and its outer trigram is ☱ (兌 duì) open = (澤) swamp.",
    judgementEn: "PREPONDERANCE OF THE GREAT. The ridgepole sags to the breaking point. It furthers one to have somewhere to go. Success.",
    imageEn: "The lake rises above the trees: The image of PREPONDERANCE OF THE GREAT. When you stand alone, be unconcerned, and if you must renounce the world, be undaunted.",
    unicodeName: "HEXAGRAM FOR GREAT PREPONDERANCE",
  },
  {
    number: 29,
    name: '坎',
    nameEn: 'Kǎn (The Abysmal Water)',
    symbol: '☵☵',
    trigrams: { upper: '坎(水)', lower: '坎(水)' },
    judgement: '习坎，有孚，维心亨，行有尚。',
    image: '水洊至，习坎；君子以常德行，习教事。',
    interpretation: '坎卦象征险难、陷阱。如水流湍急，危险重重。此时遇到困难险阻，需要谨慎应对。保持信心，稳步前进，终能渡过难关。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 29 is named 坎 (kǎn), “Gorge”. Other variations include “the abyss” (in the oceanographic sense) and “repeated entrapment”. Its inner trigram is ☵ (坎 kǎn) gorge = (水) water, and its outer trigram is identical.",
    judgementEn: "THE ABYSMAL repeated. If you are sincere, you have success in your heart, And whatever you do succeeds.",
    imageEn: "Water flows on uninterruptedly and reaches its goal: The image of THE ABYSMAL (WATER). Walk in lasting virtue and carry on the business of teaching.",
    unicodeName: "HEXAGRAM FOR THE ABYSMAL WATER",
  },
  {
    number: 30,
    name: '离',
    nameEn: 'Lí (The Clinging Fire)',
    symbol: '☲☲',
    trigrams: { upper: '离(火)', lower: '离(火)' },
    judgement: '利贞，亨。畜牝牛，吉。',
    image: '明两作离，大人以继明照于四方。',
    interpretation: '离卦象征依附、光明。如双火重明，光照四方。此时应当附丽于正，追随光明。适合学习进步，依靠贤者。',
  },

  // 31-40
  {
    number: 31,
    name: '咸',
    nameEn: 'Xián (Influence)',
    symbol: '☱☶',
    trigrams: { upper: '艮(山)', lower: '兑(泽)' },
    judgement: '亨，利贞，取女吉。',
    image: '山上有泽，咸；君子以虚受人。',
    interpretation: '咸卦象征感应、感通。如山泽通气，相互感应。此时适合交流沟通，建立联系。感情方面尤其吉利，可成美满姻缘。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 30 is named 離 (lí), “Radiance”. Other variations include “the clinging, fire” and “the net”. Its inner trigram is ☲ (離 lí) radiance = (火) fire, and its outer trigram is identical. The origin of the character has its roots in symbols of long-tailed birds such as the peacock or the legendary phoenix.",
    judgementEn: "THE CLINGING. Perseverance furthers. It brings success. Care of the cow brings good fortune.",
    imageEn: "That which is bright rises twice: The image of FIRE. Thus, by perpetuating this brightness, you should illuminate the world.",
    unicodeName: "HEXAGRAM FOR THE CLINGING FIRE",
  },
  {
    number: 32,
    name: '恒',
    nameEn: 'Héng (Duration)',
    symbol: '☳☴',
    trigrams: { upper: '巽(风)', lower: '震(雷)' },
    judgement: '亨，无咎，利贞，利有攸往。',
    image: '雷风恒；君子以立不易方。',
    interpretation: '恒卦象征恒久、持久。如雷风相助，长久不变。此时应当坚持不懈，持之以恒。事业感情都要有恒心，不可三天打鱼两天晒网。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 32 is named 恆 (héng), “Persevering”. Other variations include “duration” and “constancy”. Its inner trigram is ☴ (巽 xùn) ground = (風) wind, and its outer trigram is ☳ (震 zhèn) shake = (雷) thunder.",
    judgementEn: "DURATION. Success. No blame. Progress without error through firm correctness. Movement in any direction is advantageous.",
    imageEn: "Thunder and wind: the image of DURATION. So stand firm and do not change direction.",
    unicodeName: "HEXAGRAM FOR DURATION",
  },
  {
    number: 33,
    name: '遁',
    nameEn: 'Dùn (Retreat)',
    symbol: '☰☶',
    trigrams: { upper: '艮(山)', lower: '乾(天)' },
    judgement: '亨，小利贞。',
    image: '天下有山，遁；君子以远小人，不恶而严。',
    interpretation: '遁卦象征退避、隐退。如山高天远，远离尘嚣。此时应当识时务者为俊杰，该退则退。不是软弱，而是战略性撤退。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 33 is named 遯 (dùn), “Retiring”. Other variations include “retreat”, “yielding”, Withdrawal, Retiring, Wielding, Strategic Withdrawal, Inaccessibility, Disassociation from Inferior Forces. Its inner trigram is ☶ (艮 gèn) bound = (山) mountain, and its outer trigram is ☰ (乾 qián) force = (天) heaven.",
    judgementEn: "RETREAT. Success. Advantage comes from firm correctness and attention to details.",
    imageEn: "Mountain under heaven: the image of RETREAT. Thus, you should keep people at a distance by dignified bearing rather than hostility.",
    unicodeName: "HEXAGRAM FOR RETREAT",
  },
  {
    number: 34,
    name: '大壮',
    nameEn: 'Dà Zhuàng (Great Power)',
    symbol: '☳☰',
    trigrams: { upper: '乾(天)', lower: '震(雷)' },
    judgement: '利贞。',
    image: '雷在天上，大壮；君子以非礼弗履。',
    interpretation: '大壮卦象征强壮、威武。如雷震天上，声势浩大。此时力量强大，可以进取。但要谨防过刚易折，保持谦虚谨慎。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 34 is named 大壯 (dà zhuàng), “Great Invigorating”. Other variations include “the power of the great”, great maturity. Its inner trigram is ☰ (乾 qián) force = (天) heaven, and its outer trigram is ☳ (震 zhèn) shake = (雷) thunder.",
    judgementEn: "GREAT POWER necessitates firm correctness.",
    imageEn: "Thunder in heaven above: The image of THE POWER OF THE GREAT. Do not take any step that is not in accordance with propriety.",
    unicodeName: "HEXAGRAM FOR GREAT POWER",
  },
  {
    number: 35,
    name: '晋',
    nameEn: 'Jìn (Progress)',
    symbol: '☲☷',
    trigrams: { upper: '坤(地)', lower: '离(火)' },
    judgement: '康侯用锡马蕃庶，昼日三接。',
    image: '明出地上，晋；君子以自昭明德。',
    interpretation: '晋卦象征晋升、进步。如太阳升起，光明渐显。此时运势上升，可以进取。适合晋升发展，扩大事业，但要稳扎稳打。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 35 is named 晉 (jìn), “Prospering”. Other variations include “progress” and “aquas”. Its inner trigram is ☷ (坤 kūn) field = (地) earth, and its outer trigram is ☲ (離 lí) radiance = (火) fire.",
    judgementEn: "PROGRESS. The powerful prince is honored with horses in large numbers. In a single day he is granted audience three times.",
    imageEn: "The sun rises over the earth: The image of PROGRESS. Thus, you should increase the brightness of your bright virtue.",
    unicodeName: "HEXAGRAM FOR PROGRESS",
  },
  {
    number: 36,
    name: '明夷',
    nameEn: 'Míng Yí (Darkening of Light)',
    symbol: '☷☲',
    trigrams: { upper: '离(火)', lower: '坤(地)' },
    judgement: '利艰贞。',
    image: '明入地中，明夷；君子以莅众，用晦而明。',
    interpretation: '明夷卦象征光明受损、受伤。如太阳入地，光明隐没。此时遭遇困境，应当韬光养晦。暂时隐忍，等待时机。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 36 is named 明夷 (míng yí), “Darkening of the Light”. Other variations include “brilliance injured” and “intelligence hidden”. Its inner trigram is ☲ (離 lí) radiance = (火) fire, and its outer trigram is ☷ (坤 kūn) field = (地) earth.",
    judgementEn: "DARKENING OF THE LIGHT. Be aware of the difficulty of your position.",
    imageEn: "The light has sunk into the earth: The image of DARKENING OF THE LIGHT. Thus, veil your light yet still shine.",
    unicodeName: "HEXAGRAM FOR DARKENING OF THE LIGHT",
  },
  {
    number: 37,
    name: '家人',
    nameEn: 'Jiā Rén (The Family)',
    symbol: '☴☲',
    trigrams: { upper: '离(火)', lower: '巽(风)' },
    judgement: '利女贞。',
    image: '风自火出，家人；君子以言有物而行有恒。',
    interpretation: '家人卦象征家庭、家族。如风火相依，家庭和睦。此时应当注重家庭关系，和睦相处。家和万事兴，先齐家才能治国平天下。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 37 is named 家人 (jiā rén), “Dwelling People”. Other variations include “the family (the clan)”, “family members”, Family Life, Clan, Home, Linkage, The Psyche. Its inner trigram is ☲ (離 lí) radiance = (火) fire, and its outer trigram is ☴ (巽 xùn) ground = (風) wind.",
    judgementEn: "THE FAMILY. Perseverance.",
    imageEn: "Wind comes forth from fire: The image of THE FAMILY. Thus, you should speak the truth and be consistent in your behaviour.",
    unicodeName: "HEXAGRAM FOR THE FAMILY",
  },
  {
    number: 38,
    name: '睽',
    nameEn: 'Kuí (Opposition)',
    symbol: '☲☱',
    trigrams: { upper: '兑(泽)', lower: '离(火)' },
    judgement: '小事吉。',
    image: '上火下泽，睽；君子以同而异。',
    interpretation: '睽卦象征乖离、对立。如火泽相背，方向不同。此时有矛盾分歧，需要求同存异。小事可成，大事需谨慎。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 38 is named 睽 (kuí), “Mutual Alienation”. Other variations include “opposition”, Polarising, The Symbol of Strangeness and Disunion, The Estranged, Opposites, Polarizing, Alienation, Distant From, Perversion, Disharmony, Separated, Contradiction, Estrangement, Incongruity . Its inner trigram is ☱ (兌 duì) open = (澤) swamp, and its outer trigram is ☲ (離 lí) radiance = (火) fire.",
    judgementEn: "OPPOSITION. In small matters, good fortune.",
    imageEn: "Above, fire; below. The lake, the image of OPPOSITION. Accept the diversities which make up the whole.",
    unicodeName: "HEXAGRAM FOR OPPOSITION",
  },
  {
    number: 39,
    name: '蹇',
    nameEn: 'Jiǎn (Obstruction)',
    symbol: '☵☶',
    trigrams: { upper: '艮(山)', lower: '坎(水)' },
    judgement: '利西南，不利东北；利见大人，贞吉。',
    image: '山上有水，蹇；君子以反身修德。',
    interpretation: '蹇卦象征艰难、困顿。如山上有水，前进困难。此时遇到障碍，不宜冒进。应当反思自省，修养德行，等待转机。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 39 is named 蹇 (jiǎn), “Limping”. Other variations include “obstruction” and “afoot”. Its inner trigram is ☶ (艮 gèn) bound = (山) mountain, and its outer trigram is ☵ (坎 kǎn) gorge = (水) water.",
    judgementEn: "During an Impasse advantage is found in the southwest, disadvantage in the northeast. See the great man. Firm correctness brings good fortune.",
    imageEn: "Water on the mountain: The image of OBSTRUCTION. Thus turn your attention to yourself and mould your character.",
    unicodeName: "HEXAGRAM FOR OBSTRUCTION",
  },
  {
    number: 40,
    name: '解',
    nameEn: 'Jiě (Deliverance)',
    symbol: '☳☵',
    trigrams: { upper: '坎(水)', lower: '震(雷)' },
    judgement: '利西南，无所往，其来复吉。有攸往，夙吉。',
    image: '雷雨作，解；君子以赦过宥罪。',
    interpretation: '解卦象征解脱、解除。如雷雨过后，天地清新。此时困境解除，压力缓解。适合解决问题，化解矛盾，但要宽容待人。',
  },

  // 41-50
  {
    number: 41,
    name: '损',
    nameEn: 'Sǔn (Decrease)',
    symbol: '☶☱',
    trigrams: { upper: '兑(泽)', lower: '艮(山)' },
    judgement: '有孚，元吉，无咎，可贞，利有攸往。曷之用，二簋可用享。',
    image: '山下有泽，损；君子以惩忿窒欲。',
    interpretation: '损卦象征减损、克制。如山下有泽，水土流失。此时应当节制欲望，减少消耗。损己利人，舍得舍得，有舍才有得。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 40 is named 解 (jiě), “Liberation”. Other variations include Deliverance, The Symbol of Loosening, Release, Eliminating Obstacles, Taking-apart, Untangled, Solution, Dissolution, Relief, Unloose, Release of Tension. Its inner trigram is ☵ (坎 kǎn) gorge = (水) water, and its outer trigram is ☳ (震 zhèn) shake = (雷) thunder.",
    judgementEn: "Liberation finds advantage in the southwest. When the operation is completed, a return to stability brings good fortune. If operations are incomplete, it is best to finish them quickly.",
    imageEn: "Thunder and rain set in: The image of DELIVERANCE. In accordance with this, forgive errors and deal gently with misdeeds.",
    unicodeName: "HEXAGRAM FOR DELIVERANCE",
  },
  {
    number: 42,
    name: '益',
    nameEn: 'Yì (Increase)',
    symbol: '☴☳',
    trigrams: { upper: '震(雷)', lower: '巽(风)' },
    judgement: '利有攸往，利涉大川。',
    image: '风雷益；君子以见善则迁，有过则改。',
    interpretation: '益卦象征增益、增加。如风雷相助,互相增益。此时运势上升，可获利益。适合发展扩张，但要利益他人，才能真正受益。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 42 is named 益 (yì), “Increase”. Other variations include The Symbol of Addition, Gain, Augmenting, Help from Above, Benefit, Advantage, Profit, Expansion. Its inner trigram is ☳ (震 zhèn) shake = (雷) thunder, and its outer trigram is ☴ (巽 xùn) ground = (風) wind.",
    judgementEn: "INCREASE. There is advantage in every movement which shall be undertaken, it will even be advantageous to cross the great river.",
    imageEn: "Wind and thunder: the image of INCREASE. Thus, if you perceive good move toward it and when you perceive your own faults, eliminate them.",
    unicodeName: "HEXAGRAM FOR INCREASE",
  },
  {
    number: 43,
    name: '夬',
    nameEn: 'Guài (Breakthrough)',
    symbol: '☱☰',
    trigrams: { upper: '乾(天)', lower: '兑(泽)' },
    judgement: '扬于王庭，孚号有厉，告自邑，不利即戎，利有攸往。',
    image: '泽上于天，夬；君子以施禄及下，居德则忌。',
    interpretation: '夬卦象征决断、突破。如泽水上天，决堤而出。此时应当果断决策，不可犹豫。但要刚中有柔，避免过于激进。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 43 is named 夬 (guài), “Displacement”. Other variations include “resoluteness”, “parting”, and “break-through”. Its inner trigram is ☰ (乾 qián) force = (天) heaven, and its outer trigram is ☱ (兌 duì) open = (澤) swamp.",
    judgementEn: "BREAKTHROUGH. Recognizing the risks involved in criminal prosecution, justice demands a resolute proof of the culprit's guilt in courts. Inform the city that armed force is not necessary. In this way progress is assured.",
    imageEn: "The lake has risen up to heaven: The image of BREAKTHROUGH. In accordance with this, you should not hoard your wealth, but shares it with others",
    unicodeName: "HEXAGRAM FOR BREAKTHROUGH",
  },
  {
    number: 44,
    name: '姤',
    nameEn: 'Gòu (Coming to Meet)',
    symbol: '☰☴',
    trigrams: { upper: '巽(风)', lower: '乾(天)' },
    judgement: '女壮，勿用取女。',
    image: '天下有风，姤；后以施命诰四方。',
    interpretation: '姤卦象征相遇、邂逅。如风行天下，不期而遇。此时有意外相遇，但要谨慎对待。不可被表面现象迷惑，要明察秋毫。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 44 is named 姤 (gòu), “Temptation”. Other variations include Coming to Meet, The Symbol of Meeting, Contact, Encountering, Coupling, Adultery. Its inner trigram is ☴ (巽 xùn) ground = (風) wind, and its outer trigram is ☰ (乾 qián) force = (天) heaven.",
    judgementEn: "COMING TO MEET a woman who is bold and strong. It will not be good to marry her.",
    imageEn: "Under heaven, wind: The image of Temptation. The sovereign delivers his charges, and promulgates his announcements throughout the four quarters of the kingdom.",
    unicodeName: "HEXAGRAM FOR COMING TO MEET",
  },
  {
    number: 45,
    name: '萃',
    nameEn: 'Cuì (Gathering Together)',
    symbol: '☱☷',
    trigrams: { upper: '坤(地)', lower: '兑(泽)' },
    judgement: '亨。王假有庙，利见大人，亨，利贞。用大牲吉，利有攸往。',
    image: '泽上于地，萃；君子以除戎器，戒不虞。',
    interpretation: '萃卦象征聚集、汇聚。如泽水汇于地上，万物聚集。此时人气旺盛，可以聚众成事。适合召集团队，凝聚力量。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 45 is named 萃 (cuì), “Clustering”. Other variations include “Gathering Together (Contraction)” and “finished”. Its inner trigram is ☷ (坤 kūn) field = (地) earth, and its outer trigram is ☱ (兌 duì) open = (澤) swamp.",
    judgementEn: "GATHERING TOGETHER. Success. For successful progress maintain firm correctness. A large sacrifice brings good fortune, proceed toward your destination.",
    imageEn: "Over the earth, the lake: The image of GATHERING TOGETHER. Thus, you should gather your weapons in readiness for the unexpected.",
    unicodeName: "HEXAGRAM FOR GATHERING TOGETHER",
  },
  {
    number: 46,
    name: '升',
    nameEn: 'Shēng (Pushing Upward)',
    symbol: '☷☴',
    trigrams: { upper: '巽(风)', lower: '坤(地)' },
    judgement: '元亨，用见大人，勿恤，南征吉。',
    image: '地中生木，升；君子以顺德，积小以高大。',
    interpretation: '升卦象征上升、晋升。如木生于地，向上生长。此时运势上升，步步高升。适合晋升发展，但要脚踏实地，积少成多。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 46 is named 升 (shēng), “Pushing Upward”. Other variations include Rising and Advancing, Ascending, Ascension, Rising, Promotion, Advancement, Sprouting from the Earth, Organic Growth. Its inner trigram is ☴ (巽 xùn) ground = (風) wind, and its outer trigram is ☷ (坤 kūn) field = (地) earth.",
    judgementEn: "PUSHING UPWARD means successful progress. Have no anxiety about meeting with important people. An advance to the south is fortunate.",
    imageEn: "Within the earth, wood grows: The image of PUSHING UPWARD. You should accumulate small things until they become significant.",
    unicodeName: "HEXAGRAM FOR PUSHING UPWARD",
  },
  {
    number: 47,
    name: '困',
    nameEn: 'Kùn (Oppression)',
    symbol: '☱☵',
    trigrams: { upper: '坎(水)', lower: '兑(泽)' },
    judgement: '亨，贞，大人吉，无咎，有言不信。',
    image: '泽无水，困；君子以致命遂志。',
    interpretation: '困卦象征困境、穷困。如泽中无水，陷入困境。此时处境艰难，需要坚持。保持信念，困境终将过去，守得云开见月明。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 47 is named 困 (kùn), “Confining”. Other variations include “oppression (exhaustion)” and “entangled”. Its inner trigram is ☵ (坎 kǎn) gorge = (水) water, and its outer trigram is ☱ (兌 duì) open = (澤) swamp.",
    judgementEn: "OPPRESSION. Successful progress is still possible. The perseverance of the truly great brings good fortune without error; but if you rely on words, no one will believe them.",
    imageEn: "There is not water in the lake: The image of EXHAUSTION. Be prepared to sacrifice your life to attain your purpose.",
    unicodeName: "HEXAGRAM FOR OPPRESSION",
  },
  {
    number: 48,
    name: '井',
    nameEn: 'Jǐng (The Well)',
    symbol: '☵☴',
    trigrams: { upper: '巽(风)', lower: '坎(水)' },
    judgement: '改邑不改井，无丧无得，往来井井。汔至亦未繘井，羸其瓶，凶。',
    image: '木上有水，井；君子以劳民劝相。',
    interpretation: '井卦象征水井、源泉。如木桶汲水，源源不断。此时应当保持本源，服务他人。事业稳定，但需要维护和改善。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 48 is named 井 (jǐng), “The Well”. Other variations include Welling, Potentialities Fulfilled, The Source, The Deep Psyche. Its inner trigram is ☴ (巽 xùn) ground = (風) wind, and its outer trigram is ☵ (坎 kǎn) gorge = (水) water.",
    judgementEn: "THE WELL. The town may be changed but The Well remains the same. Its water level neither disappears nor receives any great increase, and the people can draw from it freely. Misfortune ensues if the rope breaks or the bucket is broken before it reaches the water.",
    imageEn: "Water over wood: the image of THE WELL. Thus, you should comfort people and stimulate their mutual cooperation.",
    unicodeName: "HEXAGRAM FOR THE WELL",
  },
  {
    number: 49,
    name: '革',
    nameEn: 'Gé (Revolution)',
    symbol: '☲☱',
    trigrams: { upper: '兑(泽)', lower: '离(火)' },
    judgement: '己日乃孚，元亨利贞，悔亡。',
    image: '泽中有火，革；君子以治历明时。',
    interpretation: '革卦象征变革、改变。如水火相冲，旧去新来。此时需要变革创新，除旧布新。时机成熟可大胆改革，但要循序渐进。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 49 is named 革 (gé), “Metamorphosis”. Other variations include “Revolution (molting)” Transformation, Skinning, The Bridle, The Symbol of Change, Molting, Leather, Skin, Molt, Cut Off, Changing, Radical Change, Overthrowing. Its inner trigram is ☲ (離 lí) radiance = (火) fire, and its outer trigram is ☱ (兌 duì) open = (澤) swamp.",
    judgementEn: "Metamorphosis is believed in only after it has been accomplished. Firm correctness abolishes regret and brings successful progress.",
    imageEn: "Fire in the lake: the image of REVOLUTION. You should synchronise your astronomical calculations to clarify the times and seasons.",
    unicodeName: "HEXAGRAM FOR REVOLUTION",
  },
  {
    number: 50,
    name: '鼎',
    nameEn: 'Dǐng (The Caldron)',
    symbol: '☲☴',
    trigrams: { upper: '巽(风)', lower: '离(火)' },
    judgement: '元吉，亨。',
    image: '木上有火，鼎；君子以正位凝命。',
    interpretation: '鼎卦象征鼎器、稳固。如鼎之三足，稳定牢固。此时基础稳固，可以发展。适合建立制度，稳定局面，长远规划。',
  },

  // 51-60
  {
    number: 51,
    name: '震',
    nameEn: 'Zhèn (The Arousing Thunder)',
    symbol: '☳☳',
    trigrams: { upper: '震(雷)', lower: '震(雷)' },
    judgement: '亨。震来虩虩，笑言哑哑。震惊百里，不丧匕鬯。',
    image: '洊雷震；君子以恐惧修省。',
    interpretation: '震卦象征震动、惊恐。如雷声隆隆，惊心动魄。此时有突发事件，需要镇定应对。危机也是转机，要从中吸取教训。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 50 is named 鼎 (dǐng), “The Cauldron”. Other variations include The Sacrificial Vessel, Rejuvenation, Cosmic Order, The Alchemical Vessel. Its inner trigram is ☴ (巽 xùn) ground = (風) wind, and its outer trigram is ☲ (離 lí) radiance = (火) fire.",
    judgementEn: "THE CAULDRON. Great progress and success.",
    imageEn: "Fire over wood: The image of THE CAULDRON. Thus, you should maintain correctness in every situation.",
    unicodeName: "HEXAGRAM FOR THE CAULDRON",
  },
  {
    number: 52,
    name: '艮',
    nameEn: 'Gèn (Keeping Still Mountain)',
    symbol: '☶☶',
    trigrams: { upper: '艮(山)', lower: '艮(山)' },
    judgement: '艮其背，不获其身，行其庭，不见其人，无咎。',
    image: '兼山艮；君子以思不出其位。',
    interpretation: '艮卦象征停止、静止。如山岳稳重，静止不动。此时应当暂停行动，静观其变。守住本分，不可妄动，以静制动。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 52 is named 艮 (gèn), “Keeping Still”. Other variations include Mountain, The Symbol of Checking and Stopping, Desisting, Stilling, Stillness, Stoppage, Bound, Reposing, Resting, Meditation, Non-action, Stopping, Arresting Movement. Both its inner and outer trigrams are ☶ (艮 gèn) bound = (山) mountain.",
    judgementEn: "KEEPING STILL and losing all consciousness of self. When you walk in the courtyard and do not see people, there will be no error.",
    imageEn: "Mountains standing close together: The image of KEEPING STILL. Do not allow your thoughts to go beyond the duties of your immediate circumstances.",
    unicodeName: "HEXAGRAM FOR THE KEEPING STILL MOUNTAIN",
  },
  {
    number: 53,
    name: '渐',
    nameEn: 'Jiàn (Development)',
    symbol: '☴☶',
    trigrams: { upper: '艮(山)', lower: '巽(风)' },
    judgement: '女归吉，利贞。',
    image: '山上有木，渐；君子以居贤德善俗。',
    interpretation: '渐卦象征渐进、循序。如树木生长，循序渐进。此时应当稳步前进，不可急躁。感情婚姻尤其吉利，但要按部就班。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 53 is named 漸 (jiàn), “Infiltrating”. Other variations include “Development (gradual progress)”, Advancing, Growth, Developing, Gradualness, Dialectical Progression. Its inner trigram is ☶ (艮 gèn) bound = (山) mountain, and its outer trigram is ☴ (巽 xùn) ground = (風) wind.",
    judgementEn: "DEVELOPMENT shows the good fortune in attending the marriage of a young lady. Firm correctness brings advantage.",
    imageEn: "On the mountain, a tree: The image of DEVELOPMENT. Thus, you should attain and nourish extraordinary virtue to improve the manners of the people.",
    unicodeName: "HEXAGRAM FOR DEVELOPMENT",
  },
  {
    number: 54,
    name: '归妹',
    nameEn: 'Guī Mèi (The Marrying Maiden)',
    symbol: '☳☱',
    trigrams: { upper: '兑(泽)', lower: '震(雷)' },
    judgement: '征凶，无攸利。',
    image: '泽上有雷，归妹；君子以永终知敝。',
    interpretation: '归妹卦象征出嫁、归属。如少女出嫁，新的开始。此时要谨慎选择，不可草率。感情上要理智对待，避免冲动。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 54 is named 歸妹 (guī mèi), “Propriety”. Other variations include “the marrying maiden” and “returning maiden”. Its inner trigram is ☱ (兌 duì) open = (澤) swamp, and its outer trigram is ☳ (震 zhèn) shake = (雷) thunder.",
    judgementEn: "Propriety indicates that action will be evil, and in no way advantageous.",
    imageEn: "Thunder over the lake: The image of PROPRIETY. Thus, you should have regard for the far-distant end, and know the mischief that may be done at the beginning.",
    unicodeName: "HEXAGRAM FOR THE MARRYING MAIDEN",
  },
  {
    number: 55,
    name: '丰',
    nameEn: 'Fēng (Abundance)',
    symbol: '☳☲',
    trigrams: { upper: '离(火)', lower: '震(雷)' },
    judgement: '亨。王假之，勿忧，宜日中。',
    image: '雷电皆至，丰；君子以折狱致刑。',
    interpretation: '丰卦象征丰盛、盛大。如雷电齐发，盛大辉煌。此时运势旺盛，事业兴旺。但盛极必衰，要居安思危，保持谦虚。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 55 is named 豐 (fēng), “Abundance”. Other variations include Fullness, The Symbol of Prosperity, Greatness, Abounding, Richness, Prolific, Fruitful, Luxuriant, Zenith, Affluence, Correct Action, Lucid Behavior. Its inner trigram is ☲ (離 lí) radiance = (火) fire, and its outer trigram is ☳ (震 zhèn) shake = (雷) thunder.",
    judgementEn: "ABUNDANCE has success, progress and development. When the king is enlightened there is no need to fear change. Let him be as the sun at noon.",
    imageEn: "Both thunder and lightning come: The image of ABUNDANCE. Thus, you should decide carefully on judgements and apportion punishment with exactness.",
    unicodeName: "HEXAGRAM FOR ABUNDANCE",
  },
  {
    number: 56,
    name: '旅',
    nameEn: 'Lǚ (The Wanderer)',
    symbol: '☲☶',
    trigrams: { upper: '艮(山)', lower: '离(火)' },
    judgement: '小亨，旅贞吉。',
    image: '山上有火，旅；君子以明慎用刑而不留狱。',
    interpretation: '旅卦象征旅行、漂泊。如山上之火，不得安宁。此时居无定所，需要谨慎。小心行事，保持警惕，异乡求财需低调。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 56 is named 旅 (lǚ), “Transition”. Other variations include The Wanderer, The Symbol of the Traveler, The Exile, Sojourning, The Newcomer, To Lodge, Travelling, The Stranger, The Traveling Stranger, The Outsider, Wandering, Uncommitted. Its inner trigram is ☶ (艮 gèn) bound = (山) mountain, and its outer trigram is ☲ (離 lí) radiance = (火) fire.",
    judgementEn: "TRANSITION means that small attainments are possible. If the traveling stranger is firm and correct, there will be good fortune.",
    imageEn: "Fire on the mountain: The image of THE WANDERER. Thus, you should exert cautious wisdom in punishments, and do not permit prolonged litigation.",
    unicodeName: "HEXAGRAM FOR THE WANDERER",
  },
  {
    number: 57,
    name: '巽',
    nameEn: 'Xùn (The Gentle Wind)',
    symbol: '☴☴',
    trigrams: { upper: '巽(风)', lower: '巽(风)' },
    judgement: '小亨，利有攸往，利见大人。',
    image: '随风巽；君子以申命行事。',
    interpretation: '巽卦象征顺从、温和。如风吹万物，无孔不入。此时应当顺应形势，柔顺行事。不可强硬对抗，以柔克刚更有效。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 57 is named 巽 (xùn), “Ground”. Other variations include “the gentle (the penetrating, wind)” and “calculations”. Both its inner and outer trigrams are ☴ (巽 xùn) ground = (風) wind.",
    judgementEn: "THE GENTLE. Modest success. Look for important people and move in the direction that implies.",
    imageEn: "Wind following wind upon the other: You should articulate your directions and undertakes your work.",
    unicodeName: "HEXAGRAM FOR THE GENTLE WIND",
  },
  {
    number: 58,
    name: '兑',
    nameEn: 'Duì (The Joyous Lake)',
    symbol: '☱☱',
    trigrams: { upper: '兑(泽)', lower: '兑(泽)' },
    judgement: '亨，利贞。',
    image: '丽泽兑；君子以朋友讲习。',
    interpretation: '兑卦象征喜悦、愉快。如两泽相连，欢乐和谐。此时心情愉快，诸事顺利。适合交友聚会，但要保持真诚，不可虚情假意。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 58 is named 兌 (duì), “Joy”. Other variations include The Joyous, Joyousness, Pleased Satisfaction, Encouraging, Delight, Open, Usurpation, Self-indulgence, Pleasure, Cheerfulness, Frivolity, Callow Optimism. Both its inner and outer trigrams are ☱ (兌 duì) open = (澤) swamp.",
    judgementEn: "JOY intimates that under its conditions there will be progress and attainment, but it will be advantageous to be firm and correct.",
    imageEn: "Lakes resting one on the other: The image of JOY. Thus, you should encourage the conversation of friends and the stimulus of their common practice.",
    unicodeName: "HEXAGRAM FOR THE JOYOUS LAKE",
  },
  {
    number: 59,
    name: '涣',
    nameEn: 'Huàn (Dispersion)',
    symbol: '☴☵',
    trigrams: { upper: '坎(水)', lower: '巽(风)' },
    judgement: '亨。王假有庙，利涉大川，利贞。',
    image: '风行水上，涣；先王以享于帝立庙。',
    interpretation: '涣卦象征涣散、分散。如风吹水面，波纹四散。此时需要凝聚人心，团结力量。适合化解矛盾，消除隔阂。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 59 is named 渙 (huàn), “Expansion (Dispersion)”. Other variations include Dissolution, Disintegration, Dispersal, Overcoming Dissension, Scattering, Dispersing, Unintegrated, Reuniting, Evaporation, Reorganization. Its inner trigram is ☵ (坎 kǎn) gorge = (水) water, and its outer trigram is ☴ (巽 xùn) ground = (風) wind.",
    judgementEn: "DISPERSION intimates that there will be progress and success. The king goes to his ancestral temple. It will be advantageous to cross the great river. It will be advantageous to be firm and correct.",
    imageEn: "The wind drives over the water: The image of EXPANSION. The ancient kings, in accordance with this, presented offerings to God and established the ancestral temple.",
    unicodeName: "HEXAGRAM FOR DISPERSION",
  },
  {
    number: 60,
    name: '节',
    nameEn: 'Jié (Limitation)',
    symbol: '☵☱',
    trigrams: { upper: '兑(泽)', lower: '坎(水)' },
    judgement: '亨。苦节不可贞。',
    image: '泽上有水，节；君子以制数度，议德行。',
    interpretation: '节卦象征节制、限度。如泽水有节，不可过满。此时应当把握分寸，适可而止。凡事有度，过犹不及，节俭持家方能长久。',
  },

  // 61-64
  {
    number: 61,
    name: '中孚',
    nameEn: 'Zhōng Fú (Inner Truth)',
    symbol: '☴☱',
    trigrams: { upper: '兑(泽)', lower: '巽(风)' },
    judgement: '豚鱼吉，利涉大川，利贞。',
    image: '泽上有风，中孚；君子以议狱缓死。',
    interpretation: '中孚卦象征诚信、忠诚。如风吹泽面，彼此感应。此时应当以诚待人，真诚相待。信誉第一，诚信为本，必能感动他人。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 60 is named 節 (jié), “Limitation”. Other variations include Restraint, Regulations, Articulating, Receipt, Restraining, Containment. Its inner trigram is ☱ (兌 duì) open = (澤) swamp, and its outer trigram is ☵ (坎 kǎn) gorge = (水) water.",
    judgementEn: "LIMITATION bring progress and success, but if they are severe and difficult they cannot be permanent.",
    imageEn: "Water over lake: the image of LIMITATION. You should construct methods of numbering and measurement, and examine the nature of virtuous conduct.",
    unicodeName: "HEXAGRAM FOR LIMITATION",
  },
  {
    number: 62,
    name: '小过',
    nameEn: 'Xiǎo Guò (Small Exceeding)',
    symbol: '☳☶',
    trigrams: { upper: '艮(山)', lower: '震(雷)' },
    judgement: '亨，利贞，可小事，不可大事。飞鸟遗之音，不宜上宜下，大吉。',
    image: '山上有雷，小过；君子以行过乎恭，丧过乎哀，用过乎俭。',
    interpretation: '小过卦象征小有过越。如雷在山上，声音向下。此时只宜做小事，不宜大举。谦虚低调，向下看齐，反而能获得好运。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 62 is named 小過 (xiǎo guò), “Small Powers”. Other variations include Preponderance of the Small, The Symbol of Excess in Small Things, The Small get by, Slight Excess, Small Exceeding, Small Surpassing, Excess of the Small, Small gains, Conscientiousness, Smallness in Excess, Exceeding the Mean, Proliferation of Details. Its inner trigram is ☶ (艮 gèn) bound = (山) mountain, and its outer trigram is ☳ (震 zhèn) shake = (雷) thunder.",
    judgementEn: "PREPONDERANCE OF THE SMALL. Success. There will be progress and attainment in small affairs, but not in great affairs. It will be advantageous to be firm and correct. It is like the song of a flying bird: It is better to descend than to ascend. In this way there will be good fortune.",
    imageEn: "Thunder on the mountain: The image of PREPONDERANCE OF THE SMALL. Thus, in your conduct exceed in humility, in mourning exceed in sorrow, and in expenditure exceed in economy.",
    unicodeName: "HEXAGRAM FOR SMALL PREPONDERANCE",
  },
  {
    number: 63,
    name: '既济',
    nameEn: 'Jì Jì (After Completion)',
    symbol: '☵☲',
    trigrams: { upper: '离(火)', lower: '坎(水)' },
    judgement: '亨，小利贞，初吉终乱。',
    image: '水在火上，既济；君子以思患而预防之。',
    interpretation: '既济卦象征成功完成、圆满。如水火相济，阴阳调和。此时事情已经完成，达到顶峰。但要居安思危，盛极必衰，需要谨慎守成。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 63 is named 既濟 (jì jì), “Completion”. Other variations include After Completion, The Symbol of What is Already Past, Already Fording, Already Completed, Settled, Mission Accomplished, Tasks Completed. Its inner trigram is ☲ (離 lí) radiance = (火) fire, and its outer trigram is ☵ (坎 kǎn) gorge = (水) water.",
    judgementEn: "COMPLETION intimates progress and success in small matters. There is advantage in firm correctness. There has been good fortune in the beginning; there may be disorder in the end.",
    imageEn: "Water over fire: the image of the condition in COMPLETION. Thus, you should think of the difficulties that may come, and guard against them in advance.",
    unicodeName: "HEXAGRAM FOR AFTER COMPLETION",
  },
  {
    number: 64,
    name: '未济',
    nameEn: 'Wèi Jì (Before Completion)',
    symbol: '☲☵',
    trigrams: { upper: '坎(水)', lower: '离(火)' },
    judgement: '亨，小狐汔济，濡其尾，无攸利。',
    image: '火在水上，未济；君子以慎辨物居方。',
    interpretation: '未济卦象征未完成、待续。如火在水上，尚未融合。此时事情尚未完成，还需努力。前途充满希望，但要坚持到底。周而复始，结束即是新的开始。',
  
    // English translations (from i-ching.el)
    descriptionEn: "Hexagram 64 is named 未濟 (wèi jì), “Before Completion”. Other variations include Unfinished Business, Not-yet Fording, Not Yet Completed, Tasks yet to be Completed, Before the End, A State of Transition . Its inner trigram is ☵ (坎 kǎn) gorge = (水) water, and its outer trigram is ☲ (離 lí) radiance = (火) fire.",
    judgementEn: "BEFORE COMPLETION. Success. But if the young fox, that has nearly crossed the stream, gets his tail wet there will be no advantage.",
    imageEn: "The image of the condition before transition. Thus, you should carefully discriminate among the qualities of things, so that each can find its place.",
    unicodeName: "HEXAGRAM FOR BEFORE COMPLETION",
  },
];

// Helper functions
export function getHexagram(number: number): Hexagram | undefined {
  return HEXAGRAMS.find(h => h.number === number);
}

export function getHexagramName(number: number): string {
  const hexagram = getHexagram(number);
  return hexagram ? hexagram.name : '';
}

export function getAllHexagrams(): Hexagram[] {
  return HEXAGRAMS;
}
