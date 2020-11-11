function Countdown(targetDate) {
      this.targetDate = targetDate;
      this.update = function() {
          "use strict";
          let diff = Math.round((this.targetDate - new Date()) / 1000); // в сек
          console.log(diff);
          if (diff < 0) {
            clearInterval(timerId);
            return {message: 'вы опоздали :('}
          } else {
          let seconds = diff % 60;
          diff = Math.trunc(diff / 60);
          if (seconds < 10) seconds = '0' + seconds;
          console.log(seconds);

          let minutes = diff % 60 + ' :';
          diff = Math.trunc(diff / 60);
          if (minutes < 10) minutes = '0' + minutes;

          let hours = diff % 24 + ' :';
          diff = Math.trunc(diff / 24);
          if (hours < 10) hours = '0' + hours;

          let days = diff + ' дн';

          return {
              days: days,
              hours: hours,
              minutes: minutes,
              seconds: seconds
          };
        }
      };
    };

    let counter = new Countdown(new Date(2020, 9, 25, 21, 30, 0));

    function createDiv() {
        if (!document.getElementById('timer')) {
            var div = document.createElement('div');
            div.setAttribute('id', 'overlaytimer');
            div.setAttribute('class', 'overlaytimer');
          
            document.body.append(div);
            div.insertAdjacentHTML('afterbegin', '<p class="title">До конференции осталось:</p><span class="days"></span><br><span class="hours"></span><span class="minutes"></span><span class="seconds"></span><button id="timerStart" class="timerStart">START</button><button id="timerStop" class="timerStop">STOP</button>');
        }
        return div;
    };
    createDiv();

    function embeddedView(data, container) {  
      if (data.message) {
        late.style.display = 'block';
        timer.style.display = 'none';
        late.innerHTML = data.message;
        timerStart.disabled = true;
        } else {     
            container.children[0].innerHTML = data.days;
            container.children[1].innerHTML = data.hours;
            container.children[2].innerHTML = data.minutes;
            container.children[3].innerHTML = data.seconds;
        }    
    }
    
    function overlayView(data, container) {
      if (data.message) { 
        container.querySelector('.days').innerHTML = data.message;
        container.querySelector('.hours').style.display = 'none';
        container.querySelector('.minutes').style.display = 'none';
        container.querySelector('.seconds').style.display = 'none';
        timerStart.disabled = true;
      } else {
        container.querySelector('.days').innerHTML = data.days;
        container.querySelector('.hours').innerHTML = data.hours;
        container.querySelector('.minutes').innerHTML = data.minutes;
        container.querySelector('.seconds').innerHTML = data.seconds;
      }
    }
    function tick() {
      let data = counter.update();
      let embeddedDiv = document.getElementById('timer');
      let overlayDiv = document.getElementById('overlaytimer');
      if (!embeddedDiv) {
        overlayView(data, overlayDiv);
      } else {
        embeddedView(data, embeddedDiv);
      }
    }
    
    let timerId;
    function clockStart() {
        timerId = setInterval(tick, 1000);
        tick();
    }
    function clockStop() {
        clearInterval(timerId);
    }
    clockStart();
    timerStart.addEventListener("click", clockStart);
    timerStop.addEventListener("click", clockStop);