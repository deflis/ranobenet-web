export type NovelLines = NovelLine[];

export type NovelLine = NovelLineElement[];

export type NovelLineElement = string | Ruby | Bouten;

export type Ruby = {
  type: 'ruby';
  yomi: string;
  text: string;
};

export type Bouten = {
  type: 'bouten';
  text: string;
};
