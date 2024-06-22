const parseContactType = (contactType) => {
  const isString = typeof contactType === 'string';

  if (!isString) return;

  const isType = (type) => ['work', 'home', 'personal'].includes(type);

  if (isType(contactType)) return contactType;
};

const parseIsFavourite = (favourite) => {
  if (typeof favourite !== 'string') return;

  if (favourite === 'true') return true;
  if (favourite === 'false') return false;
};

export const parceFilterParams = (query) => {
  const { type, isFavourite } = query;

  return {
    type: parseContactType(type),
    isFavourite: parseIsFavourite(isFavourite),
  };
};
