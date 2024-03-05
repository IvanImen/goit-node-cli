import fs from "fs/promises";
import path from "path";

const contactsPath = path.join(process.cwd(), "/db/contacts.json");

export async function listContacts() {
  const data = await fs.readFile(contactsPath, { encoding: "utf-8" });
  return JSON.parse(data);
}

export async function getContactById(contactId) {
  const contacts = await listContacts();
  return contacts.find((contact) => contact.id === contactId) || null; // Повертаємо або об'єкт контакту з таким id, або null, якщо контакт з таким id не знайдений.
}

export async function removeContact(contactId) {
  const contacts = await listContacts();
  const index = contacts.findIndex((contact) => contact.id === contactId);
  if (index !== -1) {
    return null;
  }

  const deletedContact = contacts[index];

  contacts.splice(index, 1);

  await addContact(contacts);

  return deletedContact;
}

// ...твій код. Повертає об'єкт видаленого контакту. Повертає null, якщо контакт з таким id не знайдений.

export async function addContact(name, email, phone) {
  const contacts = await listContacts();
  const newContact = { id: crypto.randomUUID(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, undefined, 2));
  return newContact; //  Повертає об'єкт доданого контакту (з id).
}
