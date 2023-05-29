const body = $('body');
const contactData = [];

const AddBtn = $('.btn-section');
const popupForm = $('.popup-section');
AddBtn.on('click', () => popupForm.show());

const closeFormBtn = $('.btn-close-form');
closeFormBtn.on('click', e => popupForm.hide());

// for testing - start
const searchName = $('input[name="search"]').val();
console.log(searchName);
// for testing - end

const form = $('.popup-form');
const submitBtn = $('button[type="submit"]');

const getData = obj => {
  return obj.val();
};

const generateContact = index => {
  const obj = contactData[index];

  const contactHtml = `<div class="contact-unit" id="${index}">
              <div>
                <div>
                  <h3 class="contact-name">${obj.firstName}</h3>
                  <h3 class="contact-name">${obj.lastName}</h3>
                </div>
                <div>
                  <p class="contact-phone">${obj.phone}</p>
                  <p class="contact-address">${obj.address}</p>
                </div>
              </div>
              <button class="btn-delete" id="${index}">Delete</button>
            </div>`;

  return contactHtml;
};

const displayContact = obj => {
  const index = contactData.indexOf(obj);

  // generate
  const html = generateContact(index);

  // append
  $('.contact-list').append(html);
};

// for search, delete
const displayContacts = arr => {
  arr.forEach(displayContact);
};

const contactList = $('.contact-list');

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
    console.log('form');
  } else if (type === 'search') {
    searchInput.val('');
  }
};

const handleSubmit = e => {
  e.preventDefault();
  const firstName = $('input[name="firstname"]').val();
  const lastName = $('input[name="lastname"]').val();
  const phone = $('input[name="phone"]').val();
  const address = $('input[name="address"]').val();

  //   todo: validate

  const formData = { firstName, lastName, phone, address };

  //   body.data([...data, formData]);
  //   console.log(body.data());
  contactData.push(formData);
  console.log(contactData);
  console.log(Object.values(formData));

  popupForm.hide();

  //   append contact
  // $('.contact-list').append(
  //   generateContact(formData, contactData.indexOf(formData))
  // );

  $('.contact-list').empty();
  clearInput('search');
  displayContacts(contactData);

  clearInput('form');
};

form.on('submit', handleSubmit);

// click header to show all contacts
const header = $('.contact-header');
header.on('click', () => {
  $('.contact-list').empty();
  clearInput('search');
  displayContacts(contactData);
});

// const deleteBtn = $('.btn-delete');

const handleDelete = e => {
  const index = e.target.id;
  const removeIndex = `#${index}`;

  //problem, search after delete, still appear
  $('.contact-unit').remove(removeIndex);

  // delete from data base
  contactData.splice(index, 1);
  console.log('after deleted data: ', contactData);
};

// todo, how to repeat

$(document).on('click', '.btn-delete', handleDelete);

const searchBtn = $('.btn-search');

const handleSearch = () => {
  const searchInput = $('input[name=search]').val();
  console.log(typeof searchInput);

  // arr
  let searchResult = contactData.filter(contact => {
    console.log(contact);
    const temp = Object.values(contact);
    console.log('temp', temp);
    return temp.includes(searchInput);
  });

  console.log(searchResult);

  // not found
  if (!searchResult.length) {
    // $('.contact-unit').detach();
    $('.contact-list').empty();
    const notFound = `<p>You don't have this person's contact yet.</p>`;
    console.log('not found');
    $('.contact-list').append(notFound);
    clearInput('search');
    // return notFound;
    return;
  }

  $('.contact-list').empty();
  clearInput('search');
  // take in an arr; if there are same names
  displayContacts(searchResult);
};

searchBtn.on('click', handleSearch);

// 1.generate single
// 2.display single
// - by display, i mean append
// 3.display list
