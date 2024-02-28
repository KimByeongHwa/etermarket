const firstCategory = [
  { text: '무기', value: 'weapon' },
  { text: '방어구', value: 'armor' },
  { text: '장신구', value: 'accessories' },
  { text: '벨트', value: 'belt' },
  { text: '토이', value: 'toy' },
  { text: '타로', value: 'tarot' },
  { text: '코스튬', value: 'costume' },
  { text: '날개', value: 'wing' },
  { text: '기타', value: 'etc' },
];

const clCategory = [
  { text: 'CL', value: 'cl' },
  { text: 'NonCL', value: 'noncl' },
];

const gradeCategory = [
  { text: '1등급', value: '1' },
  { text: '2등급', value: '2' },
  { text: '3등급', value: '3' },
  { text: '4등급', value: '4' },
  { text: '5등급', value: '5' },
  { text: '6등급', value: '6' },
  { text: '7등급', value: '7' },
  { text: '8등급', value: '8' },
  { text: '9등급', value: '9' },
  { text: '10등급', value: '10' },
  { text: '11등급', value: '11' },
  { text: '12등급', value: '12' },
];

const weaponDistanceCategory = [
  { text: '근거리 무기', value: 'short' },
  { text: '원거리 무기', value: 'long' },
];

const shortWeponCategory = [
  { text: '도검', value: 'sword' },
  { text: '해머', value: 'hammer' },
  { text: '도끼', value: 'axe' },
  { text: '낫', value: 'scythe' },
  { text: '창', value: 'spear' },
];

const longWeaponCategory = [
  { text: '기관단총', value: 'smg' },
  { text: '돌격소총', value: 'rifle' },
  { text: '지원화기', value: 'support' },
  { text: '특수화기', value: 'special' },
  { text: '중화기', value: 'heavy' },
  { text: '샷건', value: 'shotgun' },
  { text: '저격소총', value: 'sniper' },
  { text: '권총', value: 'pistol' },
];

const legalCategory = [
  { text: '합법 무기', value: 'legal' },
  { text: '불법 무기', value: 'illegal' },
];

const armorCategory = [
  { text: '휴먼셋', value: 'human' },
  { text: '변이옷', value: 'mutant' },
];

const genderCategory = [
  { text: '男', value: 'man' },
  { text: '女', value: 'woman' },
];

const categories = {
  firstCategory,
  clCategory,
  gradeCategory,
  weaponDistanceCategory,
  shortWeponCategory,
  longWeaponCategory,
  legalCategory,
  armorCategory,
  genderCategory,
};

export default categories;
