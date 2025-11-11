const commentsContainer = document.getElementById('comments');
let allComments = [];
let commentsLoaded = false;
let modalCompleted = false;

const colors = ['#f7b7b7', '#c3e8f3', '#fce1a8', '#d8b4fe', '#b2f7c1'];

const createComment = (text) => {
  if (!commentsContainer) return;
  const randomComment = document.createElement('p');
  randomComment.innerHTML = text;
  randomComment.className = 'comment';
  randomComment.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
  commentsContainer.appendChild(randomComment);
  setTimeout(() => randomComment.classList.add('visible'), 30);
};

const loadComments = () => {
  if (commentsLoaded) return;
  fetch('https://image-feed-api.vercel.app/api/images?page=1')
    .then(r => r.json())
    .then(({ data }) => {
      data.flatMap(img => img.comments)
          .forEach((c, i) => setTimeout(() => createComment(`${c.commenter_name}: ${c.comment}`), i * 30));
      commentsLoaded = true;
    })
    .catch(err => console.log('Failed to load comments:', err));
};

export const showCommentsOnLanding = () => {
  if (!commentsContainer || modalCompleted) return (commentsContainer.style.display = 'none');
  // Show comments only on default theme AND before login
  const isDefault = !document.body.classList.contains('christmas-theme') && !document.body.classList.contains('light-theme');
  if (isDefault && !modalCompleted) {
    commentsContainer.style.display = 'block';
    loadComments();
  } else {
    commentsContainer.style.display = 'none';
  }
};

export const showCommentsAfterModal = () => {
  modalCompleted = true;
  commentsContainer && (commentsContainer.style.display = 'none');
};

export const hideComments = () => {
  commentsContainer && (commentsContainer.style.display = 'none');
};

// Initialize on page load
if (commentsContainer) {
  commentsContainer.style.display = 'none'; // Start hidden by default
  setTimeout(showCommentsOnLanding, 100);
}

