const newFormHandler = async function(event) {
    event.preventDefault();

    const name = document.querySelector('input[name="name"]').value;
    const description = document.querySelector('textarea[name="description"]').value;
    try{

        await fetch('/api/post', {
            method: 'POST', 
            body: JSON.stringify({
                name,
                description, 
            }), 
            headers: { 'Content-Type': 'application/json' }, 
        });
        document.location.replace('/dashboard');
    } catch (err){
        alert('Failed to create blog post');
    }
    
};

document
    .querySelector('#new-post-form')
    .addEventListener('submit', newFormHandler);