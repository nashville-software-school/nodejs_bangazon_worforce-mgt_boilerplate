console.log('Is this thing on?');

document.getElementById("showForm").addEventListener('click', () => {
  console.log('Wow, that worked!', location.origin);
  location.href = `${location.origin}/login`;
});
