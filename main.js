import { formatDateTime } from "./formatDateTime.js";
import { loadingBlock } from "./loadingBlock.js";
import { getTodos, postTodo } from "./api.js";
import { 
  renderForm
} from "./DeleteAndLike.js";

const commentLoadingElement = document.querySelector('.comment-loading');

  const buttonElement = document.getElementById("add-form-button");
  const listElement = document.getElementById("comments");
  const textAreaElement = document.getElementById("add-text");
  const inputElement = document.getElementById("add-name");
  const outerFormElement = document.getElementById("add-form");
  
const getComments = () => {
    getTodos().then((responseData) => {

        commentList = responseData.comments.map((comment) => {
          return {
            name: comment.author.name,
            date: formatDateTime(comment.date),
            id: comment.id,
            isLiked: comment.isLiked,
            likes: comment.likes,
            text: comment.text,
          };
        })
        
        console.log(commentList);
        renderForm({commentList}, {listElement});
      })
      .catch((error) => {

          if (error.message === "Сервер сломался") {
            alert("Сервер сломался, попробуй позже");
            return;
          }

          alert ('Кажется, у вас сломался интернет, попробуйте позже');
        });
    }
  ;
  
  //1.commentList необходимо получать из хранилища коммент через API (метод GET). Строки 47-62
  getComments();
 
  //Сохранение данных форм комментов из html в js
  let commentList = [
  ];

  const quoteCommets = ({commentList}) => {
    
    const commentElements = document.querySelectorAll(".comment");
    for (const commentElement of commentElements) {
      
      commentElement.addEventListener("click", () => {
        
        const index = commentElement.dataset.index;
        const commentText = commentList[index].text;
        const commentAuthor = commentList[index].name;
        textAreaElement.value = `${commentText} > ${commentAuthor}`;
        
      })
    }
  }

  //Кнопка с добавлением коммента
  buttonElement.addEventListener("click", () => {
    commentLoadingElement.classList.remove ('comment-loading');
    outerFormElement.classList.add ('comment-loading');

    inputElement.classList.remove("error");
    if (inputElement.value === "") {
      inputElement.classList.add("error");
    }
    if (textAreaElement.value === "") {
      textAreaElement.classList.add("error");
      return;
    };
    
    buttonElement.disabled = true;
    buttonElement.textContent = "Коммент добавлятся...";
   //3. необходимо добавлять в хранилище коммент (method POST).
 
    postTodo({inputElement}, {textAreaElement}).then((response) => {
        if (response.status === 500) {
          throw new Error("Сервер сломался");
        }

        if (response.status === 400) {
          throw new Error("Плохой запрос");
        }
        outerFormElement.style.display='non';
      return response.json();
      }).then((responseData) => {
        getComments();
      }).then((data) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Добавить";
        commentLoadingElement.classList.add ('comment-loading');
        outerFormElement.classList.remove ('comment-loading');
        
        inputElement.value = "";
        textAreaElement.value = "";
      }).catch((error) => {
        buttonElement.disabled = false;
        buttonElement.textContent = "Добавить";
        if (error.message === "Сервер сломался") {
          alert("Сервер сломался, попробуй позже");
          commentLoadingElement.classList.add ('comment-loading');
        outerFormElement.classList.remove ('comment-loading');
          return;
        }

        if (error.message === "Плохой запрос") {
          alert("Ты сделал ошибку в запросе, исправь данные и попробуй снова");
          commentLoadingElement.classList.add ('comment-loading');
        outerFormElement.classList.remove ('comment-loading');  
          return;
        }

        alert ('Кажется, у вас сломался интернет, попробуйте позже');
        console.warn(error);
        commentLoadingElement.classList.add ('comment-loading');
        outerFormElement.classList.remove ('comment-loading');
      });
    
    renderForm({commentList}, {listElement});
  });

  renderForm({commentList}, {listElement});
  quoteCommets({commentList})
