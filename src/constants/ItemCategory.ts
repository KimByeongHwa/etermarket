const firstCategory = [
  { value: 'weapon', text: '무기' },
  { value: 'armor', text: '방어구' },
  { value: 'accessory', text: '장신구' },
  { value: 'costume', text: '코스튬' },
  { value: 'wing', text: '날개' },
  { value: 'el', text: 'EL' },
  { value: 'etc', text: '기타' },
];

const clCategory = [
  { value: 'cl', text: 'CL' },
  { value: 'noncl', text: 'NonCL' },
];

const gradeCategory = [
  { value: '1', text: '1등급' },
  { value: '2', text: '2등급' },
  { value: '3', text: '3등급' },
  { value: '4', text: '4등급' },
  { value: '5', text: '5등급' },
  { value: '6', text: '6등급' },
  { value: '7', text: '7등급' },
  { value: '8', text: '8등급' },
  { value: '9', text: '9등급' },
  { value: '10', text: '10등급' },
  { value: '11', text: '11등급' },
  { value: '12', text: '12등급' },
];

const illegalCategory = [
  { value: 'legal', text: '합법 무기' },
  { value: 'illegal', text: '불법 무기' },
];

const weaponDistanceCategory = [
  { value: 'short', text: '근거리 무기' },
  { value: 'long', text: '원거리 무기' },
];

const shortWeponCategory = [
  { value: 'sword', text: '도검' },
  { value: 'hammer', text: '해머(둔기)' },
  { value: 'axe', text: '도끼' },
  { value: 'scythe', text: '낫(미늘창)' },
  { value: 'spear', text: '창(장창)' },
];

const longWeaponCategory = [
  { value: 'smg', text: '기관단총' },
  { value: 'rifle', text: '돌격소총' },
  { value: 'support', text: '지원화기' },
  { value: 'special', text: '특수화기' },
  { value: 'heavy', text: '중화기' },
  { value: 'shotgun', text: '샷건' },
  { value: 'sniper', text: '저격소총' },
  { value: 'pistol', text: '권총' },
];

const categories = {
  firstCategory,
  clCategory,
  gradeCategory,
  illegalCategory,
  weaponDistanceCategory,
  shortWeponCategory,
  longWeaponCategory,
};

export default categories;
