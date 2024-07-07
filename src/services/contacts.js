import { SORT_ORDER } from '../constants/index.js';
import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export async function getAllContacts({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
  filter = {},
  userId,
}) {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId });

  if (filter.type) {
    contactsQuery.where('contactType').equals(filter.type);
  }

  if (typeof filter.isFavourite === 'boolean') {
    contactsQuery.where('isFavourite').equals(filter.isFavourite);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find({ userId }).merge(contactsQuery).countDocuments(),
    Contact.find({ userId })
      .merge(contactsQuery)
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
}

export async function getContactById(query) {
  return await Contact.findOne(query);
}

export async function createContact(payload) {
  return await Contact.create(payload);
}

export async function deleteContact(query) {
  return await Contact.findOneAndDelete(query);
}

export async function updateContact(query, payload) {
  return await Contact.findOneAndUpdate(query, payload);
}

// TODO Через агригацию
// import { SORT_ORDER } from '../constants/index.js';
// import { Contact } from '../db/models/contact.js';
// import { calculatePaginationData } from '../utils/calculatePaginationData.js';

// export async function getAllContacts({
//   page = 1,
//   perPage = 10,
//   sortOrder = SORT_ORDER.ASC,
//   sortBy = '_id',
//   filter = {},
// }) {
//   const limit = perPage;
//   const skip = (page - 1) * perPage;

//   // Создание объекта условий фильтрации
//   const contactsQuery = {};

//   // Добавление условия фильтрации по типу контакта
//   if (filter.type) {
//     contactsQuery.contactType = filter.type;
//   }

//   // Добавление условия фильтрации по любимым контактам
//   if (typeof filter.isFavourite === 'boolean') {
//     contactsQuery.isFavourite = filter.isFavourite;
//   }

//   // Выполнение агрегатного запроса с фильтрацией, сортировкой, пропуском и ограничением
//   const contacts = await Contact.aggregate([
//     { $match: contactsQuery }, // Фильтрация
//     {
//       $facet: {
//         data: [
//           { $sort: { [sortBy]: sortOrder === 'asc' ? 1 : -1 } }, // Сортировка
//           { $skip: skip }, // Пропуск
//           { $limit: limit }, // Ограничение
//         ],
//         totalCount: [
//           { $count: 'count' }, // Подсчет общего количества
//         ],
//       },
//     },
//   ]);

//   const contactsCount = contacts[0].totalCount[0]?.count || 0;
//   const filteredContacts = contacts[0].data;

//   const paginationData = calculatePaginationData(contactsCount, perPage, page);

//   return {
//     data: filteredContacts,
//     ...paginationData,
//   };
// }
