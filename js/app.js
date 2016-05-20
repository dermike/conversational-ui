{
  'use strict';
  let structure = {
      'menu': [
        {
          'title': 'Projects',
          'id': 'projects',
          'submenu': [
            {
              'title': 'Project 1',
              'id': 'p1'
            },
            {
              'title': 'Project 2',
              'id': 'p2'
            },
            {
              'title': 'Project 3',
              'id': 'p3'
            }
          ]
        },
        {
          'title': 'Writing',
          'id': 'writing',
          'submenu': [
            {
              'title': 'Articles',
              'id': 'articles'
            },
            {
              'title': 'Theses',
              'id': 'theses'
            }
          ]
        },
        {
          'title': 'Contact',
          'id': 'contact',
          'submenu': [
            {
              'title': 'Social media',
              'id': 'socialmedia'
            },
            {
              'title': 'Email',
              'id': 'email'
            },
            {
              'title': 'Address',
              'id': 'address'
            }
          ]
        }
      ]
    },
    idle,
    idletime = 45000;
  const chat = document.querySelector('.chat');
  const content = document.querySelector('.content');

  const newMessage = (message, type = 'user') => {
    let bubble = document.createElement('section'),
      slideIn = (el, i) => {
        setTimeout(() => {
          el.classList.add('show');
        }, i * 150 ? i * 150 : 10);
      },
      scroll,
      scrollDown = () => {
        chat.scrollTop += bubble.offsetHeight / 15;
      };
    bubble.classList.add('message');
    bubble.classList.add(type);
    bubble.innerHTML = `<p>${message}</p>`;
    chat.appendChild(bubble);

    scroll = window.setInterval(scrollDown, 10);
    setTimeout(() => {
      window.clearInterval(scroll);
    }, 300);

    setTimeout(() => {
      bubble.classList.add('show');
    }, 10);

    if (type === 'user') {
      let animate = chat.querySelectorAll('button:not(:disabled)');
      for (let i = 0; i < animate.length; i += 1) {
        slideIn(animate[i], i);
      }
      bubble.classList.add('active');
    }
  };

  const randomReply = replies => {
    return replies[Math.floor(Math.random() * replies.length)];
  };

  const checkUp = () => {
    let lastMessage = document.querySelector('.active'),
      idleReplies = [
        'Did you fall asleep? &#x1F634;',
        'Coffee break? &#x2615;',
        'Still there?',
        '&#x2744; &#x1F331; &#x1F31E; &#x1F342;'
      ];
    if (lastMessage) {
      lastMessage.parentNode.removeChild(lastMessage);
    }
    newMessage(randomReply(idleReplies), 'bot');
    setTimeout(() => {
      let helpReplies = [
        'Don\'t like this conversation? Send an email to <a href="mailto:mike@redvolume.com">mike@redvolume.com</a> if you want a real one. &#x1F680;',
        'Not finding what you\'re looking for? Send an email to <a href="mailto:mike@redvolume.com">mike@redvolume.com</a> with any questions...',
        'Wanna talk to a real person? &#x1F4AC; Fire off an email to <a href="mailto:mike@redvolume.com">mike@redvolume.com</a>. &#x1F525;'
      ];
      newMessage(randomReply(helpReplies), 'bot');
      setTimeout(() => {
        let knowMoreReplies = [
            'Where\'s the normal web page? &#x1F61E;',
            'I want a regular web page &#x1F631;',
            'Do you have a regular website? &#x1F63B;'
          ],
          menuAgainReplies = [
            'Show me the options again please &#x2705;',
            'Ok, go! &#x1F697;',
            'I wanna check something &#x1F44D;'
          ];
        newMessage(`<button class="choice newmenu showinfo">${randomReply(knowMoreReplies)}</button><br /><button class="choice newmenu showmenu">${randomReply(menuAgainReplies)}</button>`);
      }, 300);
    }, 500);
  };

  const init = () => {
    let welcomeReplies = [
      'Hello! &#x1F44B; I\'m Mike, a medical librarian working at Karolinska Institutet. I try to create the best user experiences possible, both physical and virtual, using humour, friendliness, web technologies and good design.'
    ];
    idle = window.setInterval(() => {
      window.clearInterval(idle);
      checkUp();
    }, idletime);
    newMessage(randomReply(welcomeReplies), 'bot');
    setTimeout(() => {
      let startReplies = [
        'Hey, tell me more! &#x1F680;',
        'Hi! &#x1F440;',
        'I\'ll bite &#x1F604;'
      ];
      newMessage(`<button class="choice start">${randomReply(startReplies)}</button>`);
    }, 300);
  };

  const makeUserBubble = el => {
    el.parentNode.parentNode.classList.add('selected');
    el.parentNode.parentNode.classList.remove('active');
    el.parentNode.innerHTML = el.textContent;
  };

  const showMenu = again => {
    let menu = '',
      goBack = chat.querySelector('button.newmenu'),
      againReplies = [
        'Here\'s a few things what I can tell you about... &#x1F3A4;',
        'Ok, check this out! &#x1F447;',
        'Anything else you\'re interested in? &#x1F64F;'
      ],
      replies = [
        'What would you like to know more about? &#x1F4A1;',
        'Can I interest you in any of this? &#x1F4AF;',
        'Select something of the following... &#x1F447;'
      ];
    if (goBack) {
      makeUserBubble(goBack);
    }
    setTimeout(() => {
      again ? newMessage(randomReply(againReplies), 'bot') : newMessage(randomReply(replies), 'bot');
      structure.menu.forEach((val, index) => {
        menu += `<button class="choice menu" data-submenu="${index}">${val.title}</button>`;
      });
      setTimeout(() => {
        newMessage(menu);
      }, 500);
    }, 500);
    idle = window.setInterval(() => {
      window.clearInterval(idle);
      checkUp();
    }, idletime);
  };

  const menuClick = clicked => {
    let submenu = '',
      menuChoice = structure.menu[clicked.getAttribute('data-submenu')],
      replies = [
        '&#x1F44D; Here\'s what I have on that...',
        'See anything interesting? &#x1F648;',
        'Any of this cool?'
      ],
      userReplies = [
        `I wanna read about something other than ${menuChoice.title.toLowerCase()} &#x1F61C;`,
        `Show me the menu again &#x1F60B;`,
        `${menuChoice.title} was interesting, but show me something else... &#x1F612;`
      ];
    newMessage(randomReply(replies), 'bot');
    menuChoice.submenu.forEach(val => {
      submenu += `<button class="choice submenu" data-example="${menuChoice.id}-${val.id}">${val.title}</button>`;
    });
    submenu += `<br /><button class="choice submenu newmenu">${randomReply(userReplies)}</button>`;
    setTimeout(() => {
      newMessage(submenu);
    }, 500);
  };

  const subMenuClick = clicked => {
    if (clicked.classList.contains('newmenu')) {
      showMenu(true);
    } else {
      let article = document.getElementById(clicked.getAttribute('data-example'));
      article.classList.add('show');
      content.classList.add('show');
    }
  };

  const closeContent = () => {
    content.classList.remove('show');
    setTimeout(() => {
      let active = document.querySelector('.content article.show');
      if (active) {
        active.classList.remove('show');
      }
    }, 300);
  };

  document.addEventListener('click', e => {
    if (e.target.classList.contains('choice')) {
      window.clearInterval(idle);
      if (!e.target.classList.contains('submenu')) {
        makeUserBubble(e.target);
      }

      if (e.target.classList.contains('menu')) {
        menuClick(e.target);
      }

      if (e.target.classList.contains('submenu')) {
        subMenuClick(e.target);
      }

      if (e.target.classList.contains('start')) {
        showMenu();
      }

      if (e.target.classList.contains('showmenu')) {
        showMenu(true);
      }

      if (e.target.classList.contains('showinfo')) {
        let infoReplies = [
          'Here\'s my website ',
          'Here you go: ',
          'Check this one out '
        ];
        newMessage(`${randomReply(infoReplies)} <a target="_new" href="https://librarian.codes">https://librarian.codes</a>`, 'bot');
        setTimeout(() => {
          let okReplies = [
            'OK &#x1F60E;',
            'How do I get back? &#x1F312;',
            'Ok, thanks! &#x1F44C;'
          ];
          newMessage(`<button class="choice newmenu showmenu">${randomReply(okReplies)}</button>`);
        }, 300);
      }
    }
    if (e.target.classList.contains('close')) {
      closeContent();
    }
  });

  document.addEventListener('keydown', e => {
    if (e.keyCode === 27) {
      closeContent();
    }
  });

  setTimeout(() => {
    init();
  }, 500);
}
