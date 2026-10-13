export const formatPKR = (amount: number): string => {
  return `Rs. ${Math.round(amount).toLocaleString('en-PK')}`;
};

export const PAKISTANI_CITIES = [
  'Karachi',
  'Lahore',
  'Islamabad',
  'Rawalpindi',
  'Faisalabad',
  'Multan',
  'Peshawar',
  'Quetta',
  'Sialkot',
  'Gujranwala',
  'Hyderabad',
  'Bahawalpur',
  'Sargodha',
  'Abbottabad',
  'Mirpur (AJK)',
  'Sukkur',
  'Jhelum',
  'Wah Cantt',
  'Sheikhupura',
  'Gujrat',
  'Rahim Yar Khan',
  'Mardan',
  'Dera Ghazi Khan',
  'Kasur',
  'Sahiwal',
  'Okara'
];

export const PAKISTANI_PROVINCES = [
  'Punjab',
  'Sindh',
  'Khyber Pakhtunkhwa',
  'Balochistan',
  'Islamabad Capital Territory',
  'Azad Jammu & Kashmir',
  'Gilgit-Baltistan'
];
