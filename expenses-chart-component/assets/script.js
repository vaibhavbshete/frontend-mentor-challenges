document.addEventListener('DOMContentLoaded', () => {
  fetch('./data.json')
    .then(rawdata => rawdata.json())
    .then(data => {
      // console.log(data);
      let amounts = data.map(daydata => parseFloat(daydata.amount));
      maxAmount = Math.max(...amounts);
      const days = Array('mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun');
      days.forEach(function (day) {
        let daydata = data.filter(dayinfo => dayinfo.day == day).pop();
        // console.log(daydata);
        let height = daydata.amount / maxAmount * 100;
        let daybar = document.querySelector('[data-day=' + daydata.day);
        daybar.style.height = height + "%";
        if (daydata.amount == maxAmount) {
          daybar.classList.add('max');
        }
        daybar.querySelector('.bar-text').innerText = '$' + daydata.amount;
      });
    });
});