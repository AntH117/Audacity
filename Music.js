
function key_hover (key) {
  key.style.marginLeft = "15%"
}

function key_hover_off(key) {
  key.style.marginLeft = "0%"
}

function key_click(key, music) {
  var audio = new Audio(music)
  audio.play()
  key.style.opacity = "0.6"
  audio.addEventListener("ended", function() {
    key.style.opacity = "1";
  });
}

let currentSong;

function music_select(icon, container, audio) {
  musicContainers = document.getElementsByClassName('genres');
  musicIcon = document.getElementById('music_icon');
  musicIcon.src = icon;
  var button = document.getElementById('playPauseButton');
  if (audio != 'none') {
    song = new Audio(audio);
    if (currentSong != undefined) {
      currentSong.pause();
      currentSong.currentTime = 0;
    }
    currentSong = song;
    song.addEventListener('ended', function() {
      button.src = "play.png";
      song.play()
    });
    song.addEventListener('play', function() {
      button.src = 'pause.png'
    })
  }

  for (let i = 0; i < musicContainers.length; i++) {
    musicContainers[i].style.backgroundColor = 'rgb(255, 255, 255)'
  }
  container.style.backgroundColor = 'rgba(133, 201, 161, 0.726)'
  song.play()
  fallingIcons = document.getElementsByClassName('falling-image')
  for (let i = 0; i < fallingIcons.length; i++) {
    fallingIcons[i].src = icon
  }
}

function music_toggle() {
  var button = document.getElementById('playPauseButton');
  if (button.src.endsWith("play.png")) {
    button.src = "pause.png";
    currentSong.play()
  } else {
    button.src = "play.png";
    currentSong.pause()
    currentSong.currentTime = 0;
  }
}

window.onload = function() {
  music_select('book.png', document.getElementById('start'), 'lofi.mp3')
}

const catGrids = document.querySelectorAll('.cat-grid');

const options = {
  rootMargin: '0px',
  threshold: 0.5
};

window.onscroll = function() {
  var scrolled = window.pageYOffset || document.documentElement.scrollTop;
  const music_names = document.getElementsByClassName('genre-name');
  let scroll_list = [true, true, true, true, true, true];
  for (let x = 0; x < scroll_list.length; x++) {
    scroll_list[x] = true;
  }
  if (scrolled >= 300 && scroll_list[0] === true) {
    for (let i = 0; i < music_names[0].getElementsByTagName('div').length; i++) {
      music_names[0].getElementsByTagName('div')[i].classList.add('pop-in');
      scroll_list[0] = false;
    }
  }
  if (scrolled >= 500 && scroll_list[1] === true) {
    for (let i = 0; i < music_names[1].getElementsByTagName('div').length; i++) {
      music_names[1].getElementsByTagName('div')[i].classList.add('pop-in');
      scroll_list[1] = false;
    }
  }
  if (scrolled >= 700 && scroll_list[2] === true) {
    for (let i = 0; i < music_names[2].getElementsByTagName('div').length; i++) {
      music_names[2].getElementsByTagName('div')[i].classList.add('pop-in');
      scroll_list[2] = false;
    }
  }
  if (scrolled >= 900 && scroll_list[3] === true) {
    for (let i = 0; i < music_names[3].getElementsByTagName('div').length; i++) {
      music_names[3].getElementsByTagName('div')[i].classList.add('pop-in');
      scroll_list[3] = false;
    }
  }
  if (scrolled >= 1100 && scroll_list[4] === true) {
    for (let i = 0; i < music_names[4].getElementsByTagName('div').length; i++) {
      music_names[4].getElementsByTagName('div')[i].classList.add('pop-in');
      scroll_list[4] = false;
    }
  }
  if (scrolled >= 1300 && scroll_list[5] === true) {
    for (let i = 0; i < music_names[5].getElementsByTagName('div').length; i++) {
      music_names[5].getElementsByTagName('div')[i].classList.add('pop-in');
      scroll_list[5] = false;
    }
  }
  const cat_names = document.getElementsByClassName('cat-grid')
  let cat_list = [true, true, true];
  if (scrolled >= 2000 && cat_list[0] === true) {
    cat_names[0].getElementsByTagName('img')[0].classList.add('cat-pop-up');
    cat_names[1].getElementsByTagName('img')[0].classList.add('cat-pop-up');
    scroll_list[0] = false;
  }
  if (scrolled >= 2400 && cat_list[0] === true) {
    cat_names[2].getElementsByTagName('img')[0].classList.add('cat-pop-up');
    cat_names[3].getElementsByTagName('img')[0].classList.add('cat-pop-up');
    scroll_list[1] = false;
  }
  if (scrolled >= 2900 && cat_list[0] === true) {
    cat_names[4].getElementsByTagName('img')[0].classList.add('cat-pop-up');
    cat_names[5].getElementsByTagName('img')[0].classList.add('cat-pop-up');
    scroll_list[2] = false;
  }
};

// ball pit
document.addEventListener('DOMContentLoaded', function() {
  const balls = document.getElementsByClassName('ball');
  const ballBox = document.getElementById('ball-box');
  let ball;
  let hold = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let lastX = 0;
  let lastY = 0;
  let vx = 0;
  let vy = 0;
  let gravity = 0.1;
  const bounce = 0.8;
  let friction = 0.1;
  let rotationScale = 0.1;
  let rotationAngle = 0; // Initial rotation angle
  function animate() {
    for (let i = 0; i < balls.length; i++) {
      ball = balls[i];
  
      // Apply gravity to the velocity
      vy += gravity;
      if (vx !=0) {
        vx += friction;
        switch (Math.sign(vx)) {
          case 1:
            friction = -vx * 0.005
          case 2:
            friction = vx * 0.005
        }
      } else if (Math.abs(vx) < 0.00001) {
        friction = 0
      }

      if (hold) {
        vx = 0;
        vy = 0;
      }
      if (vx != 0) {
        rotationAngle += Math.abs(vx) * rotationScale
        ball.style.transform = `rotate(${rotationAngle}deg)`;
        console.log(rotationAngle)
      }
      // Update position based on velocity
      let x = parseFloat(ball.style.left) || 0;
      let y = parseFloat(ball.style.top) || 0;
      x += vx;
      y += vy;
      ball.style.left = `${x}px`;
      ball.style.top = `${y}px`;
  
      // Check for collision with bottom of ballBox
      const ballBottom = y + ball.offsetHeight;
      const boxHeight = ballBox.clientHeight;
      if (ballBottom > boxHeight) {
        y = boxHeight - ball.offsetHeight;
        if (Math.abs(vy) < 0.5) {
          vy = 0;
          gravity = 0;
        } else {
          vy = -vy * bounce;
          gravity = 0.1;
        }
      }
      if (y < 0) {
        y = 0;
        if (vy < 0) {
          vy = -vy * bounce;
          gravity = 0.1;
        }
      }
      const ballLeft = x;
      const ballRight = x + ball.offsetWidth;
      const boxWidth = ballBox.clientWidth;
      
      if (ballLeft < 0) {
        x = 0;
        vx = -vx * bounce;
      } else if (ballRight > boxWidth) {
        x = boxWidth - ball.offsetWidth;
        vx = -vx * bounce;
      }


      // checking for if circle is held
      if (hold) {
        const distanceX = dragStartX - lastX;
        const distanceY = dragStartY - lastY;
        lastX = dragStartX;
        lastY = dragStartY;
  
        // Add momentum to velocity
        vx = distanceX * 0.5;
        vy = distanceY * 0.5;
      }
    }
  
    requestAnimationFrame(animate);
  }
  
  function onMouseDown(event) {
    hold = true;
    gravity = 0;
    vx = 0;
    vy = 0;
    lastX = event.clientX;
    lastY = event.clientY;
    dragStartX = event.clientX;
    dragStartY = event.clientY;
  }
  
  function onMouseMove(event) {
    if (hold) {
      event.preventDefault(); // prevent default behavior
      const rect = ball.getBoundingClientRect();
      const ballWidth = rect.width;
      const ballHeight = rect.height;
  
      // Calculate new x and y positions based on mouse click position
      const x = event.clientX - ballWidth / 2;
      const y = event.clientY - ballHeight / 2;
      ball.style.left = `${x}px`;
      ball.style.top = `${y}px`;
  
      // Calculate change in mouse position
      const dx = event.clientX - lastX;
      const dy = event.clientY - lastY;
  
      // Update velocity based on change in position
      vx = dx / 20; // divide by 20 to slow down the momentum
      vy = dy / 20;
  
      lastX = event.clientX;
      lastY = event.clientY;
    }
  
  }
  
  function onMouseUp(event) {
    if (hold) {
      gravity = 0.1;
      hold = false;
  
      // Calculate new velocity based on the difference in position since mouse down
      vx = (event.clientX - dragStartX) / 20; // divide by 10 to slow down the momentum
      vy = (event.clientY - dragStartY) / 20;
    }
  }
  
  for (let i = 0; i < balls.length; i++) {
    ball = balls[i];
    ball.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  }
  animate();
});
  

// question text section
var questionText = {
  one: "We work together with our incredible partners of songwriters, producers and musicians from all over the globe. We call these heroes our creators.",
  two: "In order to understand what music the cats like, we use an analysis tool based on AI that we have developed. We can effectively process and analyze a vast amount of data. This gives us a better understanding of patterns and trends within cat music.",
  three: "You can find our music on 1,000,000+ streaming platforms galaxywide",
  four: "Cats, our overlords",
  five: "The cat producers take 99.99% of all our profits"
}

function questionSelect(x, num) {
  const boxes = document.getElementsByClassName('fifth-questions')
  var textBox = document.getElementById('answer')
  for (let i = 0; i < boxes.length; i++) {
    boxes[i].classList.remove('fifth-active')
  }
  x.classList.add('fifth-active')
  textBox.innerHTML = questionText[num]
}