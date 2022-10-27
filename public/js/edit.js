const postId = document.querySelector('input[name="post-id"]').value;
//console.log('postID', postId)
const editFormHandler = async function(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const description = document.querySelector('textarea[name="description"]').value;

    await fetch(`/api/post/${postId}`, {
        method: 'PUT', 
        body: JSON.stringify({
            name,
            description
        }),
        headers: {
            'Content-Type': 'application/json'
        }
    });
    document.location.replace('/dashboard');
};

const deleteClickHandler = async function() {
    await fetch(`/api/post/${postId}`, {
        method: 'DELETE'
    });

    document.location.replace('/dashboard');
};

document
    .querySelector('#edit-post-form')
    .addEventListener('submit', editFormHandler);
document
    .querySelector('#delete-btn')
    .addEventListener('click', deleteClickHandler);