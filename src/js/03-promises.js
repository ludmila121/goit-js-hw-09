//HTML містить розмітку форми, в поля якої користувач буде вводити першу 
//затримку в мілісекундах, крок збільшення затримки для кожного промісу після першого 
//і кількість промісів, яку необхідно створити.

/* УВАГА
Наступний функціонал не обов'язковий для здавання завдання, але буде хорошою додатковою практикою.
Для відображення повідомлень користувачеві, замість console.log(), використовуй бібліотеку notiflix.*/
/* recomendation from Sergiy illarionov
1. + Добавити розмітку +
2. + Добавити 'submit' слухача на форму
3. Зловити в події дані з форми - 'delay', 'step', 'amount'
4. Використати 'amount' як к-сть запуску функції createPromise
5. Викликати createPromise n разів і використати index як 'position' 
i delay = (delay + step) із форми 
*/

import { Notify } from 'notiflix/build/notiflix-notify-aio';
const refs = {
  form: document.querySelector('.form'),
};
refs.form.addEventListener('submit', createPromptSubmit);

function createPromptSubmit(e) {
  e.preventDefault();
  let delayValue = Number(e.currentTarget.delay.value);
  let stepValue = Number(e.currentTarget.step.value);
  let amountValue = Number(e.currentTarget.amount.value);

/* Доповни код функції createPromise таким чином, щоб вона повертала один проміс, який виконується 
або відхиляється через delay часу.Значенням промісу повинен бути об'єкт, в якому будуть властивості 
position і delay зі значеннями однойменних параметрів.Використовуй початковий код функції для вибору того, що потрібно зробити 
з промісом - виконати або відхилити.
 */ 
  
  for (let i = 1; i <= amountValue; i += 1){
    createPromise(i, delayValue)
      .then(({ position, delay }) => {
        setTimeout(() => {
          Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        }, delay);
      })
      .catch(({ position, delay }) => {
        setTimeout(() => {
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        }, delay);
      });
    delayValue += stepValue;
    e.target.reset();
  }
}
/*  Напиши скрипт, який на момент сабміту форми викликає функцію 
createPromise(position, delay) стільки разів, скільки ввели в поле amount.
Під час кожного виклику передай їй номер промісу(position), що створюється, і затримку, 
враховуючи першу затримку(delay), введену користувачем, і крок(step).
 */

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const objectPromise = { position, delay };
  return new Promise(
    (resolve, reject) => {
      if (shouldResolve) {
        resolve(objectPromise);
      } 
        reject(objectPromise)
      }
  );
}
