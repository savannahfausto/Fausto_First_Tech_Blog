module.exports = {
    format_date: (date) => {
      // Format date as MM/DD/YYYY
      return date.toLocaleDateString();
      //can also try this one 
      //return `${date.getMonth() + 1}/${date.getDate}/${date.getFullYear()}`;
    }
};
  