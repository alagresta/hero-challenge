import { v4 as uuidv4 } from 'uuid';

export class MarvelHeroModel implements MarvelHeroModelInterface {
  id: string = '0';
  citizenshipLabel: string = '';
  creatorLabel: string = '';
  genderLabel: string = '';
  memberOfLabel: string = '';
  nameLabel: string = '';
  occupationLabel: string = '';
  skillsLabel: string = '';
  constructor(data: MarvelHeroModelInterface) {
    Object.assign(this, data);
    this.id = uuidv4();
  }
}

export interface MarvelHeroModelInterface {
  nameLabel: string;
  genderLabel: string;
  citizenshipLabel: string;
  skillsLabel: string;
  occupationLabel: string;
  memberOfLabel: string;
  creatorLabel: string;
}
