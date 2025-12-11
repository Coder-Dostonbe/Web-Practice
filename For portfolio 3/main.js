const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

function animateNumber(finalNum, container, delay = 50) {
  return new Promise((resolve) => {
    let current = 0;
    const interval = setInterval(() => {
      container.textContent = current;
      if (current === finalNum) {
        clearInterval(interval);
        resolve();
      } else {
        current++;
        if (current > 9) current = 0; // 0–9 oralig‘ida aylanadi
      }
    }, delay);
  });
}

const generate = async () => {
  const minEl = document.getElementById('min');
  const maxEl = document.getElementById('max');
  const countEl = document.getElementById('count');

  const min = Number(minEl.value);
  const max = Number(maxEl.value);
  let count = Number(countEl.value);

  if (minEl.value === '' || maxEl.value === '') {
    alert('Please enter both minimum and maximum values!');
    return;
  }
  if (min >= max) {
    alert('Minimum value must be less than maximum value!');
    return;
  }
  if (min < 0) {
    alert('Minimum value must be a positive number!');
    return;
  }
  if (max > 100000) {
    alert('Maximum value must not exceed 100,000!');
    return;
  }
  if (!count) count = 1;
  if (count < 1 || count > 10) {
    alert('Count must be between 1 and 10!');
    return;
  }

  const numbers = [];
  for (let i = 0; i < count; i++) {
    numbers.push(getRandomNumber(min, max));
  }

  const placeholderEl = document.querySelector('#placeholder');
  placeholderEl.textContent = ''; // Eski natijani tozalash

  // Har bir son uchun
  for (let numIndex = 0; numIndex < numbers.length; numIndex++) {
    const numStr = numbers[numIndex].toString();
    // Har bir raqamni alohida animatsiya qilish
    for (let i = 0; i < numStr.length; i++) {
      const span = document.createElement('span');
      placeholderEl.appendChild(span);
      await animateNumber(Number(numStr[i]), span, 50);
    }
    // Sonlar orasida vergul qo‘shish
    if (numIndex < numbers.length - 1) {
      placeholderEl.appendChild(document.createTextNode(', '));
    }
  }
};

document.getElementById('generate').addEventListener('click', generate);