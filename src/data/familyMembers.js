export const familyMembers = {
  vi: {
    name: 'vi',
    label: 'vi',
    emoji: '🌊',
    role: 'organizzazione',
    color: '#8FAE8B',
    background: '#EDF4EA',
  },
  marti: {
    name: 'marti',
    label: 'marti',
    emoji: '🌸',
    role: 'supporto',
    color: '#C995A8',
    background: '#F8EAF0',
  },
  isa: {
    name: 'isa',
    label: 'isa',
    emoji: '☀️',
    role: 'casa',
    color: '#D7A85B',
    background: '#FFF3D9',
  },
  dav: {
    name: 'dav',
    label: 'dav',
    emoji: '🌿',
    role: 'commissioni',
    color: '#7C9C8D',
    background: '#E8F3EE',
  },
  tutti: {
    name: 'tutti',
    label: 'tutti',
    emoji: '🏡',
    role: 'famiglia',
    color: '#8C7A6B',
    background: '#F4ECE3',
  },
}

export const familyMemberList = Object.values(familyMembers)

export function getFamilyMember(name) {
  return familyMembers[name] || familyMembers.tutti
}
