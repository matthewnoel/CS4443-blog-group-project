const onSuccess = function () {
  console.log("Success");
};

const onError = function (message) {
  console.log("Error");
};

function getNewPostContainer() {
  /* 
    TODO:
    This method should return an HTML element where a user can create a new blog post.
    You will call Utils.makeBlogPost(title, body, onSuccess, onError) to create the post in the database.
    Your element will be appended to the main element of the document.
    Reference: https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
  */
    //var form = document.getElementById("blog_form");
    //form.addEventListener('submit', alert('Uploaded successfully'));

  let title = document.getElementById("title");
  let body = document.getElementById("content");

  Utils.makeBlogPost(title, body, onSuccess, onError);
  
  console.log("Called getNewPostContainer");
  return null;
}

Utils.initQuery("post");




/*
const input = document.querySelector('input');
const preview = document.querySelector('.preview');

input.style.opacity = 0;

input.addEventListener('change', updateImageDisplay);

function updateImageDisplay()
{
  while (preview.firstChild)
  {
    preview.removeChild(preview.firstChild);
  }

  const curFiles = input.files;
  if (curFiles.length === 0)
  {
    const para = document.createElement('p');
    para.textContent = 'No files currently selected for upload';
    preview.appendChild(para);
  }
  else
  {
    const list = document.createElement('ol');
    preview.appendChild(list);

    for (const file of curFiles)
    {
      const listItem = document.createElement('li');
      const para = document.createElement('p');

      if (validFileType(file))
      {
        para.textContent = `File name ${file.name}, file size ${returnFileSize(file.size)}.`;
        const image = document.createElement('img');
        image.src = URL.createObjectURL(file);

        listItem.appendChild(image);
        listItem.appendChild(para);
      }
      else
      {
        para.textContent = `File name ${file.name}: Not a valid file type. Update your selection.`;
        listItem.appendChild(para);
      }

      list.appendChild(listItem);
    }
  }
}

const fileTypes= ['image/jpeg', 'image/png'];

function validFileType(file)
{
  return fileTypes.includes(file.type);
}

function returnFileSize(number)
{
  if (number < 1024)
  {
    return number + 'bytes';
  }
  else if (number > 1024 && number < 1048576)
  {
    return (number/1024).toFixed(1) + 'KB';
  }
  else if (number >= 1048576)
  {
    return (number/1048576).toFixed(1) + 'MB';
  }
}

*/