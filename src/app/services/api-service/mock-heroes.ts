import { MarvelHeroModel } from '../../models/marvel-hero.model';

export const HEROES_MOCK: MarvelHeroModel[] = [
  {
    id: 'dcc0be92-7569-4e3d-b6e9-4d2ac7d63a27',
    nameLabel: 'Anya Corazon',
    genderLabel: 'female',
    citizenshipLabel: 'United States of America',
    skillsLabel: 'superhuman strength',
    occupationLabel: 'student',
    memberOfLabel: 'The Spider Society',
    creatorLabel: 'Fiona Avery',
  },
  {
    id: 'ee7c7a18-fd4f-4027-9ad9-1edeadff003c',
    nameLabel: 'Banshee',
    genderLabel: 'male',
    citizenshipLabel: 'Ireland',
    skillsLabel: 'sonic scream',
    occupationLabel: 'criminal',
    memberOfLabel: 'Interpol',
    creatorLabel: 'Roy Thomas',
  },
  {
    id: 'ee7c7a18-7777-7777-9ad9-1edeadff003c',
    nameLabel: 'Captain America',
    genderLabel: 'male',
    citizenshipLabel: 'United States of America',
    skillsLabel: 'superhuman strength',
    occupationLabel: 'soldier',
    memberOfLabel: 'United States Army',
    creatorLabel: 'Jack Kirby',
  },
  {
    id: 'ee7c7a18-fd4f-6897-9ad9-1edeadff003d',
    nameLabel: 'Blob',
    genderLabel: 'male',
    citizenshipLabel: 'United States of America',
    skillsLabel: 'superhuman strength',
    occupationLabel: 'criminal',
    memberOfLabel: 'Brotherhood of Mutants',
    creatorLabel: 'Stan Lee',
  },
];

export const NEW_HERO_MOCK: MarvelHeroModel = new MarvelHeroModel({
  nameLabel: 'New Hero',
  genderLabel: 'female',
  citizenshipLabel: 'United States of America',
  skillsLabel: 'superhuman strength',
  occupationLabel: 'student',
  memberOfLabel: 'New Society',
  creatorLabel: 'New Creator',
});

export const HERO_TO_UPDATE_MOCK: MarvelHeroModel = {
  id: 'ee7c7a18-fd4f-4027-9ad9-1edeadff003c',
  nameLabel: 'Banshee',
  genderLabel: 'male',
  citizenshipLabel: 'Ireland',
  skillsLabel: 'sonic scream',
  occupationLabel: 'criminal',
  memberOfLabel: 'Interpol',
  creatorLabel: 'Roy Thomas',
};

export const WRONG_ID_HERO_MOCK: MarvelHeroModel = {
  id: 'ee7c7a18-0000-6897-9ad9-1edeadff003d',
  nameLabel: 'Blob',
  genderLabel: 'male',
  citizenshipLabel: 'United States of America',
  skillsLabel: 'superhuman strength',
  occupationLabel: 'criminal',
  memberOfLabel: 'Brotherhood of Mutants',
  creatorLabel: 'Stan Lee',
};
