const contactData = [];

// click add button, show form
const AddBtn = $('.btn-section');
const popupForm = $('.popup-section');
AddBtn.on('click', () => popupForm.show());

// close form
const closeFormBtn = $('.btn-close-form');
closeFormBtn.on('click', () => popupForm.hide());

// form features
const form = $('.popup-form');
const submitBtn = $('button[type="submit"]');

const generateContact = index => {
  const contact = contactData[index];

  const contactHtml = `<div class="contact-unit" id="${index}">
              <div>
                <div>
                  <h3 class="contact-name">${contact.firstName}</h3>
                  <h3 class="contact-name">${contact.lastName}</h3>
                </div>
                <div>
                  <p class="contact-phone">${contact.phone}</p>
                  <p class="contact-address">${contact.address}</p>
                </div>
              </div>
              <button class="btn-delete" id="${index}">DELETE</button>
            </div>`;

  return contactHtml;
};

const contactList = $('.contact-list');

const emptyContactList = () => {
  contactList.empty();
};

const displayContact = contact => {
  const index = contactData.indexOf(contact);
  const contactHtml = generateContact(index);

  contactList.append(contactHtml);
};

const displayContacts = (contactArr, scene = '') => {
  if (!contactArr.length) {
    let noContact;

    switch (scene) {
      case 'search':
        noContact = `<p class="no-contact">You don't have this person's contact.</p>`;
        break;
      default:
        noContact = `<p class="no-contact">You don't have contact yet.</p>`;
        break;
    }

    emptyContactList();
    contactList.append(noContact);

    return;
  }

  emptyContactList();
  contactArr.forEach(displayContact);
};

const firstNameInput = $('input[name="firstname"]');
const lastNameInput = $('input[name="lastname"]');
const phoneInput = $('input[name="phone"]');
const addressInput = $('input[name="address"]');
const searchInput = $('input[name="search"]');

const clearInput = type => {
  if (type === 'form') {
    firstNameInput.val('');
    lastNameInput.val('');
    phoneInput.val('');
    addressInput.val('');
  } else if (type === 'search') {
    searchInput.val('');
  }
};

const handleSubmit = e => {
  e.preventDefault();

  const firstName = firstNameInput.val();
  const lastName = lastNameInput.val();
  const phone = phoneInput.val();
  const address = addressInput.val();

  //   todo: validate

  const formData = { firstName, lastName, phone, address };

  contactData.push(formData);

  popupForm.hide();

  displayContacts(contactData);
  clearInput('form');
};

form.on('submit', handleSubmit);

// click header to show all contacts
const header = $('.contact-header');

header.on('click', () => {
  displayContacts(contactData);
  clearInput('search');
});

// delete feature
const handleDelete = e => {
  const index = e.target.id;
  const removeIndex = `#${index}`;

  // delete from view
  $('.contact-unit').remove(removeIndex);

  // delete from data base
  contactData.splice(index, 1);
};

// todo, how to add event listeners to all delete button?
$(document).on('click', '.btn-delete', handleDelete);

// search feature
const searchBtn = $('.btn-search');

const handleSearch = () => {
  const searchContent = searchInput.val();

  let searchResult = contactData.filter(contact => {
    const contactValues = Object.values(contact);

    let hasMatch = false;
    const reg = new RegExp(`${searchContent}+`, 'gi');

    contactValues.forEach(str => {
      let regResult = str.match(reg);
      if (regResult) {
        hasMatch = true;
      }
    });

    return hasMatch;
  });

  displayContacts(searchResult, 'search');
  clearInput('search');
};

searchBtn.on('click', handleSearch);

$(document).on('load', displayContacts(contactData));
